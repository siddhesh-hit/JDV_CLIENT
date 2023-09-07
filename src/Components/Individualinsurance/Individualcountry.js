import React, { useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link } from "react-router-dom";
import { Form, FormControl, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import { useEffect } from "react";
import swal from "sweetalert";
import admin from "../../config";
const Individualcountry = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
  } = UseMotorContext();
  const [country, setCountry] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(false);

  const API = process.env.REACT_APP_BACKENDURL;
  const Progress = 30;

  const showmore = () => {
    window.scrollTo({ top: 100, behavior: "smooth" });
    setItemsToShow(!itemsToShow);
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
    } = IndividualInsurance;

    const dataToSend = {
      name: full_name,
      email: email,
      phoneno: phone_number,
      date_of_birth: date,
      insuranceType: insurance_type,
      gender: gender,
      nationality: country,
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

  const fetchData = async () => {
    await fetch(`${admin}/getAllCountries`)
      .then((res) => res.json())
      .then((data) => setCountry(data.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (country.length > 0) {
      const index = country.findIndex(
        (val) => val.country_name === IndividualInsurance.country
      );
      // console.log(index, "check");
      if (index > 8) {
        setItemsToShow(true);
      }
    }
  }, [country]);

  useEffect(() => {
    const stored = localStorage.getItem("IndividualInsurance");
    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
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
          <h5 className="gheading">Yeah ! Now only 3 Questions remaining</h5>
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-3">
                  <ul>
                    <li>Please select your nationality.</li>
                  </ul>
                  <div className="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3">
                        <select
                          name="country"
                          className="form-control"
                          placeholder="Select Country"
                          value={IndividualInsurance.country}
                          onChange={handleIndividualInsurance}
                        >
                          <option hidden>Select your country</option>

                          {country.length === 0 ? (
                            <option>No options available</option>
                          ) : (
                            country &&
                            country.map((val) => (
                              <option value={val.country_name} key={val._id}>
                                {val.country_name}
                              </option>
                            ))
                          )}
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
                                    IndividualInsurance.country ===
                                    val.country_name
                                      ? "active"
                                      : ""
                                  }`}
                                  name="country"
                                  onClick={(e) =>
                                    handleIndividualInsurance(
                                      e,
                                      val.country_name,
                                      "country"
                                    )
                                  }
                                >
                                  <input
                                    type="radio"
                                    name="country"
                                    defaultChecked={
                                      IndividualInsurance.country ===
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
                      <Link
                        to="/Individualinsurancepersonaldetails"
                        className="buttonactions"
                      >
                        <i
                          className="fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                        Back
                      </Link>
                    </div>
                    {IndividualInsurance.country ? (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          to="/Individualinsuranceids"
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
                    ) : (
                      <div
                        className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                        style={{ textAlign: "right" }}
                      >
                        <Link
                          className="buttonactions"
                          onClick={() => {
                            let errorText = "";

                            if (!IndividualInsurance.country) {
                              errorText = "Please Select a country";
                            }
                            if (errorText) {
                              swal({
                                title: "Error!",
                                text: errorText,
                                icon: "error",
                              });
                            }
                          }}
                        >
                          Next
                          <i
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                          ></i>
                        </Link>
                      </div>
                    )}
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

export default Individualcountry;
