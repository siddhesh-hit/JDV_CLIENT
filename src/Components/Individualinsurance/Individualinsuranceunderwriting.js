import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
const Individualinsurancepersonaldetails5 = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
  } = UseMotorContext();
  const [underWriting, setUnderWriting] = useState([]);
  const [arr, setArr] = useState([]);
  const [visited, setVisited] = useState(false);

  const Progress = 30;
  const API = process.env.REACT_APP_BACKENDURL;

  const fetchData = async () => {
    await fetch(`${admin}/getAllUnderwritingConditions`)
      .then((e) => e.json())
      .then((res) => setUnderWriting(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!visited) {
      const beforeOnLoad = underWriting.map((val) => ({
        _id: val._id,
        value: false,
      }));
      setArr(beforeOnLoad);
      setIndividualInsurance((prev) => ({
        ...prev,
        general_condition: arr,
        general_condition_visit: false,
      }));
      localStorage.setItem(
        "IndividualInsurance",
        JSON.stringify(IndividualInsurance)
      );
    } else {
      const stored = JSON.parse(localStorage.getItem("IndividualInsurance"));
      if (stored) {
        setArr(stored.general_condition);
      }
    }
  }, [underWriting]);

  const handlePush = (e, id, bool) => {
    const include = arr.findIndex((val) => val._id === id);
    if (include === -1) {
      setArr((prev) => [
        ...prev,
        {
          _id: id,
          value: bool,
        },
      ]);
    } else {
      setArr((prev) => {
        const newArr = [...prev];
        newArr[include].value = bool;
        return newArr;
      });
    }
    setVisited(true);
    setIndividualInsurance((prev) => ({
      ...prev,
      general_condition: arr,
      general_condition_visit: true,
    }));
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  };

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
      symptom_condition,
      general_condition,
      maternity_condition,
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
      medical_symptopm: symptom_condition,
      medical_under_condition: general_condition,
      medical_maternity: maternity_condition,
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

  const conditionCheck = (id, value) => {
    const condition = IndividualInsurance.general_condition.find(
      (val) => val._id === id
    );
    return condition ? condition.value === value : false;
  };

  useEffect(() => {
    setIndividualInsurance((prev) => ({
      ...prev,
      general_condition: arr,
    }));
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [arr, setIndividualInsurance]);

  useEffect(() => {
    const stored = localStorage.getItem("IndividualInsurance");
    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
      setArr(JSON.parse(stored).general_condition || []);
      setVisited(JSON.parse(stored).general_condition_visit);
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
                  <ul className="mb-3" style={{ paddingLeft: "5px" }}>
                    <li style={{ listStyleType: "none", fontWeight: "bolder" }}>
                      General Underwriting:
                    </li>
                  </ul>
                  <div className="row">
                    {underWriting.length > 0 &&
                      underWriting.map((underwrite) => (
                        <div className="col-lg-6" key={underwrite._id}>
                          <ul style={{ paddingLeft: "0px" }}>
                            <li>{underwrite.condition}</li>
                          </ul>
                          <div
                            className="button-group-pills"
                            data-toggle="buttons"
                          >
                            <div className="row">
                              <div className="col-lg-6 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                                <label
                                  className={`btn btn-default ${
                                    conditionCheck(underwrite._id, true)
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`options-${underwrite._id}`}
                                    defaultChecked={conditionCheck(
                                      underwrite._id,
                                      true
                                    )}
                                  />
                                  <div
                                    onClick={(e) =>
                                      handlePush(e, underwrite._id, true)
                                    }
                                  >
                                    Yes
                                  </div>
                                </label>
                              </div>
                              <div className="col-lg-6 col-md-4 col-sm-4 col-xs-6 radiohide mb-3">
                                <label
                                  className={`btn btn-default ${
                                    conditionCheck(underwrite._id, false)
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`options-${underwrite._id}`}
                                    defaultChecked={conditionCheck(
                                      underwrite._id,
                                      false
                                    )}
                                  />
                                  <div
                                    onClick={(e) =>
                                      handlePush(e, underwrite._id, false)
                                    }
                                  >
                                    No
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link
                        to="/Individualinsurancematernity"
                        className="buttonactions"
                      >
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
                        to="/Individualinsurancequote"
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

export default Individualinsurancepersonaldetails5;
