import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homebanner from "../Banner/Homebanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";

const Homeinsurance = () => {
  // fetch the data from backend
  const { HomeInsurance, setHomeInsurance, handleHomeInsurance } =
    UseMotorContext();
  const [serverData, setServerData] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [ownerShipStatus, setOwnerShipStatus] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch all data sequentially using await
      const response1 = await fetch(
        "https://lmpapi.handsintechnology.in/api/getAllHomePlanTypes"
      );
      const response2 = await fetch(
        "https://lmpapi.handsintechnology.in/api/getAllHomePropertyTypes"
      );
      const response3 = await fetch(
        "https://lmpapi.handsintechnology.in/api/getAllHomeOwnershipStatus"
      );

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

  useEffect(() => {
    fetchData();
  }, []);

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
      property_type:
        HomeInsurance.property_type === null
          ? propertyType.length > 0 && propertyType[0]._id
          : HomeInsurance.property_type,
      ownership_status:
        HomeInsurance.ownership_status === null
          ? ownerShipStatus.length > 0 && ownerShipStatus[0]._id
          : HomeInsurance.ownership_status,
      claim_status: 1,
    }));
  }, [propertyType, ownerShipStatus]);

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
                    <div className="col-lg-6">
                      <ul>
                        <li>Property Type</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          {propertyType.length === 0 ? (
                            <div>No property type available</div>
                          ) : (
                            propertyType.map((property) => (
                              <div
                                className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4"
                                key={property._id}
                              >
                                <label
                                  name="property_type"
                                  className={`btn btn-default ${HomeInsurance.property_type === property._id
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={(e) =>
                                    handleHomeInsurance(
                                      e,
                                      property._id,
                                      "property_type"
                                    )
                                  }
                                >
                                  <input
                                    type="radio"
                                    name="property_type"
                                    defaultChecked={
                                      HomeInsurance.property_type ===
                                      property._id
                                    }
                                    value={property._id}
                                  />
                                  {property.home_property_type}
                                </label>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>Ownership Status</li>
                      </ul>
                      <div className="button-group-pills" data-toggle="buttons">
                        <div className="row">
                          {ownerShipStatus.length === 0 ? (
                            <div>No ownership Status available</div>
                          ) : (
                            ownerShipStatus.map((owner) => (
                              <div
                                className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4"
                                key={owner._id}
                              >
                                <label
                                  name="ownership_status"
                                  className={`btn btn-default ${HomeInsurance.ownership_status === owner._id
                                    ? "active"
                                    : ""
                                    }`}
                                  onClick={(e) =>
                                    handleHomeInsurance(
                                      e,
                                      owner._id,
                                      "ownership_status"
                                    )
                                  }
                                >
                                  <input
                                    type="radio"
                                    name="ownership_status"
                                    defaultChecked={
                                      HomeInsurance.ownership_status ===
                                      owner._id
                                    }
                                    value={owner._id}
                                  />
                                  {owner.home_owner_type}
                                </label>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
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
                        to="/Homeplan"
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

export default Homeinsurance;
