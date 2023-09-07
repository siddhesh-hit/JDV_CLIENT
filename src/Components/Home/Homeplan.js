import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homebanner from "../Banner/Homebanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";

const Homeplan = () => {
  // fetch the data from backend
  const { HomeInsurance, setHomeInsurance, handleHomeInsurance } =
    UseMotorContext();
  const [serverData, setServerData] = useState([]);

  const fetchData = async () => {
    try {
      const response1 = await fetch(
        "https://lmpapi.handsintechnology.in/api/getAllHomePlanTypes"
      );
      if (!response1.ok) {
        throw new Error("Network response was not ok");
      }
      const data1 = await response1.json();
      setServerData(data1.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("HomeInsurance");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log(parsedData, "check");
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
          <h5 className="gheading" style={{ color: "#F43130", lineHeight: "15px" }}>
            Discount % should be reduced
          </h5>
          <h5 className="gheading mb-4">Insurance your home instantly</h5>
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <div className="col-lg-8">
                      <ul>
                        <li>Plan Type</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                            <select
                              name="plan_type"
                              onChange={handleHomeInsurance}
                              value={HomeInsurance.plan_type}
                              className="form-control"
                            >
                              <option hidden>Select your home plan</option>
                              {serverData.length === 0 ? (
                                <option value="">No options available</option>
                              ) : (
                                serverData.map((val) => (
                                  <option key={val._id} value={val._id}>
                                    {val.home_plan_type}
                                  </option>
                                ))
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                  <Link to="/Homeinsurance" className="buttonactions">
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    Back
                  </Link>
                </div>
                <div
                  className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                  style={{ textAlign: "right" }}
                >
                  <Link
                    to="/Homevalue"
                    className="buttonactions"
                  // onClick={handleSubmit}
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

export default Homeplan;
