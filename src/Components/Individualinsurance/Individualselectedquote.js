import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import { Button, InputGroup, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import Filters from "./Individualmedicalfilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";
import admin from "../../config";
const Individualselectedquote = () => {
  // const [startDate, setStartDate] = useState(new Date());
  const [showMore, setShowMore] = useState(true);
  const [quoteData, setQuoteData] = useState([]);
  const [quoteArr, setQuoteArr] = useState([]);
  const [Mortgage, setMortgage] = useState(false);
  const [startDate, setStartDate] = useState();
  const [TermsAndConditions, setTermsAndConditions] = useState(false);
  const [updatePolicyId, setUpdatePolicyId] = useState("");
  const [additionalCover, setAdditionalCover] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
  } = UseMotorContext();

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_BACKENDURL;
  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 6);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const fetchData = async () => {
    await fetch(`${admin}/getAllAdditionalCovered?lob=Medical`)
      .then((res) => res.json())
      .then((data) => setAdditionalCover(data.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIndividualDate = (date) => {
    setIndividualInsurance((prevState) => ({
      ...prevState,
      policy_issued_date: date,
    }));
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  };

  const handleUpdatePolicy = async () => {
    const dataToSend = {
      plan_category_id: IndividualInsurance.company_id,
      plan_type_id: IndividualInsurance.plan_type_id,
      final_price: 1200,
      paymentStatus: "pending",
      bank_name: Mortgage ? IndividualInsurance.bank_name : null,
      policy_issued_date: IndividualInsurance.policy_issued_date,
    };
    // console.log(dataToSend);

    await fetch(`${admin}/updatePolicyDetails?id=${updatePolicyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const isWeekday = (date) => {
    const curr = new Date(date);
    const day = curr.getDay();
    return day !== 0 && day !== 6;
  };

  useEffect(() => {
    const stored = localStorage.getItem("IndividualInsurance");
    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
      setQuoteData([JSON.parse(stored).selectFilter]);
      setUpdatePolicyId(IndividualInsurance.updatePolicy_id);
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
      <Innerbanner />
      <div className="Selectedinfo">
        <div className="container Quotes_info1212 pt-4 pb-4">
          <div className="row quotes_all">
            <Filters />
            <div
              className="col-lg-8 col-md-12 col-sm-12 col-xs-12"
              style={{ marginTop: "40px" }}
            >
              <div className="">
                {quoteData.length === 0 ? (
                  <div>No quote available now</div>
                ) : (
                  quoteData &&
                  quoteData.map((quote) => {
                    return (
                      <div className="quotes_inner" key={quote._id}>
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
                            {Array.isArray(quoteData) &&
                            quoteData.length === 0 ? (
                              <div>No quote available now</div>
                            ) : (
                              quoteData &&
                              quote.companyDetails.company_logo.map((val) => (
                                <img
                                  key={val._id}
                                  alt={val.fieldname}
                                  src={`https://lmpapi.handsintechnology.in/uploads/${val.filename}`}
                                />
                              ))
                            )}
                          </div>
                          <div className="col-lg-6 quotemobile">
                            <h4>{quote.plan_name}</h4>
                            <ul className="benefits">
                              <li key={quote._id}>
                                {
                                  quote.additional_cover_arr[1]
                                    ?.additional_cover_label
                                }
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-3 action_abcd">
                            <h2>AED 1200</h2>
                          </div>
                        </div>
                        {showMore ? (
                          <div className="rowabcds">
                            <div className="row">
                              <div className="col-lg-6 abc">
                                <img
                                  key={quote._id}
                                  style={{
                                    width: "auto",
                                    marginRight: "15px",
                                  }}
                                  src={tick}
                                />
                                <span className="abcds_aud">
                                  What is Covered.
                                </span>
                                <ul className="description">
                                  {quoteData &&
                                    quote &&
                                    quote.standard_cover_arr.map((val) => (
                                      <li key={val._id}>
                                        {val.standard_cover_label}
                                      </li>
                                    ))}
                                </ul>
                              </div>
                              <div className="col-lg-6 cde">
                                <img
                                  key={quote._id}
                                  style={{
                                    width: "auto",
                                    marginRight: "15px",
                                  }}
                                  src={cross}
                                />
                                <span className="abcds_aud">
                                  What is not Covered.
                                </span>
                                <ul className="description">
                                  {quoteData &&
                                    quote &&
                                    quote.notCoveredData.map((val) => (
                                      <li key={val._id}>
                                        {val.standard_cover_label}
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                            <div className="row">
                              <button
                                className="showadd_details"
                                onClick={() => toggleShowMore()}
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
                                onClick={() => toggleShowMore()}
                              >
                                See Details
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
              <div className="colnopadding additional mb-3">
                <div
                  className="row form_abcd"
                  style={{ justifyContent: "initial" }}
                >
                  <p className="filtercheck">Additional Filter</p>
                  {additionalCover === null ||
                  !Array.isArray(additionalCover) ||
                  additionalCover.length === 0 ? (
                    <div>No additional_filter available</div>
                  ) : (
                    additionalCover.map((val, index) => (
                      <Form.Check
                        key={index}
                        className="abcds_abcs filtercheck"
                        type="checkbox"
                        label={val.additional_cover_label}
                        value={val._id}
                      />
                    ))
                  )}

                  <div className="col-lg-12 nopadding">
                    <div className="row form_abcd">
                      <div className="col-lg-6">
                        <h4>Mortgage</h4>
                      </div>
                      <div className="col-lg-6">
                        <div className="d-flex justify-space-between">
                          <Form.Check
                            className="mortageee"
                            type="radio"
                            name="Mortgage"
                            label="Yes"
                            checked={Mortgage === true}
                            onChange={() => setMortgage(true)}
                          />
                          <Form.Check
                            className="mortageee"
                            type="radio"
                            name="Mortgage"
                            label="No"
                            checked={Mortgage === false}
                            onChange={() => {
                              setMortgage(false);
                            }}
                          />
                        </div>
                      </div>
                      {Mortgage && (
                        <div className="col-lg-12">
                          <InputGroup className="mb-4">
                            <Form.Control
                              required
                              name="bank_name"
                              onChange={handleIndividualInsurance}
                              value={IndividualInsurance.bank_name}
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
                          {/* <DatePicker
                            placeholder="Select a date"
                            className="form-control"
                            selected={
                              new Date(IndividualInsurance.policy_issued_date)
                            }
                            onChange={(date) => handleStartDate(date)}
                            minDate={today}
                            maxDate={sevenDaysLater}
                          /> */}
                          <DatePicker
                            placeholderText="Select a date"
                            className="form-control"
                            dropdownMode="select"
                            selected={
                              IndividualInsurance.policy_issued_date
                                ? new Date(
                                    IndividualInsurance?.policy_issued_date
                                  )
                                : null
                            }
                            onChange={(startDate) => {
                              handleIndividualDate(startDate);
                            }}
                            filterDate={isWeekday}
                            minDate={today}
                            maxDate={sevenDaysLater}
                          />
                        </InputGroup>
                      </div>
                    </div>
                  </div>

                  <div className="abcdsfloat" style={{ textAlign: "right" }}>
                    <h3>1200</h3>
                    <h5>Total Amount Due</h5>
                  </div>
                </div>
                <h1 className="taxzesd">
                  Note : All prices are excluding taxes
                </h1>

                <div className="colnopadding additional mb-4">
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
                {/* <div className="d-flex labelssss">
                  <Form.Check
                    className="abcds_abcs"
                    type="checkbox"
                    onChange={(e) => {
                      setTermsAndConditions(e.target.checked);
                    }}
                    checked={TermsAndConditions ? true : false}
                  />
                  <label>
                    I have read and agree to{" "}
                    <a className="termscond" onClick={handleShow}>
                      Terms and Conditions
                    </a>
                  </label>
                </div> */}
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3">
                <div className="row">
                  <div
                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3 payments"
                    style={{ paddingLeft: "0px" }}
                  >
                    <Link
                      className="buttonactions"
                      onClick={() => navigate(-1)}
                    >
                      <i className="fa fa-chevron-left" aria-hidden="true"></i>
                      Back
                    </Link>
                  </div>
                  <div
                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3 paymentsss"
                    style={{ textAlign: "right", paddingRight: "0px" }}
                  >
                    <Link
                      to={"/Individualtnc"}
                      className="buttonactions"
                      onClick={handleUpdatePolicy}
                    >
                      Next
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="md"
        centered
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Individual medical insurance T&C</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="paragraph">
            The Participant hereby declares having provided a description of the
            risk to the best of his/her knowledge and belief that answers given
            here are true and all material information have been disclosed.
          </p>
          <p className="paragraph">
            In the event that any untrue, inaccurate, mismatching, incomplete or
            un-updated information has formed the basis of underwriting,
            issuance of this Quotation and subsequently the insurance policy,
            then insurer, at its sole discretion shall retain the full right to
            reject any claim(s) submitted under such issued policy and/or
            downgrade it to Third Party Liability (TPL) or treat the policy
            and/or any section of it as voidable.
          </p>
          <p className="paragraph">
            Your insurance coverage will not commence until the Insurers has
            indicated their acceptance of the Proposal/online order and a
            Certificate of Motor Insurance has been issued, subject to your
            payment of full premium.
          </p>
          <p className="paragraph">
            Should any issue arises out of the above, please refer to the Terms
            & Conditions of the insurer that form an integral part of this
            insurance policy and shall prevail in case of dispute.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ padding: "5px 10px" }}>
          <a className="savechanges" onClick={handleClose}>
            Ok
          </a>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  );
};

export default Individualselectedquote;
