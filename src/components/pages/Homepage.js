import React, { Component } from "react";
import HomepageArticles from "../HomepageArticles";
import ReactHtmlParser from "react-html-parser";

class Homepage extends Component {
  state = {
    homeBannerText: "",
    homeBannerUrl: "",
    homeTeasers: [],
    homepageObj: {}
  };
  componentDidMount() {
    fetch(
      "http://localhost:7003/sites/REST/resources/v1/aggregates/avisports/Page/1327351719456?assetDepth=1&fields=Page(banner,teaserImages,teaserText,bannerText);AVIImage(imageFile,width,height)&expand=Page,AVIImage"
    )
      .then(res => res.json())
      .then(data => {
        //get the page id - Page:1327351719456
        const pageId = data.start;
        //get the bannerText from page id
        const bannerText = data[pageId].bannerText.trim();
        //get the banner image id
        const bannerId = "AVIImage:" + data[pageId].banner.id;
        const bannerUrl = data[bannerId].imageFile_bloblink_;
        //get the teasertext and image id's of teasers
        const teaserImageIds = data[pageId].teaserImages.map(
          e => e.type + ":" + e.id
        );
        const teaserTexts = data[pageId].teaserText.map(e => e);
        const teaserArray = teaserImageIds.map((e, index) => {
          var obj = {};
          return { ...obj, teaserText: teaserTexts[index], imageId: e };
        });
        this.setState({
          homeBannerText: bannerText,
          homeBannerUrl: bannerUrl,
          homeTeasers: teaserArray,
          homepageObj: data
        });
        console.log("homepage object", data);
      })
      .catch(console.log());
  }
  render() {
    return (
      <div id="container" className="home">
        <div className="content">
          <div className="banner">
            <img
              src={this.state.homeBannerUrl}
              alt=""
              width="940"
              height="300"
            ></img>
            <div className="caption"></div>
            <div className="teaser">
              {ReactHtmlParser(
                this.state.homeBannerText.replace(
                  "_CSEMBEDTYPE_=internal&amp;_WRAPPER_=&amp;_PAGENAME_=avisports%2FAVIArticle%2FArticleLayout&amp;_cid_=1328196047338&amp;_c_=AVIArticle",
                  "/article/1328196047338"
                )
              )}
            </div>
          </div>
        </div>
        <div className="center-column">
          <div className="post-wrapper">
            {this.state.homeTeasers.map(element => {
              return (
                <HomepageArticles
                  key={element.imageId}
                  teaserImageId={element.imageId}
                  teaserText={element.teaserText}
                  homepageObj={this.state.homepageObj}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
