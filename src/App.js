import "./styles/_app.scss"
import React from "react";
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router'
import routes from "./routes";
import { AuthGuard, Init, ThemeLoader } from "./components"


function App() {
  return (
    <ThemeLoader>
      <Init>
        <AuthGuard>
          {renderRoutes(routes)}
        </AuthGuard>
      </Init>
    </ThemeLoader>
  );
}

export default withRouter(App);
