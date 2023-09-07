import React, { useCallback, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
import { API_URL } from "../..";
import swal from "sweetalert";
import abarth from "../../Image/abarth.png";
const Carmaker = () => {
  const {
    setMotorFormsData,
    motorFormsData,
    handleBeforeUnload,
    motornextStep,
    handleSubmitMotorform,
  } = UseMotorContext();
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const [Cars, setCars] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [Message, setMessage] = useState("");
  const onClickDivclick = (data) => {
    handleSubmitMotorform("car_maker", data);
  };
  useEffect(() => {
    getMotordata();
  }, []);
  const getMotordata = async () => {
    setLoading(true);
    await axios
      .post(API_URL + "/api/getMotorDetails", {
        years: motorFormsData?.model_year,
      })
      .then((response) => {
        setLoading(false);
        if (response?.data?.status === 200) {
          handleSubmitMotorform("car_maker", response?.data?.data[0]["_id"]);
          setCars(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
        setMessage(error?.response?.data?.message);
      });
  };
  const Progress = 25;
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
                    <li>Select Vehicle Maker</li>
                  </ul>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-4">
                  <div class="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {Loading ? (
                        <div id="loading"></div>
                      ) : Error ? (
                        <div>{Message}</div>
                      ) : Cars && Cars.length > 0 ? (
                        Cars.map((v, i) => {
                          return (
                            <div
                              key={v._id}
                              className="col-lg-4 col-md-4 col-sm-4 col-xs-6 radiohide mb-3"
                            >
                              <label
                                className={
                                  motorFormsData?.car_maker == v._id
                                    ? "btn btn-default active"
                                    : "btn btn-default"
                                }
                                onClick={() => onClickDivclick(v._id)}
                              >
                                <input
                                  type="radio"
                                  name="options"
                                  defaultChecked={
                                    motorFormsData &&
                                      motorFormsData?.model_year == v.year
                                      ? "btn btn-default active"
                                      : "btn btn-default"
                                  }
                                />
                                {v._id}
                                <img style={{width: '30px',marginLeft:'10px',filter:'invert(1)'}}src={abarth} alt="car" />
                              </label>
                            </div>
                          );
                        })
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link

                        to="/Carmodelyear"
                        className="buttonactions"
                      >
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >

                      <Link
                        to="/Carmodel"
                        className="buttonactions"
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

export default Carmaker;
