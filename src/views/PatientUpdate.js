import React, { useEffect, useState } from "react";
import firebase from "../firebase/Firebase";
import Firebase from "../firebase/Firebase";
import Header from "./updateheader";
import FeatherIcon from "feather-icons-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo2 from "../assets/images/design2.jpg";
import moment from "moment";

const PatientUpdate = (props) => {
  const [dataa, setDataa] = useState(props.location.data);
  // const [docHere,setDochere]=useState(props.location.doci);
  // useEffect(() => {
  //   // fetchPatient();
  //   // fetchone();
  //   setDataa(props.location.data);
  // }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("updatep")) {
  //     setDataa(JSON.parse(localStorage.getItem("updatep")));
  //   }
  // }, [dataa]);

  // useEffect(() => {
  //   localStorage.setItem("updatep", JSON.stringify(dataa));
  // }, [dataa]);

  async function logout() {
    await firebase.logout();
    props.history.replace("/choice");
  }

  const [weight, setWeight] = useState(dataa && dataa.weight);
  const [mweight, setMweight] = useState(dataa && dataa.mweight);
  const [height, setHeight] = useState(dataa && dataa.height);
  const [mheight, setMheight] = useState(dataa && dataa.mweight);
  const [bloodglu, setBloodglu] = useState(dataa && dataa.bloodglu);
  const [mglucose, setmglucose] = useState(dataa && dataa.mglucose);
  // const [bloodpress, setBloodpress] = useState(dataa && dataa.bloodpress);
  const [sysp, setSysp] = useState(dataa && dataa.sysp);
  const [diasp, setDiasp] = useState(dataa && dataa.sysp);
  const [mpressure, setmpressure] = useState(dataa && dataa.mpressure);
  const [oxy, setOxy] = useState(dataa && dataa.oxy);
  const [moxy, setmoxy] = useState(dataa && dataa.moxy);
  const [ecg, setEcg] = useState(dataa && dataa.ecg);
  const [mecg, setmecg] = useState(dataa && dataa.mecg);
  const [hbeat, setHbeat] = useState(dataa && dataa.hbeat);
  const [mhbeat, setmhbeat] = useState(dataa && dataa.mhbeat);
  const [btemp, setBtemp] = useState(dataa && dataa.btemp);
  const [mbtemp, setmbtemp] = useState(dataa && dataa.mbtemp);
  const [message, setMessage] = useState(dataa.follow && dataa.follow.message);
  const [mfollow, setmfollow] = useState(dataa && dataa.mfollow);
  const [doc, setDoc] = useState(dataa && dataa.doc);
  const [image, setImage] = useState("");
  const [fil, setFil] = useState("");
  const [url1, setUrl1] = useState(dataa.follow && dataa.follow.image);
  const [progress, setProgress] = useState(0);
  const [namei, setNamei] = useState("");
  const [namef, setNamef] = useState("");

  const [abtem, setAbtem] = useState(dataa && dataa.abtem);
  const [abloodglu, setAbloodglu] = useState(dataa && dataa.abloodglu);
  const [aoxy, setAoxy] = useState(dataa && dataa.aoxy);
  const [ahbeat, setAhbeat] = useState(dataa && dataa.ahbeat);
  const [asysp, setAsysp] = useState(dataa && dataa.asysp);
  const [adiasp, setAdiasp] = useState(dataa && dataa.adiasp);

  const [adbtem, setAdbtem] = useState(dataa && dataa.adbtem);
  const [adbloodglu, setAdbloodglu] = useState(dataa && dataa.adbloodglu);
  const [adoxy, setAdboxy] = useState(dataa && dataa.adoxy);
  const [adhbeat, setAdhbeat] = useState(dataa && dataa.adhbeat);
  const [adsysp, setAdsysp] = useState(dataa && dataa.adsysp);

  const [docCollect, setDocCollect] = useState([]);
  const [docmail, setDocmail] = useState("");

  const d = new Date();

  const handleChange1 = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload1 = () => {
    const uploadTask = Firebase.storage.ref(`images/${image.name}`).put(image);
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
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url1) => {
            setUrl1(url1);
          });
      }
    );
  };

  const handleChange2 = (e) => {
    if (e.target.files[0]) {
      setFil(e.target.files[0]);
    }
  };

  useEffect(() => {
    setNamei(image.name);
    setNamef(fil.name);
  }, [fil, image]);

  function upload() {
    document.getElementById("selectImage").click();
  }

  function upload1() {
    document.getElementById("Image").click();
  }

  const handleUpload2 = () => {
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
          .then((url2) => {
            setEcg(url2);
            alert("Success fullly Uploaded");
          });
      }
    );
    setmecg(Date.parse(d));
  };

  function update() {
    firebase.db
      .collection("patients")
      .doc(doc)
      .update({
        weight: weight,
        mweight: mweight,
        mheight: mheight,
        height: height,
        bloodglu: bloodglu,
        mglucose: mglucose,
        // bloodpress: bloodpress,
        sysp: sysp,
        diasp: diasp,
        mpressure: mpressure,
        oxy: oxy,
        moxy: moxy,
        hbeat: hbeat,
        mhbeat: mhbeat,
        ecg: ecg,
        mecg: mecg,
        btemp: btemp,
        mbtemp: mbtemp,
        "follow.message": message ? message : "",
        mfollow: mfollow,
        "follow.image": url1 ? url1 : "",
        abtem: abtem,
        abloodglu: abloodglu,
        aoxy: aoxy,
        ahbeat: ahbeat,
        asysp: asysp,
        adiasp: adiasp,
        adbtem: adbtem,
        adbloodglu: adbloodglu,
        adoxy: adoxy,
        adhbeat: adhbeat,
        adsysp: adsysp,
        // "follow.image":
      })
      .then(() => {
        alert("Data synchronized Successfully!!");
        props.history.replace("/dashboard/patientdashboard");
      });
  }

  // function updatesecond() {
  //   firebase.db
  //     .collection("graphdata")
  //     .doc(doc)
  //     .update({

  //     })
  //     .then(() => {
  //       alert("Data synchronized Successfully!!");
  //       props.history.replace("/dashboard/patientdashboard");
  //     });
  // }

  return (
    <>
      <Header firstname={dataa && dataa.firstname} logout={logout.bind(this)} />

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
              value={weight}
              type="text"
              onChange={(e) => {
                setWeight(e.target.value);
                setMweight(Date.parse(d));
              }}
            />
            <div>
              {/* <DatePicker selected={(mweight)} 
              className="appearance-none text-xs border-2 bg-yellow-200 border-red rounded-md w-24 py-0.1 px-3 text-grey-darker mb-3 ml-3"
                       
            
                onChange={(date) => {setMweight(date)}}
            /> */}
            </div>
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">Height (cm)</label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3"
              id="5"
              value={height}
              type="text"
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

              <label className="text-pri-800"> {namef}</label>

              <input
                type="file"
                hidden
                onChange={handleChange2}
                id="selectImage"
              />
              <button
                className=" my-btn w-20 ml-8 text-center mr-3 border-2 rounded-md"
                onClick={handleUpload2}
              >
                Upload
              </button>
            </div>
          </div>

          <div className="w-1/8">
            <label className="text-pri-800 font-semibold ">
              Systolic Pressure (mm/Hg)
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white  rounded-md w-full py-2 px-3 text-grey-darker mb-5"
              id="1"
              type="text"
              value={sysp}
              onChange={(e) => {
                setSysp(e.target.value);
                setmpressure(Date.parse(d));

                const lop = [parseFloat(e.target.value)];
                const derrived = dataa && dataa.asysp;
                const addarray = derrived.concat(lop);
                setAsysp(addarray);

                const arrayval = [Date.parse(d)];
                const derrived2 = dataa && dataa.adsysp;
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
                const derrived = dataa && dataa.adiasp;
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
              className="appearance-none border-2 bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3 ml-3"
              id="5"
              type="text"
              value={oxy}
              onChange={(e) => {
                setOxy(e.target.value);
                setmoxy(Date.parse(d));
                // const lop = parseFloat(e.target.value);
                // setAoxy(Firebase.firestore.FieldValue.arrayUnion(lop))

                const lop = [parseFloat(e.target.value)];
                const derrived = dataa && dataa.aoxy;
                const addarray = derrived.concat(lop);
                setAoxy(addarray);

                const arrayval = [Date.parse(d)];
                const derrived2 = dataa && dataa.adoxy;
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
              className="appearance-none border-2 bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3"
              id="5"
              type="text"
              value={hbeat}
              onChange={(e) => {
                setHbeat(e.target.value);
                setmhbeat(Date.parse(d));
                // const lop = parseFloat(e.target.value);
                // setAhbeat(Firebase.firestore.FieldValue.arrayUnion(lop))

                const lop = [parseFloat(e.target.value)];
                const derrived = dataa && dataa.ahbeat;
                const addarray = derrived.concat(lop);
                setAhbeat(addarray);

                const arrayval = [Date.parse(d)];
                const derrived2 = dataa && dataa.adhbeat;
                const addarray2 = derrived2.concat(arrayval);

                setAdhbeat(addarray2);
              }}
            />
          </div>
        </div>

        <div className="flex space-x-20 mt-5">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Blood Glucose (mg/dL)
            </label>
            <input
              className="appearance-none border-2  bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white border-red rounded-md w-full py-2 px-3 text-grey-darker ml-3 mb-3"
              id="5"
              type="text"
              onChange={(e) => {
                setBloodglu(e.target.value);
                setmglucose(Date.parse(d));
                // const lop = parseFloat(e.target.value);
                // setAbloodglu(Firebase.firestore.FieldValue.arrayUnion(lop))

                const lop = [parseFloat(e.target.value)];
                const derrived = dataa && dataa.abloodglu;
                const addarray = derrived.concat(lop);
                setAbloodglu(addarray);

                const arrayval = [Date.parse(d)];
                const derrived2 = dataa && dataa.adbloodglu;
                const addarray2 = derrived2.concat(arrayval);

                setAdbloodglu(addarray2);
              }}
              value={bloodglu}
            />
          </div>

          {/* <button onClick={upload} className="appearance-none  border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3">
              <input type="file" hidden onChange={handleChange2} id="selectImage" />
            </button> */}

          {/* <button onClick={handleUpload2}>Upload</button> */}

          {/* <label for="myInputFile">
            <img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/699329-icon-57-document-download-128.png" />
            <input
              type="file"
              id="myInputFile"
              style={"display:none"}
            />
          </label> */}
          {/* <button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
  />
</button> */}

          {/* <div style={{display: 'grid'}}>
  <button id='plus' onClick={this.upload}>+</button>
  <input id='selectImage' hidden type="file" onChange={fileSelectHandler} />
</div> */}
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">
              Body Temperature (C)
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-blue-100 hover:bg-blue-400 hover:font-semibold hover:text-white border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3"
              id="5"
              type="text"
              value={btemp}
              onChange={(e) => {
                setBtemp(e.target.value);
                setmbtemp(Date.parse(d));
                // const lop = parseFloat(e.target.value);
                // setAbtem(Firebase.firestore.FieldValue.arrayUnion(lop))

                const lop = [parseFloat(e.target.value)];
                const derrived = dataa && dataa.abtem;
                const addarray = derrived.concat(lop);
                setAbtem(addarray);

                const arrayval = [Date.parse(d)];
                const derrived2 = dataa && dataa.adbtem;
                const addarray2 = derrived2.concat(arrayval);

                setAdbtem(addarray2);
              }}
            />
          </div>
        </div>

        <div className="flex space-x-20 mt-5">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Follow Ups
            </label>
            <textarea
              autoComplete="off"
              className="placeholder-black hover:placeholder-blue-100 placeholder-opacity-50 resize-y border rounded-md appearance-none border-2 bg-blue-100 hover:bg-green-100 hover:font-semibold hover:text-black  border-red rounded w-full py-2 px-2 text-grey-darker mb-3 ml-3"
              placeholder="Please enter health habits and follow ups here"
              id="2"
              type="text"
              multiline={true}
              style={{ whiteSpace: "break-spaces" }}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setmfollow(Date.parse(d));
              }}
            />
          </div>
          <div className="w-1/2">
            {/* <progress value={progress} max="100" /> */}
            <input type="file" hidden onChange={handleChange1} id="Image" />

            <img
              onClick={upload1}
              width="300"
              height="300"
              src={url1 || "http://via.placeholder.com/300"}
              alt="firebase-image"
            />
            <label className="text-pri-800"> {namei}</label>

            <button
              className="upload-btn w-20 text-center mr-3 border-2 rounded-md gray"
              onClick={handleUpload1}
            >
              Upload
            </button>
          </div>
        </div>

        <button
          className="primary-btn bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white w-24 float-right mr-2 mt-5  "
          onClick={() => {
            update();

            // updatesecond();
          }}
        >
          Sync
        </button>

        {/* <input type="file" onChange={fun}/> */}
      </div>
      <div class="flex items-center w-full justify-center mt-10">
        <div class="flex items-center justify-center ">
          <img src={logo2} alt={"MIS logo"} className={"h-20 md:h-24"} />
        </div>
      </div>
    </>
  );
};

export default PatientUpdate;
