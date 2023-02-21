import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = sessionStorage.getItem("isAuth");

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated === "true" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default ProtectedRoute;
