import React, { useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
const Yatchpersonaldetails = () => {
  const { YatchFormsData, setYatchFormsData } = UseMotorContext();
  const Progress = 40;

  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-11 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <ul style={{ paddingLeft: "0px" }}>
                    <li style={{ listStyle: "none" }}>
                      Please fill your details :
                    </li>
                  </ul>
                </div>
                <div className="col-lg-5">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      required
                      onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                      }}
                      placeholder="Full Name"
                      aria-label="Full Name"
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-5">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i class="fa fa-envelope-o" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                      }}
                      required
                      placeholder="Email ID"
                      aria-label="Email ID"
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-5">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i class="fa fa-phone" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          phoneno: e.target.value,
                        }));
                      }}
                      required
                      placeholder="Phone Number"
                      aria-label="Phone Number"
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-5">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i class="fa fa-calendar" aria-hidden="true"></i>
                    </InputGroup.Text>
                    {/* <DatePicker
                      placeholderText={"Enter Date Of Birth"}
                      className="form-control"
                      selected={YatchFormsData.date_of_birth}
                      onChange={(date) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          date_of_birth: date,
                        }));
                      }}
                    /> */}
                  </InputGroup>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                  <Link to="/Yatchdetails" className="buttonactions">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>Back
                  </Link>
                </div>
                <div
                  className="col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                  style={{ textAlign: "right" }}
                >
                  <Link to="/Enginedetails" className="buttonactions">
                    Next<i class="fa fa-chevron-right" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Insurancedetails />
      <Footer />
    </div>
  );
};

export default Yatchpersonaldetails;
