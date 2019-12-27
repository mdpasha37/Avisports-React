import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import ArticleRelatedStories from "../components/ArticleRelatedStories";
import ArticleRelatedLinks from "./ArticleRelatedLinks";

class ArticleDetail extends Component {
  state = {
    articleId: this.props.match.params.articleId,
    articleAttributes: {},
    articleCategory: "",
    articleAuthor: "",
    articleHeadline: "",
    articleSubHeadline: "",
    articleBanner: "",
    articleBody: "",
    articleRelatedStories: [],
    articleRelatedLinks: []
  };
  getArticleAttributes(articleId) {
    fetch(
      `${process.env.REACT_APP_AVISPORTS_API}AVIArticle/${articleId}?assetDepth=2&fields=category,author,postDate,subheadline,relatedLinks,relatedStories,relatedImage,body;AVIArticle(id,headline,abstract,relatedImage);AVIImage(imageFile,caption,width,height,sidebarThumbnail)&expand=AVIArticle,AVIImage`
    )
      .then(res => res.json())
      .then(data => {
        const dataArticleId = data.start;
        //const dataArticleHeadline = data[dataArticleId].headline;
        const dataBannerId = "AVIImage:" + data[dataArticleId].relatedImage.id;
        const dataBannerUrl = data[dataBannerId].imageFile_bloblink_;
        const dataRelatedStories = data[dataArticleId].relatedStories.map(
          e => e.type + ":" + e.id
        );
        const dataRelatedLinks = data[dataArticleId].relatedLinks.map(
          e => e.type + ":" + e.id
        );
        this.setState({
          articleAttributes: data,
          articleCategory: data[dataArticleId].category,
          articleAuthor: data[dataArticleId].author,
          articleHeadline: data[dataArticleId].headline,
          articleSubHeadline: data[dataArticleId].subheadline,
          articleBanner: dataBannerUrl,
          articleBody: data[dataArticleId].body,
          articleRelatedStories: dataRelatedStories,
          articleRelatedLinks: dataRelatedLinks
        });
      })
      .catch(console.log());
  }
  componentDidMount() {
    // let pageIdState = this.state.pageId;
    this.getArticleAttributes(this.props.match.params.articleId);
  }
  componentDidUpdate(prevState) {
    const previousArticleId = prevState.match.params.articleId;
    const currentArticleId = this.props.match.params.articleId;
    if (previousArticleId !== currentArticleId) {
      this.getArticleAttributes(currentArticleId);
    }
  }
  render() {
    return (
      <div id="container" className="article-layout">
        <div className="content">
          <div className="top-section">
            <span className="section-title">
              <Link to="/">{this.state.articleCategory}</Link>
            </span>
            <span className="date">Tue, Apr 10 2012</span>
          </div>
          <div className="title-section">
            <h1>{this.state.articleHeadline}</h1>
            <h2>{this.state.articleSubHeadline}</h2>
            <span className="author">{this.state.articleAuthor}</span>
          </div>
          <div className="article">
            <div className="article-image">
              <img
                src={this.state.articleBanner}
                alt=""
                width="617"
                height="343"
              ></img>
            </div>
            {ReactHtmlParser(this.state.articleBody)}
          </div>
        </div>
        <div className="sidebar">
          <div className="box">
            <h2 className="title">Related Stories</h2>
            {this.state.articleRelatedStories.map(e => {
              return (
                <ArticleRelatedStories
                  key={e}
                  articleId={e}
                  articleImageId={
                    "AVIImage:" +
                    this.state.articleAttributes[e].relatedImage.id
                  }
                  articleAttributes={this.state.articleAttributes}
                />
              );
            })}
          </div>

          <div className="box">
            <h2 className="title">Related Links</h2>
            <ul>
              {this.state.articleRelatedLinks.map(e => {
                return (
                  <ArticleRelatedLinks
                    key={e}
                    articleId={e}
                    articleAttributes={this.state.articleAttributes}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default ArticleDetail;
