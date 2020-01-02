import React, { Component } from "react";
import Personalizer from "../Personalizer";
import ArticlesByCategory from "../ArticlesByCategory";
import Loader from "react-loader-spinner";

class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: {},
      isSubmitted: undefined,
      loading: false,
      dislikeDisabled: false,
      likeDisabled: false,
      error: ""
    };
  }
  componentDidMount() {}
  sendReward = (reward, str) => {
    const url = `${process.env.REACT_APP_AZURE_SEND_REWARD}`;
    const eventId = this.state.ranking.eventId;
    const data = {
      reward: reward,
      eventId: eventId
    };
    // console.log("Data for send reward", this.state.ranking, data);
    if (eventId === undefined) {
      this.setState(() => ({ error: "Please submit the form first" }));
    } else {
      if (str === "Liked") {
        this.setState(() => ({
          error: "",
          likeDisabled: true,
          dislikeDisabled: false
        }));
      } else {
        this.setState(() => ({
          error: "",
          dislikeDisabled: true,
          likeDisabled: false
        }));
      }

      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log("Reward sent as " + str);
        });
    }
  };
  onLike = () => {
    this.sendReward(0.9, "Liked");
  };
  onDisLike = () => {
    this.sendReward(0.1, "Disliked");
  };

  render() {
    return (
      <div>
        <div id="content-zone">
          <div id="container" className="section">
            <div className="content">
              {this.state.error && (
                <h4 style={{ color: "red" }}>{this.state.error}</h4>
              )}
              <Personalizer
                loading={loading => {
                  this.setState(() => ({ loading: loading }));
                }}
                onSubmitResponse={ranking => {
                  this.setState(() => ({
                    ranking: ranking,
                    isSubmitted: true,
                    dislikeDisabled: false,
                    likeDisabled: false,
                    error: ""
                  }));
                }}
              />
            </div>
            <div style={{ float: "left", width: "100%" }}>
              <button
                className="perSubmit"
                onClick={this.onLike}
                disabled={this.state.likeDisabled}
              >
                {this.state.likeDisabled ? "Liked" : "Like"}
              </button>
              <button
                className="perSubmit"
                onClick={this.onDisLike}
                disabled={this.state.dislikeDisabled}
              >
                {this.state.dislikeDisabled ? "Disliked" : "Dislike"}
              </button>
            </div>
            {this.state.loading ? (
              <div className="perLoader">
                <Loader
                  type="ThreeDots"
                  color="#34547c"
                  height={100}
                  width={100}
                />
              </div>
            ) : (
              this.state.isSubmitted &&
              this.state.ranking.ranking.slice(0, 3).map((e, index) => {
                return <ArticlesByCategory key={e.id} id={e.id} />;
              })
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default ArticlesPage;
