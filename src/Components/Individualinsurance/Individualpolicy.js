import React, { useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import { useEffect } from "react";
import swal from "sweetalert";
import admin from "../../config";

const Individualpolicy = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
    handleIndividualPhoneChange,
  } = UseMotorContext();
  const [formCheck, setFormCheck] = useState(null);
  const navigate = useNavigate();
  const Progress = 30;

  useEffect(() => {
    const stored = localStorage.getItem("IndividualInsurance");
    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [IndividualInsurance]);

  const handleIndividualDate = (date) => {
    setIndividualInsurance((prevState) => ({
      ...prevState,
      expiry_date: date,
    }));
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  };

  const handlePush = (e, bool) => {
    if (bool === false) {
      setFormCheck(false);
      navigate("/Individualinsurancepersonaldetails");
    } else {
      setFormCheck(true);
    }
  };

  return (
    <div>
      <Header />
      <Individualmedicalbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <div className="row">
                    <ul style={{ paddingLeft: "0px" }}>
                      <li style={{ listStyle: "none", fontWeight: "bolder" }}>
                        Do you have an active medical policy in UAE ?
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-12 mb-4">
                    <ul style={{ paddingLeft: "0px" }}></ul>
                    <div className="button-group-pills" data-toggle="buttons">
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                          <label className={`btn btn-default`}>
                            <input type="radio" name={`options`} />
                            <div onClick={(e) => handlePush(e, true)}>Yes</div>
                          </label>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                          <label className={`btn btn-default`}>
                            <input type="radio" name={`options`} />
                            <div onClick={(e) => handlePush(e, false)}>No</div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {formCheck ? (
                    <>
                      <div className="col-lg-6">
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <i className="fa fa-user" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            name="current_insurer"
                            value={IndividualInsurance.current_insurer}
                            onChange={handleIndividualInsurance}
                            required
                            placeholder="Current Insurer"
                            aria-label="Current Insurer"
                          />
                        </InputGroup>
                      </div>
                      <div className="col-lg-6">
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>
                          </InputGroup.Text>
                          <DatePicker
                            placeholderText="Expiry date"
                            className="form-control"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            selected={
                              IndividualInsurance.expiry_date
                                ? new Date(IndividualInsurance?.expiry_date)
                                : null
                            }
                            onChange={(startDate) => {
                              handleIndividualDate(startDate);
                            }}
                            // maxDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            showTimeSelect={false}
                          />
                        </InputGroup>
                      </div>
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        {IndividualInsurance.expiry_date &&
                        IndividualInsurance.current_insurer ? (
                          <Link
                            to="/Individualinsurancepersonaldetails"
                            className="buttonactions"
                          >
                            Next
                            <i
                              className="fa fa-chevron-right"
                              aria-hidden="true"
                            ></i>
                          </Link>
                        ) : (
                          <div
                            className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                            style={{ textAlign: "right" }}
                          >
                            <Link
                              className="buttonactions"
                              onClick={() => {
                                let errorText = "";

                                if (!IndividualInsurance.current_insurer) {
                                  errorText = "Please fill the current_insurer";
                                } else if (!IndividualInsurance.expiry_date) {
                                  errorText = "Please Enter Your expiry date";
                                }

                                if (errorText) {
                                  swal({
                                    title: "Error!",
                                    text: errorText,
                                    icon: "error",
                                  });
                                }
                              }}
                            >
                              Next
                              <i
                                className="fa fa-chevron-right"
                                aria-hidden="true"
                              ></i>
                            </Link>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <div className="row">
                    {/* <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/" className="buttonactions">
                        <i
                          className="fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link
                        to="/Individualinsurancepersonaldetails"
                        className="buttonactions"
                      >
                        Next
                        <i
                          className="fa fa-chevron-right"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Individualpolicy;
