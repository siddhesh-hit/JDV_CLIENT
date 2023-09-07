import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Yatchbanner from "../Banner/Yatchbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { UseMotorContext } from "../../MultiStepContextApi";
const Yatchdetails = () => {
  const { YatchFormsData, setYatchFormsData } = UseMotorContext();
  const Progress = 40;
  return (
    <div>
      <Header />
      <Yatchbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12">
              <div className="row form_abcd">
                <div className="col-lg-11 col-md-12 col-sm-12 col-xs-12">
                  <ul className="mb-3">
                    <li>Please fill details of boat :</li>
                  </ul>
                  <div class="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 radiohide">
                        <InputGroup className="mb-4">
                          <Form.Control
                            required
                            onChange={(e) => {
                              setYatchFormsData((prev) => ({
                                ...prev,
                                boat_name: e.target.value,
                              }));
                            }}
                            placeholder="Name of the Boat"
                            aria-label="Name of the Boat"
                          />
                        </InputGroup>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4">
                        <select
                          onChange={(e) => {
                            setYatchFormsData((prev) => ({
                              ...prev,
                              boat_model_year: e.target.value,
                            }));
                          }}
                          className="form-control"
                        >
                          <option disabled>Select Model Year</option>
                          <option value="Make">Make</option>
                          <option value="Make">Make</option>
                          <option value="Make">Make</option>
                        </select>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4">
                        <InputGroup>
                          <Form.Control
                            onChange={(e) => {
                             setYatchFormsData((prev) => ({
                              ...prev,
                              boat_registration_no: e.target.value,
                            }));
                          }} 
                            
                            required
                            placeholder="Reg No. (Optional)"
                            aria-label="Reg No. (Optional)"
                          />
                        </InputGroup>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4">
                        <InputGroup>
                          <Form.Control
                             onChange={(e) => {
                                setYatchFormsData((prev) => ({
                                 ...prev,
                                 boat_hull_serial_number: e.target.value,
                               }));
                             }} 
                            required
                            placeholder="Hull Serial Number"
                            aria-label="Hull Serial Number"
                          />
                        </InputGroup>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <select 
                           onChange={(e) => {
                            setYatchFormsData((prev) => ({
                             ...prev,
                             boat_hull_material: e.target.value,
                           }));
                         }} 
                         className="form-control">
                          <option disabled>Select Hull material</option>
                          <option value="Make">Make</option>
                          <option value="Make">Make</option>
                          <option value="Make">Make</option>
                        </select>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4">
                        <InputGroup>
                          <Form.Control
                           onChange={(e) => {
                            setYatchFormsData((prev) => ({
                             ...prev,
                             boat_length_in_meter: e.target.value,
                           }));
                         }} 
                            required
                            placeholder="Length (In Meter)"
                            aria-label="Length (In Meter)"
                          />
                        </InputGroup>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4">
                        <InputGroup>
                          <Form.Control
                           onChange={(e) => {
                            setYatchFormsData((prev) => ({
                             ...prev,
                             boat_breath_in_meter: e.target.value,
                           }));
                         }} 
                            required
                            placeholder="Breath (In Meter)"
                            aria-label="Breath (In Meter)"
                          />
                        </InputGroup>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <select
                         onChange={(e) => {
                            setYatchFormsData((prev) => ({
                             ...prev,
                             is_vessel_a_conversion: e.target.value,
                           }));
                         }} 
                        className="form-control">
                          <option disabled>Is Vessel a Conversion</option>
                          <option value="Make">Make</option>
                          <option value="Make">Make</option>
                          <option value="Make">Make</option>
                        </select>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4">
                        <select 
                           onChange={(e) => {
                            setYatchFormsData((prev) => ({
                             ...prev,
                             current_policy_status: e.target.value,
                           }));
                         }} 
                        className="form-control">
                          <option disabled>Current Policy Status</option>
                          <option value="Make">Make</option>
                          <option value="Make">Make</option>
                          <option value="Make">Make</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                  <Link to="/" className="buttonactions">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>Back
                  </Link>
                </div>
                <div
                  className="col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                  style={{ textAlign: "right" }}
                >
                  <Link to="/Yatchpersonaldetails" className="buttonactions">
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

export default Yatchdetails;
