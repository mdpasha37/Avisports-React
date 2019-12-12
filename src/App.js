import React from "react";
import NavigationMenu from "./components/NavigationMenu";
import Homepage from "./components/pages/Homepage";

import "./styles/all.css";
import "./styles/formstyle.css";

const App = () => {
  return (
    <div id="main">
      <NavigationMenu />
      <Homepage />
    </div>
  );
};

export default App;
