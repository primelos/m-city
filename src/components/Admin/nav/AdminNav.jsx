import React from "react";
import { Link, withRouter } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import { logOutHandler } from "../../Utils/tools";

const AdminNav = (props) => {
  console.log(props);
  const links = [
    {
      title: "Matches",
      linkTo: "/admin_matches",
    },
    {
      title: "Players",
      linkTo: "/admin_players",
    },
  ];

  const renderItems = () => {
    return links.map((link) => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button className="admin_nav_link">
          {link.title}
        </ListItem>
      </Link>
    ));
  };

  return (
    <div>
      {renderItems()}
      <ListItem
        button
        onClick={() => logOutHandler()}
        className="admin_nav_link"
      >
        Logout
      </ListItem>
    </div>
  );
};

export default withRouter(AdminNav);
