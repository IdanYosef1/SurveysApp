import { Route } from "react-router-dom";
import MainDashboardEntry from "./Components/Utilities/MainDashboardEntry";
import AddSurvey from "./pages/AddSurvey/AddSurvey";
import ApprovalSurveys from "./pages/ApprovalSurveys/ApprovalSurveys";
import RequestStatus from "./pages/RequestStatus/RequestStatus";
import ResultsSurvey from "./pages/ResultsSurvey/ResultsSurvey";
import ShareSurvey from "./pages/ShareSurvey/ShareSurvey";
import SignIn from "./pages/SignIn/Sign-In";
import SignUp from "./pages/SignUp/Sign-Up";
import Survey from "./pages/Survey/Survey";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import { HashRouter as Router } from "react-router-dom";

function AppRouter() {
  return (
    <Router>
      <Route path="/" component={SignIn} exact />
      <Route path="/sign-up" component={SignUp} />
      <ProtectedRoute path="/main" component={MainDashboardEntry} />
      <ProtectedRoute path="/addsurvey" component={AddSurvey} />
      <ProtectedRoute path="/survey/:id" component={Survey} />
      <ProtectedRoute path="/approvalOfSurveys/survey/:id" component={Survey} />
      <ProtectedRoute path="/results" component={ResultsSurvey} />
      <ProtectedRoute path="/approvalOfSurveys" component={ApprovalSurveys} />
      <ProtectedRoute path="/requestStatus" component={RequestStatus} />
      <ProtectedRoute path="/shareSurvey/:id" component={ShareSurvey} />
    </Router>
  );
}

export default AppRouter;
