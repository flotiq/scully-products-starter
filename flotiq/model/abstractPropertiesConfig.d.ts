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
import { AbstractContentTypeMetaDefinition } from './abstractContentTypeMetaDefinition';
import { AbstractPropertiesConfigValidation } from './abstractPropertiesConfigValidation';
export interface AbstractPropertiesConfig {
    label: string;
    inputType: AbstractPropertiesConfig.InputTypeEnum;
    unique: boolean;
    readonly?: boolean;
    hidden?: boolean;
    validation?: AbstractPropertiesConfigValidation;
    options?: Array<string>;
    helpText?: string;
    isTitlePart?: boolean;
    items?: AbstractContentTypeMetaDefinition;
}
export declare namespace AbstractPropertiesConfig {
    type InputTypeEnum = 'text' | 'richtext' | 'textarea' | 'textMarkdown' | 'email' | 'number' | 'radio' | 'checkbox' | 'select' | 'datasource' | 'object' | 'geo';
    const InputTypeEnum: {
        Text: InputTypeEnum;
        Richtext: InputTypeEnum;
        Textarea: InputTypeEnum;
        TextMarkdown: InputTypeEnum;
        Email: InputTypeEnum;
        Number: InputTypeEnum;
        Radio: InputTypeEnum;
        Checkbox: InputTypeEnum;
        Select: InputTypeEnum;
        Datasource: InputTypeEnum;
        Object: InputTypeEnum;
        Geo: InputTypeEnum;
    };
}
