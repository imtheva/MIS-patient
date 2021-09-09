import Gif from "../../assets/images/Loader.gif";
import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = (props) => {
  return (
    <div className={"loader-container"}>
      <div className={"loader-inner"}>
        <Spinner
          size={props.size ? "sm" : null}
          animation="border"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
};

export default Loader;

export const MainLoader = (props) => {
  return (
    <div className={"h-full flex items-center justify-center"}>
      <img src={Gif} alt={"Trakee loader"} className={"h-24 w-24"} />
    </div>
  );
};
