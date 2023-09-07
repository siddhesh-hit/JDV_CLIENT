import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Form, Offcanvas } from "react-bootstrap";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import Homefilter from "./Homefilter";
import { Link } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import admin from "../../config";
import compare from "../../Image/comparelist.png";

const Homequotes = () => {
  const { HomeInsurance, setHomeInsurance } = UseMotorContext();
  const [showMore, setShowMore] = useState(null);
  const [serverData, setServerData] = useState([]);
  const [naturePlan, setNaturePlan] = useState([]);
  const [planCategory, setPlanCategory] = useState([]);
  const [dataToSend, setDataToSend] = useState([]);
  const [quoteData, setQuoteData] = useState([]);
  const [filterCount, setFilterCount] = useState(null);
  const [show, setShow] = useState(false);
  const [quoteArr, setQuoteArr] = useState([]);
  const [updatePolicyId, setUpdatePolicyId] = useState("");
  const [localCompare, setLocalCompare] = useState("");

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
  };

  const handleDrop = async () => {
    const {
      property_type,
      ownership_status,
      plan_type,
      insurance_company_id,
      nature_id,
      plan_category_id,
      content_value,
      personal_belongings_value,
      building_value,
      domestic_value,
    } = HomeInsurance;

    const dataToSend = {
      company_id: insurance_company_id,
      nature_id: nature_id,
      plan_category_id: plan_category_id,
    };

    await fetch(`${admin}/getMatchHomePlan`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(dataToSend, "ye hai after called");
        setQuoteData(responseData.data);
        setHomeInsurance((prevState) => ({
          ...prevState,
          full_compare_data: responseData.data,
        }));
        setFilterCount(responseData.totalCount);
        const filterValue = responseData.data.filter((val) => {
          return quoteArr.some((quote) => quote._id === val._id);
        });
        // console.log(quoteArr, responseData.data, filterValue);

        setQuoteArr(filterValue);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleOption = (e) => {
    const name = e.target.name;
    const value = e.target.value === "Any" ? null : e.target.value;

    if (name === "plan_category_id" && value === null) {
      // If "Any" is selected for plan_category_id, set it to null
      setHomeInsurance((prevState) => ({
        ...prevState,
        plan_category_id: null,
      }));
    } else if (name === "insurance_company_id" && value === null) {
      setHomeInsurance((prevState) => ({
        ...prevState,
        insurance_company_id: null,
      }));
    } else if (name === "nature_id" && value === null) {
      setHomeInsurance((prevState) => ({
        ...prevState,
        nature_id: null,
      }));
    } else {
      setHomeInsurance((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };

  useEffect(() => {
    handleDrop();
  }, [
    HomeInsurance.plan_category_id,
    HomeInsurance.nature_id,
    HomeInsurance.insurance_company_id,
  ]);

  const isQuoteSelected = (quote) => {
    return quoteArr.some((item) => item._id === quote._id);
  };

  const handleStoreSelected = async (data) => {
    // console.log(data);
    setHomeInsurance((prevState) => ({
      ...prevState,
      selected: data,
      company_id: data.company_id,
      final_price: 1200,
      plan_type_id: data._id,
    }));

    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
    const { company_id, plan_type_id } = data;
    const dataToSend = {
      plan_category_id: company_id,
      plan_type_id,
      final_price: 1200,
      paymentStatus: "pending",
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

  const handleFormCheck = (quote, e) => {
    const name = e.target.name;
    // console.log("this is the quote", quote, e.target.name);z

    if (e.target.checked) {
      if (!quoteArr.find((item) => item._id === quote._id)) {
        setQuoteArr((prevArr) => [...prevArr, quote]);
        handleCanvas();
      }
    } else {
      // If the checkbox is unchecked, remove the quote object from the arrays
      setQuoteArr((prevArr) =>
        prevArr.filter((item) => item._id !== quote._id)
      );
    }
  };

  const handleCanvas = () => {
    setShow(!show);
  };

  // console.log(filterValue, "check");

  useEffect(() => {
    setHomeInsurance((prevState) => ({
      ...prevState,
      compare_data: quoteArr,
    }));

    // Save the updated HomeInsurance to localStorage
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [quoteArr]);

  const toggleShowMore = (index) => {
    setShowMore((prevState) => (prevState === index ? null : index));
  };

  useEffect(() => {
    const filterQuote = [];
    quoteData.forEach((val) => {
      let label = val.additional_cover_arr[1]?.additional_cover_label;
      if (label !== undefined && !filterQuote.includes(label)) {
        filterQuote.push(label);
      }
    });

    setHomeInsurance((prevState) => ({
      ...prevState,
      additional_filter: filterQuote,
    }));
  }, [quoteData, setHomeInsurance]);

  useEffect(() => {
    fetchData();
    handleDrop();
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("HomeInsurance");
    if (storedData) {
      setHomeInsurance(JSON.parse(storedData));
      setUpdatePolicyId(HomeInsurance.updatePolicy_id);
      setQuoteArr(HomeInsurance.compare_data || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  }, [HomeInsurance]);

  return (
    quoteData && (
      <div>
        <Header />

        {HomeInsurance.compare_data && HomeInsurance.compare_data.length > 0 ? (
          <Link to="/Homecompare" className="compares123">
            <img className="compare_123" src={compare} />
            <span style={{ position: "absolute", top: "-11px" }}>
              {HomeInsurance.compare_data.length
                ? `(${HomeInsurance.compare_data.length})`
                : 0}
            </span>
          </Link>
        ) : (
          <></>
        )}
        <div className="Quotes_info1">
          <div className="container Quotes_info pt-4 pb-4">
            <div className="row " style={{ justifyContent: "center" }}>
              <Homefilter />
              <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div className="row quotes_selectoption">
                  <div className="col">
                    <span>Plan Categories</span>

                    <select
                      name="plan_category_id"
                      className="quotes_select form-control"
                      onChange={handleOption}
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
                      onChange={handleOption}
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
                      onChange={handleOption}
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
                    {HomeInsurance.additional_filter === null ||
                    !Array.isArray(HomeInsurance.additional_filter) ||
                    HomeInsurance.additional_filter.length === 0 ? (
                      <div>No additional_filter available, try reloading </div>
                    ) : (
                      HomeInsurance.additional_filter.map((val, index) => (
                        <div className="col-lg-4">
                          <Form.Check
                            key={index}
                            className="abcds_abcs filtercheck"
                            type="checkbox"
                            label={val}
                            value={val._id}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <p className="mb-3 paragra">
                  We have found {filterCount} travel insurance quotes for your
                  travel arrangements.
                </p>
                <div className="scroll_abcds">
                  {quoteData.length === 0 ? (
                    <div>No quote available now</div>
                  ) : (
                    quoteData &&
                    quoteData.map((quote, index) => {
                      const isSelected = isQuoteSelected(quote);
                      // console.log(isSelected, "value");
                      return (
                        <div className="quotes_inner" key={index}>
                          <div className="row quotes_details">
                            <div className="col-lg-3 quotesmobile">
                              {quoteData &&
                                quote.companyDetails.company_logo.map((val) => (
                                  <img
                                    key={index}
                                    alt={val.fieldname}
                                    src={`https://lmpapi.handsintechnology.in/uploads/${val.filename}`}
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

                              {quoteArr.some((val) => val._id === quote._id) ? (
                                <Form.Check
                                  className="abcds_abcs1"
                                  type="checkbox"
                                  label="Compare"
                                  name="compare_data"
                                  checked="checked"
                                  onChange={(e) => {
                                    handleFormCheck(quote, e);
                                  }}
                                />
                              ) : (
                                <Form.Check
                                  className="abcds_abcs1"
                                  type="checkbox"
                                  label="Compare"
                                  name="compare_data"
                                  checked=""
                                  onChange={(e) => {
                                    handleFormCheck(quote, e);
                                  }}
                                />
                              )}

                              <Link to="/Homeselectedquotes">
                                <button
                                  className="submit_select"
                                  onClick={() => handleStoreSelected(quote)}
                                >
                                  Select
                                </button>
                              </Link>
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  );
};

export default Homequotes;
