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
SearchAPIService.ctorParameters = () => [
    { type: HttpClient },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [BASE_PATH,] }] },
    { type: Configuration, decorators: [{ type: Optional }] }
];
SearchAPIService.ɵprov = i0.ɵɵdefineInjectable({ factory: function SearchAPIService_Factory() { return new SearchAPIService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.BASE_PATH, 8), i0.ɵɵinject(i3.Configuration, 8)); }, token: SearchAPIService, providedIn: "root" });
SearchAPIService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Optional()), __param(1, Inject(BASE_PATH)), __param(2, Optional())
], SearchAPIService);
export { SearchAPIService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoQVBJLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mbG90aXEvIiwic291cmNlcyI6WyJhcGkvc2VhcmNoQVBJLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFDSCx1REFBdUQ7QUFFdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQTJCLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQ25DLFlBQVksRUFBRSxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsTUFBWSxzQkFBc0IsQ0FBQztBQUN6RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBK0IsWUFBWSxDQUFDO0FBSy9FLE9BQU8sRUFBRSxTQUFTLEVBQXNCLE1BQTBCLGNBQWMsQ0FBQztBQUNqRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQTBDLGtCQUFrQixDQUFDOzs7OztBQU9yRixJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQU96QixZQUFzQixVQUFzQixFQUFnQyxRQUFnQixFQUFjLGFBQTRCO1FBQWhILGVBQVUsR0FBVixVQUFVLENBQVk7UUFMbEMsYUFBUSxHQUFHLHdCQUF3QixDQUFDO1FBQ3ZDLG1CQUFjLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNuQyxrQkFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFJdkMsSUFBSSxhQUFhLEVBQUU7WUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztTQUN0QztRQUNELElBQUksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDakQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQzlCLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sSUFBSSxJQUFJLHdCQUF3QixFQUFFLENBQUM7SUFDaEYsQ0FBQztJQUlPLGVBQWUsQ0FBQyxVQUFzQixFQUFFLEtBQVUsRUFBRSxHQUFZO1FBQ3BFLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssWUFBWSxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQzlELFVBQVUsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2pFO2FBQU07WUFDSCxVQUFVLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdEU7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRU8sd0JBQXdCLENBQUMsVUFBc0IsRUFBRSxLQUFXLEVBQUUsR0FBWTtRQUM5RSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDZixPQUFPLFVBQVUsQ0FBQztTQUNyQjtRQUVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDckIsS0FBZSxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3hHO2lCQUFNLElBQUksS0FBSyxZQUFZLElBQUksRUFBRTtnQkFDOUIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO29CQUNiLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFDN0IsS0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDcEQ7cUJBQU07b0JBQ0osTUFBTSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztpQkFDdEQ7YUFDSjtpQkFBTTtnQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQ3ZFLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0Q7U0FDSjthQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtZQUNwQixVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDOUM7YUFBTTtZQUNILE1BQU0sS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7U0FDdEU7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBcUJNLE1BQU0sQ0FBQyxDQUFVLEVBQUUsTUFBc0IsRUFBRSxJQUFhLEVBQUUsS0FBYyxFQUFFLE9BQWdCLEVBQUUsY0FBdUIsRUFBRSxXQUEyQixFQUFFLFdBQTJCLEVBQUUsT0FBZ0IsRUFBRSxXQUFvQixFQUFFLFVBQW1CLEVBQUUsVUFBZSxNQUFNLEVBQUUsaUJBQTBCLEtBQUssRUFBRSxPQUFpRDtRQUV4VixJQUFJLGVBQWUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsS0FBSyxTQUFTLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNqQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQy9DLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNoQjtRQUNELElBQUksTUFBTSxFQUFFO1lBQ1IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUN2QixlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQy9DLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQTtTQUNMO1FBQ0QsSUFBSSxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDdkMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUMvQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdEI7UUFDRCxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUN6QyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQy9DLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN4QjtRQUNELElBQUksT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQzdDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFDL0MsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxjQUFjLEtBQUssU0FBUyxJQUFJLGNBQWMsS0FBSyxJQUFJLEVBQUU7WUFDM0QsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUMvQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUMzQztRQUNELElBQUksV0FBVyxFQUFFO1lBQ2IsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUM1QixlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFBO1NBQ0w7UUFDRCxJQUFJLFdBQVcsRUFBRTtZQUNiLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDNUIsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQTtTQUNMO1FBQ0QsSUFBSSxPQUFPLEtBQUssU0FBUyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDN0MsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUMvQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLFdBQVcsS0FBSyxTQUFTLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtZQUNyRCxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQy9DLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksVUFBVSxLQUFLLFNBQVMsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQ25ELGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFDL0MsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUVsQyw2Q0FBNkM7UUFDN0MsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRTtZQUM1QixNQUFNLEdBQUcsR0FBdUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM3SCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDOUM7U0FDSjtRQUVELElBQUksd0JBQXdCLEdBQXVCLE9BQU8sSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDdkYsSUFBSSx3QkFBd0IsS0FBSyxTQUFTLEVBQUU7WUFDeEMsaUNBQWlDO1lBQ2pDLE1BQU0saUJBQWlCLEdBQWE7Z0JBQ2hDLGtCQUFrQjthQUNyQixDQUFDO1lBQ0Ysd0JBQXdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsSUFBSSx3QkFBd0IsS0FBSyxTQUFTLEVBQUU7WUFDeEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLHdCQUF3QixDQUFDLENBQUM7U0FDN0Q7UUFHRCxJQUFJLFlBQVksR0FBb0IsTUFBTSxDQUFDO1FBQzNDLElBQUcsd0JBQXdCLElBQUksd0JBQXdCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3hFLFlBQVksR0FBRyxNQUFNLENBQUM7U0FDekI7UUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxnQkFBZ0IsRUFDckY7WUFDSSxNQUFNLEVBQUUsZUFBZTtZQUN2QixZQUFZLEVBQU8sWUFBWTtZQUMvQixlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlO1lBQ25ELE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLGNBQWMsRUFBRSxjQUFjO1NBQ2pDLENBQ0osQ0FBQztJQUNOLENBQUM7Q0FFSixDQUFBOztZQXBLcUMsVUFBVTt5Q0FBRyxRQUFRLFlBQUcsTUFBTSxTQUFDLFNBQVM7WUFBK0MsYUFBYSx1QkFBdkMsUUFBUTs7O0FBUDlGLGdCQUFnQjtJQUg1QixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0lBUWlELFdBQUEsUUFBUSxFQUFFLENBQUEsRUFBQyxXQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQSxFQUFvQixXQUFBLFFBQVEsRUFBRSxDQUFBO0dBUGhHLGdCQUFnQixDQTJLNUI7U0EzS1ksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGbG90aXEgVXNlciBBUElcbiAqICMjIEdldHRpbmcgc3RhcnRlZCAgIFRoaXMgaXMgeW91ciBGbG90aXEgVXNlciBBUEkgdGhhdCBhbGxvd3MgeW91IHRvIGFjY2VzcyB5b3VyIGRhdGEgdGhyb3VnaCB0aGUgQ29udGVudCBBUEkgdGhhdCB5b3UgZGVmaW5lZC4gICAjIyMgQWNjZXNzIHRvIGRhdGEgICBUaGVyZSBhcmUgc2V2ZXJhbCBtZXRob2RzIHRoYXQgeW91IGNhbiB1c2UgdG8gYWNjZXNzIHlvdXIgZGF0YTogICogTGl2ZSBBUEkgZG9jcyAtIGF2YWlsYWJsZSB2aWEgPGNvZGU+VHJ5IGl0IG91dDwvY29kZT4gYnV0dG9uIGF2YWlsYWJsZSBuZXh0IHRvIGVhY2ggZW5kcG9pbnQgICAqIENvcHlpbmcgZXhhbXBsZSBjb2RlIG9uIHRoZSByaWdodCBzaWRlIG9mIGVhY2ggZW5kcG9pbnQgICogQnkgZG93bmxvYWRpbmcgdGhlIFNES3MgYXZhaWxhYmxlIGluIG11bGl0cGxlIGxhbmd1YWdlcy4gICogQnkgZG93bmxvYWRpbmcgdGhlIFBvc3RtYW4gY29sbGVjdGlvbiBhbmQgaW1wb3J0aW5nIGl0IGludG8gUG9zdG1hbi4gICAgRWFjaCBvZiB0aGVzZSBtZXRob2RzIGlzIGRlc2NyaWJlZCBpbiBsZW5ndGggaW4gdGhlIFt1c2VyIGRvY3VtZW50YXRpb25dKGh0dHBzOi8vZmxvdGlxLmNvbS9kb2NzLykuICAgIyMjIEF1dGhvcml6YXRpb24gICBJbiBvcmRlciB0byBtYWtlIHVzZSBvZiB0aGUgcHJvdmlkZWQgZG9jdW1lbnRhdGlvbiwgZXhhbXBsZSBjb2RlLCBTREtzIGFuZCBzbyBvbiAtIHlvdSB3aWxsIG5lZWQgdG8gcHVsbCBvdXQgeW91ciBBUEkga2V5LiBXZSByZWNvbW1lbmQgdGhhdCB5b3Ugc3RhcnQgd2l0aCB0aGUgUmVhZE9ubHkgQVBJIEtleSB3aGljaCB3aWxsIGFsbG93IHlvdSB0byBtYWtlIGFsbCB0aGUgYEdFVGAgcmVxdWVzdHMgYnV0IHdpbGwgZXJyb3Itb3V0IHdoZW4geW91IHRyeSB0byBtb2RpZnkgY29udGVudC4gUGxlYXNlIHJlbWVtYmVyIHRvIHJlcGxhY2UgdGhlIGtleSBmb3IgYFBPU1RgLCBgUFVUYCBhbmQgYERFTEVURWAgY2FsbHMuICAgSXRcXCdzIGFsc28gcG9zc2libGUgdG8gdXNlIHNjb3BlZCBBUEkga2V5cyAtIHlvdSBjYW4gY3JlYXRlIHRob3NlIGluIHRoZSBBUEkga2V5cyBzZWN0aW9uIG9mIHRoZSBGbG90aXEgdXNlciBpbnRlcmZhY2UuIFRoaXMgd2lsbCBhbGxvdyB5b3UgdG8gY3JlYXRlIGEga2V5IHRoYXQgb25seSBhdXRob3JpemVzIGFjY2VzcyB0byBhIHNwZWNpZmljIGNvbnRlbnQgdHlwZSAob3IgYSBzZXQgb2YgY29udGVudCB0eXBlcywgaWYgeW91IGNob29zZSBzbykuIFJlYWQgbW9yZSBhYm91dCBob3cgdG8gdXNlIGFuZCBjcmVhdGUgQVBJIGtleXMgaW4gdGhlIFtBUEkga2V5cyBkb2N1bWVudGF0aW9uXShodHRwczovL2Zsb3RpcS5jb20vZG9jcy9BUEkvKS4gICAjIyBPYmplY3QgYWNjZXNzICAgT25jZSB5b3UgZGVmaW5lIGEgQ29udGVudCBUeXBlIGl0IHdpbGwgYmVjb21lIGF2YWlsYWJsZSBpbiB5b3VyIENvbnRlbnQgQVBJIGFzIGEgc2V0IG9mIGVuZHBvaW50cyB0aGF0IHdpbGwgYWxsb3cgeW91IHRvIHdvcmsgd2l0aCBvYmplY3RzOiAgICogY3JlYXRlICAqIGxpc3QgICogdXBkYXRlICAqIGRlbGV0ZSAgKiBiYXRjaCBjcmVhdGUgICogcmV0cmlldmUgc2luZ2xlIG9iamVjdC4gICMjIyBIeWRyYXRpb24gICBXaGVuIHlvdSBidWlsZCBDb250ZW50IFR5cGVzIHRoYXQgaGF2ZSByZWxhdGlvbiB0byBvdGhlcnMgeW91ciBvYmplY3RzIHdpbGwgb3B0aW9uYWxseSBzdXBwb3J0IGh5ZHJhdGlvbiBvZiByZWxhdGVkIGVudGl0aWVzLiBUaGUgZW5kcG9pbnRzIHRoYXQgc3VwcG9ydCBvYmplY3QgcmV0cmlldmFsIGFjY2VwdCBhIGBoeWRyYXRlYCBwYXJhbWV0ZXIsIHdoaWNoIGNhbiBiZSB1c2VkIHRvIGVhc2lseSBmZXRjaCBoeWRyYXRlZCBvYmplY3RzLiBTaW5jZSB0aGlzIGJyZWFrcyB0aGUgc3RhbmRhcmQgUkVTVCBjb25jZXB0cyAtIGl0XFwncyBub3QgZW5hYmxlZCBieSBkZWZhdWx0LCBidXQgaXRcXCdzIGEgdmVyeSBoYW5keSBmZWF0dXJlIHRoYXQgYWxsb3dzIHRvIHJlZHVjZSB0aGUgYW1vdW50IG9mIEhUVFAgcmVxdWVzdHMgc2VudCBvdmVyIHRoZSB3aXJlIGFuZCB3ZSBzdHJvbmdseSByZWNvbW1lbmQgdG8gdXNlIGl0LlxuICpcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBPcGVuQVBJIGRvY3VtZW50OiAyLjAuMVxuICogQ29udGFjdDogaGVsbG9AZmxvdGlxLmNvbVxuICpcbiAqIE5PVEU6IFRoaXMgY2xhc3MgaXMgYXV0byBnZW5lcmF0ZWQgYnkgT3BlbkFQSSBHZW5lcmF0b3IgKGh0dHBzOi8vb3BlbmFwaS1nZW5lcmF0b3IudGVjaCkuXG4gKiBodHRwczovL29wZW5hcGktZ2VuZXJhdG9yLnRlY2hcbiAqIERvIG5vdCBlZGl0IHRoZSBjbGFzcyBtYW51YWxseS5cbiAqL1xuLyogdHNsaW50OmRpc2FibGU6bm8tdW51c2VkLXZhcmlhYmxlIG1lbWJlci1vcmRlcmluZyAqL1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gICAgICAgICAgICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFBhcmFtcyxcbiAgICAgICAgIEh0dHBSZXNwb25zZSwgSHR0cEV2ZW50LCBIdHRwUGFyYW1ldGVyQ29kZWMgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDdXN0b21IdHRwUGFyYW1ldGVyQ29kZWMgfSAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vZW5jb2Rlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFNlYXJjaFJlc3BvbnNlIH0gZnJvbSAnLi4vbW9kZWwvbW9kZWxzJztcblxuaW1wb3J0IHsgQkFTRV9QQVRILCBDT0xMRUNUSU9OX0ZPUk1BVFMgfSAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL3ZhcmlhYmxlcyc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vY29uZmlndXJhdGlvbic7XG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hBUElTZXJ2aWNlIHtcblxuICAgIHByb3RlY3RlZCBiYXNlUGF0aCA9ICdodHRwczovL2FwaS5mbG90aXEuY29tJztcbiAgICBwdWJsaWMgZGVmYXVsdEhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcbiAgICBwdWJsaWMgY29uZmlndXJhdGlvbiA9IG5ldyBDb25maWd1cmF0aW9uKCk7XG4gICAgcHVibGljIGVuY29kZXI6IEh0dHBQYXJhbWV0ZXJDb2RlYztcblxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LCBAT3B0aW9uYWwoKUBJbmplY3QoQkFTRV9QQVRIKSBiYXNlUGF0aDogc3RyaW5nLCBAT3B0aW9uYWwoKSBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uKSB7XG4gICAgICAgIGlmIChjb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWd1cmF0aW9uLmJhc2VQYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBiYXNlUGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBiYXNlUGF0aCA9IHRoaXMuYmFzZVBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uYmFzZVBhdGggPSBiYXNlUGF0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuY29kZXIgPSB0aGlzLmNvbmZpZ3VyYXRpb24uZW5jb2RlciB8fCBuZXcgQ3VzdG9tSHR0cFBhcmFtZXRlckNvZGVjKCk7XG4gICAgfVxuXG5cblxuICAgIHByaXZhdGUgYWRkVG9IdHRwUGFyYW1zKGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMsIHZhbHVlOiBhbnksIGtleT86IHN0cmluZyk6IEh0dHBQYXJhbXMge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLmFkZFRvSHR0cFBhcmFtc1JlY3Vyc2l2ZShodHRwUGFyYW1zLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5hZGRUb0h0dHBQYXJhbXNSZWN1cnNpdmUoaHR0cFBhcmFtcywgdmFsdWUsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUb0h0dHBQYXJhbXNSZWN1cnNpdmUoaHR0cFBhcmFtczogSHR0cFBhcmFtcywgdmFsdWU/OiBhbnksIGtleT86IHN0cmluZyk6IEh0dHBQYXJhbXMge1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAodmFsdWUgYXMgYW55W10pLmZvckVhY2goIGVsZW0gPT4gaHR0cFBhcmFtcyA9IHRoaXMuYWRkVG9IdHRwUGFyYW1zUmVjdXJzaXZlKGh0dHBQYXJhbXMsIGVsZW0sIGtleSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSBhcyBEYXRlKS50b0lTT1N0cmluZygpLnN1YnN0cigwLCAxMCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJrZXkgbWF5IG5vdCBiZSBudWxsIGlmIHZhbHVlIGlzIERhdGVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaCggayA9PiBodHRwUGFyYW1zID0gdGhpcy5hZGRUb0h0dHBQYXJhbXNSZWN1cnNpdmUoXG4gICAgICAgICAgICAgICAgICAgIGh0dHBQYXJhbXMsIHZhbHVlW2tdLCBrZXkgIT0gbnVsbCA/IGAke2tleX0uJHtrfWAgOiBrKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwia2V5IG1heSBub3QgYmUgbnVsbCBpZiB2YWx1ZSBpcyBub3Qgb2JqZWN0IG9yIGFycmF5XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBGbG90aXEgQVBJIHByb3ZpZGVzIGEgcG93ZXJmdWwgc2VhcmNoIGVuZ2luZSwgd2hpY2ggaXMgYSB3cmFwcGVyIGZvciBFbGFzdGljU2VhcmNoIHF1ZXJpZXMuIFdlIHRyaWVkIHRvIGJhbGFuY2UgYmV0d2VlbiByZXNlbWJsaW5nIHRoZSBFUyBBUEkgKGZvciB0aG9zZSwgd2hvIGFscmVhZHkga25vdyBpdCkgYW5kIGtlZXBpbmcgaXQgc2ltcGxlIGFuZCBjb2hlc2l2ZSB3aXRoIEZsb3RpcSBBUEkuIFRoaXMgZW5kcG9pbnQgcHJvdmlkZXMgbWVhbnMgZm9yIHF1ZXJ5aW5nIGNvbnRlbnQgb2JqZWN0cyB0aGF0IG1hdGNoIGEgc2V0IG9mIGNyaXRlcmlhLCB3aXRoIG9wdGlvbnMgZm9yOiAgICogbGltaXRpbmcgc2VhcmNoIHRvIHNwZWNpZmljIENvbnRlbnQgVHlwZXMsICAqIGxpbWl0IHNlYXJjaCB0byBzcGVjaWZpYyBmaWVsZHMsICAqIHdlaWdodGluZyBmaWVsZHMgdG8gbW9kaWZ5IHJlc3VsdHMgc2NvcmluZywgICogYWdncmVnYXRpbmcgcmVzdWx0cyBieSBmaWVsZHMuICAgWW91IGNhbiBmaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIFNlYXJjaCBBUEkgaW4gdGhlIFtTZWFyY2ggQVBJIGRvY3NdKGh0dHBzOi8vZmxvdGlxLmNvbS9kb2NzL0FQSS9zZWFyY2gvKS5cbiAgICAgKiBAcGFyYW0gcSBRdWVyeVxuICAgICAqIEBwYXJhbSBmaWVsZHMgU2VhcmNoIG9ubHkgaW4gc2VsZWN0ZWQgZmllbGRzLlxuICAgICAqIEBwYXJhbSBwYWdlIExpc3RpbmcgcGFnZSBudW1iZXIsIDEtYmFzZWRcbiAgICAgKiBAcGFyYW0gbGltaXQgUGFnZSBsaW1pdFxuICAgICAqIEBwYXJhbSBvcmRlckJ5IE9yZGVyIGJ5IGZpZWxkXG4gICAgICogQHBhcmFtIG9yZGVyRGlyZWN0aW9uIE9yZGVyIGRpcmVjdGlvblxuICAgICAqIEBwYXJhbSBjb250ZW50VHlwZSBSZXN0cmljdCBzZWFyY2ggdG8gY29udGVudCB0eXBlcyBzZXRcbiAgICAgKiBAcGFyYW0gYWdncmVnYXRlQnkgRmllbGQgdG8gYWdncmVnYXRlIHJlc3VsdHMgZGlyZWN0aW9uXG4gICAgICogQHBhcmFtIGZpbHRlcnMgRmlsdGVyIGJ5IG9iamVjdCBwcm9wZXJ0aWVzLiBFeHBlY3RlZCBmb3JtYXQ6IGZpbHRlcnNbcHJvcGVydHkxXSYjeDNEO3ZhbHVlMSZhbXA7ZmlsdGVyc1twcm9wZXJ0eTJdJiN4M0Q7dmFsdWUyXG4gICAgICogQHBhcmFtIHBvc3RGaWx0ZXJzIEZpbHRlciBieSBvYmplY3QgcHJvcGVydGllcy4gVXNlIGl0IHdoZW4geW91IHdhbnQgYWdncmVnYXRlZCBjb3VudHMgd2l0aG91dCBmaWx0ZXJzIGFwcGxpZWQuIEV4cGVjdGVkIGZvcm1hdDogcG9zdF9maWx0ZXJzW3Byb3BlcnR5MV0mI3gzRDt2YWx1ZTEmYW1wO3Bvc3RfZmlsdGVyc1twcm9wZXJ0eTJdJiN4M0Q7dmFsdWUyXG4gICAgICogQHBhcmFtIGdlb0ZpbHRlcnMgRmlsdGVyIGJ5IG9iamVjdCBnZW9sb2NhdGlvbiBwcm9wZXJ0aWVzLiBFeGFtcGxlIHZhbHVlOiBnZW9fZmlsdGVyc1tsb2NhdGlvbl0mI3gzRDtnZW9fZGlzdGFuY2UsMS41MGttLDQwLjEsLTE5LjIgKGZpbHRlciBuYW1lLCBkaXN0YW5jZSwgbGF0aXR1ZGUsIGxvbmdpdHVkZSkuIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBFbGFzdGljU2VhcmNoIGRvY3MuIE9ubHkgZ2VvX2Rpc3RhbmNlIHF1ZXJ5IGlzIHN1cHBvcnRlZC5cbiAgICAgKiBAcGFyYW0gb2JzZXJ2ZSBzZXQgd2hldGhlciBvciBub3QgdG8gcmV0dXJuIHRoZSBkYXRhIE9ic2VydmFibGUgYXMgdGhlIGJvZHksIHJlc3BvbnNlIG9yIGV2ZW50cy4gZGVmYXVsdHMgdG8gcmV0dXJuaW5nIHRoZSBib2R5LlxuICAgICAqIEBwYXJhbSByZXBvcnRQcm9ncmVzcyBmbGFnIHRvIHJlcG9ydCByZXF1ZXN0IGFuZCByZXNwb25zZSBwcm9ncmVzcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2VhcmNoKHE/OiBzdHJpbmcsIGZpZWxkcz86IEFycmF5PHN0cmluZz4sIHBhZ2U/OiBzdHJpbmcsIGxpbWl0Pzogc3RyaW5nLCBvcmRlckJ5Pzogc3RyaW5nLCBvcmRlckRpcmVjdGlvbj86IHN0cmluZywgY29udGVudFR5cGU/OiBBcnJheTxzdHJpbmc+LCBhZ2dyZWdhdGVCeT86IEFycmF5PHN0cmluZz4sIGZpbHRlcnM/OiBvYmplY3QsIHBvc3RGaWx0ZXJzPzogb2JqZWN0LCBnZW9GaWx0ZXJzPzogb2JqZWN0LCBvYnNlcnZlPzogJ2JvZHknLCByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sIG9wdGlvbnM/OiB7aHR0cEhlYWRlckFjY2VwdD86ICdhcHBsaWNhdGlvbi9qc29uJ30pOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3BvbnNlPjtcbiAgICBwdWJsaWMgc2VhcmNoKHE/OiBzdHJpbmcsIGZpZWxkcz86IEFycmF5PHN0cmluZz4sIHBhZ2U/OiBzdHJpbmcsIGxpbWl0Pzogc3RyaW5nLCBvcmRlckJ5Pzogc3RyaW5nLCBvcmRlckRpcmVjdGlvbj86IHN0cmluZywgY29udGVudFR5cGU/OiBBcnJheTxzdHJpbmc+LCBhZ2dyZWdhdGVCeT86IEFycmF5PHN0cmluZz4sIGZpbHRlcnM/OiBvYmplY3QsIHBvc3RGaWx0ZXJzPzogb2JqZWN0LCBnZW9GaWx0ZXJzPzogb2JqZWN0LCBvYnNlcnZlPzogJ3Jlc3BvbnNlJywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuLCBvcHRpb25zPzoge2h0dHBIZWFkZXJBY2NlcHQ/OiAnYXBwbGljYXRpb24vanNvbid9KTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8U2VhcmNoUmVzcG9uc2U+PjtcbiAgICBwdWJsaWMgc2VhcmNoKHE/OiBzdHJpbmcsIGZpZWxkcz86IEFycmF5PHN0cmluZz4sIHBhZ2U/OiBzdHJpbmcsIGxpbWl0Pzogc3RyaW5nLCBvcmRlckJ5Pzogc3RyaW5nLCBvcmRlckRpcmVjdGlvbj86IHN0cmluZywgY29udGVudFR5cGU/OiBBcnJheTxzdHJpbmc+LCBhZ2dyZWdhdGVCeT86IEFycmF5PHN0cmluZz4sIGZpbHRlcnM/OiBvYmplY3QsIHBvc3RGaWx0ZXJzPzogb2JqZWN0LCBnZW9GaWx0ZXJzPzogb2JqZWN0LCBvYnNlcnZlPzogJ2V2ZW50cycsIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbiwgb3B0aW9ucz86IHtodHRwSGVhZGVyQWNjZXB0PzogJ2FwcGxpY2F0aW9uL2pzb24nfSk6IE9ic2VydmFibGU8SHR0cEV2ZW50PFNlYXJjaFJlc3BvbnNlPj47XG4gICAgcHVibGljIHNlYXJjaChxPzogc3RyaW5nLCBmaWVsZHM/OiBBcnJheTxzdHJpbmc+LCBwYWdlPzogc3RyaW5nLCBsaW1pdD86IHN0cmluZywgb3JkZXJCeT86IHN0cmluZywgb3JkZXJEaXJlY3Rpb24/OiBzdHJpbmcsIGNvbnRlbnRUeXBlPzogQXJyYXk8c3RyaW5nPiwgYWdncmVnYXRlQnk/OiBBcnJheTxzdHJpbmc+LCBmaWx0ZXJzPzogb2JqZWN0LCBwb3N0RmlsdGVycz86IG9iamVjdCwgZ2VvRmlsdGVycz86IG9iamVjdCwgb2JzZXJ2ZTogYW55ID0gJ2JvZHknLCByZXBvcnRQcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlLCBvcHRpb25zPzoge2h0dHBIZWFkZXJBY2NlcHQ/OiAnYXBwbGljYXRpb24vanNvbid9KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICBsZXQgcXVlcnlQYXJhbWV0ZXJzID0gbmV3IEh0dHBQYXJhbXMoe2VuY29kZXI6IHRoaXMuZW5jb2Rlcn0pO1xuICAgICAgICBpZiAocSAhPT0gdW5kZWZpbmVkICYmIHEgIT09IG51bGwpIHtcbiAgICAgICAgICBxdWVyeVBhcmFtZXRlcnMgPSB0aGlzLmFkZFRvSHR0cFBhcmFtcyhxdWVyeVBhcmFtZXRlcnMsXG4gICAgICAgICAgICA8YW55PnEsICdxJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZWxkcykge1xuICAgICAgICAgICAgZmllbGRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBxdWVyeVBhcmFtZXRlcnMgPSB0aGlzLmFkZFRvSHR0cFBhcmFtcyhxdWVyeVBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICA8YW55PmVsZW1lbnQsICdmaWVsZHNbXScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFnZSAhPT0gdW5kZWZpbmVkICYmIHBhZ2UgIT09IG51bGwpIHtcbiAgICAgICAgICBxdWVyeVBhcmFtZXRlcnMgPSB0aGlzLmFkZFRvSHR0cFBhcmFtcyhxdWVyeVBhcmFtZXRlcnMsXG4gICAgICAgICAgICA8YW55PnBhZ2UsICdwYWdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpbWl0ICE9PSB1bmRlZmluZWQgJiYgbGltaXQgIT09IG51bGwpIHtcbiAgICAgICAgICBxdWVyeVBhcmFtZXRlcnMgPSB0aGlzLmFkZFRvSHR0cFBhcmFtcyhxdWVyeVBhcmFtZXRlcnMsXG4gICAgICAgICAgICA8YW55PmxpbWl0LCAnbGltaXQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXJCeSAhPT0gdW5kZWZpbmVkICYmIG9yZGVyQnkgIT09IG51bGwpIHtcbiAgICAgICAgICBxdWVyeVBhcmFtZXRlcnMgPSB0aGlzLmFkZFRvSHR0cFBhcmFtcyhxdWVyeVBhcmFtZXRlcnMsXG4gICAgICAgICAgICA8YW55Pm9yZGVyQnksICdvcmRlcl9ieScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcmRlckRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkICYmIG9yZGVyRGlyZWN0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgcXVlcnlQYXJhbWV0ZXJzID0gdGhpcy5hZGRUb0h0dHBQYXJhbXMocXVlcnlQYXJhbWV0ZXJzLFxuICAgICAgICAgICAgPGFueT5vcmRlckRpcmVjdGlvbiwgJ29yZGVyX2RpcmVjdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb250ZW50VHlwZSkge1xuICAgICAgICAgICAgY29udGVudFR5cGUuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1ldGVycyA9IHRoaXMuYWRkVG9IdHRwUGFyYW1zKHF1ZXJ5UGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgIDxhbnk+ZWxlbWVudCwgJ2NvbnRlbnRfdHlwZVtdJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmIChhZ2dyZWdhdGVCeSkge1xuICAgICAgICAgICAgYWdncmVnYXRlQnkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1ldGVycyA9IHRoaXMuYWRkVG9IdHRwUGFyYW1zKHF1ZXJ5UGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgIDxhbnk+ZWxlbWVudCwgJ2FnZ3JlZ2F0ZV9ieVtdJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmIChmaWx0ZXJzICE9PSB1bmRlZmluZWQgJiYgZmlsdGVycyAhPT0gbnVsbCkge1xuICAgICAgICAgIHF1ZXJ5UGFyYW1ldGVycyA9IHRoaXMuYWRkVG9IdHRwUGFyYW1zKHF1ZXJ5UGFyYW1ldGVycyxcbiAgICAgICAgICAgIDxhbnk+ZmlsdGVycywgJ2ZpbHRlcnMnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zdEZpbHRlcnMgIT09IHVuZGVmaW5lZCAmJiBwb3N0RmlsdGVycyAhPT0gbnVsbCkge1xuICAgICAgICAgIHF1ZXJ5UGFyYW1ldGVycyA9IHRoaXMuYWRkVG9IdHRwUGFyYW1zKHF1ZXJ5UGFyYW1ldGVycyxcbiAgICAgICAgICAgIDxhbnk+cG9zdEZpbHRlcnMsICdwb3N0X2ZpbHRlcnMnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2VvRmlsdGVycyAhPT0gdW5kZWZpbmVkICYmIGdlb0ZpbHRlcnMgIT09IG51bGwpIHtcbiAgICAgICAgICBxdWVyeVBhcmFtZXRlcnMgPSB0aGlzLmFkZFRvSHR0cFBhcmFtcyhxdWVyeVBhcmFtZXRlcnMsXG4gICAgICAgICAgICA8YW55Pmdlb0ZpbHRlcnMsICdnZW9fZmlsdGVycycpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLmRlZmF1bHRIZWFkZXJzO1xuXG4gICAgICAgIC8vIGF1dGhlbnRpY2F0aW9uIChIZWFkZXJBcGlLZXlBdXRoKSByZXF1aXJlZFxuICAgICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmFwaUtleXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdGhpcy5jb25maWd1cmF0aW9uLmFwaUtleXNbXCJIZWFkZXJBcGlLZXlBdXRoXCJdIHx8IHRoaXMuY29uZmlndXJhdGlvbi5hcGlLZXlzW1wiWC1BVVRILVRPS0VOXCJdO1xuICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgIGhlYWRlcnMgPSBoZWFkZXJzLnNldCgnWC1BVVRILVRPS0VOJywga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBodHRwSGVhZGVyQWNjZXB0U2VsZWN0ZWQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5odHRwSGVhZGVyQWNjZXB0O1xuICAgICAgICBpZiAoaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIHRvIGRldGVybWluZSB0aGUgQWNjZXB0IGhlYWRlclxuICAgICAgICAgICAgY29uc3QgaHR0cEhlYWRlckFjY2VwdHM6IHN0cmluZ1tdID0gW1xuICAgICAgICAgICAgICAgICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCA9IHRoaXMuY29uZmlndXJhdGlvbi5zZWxlY3RIZWFkZXJBY2NlcHQoaHR0cEhlYWRlckFjY2VwdHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChodHRwSGVhZGVyQWNjZXB0U2VsZWN0ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaGVhZGVycyA9IGhlYWRlcnMuc2V0KCdBY2NlcHQnLCBodHRwSGVhZGVyQWNjZXB0U2VsZWN0ZWQpO1xuICAgICAgICB9XG5cblxuICAgICAgICBsZXQgcmVzcG9uc2VUeXBlOiAndGV4dCcgfCAnanNvbicgPSAnanNvbic7XG4gICAgICAgIGlmKGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCAmJiBodHRwSGVhZGVyQWNjZXB0U2VsZWN0ZWQuc3RhcnRzV2l0aCgndGV4dCcpKSB7XG4gICAgICAgICAgICByZXNwb25zZVR5cGUgPSAndGV4dCc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LmdldDxTZWFyY2hSZXNwb25zZT4oYCR7dGhpcy5jb25maWd1cmF0aW9uLmJhc2VQYXRofS9hcGkvdjEvc2VhcmNoYCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHF1ZXJ5UGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICByZXNwb25zZVR5cGU6IDxhbnk+cmVzcG9uc2VUeXBlLFxuICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdGhpcy5jb25maWd1cmF0aW9uLndpdGhDcmVkZW50aWFscyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICAgICAgICAgIG9ic2VydmU6IG9ic2VydmUsXG4gICAgICAgICAgICAgICAgcmVwb3J0UHJvZ3Jlc3M6IHJlcG9ydFByb2dyZXNzXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG59XG4iXX0=