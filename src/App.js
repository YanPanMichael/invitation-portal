import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./routes/Login/index";
import Index from "./routes/Index/index";
import "./App.css";

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/" component={Index} />
    </Switch>
  );
}

export default App;
