import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeProps } from "../../shared/prop-types/ReducerProps";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const materialTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "rgb(23, 105, 170)",
      dark: "#000"
    },
    secondary: {
      main: "#f44336"
    }
  },
  typography: {
    useNextVariants: true
  }
});

class MainWrapper extends PureComponent {
  static propTypes = {
    theme: ThemeProps.isRequired,
    children: PropTypes.element.isRequired
  };

  render() {
    const { theme, children } = this.props;

    return (
      <div className={theme.className}>
        <MuiThemeProvider theme={materialTheme}>
          <div className="wrapper">{children}</div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(state => ({
  theme: state.theme
}))(MainWrapper);
