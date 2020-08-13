import { __decorate, __param, __values } from 'tslib';
import { InjectionToken, Optional, Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, SkipSelf, NgModule } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

/**
 * Custom HttpParameterCodec
 * Workaround for https://github.com/angular/angular/issues/18261
 */
var CustomHttpParameterCodec = /** @class */ (function () {
    function CustomHttpParameterCodec() {
    }
    CustomHttpParameterCodec.prototype.encodeKey = function (k) {
        return encodeURIComponent(k);
    };
    CustomHttpParameterCodec.prototype.encodeValue = function (v) {
        return encodeURIComponent(v);
    };
    CustomHttpParameterCodec.prototype.decodeKey = function (k) {
        return decodeURIComponent(k);
    };
    CustomHttpParameterCodec.prototype.decodeValue = function (v) {
        return decodeURIComponent(v);
    };
    return CustomHttpParameterCodec;
}());

var BASE_PATH = new InjectionToken('basePath');
var COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};

var Configuration = /** @class */ (function () {
    function Configuration(configurationParameters) {
        if (configurationParameters === void 0) { configurationParameters = {}; }
        this.apiKeys = configurationParameters.apiKeys;
        this.username = configurationParameters.username;
        this.password = configurationParameters.password;
        this.accessToken = configurationParameters.accessToken;
        this.basePath = configurationParameters.basePath;
        this.withCredentials = configurationParameters.withCredentials;
        this.encoder = configurationParameters.encoder;
    }
    /**
     * Select the correct content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param contentTypes - the array of content types that are available for selection
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    Configuration.prototype.selectHeaderContentType = function (contentTypes) {
        var _this = this;
        if (contentTypes.length === 0) {
            return undefined;
        }
        var type = contentTypes.find(function (x) { return _this.isJsonMime(x); });
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    };
    /**
     * Select the correct accept content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param accepts - the array of content types that are available for selection.
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    Configuration.prototype.selectHeaderAccept = function (accepts) {
        var _this = this;
        if (accepts.length === 0) {
            return undefined;
        }
        var type = accepts.find(function (x) { return _this.isJsonMime(x); });
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    };
    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     *   application/json
     *   application/json; charset=UTF8
     *   APPLICATION/JSON
     *   application/vnd.company+json
     * @param mime - MIME (Multipurpose Internet Mail Extensions)
     * @return True if the given MIME is JSON, false otherwise.
     */
    Configuration.prototype.isJsonMime = function (mime) {
        var jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    };
    return Configuration;
}());

var ContentMediaService = /** @class */ (function () {
    function ContentMediaService(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'https://api.flotiq.com';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }
    ContentMediaService.prototype.addToHttpParams = function (httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    };
    ContentMediaService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
        var _this = this;
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
            }
            else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                }
                else {
                    throw Error("key may not be null if value is Date");
                }
            }
            else {
                Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    };
    ContentMediaService.prototype.batchCreateMedia = function (updateExisting, mediaWithoutInternal, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (updateExisting !== undefined && updateExisting !== null) {
            queryParameters = this.addToHttpParams(queryParameters, updateExisting, 'updateExisting');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(this.configuration.basePath + "/api/v1/content/_media/batch", mediaWithoutInternal, {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentMediaService.prototype.createMedia = function (mediaWithoutInternal, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(this.configuration.basePath + "/api/v1/content/_media", mediaWithoutInternal, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentMediaService.prototype.deleteMedia = function (id, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteMedia.');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.delete(this.configuration.basePath + "/api/v1/content/_media/" + encodeURIComponent(String(id)), {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentMediaService.prototype.getMedia = function (id, hydrate, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getMedia.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (hydrate !== undefined && hydrate !== null) {
            queryParameters = this.addToHttpParams(queryParameters, hydrate, 'hydrate');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(this.configuration.basePath + "/api/v1/content/_media/" + encodeURIComponent(String(id)), {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentMediaService.prototype.getRemovedMedia = function (deletedAfter, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (deletedAfter !== undefined && deletedAfter !== null) {
            queryParameters = this.addToHttpParams(queryParameters, deletedAfter, 'deletedAfter');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(this.configuration.basePath + "/api/v1/content/_media/removed", {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentMediaService.prototype.listMedia = function (page, limit, orderBy, orderDirection, hydrate, filters, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = this.addToHttpParams(queryParameters, page, 'page');
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = this.addToHttpParams(queryParameters, limit, 'limit');
        }
        if (orderBy !== undefined && orderBy !== null) {
            queryParameters = this.addToHttpParams(queryParameters, orderBy, 'order_by');
        }
        if (orderDirection !== undefined && orderDirection !== null) {
            queryParameters = this.addToHttpParams(queryParameters, orderDirection, 'order_direction');
        }
        if (hydrate !== undefined && hydrate !== null) {
            queryParameters = this.addToHttpParams(queryParameters, hydrate, 'hydrate');
        }
        if (filters !== undefined && filters !== null) {
            queryParameters = this.addToHttpParams(queryParameters, filters, 'filters');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(this.configuration.basePath + "/api/v1/content/_media", {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentMediaService.prototype.updateMedia = function (id, mediaWithoutInternal, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateMedia.');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.put(this.configuration.basePath + "/api/v1/content/_media/" + encodeURIComponent(String(id)), mediaWithoutInternal, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentMediaService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    ContentMediaService.ɵprov = ɵɵdefineInjectable({ factory: function ContentMediaService_Factory() { return new ContentMediaService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: ContentMediaService, providedIn: "root" });
    ContentMediaService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], ContentMediaService);
    return ContentMediaService;
}());

var ContentProductService = /** @class */ (function () {
    function ContentProductService(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'https://api.flotiq.com';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }
    ContentProductService.prototype.addToHttpParams = function (httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    };
    ContentProductService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
        var _this = this;
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
            }
            else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                }
                else {
                    throw Error("key may not be null if value is Date");
                }
            }
            else {
                Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    };
    ContentProductService.prototype.batchCreateProduct = function (updateExisting, productWithoutInternal, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (updateExisting !== undefined && updateExisting !== null) {
            queryParameters = this.addToHttpParams(queryParameters, updateExisting, 'updateExisting');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(this.configuration.basePath + "/api/v1/content/product/batch", productWithoutInternal, {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentProductService.prototype.createProduct = function (productWithoutInternal, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(this.configuration.basePath + "/api/v1/content/product", productWithoutInternal, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentProductService.prototype.deleteProduct = function (id, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteProduct.');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.delete(this.configuration.basePath + "/api/v1/content/product/" + encodeURIComponent(String(id)), {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentProductService.prototype.getProduct = function (id, hydrate, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getProduct.');
        }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (hydrate !== undefined && hydrate !== null) {
            queryParameters = this.addToHttpParams(queryParameters, hydrate, 'hydrate');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(this.configuration.basePath + "/api/v1/content/product/" + encodeURIComponent(String(id)), {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentProductService.prototype.getRemovedProduct = function (deletedAfter, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (deletedAfter !== undefined && deletedAfter !== null) {
            queryParameters = this.addToHttpParams(queryParameters, deletedAfter, 'deletedAfter');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(this.configuration.basePath + "/api/v1/content/product/removed", {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentProductService.prototype.listProduct = function (page, limit, orderBy, orderDirection, hydrate, filters, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (page !== undefined && page !== null) {
            queryParameters = this.addToHttpParams(queryParameters, page, 'page');
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = this.addToHttpParams(queryParameters, limit, 'limit');
        }
        if (orderBy !== undefined && orderBy !== null) {
            queryParameters = this.addToHttpParams(queryParameters, orderBy, 'order_by');
        }
        if (orderDirection !== undefined && orderDirection !== null) {
            queryParameters = this.addToHttpParams(queryParameters, orderDirection, 'order_direction');
        }
        if (hydrate !== undefined && hydrate !== null) {
            queryParameters = this.addToHttpParams(queryParameters, hydrate, 'hydrate');
        }
        if (filters !== undefined && filters !== null) {
            queryParameters = this.addToHttpParams(queryParameters, filters, 'filters');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(this.configuration.basePath + "/api/v1/content/product", {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentProductService.prototype.updateProduct = function (id, productWithoutInternal, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateProduct.');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.put(this.configuration.basePath + "/api/v1/content/product/" + encodeURIComponent(String(id)), productWithoutInternal, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    ContentProductService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    ContentProductService.ɵprov = ɵɵdefineInjectable({ factory: function ContentProductService_Factory() { return new ContentProductService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: ContentProductService, providedIn: "root" });
    ContentProductService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], ContentProductService);
    return ContentProductService;
}());

var GraphQLService = /** @class */ (function () {
    function GraphQLService(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'https://api.flotiq.com';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }
    GraphQLService.prototype.addToHttpParams = function (httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    };
    GraphQLService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
        var _this = this;
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
            }
            else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                }
                else {
                    throw Error("key may not be null if value is Date");
                }
            }
            else {
                Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    };
    GraphQLService.prototype.graphQL = function (inlineObject, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(this.configuration.basePath + "/api/graphql", inlineObject, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    GraphQLService.prototype.graphQLSchema = function (observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(this.configuration.basePath + "/api/graphql/schema", {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    GraphQLService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    GraphQLService.ɵprov = ɵɵdefineInjectable({ factory: function GraphQLService_Factory() { return new GraphQLService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: GraphQLService, providedIn: "root" });
    GraphQLService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], GraphQLService);
    return GraphQLService;
}());

var InternalService = /** @class */ (function () {
    function InternalService(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'https://api.flotiq.com';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }
    InternalService.prototype.addToHttpParams = function (httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    };
    InternalService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
        var _this = this;
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
            }
            else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                }
                else {
                    throw Error("key may not be null if value is Date");
                }
            }
            else {
                Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    };
    InternalService.prototype.deleteContentDefinition = function (id, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteContentDefinition.');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.delete(this.configuration.basePath + "/api/v1/internal/contenttype/" + encodeURIComponent(String(id)), {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    InternalService.prototype.getContentDefinition = function (id, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getContentDefinition.');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(this.configuration.basePath + "/api/v1/internal/contenttype/" + encodeURIComponent(String(id)), {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    InternalService.prototype.getContentDefinitions = function (observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(this.configuration.basePath + "/api/v1/internal/contenttype", {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    InternalService.prototype.postContentDefinition = function (contentTypeDefinitionSchema, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(this.configuration.basePath + "/api/v1/internal/contenttype", contentTypeDefinitionSchema, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    InternalService.prototype.putContentDefinition = function (id, contentTypeDefinitionSchema, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling putContentDefinition.');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'application/json'
        ];
        var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.put(this.configuration.basePath + "/api/v1/internal/contenttype/" + encodeURIComponent(String(id)), contentTypeDefinitionSchema, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    InternalService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    InternalService.ɵprov = ɵɵdefineInjectable({ factory: function InternalService_Factory() { return new InternalService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: InternalService, providedIn: "root" });
    InternalService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], InternalService);
    return InternalService;
}());

var MediaService = /** @class */ (function () {
    function MediaService(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'https://api.flotiq.com';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }
    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    MediaService.prototype.canConsumeForm = function (consumes) {
        var e_1, _a;
        var form = 'multipart/form-data';
        try {
            for (var consumes_1 = __values(consumes), consumes_1_1 = consumes_1.next(); !consumes_1_1.done; consumes_1_1 = consumes_1.next()) {
                var consume = consumes_1_1.value;
                if (form === consume) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (consumes_1_1 && !consumes_1_1.done && (_a = consumes_1.return)) _a.call(consumes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    MediaService.prototype.addToHttpParams = function (httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    };
    MediaService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
        var _this = this;
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
            }
            else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                }
                else {
                    throw Error("key may not be null if value is Date");
                }
            }
            else {
                Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    };
    MediaService.prototype.getMedia = function (widthHeight, key, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (widthHeight === null || widthHeight === undefined) {
            throw new Error('Required parameter widthHeight was null or undefined when calling getMedia.');
        }
        if (key === null || key === undefined) {
            throw new Error('Required parameter key was null or undefined when calling getMedia.');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key_1 = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key_1) {
                headers = headers.set('X-AUTH-TOKEN', key_1);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(this.configuration.basePath + "/image/" + encodeURIComponent(String(widthHeight)) + "/" + encodeURIComponent(String(key)), {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    MediaService.prototype.postMedia = function (file, type, save, observe, reportProgress, options) {
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        if (file === null || file === undefined) {
            throw new Error('Required parameter file was null or undefined when calling postMedia.');
        }
        if (type === null || type === undefined) {
            throw new Error('Required parameter type was null or undefined when calling postMedia.');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        var consumes = [
            'multipart/form-data'
        ];
        var canConsumeForm = this.canConsumeForm(consumes);
        var formParams;
        var useForm = false;
        var convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        }
        else {
            formParams = new HttpParams({ encoder: this.encoder });
        }
        if (file !== undefined) {
            formParams = formParams.append('file', file) || formParams;
        }
        if (type !== undefined) {
            formParams = formParams.append('type', type) || formParams;
        }
        if (save !== undefined) {
            formParams = formParams.append('save', save) || formParams;
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(this.configuration.basePath + "/api/media", convertFormParamsToString ? formParams.toString() : formParams, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    MediaService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    MediaService.ɵprov = ɵɵdefineInjectable({ factory: function MediaService_Factory() { return new MediaService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: MediaService, providedIn: "root" });
    MediaService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], MediaService);
    return MediaService;
}());

var SearchAPIService = /** @class */ (function () {
    function SearchAPIService(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'https://api.flotiq.com';
        this.defaultHeaders = new HttpHeaders();
        this.configuration = new Configuration();
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }
    SearchAPIService.prototype.addToHttpParams = function (httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    };
    SearchAPIService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
        var _this = this;
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
            }
            else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                }
                else {
                    throw Error("key may not be null if value is Date");
                }
            }
            else {
                Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    };
    SearchAPIService.prototype.search = function (q, fields, page, limit, orderBy, orderDirection, contentType, aggregateBy, filters, postFilters, geoFilters, observe, reportProgress, options) {
        var _this = this;
        if (observe === void 0) { observe = 'body'; }
        if (reportProgress === void 0) { reportProgress = false; }
        var queryParameters = new HttpParams({ encoder: this.encoder });
        if (q !== undefined && q !== null) {
            queryParameters = this.addToHttpParams(queryParameters, q, 'q');
        }
        if (fields) {
            fields.forEach(function (element) {
                queryParameters = _this.addToHttpParams(queryParameters, element, 'fields[]');
            });
        }
        if (page !== undefined && page !== null) {
            queryParameters = this.addToHttpParams(queryParameters, page, 'page');
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = this.addToHttpParams(queryParameters, limit, 'limit');
        }
        if (orderBy !== undefined && orderBy !== null) {
            queryParameters = this.addToHttpParams(queryParameters, orderBy, 'order_by');
        }
        if (orderDirection !== undefined && orderDirection !== null) {
            queryParameters = this.addToHttpParams(queryParameters, orderDirection, 'order_direction');
        }
        if (contentType) {
            contentType.forEach(function (element) {
                queryParameters = _this.addToHttpParams(queryParameters, element, 'content_type[]');
            });
        }
        if (aggregateBy) {
            aggregateBy.forEach(function (element) {
                queryParameters = _this.addToHttpParams(queryParameters, element, 'aggregate_by[]');
            });
        }
        if (filters !== undefined && filters !== null) {
            queryParameters = this.addToHttpParams(queryParameters, filters, 'filters');
        }
        if (postFilters !== undefined && postFilters !== null) {
            queryParameters = this.addToHttpParams(queryParameters, postFilters, 'post_filters');
        }
        if (geoFilters !== undefined && geoFilters !== null) {
            queryParameters = this.addToHttpParams(queryParameters, geoFilters, 'geo_filters');
        }
        var headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            var key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            var httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        var responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(this.configuration.basePath + "/api/v1/search", {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    };
    SearchAPIService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: Optional }] }
    ]; };
    SearchAPIService.ɵprov = ɵɵdefineInjectable({ factory: function SearchAPIService_Factory() { return new SearchAPIService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: SearchAPIService, providedIn: "root" });
    SearchAPIService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
    ], SearchAPIService);
    return SearchAPIService;
}());

var APIS = [ContentMediaService, ContentProductService, GraphQLService, InternalService, MediaService, SearchAPIService];

var AbstractPropertiesConfig;
(function (AbstractPropertiesConfig) {
    AbstractPropertiesConfig.InputTypeEnum = {
        Text: 'text',
        Richtext: 'richtext',
        Textarea: 'textarea',
        TextMarkdown: 'textMarkdown',
        Email: 'email',
        Number: 'number',
        Radio: 'radio',
        Checkbox: 'checkbox',
        Select: 'select',
        Datasource: 'datasource',
        Object: 'object',
        Geo: 'geo'
    };
})(AbstractPropertiesConfig || (AbstractPropertiesConfig = {}));

/**
 * Flotiq User API
 * ## Getting started   This is your Flotiq User API that allows you to access your data through the Content API that you defined.   ### Access to data   There are several methods that you can use to access your data:  * Live API docs - available via <code>Try it out</code> button available next to each endpoint   * Copying example code on the right side of each endpoint  * By downloading the SDKs available in mulitple languages.  * By downloading the Postman collection and importing it into Postman.    Each of these methods is described in length in the [user documentation](https://flotiq.com/docs/).   ### Authorization   In order to make use of the provided documentation, example code, SDKs and so on - you will need to pull out your API key. We recommend that you start with the ReadOnly API Key which will allow you to make all the `GET` requests but will error-out when you try to modify content. Please remember to replace the key for `POST`, `PUT` and `DELETE` calls.   It\'s also possible to use scoped API keys - you can create those in the API keys section of the Flotiq user interface. This will allow you to create a key that only authorizes access to a specific content type (or a set of content types, if you choose so). Read more about how to use and create API keys in the [API keys documentation](https://flotiq.com/docs/API/).   ## Object access   Once you define a Content Type it will become available in your Content API as a set of endpoints that will allow you to work with objects:   * create  * list  * update  * delete  * batch create  * retrieve single object.  ### Hydration   When you build Content Types that have relation to others your objects will optionally support hydration of related entities. The endpoints that support object retrieval accept a `hydrate` parameter, which can be used to easily fetch hydrated objects. Since this breaks the standard REST concepts - it\'s not enabled by default, but it\'s a very handy feature that allows to reduce the amount of HTTP requests sent over the wire and we strongly recommend to use it.
 *
 * The version of the OpenAPI document: 2.0.1
 * Contact: hello@flotiq.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
var DataSource;
(function (DataSource) {
    DataSource.TypeEnum = {
        Internal: 'internal',
        External: 'external'
    };
})(DataSource || (DataSource = {}));

/**
 * Flotiq User API
 * ## Getting started   This is your Flotiq User API that allows you to access your data through the Content API that you defined.   ### Access to data   There are several methods that you can use to access your data:  * Live API docs - available via <code>Try it out</code> button available next to each endpoint   * Copying example code on the right side of each endpoint  * By downloading the SDKs available in mulitple languages.  * By downloading the Postman collection and importing it into Postman.    Each of these methods is described in length in the [user documentation](https://flotiq.com/docs/).   ### Authorization   In order to make use of the provided documentation, example code, SDKs and so on - you will need to pull out your API key. We recommend that you start with the ReadOnly API Key which will allow you to make all the `GET` requests but will error-out when you try to modify content. Please remember to replace the key for `POST`, `PUT` and `DELETE` calls.   It\'s also possible to use scoped API keys - you can create those in the API keys section of the Flotiq user interface. This will allow you to create a key that only authorizes access to a specific content type (or a set of content types, if you choose so). Read more about how to use and create API keys in the [API keys documentation](https://flotiq.com/docs/API/).   ## Object access   Once you define a Content Type it will become available in your Content API as a set of endpoints that will allow you to work with objects:   * create  * list  * update  * delete  * batch create  * retrieve single object.  ### Hydration   When you build Content Types that have relation to others your objects will optionally support hydration of related entities. The endpoints that support object retrieval accept a `hydrate` parameter, which can be used to easily fetch hydrated objects. Since this breaks the standard REST concepts - it\'s not enabled by default, but it\'s a very handy feature that allows to reduce the amount of HTTP requests sent over the wire and we strongly recommend to use it.
 *
 * The version of the OpenAPI document: 2.0.1
 * Contact: hello@flotiq.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
var InlineObject1;
(function (InlineObject1) {
    InlineObject1.TypeEnum = {
        Image: 'image',
        File: 'file'
    };
})(InlineObject1 || (InlineObject1 = {}));

var ApiModule = /** @class */ (function () {
    function ApiModule(parentModule, http) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
    ApiModule_1 = ApiModule;
    ApiModule.forRoot = function (configurationFactory) {
        return {
            ngModule: ApiModule_1,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    };
    var ApiModule_1;
    ApiModule.ctorParameters = function () { return [
        { type: ApiModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: HttpClient, decorators: [{ type: Optional }] }
    ]; };
    ApiModule = ApiModule_1 = __decorate([
        NgModule({
            imports: [],
            declarations: [],
            exports: [],
            providers: []
        }),
        __param(0, Optional()), __param(0, SkipSelf()),
        __param(1, Optional())
    ], ApiModule);
    return ApiModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { APIS, AbstractPropertiesConfig, ApiModule, BASE_PATH, COLLECTION_FORMATS, Configuration, ContentMediaService, ContentProductService, DataSource, GraphQLService, InlineObject1, InternalService, MediaService, SearchAPIService };
//# sourceMappingURL=flotiq.js.map
