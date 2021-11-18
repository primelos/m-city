import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthGuard from "./Hoc/Auth";

import Header from "./components/Header_Footer/Header";
import Footer from "./components/Header_Footer/Footer";
import Home from "./components/Home";
import Signin from "./components/Signin";
import TheTeam from "./components/theTeam";
import TheMatches from "./components/theMatches";
import Dashboard from "./components/Admin/Dashboard";
import AdminPlayers from "./components/Admin/players";
import AddEditPlayers from "./components/Admin/players/addEditPlayers";
import AdminMatches from "./components/Admin/matches";
import AddEditMatch from "./components/Admin/matches/addEditMatch";
import NotFound from "./components/not_found";
import NewUser from "./components/NewUser";

function Routes({ user }) {
  return (
    <Router className="App">
      <Header user={user} />
      <Switch>
        <Route
          path="/admin_matches/edit_match/:matchid"
          component={AuthGuard(AddEditMatch)}
        />
        <Route
          path="/admin_matches/add_match"
          component={AuthGuard(AddEditMatch)}
        />
        <Route path="/admin_matches" component={AuthGuard(AdminMatches)} />

        <Route
          path="/admin_players/edit_player/:playerid"
          component={AuthGuard(AddEditPlayers)}
        />
        <Route
          path="/admin_players/add_player"
          component={AuthGuard(AddEditPlayers)}
        />
        <Route path="/admin_players" component={AuthGuard(AdminPlayers)} />

        <Route path="/dashboard" component={AuthGuard(Dashboard)} />
        <Route path="/the_matches" component={TheMatches} />

        <Route path="/the_team" component={TheTeam} />
        <Route
          path="/new_user"
          component={(props) => <NewUser {...props} />}
          user={user}
        />
        <Route
          path="/sign_in"
          component={(props) => <Signin {...props} user={user} />}
        />
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
      </Switch>
      <ToastContainer />
      <Footer />
    </Router>
  );
}

export default Routes;
