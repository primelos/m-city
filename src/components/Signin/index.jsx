import React, { useState } from "react";
import { firebase } from "../../firebase";
import { CircularProgress } from "@mui/material";
import { Redirect, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../Utils/tools";

const Signin = (props) => {
  const { user } = props;
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "carlos@gmail.com",
      password: "tokentoken",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("password is required").min(8),
    }),
    onSubmit: (values) => {
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = (values) => {
    // const { email, password } = values;
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        showSuccessToast("Welcome back");
        history.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        showErrorToast(error.message);
      });
  };

  return (
    <>
      {!user ? (
        <div className="container">
          <div className="signin_wrapper" style={{ margin: "100px" }}>
            <form onSubmit={formik.handleSubmit}>
              <h2>Please login</h2>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error_label">{formik.errors.email}</div>
              ) : null}
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error_label">{formik.errors.password}</div>
              ) : null}
              {loading ? (
                <CircularProgress color="secondary" className="progress" />
              ) : (
                <button type="submit">Login</button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <Redirect to={"/dashboard"} />
      )}
    </>
  );
};

export default Signin;
