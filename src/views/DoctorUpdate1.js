import React, { useEffect, useState } from "react";
import firebase from "../firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useHistory } from "react-router-dom";
import Header from "./Header";
import FeatherIcon from "feather-icons-react";
import { withRouter } from "react-router-dom";
import { authSignIn } from "../actions";
import logo2 from "../assets/images/design2.jpg";

function gettime(timestamp) {
  const date = new Date(timestamp).toDateString().slice(4);
  const time = new Date(timestamp).toLocaleTimeString("en-US");
  const time2 = time.split(":");
  const time3 = time.split(" ");

  let finalDate = date + ", " + time2[0] + ":" + time2[1] + " " + time3[1];

  return finalDate;
}

const DoctorUpdate1 = (props) => {
  const [umail, setUmail] = useState("");
  const isSigned = useSelector((state) => state.authSignIn);
  const [docDetails, setDocDetails] = useState("");
  const [single, setSingle] = useState(props.location.state);
  const [patDetails, setDetails] = useState(single);
  const [submit, setSubmit] = useState("");
  const [test, setTest] = useState("");
  const dispatch = useDispatch();

  function back() {
    props.history.replace("/dashboard/doctordashboard");
  }

  function logout() {
    dispatch(authSignIn(""));
    firebase.logout();
    props.history.push("/");
  }
  useEffect(() => {
    setUmail(isSigned.email);
    umail && doctor();
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
  //   useEffect(() => {
  //     setUmail(isSigned.email);
  //     umail && getData();
  //     console.log(umail);
  //   }, [umail]);

  //   if (!isSigned) {
  //     props.history.replace("/signin");
  //   }

  function checkbtemval() {
    const a = patDetails.btemp;
    if (a >= 38) {
      return "IndianRed";
    } else if (a < 38 && a > 35) {
      return "Khaki";
    } else {
      return "GreenYellow";
    }
  }

  function checkbloodgluval() {
    const a = patDetails.bloodglu;
    if (a >= 215) {
      return "IndianRed";
    } else if (a < 215 && a > 150) {
      return "Khaki";
    } else if (a < 150 && a > 80) {
      return "GreenYellow";
    } else {
      return "yellow";
    }
  }

  function checkhbeatval() {
    const a = patDetails.hbeat;
    if (a >= 86) {
      return "IndianRed";
    } else if (a < 86 && a > 74) {
      return "Khaki";
    } else {
      return "GreenYellow";
    }
  }

  function checkoxyval() {
    const a = patDetails.oxy;
    if (a <= 90) {
      return "IndianRed";
    } else if (a < 95 && a > 90) {
      return "Khaki";
    } else {
      return "GreenYellow";
    }
  }

  function checksyspval() {
    const a = patDetails.sysp;
    if (a >= 160) {
      return "IndianRed";
    } else if (a < 160 && a > 89) {
      return "Khaki";
    } else {
      return "GreenYellow";
    }
  }

  function checkdiaspval() {
    const a = patDetails.diasp;
    if (a >= 100) {
      return "IndianRed";
    } else if (a < 100 && a > 89) {
      return "Khaki";
    } else {
      return "GreenYellow";
    }
  }

  function patperonal() {
    let output = [];
    [single].forEach((item) => {
      output.push(
        <div className="grid grid-flow-col grid-cols-5 grid-rows-1 bg-gray-400 gap-10 h-16 w-screen items-center justify-center text-xs sm:text-xs md:text-base md:font-semibold mb-10">
          <div className="text-black-500 ml-2">
            Patient Name : {item.firstname}
          </div>
          <div className="text-black-500 ml-2">Sex : {item.sex}</div>
          <div className="text-black-500 ml-2">
            Conatct No : {item.contactno}
          </div>
          <div className="text-black-500 ml-2">DOB : {gettime(item.dob)}</div>
          <div className="text-black-500 ml-2">Address : {item.address}</div>
        </div>
      );
    });
    return output;
  }
  return (
    <>
      <Header
        firstname={docDetails && docDetails.firstname}
        logout={logout.bind(this)}
      />

      {patperonal()}

      <div className="container mx-auto">
        <div className="flex space-x-20">
          <div className="w-1/2">
            <div className="text-pri-800 font-semibold ml-3">Blood Group</div>
            <div className="bg-gray-200 border-2 border-purple-900 text-opacity-75 p-2 text-pri-800  rounded-lg font-semibold ml-3 mb-2">
              {patDetails.bloodgroup}
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-pri-800 font-semibold ml-3">
              Allergy of Medicines (Y/N)
            </div>
            <div className="bg-gray-200 border-2 border-purple-900 text-opacity-75 p-2 text-pri-800  rounded-lg font-semibold ml-3 mb-2">
              {patDetails.allergy}
            </div>
          </div>
        </div>

        <div className="flex space-x-20 mt-2">
          <div className="w-1/2">
            <div className="text-pri-800 font-semibold ml-3">Weight (kg) </div>
            <div className="bg-gray-200 border-2 border-purple-900 text-opacity-75 p-2 text-pri-800 rounded-lg font-semibold ml-3">
              {patDetails.weight}
            </div>
            <label className="text-blue-700 font-semibold text-xs ml-3">
              Date Updated: {gettime(patDetails.mweight)}
            </label>
          </div>
          <div className="w-1/2">
            <div className="text-pri-800 font-semibold ml-3">Height (cm)</div>
            <div className="bg-gray-200 border-2 border-purple-900 text-opacity-75 p-2 text-pri-800  rounded-lg font-semibold ml-3">
              {patDetails.height}
            </div>
            <label className="text-blue-700 font-semibold text-xs ml-3">
              Date Updated: {gettime(patDetails.mheight)}
            </label>
          </div>
        </div>

        <div className="flex space-x-20 mt-2">
          <div className="w-1/2">
            <div className="text-pri-800 font-semibold ml-3">
              Blood Glucose (mg/dL)
            </div>
            <div
              className="bg-gray-200 border-2 border-purple-900 text-opacity-75 p-2 text-pri-800  rounded-lg font-semibold ml-3"
              style={{ backgroundColor: checkbloodgluval() }}
            >
              {patDetails.bloodglu}
            </div>
            <label className="text-blue-700 font-semibold text-xs ml-3">
              Date Updated: {gettime(patDetails.mglucose)}
            </label>
          </div>
          <div className="w-1/2">
            <div className="text-pri-800 font-semibold ml-3">
              Blood Pressure (mmHg)
            </div>
            <div className="bg-gray-200 border-2 border-purple-900 text-opacity-75 p-2 text-pri-800 text-center  rounded-lg font-semibold ml-3">
              <div style={{ backgroundColor: checksyspval() }}>
                {patDetails.sysp}
              </div>{" "}
              <hr></hr>{" "}
              <div style={{ backgroundColor: checkdiaspval() }}>
                {patDetails.diasp}
              </div>
            </div>
            <label className="text-blue-700 font-semibold text-xs ml-3">
              Date Updated: {gettime(patDetails.mpressure)}
            </label>
          </div>
        </div>

        <div className="flex space-x-20 mt-2">
          <div className="w-1/2">
            <div className="text-pri-800 font-semibold ml-3">
              Oxygen Level (%){" "}
            </div>
            <div
              className="bg-gray-200 border-2 border-purple-900 text-opacity-75 p-2 text-pri-800  rounded-lg font-semibold ml-3"
              style={{ backgroundColor: checkoxyval() }}
            >
              {patDetails.oxy}
            </div>
            <label className="text-blue-700 font-semibold text-xs ml-3">
              Date Updated: {gettime(patDetails.moxy)}
            </label>
          </div>
          <div className="w-1/2">
            <div className="text-pri-800 font-semibold ml-3">
              ECG (Click view)
            </div>
            <div className="bg-gray-200 border-2 border-purple-900 text-opacity-75 p-2 text-pri-800  rounded-lg font-semibold ml-3">
              <Link to={{ pathname: patDetails.ecg }} target="_blank">
                <FeatherIcon className={"text-red-900 ml-2"} icon="file" />
              </Link>
            </div>
            <label className="text-blue-700 font-semibold text-xs ml-3">
              Date Updated: {gettime(patDetails.mecg)}
            </label>
          </div>
        </div>

        <div className="flex space-x-20 mt-2">
          <div className="w-1/2">
            <div className="text-pri-800 font-semibold ml-3">
              Heart Beat (BPM){" "}
            </div>
            <div
              className="bg-gray-200 border-2 border-purple-900 text-opacity-75 p-2 text-pri-800  rounded-lg  font-semibold ml-3"
              style={{ backgroundColor: checkhbeatval() }}
            >
              {patDetails.hbeat}
            </div>
            <div className="text-blue-700 font-semibold text-xs ml-3">
              Date Updated: {gettime(patDetails.mhbeat)}
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-pri-800 font-semibold ml-3">
              Body Temperature (C)
            </div>

            {/* <div style={{backgroundColor:checkval()}}> */}
            <div
              className=" border-2 border-purple-900 text-opacity-75 p-2 text-pri-800  rounded-lg font-semibold ml-3"
              style={{ backgroundColor: checkbtemval() }}
            >
              {patDetails.btemp}
            </div>
            {/* </div> */}
            <label className="text-blue-700 font-semibold text-xs ml-3">
              Date Updated: {gettime(patDetails.mbtemp)}
            </label>
          </div>
        </div>

        <div className="flex space-x-20 mt-2">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Medical History
            </label>
            <textarea
              readOnly
              value={patDetails.medihistory}
              className="resize h-full border bg-gray-200 border-2 border-purple-900 text-opacity-75  appearance-none bg-gray-200 rounded-lg w-full py-4 px-4 text-grey-darker ml-3"
              id="2"
              type="text"
            />
          </div>

          {/* here medical history */}
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3 ">
              Last Doctors Prescriptions
            </label>
            <textarea
              readOnly
              value={patDetails.pres && patDetails.pres}
              className="resize h-full border bg-gray-200 border-2 border-purple-900 text-opacity-75  appearance-none bg-gray-200 rounded-lg w-full py-4 px-4 text-grey-darker ml-3"
              id="2"
              type="text"
            />
            <label className="text-blue-700 font-semibold text-xs ml-3 mb-10">
              Prescribed on: {gettime(patDetails.dat)}
            </label>
          </div>
        </div>

        <div className="flex space-x-20 mt-10 mb-20">
          <div className="w-full">
            <label className="text-pri-800 font-semibold ">Follow Ups</label>
            <div
              readOnly
              className="resize-y h-full border bg-gray-200 border-2 border-purple-900 text-opacity-75  appearance-none bg-gray-200 rounded-lg w-full py-2 px-4 text-grey-darker "
              id="2"
              type="text"
            >
              <div>
                <textarea
                  readOnly
                  value={patDetails.follow && patDetails.follow.message}
                  className=" border-none w-full bg-gray-200"
                  id="3"
                  type="text"
                />
                <img
                  width="300px"
                  height="300px"
                  src={patDetails.follow && patDetails.follow.image}
                  alt="image"
                />
              </div>
            </div>
            <label className="text-blue-700 font-semibold text-xs">
              Patient Reported on: {gettime(patDetails.mfollow)}
            </label>
          </div>
        </div>

        <div className="flex mb-5">
          <div className="w-1/2">
            <button
              className="primary-btn w-24 bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white float-left"
              onClick={() => {
                back();
              }}
            >
              Back
            </button>
          </div>

          <div className="w-1/2">
            <NavLink
              to={{ pathname: "/dashboard/doctorupdate", data: patDetails }}
              className={
                "primary-btn w-36 bg-blue-200 hover:bg-blue-800 border-blue-500  text-center float-right " +
                (submit
                  ? "hover:bg-sec-500 text-black"
                  : "hover:bg-blue-800 hover:text-white  focus:outline-none")
              }
              block
              data={patDetails}
            >
              Update
            </NavLink>
            <NavLink
              to={{ pathname: "/dashboard/graph1", data: patDetails }}
              className={
                "primary-btn w-36 bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white float-right " +
                (submit
                  ? "hover:bg-sec-500 text-black"
                  : "hover:bg-blue-800 hover:text-white  focus:outline-none")
              }
              block
            >
              Dashboard Graph
            </NavLink>
          </div>
        </div>

        {/* <img
          src={patDetails.follow && patDetails.follow.image || "http://via.placeholder.com/300"}
          alt="firebase-image"
        /> */}
      </div>
      <div class="flex items-center justify-center ">
        <div class="flex  justify-self-stretch">
          <img src={logo2} alt={"MIS logo"} className={"h-20 md:h-24"} />
        </div>
      </div>
    </>
  );
};

export default DoctorUpdate1;
