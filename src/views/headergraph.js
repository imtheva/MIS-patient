import React from "react";
import FeatherIcon from "feather-icons-react";
import firebase from "../firebase/Firebase";
import logo from "../assets/images/LOGO_MIS.jpeg";

const Header = (props) => {
  return (
    <div>
      <div className="grid grid-cols-3 bg-blue-900 flex w-max h-16 mb-5 ">
        <div className="flex poppins items-center float-left text-xs sm:text-sm md:text-xl  font-semibold text-pri-500 ml-10  ">
          <p className="font-serif"> Medical Instrumentation System (MIS)</p>
        </div>

        <div className="flex poppins items-center justify-center text-xs sm:text-sm md:text-2xl  font-semibold text-pri-500 ml-10  ">
          <p className="font-serif text-pink-200 text-sm sm:text-base md:text-4xl ml-1">
            Graph
          </p>
        </div>

        <div className="flex justify-end poppins text-lg sm:text-lg md:text-xl font-semibold text-pri-500 float-right ">
          <div className="flex float-right items-center ">
            <div className="text-xs sm:text-xs md:text-base mt-0.5 ">
              Logged in as:
            </div>
            <div className="white-space: pre-wrap ml-2 text-xs sm:text-sm md:text-2xl text-pri-200">
              {props.firstname}{" "}
            </div>
            <button
              className="bg-pri-500 h-10 w-10 mx-2 rounded-full shadow-sm hover:shadow-2xl hover:bg-pri-100 ml-4 mt-1"
              onClick={props.logout}
            >
              <FeatherIcon className={"text-red-900 ml-2"} icon="power" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
