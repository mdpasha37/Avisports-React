import React from "react";
import { Link } from "react-router-dom";

const PageAssocContentList1 = props => (
  <div className="post">
    <Link to={"/article/" + props.articleId.replace("AVIArticle:", "")}>
      <img
        id={"surfing_" + props.index}
        className="photo left"
        src={props.pageAttributes[props.articleImageId].imageFile_bloblink_}
        alt=""
        width="135"
        height="90"
      ></img>
    </Link>
    <h3 className="title">
      <Link to={"/article/" + props.articleId.replace("AVIArticle:", "")}>
        {props.pageAttributes[props.articleId].headline}
      </Link>
    </h3>
    <p className="descr">{props.pageAttributes[props.articleId].abstract}</p>
  </div>
);
export default PageAssocContentList1;
