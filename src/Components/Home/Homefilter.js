import "../../App.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Form, Button, InputGroup } from "react-bootstrap";
import admin from "../../config";
import { UseMotorContext } from "../../MultiStepContextApi";
import { useLocation } from "react-router-dom";
import PhoneInput from "react-phone-number-input";

const Homefilter = () => {
  const {
    HomeInsurance,
    setHomeInsurance,
    handleHomeInsurance,
    handleHomeDate,
    handleHomePhoneChange,
  } = UseMotorContext();
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [serverData, setServerData] = useState([]);

  const location = useLocation().pathname;
  const localStorageItem = localStorage.getItem("HomeInsurance");
  const homeInfo = JSON.parse(localStorageItem);

  const fetchData = async () => {
    const homeInsurance = localStorage.getItem("HomeInsurance");
    if (homeInsurance) {
      const parsedData = JSON.parse(homeInsurance);
      setData([parsedData]);
    }

    await fetch(`${admin}/getAllCountries`)
      .then((res) => res.json())
      .then((data) => setServerData(data.data))
      .catch((e) => console.log(e));
  };

  // onclick update

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleSubmit = async () => {
    console.log("working the sub");

    const { full_name, email, phone_number, date, country } = homeInfo;

    const dataToSend = {
      name: full_name,
      email: email,
      phoneno: phone_number,
      date_of_birth: date,
      insuranceType: "Home",
    };
    console.log("data to send to the post", dataToSend);

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
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setUpdate(false);
  };

  // event update

  const handleSelect = (name, e) => {
    const value = e.target.value;

    setHomeInsurance((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    setHomeInsurance({ ...HomeInsurance, date: date });
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };

  const formatDateString = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toDateString();
  };

  // useEffect

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("HomeInsurance");
    if (storedData) {
      setHomeInsurance(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);

  // console.log(HomeInsurance.additional_filter, " ye hai filter page pe ")

  return (
    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 filters">
      {location === "/Homequotes" ? (
        <h4 className="car details">
          Medical Details
          {update ? (
            <i
              className="fa fa-check"
              style={{ cursor: "pointer" }}
              onClick={handleSubmit}
            ></i>
          ) : (
            <i
              className="fa fa-edit"
              style={{ cursor: "pointer" }}
              onClick={handleUpdate}
            ></i>
          )}
        </h4>
      ) : (
        <h4 className="car details">Medical Details</h4>
      )}

      {update ? (
        <div className="filterssas one">
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Full Name</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <Form.Control
                  className="input-height"
                  required
                  value={HomeInsurance.full_name}
                  onChange={(e) => handleSelect("full_name", e)}
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Email</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <Form.Control
                  className="input-height"
                  required
                  value={HomeInsurance.email}
                  onChange={(e) => handleSelect("email", e)}
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Mobile Number</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <PhoneInput
                  international
                  className="form-control"
                  defaultCountry="AE"
                  value={HomeInsurance.phone_number}
                  onChange={handleHomePhoneChange}
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Date of Birth</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <DatePicker
                  placeholderText="Date Of Birth"
                  className="form-control"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  selected={
                    HomeInsurance.date ? new Date(HomeInsurance?.date) : null
                  }
                  onChange={(startDate) => {
                    handleHomeDate(startDate);
                  }}
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  showTimeSelect={false}
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Gender</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Male</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Nationality</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup>
                <select
                  className="form-control input-height"
                  placeholder="Select Country"
                  value={HomeInsurance.country}
                  onChange={(e) => handleSelect("country", e)}
                >
                  {serverData.length === 0 ? (
                    <div>No options available</div>
                  ) : (
                    serverData &&
                    serverData.map((val) => (
                      <option value={val.country_name} key={val._id}>
                        {val.country_name}
                      </option>
                    ))
                  )}
                </select>
              </InputGroup>
            </div>
          </div>
        </div>
      ) : (
        <div className="filterssas one">
          {data.length === 0 ? (
            <div>Something went wrong</div>
          ) : (
            data.map((val, index) => (
              <div className="row" key={index}>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Full Name</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{val.full_name}</h6>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Email</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{val.email}</h6>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Mobile Number</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{val.phone_number}</h6>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Date of Birth</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{formatDateString(val.date)}</h6>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_botto">
                  <h6>Gender</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>Male</h6>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_botto">
                  <h6>Nationality</h6>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
                  <h6>{val.country}</h6>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Homefilter;
