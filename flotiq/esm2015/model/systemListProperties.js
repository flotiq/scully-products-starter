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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzdGVtTGlzdFByb3BlcnRpZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mbG90aXEvIiwic291cmNlcyI6WyJtb2RlbC9zeXN0ZW1MaXN0UHJvcGVydGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztHQVVHIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGbG90aXEgVXNlciBBUElcbiAqICMjIEdldHRpbmcgc3RhcnRlZCAgIFRoaXMgaXMgeW91ciBGbG90aXEgVXNlciBBUEkgdGhhdCBhbGxvd3MgeW91IHRvIGFjY2VzcyB5b3VyIGRhdGEgdGhyb3VnaCB0aGUgQ29udGVudCBBUEkgdGhhdCB5b3UgZGVmaW5lZC4gICAjIyMgQWNjZXNzIHRvIGRhdGEgICBUaGVyZSBhcmUgc2V2ZXJhbCBtZXRob2RzIHRoYXQgeW91IGNhbiB1c2UgdG8gYWNjZXNzIHlvdXIgZGF0YTogICogTGl2ZSBBUEkgZG9jcyAtIGF2YWlsYWJsZSB2aWEgPGNvZGU+VHJ5IGl0IG91dDwvY29kZT4gYnV0dG9uIGF2YWlsYWJsZSBuZXh0IHRvIGVhY2ggZW5kcG9pbnQgICAqIENvcHlpbmcgZXhhbXBsZSBjb2RlIG9uIHRoZSByaWdodCBzaWRlIG9mIGVhY2ggZW5kcG9pbnQgICogQnkgZG93bmxvYWRpbmcgdGhlIFNES3MgYXZhaWxhYmxlIGluIG11bGl0cGxlIGxhbmd1YWdlcy4gICogQnkgZG93bmxvYWRpbmcgdGhlIFBvc3RtYW4gY29sbGVjdGlvbiBhbmQgaW1wb3J0aW5nIGl0IGludG8gUG9zdG1hbi4gICAgRWFjaCBvZiB0aGVzZSBtZXRob2RzIGlzIGRlc2NyaWJlZCBpbiBsZW5ndGggaW4gdGhlIFt1c2VyIGRvY3VtZW50YXRpb25dKGh0dHBzOi8vZmxvdGlxLmNvbS9kb2NzLykuICAgIyMjIEF1dGhvcml6YXRpb24gICBJbiBvcmRlciB0byBtYWtlIHVzZSBvZiB0aGUgcHJvdmlkZWQgZG9jdW1lbnRhdGlvbiwgZXhhbXBsZSBjb2RlLCBTREtzIGFuZCBzbyBvbiAtIHlvdSB3aWxsIG5lZWQgdG8gcHVsbCBvdXQgeW91ciBBUEkga2V5LiBXZSByZWNvbW1lbmQgdGhhdCB5b3Ugc3RhcnQgd2l0aCB0aGUgUmVhZE9ubHkgQVBJIEtleSB3aGljaCB3aWxsIGFsbG93IHlvdSB0byBtYWtlIGFsbCB0aGUgYEdFVGAgcmVxdWVzdHMgYnV0IHdpbGwgZXJyb3Itb3V0IHdoZW4geW91IHRyeSB0byBtb2RpZnkgY29udGVudC4gUGxlYXNlIHJlbWVtYmVyIHRvIHJlcGxhY2UgdGhlIGtleSBmb3IgYFBPU1RgLCBgUFVUYCBhbmQgYERFTEVURWAgY2FsbHMuICAgSXRcXCdzIGFsc28gcG9zc2libGUgdG8gdXNlIHNjb3BlZCBBUEkga2V5cyAtIHlvdSBjYW4gY3JlYXRlIHRob3NlIGluIHRoZSBBUEkga2V5cyBzZWN0aW9uIG9mIHRoZSBGbG90aXEgdXNlciBpbnRlcmZhY2UuIFRoaXMgd2lsbCBhbGxvdyB5b3UgdG8gY3JlYXRlIGEga2V5IHRoYXQgb25seSBhdXRob3JpemVzIGFjY2VzcyB0byBhIHNwZWNpZmljIGNvbnRlbnQgdHlwZSAob3IgYSBzZXQgb2YgY29udGVudCB0eXBlcywgaWYgeW91IGNob29zZSBzbykuIFJlYWQgbW9yZSBhYm91dCBob3cgdG8gdXNlIGFuZCBjcmVhdGUgQVBJIGtleXMgaW4gdGhlIFtBUEkga2V5cyBkb2N1bWVudGF0aW9uXShodHRwczovL2Zsb3RpcS5jb20vZG9jcy9BUEkvKS4gICAjIyBPYmplY3QgYWNjZXNzICAgT25jZSB5b3UgZGVmaW5lIGEgQ29udGVudCBUeXBlIGl0IHdpbGwgYmVjb21lIGF2YWlsYWJsZSBpbiB5b3VyIENvbnRlbnQgQVBJIGFzIGEgc2V0IG9mIGVuZHBvaW50cyB0aGF0IHdpbGwgYWxsb3cgeW91IHRvIHdvcmsgd2l0aCBvYmplY3RzOiAgICogY3JlYXRlICAqIGxpc3QgICogdXBkYXRlICAqIGRlbGV0ZSAgKiBiYXRjaCBjcmVhdGUgICogcmV0cmlldmUgc2luZ2xlIG9iamVjdC4gICMjIyBIeWRyYXRpb24gICBXaGVuIHlvdSBidWlsZCBDb250ZW50IFR5cGVzIHRoYXQgaGF2ZSByZWxhdGlvbiB0byBvdGhlcnMgeW91ciBvYmplY3RzIHdpbGwgb3B0aW9uYWxseSBzdXBwb3J0IGh5ZHJhdGlvbiBvZiByZWxhdGVkIGVudGl0aWVzLiBUaGUgZW5kcG9pbnRzIHRoYXQgc3VwcG9ydCBvYmplY3QgcmV0cmlldmFsIGFjY2VwdCBhIGBoeWRyYXRlYCBwYXJhbWV0ZXIsIHdoaWNoIGNhbiBiZSB1c2VkIHRvIGVhc2lseSBmZXRjaCBoeWRyYXRlZCBvYmplY3RzLiBTaW5jZSB0aGlzIGJyZWFrcyB0aGUgc3RhbmRhcmQgUkVTVCBjb25jZXB0cyAtIGl0XFwncyBub3QgZW5hYmxlZCBieSBkZWZhdWx0LCBidXQgaXRcXCdzIGEgdmVyeSBoYW5keSBmZWF0dXJlIHRoYXQgYWxsb3dzIHRvIHJlZHVjZSB0aGUgYW1vdW50IG9mIEhUVFAgcmVxdWVzdHMgc2VudCBvdmVyIHRoZSB3aXJlIGFuZCB3ZSBzdHJvbmdseSByZWNvbW1lbmQgdG8gdXNlIGl0LlxuICpcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBPcGVuQVBJIGRvY3VtZW50OiAyLjAuMVxuICogQ29udGFjdDogaGVsbG9AZmxvdGlxLmNvbVxuICpcbiAqIE5PVEU6IFRoaXMgY2xhc3MgaXMgYXV0byBnZW5lcmF0ZWQgYnkgT3BlbkFQSSBHZW5lcmF0b3IgKGh0dHBzOi8vb3BlbmFwaS1nZW5lcmF0b3IudGVjaCkuXG4gKiBodHRwczovL29wZW5hcGktZ2VuZXJhdG9yLnRlY2hcbiAqIERvIG5vdCBlZGl0IHRoZSBjbGFzcyBtYW51YWxseS5cbiAqL1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgU3lzdGVtTGlzdFByb3BlcnRpZXMgeyBcbiAgICB0b3RhbF9jb3VudDogbnVtYmVyO1xuICAgIGNvdW50OiBudW1iZXI7XG4gICAgdG90YWxfcGFnZXM6IG51bWJlcjtcbiAgICBjdXJyZW50X3BhZ2U6IG51bWJlcjtcbn1cblxuIl19