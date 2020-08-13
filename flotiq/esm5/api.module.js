import { __decorate, __param } from "tslib";
import { NgModule, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';
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
export { ApiModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2Zsb3RpcS8iLCJzb3VyY2VzIjpbImFwaS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQWdCbEQ7SUFRSSxtQkFBcUMsWUFBdUIsRUFDbkMsSUFBZ0I7UUFDckMsSUFBSSxZQUFZLEVBQUU7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUM7U0FDdkY7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQywrREFBK0Q7Z0JBQy9FLDBEQUEwRCxDQUFDLENBQUM7U0FDL0Q7SUFDTCxDQUFDO2tCQWpCUSxTQUFTO0lBQ0osaUJBQU8sR0FBckIsVUFBc0Isb0JBQXlDO1FBQzNELE9BQU87WUFDSCxRQUFRLEVBQUUsV0FBUztZQUNuQixTQUFTLEVBQUUsQ0FBRSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLENBQUU7U0FDOUUsQ0FBQztJQUNOLENBQUM7OztnQkFFa0QsU0FBUyx1QkFBOUMsUUFBUSxZQUFJLFFBQVE7Z0JBQ0gsVUFBVSx1QkFBM0IsUUFBUTs7SUFUYixTQUFTO1FBTnJCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBTyxFQUFFO1lBQ2hCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLE9BQU8sRUFBTyxFQUFFO1lBQ2hCLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQVNnQixXQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsV0FBQSxRQUFRLEVBQUUsQ0FBQTtRQUN0QixXQUFBLFFBQVEsRUFBRSxDQUFBO09BVGYsU0FBUyxDQWtCckI7SUFBRCxnQkFBQztDQUFBLEFBbEJELElBa0JDO1NBbEJZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgU2tpcFNlbGYsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cblxuaW1wb3J0IHsgQ29udGVudE1lZGlhU2VydmljZSB9IGZyb20gJy4vYXBpL2NvbnRlbnRNZWRpYS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbnRlbnRQcm9kdWN0U2VydmljZSB9IGZyb20gJy4vYXBpL2NvbnRlbnRQcm9kdWN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgR3JhcGhRTFNlcnZpY2UgfSBmcm9tICcuL2FwaS9ncmFwaFFMLnNlcnZpY2UnO1xuaW1wb3J0IHsgSW50ZXJuYWxTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvaW50ZXJuYWwuc2VydmljZSc7XG5pbXBvcnQgeyBNZWRpYVNlcnZpY2UgfSBmcm9tICcuL2FwaS9tZWRpYS5zZXJ2aWNlJztcbmltcG9ydCB7IFNlYXJjaEFQSVNlcnZpY2UgfSBmcm9tICcuL2FwaS9zZWFyY2hBUEkuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6ICAgICAgW10sXG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGV4cG9ydHM6ICAgICAgW10sXG4gIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgQXBpTW9kdWxlIHtcbiAgICBwdWJsaWMgc3RhdGljIGZvclJvb3QoY29uZmlndXJhdGlvbkZhY3Rvcnk6ICgpID0+IENvbmZpZ3VyYXRpb24pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFwaU1vZHVsZT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFwaU1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogWyB7IHByb3ZpZGU6IENvbmZpZ3VyYXRpb24sIHVzZUZhY3Rvcnk6IGNvbmZpZ3VyYXRpb25GYWN0b3J5IH0gXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IEFwaU1vZHVsZSxcbiAgICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FwaU1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGluIHlvdXIgYmFzZSBBcHBNb2R1bGUgb25seS4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWh0dHApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gaW1wb3J0IHRoZSBIdHRwQ2xpZW50TW9kdWxlIGluIHlvdXIgQXBwTW9kdWxlISBcXG4nICtcbiAgICAgICAgICAgICdTZWUgYWxzbyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yMDU3NScpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19