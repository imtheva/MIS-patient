import React, { useEffect, useState } from "react";
import logo from "../assets/images/LOGO_MIS.jpeg";
import firebase from "../firebase/Firebase";
import { authSignIn } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import logo2 from "../assets/images/design2.jpg";
import Header from "./logheader";
import background from "../assets/images/wall7.jpg";


const SignUp = (props) => {
  const [submit, setSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verify ,setVerify] =useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const isInvalid = email === "" && password === "";
  const [type, setType] = useState("");

  const dispatch = useDispatch();
  const isSigned = useSelector((state) => state.authSignIn);

  useEffect(() => {
    setType(props.location.data);
    
    
    submit && getData();
  }, [submit]);



  // if (isSigned) {
  //   props.history.replace("/dashboard");
  // }

  /*Inputs validation on change*/
  function getInput(event) {
    setError("");

    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        setEmailError("");
        break;
      case "password":
        setPassword(event.target.value);
        setPasswordError("");
        break;
      case "confirmPassword":
        setConfirmPassword(event.target.value);
        setPasswordError("");

        break;
      default:
        break;
    }
  }



  function getData() {
    firebase.db
      .collection("authentication")
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setVerify(true);
          console.log("verified");
          submitSignUp()
        } else {
          alert("You are not authorized to Login. Please contact the hospital for assistance");
          props.history.replace("/choice");
        }
      })
      .catch((error) => {
        alert("Error getting document:", error);
      });
  }

function submitSignUp() {
setSubmit (true)
try {
  verify &&  
      firebase.signUp(email, password).then((authUser) => {
        dispatch(authSignIn(authUser.user));
        alert("Sign Up Successfull!!! Please add Your Details.");
        if (type === "patient") {
          
          props.history.replace("/dashboard/patients");
        }
        if (type === "doctor") {
          
          props.history.replace("/dashboard/doctors");}
        // } else{
        //   props.history.replace("/choice");
        // } 
      });

      
    } catch (error) {
      alert(error.message);
    }
  



}


  return (
    <>
    <div style={{ backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
    }}>

    <Header />

    
    <div className="items-center justify-center h-11/12 w-full" > 
      {/* <div className=" h-full">
        <div className={"content-center"}> */}
       

<div className="flex items-center p-4 justify-center">
        <div className=" box-border bg-white bg-opacity-75  hover:border-transparent rounded-3xl  border-black justify-center items-center   w-full sm:w-11/12 md:w-4/12" >

          <div className={"mt-6 pb-8"}>
            
            <div className={" mx-auto px-3"}>
              <input
                class="  w-full py-2 px-3 mb-2 border-solid border-2 border-gray-600 rounded-sm  "
                type="email"
                placeholder="Enter email"
                value={email}
                name={"email"}
                onChange={getInput.bind(this)}
              />
              {emailError}
              <input
                class="  w-full py-2 px-3 mb-2 border-solid border-2 border-gray-600 rounded-sm  "
                type="password"
                placeholder="Enter password"
                value={password}
                name={"password"}
                onChange={getInput.bind(this)}
              />
              <input
                class="  w-full py-2 px-3 mb-2 border-solid border-2 border-gray-600 rounded-sm  "
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                name={"confirmPassword"}
                onChange={getInput.bind(this)}
              />
            
              {passwordError}
              <div className="flex justify-center">
                <button
                  onClick={getData}
                  className={
                    "primary-btn bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white  w-48 text-center mr-3 " +
                    (isInvalid || submit
                      ? "hover:bg-sec-500 text-black"
                      : "bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white focus:outline-none")
                  }
                  block
                  disabled={isInvalid || submit}
                >
                  Sign Up<span className="text-red-500">*</span>
                </button>
              </div>
              
              <div className={"text-center text-sm font-bold text-black hover:text-blue-400"}>
                <div className="mb-2"></div>
                Already have an account? <NavLink to={"/choice"}>Login</NavLink>
              </div>
            </div>
          </div>
        </div>
        
      </div>
     
      
      </div>
     
      </div>
      
    </>
  );
};

export default SignUp;
