import { __decorate, __param } from 'tslib';
import { InjectionToken, Optional, Inject, ɵɵdefineInjectable, ɵɵinject, Injectable, SkipSelf, NgModule } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

/**
 * Custom HttpParameterCodec
 * Workaround for https://github.com/angular/angular/issues/18261
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common/http';
class CustomHttpParameterCodec {
    encodeKey(k) {
        return encodeURIComponent(k);
    }
    encodeValue(v) {
        return encodeURIComponent(v);
    }
    decodeKey(k) {
        return decodeURIComponent(k);
    }
    decodeValue(v) {
        return decodeURIComponent(v);
    }
}

const BASE_PATH = new InjectionToken('basePath');
const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
};

class Configuration {
    constructor(configurationParameters = {}) {
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
    selectHeaderContentType(contentTypes) {
        if (contentTypes.length === 0) {
            return undefined;
        }
        const type = contentTypes.find((x) => this.isJsonMime(x));
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    }
    /**
     * Select the correct accept content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param accepts - the array of content types that are available for selection.
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    selectHeaderAccept(accepts) {
        if (accepts.length === 0) {
            return undefined;
        }
        const type = accepts.find((x) => this.isJsonMime(x));
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    }
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
    isJsonMime(mime) {
        const jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    }
}

let ContentMediaService = class ContentMediaService {
    constructor(httpClient, basePath, configuration) {
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
    addToHttpParams(httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }
    addToHttpParamsRecursive(httpParams, value, key) {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
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
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    batchCreateMedia(updateExisting, mediaWithoutInternal, observe = 'body', reportProgress = false, options) {
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (updateExisting !== undefined && updateExisting !== null) {
            queryParameters = this.addToHttpParams(queryParameters, updateExisting, 'updateExisting');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(`${this.configuration.basePath}/api/v1/content/_media/batch`, mediaWithoutInternal, {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    createMedia(mediaWithoutInternal, observe = 'body', reportProgress = false, options) {
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(`${this.configuration.basePath}/api/v1/content/_media`, mediaWithoutInternal, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    deleteMedia(id, observe = 'body', reportProgress = false, options) {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteMedia.');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.delete(`${this.configuration.basePath}/api/v1/content/_media/${encodeURIComponent(String(id))}`, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getMedia(id, hydrate, observe = 'body', reportProgress = false, options) {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getMedia.');
        }
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (hydrate !== undefined && hydrate !== null) {
            queryParameters = this.addToHttpParams(queryParameters, hydrate, 'hydrate');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(`${this.configuration.basePath}/api/v1/content/_media/${encodeURIComponent(String(id))}`, {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getRemovedMedia(deletedAfter, observe = 'body', reportProgress = false, options) {
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (deletedAfter !== undefined && deletedAfter !== null) {
            queryParameters = this.addToHttpParams(queryParameters, deletedAfter, 'deletedAfter');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(`${this.configuration.basePath}/api/v1/content/_media/removed`, {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    listMedia(page, limit, orderBy, orderDirection, hydrate, filters, observe = 'body', reportProgress = false, options) {
        let queryParameters = new HttpParams({ encoder: this.encoder });
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
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(`${this.configuration.basePath}/api/v1/content/_media`, {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    updateMedia(id, mediaWithoutInternal, observe = 'body', reportProgress = false, options) {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateMedia.');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.put(`${this.configuration.basePath}/api/v1/content/_media/${encodeURIComponent(String(id))}`, mediaWithoutInternal, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
ContentMediaService.ɵfac = function ContentMediaService_Factory(t) { return new (t || ContentMediaService)(ɵngcc0.ɵɵinject(ɵngcc1.HttpClient), ɵngcc0.ɵɵinject(BASE_PATH, 8), ɵngcc0.ɵɵinject(Configuration, 8)); };
ContentMediaService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
ContentMediaService.ɵprov = ɵɵdefineInjectable({ factory: function ContentMediaService_Factory() { return new ContentMediaService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: ContentMediaService, providedIn: "root" });
ContentMediaService = __decorate([ __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], ContentMediaService);

let ContentProductService = class ContentProductService {
    constructor(httpClient, basePath, configuration) {
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
    addToHttpParams(httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }
    addToHttpParamsRecursive(httpParams, value, key) {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
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
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    batchCreateProduct(updateExisting, productWithoutInternal, observe = 'body', reportProgress = false, options) {
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (updateExisting !== undefined && updateExisting !== null) {
            queryParameters = this.addToHttpParams(queryParameters, updateExisting, 'updateExisting');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(`${this.configuration.basePath}/api/v1/content/product/batch`, productWithoutInternal, {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    createProduct(productWithoutInternal, observe = 'body', reportProgress = false, options) {
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(`${this.configuration.basePath}/api/v1/content/product`, productWithoutInternal, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    deleteProduct(id, observe = 'body', reportProgress = false, options) {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteProduct.');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.delete(`${this.configuration.basePath}/api/v1/content/product/${encodeURIComponent(String(id))}`, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getProduct(id, hydrate, observe = 'body', reportProgress = false, options) {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getProduct.');
        }
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (hydrate !== undefined && hydrate !== null) {
            queryParameters = this.addToHttpParams(queryParameters, hydrate, 'hydrate');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(`${this.configuration.basePath}/api/v1/content/product/${encodeURIComponent(String(id))}`, {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getRemovedProduct(deletedAfter, observe = 'body', reportProgress = false, options) {
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (deletedAfter !== undefined && deletedAfter !== null) {
            queryParameters = this.addToHttpParams(queryParameters, deletedAfter, 'deletedAfter');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(`${this.configuration.basePath}/api/v1/content/product/removed`, {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    listProduct(page, limit, orderBy, orderDirection, hydrate, filters, observe = 'body', reportProgress = false, options) {
        let queryParameters = new HttpParams({ encoder: this.encoder });
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
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(`${this.configuration.basePath}/api/v1/content/product`, {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    updateProduct(id, productWithoutInternal, observe = 'body', reportProgress = false, options) {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateProduct.');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.put(`${this.configuration.basePath}/api/v1/content/product/${encodeURIComponent(String(id))}`, productWithoutInternal, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
ContentProductService.ɵfac = function ContentProductService_Factory(t) { return new (t || ContentProductService)(ɵngcc0.ɵɵinject(ɵngcc1.HttpClient), ɵngcc0.ɵɵinject(BASE_PATH, 8), ɵngcc0.ɵɵinject(Configuration, 8)); };
ContentProductService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
ContentProductService.ɵprov = ɵɵdefineInjectable({ factory: function ContentProductService_Factory() { return new ContentProductService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: ContentProductService, providedIn: "root" });
ContentProductService = __decorate([ __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], ContentProductService);

let GraphQLService = class GraphQLService {
    constructor(httpClient, basePath, configuration) {
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
    addToHttpParams(httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }
    addToHttpParamsRecursive(httpParams, value, key) {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
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
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    graphQL(inlineObject, observe = 'body', reportProgress = false, options) {
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(`${this.configuration.basePath}/api/graphql`, inlineObject, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    graphQLSchema(observe = 'body', reportProgress = false, options) {
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(`${this.configuration.basePath}/api/graphql/schema`, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
GraphQLService.ɵfac = function GraphQLService_Factory(t) { return new (t || GraphQLService)(ɵngcc0.ɵɵinject(ɵngcc1.HttpClient), ɵngcc0.ɵɵinject(BASE_PATH, 8), ɵngcc0.ɵɵinject(Configuration, 8)); };
GraphQLService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
GraphQLService.ɵprov = ɵɵdefineInjectable({ factory: function GraphQLService_Factory() { return new GraphQLService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: GraphQLService, providedIn: "root" });
GraphQLService = __decorate([ __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], GraphQLService);

let InternalService = class InternalService {
    constructor(httpClient, basePath, configuration) {
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
    addToHttpParams(httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }
    addToHttpParamsRecursive(httpParams, value, key) {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
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
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    deleteContentDefinition(id, observe = 'body', reportProgress = false, options) {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteContentDefinition.');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.delete(`${this.configuration.basePath}/api/v1/internal/contenttype/${encodeURIComponent(String(id))}`, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getContentDefinition(id, observe = 'body', reportProgress = false, options) {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getContentDefinition.');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(`${this.configuration.basePath}/api/v1/internal/contenttype/${encodeURIComponent(String(id))}`, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    getContentDefinitions(observe = 'body', reportProgress = false, options) {
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(`${this.configuration.basePath}/api/v1/internal/contenttype`, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    postContentDefinition(contentTypeDefinitionSchema, observe = 'body', reportProgress = false, options) {
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(`${this.configuration.basePath}/api/v1/internal/contenttype`, contentTypeDefinitionSchema, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    putContentDefinition(id, contentTypeDefinitionSchema, observe = 'body', reportProgress = false, options) {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling putContentDefinition.');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.put(`${this.configuration.basePath}/api/v1/internal/contenttype/${encodeURIComponent(String(id))}`, contentTypeDefinitionSchema, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
InternalService.ɵfac = function InternalService_Factory(t) { return new (t || InternalService)(ɵngcc0.ɵɵinject(ɵngcc1.HttpClient), ɵngcc0.ɵɵinject(BASE_PATH, 8), ɵngcc0.ɵɵinject(Configuration, 8)); };
InternalService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
InternalService.ɵprov = ɵɵdefineInjectable({ factory: function InternalService_Factory() { return new InternalService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: InternalService, providedIn: "root" });
InternalService = __decorate([ __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], InternalService);

let MediaService = class MediaService {
    constructor(httpClient, basePath, configuration) {
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
    canConsumeForm(consumes) {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }
    addToHttpParams(httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }
    addToHttpParamsRecursive(httpParams, value, key) {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
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
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    getMedia(widthHeight, key, observe = 'body', reportProgress = false, options) {
        if (widthHeight === null || widthHeight === undefined) {
            throw new Error('Required parameter widthHeight was null or undefined when calling getMedia.');
        }
        if (key === null || key === undefined) {
            throw new Error('Required parameter key was null or undefined when calling getMedia.');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(`${this.configuration.basePath}/image/${encodeURIComponent(String(widthHeight))}/${encodeURIComponent(String(key))}`, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    postMedia(file, type, save, observe = 'body', reportProgress = false, options) {
        if (file === null || file === undefined) {
            throw new Error('Required parameter file was null or undefined when calling postMedia.');
        }
        if (type === null || type === undefined) {
            throw new Error('Required parameter type was null or undefined when calling postMedia.');
        }
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'multipart/form-data'
        ];
        const canConsumeForm = this.canConsumeForm(consumes);
        let formParams;
        let useForm = false;
        let convertFormParamsToString = false;
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
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.post(`${this.configuration.basePath}/api/media`, convertFormParamsToString ? formParams.toString() : formParams, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
MediaService.ɵfac = function MediaService_Factory(t) { return new (t || MediaService)(ɵngcc0.ɵɵinject(ɵngcc1.HttpClient), ɵngcc0.ɵɵinject(BASE_PATH, 8), ɵngcc0.ɵɵinject(Configuration, 8)); };
MediaService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
MediaService.ɵprov = ɵɵdefineInjectable({ factory: function MediaService_Factory() { return new MediaService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: MediaService, providedIn: "root" });
MediaService = __decorate([ __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], MediaService);

let SearchAPIService = class SearchAPIService {
    constructor(httpClient, basePath, configuration) {
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
    addToHttpParams(httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }
    addToHttpParamsRecursive(httpParams, value, key) {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
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
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    search(q, fields, page, limit, orderBy, orderDirection, contentType, aggregateBy, filters, postFilters, geoFilters, observe = 'body', reportProgress = false, options) {
        let queryParameters = new HttpParams({ encoder: this.encoder });
        if (q !== undefined && q !== null) {
            queryParameters = this.addToHttpParams(queryParameters, q, 'q');
        }
        if (fields) {
            fields.forEach((element) => {
                queryParameters = this.addToHttpParams(queryParameters, element, 'fields[]');
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
            contentType.forEach((element) => {
                queryParameters = this.addToHttpParams(queryParameters, element, 'content_type[]');
            });
        }
        if (aggregateBy) {
            aggregateBy.forEach((element) => {
                queryParameters = this.addToHttpParams(queryParameters, element, 'aggregate_by[]');
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
        let headers = this.defaultHeaders;
        // authentication (HeaderApiKeyAuth) required
        if (this.configuration.apiKeys) {
            const key = this.configuration.apiKeys["HeaderApiKeyAuth"] || this.configuration.apiKeys["X-AUTH-TOKEN"];
            if (key) {
                headers = headers.set('X-AUTH-TOKEN', key);
            }
        }
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(`${this.configuration.basePath}/api/v1/search`, {
            params: queryParameters,
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
SearchAPIService.ɵfac = function SearchAPIService_Factory(t) { return new (t || SearchAPIService)(ɵngcc0.ɵɵinject(ɵngcc1.HttpClient), ɵngcc0.ɵɵinject(BASE_PATH, 8), ɵngcc0.ɵɵinject(Configuration, 8)); };
SearchAPIService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
SearchAPIService.ɵprov = ɵɵdefineInjectable({ factory: function SearchAPIService_Factory() { return new SearchAPIService(ɵɵinject(HttpClient), ɵɵinject(BASE_PATH, 8), ɵɵinject(Configuration, 8)); }, token: SearchAPIService, providedIn: "root" });
SearchAPIService = __decorate([ __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], SearchAPIService);

const APIS = [ContentMediaService, ContentProductService, GraphQLService, InternalService, MediaService, SearchAPIService];

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

var ApiModule_1;
let ApiModule = ApiModule_1 = class ApiModule {
    constructor(parentModule, http) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
    static forRoot(configurationFactory) {
        return {
            ngModule: ApiModule_1,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    }
};
ApiModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: ApiModule });
ApiModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function ApiModule_Factory(t) { return new (t || ApiModule)(ɵngcc0.ɵɵinject(ApiModule, 12), ɵngcc0.ɵɵinject(ɵngcc1.HttpClient, 8)); }, providers: [], imports: [[]] });
ApiModule.ctorParameters = () => [
    { type: ApiModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: HttpClient, decorators: [{ type: Optional }] }
];
ApiModule = ApiModule_1 = __decorate([ __param(0, Optional()), __param(0, SkipSelf()),
    __param(1, Optional())
], ApiModule);
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ContentMediaService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ɵngcc1.HttpClient }, { type: String, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [BASE_PATH]
            }] }, { type: Configuration, decorators: [{
                type: Optional
            }] }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ContentProductService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ɵngcc1.HttpClient }, { type: String, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [BASE_PATH]
            }] }, { type: Configuration, decorators: [{
                type: Optional
            }] }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(GraphQLService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ɵngcc1.HttpClient }, { type: String, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [BASE_PATH]
            }] }, { type: Configuration, decorators: [{
                type: Optional
            }] }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(InternalService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ɵngcc1.HttpClient }, { type: String, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [BASE_PATH]
            }] }, { type: Configuration, decorators: [{
                type: Optional
            }] }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(MediaService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ɵngcc1.HttpClient }, { type: String, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [BASE_PATH]
            }] }, { type: Configuration, decorators: [{
                type: Optional
            }] }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SearchAPIService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ɵngcc1.HttpClient }, { type: String, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [BASE_PATH]
            }] }, { type: Configuration, decorators: [{
                type: Optional
            }] }]; }, null); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ApiModule, [{
        type: NgModule,
        args: [{
                imports: [],
                declarations: [],
                exports: [],
                providers: []
            }]
    }], function () { return [{ type: ApiModule, decorators: [{
                type: Optional
            }, {
                type: SkipSelf
            }] }, { type: ɵngcc1.HttpClient, decorators: [{
                type: Optional
            }] }]; }, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { APIS, AbstractPropertiesConfig, ApiModule, BASE_PATH, COLLECTION_FORMATS, Configuration, ContentMediaService, ContentProductService, DataSource, GraphQLService, InlineObject1, InternalService, MediaService, SearchAPIService };

//# sourceMappingURL=flotiq.js.map