import React from "react";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// import pizzas from "./assets/pizzas.json";
import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <NotFound />
        </div>
      </div>
    </div>
  );
}

export default App;
