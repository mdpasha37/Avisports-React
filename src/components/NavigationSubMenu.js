import React from "react";
import { Link } from "react-router-dom";

export default props => {
  let menuLink;
  if (props.subMenu[props.pageId].name === "Surfing") {
    menuLink = "/surfing";
  } else {
    menuLink = "/page/" + props.subMenu[props.pageId].id;
  }
  return (
    <li>
      <Link to={menuLink}>{props.subMenu[props.pageId].name}</Link>
    </li>
  );
};
