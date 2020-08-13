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
export { Configuration };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Zsb3RpcS8iLCJzb3VyY2VzIjpbImNvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBWUE7SUFTSSx1QkFBWSx1QkFBcUQ7UUFBckQsd0NBQUEsRUFBQSw0QkFBcUQ7UUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyxPQUFPLENBQUM7UUFDL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7UUFDakQsSUFBSSxDQUFDLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxXQUFXLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7UUFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7UUFDL0QsSUFBSSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyxPQUFPLENBQUM7SUFDbkQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLCtDQUF1QixHQUE5QixVQUFnQyxZQUFzQjtRQUF0RCxpQkFVQztRQVRHLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDM0IsT0FBTyxTQUFTLENBQUM7U0FDcEI7UUFFRCxJQUFNLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBUyxJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO1FBQ2xFLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNwQixPQUFPLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSwwQ0FBa0IsR0FBekIsVUFBMEIsT0FBaUI7UUFBM0MsaUJBVUM7UUFURyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sU0FBUyxDQUFDO1NBQ3BCO1FBRUQsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVMsSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztRQUM3RCxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDcEIsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0ksa0NBQVUsR0FBakIsVUFBa0IsSUFBWTtRQUMxQixJQUFNLFFBQVEsR0FBVyxJQUFJLE1BQU0sQ0FBQywrREFBK0QsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRyxPQUFPLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUF2RUQsSUF1RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUGFyYW1ldGVyQ29kZWMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlndXJhdGlvblBhcmFtZXRlcnMge1xuICAgIGFwaUtleXM/OiB7WyBrZXk6IHN0cmluZyBdOiBzdHJpbmd9O1xuICAgIHVzZXJuYW1lPzogc3RyaW5nO1xuICAgIHBhc3N3b3JkPzogc3RyaW5nO1xuICAgIGFjY2Vzc1Rva2VuPzogc3RyaW5nIHwgKCgpID0+IHN0cmluZyk7XG4gICAgYmFzZVBhdGg/OiBzdHJpbmc7XG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgICBlbmNvZGVyPzogSHR0cFBhcmFtZXRlckNvZGVjO1xufVxuXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvbiB7XG4gICAgYXBpS2V5cz86IHtbIGtleTogc3RyaW5nIF06IHN0cmluZ307XG4gICAgdXNlcm5hbWU/OiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ/OiBzdHJpbmc7XG4gICAgYWNjZXNzVG9rZW4/OiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKTtcbiAgICBiYXNlUGF0aD86IHN0cmluZztcbiAgICB3aXRoQ3JlZGVudGlhbHM/OiBib29sZWFuO1xuICAgIGVuY29kZXI/OiBIdHRwUGFyYW1ldGVyQ29kZWM7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWd1cmF0aW9uUGFyYW1ldGVyczogQ29uZmlndXJhdGlvblBhcmFtZXRlcnMgPSB7fSkge1xuICAgICAgICB0aGlzLmFwaUtleXMgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5hcGlLZXlzO1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMudXNlcm5hbWU7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5wYXNzd29yZDtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbiA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmFjY2Vzc1Rva2VuO1xuICAgICAgICB0aGlzLmJhc2VQYXRoID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMuYmFzZVBhdGg7XG4gICAgICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICB0aGlzLmVuY29kZXIgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5lbmNvZGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCB0aGUgY29ycmVjdCBjb250ZW50LXR5cGUgdG8gdXNlIGZvciBhIHJlcXVlc3QuXG4gICAgICogVXNlcyB7QGxpbmsgQ29uZmlndXJhdGlvbiNpc0pzb25NaW1lfSB0byBkZXRlcm1pbmUgdGhlIGNvcnJlY3QgY29udGVudC10eXBlLlxuICAgICAqIElmIG5vIGNvbnRlbnQgdHlwZSBpcyBmb3VuZCByZXR1cm4gdGhlIGZpcnN0IGZvdW5kIHR5cGUgaWYgdGhlIGNvbnRlbnRUeXBlcyBpcyBub3QgZW1wdHlcbiAgICAgKiBAcGFyYW0gY29udGVudFR5cGVzIC0gdGhlIGFycmF5IG9mIGNvbnRlbnQgdHlwZXMgdGhhdCBhcmUgYXZhaWxhYmxlIGZvciBzZWxlY3Rpb25cbiAgICAgKiBAcmV0dXJucyB0aGUgc2VsZWN0ZWQgY29udGVudC10eXBlIG9yIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4gaWYgbm8gc2VsZWN0aW9uIGNvdWxkIGJlIG1hZGUuXG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdEhlYWRlckNvbnRlbnRUeXBlIChjb250ZW50VHlwZXM6IHN0cmluZ1tdKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGNvbnRlbnRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0eXBlID0gY29udGVudFR5cGVzLmZpbmQoKHg6IHN0cmluZykgPT4gdGhpcy5pc0pzb25NaW1lKHgpKTtcbiAgICAgICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlc1swXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgdGhlIGNvcnJlY3QgYWNjZXB0IGNvbnRlbnQtdHlwZSB0byB1c2UgZm9yIGEgcmVxdWVzdC5cbiAgICAgKiBVc2VzIHtAbGluayBDb25maWd1cmF0aW9uI2lzSnNvbk1pbWV9IHRvIGRldGVybWluZSB0aGUgY29ycmVjdCBhY2NlcHQgY29udGVudC10eXBlLlxuICAgICAqIElmIG5vIGNvbnRlbnQgdHlwZSBpcyBmb3VuZCByZXR1cm4gdGhlIGZpcnN0IGZvdW5kIHR5cGUgaWYgdGhlIGNvbnRlbnRUeXBlcyBpcyBub3QgZW1wdHlcbiAgICAgKiBAcGFyYW0gYWNjZXB0cyAtIHRoZSBhcnJheSBvZiBjb250ZW50IHR5cGVzIHRoYXQgYXJlIGF2YWlsYWJsZSBmb3Igc2VsZWN0aW9uLlxuICAgICAqIEByZXR1cm5zIHRoZSBzZWxlY3RlZCBjb250ZW50LXR5cGUgb3IgPGNvZGU+dW5kZWZpbmVkPC9jb2RlPiBpZiBubyBzZWxlY3Rpb24gY291bGQgYmUgbWFkZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0SGVhZGVyQWNjZXB0KGFjY2VwdHM6IHN0cmluZ1tdKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGFjY2VwdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHlwZSA9IGFjY2VwdHMuZmluZCgoeDogc3RyaW5nKSA9PiB0aGlzLmlzSnNvbk1pbWUoeCkpO1xuICAgICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gYWNjZXB0c1swXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgZ2l2ZW4gTUlNRSBpcyBhIEpTT04gTUlNRS5cbiAgICAgKiBKU09OIE1JTUUgZXhhbXBsZXM6XG4gICAgICogICBhcHBsaWNhdGlvbi9qc29uXG4gICAgICogICBhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURjhcbiAgICAgKiAgIEFQUExJQ0FUSU9OL0pTT05cbiAgICAgKiAgIGFwcGxpY2F0aW9uL3ZuZC5jb21wYW55K2pzb25cbiAgICAgKiBAcGFyYW0gbWltZSAtIE1JTUUgKE11bHRpcHVycG9zZSBJbnRlcm5ldCBNYWlsIEV4dGVuc2lvbnMpXG4gICAgICogQHJldHVybiBUcnVlIGlmIHRoZSBnaXZlbiBNSU1FIGlzIEpTT04sIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNKc29uTWltZShtaW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QganNvbk1pbWU6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14oYXBwbGljYXRpb25cXC9qc29ufFteOy8gXFx0XStcXC9bXjsvIFxcdF0rWytdanNvbilbIFxcdF0qKDsuKik/JCcsICdpJyk7XG4gICAgICAgIHJldHVybiBtaW1lICE9PSBudWxsICYmIChqc29uTWltZS50ZXN0KG1pbWUpIHx8IG1pbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24tcGF0Y2granNvbicpO1xuICAgIH1cbn1cbiJdfQ==