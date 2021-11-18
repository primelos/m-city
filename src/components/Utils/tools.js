import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { firebase } from "../../firebase";
import mcityLogo from "../../Resources/images/logos/manchester_city_logo.png";
import { FormHelperText } from "@mui/material";

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

export const logOutHandler = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      showSuccessToast("Good Bye");
    })
    .catch((error) => {
      showErrorToast(error.message);
    });
};

export const Tag = (props) => {
  const { children, link, linkTo, bck, size, color, add } = props;
  const template = (
    <div
      style={{
        background: bck ? bck : "#ffffff",
        fontSize: size ? size : "15px",
        color: color ? color : "000000",
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...add,
      }}
    >
      {children}
    </div>
  );
  if (link) {
    return <Link to={linkTo}>{template}</Link>;
  } else {
    return template;
  }
};

export const textErrorHelper = (formik, values) => ({
  error: formik.errors[values] && formik.touched[values],
  helperText:
    formik.errors[values] && formik.touched[values]
      ? formik.errors[values]
      : null,
});

export const selectErrorHelper = (formik, values) => {
  if (formik.errors[values] && formik.touched[values]) {
    return <FormHelperText>{formik.errors[values]}</FormHelperText>;
  }

  return false;
};

export const selectIsError = (formik, values) => {
  return formik.errors[values] && formik.touched[values];
};
