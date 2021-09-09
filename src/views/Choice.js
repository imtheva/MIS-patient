import React, { useState } from "react";
import logo from "../assets/images/MISlogo.jpg";
import wall from "../assets/images/wall.jpg";
import { NavLink } from "react-router-dom";
import Header from "./logheader";
import Footer from "./footer";
import background from "../assets/images/wall7.jpg";

const Choice = (props) => {
  const [submit, setSubmit] = useState("");
  const [type, setType] = useState("");

  // console.log(type);

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
        <div className="items-center justify-center h-screen w-screen">
          <Header />
          {/* <div className=" h-full"> */}
          {/* <div className={"content-center"}> */}
          <div className="flex items-center p-4 justify-center">
            <div className=" box-border bg-white bg-opacity-75  hover:border-transparent rounded-3xl  border-black justify-center items-center  h-full md:h-full sm:h-full w-screen sm:w-full md:w-4/12">
              <div className={"mt-6 pb-8"}>
                <div className={"w-full  mx-auto px-3"}>
                  <div className="flex justify-center mb-8">
                    <NavLink
                      key="doctor"
                      to={{ pathname: "/signin", data: "doctor" }}
                      className={
                        "primary-btn bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white w-48 text-center mr-3 " +
                        (submit
                          ? "hover:bg-sec-500 text-black"
                          : "text-xs sm:text-sm md:text-sm hover:bg-blue-500 hover:text-white hover:border-transparent focus:outline-none")
                      }
                      block
                    >
                      LogIn as Doctor
                    </NavLink>
                  </div>

                  <div className="flex justify-center mb-4">
                    <NavLink
                      to={{ pathname: "/signin", data: "patient" }}
                      className={
                        "primary-btn bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white w-48 text-center mr-3 " +
                        (submit
                          ? "hover:bg-sec-500 text-black"
                          : "text-xs sm:text-sm hover:bg-blue-500 hover:text-white hover:border-transparent focus:outline-none")
                      }
                      block
                    >
                      LogIn as Patient
                    </NavLink>
                  </div>
                </div>

                <div className="text-center text-sm font-bold mb-2 text-black">
                  Don't you have an account?
                </div>
                <div className="flex justify-center mb-2">
                  <NavLink
                    to={{ pathname: "/signup", data: "doctor" }}
                    className={
                      "primary-btn bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white w-36 text-center mr-3 " +
                      (submit
                        ? "hover:bg-sec-500 text-black"
                        : "text-xs sm:text-sm hover:bg-blue-500 hover:text-white hover:border-transparent focus:outline-none")
                    }
                    block
                  >
                    Sign Up As Doctor
                  </NavLink>
                  <br></br>
                  <NavLink
                    to={{ pathname: "/signup", data: "patient" }}
                    className={
                      "primary-btn bg-blue-200 hover:bg-blue-800 border-blue-500 hover:text-white w-36 text-center mr-3 " +
                      (submit
                        ? "hover:bg-sec-500 text-black"
                        : "text-xs sm:text-sm hover:bg-blue-500 hover:text-white hover:border-transparent focus:outline-none")
                    }
                    block
                  >
                    Sign Up As Patient
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* <Footer/> */}
        </div>
      </div>
    </>
  );
};

export default Choice;
