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
export { CustomHttpParameterCodec };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2Rlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Zsb3RpcS8iLCJzb3VyY2VzIjpbImVuY29kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7OztHQUdHO0FBQ0g7SUFBQTtJQWFBLENBQUM7SUFaRyw0Q0FBUyxHQUFULFVBQVUsQ0FBUztRQUNmLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNELDhDQUFXLEdBQVgsVUFBWSxDQUFTO1FBQ2pCLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNELDRDQUFTLEdBQVQsVUFBVSxDQUFTO1FBQ2YsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsOENBQVcsR0FBWCxVQUFZLENBQVM7UUFDakIsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0wsK0JBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBQYXJhbWV0ZXJDb2RlYyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuLyoqXG4gKiBDdXN0b20gSHR0cFBhcmFtZXRlckNvZGVjXG4gKiBXb3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xODI2MVxuICovXG5leHBvcnQgY2xhc3MgQ3VzdG9tSHR0cFBhcmFtZXRlckNvZGVjIGltcGxlbWVudHMgSHR0cFBhcmFtZXRlckNvZGVjIHtcbiAgICBlbmNvZGVLZXkoazogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrKTtcbiAgICB9XG4gICAgZW5jb2RlVmFsdWUodjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2KTtcbiAgICB9XG4gICAgZGVjb2RlS2V5KGs6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoayk7XG4gICAgfVxuICAgIGRlY29kZVZhbHVlKHY6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodik7XG4gICAgfVxufVxuXG4iXX0=