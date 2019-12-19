import React, { Component } from "react";
import ArticleByCategory from "./ArticleByCategory";

class ArticlesByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: props.id,
      articlesData: []
    };
  }

  async componentDidMount() {
    let parentId;
    if (this.state.categoryId === "Tennis") {
      parentId = "1327351718806";
    } else if (this.state.categoryId === "Baseball") {
      parentId = "1327351718484";
    } else if (this.state.categoryId === "Surfing") {
      parentId = "1329801671850";
    } else if (this.state.categoryId === "Skiing") {
      parentId = "1327351719208";
    } else if (this.state.categoryId === "Running") {
      parentId = "1327351718403";
    } else if (this.state.categoryId === "Football") {
      parentId = "1327351718595";
    }
    const url =
      "http://localhost:7003/sites/REST/resources/v1/search/sites/avisports/types/AVIArticle/assets?field:ImmediateParents=" +
      parentId;
    const articles = await fetch(url, {
      headers: {
        Accept: "application/json"
      }
    });
    const articlesData = await articles.json();
    console.log("Getting articles data: ", articlesData.items);
    this.setState(() => ({
      articlesData: articlesData.items
    }));
  }
  render() {
    return (
      <div>
        <div className="perTable">
          <table id="searchTable">
            <tbody>
              <tr>
                <th>
                  Top Stories In {this.state.categoryId} (
                  {this.state.articlesData.length})
                </th>
              </tr>
              {this.state.articlesData.map(e => (
                <ArticleByCategory key={e.id} article={e} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ArticlesByCategory;
