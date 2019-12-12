import React from "react";
import ReactHtmlParser from "react-html-parser";

const HomepageArticles = props => {
  console.log("Navigation");
  let htmlText = props.teaserText;
  let pageId = htmlText.match(/(?<=cid_=)(.*)(?=&)/);
  let replaceText = htmlText.match(/(?<=href=")(.*)(?=">)/);
  let teaserText;
  if (pageId[0] === "1329851332601") {
    teaserText = htmlText.replace(replaceText[0].trim(), "/surfing");
  } else {
    teaserText = htmlText.replace(replaceText[0].trim(), "/page/" + pageId[0]);
  }

  return (
    <div className="post">
      <img
        src={props.homepageObj[props.teaserImageId].imageFile_bloblink_}
        alt=""
        width="206"
        height="169"
      ></img>
      <div className="caption"></div>
      <div className="descr">
        {ReactHtmlParser(teaserText)}
        <div>&nbsp;</div>
      </div>
    </div>
  );
};

export default HomepageArticles;
