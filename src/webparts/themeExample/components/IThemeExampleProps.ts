import { IReadonlyTheme } from "@microsoft/sp-component-base";

export interface IThemeExampleProps {
  description: string;
  themeVariant: IReadonlyTheme | undefined;
}
