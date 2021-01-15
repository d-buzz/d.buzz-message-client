import React from "react";
import { withRouter } from "react-router";
import { renderRoutes } from "react-router-config";
import routes from "./routes";
import { AuthGuard, Init, ThemeLoader } from "./components"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    overflow: "hidden !important",
    backgroundColor: theme.background.primary,
  },
}));

const AppWrapper = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};

function App() {
  return (
    <React.Fragment>
      <ThemeLoader>
        <Init>
          <AuthGuard>
            <AppWrapper>
              {renderRoutes(routes)}
            </AppWrapper>
          </AuthGuard>
        </Init>
      </ThemeLoader>
    </React.Fragment>
  );
}

export default withRouter(App);
