import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";
import { ArrayofBusinesstypes } from "../../functions";
const Personaldetails = () => {
  // Validate Email Id
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const {
    motorFormsData,
    handleBeforeUnload,
    HandleSubmitMotorFormdata,
    handleSubmitMotorform,
  } = UseMotorContext();
  useEffect(() => {
    if (motorFormsData?.email) {
      localStorage.setItem(`clientemail`, motorFormsData?.email);
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const isDateOfBirth19YearsOld = (dateOfBirth) => {
    const currentDate = new Date();
    const dob = new Date(dateOfBirth);
    const nineteenYearsAgo = new Date(currentDate);
    nineteenYearsAgo.setFullYear(nineteenYearsAgo.getFullYear() - 18);
    return dob <= nineteenYearsAgo;
  };
  const checkCondition = () => {
    let errorMessage = "";
    if (!motorFormsData.name) {
      errorMessage = "Please Enter Your Name";
    } else if (
      !motorFormsData?.email ||
      !emailRegex.test(motorFormsData.email)
    ) {
      errorMessage = "Please Enter a Valid Email";
    } else if (!motorFormsData?.phoneno) {
      errorMessage = "Please Enter a Valid Phone Number";
    } else if (!motorFormsData.date_of_birth || !motorFormsData.business_type) {
      errorMessage =
        motorFormsData.policy_id === "645102bba95bd184969066b2"
          ? "Please Select Business Type"
          : "Please Enter Your Date of Birth";
    }
    if (errorMessage) {
      swal({
        title: errorMessage,
        text: "",
        type: "warning",
        icon: "warning",
      });
    } else {
      // Proceed to the next step
      // Add your logic here to move to the next step or perform other actions
    }
  };
  const handlePhoneChange = (value) => {
    handleSubmitMotorform("phoneno", value);
  };
  const handleStartDate = (date) => {
    handleSubmitMotorform("date_of_birth", date);
  };
  const handleChange = (e) => {
    console.log(e.target);
    handleSubmitMotorform(e.target.name, e.target.value);
  };
  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <ul style={{ paddingLeft: "0px" }}>
                    <li style={{ listStyle: "none" }}>
                      Please fill your details :
                    </li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6">
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i class="fa fa-user" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          value={
                            motorFormsData?.name ? motorFormsData?.name : null
                          }
                          name="name"
                          onChange={handleChange}
                          placeholder={
                            motorFormsData.policy_id !==
                              "645102bba95bd184969066b2"
                              ? "Full Name"
                              : "Name of Company"
                          }
                          aria-label={
                            motorFormsData.policy_id !==
                              "645102bba95bd184969066b2"
                              ? "Full Name"
                              : "Name of Company"
                          }
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i class="fa fa-envelope-o" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          value={
                            motorFormsData?.email ? motorFormsData?.email : null
                          }
                          name="email"
                          onChange={handleChange}
                          placeholder={
                            motorFormsData.policy_id !==
                              "645102bba95bd184969066b2"
                              ? "Email Id"
                              : "Email of Contact person"
                          }
                          aria-label={
                            motorFormsData.policy_id !==
                              "645102bba95bd184969066b2"
                              ? "Email of Contact person"
                              : "Email Id"
                          }
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <PhoneInput
                        placeholder={
                          motorFormsData.policy_id !==
                            "645102bba95bd184969066b2"
                            ? "Phone Number"
                            : "Phone number of Contact Person"
                        }
                        international
                        className="form-control"
                        defaultCountry="AE"
                        value={motorFormsData.phoneno} // Use motorFormsData.phoneno instead of value
                        onChange={handlePhoneChange}
                      />
                    </div>
                    {motorFormsData.policy_id !== "645102bba95bd184969066b2" ? (
                      <div className="col-lg-6">
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <DatePicker
                            placeholderText="Date Of Birth"
                            className="form-control"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            selected={motorFormsData.date_of_birth?new Date(motorFormsData?.date_of_birth):null
                            }
                            onChange={(startDate) => {
                              handleStartDate(startDate);
                            }}
                            maxDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            showTimeSelect={false}
                          />
                        </InputGroup>
                      </div>
                    ) : (
                      <div className="col-lg-6">
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 640 512"
                            >
                              {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                              <path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 352h8.2c32.3-39.1 81.1-64 135.8-64c5.4 0 10.7 .2 16 .7V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM320 352H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H360.2C335.1 449.6 320 410.5 320 368c0-5.4 .2-10.7 .7-16l-.7 0zm320 16a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zM496 288c8.8 0 16 7.2 16 16v48h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H496c-8.8 0-16-7.2-16-16V304c0-8.8 7.2-16 16-16z" />
                            </svg>
                          </InputGroup.Text>
                          <select
                            className="form-control"
                            onChange={handleChange}
                            id="businessType"
                            name="business_type"
                          >
                            {ArrayofBusinesstypes &&
                              ArrayofBusinesstypes.length > 0 ? (
                              <>
                                {ArrayofBusinesstypes.map((v, i) => {
                                  return (
                                    <option
                                      selected={
                                        v === motorFormsData.business_type
                                          ? v
                                          : i === 0
                                      }
                                      value={v}
                                    >
                                      {v}
                                    </option>
                                  );
                                })}
                              </>
                            ) : (
                              <></>
                            )}
                          </select>
                        </InputGroup>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <a
                        href
                        onClick={() => {
                          if (
                            motorFormsData.email &&
                            emailRegex.test(motorFormsData.email)
                          ) {
                            HandleSubmitMotorFormdata();
                          }
                        }}
                      >
                        <Link to="/Carspecification" className="buttonactions">
                          <i class="fa fa-chevron-left" aria-hidden="true"></i>
                          Back
                        </Link>
                      </a>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      {(motorFormsData.email &&
                        motorFormsData.name &&
                        motorFormsData?.date_of_birth) ||
                        (motorFormsData.business_type !== "" &&
                          emailRegex.test(motorFormsData.email)) ? (
                        <a onClick={HandleSubmitMotorFormdata}>
                          <Link to="/Nationality" className="buttonactions">
                            Next{" "}
                            <i
                              className="fa fa-chevron-right"
                              aria-hidden="true"
                            ></i>
                          </Link>
                        </a>
                      ) : (
                        <Link
                          onClick={checkCondition}
                          className="buttonactions"
                        >
                          Next{" "}
                          <i
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      )}
                    </div>
                  </div>
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
export default Personaldetails;