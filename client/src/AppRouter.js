import { Route } from "react-router-dom";
import MainDashboardEntry from "./Components/Utilities/MainDashboardEntry";
import AddSurvey from "./pages/AddSurvey/AddSurvey";
import ApprovalSurveys from "./pages/ApprovalSurveys/ApprovalSurveys";
import RequestStatus from "./pages/RequestStatus/RequestStatus";
import ShareSurvey from "./pages/ShareSurvey/ShareSurvey";
import SignIn from "./pages/SignIn/Sign-In";
import SignUp from "./pages/SignUp/Sign-Up";
import Survey from "./pages/Survey/Survey";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import { HashRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { getById } from "./axios";
import { updateAwaitingsApproval } from "./Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Results from "./pages/Results/Results";

const urlUsers = process.env.REACT_APP_USERS_URL;

function AppRouter() {
  const [mainBool, setMainBool] = useState(false);
  const store = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getSurveys() {
      try {
        if (sessionStorage.getItem("isAuth") === "true") {
          const arr = (await getById(urlUsers, store.userId, store.token)).data;
          dispatch(updateAwaitingsApproval(arr.awaitingApproval));
        }
      } catch (err) {
        console.log(err);
      }
    }
    getSurveys();
  }, [dispatch, store.token, store.userId, store.main, mainBool]);

  return (
    <Router>
      <Route path="/" component={SignIn} exact />
      <Route path="/sign-up" component={SignUp} />
      <ProtectedRoute path="/main" component={MainDashboardEntry} />
      <ProtectedRoute path="/addsurvey" component={AddSurvey} />
      <ProtectedRoute path="/survey/:id" component={Survey} />
      <ProtectedRoute path="/approvalOfSurvey/survey/:id" component={Survey} />
      <ProtectedRoute path="/results/:id" component={Results} />
      <ProtectedRoute
        path="/approvalOfSurveys"
        component={ApprovalSurveys}
        mainBool={mainBool}
        setMainBool={setMainBool}
      />
      <ProtectedRoute path="/requestStatus" component={RequestStatus} />
      <ProtectedRoute path="/shareSurvey/:id" component={ShareSurvey} />
    </Router>
  );
}

export default AppRouter;
