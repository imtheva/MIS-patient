import React from "react";
import FeatherIcon from "feather-icons-react";
import firebase from "../firebase/Firebase";
import footer from "../assets/images/footer.png";

const Footer = (props) => {
  return (
    <div>
      <div className="flex poppins items-center justify-center">
        <div className="flex poppins items-center bg-white bg-opacity-75 justify-center w-full sm:w-full md:w-full absolute inset-x-0 bottom-0 ">
          <img
            src={footer}
            alt={"MIS logo"}
            className={"h-10 sm:h-12 md:h-16"}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
