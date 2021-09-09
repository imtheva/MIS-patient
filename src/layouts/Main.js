import React, { useEffect, useState } from "react";
import firebase from "../firebase/Firebase";
import { BrowserRouter as Router, withRouter,Switch, Route,Redirect} from "react-router-dom";
import "../assets/css/main.css";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";
import Choice from "../views/Choice";
import Dashboard from "../layouts/Dashboard";
import { useDispatch, useSelector } from "react-redux";

const DashboardF = withRouter(Dashboard);


const  Main = (props) => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const isSigned = useSelector((state) => state.authSignIn);


  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });

  return firebaseInitialized !== false ? (
    <Router>
      <div>
        {/* <Navigation /> */}
        <Switch>
          <Route exact path="/" component={Choice}  />
          <Route path="/choice" component={Choice} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard">
            <DashboardF />  
          </Route>       
         </Switch>
      </div>
    </Router>
  ) : (
    <></>
  );
};
export default Main;
