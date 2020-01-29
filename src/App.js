import React, { useState, useEffect } from "react";
import BottomNavigator from "./components/global/BottomNavigator";
import UploadPage from "./components/pages/UploadPage";
import WebcamPage from "./components/pages/WebcamPage";
import HomePage from "./components/pages/HomePage";
import { Route, Switch } from "react-router-dom";
import load_model from "./assets/js/load_model.js";

function App() {
  const [model, setModel] = useState(null);

  useEffect(() => {
    load_model()
      .then(loaded_model => {
        setModel(loaded_model);
      })
      .catch(err => {
        console.error(err, "error loading the model");
      });
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/uploadpage"
          render={props => <UploadPage {...props} model={model} />}
        />
        <Route
          path="/webcampage"
          render={props => <WebcamPage {...props} model={model} />}
        />
      </Switch>
      <BottomNavigator />
    </div>
  );
}

export default App;
