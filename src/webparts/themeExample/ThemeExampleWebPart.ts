import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ThemeExampleWebPartStrings';
import ThemeExample from './components/ThemeExample';
import { IThemeExampleProps } from './components/IThemeExampleProps';

import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme
} from "@microsoft/sp-component-base";

export interface IThemeExampleWebPartProps {
  description: string;
}

export default class ThemeExampleWebPart extends BaseClientSideWebPart<IThemeExampleWebPartProps> {

  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      this._themeProvider = this.context.serviceScope.consume(
        ThemeProvider.serviceKey
      );

      // If it exists, get the theme variant
      this._themeVariant = this._themeProvider.tryGetTheme();

      // Register a handler to be notified if the theme variant changes
      this._themeProvider.themeChangedEvent.add(
        this,
        this._handleThemeChangedEvent
      );
    })
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  public render(): void {
    const element: React.ReactElement<IThemeExampleProps> = React.createElement(
      ThemeExample,
      {
        description: this.properties.description,
        themeVariant: this._themeVariant,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
