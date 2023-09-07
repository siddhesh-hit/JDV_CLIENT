import React, { useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import { useEffect } from "react";
import swal from "sweetalert";
import admin from "../../config";

const Individualinsurancepersonaldetails = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
    handleIndividualDate,
    handleIndividualPhoneChange,
  } = UseMotorContext();
  const [country, setCountry] = useState([]);
  const Progress = 30;
  const API = process.env.REACT_APP_BACKENDURL;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    // console.log("chcek");
    const {
      full_name,
      email,
      phone_number,
      date,
      gender,
      country,
      insurance_type,
    } = IndividualInsurance;

    const dataToSend = {
      name: full_name,
      email: email,
      phoneno: phone_number,
      date_of_birth: date,
      insuranceType: insurance_type,
      gender: gender,
      nationality: country,
    };

    await fetch(`${admin}/fillInsurancePlan`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((val) => {
        console.log(val);
        setIndividualInsurance((prevState) => ({
          ...prevState,
          updatePolicy_id: val.data._id,
          lead_id: val.data.lead_id,
        }));
      })
      .catch((err) => console.log(err));
  };

  const fetchData = async () => {
    await fetch(`${admin}/getAllCountries`)
      .then((res) => res.json())
      .then((data) => setCountry(data.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                      <li style={{ listStyle: "none" }}>
                        Please fill in the insured’s details :
                      </li>
                    </ul>
                    <div className="col-lg-6">
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="full_name"
                          value={IndividualInsurance.full_name}
                          onChange={handleIndividualInsurance}
                          required
                          placeholder="Full Name"
                          aria-label="Full Name"
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i
                            className="fa fa-envelope-o"
                            aria-hidden="true"
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="email"
                          name="email"
                          value={IndividualInsurance.email}
                          onChange={handleIndividualInsurance}
                          placeholder="Email ID"
                          aria-label="Email ID"
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <InputGroup className="mb-4">
                        {/* <Form.Control
                          required
                          type="number"
                          name="phone_number"
                          value={IndividualInsurance.phone_number}
                          onChange={handleIndividualInsurance}
                          placeholder="Phone Number"
                          aria-label="Phone Number"
                        /> */}

                        <PhoneInput
                          international
                          className="form-control"
                          defaultCountry="AE"
                          value={IndividualInsurance.phone_number}
                          onChange={handleIndividualPhoneChange}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-calendar" aria-hidden="true"></i>
                        </InputGroup.Text>
                        {/* <Form.Control
                          required
                          type="date"
                          name="date"
                          value={IndividualInsurance.date}
                          onChange={handleIndividualInsurance}
                          placeholder="Date"
                          aria-label="Date"
                        /> */}

                        <DatePicker
                          placeholderText="Date Of Birth"
                          className="form-control"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          selected={
                            IndividualInsurance.date
                              ? new Date(IndividualInsurance?.date)
                              : null
                          }
                          onChange={(startDate) => {
                            handleIndividualDate(startDate);
                          }}
                          maxDate={new Date()}
                          dateFormat="dd/MM/yyyy"
                          showTimeSelect={false}
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <select
                          className="form-control"
                          name="gender"
                          value={IndividualInsurance.gender}
                          onChange={handleIndividualInsurance}
                        >
                          <option hidden>Gender</option>
                          <option value={"Male"}>Male</option>
                          <option value={"Female (Single)"}>
                            Female (Single)
                          </option>
                          <option value={"Female (Married)"}>
                            Female (Married)
                          </option>
                        </select>
                      </InputGroup>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Individualpolicy" className="buttonactions">
                        <i
                          className="fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                        Back
                      </Link>
                    </div>
                    {IndividualInsurance.email &&
                    IndividualInsurance.full_name &&
                    IndividualInsurance.phone_number &&
                    IndividualInsurance.gender &&
                    emailRegex.test(IndividualInsurance.email) ? (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          to="/Individualcountry"
                          className="buttonactions"
                          onClick={handleSubmit}
                        >
                          Next
                          <i
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    ) : (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          className="buttonactions"
                          onClick={() => {
                            let errorText = "";

                            if (!IndividualInsurance.full_name) {
                              errorText = "Please Enter Your Name";
                            } else if (
                              !IndividualInsurance?.email ||
                              !emailRegex.test(IndividualInsurance?.email)
                            ) {
                              errorText = "Please Enter a Valid Email";
                            } else if (!IndividualInsurance.gender) {
                              errorText = "Please enter an option gender";
                            } else if (!IndividualInsurance.phone_number) {
                              errorText = "Please enter a phone number";
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

export default Individualinsurancepersonaldetails;
