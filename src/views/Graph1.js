import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import React, { useDebugValue, useEffect, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { Line, defaults } from "react-chartjs-2";
import "./graph.css";
import Firebase from "firebase/app";

import firebase from "../firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import Header from "./headergraph";
import { authSignIn } from "../actions";
import logo from "../assets/images/design2.jpg";
import logo2 from "../assets/images/design2.jpg";
import { render } from "@testing-library/react";
import { data } from "autoprefixer";

const Graph1 = (props) => {
  const [umail, setUmail] = useState("");
  const isSigned = useSelector((state) => state.authSignIn);
  const [single, setSingle] = useState(props.location.data);
  const [patDetails, setDetails] = useState(single);
  const [patientDetails, setPatientDetails] = useState(single);
  // const [abtem,setAbtem] = useState(single);
  console.log(props.location);

  const [abtem, setAbtem] = useState(single.abtem);
  const [abloodglu, setAbloodglu] = useState(single.abloodglu);
  const [aoxy, setAoxy] = useState(single.aoxy);
  const [ahbeat, setAhbeat] = useState(single.ahbeat);
  const [doc, setDoc] = useState(single.doc);

  const [docDetails, setDocDetails] = useState("");
  // const [single, setSingle] = useState(props.location.state);
  // const [patDetails, setDetails] = useState(single);
  const [submit, setSubmit] = useState("");
  const [test, setTest] = useState("");
  const dispatch = useDispatch();

  function logout() {
    dispatch(authSignIn(""));
    firebase.logout();
    props.history.push("/");
  }

  useEffect(() => {
    setUmail(isSigned.email);
    umail && doctor();
    // umail && graphdataa();
  }, [umail]);

  function doctor() {
    firebase.db
      .collection("doctors")
      .doc(umail)
      .get()

      .then((doc) => {
        if (doc.exists) {
          setDocDetails(doc.data());
        } else {
          alert("Please Select Correct Login Option");
          props.history.replace("/choice");
        }
      })
      .catch((error) => {
        alert("Error getting document:", error);
      });
  }

  // function removed() {
  //   setAoxy(null);
  //   setAbtem(null);
  //   setAhbeat(null);
  //   setAbloodglu(null);

  //     }

  function patperonal() {
    let output = [];
    [single].forEach((item) => {
      output.push(
        <div className="grid grid-flow-col grid-cols-5 grid-rows-1 bg-gray-400 gap-10 h-16 w-screen items-center justify-center text-xs sm:text-xs md:text-base md:font-semibold mb-4">
          <div className="text-black-500 ml-6">
            Patient Name : {item.firstname}
          </div>
          <div className="text-black-500 ml-2">Sex : {item.sex}</div>
          <div className="text-black-500 ml-2">
            Conatct No : {item.contactno}
          </div>
          <div className="text-black-500 ml-2">DOB : {gettime(item.dob)}</div>
          <div className="text-black-500 ml-2">
            Allergy to Med : {item.allergy}
          </div>
        </div>
      );
    });
    return output;
  }

  function dataextract(u) {
    const slicee = u;
    const lastten = slicee.slice(-10);
    return lastten;
  }
  function dataextract2(u) {
    const slicee = u;
    const lastten = slicee.slice(-10);
    return lastten;
  }

  function detailsextract(lop) {
    const slicee = lop;
    const lastten = slicee.slice(-10);
    const darrayone = lastten.map((dtt) => {
      return gettime(dtt);
    });
    return darrayone;
  }

  function gettime(timestamp) {
    const date = new Date(timestamp).toDateString().slice(4);
    const time = new Date(timestamp).toLocaleTimeString("en-US");
    const time2 = time.split(":");
    const time3 = time.split(" ");

    let finalDate = date + ", " + time2[0] + ":" + time2[1] + " " + time3[1];
    // let finalDate = date;

    return finalDate;
  }

  return (
    <>
      <Header
        firstname={docDetails && docDetails.firstname}
        logout={logout.bind(this)}
      />

      {patperonal()}

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-3 mb-10">
          <BarChart
            label={detailsextract(patDetails.adbtem)}
            topic={"Patient's Body Temperature History"}
            name={"Temperature Reading"}
            data={dataextract(patDetails.abtem)}
            colour={"rgba(255, 99, 132, 1)"}
          />
          <BarChart
            label={detailsextract(patDetails.adhbeat)}
            topic={"Patient's Heart Beat History"}
            name={"Heartbeat Reading"}
            data={dataextract(patDetails.ahbeat)}
            colour={"rgba(54, 162, 235, 1)"}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-3 mb-8">
          <BarChart
            label={detailsextract(patDetails.adbloodglu)}
            topic={"Patient's Blood Glucose History"}
            name={"Blood Gluocse Level Reading"}
            data={dataextract(patDetails.abloodglu)}
            colour={"rgba(255, 159, 64, 1)"}
          />
          <BarChart
            label={detailsextract(patDetails.adoxy)}
            topic={"Patient's Blood Oxygen Level History"}
            name={"Blood Oxygen Level Reading"}
            data={dataextract(patDetails.aoxy)}
            colour={"rgba(75, 192, 192, 1)"}
          />
        </div>

        <div className="grid grid-cols-1">
          <LineChart
            label={detailsextract(patDetails.adsysp)}
            data={dataextract2(patDetails.asysp)}
            data2={dataextract(patDetails.adiasp)}
          />
        </div>

        <div className="flex ">
          <div className="float-left ml-2 ">
            <NavLink
              to={{ pathname: "/dashboard/doctorupdate", data: patDetails }}
              className={
                "primary-btn w-24 text-center bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white" +
                (submit
                  ? "hover:bg-sec-500 text-black"
                  : "hover:bg-blue-800 hover:text-white  focus:outline-none")
              }
              block
              data={patDetails}
            >
              Back
            </NavLink>

            <NavLink
              to={{ pathname: "/dashboard/doctorupdate1", state: patDetails }}
              className={
                "primary-btn w-40 ml-3 text-center bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white" +
                (submit
                  ? "hover:bg-sec-500 text-black"
                  : "hover:bg-blue-800 hover:text-white  focus:outline-none")
              }
              block
              data={patDetails}
            >
              Back to Dashboard
            </NavLink>
          </div>

          {/* <div className="w-1/2 float-right mr-10">
                            <br></br><br></br>
                      <button
                            
                            className="primary-btn w-40 text-center bg-blue-200 hover:bg-blue-800 border-blue-500 float-right hover:text-white" 
                              
                            
                            onClick={() => {
                              removed();
                              update();

                            // onClick={remove} >        
                              {/* // updatethird(); */}
          {/* } }>
                          Remove Data
                          </button>

                            </div> */}
        </div>
      </div>

      <div class="flex items-center w-full justify-center mt-5">
        <div class="flex items-center justify-center ">
          <img src={logo2} alt={"MIS logo"} className={"h-20 md:h-24"} />
        </div>
      </div>
    </>
  );
};

export default Graph1;
