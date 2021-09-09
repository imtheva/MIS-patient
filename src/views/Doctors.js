import React, { useEffect, useState } from "react";
import firebase from "../firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import Header from "./pupdate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo2 from "../assets/images/design2.jpg";

const Doctor = (props) => {
  const [title, setTitle] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [contactno, setContactno] = useState("");
  const [sex, setSex] = useState("");
  const [dob, setDob] = useState("");
  const [nic, setNic] = useState("");
  const [reg, setReg] = useState("");
  const [spl, setSpl] = useState("");
  const [rlocation, setRlocation] = useState("");
  const [address, setAddress] = useState("");
  const [umail, setUmail] = useState("");

  const [error, setError] = useState("");

  // useEffect(() => {
  //   firebase.getCurrentUserEmail().then(setUmail);
  // }, []);
  const isSigned = useSelector((state) => state.authSignIn);
  useEffect(() => {
    setUmail(isSigned.email);
    // setUser(isSigned.user);
  }, []);

  function add() {
    if (
      firstname &&
      lastname &&
      contactno &&
      dob &&
      address &&
      reg &&
      spl &&
      rlocation
    ) {
      firebase.db
        .collection("doctors")
        .doc(umail)
        .set({
          title: title,
          firstname: firstname,
          lastname: lastname,
          contactno: contactno,
          sex: sex,
          address: address,
          dob: dob,
          nic: nic,
          reg: reg,
          spl: spl,
          rlocaion: rlocation,
          doc: umail,
        })
        .then(() => {
          alert("Your details Successfully added");
          props.history.replace("/dashboard/doctordashboard");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      setError(
        "Give First Name, Last Name, Contact No, Address, SLMC Reg No, Specialty and Remote location to proceed "
      );
    }
  }

  function timehere(timestamp) {
    setDob(Date.parse(timestamp));
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
          <div className="w-1/8">
            <label className="text-pri-800 font-semibold ml-3">Title</label>
            <input
              autoComplete="off"
              className="appearance-none bg-green-100 hover:font-bold hover:bg-blue-100 border-2 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3 ml-3"
              id="1"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title"
            />
          </div>
        </div>

        <div className="flex space-x-20">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-green-100 hover:font-bold hover:bg-blue-100 border-red rounded-md w-full py-2 px-3 text-grey-darker ml-3 mb-3"
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
              className="appearance-none border-2 bg-green-100 hover:font-bold hover:bg-blue-100 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-5"
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
              Address<span className="text-red-500">*</span>
            </label>
            <textarea
              autoComplete="off"
              className="resize-y border rounded-md bg-green-100 hover:font-bold hover:bg-blue-100 appearance-none border-2 border-red rounded w-full py-2 px-3 text-grey-darker mb-3 ml-3"
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
              Date Of Birth<span className="text-red-500">*</span>
              <label className="text-xs">(Select your DOB)</label>
            </label>
            <DatePicker
              className="appearance-none border-2 bg-green-100 hover:font-bold hover:bg-blue-100 border-red rounded-md w-full py-2 px-3 text-grey-darker ml-3"
              selected={dob}
              onChange={(date) => timehere(date)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">
              Contact No <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-green-100 hover:font-bold hover:bg-blue-100 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3"
              id="5"
              type="text"
              onChange={(e) => {
                setContactno(e.target.value);
                setError("");
              }}
              placeholder="+94XXXXXXXXX"
            />
          </div>
        </div>

        <div className="flex space-x-20">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Sex <label className="text-xs">(Select a choice)</label>
            </label>
            <select
              autoComplete="on"
              className="appearance-none border-2 border-red bg-green-100 hover:font-bold hover:bg-blue-100 rounded-md w-full py-2 px-3 text-grey-darker ml-3 mb-5"
              onChange={(e) => {
                setSex(e.target.value);
              }}
            >
              <option
                className=" text-xs text-opacity-25"
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

            {/* <select
              name="cars"
              id="cars"
              className="appearance-none border-2 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3"
            >
              <option value="none"> </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select> */}
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">
              NIC/ Passport No
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 border-red bg-green-100 hover:font-bold hover:bg-blue-100 rounded-md w-full py-2 px-3 text-grey-darker mb-5"
              id="5"
              type="text"
              onChange={(e) => {
                setNic(e.target.value);
              }}
              placeholder="Enter a valid number"
            />
          </div>
        </div>

        <div className="flex space-x-20">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              SLMC Registartion No <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 bg-green-100 hover:font-bold hover:bg-blue-100 border-red rounded-md w-full py-2 px-3 text-grey-darker mb-3 ml-3"
              id="1"
              type="text"
              onChange={(e) => {
                setReg(e.target.value);
                setError("");
              }}
              placeholder="eg: 6285"
            />
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">
              Speciality <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 border-red bg-green-100 hover:font-bold hover:bg-blue-100 rounded-md w-full py-2 px-3 text-grey-darker mb-3"
              id="5"
              type="text"
              onChange={(e) => {
                setSpl(e.target.value);
                setError("");
              }}
              placeholder="eg: Surgeon"
            />
          </div>
        </div>

        <div className="flex space-x-20">
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold ml-3">
              Remote Location <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="off"
              className="appearance-none border-2 border-red bg-green-100 hover:font-bold hover:bg-blue-100 rounded-md w-full py-2 px-3 text-grey-darker ml-3 mb-5"
              id="5"
              type="text"
              onChange={(e) => {
                setRlocation(e.target.value);
              }}
              placeholder="eg: Colombo"
            />
          </div>
          <div className="w-1/2">
            <label className="text-pri-800 font-semibold">
              Working Hospital and Address
            </label>
            <textarea
              autoComplete="off"
              className="resize-y border rounded-md appearance-none bg-green-100 hover:font-bold hover:bg-blue-100 border-2 border-red rounded w-full py-2 px-3 text-grey-darker mb-5"
              id="2"
              type="text"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Enter your valid Hospital address"
            />
          </div>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <button
          className="primary-btn w-24  bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white float-right mr-2 mb-12 "
          onClick={() => {
            add();
          }}
        >
          Proceed
        </button>
      </div>

      <div class="flex items-center w-full justify-center mt-10">
        <div class="flex items-center justify-center ">
          <img src={logo2} alt={"MIS logo"} className={"h-20 md:h-24"} />
        </div>
      </div>
    </>
  );
};

export default Doctor;
