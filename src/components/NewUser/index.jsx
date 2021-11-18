import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { firebase } from "../../firebase";
import { Redirect, useHistory } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../Utils/tools";

const NewUser = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("password is required").min(8),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = (values) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password);
      showSuccessToast("Welcome to M-City");
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      showErrorToast(error.message);
    }
  };

  return (
    <>
      {!user ? (
        <div className="container">
          <div className="signin_wrapper" style={{ margin: "100px" }}>
            <form onSubmit={formik.handleSubmit}>
              <h2>New User</h2>
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

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="error_label">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}

              {loading ? (
                <CircularProgress color="secondary" className="progress" />
              ) : (
                <button type="submit">Sign up</button>
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

export default NewUser;
