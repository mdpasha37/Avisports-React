import React, { Component } from "react";
import Personalizer from "../Personalizer";
import ArticlesByCategory from "../ArticlesByCategory";

class ArticlesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: {},
      isSubmitted: undefined,
      disabled: false,
      like: "Like",
      dislike: "Dislike",
      error: ""
    };
  }
  componentDidMount() {}
  sendReward = reward => {
    const url = "https://yaztestapp.azurewebsites.net/api/sendReward";
    const eventId = this.state.ranking.eventId;
    const data = {
      reward: reward,
      eventId: eventId
    };
    console.log("Data for send reward", this.state.ranking, data);
    if (eventId === undefined) {
      this.setState(() => ({ error: "Please submit the form first" }));
    } else {
      this.setState(() => ({ error: "", disabled: true }));
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log("Reward sent");
        });
    }
  };
  onLike = () => {
    this.sendReward(0.9);
    this.setState(() => ({ like: "Liked" }));
  };
  onDisLike = () => {
    this.sendReward(0.1);
    this.setState(() => ({ dislike: "Disliked" }));
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
                onSubmitResponse={ranking => {
                  this.setState(() => ({
                    ranking: ranking,
                    isSubmitted: true,
                    error: ""
                  }));
                }}
              />
            </div>
            <div style={{ float: "left", width: "100%" }}>
              <button
                className="perSubmit"
                onClick={this.onLike}
                disabled={this.state.disabled}
              >
                {this.state.like}
              </button>
              <button
                className="perSubmit"
                onClick={this.onDisLike}
                disabled={this.state.disabled}
              >
                {this.state.dislike}
              </button>
            </div>
            {this.state.isSubmitted &&
              this.state.ranking.ranking.slice(0, 3).map(e => {
                console.log(e);
                return <ArticlesByCategory key={e.id} id={e.id} />;
              })}
          </div>
        </div>
      </div>
    );
  }
}
export default ArticlesPage;
