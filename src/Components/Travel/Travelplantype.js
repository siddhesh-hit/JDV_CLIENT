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
  const { travelsFormsData, settravelsFormsData } = UseMotorContext();
  useEffect(() => {
    gettypeoftripdetails();
    getCountrydetails();
    localStorage.setItem("travelsFormsDataLocation", window.location.pathname);
  }, []);

  const Progress = 20;

  const [typeoftrip, settypeoftrip] = useState([]);
  const [country, setCountry] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(false);

  const gettypeoftripdetails = async () => {
    var requestOptions = {
      method: "GET",
    };

    fetch(
      "https://lmpapi.handsintechnology.in/api/getTravelPlanTypes",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        settypeoftrip(result.data);
        // console.log(result.data); // Updated value of insureyourtravel
      })
      .catch((error) => console.log("error", error));
  };

  // console.log(typeoftrip);

  const getCountrydetails = async () => {
    var requestOptions = {
      method: "GET",
    };

    fetch(
      "https://lmpapi.handsintechnology.in/api/getAllCountries",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCountry(result.data);
        // console.log(result.data); // Updated value of insureyourtravel
      })
      .catch((error) => console.log("error", error));
  };

  // console.log(country);

  const calculateEndDate = () => {
    const startDate = new Date(travelsFormsData.start_date);
    const numberOfDays = parseInt(travelsFormsData.no_of_travel); // Convert to a number
    const newEndDate = new Date(startDate);
    newEndDate.setDate(startDate.getDate() + numberOfDays);
    return newEndDate;
  };
  useEffect(() => {
    const newEndDate = calculateEndDate();
    settravelsFormsData((prevData) => ({
      ...prevData,
      end_date: newEndDate,
    }));
  }, [travelsFormsData.start_date, travelsFormsData.no_of_travel]);
  const handleStartDateChange = (date) => {
    const travelsFormsData = JSON.parse(
      localStorage.getItem("travelsFormsData")
    );
    const no_of_travel = parseInt(travelsFormsData.no_of_travel); // Convert to a number
    // const dateInUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    settravelsFormsData((prevData) => ({
      ...prevData,
      start_date: date,
      end_date:
        travelsFormsData.plan_type === "641d418b19807a3c58191f7f"
          ? new Date(date.getTime() + no_of_travel * 24 * 60 * 60 * 1000)
          : new Date(date.getTime() + no_of_travel * 24 * 60 * 60 * 1000),
    }));
  };
  const handleEndDateChange = (date) => {
    settravelsFormsData((prevData) => ({
      ...prevData,
      end_date: date,
    }));
  };

  const handleTypeOfTripChange = (_id) => {
    settravelsFormsData((prevData) => ({
      ...prevData,
      type_of_trip: _id,
    }));
  };

  const handleDestinationChange = (e, val) => {
    const selectedOption = e.target.value || val;

    settravelsFormsData((prevData) => ({
      ...prevData,
      travel_destination: selectedOption,
    }));
  };

  const handleNextClick = () => {
    localStorage.setItem("travelsFormsData", JSON.stringify(travelsFormsData));
  };

  const showmore = () => {
    window.scrollTo({ top: 100, behavior: "smooth" });
    setItemsToShow(!itemsToShow);
  };

  useEffect(() => {
    if (country.length > 0) {
      const index = country.findIndex(
        (val) => val._id === travelsFormsData.travel_destination
      );
      // console.log(index, "check");
      if (index > 8) {
        setItemsToShow(true);
      }
    }
  }, [country]);

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
                <h5>Type of trip</h5>

                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <ul>
                    <li>Type of trip</li>
                  </ul>
                  <div class="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {typeoftrip.map((item, index) => (
                        <div
                          key={index}
                          className="col-lg-6 col-md-6 col-sm-6 col-xs-12 radiohide"
                        >
                          <label
                            className={
                              travelsFormsData.type_of_trip === item._id
                                ? "btn btn-default active"
                                : "btn btn-default"
                            }
                            onClick={() => handleTypeOfTripChange(item._id)}
                          >
                            <input
                              type="radio"
                              name="options"
                              defaultChecked={
                                travelsFormsData.type_of_trip === item._id
                              }
                            />
                            {item.travel_plan_type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <ul>
                    <li>Destination</li>
                  </ul>
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3">
                        <select
                          name="country"
                          className="form-control"
                          placeholder="Select Destination"
                          onChange={handleDestinationChange}
                          value={travelsFormsData.travel_destination}
                        >
                          <option value="" hidden>
                            Select Country
                          </option>
                          {country.map((item, index) => (
                            <option key={index} value={item._id}>
                              {item.country_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {country && country.length > 0 && (
                        <>
                          {(itemsToShow
                            ? country?.slice(0, country.length)
                            : country?.slice(0, 9)
                          ).map((val) => {
                            return (
                              <div
                                className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                                key={val._id}
                              >
                                <label
                                  className={`btn btn-default ${
                                    travelsFormsData.travel_destination ===
                                    val._id
                                      ? "active"
                                      : ""
                                  }`}
                                  name="country"
                                  onClick={(e) =>
                                    handleDestinationChange(e, val._id)
                                  }
                                >
                                  <input
                                    type="radio"
                                    name="country"
                                    defaultChecked={
                                      travelsFormsData.travel_destination ===
                                      val.country_name
                                    }
                                    value={val.country_name}
                                  />
                                  {val.country_name}
                                </label>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>
                    {itemsToShow ? (
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <p
                          className="showcom"
                          style={{ cursor: "pointer" }}
                          onClick={() => showmore()}
                        >
                          Show Less
                        </p>
                      </div>
                    ) : (
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-4">
                        <p
                          className="showcom"
                          style={{ cursor: "pointer" }}
                          onClick={() => showmore()}
                        >
                          Show More
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Traveldetailsform" className="buttonactions">
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link
                        to="/Travelpersonalform"
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
