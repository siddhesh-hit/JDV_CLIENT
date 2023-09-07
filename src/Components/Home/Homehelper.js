import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homebanner from "../Banner/Homebanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
const Homehelper = () => {
  // fetch the data from backend

  const [serverData, setServerData] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [ownerShipStatus, setOwnerShipStatus] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch all data sequentially using await
      const response1 = await fetch(`${admin}/getAllHomePlanTypes`);
      const response2 = await fetch(`${admin}/getAllHomePropertyTypes`);

      const response3 = await fetch(`${admin}/getAllHomeOwnershipStatus`);

      // Check if all responses are ok
      if (!response1.ok || !response2.ok || !response3.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse all responses
      const data1 = await response1.json();
      const data2 = await response2.json();
      const data3 = await response3.json();

      // Update state variables accordingly
      setServerData(data1.data);
      setPropertyType(data2.data);
      setOwnerShipStatus(data3.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Call the fetchData function in useEffect to fetch all data when the component mounts
  useEffect(() => {
    fetchData();
    // handleSubmit();
  }, []);

  // setting the data from homeInsurance context api

  const { HomeInsurance, setHomeInsurance } = UseMotorContext();

  const handleSelect = (name, e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = Number(rawValue).toLocaleString();

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
    // Set default values for property_type and ownership_status
    setHomeInsurance((prevState) => ({
      ...prevState,
      plan_type: serverData.length > 0 ? serverData[0]._id : null,
      property_type: propertyType.length > 0 ? propertyType[0]._id : null,
      ownership_status:
        ownerShipStatus.length > 0 ? ownerShipStatus[0]._id : null,
    }));
  }, [serverData, propertyType, ownerShipStatus]);

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
                  <div className="row">
                    <div className="col-lg-6">
                      <ul>
                        <li>Do you have any Claims in last 5 years ?</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <select
                          name="claim_status"
                          onChange={(e) => handleSelect("claim_status", e)}
                          value={HomeInsurance.claim_status}
                          className="form-control"
                        >
                          <option hidden>Select year</option>
                          <option value={0}>No</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Domestic Helper</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 radiohide mb-4">
                            {/* <InputGroup>
                              <Form.Control
                                required
                                type="text"
                                value={HomeInsurance.domestic_value}
                                onChange={(e) =>
                                  handleSelect("domestic_value", e)
                                }
                                placeholder="No. of Domestic helper"
                                aria-label="No. of Domestic helper"
                              />
                            </InputGroup> */}
                            <select
                              name="domestic_value"
                              onChange={(e) =>
                                handleSelect("domestic_value", e)
                              }
                              value={HomeInsurance.domestic_value}
                              className="form-control"
                            >
                              <option hidden>No. of Domestic helper</option>
                              <option value={0}>No</option>
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                              <option value={9}>9</option>
                              <option value={10}>10</option>
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
                      <Link to="/Homevalue" className="buttonactions">
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
                        to="/Homepersonaldetails"
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

export default Homehelper;
