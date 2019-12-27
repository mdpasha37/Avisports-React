import React, { Component } from "react";
// import SurfingPage from "./SurfingPage";
// import { Link, useParams } from "react-router-dom";

class AdditionalPage extends Component {
  state = {
    pageId: this.props.match.params.pageId,
    pageAttributes: {},
    pageTitleContent1: "",
    pageTitleContent2: ""
  };
  getPageAttributes(pageId) {
    fetch(
      `${process.env.REACT_APP_AVISPORTS_API}Page/${pageId}?assetDepth=2&fields=AVIArticle(id,relatedImage,abstract,headline);Page(banner,titleContent1,titleContent2,Assoc_Named_contentList1,Assoc_Named_contentList2);AVIImage(imageFile,smallThumbnail,ClargeThumbnail);YouTube(externalid)&expand=Page,AVIImage,AVIArticle,YouTube`
    )
      .then(res => res.json())
      .then(data => {
        const dataPageId = data.start;
        const dataBannerId = "AVIImage:" + data[dataPageId].banner.id;
        const dataBannerUrl = data[dataBannerId].imageFile_bloblink_;
        this.setState({
          pageAttributes: data,
          bannerUrl: dataBannerUrl,
          pageTitleContent1: data[dataPageId].titleContent1,
          pageTitleContent2: data[dataPageId].titleContent2
        });
      })
      .catch(console.log());
  }
  componentDidMount() {
    // let pageIdState = this.state.pageId;
    this.getPageAttributes(this.props.match.params.pageId);
  }
  componentDidUpdate(prevState) {
    const previousPageId = prevState.match.params.pageId;
    const currentPageId = this.props.match.params.pageId;
    if (previousPageId !== currentPageId) {
      this.getPageAttributes(currentPageId);
    }
  }

  render() {
    return (
      <div>
        <div id="container" className="section">
          <div className="content">
            <img src={this.state.bannerUrl} alt="banner"></img>
          </div>
        </div>
        <div>
          <h2>The design is yet to be finalized !!</h2>
        </div>
      </div>
    );
  }
}

export default AdditionalPage;
