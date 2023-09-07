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
const Territorycoverage = () => {
  const Progress = 40;
  const { YatchFormsData, setYatchFormsData } = UseMotorContext();
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
                      Territory of the Coverage :
                    </li>
                  </ul>
                </div>
                <div className="col-lg-5">
                  <select
                    onChange={(e) => {
                      setYatchFormsData((prev) => ({
                        ...prev,
                        when_not_in_use_is_the_craft_kept_one: e.target.value,
                      }));
                    }}
                    className="form-control"
                  >
                    <option disabled>
                      When not in use. Is the craft Kept ?
                    </option>
                    <option>Model</option>
                    <option>Model</option>
                  </select>
                </div>
                <div className="col-lg-5">
                  <InputGroup className="mb-4">
                    <Form.Control
                       onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          when_not_in_use_is_the_craft_kept_two: e.target.value,
                        }));
                      }}
                      required
                      placeholder="Where is the craft kept when not in use"
                      aria-label="Where is the craft kept when not in use"
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-5 mb-4">
                  <select    onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          when_not_in_use_is_the_craft_kept_three: e.target.value,
                        }));
                      }} className="form-control">
                    <option disabled>
                      When not in use. Is the craft Kept ?
                    </option>
                    <option>Model</option>
                    <option>Model</option>
                  </select>
                </div>
                <div className="col-lg-5 mb-4">
                  <select     onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          when_not_in_use_is_the_craft_kept_four: e.target.value,
                        }));
                      }}className="form-control">
                    <option disabled>
                      When not in use. Is the craft Kept ?
                    </option>
                    <option>Model</option>
                    <option>Model</option>
                  </select>
                </div>
                <div className="col-lg-5 mb-4">
                  <select    onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          when_not_in_use_is_the_craft_kept_five: e.target.value,
                        }));
                      }} className="form-control">
                    <option disabled>
                      When not in use. Is the craft Kept ?
                    </option>
                    <option>Model</option>
                    <option>Model</option>
                  </select>
                </div>
                <div className="col-lg-5 mb-4">
                  <select    onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          when_not_in_use_is_the_craft_kept_six: e.target.value,
                        }));
                      }} className="form-control">
                    <option disabled>
                      When not in use. Is the craft Kept ?
                    </option>
                    <option>Model</option>
                    <option>Model</option>
                  </select>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                  <Link to="/Suminsured" className="buttonactions">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>Back
                  </Link>
                </div>
                <div
                  className="col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                  style={{ textAlign: "right" }}
                >
                  <Link to="/Claimsexperience" className="buttonactions">
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

export default Territorycoverage;
