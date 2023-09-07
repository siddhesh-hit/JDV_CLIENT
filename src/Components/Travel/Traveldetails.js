import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Travelbanner from "../Banner/Travelbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Form, InputGroup, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";

const Traveldetails = () => {
  const navigate = useNavigate();

  const { travelsFormsData, settravelsFormsData } = UseMotorContext();
  const [insureyourtravel, setinsureyourtravel] = useState([]);
  const [plantype, setplantype] = useState([]);
  const [nooftravel, setnooftravel] = useState([]);

  useEffect(() => {
    getinsureyourtraveldetails();
    getplantypedetails();
    localStorage.setItem("travelsFormsDataLocation", window.location.pathname);
    const nooftravel =
      travelsFormsData.no_of_travel == ""
        ? travelsFormsData.plan_type == "641d418b19807a3c58191f7f"
          ? ""
          : "365"
        : travelsFormsData.no_of_travel;
    setnooftravel(nooftravel);
  }, []);

  const Progress = 20;

  const getinsureyourtraveldetails = async () => {
    var requestOptions = {
      method: "GET",
    };

    fetch(
      "https://lmpapi.handsintechnology.in/api/getTravelsInsuranceFor",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setinsureyourtravel(result.data);
        // console.log(result.data); // Updated value of insureyourtravel
      })
      .catch((error) => console.log("error", error));
  };

  const getplantypedetails = async () => {
    var requestOptions = {
      method: "GET",
    };

    fetch(
      "https://lmpapi.handsintechnology.in/api/getTravelTypes",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setplantype(result.data);
        // console.log(result.data); // Updated value of insureyourtravel
      })
      .catch((error) => console.log("error", error));
  };

  // console.log(insureyourtravel)

  const handleTravelType = (_id) => {
    settravelsFormsData((prevData) => ({
      ...prevData,
      insure_your_travel: _id,
    }));
  };

  const handlePlanChange = (_id) => {
    settravelsFormsData((prevData) => ({
      ...prevData,
      plan_type: _id,
    }));

    if (_id == "641d418b19807a3c58191f7f") {
      setnooftravel("");
    } else {
      setnooftravel("365");
      settravelsFormsData((prevData) => ({
        ...prevData,
        no_of_travel: "365",
      }));
    }
  };

  const handleNextClick = () => {
    // if (nooftravel == [] || nooftravel == "") {
    //   swal("Please enter no of travel days", "", "warning");
    //   return false;
    // } else {
    localStorage.setItem("travelsFormsData", JSON.stringify(travelsFormsData));
    navigate("/Traveldetailsform");
    // }
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
                <h5>Insure your Travel in 2 minutes</h5>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <div class="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {insureyourtravel.map((item) => (
                        <div
                          key={item.id}
                          className="col-lg-6 col-md-6 col-sm-6 col-xs-12 radiohide"
                        >
                          <label
                            className={
                              travelsFormsData.insure_your_travel === item._id
                                ? "btn btn-default active"
                                : "btn btn-default"
                            }
                            onClick={() => handleTravelType(item._id)}
                          >
                            <input
                              type="radio"
                              name="options"
                              defaultChecked={
                                travelsFormsData.insure_your_travel === item._id
                                  ? "btn btn-default active"
                                  : "btn btn-default"
                              }
                            />
                            {item.travel_insurance_for}
                          </label>
                          <h6
                            style={{
                              marginBottom: "15px",
                              textAlign: "center",
                              fontSize: "16px",
                            }}
                          >
                            {item.travel_insurance_for === "Outbound" && (
                              <p>(UAE Residents Traveling From UAE)</p>
                            )}
                            {item.travel_insurance_for === "Inbound" && (
                              <p>(Visitors travelling in to the UAE)</p>
                            )}
                          </h6>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <ul>
                    <li>Plan Type</li>
                  </ul>
                  <div class="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      {plantype.map((item) => (
                        <div
                          key={item.id}
                          className="col-lg-6 col-md-6 col-sm-6 col-xs-12 radiohide"
                        >
                          <label
                            className={
                              travelsFormsData.plan_type === item._id
                                ? "btn btn-default active"
                                : "btn btn-default"
                            }
                            onClick={() => handlePlanChange(item._id)}
                          >
                            <input
                              type="radio"
                              name="options"
                              defaultChecked={
                                travelsFormsData.plan_type === item._id
                                  ? "btn btn-default active"
                                  : "btn btn-default"
                              }
                            />
                            {item.travel_type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <ul>
                    <li>No of Travel Days</li>
                  </ul>
                  <div class="button-group-pills" data-toggle="buttons">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <InputGroup className="mb-4 mt-2">
                          <Form.Control
                            required
                            placeholder="No Of Travel"
                            value={nooftravel}
                            onChange={(e) => {
                              setnooftravel(e.target.value);
                              settravelsFormsData((prevData) => ({
                                ...prevData,
                                no_of_travel: e.target.value,
                              }));
                            }}
                            disabled={
                              travelsFormsData.plan_type !==
                              "641d418b19807a3c58191f7f"
                            }
                          />
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link to="/" className="buttonactions">
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <button
                        className="buttonactions"
                        onClick={handleNextClick}
                      >
                        Next
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                      </button>
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

export default Traveldetails;
