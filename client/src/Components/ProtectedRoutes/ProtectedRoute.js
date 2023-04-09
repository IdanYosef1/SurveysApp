import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  return (
    <Route
      {...restOfProps}
      render={() =>
        sessionStorage.getItem("isAuth") === "true" ? (
          <Component {...restOfProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default ProtectedRoute;
