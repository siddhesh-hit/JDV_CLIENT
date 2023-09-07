import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homebanner from "../Banner/Homebanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, InputGroup, ProgressBar } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
const Homecondition = () => {
  // fetch the data from backend

  const [serverData, setServerData] = useState([]);

  const handleFetch = async () => {
    try {
      const response = await fetch(`${admin}/getAllHomeConditions`)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setServerData(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  // fetch data from store local storage

  const Progress = 80;

  const { HomeInsurance, setHomeInsurance } = UseMotorContext();

  // for condition

  const [arr, setArr] = useState([]);
  useEffect(() => {
    // Update the HomeInsurance whenever arr state changes
    setHomeInsurance((prevState) => ({
      ...prevState,
      home_condition: arr,
    }));
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [arr, setHomeInsurance]);

  const handlePush = (val, id, value) => {
    // Check if the _id already exists in the array
    const existingIndex = arr.findIndex((item) => item._id === id);

    // If the _id exists, update the existing entry; otherwise, add a new entry
    if (existingIndex !== -1) {
      setArr((prevArr) => {
        const newArr = [...prevArr];
        newArr[existingIndex].value = value; // Update the existing entry's value
        return newArr;
      });
    } else {
      setArr((prevArr) => [
        ...prevArr,
        {
          _id: id,
          value: value, // Add a new entry
        },
      ]);
    }

    setHomeInsurance((prevState) => ({
      ...prevState,
      [val]: arr,
    }));
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };

  const isHomeConditionChecked = (id, value) => {
    const entry = arr.find((item) => item._id === id);

    // If entry exists and the value matches, return true (checked), else return false (unchecked)
    return entry ? entry.value === value : false;
  };

  // for submitting the data

  const handleSubmit = async () => {
    const localStorageItem = localStorage.getItem("HomeInsurance");

    const data = JSON.parse(localStorageItem);

    const {
      property_type,
      ownership_status,
      plan_type,
      content_value,
      building_value,
      personal_belongings_value,
      claim_status,
      domestic_value,
      full_name,
      email,
      insurance_type,
      phone_number,
      date,
      address,
      country,
      home_condition,
    } = data;

    const dataToSend = {
      name: full_name,
      email: email,
      phoneno: phone_number,
      date_of_birth: date,
      insuranceType: "Home",
      home_property_type: property_type,
      home_ownership_status: ownership_status,
      home_plan_type: plan_type,
      home_claim_years: claim_status,
      homeAddress: address,
      home_condition: home_condition,
      content_value: content_value,
      building_value: building_value,
      personal_belongings_value: personal_belongings_value,
      domestic_value: domestic_value,
    };
    // console.log("data to send to the post", dataToSend);

    await fetch(`${admin}/fillInsurancePlan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("API Response:", responseData);
        setHomeInsurance((prevState) => ({
          ...prevState,
          updatePolicy_id: responseData.data._id,
          lead_id: responseData.data.lead_id,
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("HomeInsurance");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setArr(parsedData.home_condition || []);
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
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    {serverData.length === 0 ? (
                      <div>No data available</div>
                    ) : (
                      serverData.slice(0, 5).map((data) => (
                        <div className="col-lg-6" key={data._id}>
                          <ul>
                            <li className="homecondtext">{data.home_condition_label}</li>
                          </ul>
                          <div
                            className="button-group-pills"
                            data-toggle="buttons"
                          >
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                                <label
                                  className={`btn btn-default ${isHomeConditionChecked(data._id, "False")
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name={`options-${data._id}`}
                                    defaultChecked={isHomeConditionChecked(
                                      data._id,
                                      "False"
                                    )}
                                  />
                                  <div
                                    onClick={() =>
                                      handlePush(
                                        "home_condition",
                                        data._id,
                                        "False"
                                      )
                                    }
                                  >
                                    No
                                  </div>
                                </label>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-4 col-xs-6 radiohide mb-4">
                                <label
                                  className={`btn btn-default ${isHomeConditionChecked(data._id, "True")
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name={`options-${data._id}`}
                                    defaultChecked={isHomeConditionChecked(
                                      data._id,
                                      "True"
                                    )}
                                  />
                                  <div
                                    onClick={() =>
                                      handlePush(
                                        "home_condition",
                                        data._id,
                                        "True"
                                      )
                                    }
                                  >
                                    Yes
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Homepersonaldetails" className="buttonactions">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link
                        to="/Homecondition2"
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

export default Homecondition;
