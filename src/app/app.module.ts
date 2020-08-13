import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule, Configuration, ConfigurationParameters } from 'flotiq';
import { ProductModule } from './product/product.module';
import { AppRoutingModule } from './app-routing.module';
import { ScullyLibModule } from '@scullyio/ng-lib';

export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    apiKeys: {'X-AUTH-TOKEN': environment.apiKey}
  };
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ApiModule.forRoot(apiConfigFactory),
    HttpClientModule,
    ProductModule,
    AppRoutingModule,
    ScullyLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
