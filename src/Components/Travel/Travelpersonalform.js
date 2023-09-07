import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Travelbanner from "../Banner/Travelbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Travelpersonalform = () => {
  const navigate = useNavigate();
  const { travelsFormsData, settravelsFormsData } = UseMotorContext();
  const Progress = 40;

  useEffect(() => {
    localStorage.setItem("travelsFormsDataLocation", window.location.pathname);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    settravelsFormsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    const dateInUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    settravelsFormsData((prevData) => ({
      ...prevData,
      date_of_birth: date,
    }));
  };

  const handlePhoneInputChange = (value) => {
    settravelsFormsData((prevData) => ({
      ...prevData,
      phone_no: value, // Assuming the property name is 'phone_no' in your state
    }));
  };

  const makePostRequest = (data) => {

    const insuranceType = data.line_of_business;
    const travel_insurance_for = data.insure_your_travel;
    const travel_plan_type = data.plan_type;
    const no_of_travel = data.no_of_travel;
    const travel_start_date = data.start_date;
    const travel_end_date = data.end_date;
    const travel_destination = data.travel_destination;
    const name = data.name;
    const phoneno = data.phone_no;
    const email = data.email;
    const date_of_birth = data.date_of_birth;
    const passport_number = data.passport_no;

    console.log("POST API request data:", { insuranceType: insuranceType, travel_insurance_for: travel_insurance_for, travel_plan_type: travel_plan_type, no_of_travel: no_of_travel, travel_start_date: travel_start_date, travel_end_date: travel_end_date, travel_destination: travel_destination, name: name, phoneno: phoneno, email: email, date_of_birth: date_of_birth, passport_number: passport_number });


    // Make the POST request using fetch or any other HTTP client library
    fetch("https://lmpapi.handsintechnology.in/api/fillInsurancePlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ insuranceType: insuranceType, travel_insurance_for: travel_insurance_for, travel_plan_type: travel_plan_type, no_of_travel: no_of_travel, travel_start_date: travel_start_date, travel_end_date: travel_end_date, country: travel_destination, name: name, phoneno: phoneno, email: email, date_of_birth: date_of_birth, passport_number: passport_number }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the API response if needed
        console.log("POST API response:", responseData);
        console.log("POST API response:", responseData.data);
        localStorage.setItem('leaddetails', JSON.stringify(responseData.data._id))
      })
      .catch((error) => {
        // Handle any error that occurred during the API request
        console.error("Error making POST API request:", error);
      });
  };



  const handleNextClick = () => {



    if (travelsFormsData.name === "") {
      swal("Please enter your name", "", "warning");
      return false;
    }

    else if (travelsFormsData.phone_no === "" || travelsFormsData.phone_no === null || travelsFormsData.phone_no === undefined) {
      swal("Please enter your phone number", "", "warning");
      return false;
    }

    else if (travelsFormsData.email === "") {
      swal("Please enter your email", "", "warning");
      return false;
    }

    else if (!travelsFormsData.email.includes("@") || !travelsFormsData.email.includes(".")) {
      swal("Please enter a valid email", "", "warning");
    }

    else if (travelsFormsData.date_of_birth === "") {
      swal("Please enter your date of birth", "", "warning");
      return false;
    }

    else if (travelsFormsData.date_of_birth > new Date()) {
      swal("Please enter a valid date of birth", "", "warning");
      return false;
    }

    else if (travelsFormsData.passport_no === "") {
      swal("Please enter your passport number", "", "warning");
      return false;
    }

    else {

      localStorage.setItem(
        "travelsFormsData",
        JSON.stringify(travelsFormsData)
      );

      const storedData = JSON.parse(localStorage.getItem("travelsFormsData"));
      makePostRequest(storedData);

      const { type_of_trip } = travelsFormsData;

      if (type_of_trip === "641d6ffe2e8acf350eaab1fa") {
        // If type_of_trip is "individual", go to Beneficiarydetails component
        navigate("/Beneficarydetails");
      } else if (type_of_trip === "641d700e2e8acf350eaab204") {
        // If type_of_trip is "family", go to Familydetails component
        navigate("/Familydetails");
      }
    }
  };

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
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <ul className="mb-3">
                    <li>Please fill your details:</li>
                  </ul>
                  <div class="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <i class="fa fa-user" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <Form.Control
                            required
                            name="name"
                            placeholder="Traveler Name"
                            value={travelsFormsData.name}
                            aria-label="Traveler Name"
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        {/* <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <i class="fa fa-phone" aria-hidden="true"></i>
                          </InputGroup.Text> 
                          {/* <Form.Control
                            type="Phone"
                            required
                            name="phone_no"
                            placeholder="Phone Number"
                            value={travelsFormsData.phone_no}
                            aria-label="Phone Number"
                            onChange={handleInputChange}
                            maxLength={20}
                          /> */}

                        {/* </InputGroup> */}
                        <PhoneInput
                          international
                          name="phone_no"
                          className="form-control"
                          defaultCountry="AE"
                          value={travelsFormsData.phone_no}
                          onChange={handlePhoneInputChange}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <i class="fa fa-envelope-o" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <Form.Control
                            type="email"
                            required
                            name="email"
                            placeholder="Email ID"
                            value={travelsFormsData.email}
                            aria-label="Email ID"
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <DatePicker
                            className="form-control"
                            selected={
                              travelsFormsData.date_of_birth === null ? null :
                                new Date(travelsFormsData.date_of_birth)
                            }
                            onChange={handleDateChange}
                            placeholderText="Enter Date Of Birth"
                            maxDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            showTimeSelect={false}
                          />
                        </InputGroup>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <InputGroup className="mb-4">
                          <InputGroup.Text id="basic-addon1">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                              {/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                              <path d="M0 64C0 28.7 28.7 0 64 0H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM183 278.8c-27.9-13.2-48.4-39.4-53.7-70.8h39.1c1.6 30.4 7.7 53.8 14.6 70.8zm41.3 9.2l-.3 0-.3 0c-2.4-3.5-5.7-8.9-9.1-16.5c-6-13.6-12.4-34.3-14.2-63.5h47.1c-1.8 29.2-8.1 49.9-14.2 63.5c-3.4 7.6-6.7 13-9.1 16.5zm40.7-9.2c6.8-17.1 12.9-40.4 14.6-70.8h39.1c-5.3 31.4-25.8 57.6-53.7 70.8zM279.6 176c-1.6-30.4-7.7-53.8-14.6-70.8c27.9 13.2 48.4 39.4 53.7 70.8H279.6zM223.7 96l.3 0 .3 0c2.4 3.5 5.7 8.9 9.1 16.5c6 13.6 12.4 34.3 14.2 63.5H200.5c1.8-29.2 8.1-49.9 14.2-63.5c3.4-7.6 6.7-13 9.1-16.5zM183 105.2c-6.8 17.1-12.9 40.4-14.6 70.8H129.3c5.3-31.4 25.8-57.6 53.7-70.8zM352 192A128 128 0 1 0 96 192a128 128 0 1 0 256 0zM112 384c-8.8 0-16 7.2-16 16s7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H112z" />
                            </svg>
                          </InputGroup.Text>
                          <Form.Control
                            required
                            name="passport_no"
                            placeholder="Passport Number"
                            value={travelsFormsData.passport_no}
                            aria-label="Passport Number"
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Traveldetailsform" className="buttonactions">
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }} onClick={handleNextClick}
                    >
                      <Link className="buttonactions">
                        Next <i className="fa fa-chevron-right" aria-hidden="true"></i>
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

export default Travelpersonalform;
