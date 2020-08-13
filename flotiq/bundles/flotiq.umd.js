(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('flotiq', ['exports', '@angular/core', '@angular/common/http'], factory) :
    (global = global || self, factory(global.flotiq = {}, global.ng.core, global.ng.common.http));
}(this, (function (exports, core, http) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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

    var BASE_PATH = new core.InjectionToken('basePath');
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
            this.defaultHeaders = new http.HttpHeaders();
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        ContentMediaService.ɵprov = core.ɵɵdefineInjectable({ factory: function ContentMediaService_Factory() { return new ContentMediaService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: ContentMediaService, providedIn: "root" });
        ContentMediaService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], ContentMediaService);
        return ContentMediaService;
    }());

    var ContentProductService = /** @class */ (function () {
        function ContentProductService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'https://api.flotiq.com';
            this.defaultHeaders = new http.HttpHeaders();
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        ContentProductService.ɵprov = core.ɵɵdefineInjectable({ factory: function ContentProductService_Factory() { return new ContentProductService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: ContentProductService, providedIn: "root" });
        ContentProductService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], ContentProductService);
        return ContentProductService;
    }());

    var GraphQLService = /** @class */ (function () {
        function GraphQLService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'https://api.flotiq.com';
            this.defaultHeaders = new http.HttpHeaders();
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        GraphQLService.ɵprov = core.ɵɵdefineInjectable({ factory: function GraphQLService_Factory() { return new GraphQLService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: GraphQLService, providedIn: "root" });
        GraphQLService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], GraphQLService);
        return GraphQLService;
    }());

    var InternalService = /** @class */ (function () {
        function InternalService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'https://api.flotiq.com';
            this.defaultHeaders = new http.HttpHeaders();
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        InternalService.ɵprov = core.ɵɵdefineInjectable({ factory: function InternalService_Factory() { return new InternalService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: InternalService, providedIn: "root" });
        InternalService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], InternalService);
        return InternalService;
    }());

    var MediaService = /** @class */ (function () {
        function MediaService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'https://api.flotiq.com';
            this.defaultHeaders = new http.HttpHeaders();
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
                formParams = new http.HttpParams({ encoder: this.encoder });
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        MediaService.ɵprov = core.ɵɵdefineInjectable({ factory: function MediaService_Factory() { return new MediaService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: MediaService, providedIn: "root" });
        MediaService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], MediaService);
        return MediaService;
    }());

    var SearchAPIService = /** @class */ (function () {
        function SearchAPIService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'https://api.flotiq.com';
            this.defaultHeaders = new http.HttpHeaders();
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
            var queryParameters = new http.HttpParams({ encoder: this.encoder });
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
            { type: http.HttpClient },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [BASE_PATH,] }] },
            { type: Configuration, decorators: [{ type: core.Optional }] }
        ]; };
        SearchAPIService.ɵprov = core.ɵɵdefineInjectable({ factory: function SearchAPIService_Factory() { return new SearchAPIService(core.ɵɵinject(http.HttpClient), core.ɵɵinject(BASE_PATH, 8), core.ɵɵinject(Configuration, 8)); }, token: SearchAPIService, providedIn: "root" });
        SearchAPIService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(1, core.Optional()), __param(1, core.Inject(BASE_PATH)), __param(2, core.Optional())
        ], SearchAPIService);
        return SearchAPIService;
    }());

    var APIS = [ContentMediaService, ContentProductService, GraphQLService, InternalService, MediaService, SearchAPIService];


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
    })(exports.AbstractPropertiesConfig || (exports.AbstractPropertiesConfig = {}));

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

    (function (DataSource) {
        DataSource.TypeEnum = {
            Internal: 'internal',
            External: 'external'
        };
    })(exports.DataSource || (exports.DataSource = {}));

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

    (function (InlineObject1) {
        InlineObject1.TypeEnum = {
            Image: 'image',
            File: 'file'
        };
    })(exports.InlineObject1 || (exports.InlineObject1 = {}));

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
            { type: ApiModule, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
            { type: http.HttpClient, decorators: [{ type: core.Optional }] }
        ]; };
        ApiModule = ApiModule_1 = __decorate([
            core.NgModule({
                imports: [],
                declarations: [],
                exports: [],
                providers: []
            }),
            __param(0, core.Optional()), __param(0, core.SkipSelf()),
            __param(1, core.Optional())
        ], ApiModule);
        return ApiModule;
    }());

    exports.APIS = APIS;
    exports.ApiModule = ApiModule;
    exports.BASE_PATH = BASE_PATH;
    exports.COLLECTION_FORMATS = COLLECTION_FORMATS;
    exports.Configuration = Configuration;
    exports.ContentMediaService = ContentMediaService;
    exports.ContentProductService = ContentProductService;
    exports.GraphQLService = GraphQLService;
    exports.InternalService = InternalService;
    exports.MediaService = MediaService;
    exports.SearchAPIService = SearchAPIService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=flotiq.umd.js.map
