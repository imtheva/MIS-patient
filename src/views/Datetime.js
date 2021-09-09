import React from "react";

var datetime = () => {
  var showdate = new Date();
  var displaytodaysdate =
    showdate.getDate() +
    "/" +
    showdate.getMonth() +
    "/" +
    showdate.getFullYear();
  var dt = showdate.toDateString();
  var displaytime = showdate.getHours() + ":" + showdate.getMinutes();
  return (
    <div>
      <input type="text" value={displaytodaysdate} readOnly="true" />
      {dt} - {displaytime}
    </div>
  );
};
export default datetime;
