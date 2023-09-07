import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homebanner from "../Banner/Homebanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";

const Homevalue = () => {
  // fetch the data from backend
  const { HomeInsurance, setHomeInsurance, handleHomeInsurance } =
    UseMotorContext();

  const handleSelect = (name, e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = Number(rawValue).toLocaleString();

    if (formattedValue === "NaN") {
      formattedValue = ""; // Handle NaN input (e.g., empty input)
    }

    setHomeInsurance((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));

    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };

  useEffect(() => {
    const storedData = localStorage.getItem("HomeInsurance");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setHomeInsurance(parsedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);

  return (
    <div>
      <Header />
      <Homebanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <h5
            className="gheading"
            style={{ color: "#F43130", lineHeight: "15px" }}
          >
            Discount % should be reduced
          </h5>
          <h5 className="gheading mb-4">Insurance your home instantly</h5>
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  {HomeInsurance.plan_type === "642279d4fb67d39380fef82d" ? (
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li>Building Value</li>
                        </ul>
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  value={HomeInsurance.building_value}
                                  onChange={(e) =>
                                    handleSelect("building_value", e)
                                  }
                                  required
                                  placeholder="Building value"
                                  aria-label="Building value"
                                />
                              </InputGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : HomeInsurance.plan_type === "642279f2fb67d39380fef834" ? (
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li>Content Value</li>
                        </ul>
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  value={HomeInsurance.content_value}
                                  onChange={(e) =>
                                    handleSelect("content_value", e)
                                  }
                                  required
                                  placeholder="Content Value"
                                  aria-label="Content Value"
                                />
                              </InputGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <ul>
                          <li>Personal belonging Value</li>
                        </ul>
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  value={
                                    HomeInsurance.personal_belongings_value
                                  }
                                  onChange={(e) =>
                                    handleSelect("personal_belongings_value", e)
                                  }
                                  required
                                  placeholder="Personal belongings value"
                                  aria-label="Personal belongings value"
                                />
                              </InputGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li>Content Value</li>
                        </ul>
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  value={HomeInsurance.content_value}
                                  onChange={(e) =>
                                    handleSelect("content_value", e)
                                  }
                                  required
                                  placeholder="Content Value"
                                  aria-label="Content Value"
                                />
                              </InputGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <ul>
                          <li>Building Value</li>
                        </ul>
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  value={HomeInsurance.building_value}
                                  onChange={(e) =>
                                    handleSelect("building_value", e)
                                  }
                                  required
                                  placeholder="Building value"
                                  aria-label="Building value"
                                />
                              </InputGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <ul>
                          <li>Personal belonging Value</li>
                        </ul>
                        <div
                          className="button-group-pills"
                          data-toggle="buttons"
                        >
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                              <InputGroup>
                                <Form.Control
                                  type="text"
                                  value={
                                    HomeInsurance.personal_belongings_value
                                  }
                                  onChange={(e) =>
                                    handleSelect("personal_belongings_value", e)
                                  }
                                  required
                                  placeholder="Personal belongings value"
                                  aria-label="Personal belongings value"
                                />
                              </InputGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Homeplan" className="buttonactions">
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
                        to="/Homehelper"
                        className="buttonactions"
                        // onClick={handleSubmit}
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
      <Insurancedetails />
      <Footer />
    </div>
  );
};

export default Homevalue;
