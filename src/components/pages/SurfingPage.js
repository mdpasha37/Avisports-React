import React, { Component } from "react";
import PageAssocContentList1 from "../PageAssocContentList1";
import PageAssocContentList2 from "../PageAssocContentList2";
// import SurfingPage from "./SurfingPage";
// import { Link, useParams } from "react-router-dom";

class SurfingPage extends Component {
  state = {
    pageAttributes: {},
    bannerUrl: "",
    pageTitleContent1: "",
    pageTitleContent2: "",
    pageAssocContentList1: [],
    pageAssocContentList2: []
  };

  componentDidMount() {
    fetch(
      "http://localhost:7003/sites/REST/resources/v1/aggregates/avisports/Page/1329851332601?assetDepth=2&fields=AVIArticle(id,relatedImage,abstract,headline);Page(banner,titleContent1,titleContent2,Assoc_Named_contentList1,Assoc_Named_contentList2);AVIImage(imageFile,smallThumbnail,ClargeThumbnail);YouTube(externalid)&expand=Page,AVIImage,AVIArticle,YouTube"
    )
      .then(res => res.json())
      .then(data => {
        console.log("Additional Page data: ", data);
        const dataPageId = data.start;
        const dataBannerId = "AVIImage:" + data[dataPageId].banner.id;
        const dataBannerUrl = data[dataBannerId].imageFile_bloblink_;
        const dataAssocContentList1 = data[
          dataPageId
        ].Assoc_Named_contentList1.map(e => e.type + ":" + e.id);
        const dataAssocContentList2 = data[
          dataPageId
        ].Assoc_Named_contentList2.map(e => e.type + ":" + e.id);
        this.setState({
          pageAttributes: data,
          bannerUrl: dataBannerUrl,
          pageTitleContent1: data[dataPageId].titleContent1,
          pageTitleContent2: data[dataPageId].titleContent2,
          pageAssocContentList1: dataAssocContentList1,
          pageAssocContentList2: dataAssocContentList2
        });
      })
      .catch(console.log());
  }

  render() {
    return (
      <div>
        <div id="container" className="section">
          <div className="content">
            <img src={this.state.bannerUrl}></img>
          </div>
          <div className="center-column green">
            <div className="post-wrapper">
              <h2 className="title">{this.state.pageTitleContent1}</h2>
              {this.state.pageAssocContentList1.map((e, index) => {
                console.log("Related: ", e);
                return (
                  <PageAssocContentList1
                    key={e}
                    index={index}
                    articleId={e}
                    articleImageId={
                      "AVIImage:" + this.state.pageAttributes[e].relatedImage.id
                    }
                    pageAttributes={this.state.pageAttributes}
                  />
                );
              })}
            </div>

            <div className="post-wrapper">
              <h2 className="title">{this.state.pageTitleContent2}</h2>
              {this.state.pageAssocContentList2.map(e => {
                console.log("Related: ", e);
                return (
                  <PageAssocContentList2
                    key={e}
                    articleId={e}
                    articleImageId={
                      "AVIImage:" + this.state.pageAttributes[e].relatedImage.id
                    }
                    pageAttributes={this.state.pageAttributes}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SurfingPage;
