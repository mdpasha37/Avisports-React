import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavigationMenu from "../components/NavigationMenu";
import Homepage from "../components/pages/Homepage";
import AdditionalPage from "../components/pages/AdditionalPage";
import ArticleDetail from "../components/ArticleDetail";
import NotFoundPage from "../components/pages/NotFoundPage";
import SurfingPage from "../components/pages/SurfingPage";
import ArticlesByCategory from "../components/pages/ArticlesPage";

import "../styles/all.css";
import "../styles/formstyle.css";

const AppRouter = () => (
  <BrowserRouter>
    <div id="main">
      <NavigationMenu />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route
          exact
          path="/page/:pageId"
          render={props => <AdditionalPage {...props} />}
        />
        <Route path="/surfing">
          <SurfingPage />
        </Route>
        <Route
          exact
          path="/article/:articleId"
          render={props => <ArticleDetail {...props} />}
        />
        <Route path="/articles">
          <ArticlesByCategory />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
