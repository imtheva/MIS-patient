import React, { useEffect, useState } from "react";
import logo from "../assets/images/LOGO_MIS.jpeg";
import { NavLink, useHistory } from "react-router-dom";
import firebase from "../firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { authSignIn } from "../actions";
import { withRouter } from "react-router-dom";
import logo2 from "../assets/images/design2.jpg";
import Header from "./logheader";
import background from "../assets/images/wall7.jpg";

const SignIn = (props) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [submit, setSubmit] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const isInvalid = email === "" && password === "";

  const [type, setType] = useState("");

  useEffect(() => {
    setType(props.location.data);
  }, []);

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
      default:
        break;
    }
  }

  // if (firebase.getCurrentUsername()) {
  //   props.history.replace("/dashboard");
  // }

  async function signIn() {
    try {
      await firebase.login(email, password).then((authUser) => {
        dispatch(authSignIn(authUser.user));
      });
      if (type === "patient")
        props.history.replace("dashboard/patientdashboard");
      if (type === "doctor")
        props.history.replace("/dashboard/doctordashboard");
      // else
      // props.history.replace("/choice");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Header />
        <div className="items-center justify-center h-11/12 w-full">
          {/* <div className=" h-full">
        <div className={"content-center"}> */}

          <div className="flex items-center p-8 justify-center">
            <div className=" box-border bg-white bg-opacity-75  hover:border-transparent rounded-3xl  border-black justify-center items-center  h-full w-full sm:w-10/12 md:w-4/12">
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

                  <input
                    class="w-full py-2 px-3 mb-2 border-solid border-2 border-gray-600 rounded-sm  "
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    name={"password"}
                    onChange={getInput.bind(this)}
                  />
                  <div className="flex justify-center">
                    <button
                      onClick={signIn}
                      className={
                        "primary-btn bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white w-48 text-center mr-3 " +
                        (isInvalid || submit
                          ? "hover:bg-sec-500 text-black"
                          : "hover:bg-pri-500 hover:text-white hover:border-pri-500 focus:outline-none")
                      }
                      block
                      disabled={isInvalid || submit}
                    >
                      Login
                    </button>
                  </div>
                </div>

                <div
                  className={
                    "text-center text-sm font-bold text-black hover:text-blue-400"
                  }
                >
                  <div className="mb-3"></div>
                  Don't you have an account?{" "}
                  <NavLink to={"/choice"}>Sign Up</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(SignIn);

// const clearInputs = () => {
//   setEmail("");
//   setPassword("");
// };

// const clearErrors = () => {
//   setEmailError("");
//   setPasswordError("");
// };

// const authListener = () => {
//   fire.auth().onAuthStateChanged((user) => {
//     if (user) {
//       clearInputs();
//       setUser(user);
//     } else {
//       setUser("");
//     }
//   });
// };

// useEffect(() => {
//   authListener();
// }, []);

//  const submitSignIn = () => {
//   clearErrors();
//   // var email = "test@example.com";
//   // var password = "hunter2";
//   // [START auth_signin_password]
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then((user) => {
//       // Signed in
//       var user = user.user;
//       props.history.replace("/dashboard");
//       console.log("Logged In");
//       // ...
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//     });
//   // [END auth_signin_password]
// };

// const handleLogout = () => {
//   firebase.auth().signOut();
//   props.history.replace("/Sign-In");
// };
