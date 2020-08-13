import { __decorate, __param } from "tslib";
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
/* tslint:disable:no-unused-variable member-ordering */
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent, HttpParameterCodec } from '@angular/common/http';
import { CustomHttpParameterCodec } from '../encoder';
import { BASE_PATH } from '../variables';
import { Configuration } from '../configuration';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../variables";
import * as i3 from "../configuration";
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
MediaService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
MediaService.ɵprov = i0.ɵɵdefineInjectable({ factory: function MediaService_Factory() { return new MediaService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.BASE_PATH, 8), i0.ɵɵinject(i3.Configuration, 8)); }, token: MediaService, providedIn: "root" });
MediaService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], MediaService);
export { MediaService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Zsb3RpcS8iLCJzb3VyY2VzIjpbImFwaS9tZWRpYS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHO0FBQ0gsdURBQXVEO0FBRXZELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUEyQixlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUNuQyxZQUFZLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQVksc0JBQXNCLENBQUM7QUFDekYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQStCLFlBQVksQ0FBQztBQUkvRSxPQUFPLEVBQUUsU0FBUyxFQUFzQixNQUEwQixjQUFjLENBQUM7QUFDakYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUEwQyxrQkFBa0IsQ0FBQzs7Ozs7QUFPckYsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQU9yQixZQUFzQixVQUFzQixFQUFnQyxRQUFnQixFQUFjLGFBQTRCO1FBQWhILGVBQVUsR0FBVixVQUFVLENBQVk7UUFMbEMsYUFBUSxHQUFHLHdCQUF3QixDQUFDO1FBQ3ZDLG1CQUFjLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNuQyxrQkFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFJdkMsSUFBSSxhQUFhLEVBQUU7WUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztTQUN0QztRQUNELElBQUksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDakQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQzlCLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQzFDO1FB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QUMzQyxJQUFHLHdCQUF3QixJQUFJLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN4RSxZQUFZLEdBQUcsTUFBTSxDQUFDO1NBQ3pCO1FBRUQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxZQUFZLEVBQ3ZFLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFDOUQ7WUFDSSxZQUFZLEVBQU8sWUFBWTtZQUMvQixlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlO1lBQ25ELE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLGNBQWMsRUFBRSxjQUFjO1NBQ2pDLENBQ0osQ0FBQztJQUNOLENBQUM7Q0FFSixDQUFBOztZQTlNcUMsVUFBVTt5Q0FBRyxRQUFRLFlBQUcsTUFBTSxTQUFDLFNBQVM7WUFBK0MsYUFBYSx1QkFBdkMsUUFBUTs7O0FBUDlGLFlBQVk7SUFIeEIsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztJQVFpRCxXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUMsV0FBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUEsRUFBb0IsV0FBQSxRQUFRLEVBQUUsQ0FBQTtHQVBoRyxZQUFZLENBcU54QjtTQXJOWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGbG90aXEgVXNlciBBUElcbiAqICMjIEdldHRpbmcgc3RhcnRlZCAgIFRoaXMgaXMgeW91ciBGbG90aXEgVXNlciBBUEkgdGhhdCBhbGxvd3MgeW91IHRvIGFjY2VzcyB5b3VyIGRhdGEgdGhyb3VnaCB0aGUgQ29udGVudCBBUEkgdGhhdCB5b3UgZGVmaW5lZC4gICAjIyMgQWNjZXNzIHRvIGRhdGEgICBUaGVyZSBhcmUgc2V2ZXJhbCBtZXRob2RzIHRoYXQgeW91IGNhbiB1c2UgdG8gYWNjZXNzIHlvdXIgZGF0YTogICogTGl2ZSBBUEkgZG9jcyAtIGF2YWlsYWJsZSB2aWEgPGNvZGU+VHJ5IGl0IG91dDwvY29kZT4gYnV0dG9uIGF2YWlsYWJsZSBuZXh0IHRvIGVhY2ggZW5kcG9pbnQgICAqIENvcHlpbmcgZXhhbXBsZSBjb2RlIG9uIHRoZSByaWdodCBzaWRlIG9mIGVhY2ggZW5kcG9pbnQgICogQnkgZG93bmxvYWRpbmcgdGhlIFNES3MgYXZhaWxhYmxlIGluIG11bGl0cGxlIGxhbmd1YWdlcy4gICogQnkgZG93bmxvYWRpbmcgdGhlIFBvc3RtYW4gY29sbGVjdGlvbiBhbmQgaW1wb3J0aW5nIGl0IGludG8gUG9zdG1hbi4gICAgRWFjaCBvZiB0aGVzZSBtZXRob2RzIGlzIGRlc2NyaWJlZCBpbiBsZW5ndGggaW4gdGhlIFt1c2VyIGRvY3VtZW50YXRpb25dKGh0dHBzOi8vZmxvdGlxLmNvbS9kb2NzLykuICAgIyMjIEF1dGhvcml6YXRpb24gICBJbiBvcmRlciB0byBtYWtlIHVzZSBvZiB0aGUgcHJvdmlkZWQgZG9jdW1lbnRhdGlvbiwgZXhhbXBsZSBjb2RlLCBTREtzIGFuZCBzbyBvbiAtIHlvdSB3aWxsIG5lZWQgdG8gcHVsbCBvdXQgeW91ciBBUEkga2V5LiBXZSByZWNvbW1lbmQgdGhhdCB5b3Ugc3RhcnQgd2l0aCB0aGUgUmVhZE9ubHkgQVBJIEtleSB3aGljaCB3aWxsIGFsbG93IHlvdSB0byBtYWtlIGFsbCB0aGUgYEdFVGAgcmVxdWVzdHMgYnV0IHdpbGwgZXJyb3Itb3V0IHdoZW4geW91IHRyeSB0byBtb2RpZnkgY29udGVudC4gUGxlYXNlIHJlbWVtYmVyIHRvIHJlcGxhY2UgdGhlIGtleSBmb3IgYFBPU1RgLCBgUFVUYCBhbmQgYERFTEVURWAgY2FsbHMuICAgSXRcXCdzIGFsc28gcG9zc2libGUgdG8gdXNlIHNjb3BlZCBBUEkga2V5cyAtIHlvdSBjYW4gY3JlYXRlIHRob3NlIGluIHRoZSBBUEkga2V5cyBzZWN0aW9uIG9mIHRoZSBGbG90aXEgdXNlciBpbnRlcmZhY2UuIFRoaXMgd2lsbCBhbGxvdyB5b3UgdG8gY3JlYXRlIGEga2V5IHRoYXQgb25seSBhdXRob3JpemVzIGFjY2VzcyB0byBhIHNwZWNpZmljIGNvbnRlbnQgdHlwZSAob3IgYSBzZXQgb2YgY29udGVudCB0eXBlcywgaWYgeW91IGNob29zZSBzbykuIFJlYWQgbW9yZSBhYm91dCBob3cgdG8gdXNlIGFuZCBjcmVhdGUgQVBJIGtleXMgaW4gdGhlIFtBUEkga2V5cyBkb2N1bWVudGF0aW9uXShodHRwczovL2Zsb3RpcS5jb20vZG9jcy9BUEkvKS4gICAjIyBPYmplY3QgYWNjZXNzICAgT25jZSB5b3UgZGVmaW5lIGEgQ29udGVudCBUeXBlIGl0IHdpbGwgYmVjb21lIGF2YWlsYWJsZSBpbiB5b3VyIENvbnRlbnQgQVBJIGFzIGEgc2V0IG9mIGVuZHBvaW50cyB0aGF0IHdpbGwgYWxsb3cgeW91IHRvIHdvcmsgd2l0aCBvYmplY3RzOiAgICogY3JlYXRlICAqIGxpc3QgICogdXBkYXRlICAqIGRlbGV0ZSAgKiBiYXRjaCBjcmVhdGUgICogcmV0cmlldmUgc2luZ2xlIG9iamVjdC4gICMjIyBIeWRyYXRpb24gICBXaGVuIHlvdSBidWlsZCBDb250ZW50IFR5cGVzIHRoYXQgaGF2ZSByZWxhdGlvbiB0byBvdGhlcnMgeW91ciBvYmplY3RzIHdpbGwgb3B0aW9uYWxseSBzdXBwb3J0IGh5ZHJhdGlvbiBvZiByZWxhdGVkIGVudGl0aWVzLiBUaGUgZW5kcG9pbnRzIHRoYXQgc3VwcG9ydCBvYmplY3QgcmV0cmlldmFsIGFjY2VwdCBhIGBoeWRyYXRlYCBwYXJhbWV0ZXIsIHdoaWNoIGNhbiBiZSB1c2VkIHRvIGVhc2lseSBmZXRjaCBoeWRyYXRlZCBvYmplY3RzLiBTaW5jZSB0aGlzIGJyZWFrcyB0aGUgc3RhbmRhcmQgUkVTVCBjb25jZXB0cyAtIGl0XFwncyBub3QgZW5hYmxlZCBieSBkZWZhdWx0LCBidXQgaXRcXCdzIGEgdmVyeSBoYW5keSBmZWF0dXJlIHRoYXQgYWxsb3dzIHRvIHJlZHVjZSB0aGUgYW1vdW50IG9mIEhUVFAgcmVxdWVzdHMgc2VudCBvdmVyIHRoZSB3aXJlIGFuZCB3ZSBzdHJvbmdseSByZWNvbW1lbmQgdG8gdXNlIGl0LlxuICpcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBPcGVuQVBJIGRvY3VtZW50OiAyLjAuMVxuICogQ29udGFjdDogaGVsbG9AZmxvdGlxLmNvbVxuICpcbiAqIE5PVEU6IFRoaXMgY2xhc3MgaXMgYXV0byBnZW5lcmF0ZWQgYnkgT3BlbkFQSSBHZW5lcmF0b3IgKGh0dHBzOi8vb3BlbmFwaS1nZW5lcmF0b3IudGVjaCkuXG4gKiBodHRwczovL29wZW5hcGktZ2VuZXJhdG9yLnRlY2hcbiAqIERvIG5vdCBlZGl0IHRoZSBjbGFzcyBtYW51YWxseS5cbiAqL1xuLyogdHNsaW50OmRpc2FibGU6bm8tdW51c2VkLXZhcmlhYmxlIG1lbWJlci1vcmRlcmluZyAqL1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gICAgICAgICAgICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyxcbiAgICAgICAgIEh0dHBSZXNwb25zZSwgSHR0cEV2ZW50LCBIdHRwUGFyYW1ldGVyQ29kZWMgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDdXN0b21IdHRwUGFyYW1ldGVyQ29kZWMgfSAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vZW5jb2Rlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAncnhqcyc7XG5cblxuaW1wb3J0IHsgQkFTRV9QQVRILCBDT0xMRUNUSU9OX0ZPUk1BVFMgfSAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL3ZhcmlhYmxlcyc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vY29uZmlndXJhdGlvbic7XG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNZWRpYVNlcnZpY2Uge1xuXG4gICAgcHJvdGVjdGVkIGJhc2VQYXRoID0gJ2h0dHBzOi8vYXBpLmZsb3RpcS5jb20nO1xuICAgIHB1YmxpYyBkZWZhdWx0SGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIHB1YmxpYyBjb25maWd1cmF0aW9uID0gbmV3IENvbmZpZ3VyYXRpb24oKTtcbiAgICBwdWJsaWMgZW5jb2RlcjogSHR0cFBhcmFtZXRlckNvZGVjO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIEBPcHRpb25hbCgpQEluamVjdChCQVNFX1BBVEgpIGJhc2VQYXRoOiBzdHJpbmcsIEBPcHRpb25hbCgpIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgaWYgKGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZ3VyYXRpb24uYmFzZVBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGJhc2VQYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGJhc2VQYXRoID0gdGhpcy5iYXNlUGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5iYXNlUGF0aCA9IGJhc2VQYXRoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5jb2RlciA9IHRoaXMuY29uZmlndXJhdGlvbi5lbmNvZGVyIHx8IG5ldyBDdXN0b21IdHRwUGFyYW1ldGVyQ29kZWMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gY29uc3VtZXMgc3RyaW5nW10gbWltZS10eXBlc1xuICAgICAqIEByZXR1cm4gdHJ1ZTogY29uc3VtZXMgY29udGFpbnMgJ211bHRpcGFydC9mb3JtLWRhdGEnLCBmYWxzZTogb3RoZXJ3aXNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBjYW5Db25zdW1lRm9ybShjb25zdW1lczogc3RyaW5nW10pOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZm9ybSA9ICdtdWx0aXBhcnQvZm9ybS1kYXRhJztcbiAgICAgICAgZm9yIChjb25zdCBjb25zdW1lIG9mIGNvbnN1bWVzKSB7XG4gICAgICAgICAgICBpZiAoZm9ybSA9PT0gY29uc3VtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgYWRkVG9IdHRwUGFyYW1zKGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMsIHZhbHVlOiBhbnksIGtleT86IHN0cmluZyk6IEh0dHBQYXJhbXMge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLmFkZFRvSHR0cFBhcmFtc1JlY3Vyc2l2ZShodHRwUGFyYW1zLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5hZGRUb0h0dHBQYXJhbXNSZWN1cnNpdmUoaHR0cFBhcmFtcywgdmFsdWUsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUb0h0dHBQYXJhbXNSZWN1cnNpdmUoaHR0cFBhcmFtczogSHR0cFBhcmFtcywgdmFsdWU/OiBhbnksIGtleT86IHN0cmluZyk6IEh0dHBQYXJhbXMge1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAodmFsdWUgYXMgYW55W10pLmZvckVhY2goIGVsZW0gPT4gaHR0cFBhcmFtcyA9IHRoaXMuYWRkVG9IdHRwUGFyYW1zUmVjdXJzaXZlKGh0dHBQYXJhbXMsIGVsZW0sIGtleSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSBhcyBEYXRlKS50b0lTT1N0cmluZygpLnN1YnN0cigwLCAxMCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJrZXkgbWF5IG5vdCBiZSBudWxsIGlmIHZhbHVlIGlzIERhdGVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaCggayA9PiBodHRwUGFyYW1zID0gdGhpcy5hZGRUb0h0dHBQYXJhbXNSZWN1cnNpdmUoXG4gICAgICAgICAgICAgICAgICAgIGh0dHBQYXJhbXMsIHZhbHVlW2tdLCBrZXkgIT0gbnVsbCA/IGAke2tleX0uJHtrfWAgOiBrKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwia2V5IG1heSBub3QgYmUgbnVsbCBpZiB2YWx1ZSBpcyBub3Qgb2JqZWN0IG9yIGFycmF5XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBzaW5nbGUgbWVkaWEgZmlsZVxuICAgICAqIEBwYXJhbSB3aWR0aEhlaWdodCBFeHBlY3RlZCBmb3JtYXQ6IFdJRFRIeEhFSUdIVCwgZm9yIGV4YW1wbGUgNzUweDIwMC4gV2lkdGggb2YgdGhlIGltYWdlLCBvciAwIHdoZW4gdGhlIGZpbGUgaXMgbm90IGFuIGltYWdlIG9yIGl0IHNob3VsZCBoYXZlIG9yaWdpbmFsIHVwbG9hZGVkIHdpZHRoLCBvciBpdCBzaG91bGQgYmUgc2NhbGVkIHByb3BvcnRpb25hbGx5IHdpdGggaGVpZ2h0IHNwZWNpZmllZC4gSGVpZ2h0IG9mIHRoZSBpbWFnZSwgb3IgMCB3aGVuIHRoZSBmaWxlIGlzIG5vdCBhbiBpbWFnZSBvciBpdCBzaG91bGQgaGF2ZSBvcmlnaW5hbCB1cGxvYWRlZCBoZWlnaHQsIG9yIGl0IHNob3VsZCBiZSBzY2FsZWQgcHJvcG9ydGlvbmFsbHkgd2l0aCB3aWR0aCBzcGVjaWZpZWRcbiAgICAgKiBAcGFyYW0ga2V5IEtleSBvZiB0aGUgZmlsZSwgaXQgaXMgbWFkZSBmcm9tIGlkIGFuZCBleHRlbnNpb24sIGUuZy4gX21lZGlhLTQ1NjQuanBnIGZvciBpbWFnZSB3aXRoIGlkIF9tZWRpYS00NTY0IGFuZCBqcGcgZXh0ZW5zaW9uXG4gICAgICogQHBhcmFtIG9ic2VydmUgc2V0IHdoZXRoZXIgb3Igbm90IHRvIHJldHVybiB0aGUgZGF0YSBPYnNlcnZhYmxlIGFzIHRoZSBib2R5LCByZXNwb25zZSBvciBldmVudHMuIGRlZmF1bHRzIHRvIHJldHVybmluZyB0aGUgYm9keS5cbiAgICAgKiBAcGFyYW0gcmVwb3J0UHJvZ3Jlc3MgZmxhZyB0byByZXBvcnQgcmVxdWVzdCBhbmQgcmVzcG9uc2UgcHJvZ3Jlc3MuXG4gICAgICovXG4gICAgcHVibGljIGdldE1lZGlhKHdpZHRoSGVpZ2h0OiBzdHJpbmcsIGtleTogc3RyaW5nLCBvYnNlcnZlPzogJ2JvZHknLCByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sIG9wdGlvbnM/OiB7aHR0cEhlYWRlckFjY2VwdD86IHVuZGVmaW5lZH0pOiBPYnNlcnZhYmxlPGFueT47XG4gICAgcHVibGljIGdldE1lZGlhKHdpZHRoSGVpZ2h0OiBzdHJpbmcsIGtleTogc3RyaW5nLCBvYnNlcnZlPzogJ3Jlc3BvbnNlJywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuLCBvcHRpb25zPzoge2h0dHBIZWFkZXJBY2NlcHQ/OiB1bmRlZmluZWR9KTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8YW55Pj47XG4gICAgcHVibGljIGdldE1lZGlhKHdpZHRoSGVpZ2h0OiBzdHJpbmcsIGtleTogc3RyaW5nLCBvYnNlcnZlPzogJ2V2ZW50cycsIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbiwgb3B0aW9ucz86IHtodHRwSGVhZGVyQWNjZXB0PzogdW5kZWZpbmVkfSk6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+O1xuICAgIHB1YmxpYyBnZXRNZWRpYSh3aWR0aEhlaWdodDogc3RyaW5nLCBrZXk6IHN0cmluZywgb2JzZXJ2ZTogYW55ID0gJ2JvZHknLCByZXBvcnRQcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlLCBvcHRpb25zPzoge2h0dHBIZWFkZXJBY2NlcHQ/OiB1bmRlZmluZWR9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgaWYgKHdpZHRoSGVpZ2h0ID09PSBudWxsIHx8IHdpZHRoSGVpZ2h0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZWQgcGFyYW1ldGVyIHdpZHRoSGVpZ2h0IHdhcyBudWxsIG9yIHVuZGVmaW5lZCB3aGVuIGNhbGxpbmcgZ2V0TWVkaWEuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlZCBwYXJhbWV0ZXIga2V5IHdhcyBudWxsIG9yIHVuZGVmaW5lZCB3aGVuIGNhbGxpbmcgZ2V0TWVkaWEuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuZGVmYXVsdEhlYWRlcnM7XG5cbiAgICAgICAgLy8gYXV0aGVudGljYXRpb24gKEhlYWRlckFwaUtleUF1dGgpIHJlcXVpcmVkXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uYXBpS2V5cykge1xuICAgICAgICAgICAgY29uc3Qga2V5OiBzdHJpbmcgfCB1bmRlZmluZWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uYXBpS2V5c1tcIkhlYWRlckFwaUtleUF1dGhcIl0gfHwgdGhpcy5jb25maWd1cmF0aW9uLmFwaUtleXNbXCJYLUFVVEgtVE9LRU5cIl07XG4gICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdYLUFVVEgtVE9LRU4nLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gb3B0aW9ucyAmJiBvcHRpb25zLmh0dHBIZWFkZXJBY2NlcHQ7XG4gICAgICAgIGlmIChodHRwSGVhZGVyQWNjZXB0U2VsZWN0ZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gdG8gZGV0ZXJtaW5lIHRoZSBBY2NlcHQgaGVhZGVyXG4gICAgICAgICAgICBjb25zdCBodHRwSGVhZGVyQWNjZXB0czogc3RyaW5nW10gPSBbXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkID0gdGhpcy5jb25maWd1cmF0aW9uLnNlbGVjdEhlYWRlckFjY2VwdChodHRwSGVhZGVyQWNjZXB0cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0FjY2VwdCcsIGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxldCByZXNwb25zZVR5cGU6ICd0ZXh0JyB8ICdqc29uJyA9ICdqc29uJztcbiAgICAgICAgaWYoaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkICYmIGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZC5zdGFydHNXaXRoKCd0ZXh0JykpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PGFueT4oYCR7dGhpcy5jb25maWd1cmF0aW9uLmJhc2VQYXRofS9pbWFnZS8ke2VuY29kZVVSSUNvbXBvbmVudChTdHJpbmcod2lkdGhIZWlnaHQpKX0vJHtlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGtleSkpfWAsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiA8YW55PnJlc3BvbnNlVHlwZSxcbiAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMuY29uZmlndXJhdGlvbi53aXRoQ3JlZGVudGlhbHMsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgICAgICBvYnNlcnZlOiBvYnNlcnZlLFxuICAgICAgICAgICAgICAgIHJlcG9ydFByb2dyZXNzOiByZXBvcnRQcm9ncmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVuZHBvaW50IGZvciBtZWRpYSBmaWxlcyB1cGxvYWRcbiAgICAgKiBAcGFyYW0gZmlsZSBGaWxlIHRvIHVwbG9hZFxuICAgICAqIEBwYXJhbSB0eXBlIFR5cGUgb2YgZmlsZSBpbWFnZXxmaWxlXG4gICAgICogQHBhcmFtIHNhdmUgU2hvdWxkIGZpbGUgYmUgc2F2ZWQgdG8gZGF0YWJlc2Ugb24gdXBsb2FkOiAwfDFcbiAgICAgKiBAcGFyYW0gb2JzZXJ2ZSBzZXQgd2hldGhlciBvciBub3QgdG8gcmV0dXJuIHRoZSBkYXRhIE9ic2VydmFibGUgYXMgdGhlIGJvZHksIHJlc3BvbnNlIG9yIGV2ZW50cy4gZGVmYXVsdHMgdG8gcmV0dXJuaW5nIHRoZSBib2R5LlxuICAgICAqIEBwYXJhbSByZXBvcnRQcm9ncmVzcyBmbGFnIHRvIHJlcG9ydCByZXF1ZXN0IGFuZCByZXNwb25zZSBwcm9ncmVzcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgcG9zdE1lZGlhKGZpbGU6IEJsb2IsIHR5cGU6IHN0cmluZywgc2F2ZT86IG51bWJlciwgb2JzZXJ2ZT86ICdib2R5JywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuLCBvcHRpb25zPzoge2h0dHBIZWFkZXJBY2NlcHQ/OiB1bmRlZmluZWR9KTogT2JzZXJ2YWJsZTxhbnk+O1xuICAgIHB1YmxpYyBwb3N0TWVkaWEoZmlsZTogQmxvYiwgdHlwZTogc3RyaW5nLCBzYXZlPzogbnVtYmVyLCBvYnNlcnZlPzogJ3Jlc3BvbnNlJywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuLCBvcHRpb25zPzoge2h0dHBIZWFkZXJBY2NlcHQ/OiB1bmRlZmluZWR9KTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8YW55Pj47XG4gICAgcHVibGljIHBvc3RNZWRpYShmaWxlOiBCbG9iLCB0eXBlOiBzdHJpbmcsIHNhdmU/OiBudW1iZXIsIG9ic2VydmU/OiAnZXZlbnRzJywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuLCBvcHRpb25zPzoge2h0dHBIZWFkZXJBY2NlcHQ/OiB1bmRlZmluZWR9KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj47XG4gICAgcHVibGljIHBvc3RNZWRpYShmaWxlOiBCbG9iLCB0eXBlOiBzdHJpbmcsIHNhdmU/OiBudW1iZXIsIG9ic2VydmU6IGFueSA9ICdib2R5JywgcmVwb3J0UHJvZ3Jlc3M6IGJvb2xlYW4gPSBmYWxzZSwgb3B0aW9ucz86IHtodHRwSGVhZGVyQWNjZXB0PzogdW5kZWZpbmVkfSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmIChmaWxlID09PSBudWxsIHx8IGZpbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXF1aXJlZCBwYXJhbWV0ZXIgZmlsZSB3YXMgbnVsbCBvciB1bmRlZmluZWQgd2hlbiBjYWxsaW5nIHBvc3RNZWRpYS4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVxdWlyZWQgcGFyYW1ldGVyIHR5cGUgd2FzIG51bGwgb3IgdW5kZWZpbmVkIHdoZW4gY2FsbGluZyBwb3N0TWVkaWEuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuZGVmYXVsdEhlYWRlcnM7XG5cbiAgICAgICAgLy8gYXV0aGVudGljYXRpb24gKEhlYWRlckFwaUtleUF1dGgpIHJlcXVpcmVkXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uYXBpS2V5cykge1xuICAgICAgICAgICAgY29uc3Qga2V5OiBzdHJpbmcgfCB1bmRlZmluZWQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uYXBpS2V5c1tcIkhlYWRlckFwaUtleUF1dGhcIl0gfHwgdGhpcy5jb25maWd1cmF0aW9uLmFwaUtleXNbXCJYLUFVVEgtVE9LRU5cIl07XG4gICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdYLUFVVEgtVE9LRU4nLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gb3B0aW9ucyAmJiBvcHRpb25zLmh0dHBIZWFkZXJBY2NlcHQ7XG4gICAgICAgIGlmIChodHRwSGVhZGVyQWNjZXB0U2VsZWN0ZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gdG8gZGV0ZXJtaW5lIHRoZSBBY2NlcHQgaGVhZGVyXG4gICAgICAgICAgICBjb25zdCBodHRwSGVhZGVyQWNjZXB0czogc3RyaW5nW10gPSBbXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkID0gdGhpcy5jb25maWd1cmF0aW9uLnNlbGVjdEhlYWRlckFjY2VwdChodHRwSGVhZGVyQWNjZXB0cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0FjY2VwdCcsIGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0byBkZXRlcm1pbmUgdGhlIENvbnRlbnQtVHlwZSBoZWFkZXJcbiAgICAgICAgY29uc3QgY29uc3VtZXM6IHN0cmluZ1tdID0gW1xuICAgICAgICAgICAgJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgY2FuQ29uc3VtZUZvcm0gPSB0aGlzLmNhbkNvbnN1bWVGb3JtKGNvbnN1bWVzKTtcblxuICAgICAgICBsZXQgZm9ybVBhcmFtczogeyBhcHBlbmQocGFyYW06IHN0cmluZywgdmFsdWU6IGFueSk6IGFueTsgfTtcbiAgICAgICAgbGV0IHVzZUZvcm0gPSBmYWxzZTtcbiAgICAgICAgbGV0IGNvbnZlcnRGb3JtUGFyYW1zVG9TdHJpbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gdXNlIEZvcm1EYXRhIHRvIHRyYW5zbWl0IGZpbGVzIHVzaW5nIGNvbnRlbnQtdHlwZSBcIm11bHRpcGFydC9mb3JtLWRhdGFcIlxuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDAwNzk2OS9hcHBsaWNhdGlvbi14LXd3dy1mb3JtLXVybGVuY29kZWQtb3ItbXVsdGlwYXJ0LWZvcm0tZGF0YVxuICAgICAgICB1c2VGb3JtID0gY2FuQ29uc3VtZUZvcm07XG4gICAgICAgIGlmICh1c2VGb3JtKSB7XG4gICAgICAgICAgICBmb3JtUGFyYW1zID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3JtUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoe2VuY29kZXI6IHRoaXMuZW5jb2Rlcn0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZm9ybVBhcmFtcyA9IGZvcm1QYXJhbXMuYXBwZW5kKCdmaWxlJywgPGFueT5maWxlKSBhcyBhbnkgfHwgZm9ybVBhcmFtcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmb3JtUGFyYW1zID0gZm9ybVBhcmFtcy5hcHBlbmQoJ3R5cGUnLCA8YW55PnR5cGUpIGFzIGFueSB8fCBmb3JtUGFyYW1zO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzYXZlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGZvcm1QYXJhbXMgPSBmb3JtUGFyYW1zLmFwcGVuZCgnc2F2ZScsIDxhbnk+c2F2ZSkgYXMgYW55IHx8IGZvcm1QYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzcG9uc2VUeXBlOiAndGV4dCcgfCAnanNvbicgPSAnanNvbic7XG4gICAgICAgIGlmKGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCAmJiBodHRwSGVhZGVyQWNjZXB0U2VsZWN0ZWQuc3RhcnRzV2l0aCgndGV4dCcpKSB7XG4gICAgICAgICAgICByZXNwb25zZVR5cGUgPSAndGV4dCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3Q8YW55PihgJHt0aGlzLmNvbmZpZ3VyYXRpb24uYmFzZVBhdGh9L2FwaS9tZWRpYWAsXG4gICAgICAgICAgICBjb252ZXJ0Rm9ybVBhcmFtc1RvU3RyaW5nID8gZm9ybVBhcmFtcy50b1N0cmluZygpIDogZm9ybVBhcmFtcyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZVR5cGU6IDxhbnk+cmVzcG9uc2VUeXBlLFxuICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy5jb25maWd1cmF0aW9uLndpdGhDcmVkZW50aWFscyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICAgICAgICAgIG9ic2VydmU6IG9ic2VydmUsXG4gICAgICAgICAgICAgICAgcmVwb3J0UHJvZ3Jlc3M6IHJlcG9ydFByb2dyZXNzXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG59XG4iXX0=