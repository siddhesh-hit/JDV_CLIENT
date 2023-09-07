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
const Suminsured = () => {
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
                    <li style={{ listStyle: "none" }}>Sum Insured (AED)</li>
                  </ul>
                </div>
                <div className="col-lg-5">
                  <InputGroup className="mb-4">
                    <Form.Control
                      required
                      onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          sum_insured_hull_equipment_value: e.target.value,
                        }));
                      }}
                      placeholder="Hull & Equipment Value"
                      aria-label="Hull & Equipment Value"
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-5">
                  <InputGroup className="mb-4">
                    <Form.Control
                      required
                      onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          sum_insured_dinghy_tender: e.target.value,
                        }));
                      }}
                      placeholder="Dinghy / Tender"
                      aria-label="Dinghy / Tender"
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-5">
                  <InputGroup className="mb-4">
                    <Form.Control
                      required
                      onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          sum_insured_out_board: e.target.value,
                        }));
                      }}
                      placeholder="Out Board"
                      aria-label="Out Board"
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-5">
                  <InputGroup className="mb-4">
                    <Form.Control
                      onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          sum_insured_personal_effect_including_cash: e.target.value,
                        }));
                      }}
                      required
                      placeholder="Personal Effect Including Cash"
                      aria-label="Personal Effect Including Cash"
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-5">
                  <InputGroup className="mb-4">
                    <Form.Control
                    onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          sum_insured_trailer: e.target.value,
                        }));
                      }}
                      required
                      placeholder="Trailer"
                      aria-label="Trailer"
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-5 mb-4"></div>
                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                  <Link to="/Enginedetails" className="buttonactions">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>Back
                  </Link>
                </div>
                <div
                  className="col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                  style={{ textAlign: "right" }}
                >
                  <Link to="/Territorycoverage" className="buttonactions">
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

export default Suminsured;
