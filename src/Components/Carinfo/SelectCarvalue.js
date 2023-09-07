import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { Form } from "react-bootstrap";
import { API_URL } from "../..";
const SelectCarvalue = () => {
  const { motorFormsData, handleBeforeUnload, handleSubmitMotorform } =
    UseMotorContext();
  const [minCarValue, setminCarValue] = useState(0);
  const [maxCarValue, setmaxCarValue] = useState(0);
  const [estimetedminCarValue, setestimetedminCarValue] = useState(0);
  const [estimetedmaxCarValue, setestimetedmaxCarValue] = useState(0);
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState("");
  const handleApiResponse = (response) => {
    if (response.data.minCarValue > response.data.maxCarValue) {
      setminCarValue(response.data.maxCarValue);
      setmaxCarValue(response.data.minCarValue);
      setestimetedminCarValue(response.data.maxCarValue);
      setestimetedmaxCarValue(response.data.minCarValue);
    } else {
      setminCarValue(response.data.minCarValue);
      setmaxCarValue(response.data.maxCarValue);
      setestimetedminCarValue(response.data.minCarValue);
      setestimetedmaxCarValue(response.data.maxCarValue);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    await axios
      .post(API_URL + "/api/getCarEstimatedValue", {
        model_year: motorFormsData?.model_year,
        car_maker: motorFormsData?.car_maker,
        car_model: motorFormsData.car_model,
        car_variant: motorFormsData.car_variant,
      })
      .then((response) => {
        setLoading(false);
        handleApiResponse(response);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
        setMessage(error?.response?.data?.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [NonFormatedValue, setNonFormatedValue] = useState(null);
  const handleSelect = (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // Remove commas
    const numericValue = Number(rawValue); // Convert to a number
    // Check if numericValue is NaN or an empty string, then set it to 0
    const formattedValue =
      isNaN(numericValue) || rawValue.trim() === "" ? 0 : numericValue;
    // Store the formatted value in localStorage
    setNonFormatedValue(formattedValue);
    // Update the state with the formatted value
    setminCarValue(formattedValue.toLocaleString());
  };
  useEffect(() => {
    // This effect will run whenever minCarValue or maxCarValue changes
    // It's a good place to call your form submission function
    handleSubmitMotorform("minCarValue", estimetedminCarValue);
    handleSubmitMotorform("maxCarValue", estimetedmaxCarValue);
    handleSubmitMotorform(
      "aslider_value",
      NonFormatedValue ? NonFormatedValue : minCarValue
    );
  }, [
    NonFormatedValue,
    maxCarValue,
    handleSubmitMotorform,
    minCarValue,
    estimetedminCarValue,
    estimetedmaxCarValue,
  ]);
  const Progress = 40;
  console.log({ estimetedminCarValue });
  console.log(minCarValue, "Min car value");
  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <ul>
                    <li>What is the value of your vehicle?</li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <div class="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {Loading ? (
                        <div id="loading"></div>
                      ) : Error ? (
                        <div>{Message}</div>
                      ) : (
                        <>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mb-3">
                            <Form.Control
                              value={minCarValue}
                              type="text"
                              onChange={handleSelect}
                              onKeyDown={(e) =>
                                ["e", "E", "+", "-"].includes(e.key) &&
                                e.preventDefault()
                              }
                              placeholder="Enter value of your vehicle"
                              aria-label="Full Name"
                            />
                          </div>
                          {motorFormsData.aslider_value <
                            estimetedminCarValue ||
                          motorFormsData.aslider_value >
                            estimetedmaxCarValue ? (
                            <span>
                              <i
                                className="fa fa-warning text-danger "
                                style={{ marginRight: "5px" }}
                              />
                              We will need an approval from the insurer.
                            </span>
                          ) : (
                            <></>
                          )}
                          <span>
                            {" "}
                            We estimate that your car value is AED{" "}
                            <b>{estimetedminCarValue}</b> to AED{" "}
                            <b>{estimetedmaxCarValue}</b>
                          </span>
                          <br />
                          <br />
                          <span>
                            <b>Note:</b>The <b>car value</b> range shown is a
                            guide, and is subject to approval from the insurance
                            company. <b>Final premium</b> may vary based on the
                            car value approved by the chosen insurer.
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/Carvariant" className="buttonactions">
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <Link to="/Carregisterlocation" className="buttonactions">
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
export default SelectCarvalue;