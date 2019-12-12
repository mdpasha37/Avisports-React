import React from "react";
import { Link } from "react-router-dom";
// const aStyle = {
//   color: "#5A93BF",
//   fontWeight: "bold",
//   display: "block",
//   fontSize: "21px"
// };
export default () => (
  <div>
    <h1>404 - Page not found -</h1>
    <div className="aStyle">
      <Link to="/">Go Home</Link>
    </div>
  </div>
);
