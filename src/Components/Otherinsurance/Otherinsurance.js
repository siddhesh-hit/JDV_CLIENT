import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Otherbanner from "../Banner/Otherbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";

const Otherinsurance = () => {
  const { OtherInsurance, setOtherInsurance, handleOtherInsurance } =
    UseMotorContext();
  const [otherInsuranceOption, setOtherInsuranceOption] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const dayOption = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    " Saturday",
    "Sunday",
  ];
  const API = process.env.REACT_APP_BACKENDURL || "https://lmpapi.handsintechnology.in/api/";

  const handleOtherInsuranceOption = async () => {
    await fetch(`${API}/otherInsurance`)
      .then((res) => res.json())
      .then((res) => setOtherInsuranceOption(res.data))
      .catch((err) => console.log(err));
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    setOtherInsurance({ ...OtherInsurance, prefer_day_to_call: date });
    localStorage.setItem("OtherInsurance", JSON.stringify(OtherInsurance));
  };

  const handleSubmit = async () => {
    console.log("run check");
    const {
      other_insurance_option,
      full_name,
      email,
      age,
      phone_number,
      brief_info,
      prefer_day_to_call,
      prefer_time_to_call,
      insuranceType,
    } = OtherInsurance;

    const dataToSend = {
      insuranceType: insuranceType,
      name: full_name,
      email: email,
      phoneno: phone_number,
      age: age,
      call_time: prefer_time_to_call,
      call_date: prefer_day_to_call,
      brief_information: brief_info,
      other_insurance_name: other_insurance_option,
    };

    await fetch(`${API}/fillInsurancePlan`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleOtherInsuranceOption();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("OtherInsurance");
    if (stored) {
      setOtherInsurance(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("OtherInsurance", JSON.stringify(OtherInsurance));
  }, [OtherInsurance]);

  return (
    <div>
      <Header />
      <Otherbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 nopadding">
              <h3 className="mb-4">
                Please select the Insurance Type From below Drop down Menu
              </h3>
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6">
                      <ul>
                        <li>Full Name</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="name"
                          name="full_name"
                          onChange={handleOtherInsurance}
                          value={OtherInsurance.full_name}
                          placeholder="Full Name"
                          aria-label="Full Name"
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Email</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          name="email"
                          type="email"
                          value={OtherInsurance.email}
                          onChange={handleOtherInsurance}
                          placeholder="Email ID"
                          aria-label="Email ID"
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Age</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-phone" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          name="age"
                          type="number"
                          onChange={handleOtherInsurance}
                          value={OtherInsurance.age}
                          required
                          placeholder="Age"
                          aria-label="Age"
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Phone Number</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i className="fa fa-phone" aria-hidden="true"></i>
                        </InputGroup.Text>
                        <Form.Control
                          name="phone_number"
                          type="number"
                          onChange={handleOtherInsurance}
                          value={OtherInsurance.phone_number}
                          required
                          placeholder="Phone Number"
                          aria-label="Phone Number"
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Other insurance Option</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <select
                          id="ohter"
                          name="other_insurance_option"
                          onChange={handleOtherInsurance}
                          value={OtherInsurance.other_insurance_option}
                          className="form-control"
                          placeholder="Other insurance Option"
                        >
                          <option hidden>Other insurance Option</option>
                          {otherInsuranceOption &&
                            otherInsuranceOption.map((val) => (
                              <option value={val._id}>{val.insurance_name}</option>
                            ))}
                        </select>
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Brief Information</li>
                      </ul>
                      <textarea
                        name="brief_info"
                        onChange={handleOtherInsurance}
                        value={OtherInsurance.brief_info}
                        className="form-control mb-4"
                        placeholder="Brief Information"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Select a day</li>
                      </ul>
                      <InputGroup className="">
                        <select
                          name="prefer_day_to_call"
                          onChange={handleOtherInsurance}
                          // value={OtherInsurance.other_insurance_option}
                          className="form-control"
                          placeholder="Prefer Day to Call"
                        >
                          <option hidden>Prefer Day to Call</option>
                          {dayOption &&
                            dayOption.map((val) => (
                              <option key={val.id} value={val}>
                                {val}
                              </option>
                            ))}
                        </select>
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Select a Time</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <Form.Control
                          id="form11"
                          name="prefer_time_to_call"
                          type="time"
                          onFocus={(e) => {
                            const inputDateElement =
                              document.querySelector('input[type="time"]');
                            inputDateElement.showPicker();
                          }}
                          onChange={handleOtherInsurance}
                          value={OtherInsurance.date}
                          required
                          placeholderText="Prefer Time to Call"
                          aria-label="Prefer Time to Call"
                        />
                      </InputGroup>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link
                        to="/Otherinsurancesubmit"
                        className="buttonactions"
                        onClick={handleSubmit}
                      >
                        Next
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                      </Link>
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

export default Otherinsurance;
