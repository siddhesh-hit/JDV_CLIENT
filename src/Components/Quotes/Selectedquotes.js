/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Homebanner from "../Banner/Homebanner";
import finance from "../../Image/finance.svg";
import { Button, InputGroup, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import Filters from "./Filters";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { UseMotorContext } from "../../MultiStepContextApi";
import { API_URL } from "../..";
import { UpdatePolicy } from "../../functions";
import axios from "axios";
const Selectedquotes = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const location = useLocation();
  const { state } = location;
  const { handleSubmitMotorform } = UseMotorContext()
  const counter = useSelector((state) => state.MotoformDataReducer);
  // eslint-disable-next-line no-unused-vars
  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 6);
  const [TermsAndConditions, setTermsAndConditions] = useState(false);
  const [Mortgage, setMortgage] = useState(false);
  const [TotalAmount, setTotalAmount] = useState(state?.finallBasePremium);
  const [showMore, setShowMore] = useState(true);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const [selectedValues, setSelectedValues] = useState([]);
  const handleClose = () => {
    setTermsAndConditions(true)
    setShow(false)
  };
  const handleShow = () => setShow(true);
  const handleDateChange = (date) => {
    handleSubmitMotorform("policy_issued_date", date);
  }
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTotalAmountDue = () => {
    let totalAmount = 0;
    // Loop through selectedValues and add corresponding additional_cover_value
    selectedValues.forEach((selectedValue) => {
      if (state?.additional_cover_arr) {
        const selectedCover = state?.additional_cover_arr.find(
          (label) => label.additional_cover_id === selectedValue
        );
        if (selectedCover) {
          totalAmount += parseInt(selectedCover.additional_cover_value, 10);
        }
      }
    });
    const { finallBasePremium } = state;
    totalAmount += parseInt(finallBasePremium, 10);
    return totalAmount;
  };
  useEffect(() => {
    setTotalAmount(getTotalAmountDue());
  }, [selectedValues]);
  useEffect(() => {
    UpdatePolicy(
      counter?.leadid,
      state?.company_id,
      state?._id,
      TotalAmount,
      "Pending"
    );
  }, [TotalAmount]);
  const [TermsAndConditionsdata, setTermsAndConditionsdata] = useState("")
  useEffect(() => {
    axios
      .get(API_URL + "/api/termsAndCondition?insuranceType=Motor")
      .then((response) =>
        setTermsAndConditionsdata(response.data.data?.terms_constions)
      )
      .catch((error) => console.log(error));
  }, []);
  const handleback = () => {
    window.location.back()
  }

  const isWeekday = (date) => {
    const curr = new Date(date);
    const day = curr.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <div>
      <Header />
      {/* <Homebanner /> */}
      <div className="Selectedinfo">
        <div className="container Quotes_info1212 pt-4 pb-4">
          <div className="row quotes_all">
            <Filters />
            <div
              className="col-lg-8 col-md-12 col-sm-12 col-xs-12"
            >
              <p className="mb-3 paragra">
                Selected vehicle insurance quotes for your Abarth Competizione, 2020 valued at AED <span style={{ color: '#003399', fontWeight: 'bold' }}>{!state?.finallBasePremium
                  ? "REFERED"
                  : "AED " + state?.finallBasePremium}</span>
              </p>
              <div className="scroll_abcds123">
                <div className="quotes_inner">
                  <div
                    className="row quotes_details"
                    style={{
                      marginLeft: "0px",
                      marginRight: "0px",
                      paddingTop: "20px",
                      paddingBottom: "20px",
                    }}
                  >
                    <div className="col-lg-3 action_abcd">
                      {state?.companies?.company_logo &&
                        state?.companies?.company_logo?.length > 0 ? (
                        state?.companies?.company_logo.map((company) => {
                          return (
                            <img
                              // key={company?._id}
                              src={`${API_URL}/${company?.destination}/${company?.filename}`}
                              alt="company_logo"
                            />
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-lg-6 quotemobile">
                      <h4>{state?.plan_name} </h4>
                      <ul className="benefits">
                        {state?.additional_cover_arr &&
                          state?.additional_cover_arr.length > 0 ? (
                          state?.additional_cover_arr.map((cover) => {
                            return (
                              <li>
                                {cover?.additional_cover_label} (
                                {cover?.additional_cover_desc})
                              </li>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </ul>
                    </div>
                    <div className="col-lg-3 action_abcd">
                      <h2>
                        {!state?.finallBasePremium
                          ? "REFERED"
                          : "AED " + state?.finallBasePremium}
                      </h2>
                    </div>
                  </div>
                  {showMore ? (
                    <div className="rowabcds">
                      <div className="row">
                        <div className="col-lg-6 abc">
                          <img
                            style={{ width: "auto", marginRight: "15px" }}
                            src={tick}
                          />
                          <span className="abcds_aud">What is Covered.</span>
                          <ul className="description">
                            {state?.standard_cover_arr &&
                              state?.standard_cover_arr.length > 0 ? (
                              state.standard_cover_arr.map((cover) => {
                                return (
                                  <li>
                                    {cover?.standard_cover_label} (
                                    {cover?.standard_cover_desc})
                                  </li>
                                );
                              })
                            ) : (
                              <></>
                            )}
                          </ul>
                        </div>
                        <div className="col-lg-6 cde">
                          <img
                            style={{ width: "auto", marginRight: "15px" }}
                            src={cross}
                          />
                          <span className="abcds_aud">
                            What is not Covered.
                          </span>
                          <ul className="description">
                            {state?.notCoveredData &&
                              state?.notCoveredData.length > 0 ? (
                              state?.notCoveredData.map((cover) => {
                                return <li>{cover?.standard_cover_label}</li>;
                              })
                            ) : (
                              <></>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="row">
                        <button
                          className="showadd_details"
                          onClick={toggleShowMore}
                        >
                          Hide Details
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="rowabcds">
                      <div className="row">
                        <button
                          className="showadd_details"
                          onClick={toggleShowMore}
                        >
                          See Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="colnopadding additional mb-3">
                <div
                  className="row form_abcd"
                  style={{ justifyContent: "initial" }}
                >
                  {state?.additional_cover_arr &&
                    state?.additional_cover_arr.length > 0 && (
                      <p className="">Additional Cover</p>
                    )}

                  <div className="col-lg-12 mb-4 mt-2">
                    {state?.additional_cover_arr &&
                      state?.additional_cover_arr.length > 0 ? (
                      state.additional_cover_arr.map((cover) => {
                        return (
                          <Form.Check
                            onChange={handleCheckboxChange}
                            className="abcds_abcs "
                            value={cover?.additional_cover_id}
                            type="checkbox"
                            name="additional_id"
                            label={
                              cover?.additional_cover_label +
                              "(" +
                              cover?.additional_cover_desc +
                              ")"
                            }
                          />
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-lg-12 nopadding">
                    <div className="row form_abcd">
                      <div className="col-lg-6">
                        <h4>Mortgage</h4>
                      </div>
                      <div className="col-lg-6">
                        <div className="d-flex justify-space-between">
                          <Form.Check className="mortageee"
                            type="radio"
                            name="Mortgage"
                            label="Yes"
                            checked={Mortgage === true}
                            onChange={() => setMortgage(true)}
                          />
                          <Form.Check
                            type="radio" className="mortageee"
                            name="Mortgage"
                            label="No"
                            checked={Mortgage === false}
                            onChange={() => {
                              setMortgage(false);
                              handleSubmitMotorform("BankName", null);
                            }}
                          />
                        </div>
                      </div>
                      {Mortgage && (
                        <div className="col-lg-12">
                          <InputGroup className="mb-4">
                            <Form.Control
                              value={counter?.BankName}
                              className="bankbank"
                              onChange={(e) =>
                                handleSubmitMotorform(
                                  "BankName",
                                  e.target.value
                                )
                              }
                              placeholder="Bank Name"
                              aria-label="Bank Name"
                            />
                          </InputGroup>
                        </div>
                      )}
                      <div className="col-lg-6">
                        <h4> Policy Start Date</h4>
                      </div>
                      <div className="col-lg-6">
                        <InputGroup className="mb-5">
                          <InputGroup.Text id="basic-addon1">
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                          </InputGroup.Text>
                          <DatePicker
                            placeholder="Select a date"
                            className="form-control"
                            selected={new Date(counter?.policy_issued_date ? counter.policy_issued_date : today)}
                            onChange={(date) => handleDateChange(date)}
                            filterDate={isWeekday}
                            dateFormat="dd/MM/yyyy"
                            minDate={today}
                            maxDate={sevenDaysLater}
                          />
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                  <div className="abcdsfloat" style={{ textAlign: "right", paddingTop: '20px' }}>
                    <h3>
                      {" "}
                      {isNaN(TotalAmount) ? "REFERED" : "AED " + TotalAmount}
                    </h3>
                    <h5>Total Amount Due</h5>
                  </div>
                </div>
                <h1 className="taxzesd">
                  Note : All prices are excluding taxes
                </h1>

                <div className="colnopadding additional mb-3">
                  <div
                    className="row form_abcd"
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="col-lg-3">
                      <Form.Check
                        className="abcds_abcs"
                        type="checkbox"
                        label="Discount Code"
                      />
                    </div>
                    <div className="col-lg-6">
                      <input className="coupons" placeholder="Discount Code" />
                      <button className="hjkbfhdb">Apply</button>
                    </div>
                  </div>
                </div>
                <div className="d-flex labelssss">
                  <Form.Check
                    className="abcds_abcs"
                    type="checkbox"
                    onChange={(e) => {
                      setTermsAndConditions(e.target.checked);
                    }}
                    checked={TermsAndConditions ? true : false}
                  />
                  <label>I have read and agree to <a className="termscond" onClick={handleShow}>Terms and Conditions</a></label>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3">
                <div className="row">
                  <div
                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3 payments"
                    style={{ paddingLeft: "0px" }}
                  >
                    <Link onClick={() => navigate(-1)} className="buttonactions">
                      <i class="fa fa-chevron-left" aria-hidden="true"></i>Back
                    </Link>
                  </div>
                  <div
                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3 paymentsss"
                    style={{ textAlign: "right", paddingRight: "0px" }}
                  >
                    {TermsAndConditions ? (
                      <Link
                        to={"/Payments"}
                        state={{ ...state, totaldueamount: TotalAmount }}
                        className="buttonactions"
                      >
                        Proceed To Payment
                      </Link>
                    ) : (
                      <a
                        style={{ cursor: "not-allowed" }}
                        className="buttonactions disabled"
                      >
                        Proceed To Payment
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Comparelist /> */}
        </div>
      </div>
      <Modal size="md" centered
        aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Motor T&C</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="paragraph">{
            TermsAndConditionsdata
          }</p>

        </Modal.Body>
        <Modal.Footer style={{ padding: '5px 10px' }}>
          <a className="savechanges" onClick={handleClose}>
            Ok
          </a>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  );
};

export default Selectedquotes;
