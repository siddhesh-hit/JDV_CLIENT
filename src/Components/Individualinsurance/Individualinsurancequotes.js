import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import finance from "../../Image/finance.svg";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import Individualmedicalfilter from "./Individualmedicalfilter";
import { Link } from "react-router-dom";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
const Individualinsurancequotes = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
  } = UseMotorContext();
  const [showMore, setShowMore] = useState(false);
  const [serverData, setServerData] = useState([]);
  const [naturePlan, setNaturePlan] = useState([]);
  const [planCategory, setPlanCategory] = useState([]);
  const [additionalCover, setAdditionalCover] = useState([]);
  const [quoteData, setQuoteData] = useState([]);
  const [filterCount, setFilterCount] = useState(null);

  const API = process.env.REACT_APP_BACKENDURL;
  const img_API = "https://lmpapi.handsintechnology.in/";

  const toggleShowMore = (index) => {
    setShowMore((prevState) => (prevState === index ? null : index));
  };

  const fetchData = async () => {
    await fetch(`${admin}/getAllCompanies`)
      .then((res) => res.json())
      .then((data) => setServerData(data.data))
      .catch((e) => console.log(e));

    await fetch(`${admin}/getNaturePlan`)
      .then((res) => res.json())
      .then((data) => setNaturePlan(data.data))
      .catch((e) => console.log(e));

    await fetch(`${admin}/getAllPlanCategories`)
      .then((res) => res.json())
      .then((data) => setPlanCategory(data.data))
      .catch((e) => console.log(e));

    await fetch(`${admin}/getAllAdditionalCovered?lob=Medical`)
      .then((res) => res.json())
      .then((data) => setAdditionalCover(data.data))
      .catch((e) => console.log(e));
  };

  const fetchedMedicalData = async () => {
    const { insurance_company_id, nature_id, plan_category_id } =
      IndividualInsurance;

    const dataToSend = {
      company_id: insurance_company_id,
      nature_id: nature_id,
      plan_category_id: plan_category_id,
    };

    await fetch(`${admin}/getMatchMedicalPlans`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((res) => {
        setQuoteData(res.data);
        const length = res.data.length;
        setFilterCount(length);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const filterQuote = [];
    quoteData.forEach((val) => {
      let label = val.additional_cover_arr.map(
        (val) => val.additional_cover_label
      );
      // console.log(label, " check1");
      if (label !== undefined && !filterQuote.includes(label)) {
        filterQuote.push(label);
      }
    });

    setIndividualInsurance((prevState) => ({
      ...prevState,
      additional_filter: filterQuote,
    }));
  }, [quoteData, setIndividualInsurance]);

  useEffect(() => {
    fetchedMedicalData();
  }, [
    IndividualInsurance.plan_category_id,
    IndividualInsurance.nature_id,
    IndividualInsurance.insurance_company_id,
  ]);

  useEffect(() => {
    fetchData();
  }, []);

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

  // console.log(quoteData, "check");

  return (
    <div>
      <Header />
      <div className="Quotes_info1">
        <div className="container Quotes_info pt-4 pb-4">
          <div className="row">
            <Individualmedicalfilter />
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div className="row quotes_selectoption">
                <div className="col">
                  <span>Plan Categories</span>
                  <select
                    name="plan_category_id"
                    className="quotes_select form-control"
                    onChange={handleIndividualInsurance}
                  >
                    <option value={null}>Any</option>

                    {planCategory.length === 0 ? (
                      <option>No options available</option>
                    ) : (
                      planCategory &&
                      planCategory.map((val) => (
                        <option value={val._id} key={val._id}>
                          {val.plan_category_name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="col">
                  <span>Ins Company</span>

                  <select
                    name="insurance_company_id"
                    className="quotes_select form-control"
                    onChange={handleIndividualInsurance}
                  >
                    <option value={null}>Any</option>

                    {serverData.length === 0 ? (
                      <option>No options available</option>
                    ) : (
                      serverData &&
                      serverData.map((val) => (
                        <option value={val._id} key={val._id}>
                          {val.company_name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="col">
                  <span>Plan Nature</span>
                  <select
                    name="nature_id"
                    className="quotes_select form-control"
                    onChange={handleIndividualInsurance}
                  >
                    <option value={null}>Any</option>

                    {naturePlan.length === 0 ? (
                      <option>No options available</option>
                    ) : (
                      naturePlan &&
                      naturePlan.map((val) => (
                        <option value={val._id} key={val._id}>
                          {val.nature_of_plan_name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="col">
                  <span>Instant Policy</span>
                  <select className="quotes_select form-control">
                    <option value={null}>Any</option>
                    <option>Check</option>
                    <option>Sort By</option>
                  </select>
                </div>
                <div className="col">
                  <span>Price</span>
                  <select className="quotes_select form-control">
                    <option value={null}>Any</option>
                    <option>Highest</option>
                    <option>Lowest</option>
                  </select>
                </div>
              </div>
              <div className="row quotes_selectoption filters">
                <div className="row">
                  <div className="col-lg-2">
                    <span className="quotes_selectoption col-lg-2">
                      More Filters
                    </span>
                  </div>
                  {additionalCover === null ||
                  !Array.isArray(additionalCover) ||
                  additionalCover.length === 0 ? (
                    <div>No additional_filter available</div>
                  ) : (
                    additionalCover.map((val, index) => (
                      <div className="col-lg-4">
                        <Form.Check
                          key={index}
                          className="abcds_abcs filtercheck"
                          type="checkbox"
                          label={val.additional_cover_label}
                          value={val._id}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
              <p className="mb-3 paragra">
                We have found {filterCount} individual insurance quotes for your
                travel arrangements.
              </p>
              <div className="scroll_abcds">
                {quoteData.length === 0 ? (
                  <div>No quote data available now</div>
                ) : (
                  quoteData &&
                  quoteData.map((quote, index) => {
                    return (
                      <div className="quotes_inner" key={index}>
                        <div className="row quotes_details">
                          <div className="col-lg-3 quotesmobile">
                            {/* <img src={finance} style={{ width: "100%" }} /> */}
                            {quoteData &&
                              quote.companyDetails.company_logo.map((val) => (
                                <img
                                  key={index}
                                  alt={val.fieldname}
                                  src={`${img_API}/uploads/${val.filename}`}
                                />
                              ))}
                          </div>
                          <div className="col-lg-6 quotemobile">
                            <h4>{quote.plan_name}</h4>
                            <ul className="benefits">
                              <li>
                                {
                                  quote.additional_cover_arr[1]
                                    ?.additional_cover_label
                                }
                              </li>
                            </ul>
                          </div>
                          <div className="col-lg-3 action_abcd quotesmobile">
                            <h2>AED 1200</h2>
                            <h6
                              className="indicative"
                              style={{
                                paddingTop: "5px",
                                paddingBottom: "0px",
                                marginBottom: "0px",
                              }}
                            ></h6>
                            {/* <button
                              className="submit_select"
                              // onClick={() => handleStoreSelected(quote)}
                            >
                              Indicative
                            </button> */}
                            <span className="terms_condition">
                              <a href="#">T&C Apply</a>
                            </span>
                          </div>
                        </div>
                        {showMore === index ? (
                          <div className="rowabcds">
                            <div className="row overalldetails">
                              <div className="col-lg-6 abc">
                                <img
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
                                      <li key={index}>
                                        {val.standard_cover_label}
                                      </li>
                                    ))}
                                </ul>
                              </div>
                              <div className="col-lg-6 cde">
                                <img
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
                                  {/* <li>nahi hai bhai</li> */}
                                  {quoteData &&
                                    quote &&
                                    quote.notCoveredData.map((val) => (
                                      <li key={index}>
                                        {val.standard_cover_label}
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                            <div className="row overalldetails">
                              <button
                                className="showadd_details"
                                onClick={() => toggleShowMore(index)}
                              >
                                Hide Details
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="rowabcds">
                            <div className="row overalldetails">
                              <button
                                className="showadd_details"
                                onClick={() => toggleShowMore(index)}
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

                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                    <Link
                      to="/Individualinsuranceids"
                      className="buttonactions"
                    >
                      <i className="fa fa-chevron-left" aria-hidden="true"></i>
                      Back
                    </Link>
                  </div>
                  <div
                    className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                    style={{ textAlign: "right" }}
                  >
                    <Link to="/Individualcondition" className="buttonactions">
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
      <Footer />
    </div>
  );
};

export default Individualinsurancequotes;
