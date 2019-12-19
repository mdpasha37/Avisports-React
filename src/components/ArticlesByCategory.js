import React, { Component } from "react";
import ArticleByCategory from "./ArticleByCategory";
import Loader from "react-loader-spinner";

class ArticlesByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: props.id,
      loading: true,
      articlesData: []
    };
  }

  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  componentDidMount() {
    console.log(
      "Component did mount with value of loading: ",
      this.state.loading
    );

    this.setState({ loading: true }, async () => {
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
      await this.sleep(2000);
      const articles = await fetch(url, {
        headers: {
          Accept: "application/json"
        }
      });
      const articlesData = await articles.json();
      console.log("Getting articles data: ", articlesData.items);
      console.log("state loading before: ", this.state.loading);

      this.setState({
        articlesData: articlesData.items,
        loading: false
      });
      console.log("state loading after: ", this.state.loading);
    });
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div className="perLoader">
            <Loader type="ThreeDots" color="#34547c" height={100} width={100} />
          </div>
        ) : (
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
        )}
      </div>
    );
  }
}

export default ArticlesByCategory;
