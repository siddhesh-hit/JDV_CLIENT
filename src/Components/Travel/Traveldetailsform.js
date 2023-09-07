import React, { useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Travelbanner from "../Banner/Travelbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { UseMotorContext } from "../../MultiStepContextApi";

const Traveldetailsform = () => {
  const Progress = 20;
  const { travelsFormsData, settravelsFormsData } = UseMotorContext();
  const [nooftravel, setnooftravel] = useState([]);

  useEffect(() => {
    localStorage.setItem("travelsFormsDataLocation", window.location.pathname);
  }, []);

  useEffect(() => {
    localStorage.setItem("travelsFormsDataLocation", window.location.pathname);
    const nooftravel =
      travelsFormsData.no_of_travel == ""
        ? travelsFormsData.plan_type == "641d418b19807a3c58191f7f"
          ? ""
          : "365"
        : travelsFormsData.no_of_travel;
    setnooftravel(nooftravel);
  }, []);

  const handleDate = (date) => {
    settravelsFormsData((prev) => ({
      ...prev,
      start_date: date,
    }));

    settravelsFormsData((prev) => ({
      ...prev,
      end_date: new Date(
        date.getTime() +
          (travelsFormsData.no_of_travel - 1) * 24 * 60 * 60 * 1000
      ),
    }));

    localStorage.setItem("travelsFormsData", JSON.stringify(travelsFormsData));
  };

  const handleNextClick = () => {
    localStorage.setItem("travelsFormsData", JSON.stringify(travelsFormsData));
  };

  useEffect(() => {
    const time =
      new Date(travelsFormsData.start_date).getTime() +
      (travelsFormsData.no_of_travel - 1) * 24 * 60 * 60 * 1000;
    settravelsFormsData((prev) => ({
      ...prev,
      end_date: new Date(time),
    }));

    localStorage.setItem("travelsFormsData", JSON.stringify(travelsFormsData));
  }, [travelsFormsData]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("travelsFormsData"));
    if (stored) {
      settravelsFormsData(stored);
    }
  }, []);

  return (
    <div>
      <Header />
      <Travelbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12">
              <div className="row form_abcd">
                <h5>Date Of Travel</h5>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div class="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li>No of Travel Days</li>
                        </ul>
                        <div class="button-group-pills" data-toggle="buttons">
                          <div className="row">
                            <div className="col-lg-6 ">
                              <InputGroup className="mb-4 mt-2">
                                <Form.Control
                                  required
                                  placeholder="No Of Travel"
                                  value={nooftravel}
                                  onChange={(e) => {
                                    setnooftravel(e.target.value);
                                    settravelsFormsData((prevData) => ({
                                      ...prevData,
                                      no_of_travel: e.target.value,
                                    }));
                                    localStorage.setItem(
                                      "travelsFormsData",
                                      JSON.stringify(travelsFormsData)
                                    );
                                  }}
                                  disabled={
                                    travelsFormsData.plan_type !==
                                    "641d418b19807a3c58191f7f"
                                  }
                                />
                              </InputGroup>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <ul>
                          <li>Start Date</li>
                        </ul>
                        <InputGroup className="mb-5">
                          <InputGroup.Text id="basic-addon1">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <DatePicker
                            placeholderText="Enter date"
                            onChange={handleDate}
                            minDate={new Date()}
                            selected={new Date(travelsFormsData.start_date)}
                          />
                        </InputGroup>
                      </div>
                      <div className="col-lg-6">
                        <ul>
                          <li>End date</li>
                        </ul>
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>
                          </InputGroup.Text>
                          <DatePicker
                            placeholderText="Enter date"
                            // onChange={handleDate}
                            disabled
                            selected={new Date(travelsFormsData.end_date)}
                          />
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Traveldetails" className="buttonactions">
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link
                        to="/Travelplantype"
                        className="buttonactions"
                        onClick={handleNextClick}
                      >
                        Next
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
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

export default Traveldetailsform;
