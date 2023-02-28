import { Route } from "react-router-dom";
import "./App.css";
import AppRouter from "./AppRouter";
import NavBar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="page">
      <Route
        render={({ location }) => {
          if (location.hash !== "#/" && location.hash !== "#/sign-up")
            return <NavBar />;
        }}
      />
      <AppRouter />
    </div>
  );
}

export default App;
