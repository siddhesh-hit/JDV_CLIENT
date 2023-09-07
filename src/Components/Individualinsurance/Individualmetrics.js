import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";
import admin from "../../config";

const Individualmetrics = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
  } = UseMotorContext();
  const [emirates, setEmirates] = useState([]);
  const [visa, setVisa] = useState([]);
  const [salary, setSalary] = useState([]);

  const Progress = 30;
  const API = process.env.REACT_APP_BACKENDURL;

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
      emirates_id,
      visa_id,
      salary_id,
      height,
      weight,
    } = IndividualInsurance;

    const dataToSend = {
      name: full_name,
      email: email,
      phoneno: phone_number,
      date_of_birth: date,
      insuranceType: insurance_type,
      gender: gender,
      nationality: country,
      emirate_issuing_visa: emirates_id,
      visa_type: visa_id,
      salary: salary_id,
      hight: height,
      weight: weight,
    };

    await fetch(`${admin}/fillInsurancePlan`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((val) => console.log(val))
      .catch((err) => console.log(err));
  };

  const fetchData = async () => {
    await fetch(`${admin}/getEmirate`)
      .then((res) => res.json())
      .then((data) => setEmirates(data.data))
      .catch((e) => console.log(e));

    await fetch(`${admin}/getVisaTypes`)
      .then((res) => res.json())
      .then((data) => setVisa(data.data))
      .catch((e) => console.log(e));

    await fetch(`${admin}/getsalary`)
      .then((res) => res.json())
      .then((data) => setSalary(data.data))
      .catch((e) => console.log(e));
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

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
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <div className="col-lg-6">
                      <ul>
                        <li>Height</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <i
                            className="fa fa-text-height"
                            aria-hidden="true"
                          ></i>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="number"
                          name="height"
                          min={0}
                          onKeyDown={blockInvalidChar}
                          onInput={(e) => Math.abs(e.target.value)}
                          value={IndividualInsurance.height}
                          onChange={handleIndividualInsurance}
                          placeholder="Height (cm)"
                          aria-label="Height (cm)"
                        />
                      </InputGroup>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Weight</li>
                      </ul>
                      <InputGroup className="mb-4">
                        <InputGroup.Text id="basic-addon1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                          >
                            <path d="M128 176a128 128 0 1 1 256 0 128 128 0 1 1 -256 0zM391.8 64C359.5 24.9 310.7 0 256 0S152.5 24.9 120.2 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H391.8zM296 224c0-10.6-4.1-20.2-10.9-27.4l33.6-78.3c3.5-8.1-.3-17.5-8.4-21s-17.5 .3-21 8.4L255.7 184c-22 .1-39.7 18-39.7 40c0 22.1 17.9 40 40 40s40-17.9 40-40z" />
                          </svg>
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="number"
                          name="weight"
                          min={0}
                          onKeyDown={blockInvalidChar}
                          onInput={(e) => Math.abs(e.target.value)}
                          value={IndividualInsurance.weight}
                          onChange={handleIndividualInsurance}
                          placeholder="Weight (kg)"
                          aria-label="Weight (kg)"
                        />
                      </InputGroup>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Individualmetrics" className="buttonactions">
                        <i
                          className="fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                        Back
                      </Link>
                    </div>
                    {IndividualInsurance.emirates_id &&
                    IndividualInsurance.visa_id &&
                    IndividualInsurance.salary_id ? (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          to="/Individualinsurancequotes"
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

                            if (!IndividualInsurance.emirates_id) {
                              errorText = "Please select emirates";
                            } else if (!IndividualInsurance.visa_id) {
                              errorText = "Please select visa";
                            } else if (!IndividualInsurance.salary_id) {
                              errorText = "Please select salary";
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

export default Individualmetrics;
