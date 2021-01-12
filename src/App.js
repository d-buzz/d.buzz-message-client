import React from "react";
import { withRouter } from "react-router";
import { renderRoutes } from "react-router-config";
import routes from "./routes";
import { AuthGuard } from "./components"
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    overflow: "hidden !important",
    backgroundColor: "#202225",
    color: "#FFFFFF",
  },
}));

const AppWrapper = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};

function App() {
  return (
    <React.Fragment>
      <AuthGuard>
        <AppWrapper>
          {renderRoutes(routes)}
        </AppWrapper>
      </AuthGuard>
    </React.Fragment>
  );
}

export default withRouter(App);
