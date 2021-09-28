import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header_Footer/Header";
import Footer from "./components/Header_Footer/Footer";
import Home from "./components/Home";
import Signin from "./components/Signin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Routes({ user }) {
  return (
    <Router className="App">
      <Header user={user} />
      <Switch>
        <Route path="/sign_in" exact component={Signin} />
        <Route path="/" exact component={Home} />
      </Switch>
      <ToastContainer />
      <Footer />
    </Router>
  );
}

export default Routes;