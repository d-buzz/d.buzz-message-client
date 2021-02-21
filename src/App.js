import "./styles/_app.scss"
import React from "react";
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router'
import routes from "./routes";
import { AuthGuard, Init, ThemeLoader, PasswordWall } from "./components"


function App() {
  return (
    <ThemeLoader>
      <PasswordWall>
        <Init>
          <AuthGuard>
            {renderRoutes(routes)}
          </AuthGuard>
        </Init>
      </PasswordWall>
    </ThemeLoader>
  );
}

export default withRouter(App);
