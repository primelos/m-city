import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "./Resources/css/app.css";
import { firebase } from "./firebase";

const App = (props) => {
  return <Routes {...props} />;
};

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(
    <React.StrictMode>
      <App user={user} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
