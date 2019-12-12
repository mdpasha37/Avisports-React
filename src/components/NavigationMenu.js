import React, { Component } from "react";
import NavigtionSubmenu from "./NavigationSubMenu";
import { Link } from "react-router-dom";

class NavigationMenu extends Component {
  state = {
    navigationHomeName: "",
    navigationSubMenu: []
  };
  componentDidMount() {
    fetch(
      "http://localhost:7003/sites/REST/resources/v1/aggregates/avisports/navigation/Default?assetDepth=0&fields=Page(children,name,id);SiteNavigation(children)&expand=Page"
    )
      .then(res => res.json())
      .then(data => {
        //Get the parent Site Navigationid - ex: SiteNavigation:1052581735
        const siteNavId = data.start;
        //Get the page id - Page:1327351719456
        const pageId = data[siteNavId].children[0].start;
        // Get the home label
        const navHomeLabel = data[siteNavId].children[0][pageId].name;
        // Get the children from home object
        const navSubMenu = data[siteNavId].children[0][pageId].children;
        //const siteNavId = data.start;
        this.setState({
          navigationHomeName: navHomeLabel,
          navigationSubMenu: navSubMenu
        });
      })
      .catch(console.log());
  }
  render() {
    //   let subMenuPageId = this.state.navigationSubMenu
    return (
      <div>
        <div id="header">
          <div className="header-bar">
            <h1 className="logo">
              <Link to="/">AviSports-logo</Link>
            </h1>
          </div>
          <ul className="navigation">
            <li>
              <a href="/">{this.state.navigationHomeName}</a>
            </li>
            {this.state.navigationSubMenu.map(subMenu => {
              return (
                <NavigtionSubmenu
                  key={subMenu.start}
                  pageId={subMenu.start}
                  subMenu={subMenu}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default NavigationMenu;
