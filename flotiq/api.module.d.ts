import { ModuleWithProviders } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';
import * as ɵngcc0 from '@angular/core';
export declare class ApiModule {
    static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule>;
    constructor(parentModule: ApiModule, http: HttpClient);
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<ApiModule, never, never, never>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<ApiModule>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLm1vZHVsZS5kLnRzIiwic291cmNlcyI6WyJhcGkubW9kdWxlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUFHQTs7Ozs7QUFHQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIEFwaU1vZHVsZSB7XHJcbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWd1cmF0aW9uRmFjdG9yeTogKCkgPT4gQ29uZmlndXJhdGlvbik6IE1vZHVsZVdpdGhQcm92aWRlcnM8QXBpTW9kdWxlPjtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmVudE1vZHVsZTogQXBpTW9kdWxlLCBodHRwOiBIdHRwQ2xpZW50KTtcclxufVxyXG4iXX0=