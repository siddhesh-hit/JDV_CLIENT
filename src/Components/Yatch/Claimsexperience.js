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
const Claimsexperience = () => {
  const { YatchFormsData, setYatchFormsData } = UseMotorContext();
  const Progress = 40;
  const [startDate, setStartDate] = useState();
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
                    <li style={{ listStyle: "none" }}>Claims Experience :</li>
                  </ul>
                </div>
                <div className="col-lg-11">
                  <InputGroup className="mb-4">
                    <Form.Control
                      onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          claims_experience: e.target.value,
                        }));
                      }}
                      required
                      placeholder="Details of losses over past 5 year : "
                      aria-label="Details of losses over past 5 year : "
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-11 mb-4">
                  <ul style={{ paddingLeft: "0px" }}>
                    <li style={{ listStyle: "none" }}>
                      Have you ever had insurance for any vessel cancelled,
                      declined or renewed at an increased premium ?
                    </li>
                  </ul>
                  <div class="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                        <label class="btn btn-default active">
                          <input type="radio" name="options" checked="" />
                          <div
                            onClickCapture={(e) => {
                              setYatchFormsData((prev) => ({
                                ...prev,
                                have_you_ever_had_insurance_for_any_vessel_cancelled_declined_or_renewed_at_an_increased_premium: true,
                              }));
                            }}
                          >
                            Yes
                          </div>
                        </label>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                        <label class="btn btn-default">
                          <input type="radio" name="options" />
                          <div
                            onClickCapture={(e) => {
                              setYatchFormsData((prev) => ({
                                ...prev,
                                have_you_ever_had_insurance_for_any_vessel_cancelled_declined_or_renewed_at_an_increased_premium: false,
                              }));
                            }}
                          >
                            No
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-lg-11 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <ul style={{ paddingLeft: "0px" }}>
                    <li style={{ listStyle: "none" }}>Claims Experience :</li>
                  </ul>
                </div>
                <div className="col-lg-11">
                  <InputGroup className="mb-4">
                    <Form.Control
                      onChange={(e) => {
                        setYatchFormsData((prev) => ({
                          ...prev,
                          number_of_years_as_owner___user_of_any_other_type_of_craft:
                            e.target.value,
                        }));
                      }}
                      required
                      placeholder="Number of years as Owner / User of any other type of craft :"
                      aria-label="Number of years as Owner / User of any other type of craft :"
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-11 mb-4">
                  <ul style={{ paddingLeft: "0px" }}>
                    <li style={{ listStyle: "none" }}>
                      Sailing Qualification(s) ? (If yes, please attach a
                      scanned copy of the same)
                    </li>
                  </ul>
                  <div class="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                        <label class="btn btn-default active">
                          <input type="radio" name="options" checked="" />
                          <div  onClickCapture={(e) => {
                              setYatchFormsData((prev) => ({
                                ...prev,
                                sailing_qualification: true,
                              }));
                            }}
                          >Yes</div>
                        </label>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                        <label class="btn btn-default">
                          <input type="radio" name="options" />
                          <div onClickCapture={(e) => {
                              setYatchFormsData((prev) => ({
                                ...prev,
                                sailing_qualification: false,
                              }));
                            }}>No</div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-11 mb-4">
                  <ul style={{ paddingLeft: "0px" }}>
                    <li style={{ listStyle: "none" }}>
                      Will professional crew be employed ? (If yes, please
                      attach a scanned copy of CV and qualification of the
                      Captain)
                    </li>
                  </ul>
                  <div class="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                        <label class="btn btn-default active">
                          <input type="radio" name="options" checked="" />
                          <div  onClickCapture={(e) => {
                              setYatchFormsData((prev) => ({
                                ...prev,
                                will_professional_crew_be_employed: true,
                              }));
                            }}>Yes</div>
                        </label>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                        <label class="btn btn-default">
                          <input type="radio" name="options" />
                          <div  onClickCapture={(e) => {
                              setYatchFormsData((prev) => ({
                                ...prev,
                                will_professional_crew_be_employed: false,
                              }));
                            }}>No</div>
                        </label>
                      </div>
                    </div>
                  </div>
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
                  <Link to="/Yatchquotes" className="buttonactions">
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

export default Claimsexperience;
