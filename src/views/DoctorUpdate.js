import React, { useEffect, useState } from "react";
import firebase from "../firebase/Firebase";
// import Firebase from "../firebase/Firebase";
import Firebase from "firebase/app";
import FeatherIcon from "feather-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useHistory } from "react-router-dom";
import Datetime from "./Datetime";
import Header from "./presheader";
import { withRouter } from "react-router-dom";
import logo2 from "../assets/images/design2.jpg";
import { parse } from "postcss";

var showdate = new Date();
var displaytodaysdate =
  showdate.getHours() +
  ":" +
  showdate.getMinutes() +
  " - " +
  showdate.getDate() +
  "/" +
  showdate.getMonth() +
  "/" +
  showdate.getFullYear();
var dt = showdate.toDateString();
var displaytime = showdate.getHours() + ":" + showdate.getMinutes();

const DoctorUpdate = (props) => {
  const isSigned = useSelector((state) => state.authSignIn);
  const [patientDet, setPatientDet] = useState(props.location.data);
  const [single, setSingle] = useState(props.location.data);
  const [umail, setUmail] = useState("");
  const [weight, setWeight] = useState(single.weight);
  const [height, setHeight] = useState(single.height);
  const [bloodglu, setBloodglu] = useState(single.bloodglu);
  const [sysp, setSysp] = useState(single.sysp);
  const [diasp, setDiasp] = useState(single.diasp);
  const [oxy, setOxy] = useState(single.oxy);
  const [ecg, setEcg] = useState(single.ecg);
  const [hbeat, setHbeat] = useState(single.hbeat);
  const [btemp, setBtemp] = useState(single.btemp);
  const [follow, setFollow] = useState(single.follow);
  const [doc, setDoc] = useState(single.doc);
  const [pres, setPres] = useState(single.pres);
  const [dat, setdat] = useState(single.dat);
  const [lap, setLap] = useState(single.lap);

  const [submit, setSubmit] = useState("");
  const [abtem, setAbtem] = useState(single.abtem);
  const [abloodglu, setAbloodglu] = useState(single.abloodglu);
  const [aoxy, setAoxy] = useState(single.aoxy);
  const [ahbeat, setAhbeat] = useState(single.ahbeat);
  const [asysp, setAsysp] = useState(single.asysp);
  const [adiasp, setAdiasp] = useState(single.adiasp);

  const [adbtem, setAdbtem] = useState(single.adbtem);
  const [adbloodglu, setAdbloodglu] = useState(single.adbloodglu);
  const [adoxy, setAdboxy] = useState(single.adoxy);
  const [adhbeat, setAdhbeat] = useState(single.adhbeat);
  const [adsysp, setAdsysp] = useState(single.adsysp);

  const [mweight, setMweight] = useState(single.mweight);
  const [mheight, setMheight] = useState(single.mweight);
  const [mglucose, setmglucose] = useState(single.mglucose);
  const [mpressure, setmpressure] = useState(single.mpressure);
  const [moxy, setmoxy] = useState(single.moxy);
  const [mecg, setmecg] = useState(single.mecg);
  const [mhbeat, setmhbeat] = useState(single.mhbeat);
  const [mbtemp, setmbtemp] = useState(single.mbtemp);

  const [fil, setFil] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");

  const [docDetails, setDocDetails] = useState("");

  function back() {
    props.history.replace("/dashboard/graph1");
  }

  function gettime(timestamp) {
    const date = new Date(timestamp).toDateString().slice(4);
    const time = new Date(timestamp).toLocaleTimeString("en-US");
    const time2 = time.split(":");
    const time3 = time.split(" ");

    let finalDate = date;
    return finalDate;
  }

  // useEffect(() => {
  //   setUmail(isSigned.email);
  //   setSingle(props.location.state);
  // }, [umail,single]);
  const d = new Date();

  // function update() {
  //   firebase.db
  //     .collection("patients")
  //     .doc(doc)
  //     .update({
  //       weight: weight,
  //       height: height,
  //       bloodglu: bloodglu,
  //       bloodpress: bloodpress,
  //       oxy: oxy,
  //       hbeat: hbeat,
  //       ecg: ecg,
  //       btemp: btemp,
  //        mweight: mweight,
  //       mheight: mheight,
  //       mglucose: mglucose,
  //       mpressure: mpressure,
  //       moxy: moxy,
  //       mhbeat: mhbeat,
  //       mecg: mecg,
  //       mbtemp: mbtemp,
  //       dat: dat ?dat: "",
  //       pres: pres ?pres: "",
  //       lap:lap?lap: "",

  //       abtem:abtem,
  //       abloodglu:abloodglu,
  //       aoxy:aoxy,
  //       ahbeat:ahbeat,
  //       adbloodglu:adbloodglu,

  //     })
  //     .then(() => {
  //       alert("Data synchronized Successfully!!");
  //       props.history.replace("/dashboard/doctordashboard");
  //     });
  // }

  function update() {
    firebase.db
      .collection("patients")
      .doc(doc)
      .update({
        weight: weight,
        height: height,
        bloodglu: bloodglu,
        // bloodpress: bloodpress,
        oxy: oxy,
        hbeat: hbeat,
        ecg: ecg,
        btemp: btemp,
        mweight: mweight,
        mheight: mheight,
        mglucose: mglucose,
        mpressure: mpressure,
        moxy: moxy,
        mhbeat: mhbeat,
        mecg: mecg,
        mbtemp: mbtemp,
        dat: dat ? dat : "",
        pres: pres ? pres : "",
        lap: lap ? lap : "",
        sysp: sysp,
        diasp: diasp,

        abtem: abtem,
        abloodglu: abloodglu,
        aoxy: aoxy,
        ahbeat: ahbeat,
        adbloodglu: adbloodglu,
        asysp: asysp,
        adiasp: adiasp,

        adbtem: adbtem,
        adbloodglu: adbloodglu,
        adoxy: adoxy,
        adhbeat: adhbeat,
        adsysp: adsysp,
      })
      .then(() => {
        alert("Data synchronized Successfully!!");
        props.history.replace("/dashboard/doctordashboard");
      });
  }

  // function updatethird() {
  //   firebase.db
  //     .collection("graphdata")
  //     .doc(doc)
  //     .update({

  //     })
  //     .then(() => {
  //       alert("Data synchronized Successfully!!");
  //       props.history.replace("/dashboard/doctordashboard");
  //     });
  // }

  // function update2() {
  //   firebase.db
  //     .collection("patients")
  //     .doc(doc)
  //     .update({
  //       abtem:abtem,
  //       abloodglu:abloodglu,
  //       aoxy:aoxy,
  //       ahbeat:ahbeat

  //     },
  //     {merge: true})
  //     .then(() => {
  //       alert("Data synchronized Successfully!!");
  //       props.history.replace("/dashboard/doctordashboard");
  //     });
  // }

  function patperonal() {
    let output = [];
    [single].forEach((item) => {
      output.push(
        <div className="grid grid-flow-col grid-cols-5 grid-rows-1 bg-gray-400 gap-10 h-16 w-screen items-center justify-center text-xs sm:text-xs md:text-base md:font-semibold mb-10">
          <div className="text-black-500 ml-2">
            Patient Name : {item.firstname} {item.lastname}
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

  async function logout() {
    await firebase.logout();
    props.history.push("/choice");
  }

  function upload() {
    document.getElementById("selectImage").click();
  }
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFil(e.target.files[0]);
    }
  };

  // function here(value) {
  //   const lop = parseFloat(value);
  //   setAbtem(Firebase.firestore.FieldValue.arrayUnion(lop));
  // }

  function gotograph() {}

  useEffect(() => {
    setName(fil.name);
  }, [fil]);

  useEffect(() => {
    setUmail(isSigned.email);
    umail && doctor();
  }, [umail]);

  const handleUpload = () => {
    const uploadTask = Firebase.storage.ref(`files/${fil.name}`).put(fil);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        Firebase.storage
          .ref("files")
          .child(fil.name)
          .getDownloadURL()
          .then((url) => {
            setEcg(url);
            alert("Success fully updated");
          });
      }
    );
    setmecg(Date.parse(d));
  };

  // function updateabtem(arrays){

  //   setAbtem(Firebase.firestore.FieldValue.arrayUnion(arrays))

  // }

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

  return (
    <>
      <Header
        firstname={docDetails && docDetails.firstname}
        logout={logout.bind(this)}
      />

      {patperonal()}

      <div className="container bg-blue-50 mx-auto">
        <div className="flex space-x-20 mt-20">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Weight (kg)
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white  rounded-md w-full py-2 px-3 text-grey-darker mb-3 ml-3"
              id="5"
              type="text"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                setMweight(Date.parse(d));
              }}
            />
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">Height (cm)</label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white  rounded-md w-full py-2 px-3 text-grey-darker mb-3"
              id="5"
              type="text"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                setMheight(Date.parse(d));
              }}
            />
          </div>
        </div>
        <div className="flex space-x-5 mt-5">
          <div className="w-1/4">
            <label className="text-pri-800 font-semibold ml-3">ECG</label>

            <div className=" flex appearance-none  border-red rounded-md w-full py-2 px-3 text-grey-darker ml-3 mb-3 onClick={upload}">
              <FeatherIcon
                onClick={upload}
                className={"text-red-900 ml-2"}
                icon="file"
              />
              <label className="text-pri-800"> {name}</label>

              <input
                type="file"
                hidden
                onChange={handleChange}
                id="selectImage"
              />
              <button
                className=" my-btn w-20 ml-2 text-center mr-3 border-2 hover:bg-blue-100 hover:border-transparent rounded-md"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>

          <div className="w-1/8">
            <label className="text-pri-800 font-semibold ml-2 ">
              Systolic Pressure (mm/Hg)
            </label>
            <input
              autoComplete="off"
              className="appearance-none ml-2 border-2 bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white  rounded-md w-full py-2 px-3 text-grey-darker mb-5"
              id="1"
              type="text"
              value={sysp}
              onChange={(e) => {
                setSysp(e.target.value);
                setmpressure(Date.parse(d));

                const lop = [parseFloat(e.target.value)];
                const derrived = single && single.asysp;
                const addarray = derrived.concat(lop);
                setAsysp(addarray);

                const arrayval = [Date.parse(d)];
                const derrived2 = single && single.adsysp;
                const addarray2 = derrived2.concat(arrayval);
                setAdsysp(addarray2);
              }}
            />
          </div>
          <div className="w-1/8">
            <label className="text-pri-800 font-semibold ">
              Diastolic Pressure (mm/Hg)
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white  rounded-md w-full py-2 px-3 text-grey-darker mb-5"
              id="1"
              type="text"
              value={diasp}
              onChange={(e) => {
                setDiasp(e.target.value);

                const lop = [parseFloat(e.target.value)];
                const derrived = single && single.adiasp;
                const addarray = derrived.concat(lop);
                setAdiasp(addarray);
              }}
            />
          </div>
        </div>

        <div className="flex space-x-20 mt-5">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Oxygen Level (%)
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white  rounded-md w-full py-2 px-3 text-grey-darker mb-3 ml-3"
              id="5"
              type="text"
              value={oxy}
              onChange={(e) => {
                setOxy(e.target.value);
                setmoxy(Date.parse(d));
                // const lop = parseFloat(e.target.value);
                // setAoxy(Firebase.firestore.FieldValue.arrayUnion(lop))

                const lop = [parseFloat(e.target.value)];
                const derrived = single && single.aoxy;
                const addarray = derrived.concat(lop);
                setAoxy(addarray);

                const arrayval = [Date.parse(d)];
                const derrived2 = single && single.adoxy;
                const addarray2 = derrived2.concat(arrayval);

                setAdboxy(addarray2);
              }}
            />
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">
              Heart Beat (BPM)
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white  rounded-md w-full py-2 px-3 text-grey-darker mb-3"
              id="5"
              type="text"
              value={hbeat}
              onChange={(e) => {
                setHbeat(e.target.value);
                setmhbeat(Date.parse(d));
                // const lop = [parseFloat(e.target.value)];
                // const derrived =[single && single.ahbeat];
                // const addarray = derrived.concat(lop);
                const lop = [parseFloat(e.target.value)];
                const derrived = single && single.ahbeat;
                const addarray = derrived.concat(lop);
                setAhbeat(addarray);

                const arrayval = [Date.parse(d)];
                const derrived2 = single && single.adhbeat;
                const addarray2 = derrived2.concat(arrayval);

                setAdhbeat(addarray2);
              }}
            />
          </div>
        </div>
        <div className="flex space-x-20 mt-5">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Blood Glucose (mg/dL){" "}
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white  rounded-md w-full py-2 px-3 text-grey-darker mb-3 ml-3"
              id="5"
              type="text"
              value={bloodglu}
              onChange={(e) => {
                setBloodglu(e.target.value);
                setmglucose(Date.parse(d));
                // const lop = parseFloat(e.target.value);
                // setAbloodglu(Firebase.firestore.FieldValue.arrayUnion(lop))

                const lop = [parseFloat(e.target.value)];
                const derrived = single && single.abloodglu;
                const addarray = derrived.concat(lop);
                setAbloodglu(addarray);

                const arrayval = [Date.parse(d)];
                const derrived2 = single && single.adbloodglu;
                const addarray2 = derrived2.concat(arrayval);

                setAdbloodglu(addarray2);
              }}
            />
          </div>

          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">
              Body Temperature (C)
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white  rounded-md w-full py-2 px-3 text-grey-darker mb-5"
              id="5"
              type="text"
              value={btemp}
              onChange={(e) => {
                setBtemp(e.target.value);

                // const lop = parseFloat(e.target.value);
                // setAbtem(Firebase.firestore.FieldValue.arrayUnion(lop));

                const lop = [parseFloat(e.target.value)];
                const derrived = single && single.abtem;
                const addarray = derrived.concat(lop);
                setAbtem(addarray);

                // here(e.target.value);
                setmbtemp(Date.parse(d));

                const arrayval = [Date.parse(d)];
                const derrived2 = single && single.adbtem;
                const addarray2 = derrived2.concat(arrayval);

                setAdbtem(addarray2);
              }}
            />
          </div>
        </div>
        <div className="flex space-x-20 mt-5">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Other Lap Reports
            </label>
            <textarea
              autoComplete="off"
              className="resize-y h-64 appearance-none border-2 bg-blue-100 hover:bg-green-100 hover:font-semibold hover:text-black  rounded-md w-full py-2 px-3 text-grey-darker mb-5 ml-3"
              id="2"
              type="text"
              value={lap}
              onChange={(e) => {
                setLap(e.target.value);
              }}
            />
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ">Prescriptions</label>
            <textarea
              autoComplete="off"
              className="resize-y appearance-none border-2 bg-blue-100 hover:bg-green-100 h-64 hover:font-semibold hover:text-black  rounded-md w-full py-2 px-3 text-grey-darker mb-10  "
              id="2"
              type="text"
              value={pres}
              onChange={(e) => {
                setPres(e.target.value);
                setdat(Date.parse(d));
              }}
            />
          </div>
        </div>
        <div className="flex mb-5">
          <div className="w-1/2 mt-2">
            <NavLink
              to={{ pathname: "/dashboard/doctorupdate1", state: patientDet }}
              className={
                "primary-btn w-40 text-center bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white" +
                (submit
                  ? "hover:bg-sec-500 text-black"
                  : "hover:bg-blue-800 hover:text-white  focus:outline-none")
              }
              block
              state={patientDet}
            >
              Back to Dashboard
            </NavLink>
          </div>
          <div className="w-1/2">
            <button
              className="primary-btn bg-blue-200 border-blue-500 float-right hover:bg-blue-800 hover:text-white hover:border-transparent w-24 "
              onClick={() => {
                update();
                // update2();
                // updatethird();
              }}
            >
              Sync
            </button>

            <NavLink
              to={{ pathname: "/dashboard/graph1", data: patientDet }}
              // data= {}
              className={
                "primary-btn w-36 bg-blue-200 float-right hover:bg-blue-800 border-blue-500 hover:text-white " +
                (submit
                  ? "hover:bg-sec-500 text-black"
                  : "hover:bg-blue-800 hover:text-white  focus:outline-none")
              }
              block
            >
              View Graph
            </NavLink>
          </div>
        </div>
      </div>
      <div class="flex items-center w-full justify-center">
        <div class="flex items-center justify-center ">
          <img src={logo2} alt={"MIS logo"} className={"h-20 md:h-24"} />
        </div>
      </div>
    </>
  );
};

export default DoctorUpdate;
