import React, { useState } from "react";
import "../../Login.css";
import logo from "../../Image/logo.png";
import login from "../../Image/login.png";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import Topbar from "../Common/Topbar";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { UseUserContext } from "../../UserContextAppProvider";
import { sendRoomId } from "../ChatBox/firebase";
import { API_URL } from "../..";
const Login = () => {
  const { usertoken, setToken, setUserData } = UseUserContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      swal({
        title: "Error!",
        text: "Please enter a valid email address.",
        type: "error",
        icon: "error",
      }).then(function () {
        return false;
      });
    }

    try {
      if (formData.email && formData.password) {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        };
        await fetch(API_URL + "/api/customerLogin", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data, "check valu")
            if (data.status === 200) {
              setToken(data?.token);
              localStorage.setItem("usertoken", data.token);
              setUserData(data.data);
              // sendRoomId(data.data._id);
                navigate("/");
      
              // alert("hogya")
              // window.location.href="/"

            } else {
              swal({
                title: "Error!",
                text: data.message,
                type: "error",
                icon: "error",
              }).then(function () {
                // navigate('/');
              });
            }
          });
      }
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <div className="login" style={{ background: "#F5F5F5" }}>
      <Topbar />
      <div className="row">
        <div className="col-lg-6" style={{ paddingRight: "0px" }}>
          <div className="login_form">
            <Link to="/"><img className="login_logo" src={logo} /></Link>
            <div className="login_form1">
              <h2>Sign In</h2>
              <form onSubmit={handleSubmit}>
                <div
                  className="col-lg-11"
                  style={{ display: "block", margin: "auto" }}
                >
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i class="fa fa-envelope-o" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      required
                      type="email"
                      name="email"
                      placeholder="Email ID"
                      aria-label="Email ID"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </div>
                <div
                  className="col-lg-11"
                  style={{ display: "block", margin: "auto" }}
                >
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i class="fa fa-lock" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      required
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      aria-label="Enter Password"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </div>
                <div
                  className="col-lg-11"
                  style={{ display: "block", margin: "auto" }}
                >
                  <button type="submit" className="login_btnup">
                    Sign In
                  </button>
                </div>
              </form>
              <span className="login_forgot">
                Don't have an account ? <Link to="/Register">Sign up</Link>
              </span>
              <span className="login_forgot mt-2">
                <Link to="/Forgetpassword">Forget Password</Link>
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-6" style={{ paddingLeft: "0px" }}>
          <img style={{ width: "100%" }} src={login} />
        </div>
      </div>
    </div>
  );
};

export default Login;