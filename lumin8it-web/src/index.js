import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import AddProgram from "./screens/AddProgram";
import DisplayProgram from "./screens/DisplayProgram";
import EditProgram from "./screens/EditProgram";
import ListPrograms from "./screens/ListPrograms";

import { Provider as AuthProvider } from "./context/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <Router>
      <div>
        <Route render={() => <App />} path="/" />
        <Route render={() => <ListPrograms />} path="/list" />
        <Route render={() => <AddProgram />} path="/create" />
        <Route render={() => <EditProgram />} path="/edit/:id" />
        <Route render={() => <DisplayProgram />} path="/show/:id" />
      </div>
    </Router>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
