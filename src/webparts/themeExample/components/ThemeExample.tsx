import * as React from 'react';
import styles from './ThemeExample.module.scss';
import { IThemeExampleProps } from './IThemeExampleProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export default class ThemeExample extends React.Component<IThemeExampleProps, {}> {

  
  public render(): React.ReactElement<IThemeExampleProps> {

    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;

    return (
      <div style={{ backgroundColor: semanticColors.bodyBackground, color: semanticColors.bodyText }}>Hello World, This is our webpart</div>
    );
  }
}
