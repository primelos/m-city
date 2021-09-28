import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import mcityLogo from "../../Resources/images/logos/manchester_city_logo.png";

export const CityLogo = ({ height, width, link, linkTo }) => {
  const template = (
    <div
      className="img_cover"
      style={{
        width: width,
        height: height,
        background: `url(${mcityLogo}) no-repeat`,
      }}
    ></div>
  );
  if (link) {
    return (
      <Link className="link_logo" to={linkTo}>
        {template}
      </Link>
    );
  } else {
    return template;
  }
};

export const showErrorToast = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const showSuccessToast = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
