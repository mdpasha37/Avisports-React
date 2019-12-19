import React from "react";

export default props => {
  return (
    <tr>
      <td>
        <a href={"article/" + props.article.id.substring(11)}>
          {props.article.name}
        </a>
      </td>
    </tr>
  );
};
