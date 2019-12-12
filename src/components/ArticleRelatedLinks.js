import React from "react";
import { Link } from "react-router-dom";

const ArticleRelatedLinks = props => (
  <li>
    <Link to={"/article/" + props.articleId.replace("AVIArticle:", "")}>
      {props.articleAttributes[props.articleId].headline}
    </Link>
  </li>
);

export default ArticleRelatedLinks;
