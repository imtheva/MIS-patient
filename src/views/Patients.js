import React, { useEffect, useState } from "react";
import firebase from "../firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import Firebase from "firebase/app";
import FeatherIcon from "feather-icons-react";
import Header from "./pupdate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo2 from "../assets/images/design2.jpg";
import { withRouter } from "react-router-dom";

const Patient = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState(" ");
  const [contactno, setContactno] = useState(" ");
  const [sex, setSex] = useState(" ");
  const [address, setAddress] = useState(" ");
  const [dob, setDob] = useState("");
  const [weight, setWeight] = useState(" ");
  const [height, setHeight] = useState(" ");
  const [bloodgroup, setBloodgroup] = useState(null);
  const [bloodglu, setBloodglu] = useState(" ");
  const [sysp, setSysp] = useState(" ");
  const [diasp, setDiasp] = useState("");
  const [oxy, setOxy] = useState(" ");
  const [ecg, setEcg] = useState(" ");
  const [hbeat, setHbeat] = useState(" ");
  const [btemp, setBtemp] = useState("");
  const [medihistory, setMedihistory] = useState("");
  const [allergy, setAllergy] = useState("");
  const [umail, setUmail] = useState("");
  const [user, setUser] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [doccs, setDoccs] = useState("");
  const isSigned = useSelector((state) => state.authSignIn);
  const [value, setValue] = useState(null);
  const [fil, setFil] = useState("");
  const [namef, setNamef] = useState("");
  const [mweight, setMweight] = useState("");
  const [mheight, setMheight] = useState("");
  const [mglucose, setmglucose] = useState("");
  const [mpressure, setmpressure] = useState("");
  const [moxy, setmoxy] = useState("");
  const [mhbeat, setmhbeat] = useState("");
  const [mecg, setmecg] = useState("");
  const [mbtemp, setmbtemp] = useState("");
  const [mfollow, setmfollow] = useState("");
  const [dat, setdat] = useState("");
  const [error, setError] = useState("");

  const [abtem, setAbtem] = useState("");
  const [abloodglu, setAbloodglu] = useState("");
  const [aoxy, setAoxy] = useState("");
  const [ahbeat, setAhbeat] = useState("");
  const [asysp, setAsysp] = useState("");
  const [adiasp, setAdiasp] = useState("");

  const [adbtem, setAdbtem] = useState("");
  const [adbloodglu, setAdbloodglu] = useState("");
  const [adoxy, setAdboxy] = useState("");
  const [adhbeat, setAdhbeat] = useState("");
  const [adsysp, setAdsysp] = useState("");

  const [progress, setProgress] = useState(0);

  const d = new Date();
  // if (!isSigned) {
  //   props.history.replace("/sig
  useEffect(() => {
    setUmail(isSigned.email);
    getDoctors();
    // setUser(isSigned.user);
  }, []);

  useEffect(() => {
    setNamef(fil.name);
  }, [fil]);

  function upload() {
    document.getElementById("selectImage").click();
  }

  const handleChange2 = (e) => {
    if (e.target.files[0]) {
      setFil(e.target.files[0]);
    }
  };

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

  function add() {
    if (
      firstname &&
      lastname &&
      contactno &&
      dob &&
      bloodgroup &&
      value &&
      address
    ) {
      firebase.db
        .collection("patients")
        .doc(umail)
        .set({
          mweight: mweight,
          mheight: mheight,
          mglucose: mglucose,
          mpressure: mpressure,
          sysp: sysp,
          diasp: diasp,
          moxy: moxy,
          mhbeat: mhbeat,
          mecg: mecg,
          mbtemp: mbtemp,
          mfollow: mfollow,
          dat: dat,
          firstname: firstname,
          lastname: lastname,
          contactno: contactno,
          sex: sex,
          address: address,
          dob: dob,
          weight: weight,
          height: height,
          bloodgroup: bloodgroup,
          bloodglu: bloodglu,
          // bloodpress: bloodpress,
          oxy: oxy,
          ecg: ecg,
          hbeat: hbeat,
          btemp: btemp,
          medihistory: medihistory,
          allergy: allergy,
          doc: umail,
          doctor: value,

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
        })
        .then(() => {
          alert("Succesfully added your Details!");
          props.history.replace("/dashboard/patientdashboard");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      setError(
        "Give First Name, Last Name, Contact No, Address, Blood Group and Select your doctor to proceed"
      );
    }
  }

  // function secondadd() {

  //     firebase.db
  //     .collection("graphdata")
  //     .doc(umail)
  //     .set({
  //       abtem:abtem,
  //       abloodglu:abloodglu,
  //       aoxy:aoxy,
  //       ahbeat:ahbeat

  //     })
  //     .then(() => {
  //       alert("Succesfully added your Graph Details!");
  //       props.history.replace("/dashboard/patientdashboard");
  //     })
  //     .catch((error) => {
  //       console.error("Error writing document: ", error);
  //     });

  // }

  function timehere(timestamp) {
    setDob(Date.parse(timestamp));
  }

  function getDoctors() {
    firebase.db
      .collection("doctors")
      .get()
      .then((querySnapshot) => {
        const doct = [];
        querySnapshot.forEach((doc) => {
          doct.push(doc.data());
        });
        setDoctors(doct);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  function handleDoctorSelect(e) {
    const doctsel = e.target.value;
    let arr = doctors;
    let obj = arr.find((o) => o.firstname === doctsel);
    setValue(obj.doc);
    setError("");
  }
  async function logout() {
    await firebase.logout();
    props.history.push("/choice");
  }

  return (
    <>
      <Header logout={logout.bind(this)} />
      <div className="container mx-auto">
        <div className="flex space-x-20">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              className="appearance-none bg-green-100 hover:font-bold hover:bg-blue-100 border-2 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3 ml-3"
              id="1"
              type="text"
              onChange={(e) => {
                setFirstname(e.target.value);
                setError("");
              }}
              placeholder="First Name"
            />
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              className="appearance-none bg-green-100 hover:font-bold hover:bg-blue-100 border-2 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3"
              id="1"
              type="text"
              onChange={(e) => {
                setLastname(e.target.value);
                setError("");
              }}
              placeholder="Last Name"
            />
          </div>
        </div>

        <div className="flex space-x-20">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Contact No<span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-green-100 hover:font-bold hover:bg-blue-100 border-red rounded-md w-full py-2 px-3 text-grey-darker ml-3 mb-3"
              id="1"
              type="text"
              onChange={(e) => {
                setContactno(e.target.value);
                setError("");
              }}
              placeholder="+94XXXXXXXXX"
            />
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">
              Sex <label className="text-xs">(Select a choice)</label>
            </label>
            <select
              className="appearance-none bg-green-100 hover:font-bold hover:bg-blue-100 border-2 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-5"
              onChange={(e) => {
                setSex(e.target.value);
              }}
            >
              <option
                className="text-opacity-25 text-xs"
                value="Select a Choice"
              >
                Select a choice
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Rather Not to mention">
                Rather Not to mention
              </option>
              value={sex}
            </select>
          </div>
        </div>

        <div className="flex space-x-20">
          <div className="w-full">
            <label className="text-pri-800 font-semibold ml-3">
              Address <span className="text-red-500">*</span>
            </label>
            {/* <input
            autoComplete="off"
            className="appearance-none border-2 border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="2"
            type="text"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          /> */}
            <textarea
              autoComplete="off"
              className="resize-y border bg-green-100 hover:font-bold hover:bg-blue-100 rounded-md appearance-none border-2 border-red rounded w-full py-2 px-3 text-grey-darker mb-5 ml-3"
              id="2"
              type="text"
              onChange={(e) => {
                setAddress(e.target.value);
                setError("");
              }}
              placeholder="Enter a Valid Address"
            />
          </div>
          {/* <div className="w-1/2">
          <label className="text-pri-400 font-semibold">Add</label>
          <input
            autoComplete="off"
            className="appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="3"
            type="text"
            placeholder="Maximum Users"
          />
        </div> */}
        </div>
        <div className="flex space-x-20">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Date Of Birth <span className="text-red-500">*</span>
              <label className="text-xs">(Select your DOB)</label>
            </label>

            <DatePicker
              className="appearance-none bg-green-100 hover:font-bold hover:bg-blue-100 border-2 border-red rounded-md w-full py-2 px-3 text-grey-darker ml-3"
              selected={dob}
              onChange={(date) => timehere(date)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />

            {/* <DatePicker selected={dob} 
            className="appearance-none border-2 border-red rounded-md w-full py-2 px-3 text-grey-darker ml-3"
            onChange={(date) => timehere(date)}
            // setMweight(Date.parse(d))
            /> */}
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">Weight (kg)</label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-green-100 hover:font-bold hover:bg-blue-100 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3"
              id="5"
              type="text"
              onChange={(e) => {
                setWeight(e.target.value);
                setMweight(Date.parse(d));
              }}
              placeholder="eg: 60"
            />
          </div>
        </div>

        <div className="flex space-x-20">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Height (Cm)
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-green-100 hover:font-bold hover:bg-blue-100 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3 ml-3"
              id="5"
              type="text"
              onChange={(e) => {
                setHeight(e.target.value);
                setMheight(Date.parse(d));
              }}
              placeholder="eg: 160"
            />
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">
              Blood Group<span className="text-red-500">*</span>
              <label className="text-xs">(Select a choice)</label>
            </label>
            <select
              className="appearance-none border-2 border-red bg-green-100 hover:font-bold hover:bg-blue-100 rounded-md w-full py-2 px-3 text-grey-darker mb-5"
              onChange={(e) => {
                setBloodgroup(e.target.value);
              }}
            >
              <option
                className="text-opacity-25 text-xs"
                value="Select a Choice"
              >
                Select a choice
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              value={bloodgroup}
              setError("")
            </select>
          </div>
        </div>

        <div className="flex space-x-5">
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
            <label className="text-pri-800 font-semibold">
              Systolic Pressure (mmHg)
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-green-100 hover:font-bold hover:bg-blue-100 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3"
              id="1"
              type="text"
              onChange={(e) => {
                setSysp(e.target.value);
                setmpressure(Date.parse(d));

                const lop = parseFloat(e.target.value);
                setAsysp(Firebase.firestore.FieldValue.arrayUnion(lop));

                const arrayval = Date.parse(d);
                setAdsysp(Firebase.firestore.FieldValue.arrayUnion(arrayval));
              }}
              placeholder="Enter Upper Number eg: 100"
            />
          </div>
          <div className="w-1/8">
            <label className="text-pri-800 font-semibold ">
              Diastolic Pressure (mmHg)
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-green-100 hover:font-bold hover:bg-blue-100 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3"
              id="1"
              type="text"
              onChange={(e) => {
                setDiasp(e.target.value);
                const lop = parseFloat(e.target.value);
                setAdiasp(Firebase.firestore.FieldValue.arrayUnion(lop));
              }}
              placeholder="Enter Lower Number eg: 100"
            />
          </div>
        </div>
        <div className="flex space-x-20">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Oxygen Level (%){" "}
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 border-red bg-green-100 hover:font-bold hover:bg-blue-100 rounded-md w-full py-2 px-3 text-grey-darker ml-3 mb-3"
              id="5"
              type="text"
              onChange={(e) => {
                setOxy(e.target.value);
                setmoxy(Date.parse(d));
                const lop = parseFloat(e.target.value);
                setAoxy(Firebase.firestore.FieldValue.arrayUnion(lop));

                const arrayval = Date.parse(d);
                setAdboxy(Firebase.firestore.FieldValue.arrayUnion(arrayval));
              }}
              placeholder="eg: 99"
            />
          </div>

          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Blood Glucose (mg/dL)
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 border-red bg-green-100 hover:font-bold hover:bg-blue-100 rounded-md w-full py-2 px-3 text-grey-darker mb-5"
              id="5"
              type="text"
              onChange={(e) => {
                setBloodglu(e.target.value);
                setmglucose(Date.parse(d));

                const lop = parseFloat(e.target.value);
                setAbloodglu(Firebase.firestore.FieldValue.arrayUnion(lop));

                const arrayval = Date.parse(d);
                setAdbloodglu(
                  Firebase.firestore.FieldValue.arrayUnion(arrayval)
                );
              }}
              placeholder="eg: 110"
            />
          </div>
        </div>

        <div className="flex space-x-20">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Heart Beat (BPM)
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 border-red bg-green-100 hover:font-bold hover:bg-blue-100 rounded-md w-full py-2 px-3 text-grey-darker ml-3 mb-3"
              id="5"
              type="text"
              onChange={(e) => {
                setHbeat(e.target.value);
                setmhbeat(Date.parse(d));

                const lop = parseFloat(e.target.value);
                setAhbeat(Firebase.firestore.FieldValue.arrayUnion(lop));

                const arrayval = Date.parse(d);
                setAdhbeat(Firebase.firestore.FieldValue.arrayUnion(arrayval));
              }}
              placeholder="eg: 80"
            />
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">
              Body Temperature (C)
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 border-red bg-green-100 hover:font-bold hover:bg-blue-100 rounded-md w-full py-2 px-3 text-grey-darker mb-5"
              id="5"
              type="text"
              onChange={(e) => {
                setBtemp(e.target.value);
                setmbtemp(Date.parse(d));

                const lop = parseFloat(e.target.value);
                setAbtem(Firebase.firestore.FieldValue.arrayUnion(lop));

                const arrayval = Date.parse(d);
                setAdbtem(Firebase.firestore.FieldValue.arrayUnion(arrayval));
              }}
              placeholder="eg: 30"
            />
          </div>
        </div>
        <div className="flex space-x-20">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Medical History
            </label>
            <textarea
              autoComplete="off"
              className="resize-y border rounded-md appearance-none bg-green-100 hover:font-bold hover:bg-blue-100 border-2 border-red rounded w-full py-5 px-4 text-grey-darker mb-5 ml-3"
              id="2"
              type="text"
              onChange={(e) => {
                setMedihistory(e.target.value);
              }}
              placeholder="eg: Diabetic Patient, Met an accident, Heart patient"
            />
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">
              Allergy to Medicines
              <label className="text-xs"> (Select a choice)</label>
            </label>
            <select
              className="appearance-none border-2 bg-green-100 hover:font-bold hover:bg-blue-100 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-5"
              onChange={(e) => {
                setAllergy(e.target.value);
              }}
            >
              <option
                className="text-opacity-25 text-xs"
                value="Select a Choice"
              >
                Select a choice
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No">Not too sure about that</option>
              value={allergy}
            </select>
          </div>
        </div>
        <div className="flex space-x-20">
          <div className="w-1/8">
            <label className="text-pri-800  font-semibold ml-3">
              Select Your Doctor <span className="text-red-500">*</span>
              <label className="text-xs"> (Select a choice)</label>
            </label>
            {/* <DropdownSelect
                  options={getSubscriptionOption()}
                  type="Branding"
                  value={""}
                  handleSelect={(option) => setSubscriptionDetails(option)}
                /> */}
            <select
              className="appearance-none border-2 bg-green-100 hover:font-bold hover:bg-blue-100 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3 ml-3"
              onChange={(e) => handleDoctorSelect(e)}
            >
              <option
                className="text-opacity-25 text-xs"
                value="Select a Doctor"
              >
                Select a Doctor
              </option>
              {value}
              {doctors.map((eachDoctor, index) => (
                <option key={index}>{eachDoctor.firstname}</option>
              ))}
            </select>
          </div>
        </div>
        {/* <button
          className="primary-btn w-24 ml-24 mb-12 "
          onClick={() => {
            add();
          }}
        >
          Back
        </button> */}
        {error && <div className="text-red-500">{error}</div>}
        <button
          className="primary-btn bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white w-24 float-right mr-2 mb-12 "
          onClick={() => {
            add();
            // secondadd();
          }}
        >
          Proceed
        </button>
        <br></br>
      </div>
      <div class="flex items-center w-full justify-center mt-10">
        <div class="flex items-center justify-center ">
          <img src={logo2} alt={"MIS logo"} className={"h-20 md:h-24"} />
        </div>
      </div>
    </>
  );
};

export default Patient;
