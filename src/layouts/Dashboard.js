import React, { useEffect, useRef, useState } from "react";
import firebase from "../firebase/Firebase";
import { BrowserRouter as Router, Switch, withRouter, Route } from "react-router-dom";
import Header from "../views/Header"
import { useDispatch, useSelector } from "react-redux";
import Patients from "../views/Patients";
import Doctors from "../views/Doctors";
import DoctorDashboard from "../views/DoctorDashboard";
import PatientUpdate from "../views/PatientUpdate";
import PatientDashboard from "../views/PatientDashboard";
import DoctorUpdate from "../views/DoctorUpdate";
import DoctorUpdate1 from "../views/DoctorUpdate1";
import Graph1 from "../views/Graph1";


import { authSignIn } from "../actions";


const PatientsF = withRouter(Patients)
const DoctorsF = withRouter(Doctors);
const DoctorDashboardF = withRouter(DoctorDashboard);
const PatientUpdateF = withRouter(PatientUpdate);
const PatientDashboardF = withRouter(PatientDashboard);
const DoctorUpdateF = withRouter(DoctorUpdate);
const DoctorUpdate1F =withRouter(DoctorUpdate1);
const GraphF =withRouter(Graph1);

const Dashboard = (props) => {
  const [user, setUser] = useState(false);
  const [log, setLog] = useState("");
  const [allow,setAllow]=useState(false);
  const isSigned = useSelector((state) => state.authSignIn);
  const [name, setName]=useState("");
  useEffect(() => {
    isSigned ? ( setAllow(true)) :
    props.history.replace("/")
    
  }, []);

  // if (!firebase.getCurrentUsername()) {
  //   props.history.replace("/SignIn");
  // }
  useEffect(() => {
    setLog(isSigned.email);
  }, []);

  // function logout() {
  //   dispatch(authSignIn(""));
  //   firebase.logout();
  //   props.history.push("/");
  // }
  return (
  <div>
      {/* <Header
        logout={logout.bind(this)}
        // log={log}

      /> */}
        <Switch>
          <Route path="/dashboard/patients" >
            <PatientsF />
          </Route>
          <Route path="/dashboard/doctors" >
            <DoctorsF />
          </Route>
          <Route path="/dashboard/doctordashboard" >
            <DoctorDashboardF />
          </Route>
          <Route path="/dashboard/patientdashboard" >
            <PatientDashboardF />
          </Route>
          <Route path="/dashboard/doctorupdate" >
            <DoctorUpdateF />
          </Route>
          <Route path="/dashboard/patientupdate" >
            <PatientUpdateF />
          </Route>
          <Route path="/dashboard/doctorupdate1" >
            <DoctorUpdate1F />
          </Route>
          <Route path="/dashboard/graph1" >
            <GraphF />
          </Route>
          
          
        </Switch>
    
    </div>
  );
};

export default withRouter(Dashboard);
