import React from "react";
import FeatherIcon from "feather-icons-react";
import firebase from "../firebase/Firebase";
import logo from "../assets/images/LOGO-MIS.png";

const Header = (props) => {
  return (
    <div>
      <div className="flex poppins items-center justify-center">
        <div className="flex poppins items-center bg-white bg-opacity-75 justify-center w-full sm:w-full md:w-full mt-3">
          <img src={logo} alt={"MIS logo"} className={"h-20 sm:h-28 md:h-28"} />
          <div className="flex poppins items-center justify-center text-xs sm:text-sm font-serif md:text-4xl ml-2 font-semibold text-blue-700">
            Medical Instrumentation System
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
