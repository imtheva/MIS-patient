import React, { useEffect, useState } from "react";
import firebase from "../firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import Header from "./patheader";
import { authSignIn } from "../actions";
import logo from "../assets/images/design2.jpg";
import logo2 from "../assets/images/design2.jpg";
const DoctorDashboard = (props) => {
  const isSigned = useSelector((state) => state.authSignIn);
  const [docDetails, setDocDetails] = useState("");
  const [patientDet, setPatientDet] = useState([]);
  const [umail, setUmail] = useState("");
  const [updatee, setUpdatee] = useState(false);
  const [single, setSingle] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    !isSigned && props.history.replace("/choice");
  }, []);

  useEffect(() => {
    setUmail(isSigned.email);
    umail && patient();
    umail && doctor();
  }, [umail]);

  // useEffect(() => {
  //   if (localStorage.getItem("patientss")) {
  //     setPatientDet(JSON.parse(localStorage.getItem("patientss")));
  //     setDocDetails(JSON.parse(localStorage.getItem("doctors")));

  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("patientss", JSON.stringify(patientDet));
  //   localStorage.setItem("doctors", JSON.stringify(docDetails));

  // }, [patientDet,docDetails]);

  function gettime(timestamp) {
    const date = new Date(timestamp).toDateString().slice(4);
    const time = new Date(timestamp).toLocaleTimeString("en-US");
    const time2 = time.split(":");
    const time3 = time.split(" ");

    let finalDate = date;
    return finalDate;
  }

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

  function patient() {
    firebase.db
      .collection("patients")
      .where("doctor", "==", umail)
      .get()
      .then((querySnapshot) => {
        const pat = [];
        querySnapshot.forEach((doc) => {
          pat.push(doc.data());
        });
        setPatientDet(pat);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  function logout() {
    dispatch(authSignIn(""));
    firebase.logout();
    props.history.push("/");
  }

  function newPage() {
    props.history.push({
      pathname: "/dashboard/doctorupdate1",
      state: single,
      data: docDetails,
    });
  }

  function output() {
    for (const i = 0; i < patientDet.length; i++) {
      return (
        <di>
          <h1>{patientDet[i].firstname}</h1>;
        </di>
      );
    }
  }

  function pat() {
    let output = [];
    patientDet.forEach((item) => {
      output.push(
        <div className="flex justify-between mb-2">
          <div className="">
            <div className="text-sm text-pri-500">{item.firstname}</div>
            <div className="text-xs text-gray-500 -mt-1">{item.lastname}</div>
          </div>
        </div>
      );
    });
    return output;
  }

  function docperonal() {
    let output = [];
    [docDetails].forEach((item) => {
      output.push(
        <div className="grid grid-flow-col grid-cols-5 grid-rows-1 bg-gray-400 gap-10 h-16 w-screen items-center justify-center text-xs sm:text-xs md:text-base md:font-semibold mb-10">
          <div className="text-md text-black-500 ml-4 justify-center ml-4">
            Doctor: {item.title} {item.firstname} {item.lastname}
          </div>
          <div className="text-md text-black-500 ml-4 items-center justify-center">
            DOB : {gettime(item.dob)}
          </div>
          <div className="text-md text-black-500 ml-4">
            Speciality : {item.spl}
          </div>
          <div className="text-md text-black-500 ml-4">
            SLMC Reg.No : {item.reg}
          </div>
          <div className="text-md text-black-500 ml-4">
            Remote Location : {item.rlocaion}
          </div>
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
      {docperonal()}
      <div className="container mx-auto">
        <div className="flex flex-col mt-10">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-2 -gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Full Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Sex
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact Number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date Of Birth
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y-2 divide-gray-100">
                    {patientDet.map((person) => (
                      <tr
                        key={person.doc}
                        className="cursor-pointer hover:bg-gray-100 "
                        onClick={() => {
                          setSingle(person);

                          single && newPage();
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person.firstname} {person.lastname}
                            </div>
                            <div className="text-sm text-gray-500">
                              {person.doc}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {person.sex}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {person.contactno}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {gettime(person.dob)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center w-full justify-center mt-10">
        <div class="flex items-center justify-center ">
          <img src={logo2} alt={"MIS logo"} className={"h-20 md:h-24"} />
        </div>
      </div>

      {/* {updatee && (
        <DoctorUpdate
        show ={updatee}
        data={single}
        handleClose={() => setUpdatee(false)}
        />
      )} */}
    </>
  );
};

export default DoctorDashboard;
