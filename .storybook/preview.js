import { MockedProvider } from "@apollo/client/testing";
import { addDecorator } from "@storybook/react";
import { ThemeProvider as MuiThemeProvider,} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "styled-components";
import theme from "../theme"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
  apolloClient: {
    MockedProvider,
  },
};

addDecorator((storyFn) => {
  return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {storyFn()}
        </ThemeProvider>
      </MuiThemeProvider>
  );
});