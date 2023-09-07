import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import finance from "../../Image/finance.svg";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import tick from "../../Image/ticks.svg";
import cross from "../../Image/cross.svg";
import Travelfilter from "./Travelfilter";
import { Link } from "react-router-dom";
import Travelbanner from "../Banner/Travelbanner";
import { useEffect } from "react";
import { get, set } from "firebase/database";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import compare from "../../Image/comparelist.png";

const Travelquotes = () => {
  useEffect(() => {
    getadditionalcover();
  }, []);

  const [additionalCoverdetails, setAdditionalCoverdetails] = useState([]);
  const [additionalfilter, setAdditionalfilter] = useState([]);

  const additionalfilterdata = (id) => {
    console.log(id);
    if (additionalfilter.includes(id)) {
      // If the id is already in the array, remove it
      setAdditionalfilter(
        additionalfilter.filter((filterId) => filterId !== id)
      );
    } else {
      // If the id is not in the array, add it
      setAdditionalfilter([...additionalfilter, id]);
    }
    getMatchTravelPlan();
  };

  console.log(additionalfilter);

  const getadditionalcover = () => {
    var requestOptions = {
      method: "get",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "https://lmpapi.handsintechnology.in/api/getAllAdditionalCovered?lob=Travel",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setAdditionalCoverdetails(data.data);
      });
  };

  console.log(additionalCoverdetails);

  const { compareselect, setCompareselect } = UseMotorContext();
  const { comparematch, setComparematch } = UseMotorContext();

  const navigate = useNavigate();

  const [planDetailsVisibility, setPlanDetailsVisibility] = useState({});

  const toggleShowMore = (planId) => {
    setPlanDetailsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [planId]: !prevVisibility[planId], // Toggle the visibility for the specific plan
    }));
  };

  const { travelsFormsData, settravelsFormsData } = UseMotorContext();

  // console.log(travelsFormsData)

  const [plancategory, setplancategory] = useState([]);
  const [company, setCompany] = useState([]);
  const [planNature, setPlanNature] = useState([]);
  const [matchTravelPlan, setMatchTravelPlan] = useState([{}]);
  const [show, setShow] = useState(false);

  const [selectedPlanCategory, setSelectedPlanCategory] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedPlanNature, setSelectedPlanNature] = useState("");
  const [selectedprice, setSelectedprice] = useState("Lowest");

  const data = travelsFormsData;
  // console.log(">>>>>>>>>>data", data)

  const handleClose = () => setShow(false);

  const insuranceType = data.line_of_business;
  const email = data.email;
  const travel_insurance_for = data.insure_your_travel;
  const travel_trip_type = data.type_of_trip;
  const travel_plan_type = data.plan_type;
  const no_of_travel = data.no_of_travel;
  const travel_start_date = data.start_date;
  const travel_end_date = data.end_date;
  const date_of_birth = data.date_of_birth;
  const travel_region_country = data.travel_destination;

  useEffect(() => {
    getplancategorydetails();
    getCompanydetails();
    getplannaaturedetails();
    getMatchTravelPlan();
    localStorage.setItem("travelsFormsDataLocation", window.location.pathname);
  }, []);

  useEffect(() => {
    getMatchTravelPlan();
  }, [
    selectedPlanCategory,
    selectedCompany,
    selectedPlanNature,
    selectedprice,
    travel_insurance_for,
    travel_trip_type,
    travel_plan_type,
    travel_start_date,
    travel_end_date,
    date_of_birth,
    travel_region_country,
    compareselect,
    additionalfilter,
  ]);

  const getplancategorydetails = async () => {
    try {
      const response = await fetch(
        "https://lmpapi.handsintechnology.in/api/getAllPlanCategories"
      );
      const data = await response.json();
      setplancategory(data.data);
    } catch (error) {
      console.log("Error getting plan category details:", error);
    }
  };

  const getCompanydetails = async () => {
    try {
      const response = await fetch(
        "https://lmpapi.handsintechnology.in/api/getAllCompanies"
      );
      const data = await response.json();
      setCompany(data.data);
    } catch (error) {
      console.log("Error getting company details:", error);
    }
  };

  const getplannaaturedetails = async () => {
    try {
      const response = await fetch(
        "https://lmpapi.handsintechnology.in/api/getNaturePlan"
      );
      const data = await response.json();
      setPlanNature(data.data);
    } catch (error) {
      console.log("Error getting plan nature details:", error);
    }
  };

  // console.log(">>>>>>>>>>travel_insurance_for", travel_insurance_for)
  // console.log(">>>>>>>>>>travel_trip_type", travel_trip_type)
  // console.log(">>>>>>>>>>travel_plan_type", travel_plan_type)
  // console.log(">>>>>>>>>>travel_start_date", travel_start_date)
  // console.log(">>>>>>>>>>travel_end_date", travel_end_date)
  // console.log(">>>>>>>>>>date_of_birth", date_of_birth)
  // console.log(">>>>>>>>>>travel_destination", travel_region_country)

  const getMatchTravelPlan = async () => {
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planCategoriesId: selectedPlanCategory,
        companyId: selectedCompany,
        planNaturId: selectedPlanNature,
        price: selectedprice,
        travel_insurance_for: travel_insurance_for,
        travel_trip_type: travel_trip_type,
        travel_plan_type: travel_plan_type,
        travel_start_date: travel_start_date,
        travel_end_date: travel_end_date,
        date_of_birth: date_of_birth,
        travel_region_country: travel_region_country,
        additionalCoverId: additionalfilter || [],
      }),
    };

    await fetch(
      "https://lmpapi.handsintechnology.in/api/getMatchTravelPlan",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setMatchTravelPlan(result.data);
        // console.log(result); // Updated value of insureyourtravel
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    submitupdateddata();
  }, [
    travel_insurance_for,
    travel_trip_type,
    no_of_travel,
    travel_plan_type,
    travel_start_date,
    travel_end_date,
    date_of_birth,
    travel_region_country,
  ]);

  const submitupdateddata = async () => {
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        insuranceType: insuranceType,
        email: email,
        travel_insurance_for: travel_insurance_for,
        travel_trip_type: travel_trip_type,
        travel_plan_type: travel_plan_type,
        no_of_travel: no_of_travel,
        travel_start_date: travel_start_date,
        travel_end_date: travel_end_date,
        travel_region_country: travel_region_country,
      }),
    };

    await fetch(
      "https://lmpapi.handsintechnology.in/api/fillInsurancePlan",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result); // Updated value of insureyourtravel
        getMatchTravelPlan();
      })
      .catch((error) => console.log("error", error));
  };

  // console.log(matchTravelPlan)

  // const handleCheckboxClick = (planId) => {
  //     if (selectedPlanIds.includes(planId)) {
  //         // If the planId is already selected, remove it from the state
  //         setSelectedPlanIds(selectedPlanIds.filter(id => id !== planId));
  //         localStorage.removeItem("compareselect", JSON.stringify(planId));

  //     } else {
  //         // If the planId is not selected, add it to the state
  //         setSelectedPlanIds([...selectedPlanIds, planId]);
  //         localStorage.setItem("compareselect", JSON.stringify(planId));

  //     }
  //     setShow(true)
  // };

  //  const handleCheckboxClick = (planId) => {
  //     if (compareselect.includes(planId)) {
  //         // If the planId is already selected, remove it from the state
  //         setCompareselect(compareselect.filter(id => id !== planId));
  //         localStorage.removeItem("compareselect", JSON.stringify(planId));

  //     } else {
  //         // If the planId is not selected, add it to the state
  //         setCompareselect([...compareselect, planId]);
  //         localStorage.setItem("compareselect", JSON.stringify(planId));

  //     }
  //     setShow(true)
  // };

  const handleCheckboxClick = (planId) => {
    if (
      compareselect.some((plan) => plan.planData?._id === planId.planData?._id)
    ) {
      // If the planId is already selected, remove it from the state
      setCompareselect(
        compareselect.filter(
          (plan) => plan.planData?._id !== planId.planData?._id
        )
      );
      localStorage.removeItem(
        "compareselect",
        JSON.stringify(planId.planData?._id)
      );
    } else {
      // If the planId is not selected, add it to the state
      setCompareselect([...compareselect, planId]);
      localStorage.setItem(
        "compareselect",
        JSON.stringify(planId.planData?._id)
      );
    }
    setShow(true);
    // const data=compareselect.find((plan) => plan.planData && plan.planData._id === planId.planData._id);
    // console.log({data})
  };

  const handleremoveplan = (planId) => {
    setCompareselect((prevIds) => prevIds.filter((id) => id !== planId)); // Remove planId from selectedPlanIds
    localStorage.removeItem("compareselect", JSON.stringify(planId));
    const planItem = compareselect.find((item) => item === planId);
    if (planItem) {
      handleCheckboxClick(planItem);
    }
    getMatchTravelPlan();
  };

  const handleCompareClick = () => {
    console.log("object");
    setComparematch(matchTravelPlan);
    localStorage.setItem("comparematch", JSON.stringify(matchTravelPlan));
    navigate("/Travelcomparision", {
      state: { matchTravelPlan },
      replace: true, // Add this to replace the current history entry
    });
  };

  const handlePlanSelect = (plan) => {
    console.log(plan);
    const updatedPlan = plan;

    // Navigate to TravelSelectedquotes if a plan is selected
    if (updatedPlan) {
      navigate("/TravelSelectedquotes", {
        state: { selectedPlan: updatedPlan, matchTravelPlan: matchTravelPlan },
      });
    }

    return updatedPlan;
  };

  const handlereferredplan = async (plan) => {
    const company_id = plan?.companies.map((item) => item._id).toString();
    const plan_id = plan?.planData?._id;
    const id = JSON.parse(localStorage.getItem("leaddetails"));

    console.log(company_id, plan_id, id);
    const requestOptions = {
      method: "Put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        final_price: "REFFERED",
        company_id: company_id.toString(),
        plan_id: plan_id,
        paymentStatus: "Completed",
      }),
    };

    await fetch(
      `https://lmpapi.handsintechnology.in/api/updatePolicyDetails?id=${id}`,
      requestOptions
    )
      .then((response) => {
        console.log(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });

    navigate("/ThankYou");
  };

  return (
    <div>
      <Header />
      {/* {compareselect.length > 0 && (
                <Offcanvas style={{ height: 'auto' }} show={show} onHide={handleClose} placement="bottom" backdrop={false} scroll={true}>
                    <Offcanvas.Body>
                        <div class="spc_field">
                            <div class="spcWrapper">
                                <div class="spc row" style={{ justifyContent: 'center' }}>
                                    {compareselect.map((plan) => (
                                        <div key={plan} class="selectedSpecification col-lg-3">

                                            <h6>{plan.planData?.plan_name}</h6>
                                            <p>AED {plan.travelBasePremium} </p><span onClick={() => handleremoveplan(plan)}>x</span>

                                        </div>
                                    ))}

                                    <div className="buttonadjust">
                                        <button className="cancelabcd" onClick={() => setShow(false)}>Cancel</button>
                                        {compareselect.length > 1 &&
                                            <button className="compareabcd" onClick={handleCompareClick}>Compare</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            )} */}

      {compareselect.length > 0 ? (
        <Link onClick={() => handleCompareClick()} className="compares123">
          <img className="compare_123" src={compare} />
          <span style={{ position: "absolute", top: "-11px" }}>
            {compareselect.length ? compareselect.length : 0}
          </span>
        </Link>
      ) : (
        <></>
      )}

      <div className="Quotes_info1">
        <div className="container Quotes_info pt-4 pb-4">
          <div className="row" style={{ justifyContent: "center" }}>
            <Travelfilter matchTravelPlan={matchTravelPlan} />
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div className="row quotes_selectoption">
                <div className="col">
                  <span className="quotes_selectoption">Plan Categories</span>
                  <select
                    className="quotes_select form-control"
                    onChange={(e) => setSelectedPlanCategory(e.target.value)}
                  >
                    {/* Render the options from the plancategory array */}
                    <option value="">Any</option>
                    {plancategory.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.plan_category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <span className="quotes_selectoption">Ins Company</span>

                  <select
                    className="quotes_select form-control"
                    onChange={(e) => setSelectedCompany(e.target.value)}
                  >
                    <option value="">Any</option>
                    {company.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.company_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <span className="quotes_selectoption">Plan Nature</span>

                  <select
                    className="quotes_select form-control"
                    onChange={(e) => setSelectedPlanNature(e.target.value)}
                  >
                    <option value="">Any</option>
                    {planNature.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nature_of_plan_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <span className="quotes_selectoption">Instant Policy</span>
                  <select className="quotes_select form-control">
                    <option value="">Any</option>
                    <option>Sort By</option>
                    <option>Sort By</option>
                  </select>
                </div>
                <div className="col">
                  <span className="quotes_selectoption">Price</span>
                  <select
                    className="quotes_select form-control"
                    onChange={(e) => setSelectedprice(e.target.value)}
                  >
                    <option hidden>Select</option>
                    <option value="Highest Price">Highest Price</option>
                    <option value="Lowest Price" selected>
                      Lowest Price
                    </option>
                  </select>
                </div>
              </div>
              <div className="row quotes_selectoption filters">
                <div className="row" style={{ alignItems: "center" }}>
                  <span className=" col-lg-2">More Filters</span>
                  {additionalCoverdetails.map((item) => (
                    <div className="col-lg-5">
                      <Form.Check
                        key={item.additional_cover_label} // Using label + index as a unique key
                        className="abcds_abcs filtercheck quotes_selectoption"
                        type="checkbox"
                        name="filter"
                        label={item.additional_cover_label}
                        value={item._id}
                        onChange={() => additionalfilterdata(item._id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <p className="mb-3 paragra">
                We have found {matchTravelPlan.length} travel insurance quotes
                for your travel arrangements.
              </p>
              <div className="scroll_abcds">
                {matchTravelPlan.map((item) => (
                  <div className="quotes_inner">
                    <div className="row quotes_details">
                      <div className="col-lg-3 quotesmobile">
                        {item.companies?.map((item1) =>
                          item1.company_logo.map((logo) => (
                            <img
                              src={`https://lmpapi.handsintechnology.in/uploads/${logo.filename}`}
                              alt="logo"
                            />
                          ))
                        )}
                        {item.companies?.map((item1) => (
                          <h6 className="companyname">{item1.company_name}</h6>
                        ))}
                      </div>
                      <div className="col-lg-6 quotemobile">
                        <h4>{item.planData?.plan_name}</h4>
                        {item.planData?.additional_cover_arr?.map((item2) => (
                          <ul className="benefits">
                            <li>{item2.additional_cover_label}</li>
                          </ul>
                        ))}
                      </div>
                      <div className="col-lg-3 action_abcd quotesmobile">
                        <h2>
                          {item.travelBasePremium == "Referred"
                            ? "Referred"
                            : "AED " + item.travelBasePremium}
                        </h2>

                        {item.travelBasePremium == "Referred" ? (
                          <button
                            className="submit_select"
                            onClick={() => handlereferredplan(item)}
                          >
                            Select
                          </button>
                        ) : (
                          <>
                            <label htmlFor={`compareCheckbox-${item}`}>
                              <Form.Check
                                id={`compareCheckbox-${item}`}
                                className="abcds_abcs1"
                                type="checkbox"
                                label="Compare"
                                checked={compareselect.find((plan) =>
                                  plan.planData &&
                                  plan?.planData?._id === item.planData?._id
                                    ? true
                                    : false
                                )}
                                onClick={() => handleCheckboxClick(item)}
                              />
                            </label>
                            <button
                              className="submit_select"
                              onClick={() => handlePlanSelect(item)}
                            >
                              Select
                            </button>
                          </>
                        )}

                        <p>T&C Apply</p>
                      </div>
                    </div>
                    {planDetailsVisibility[item.planData?._id] ? (
                      <div className="rowabcds">
                        <div className="row overalldetails">
                          <div className="col-lg-6 abc">
                            <img
                              style={{ width: "auto", marginRight: "15px" }}
                              src={tick}
                            />
                            <span className="abcds_aud">What is Covered.</span>
                            {item.planData?.standard_cover_arr?.map((item3) => (
                              <ul className="description">
                                <li>{item3.standard_cover_label}</li>
                              </ul>
                            ))}
                          </div>
                          <div className="col-lg-6 cde">
                            <img
                              style={{ width: "auto", marginRight: "15px" }}
                              src={cross}
                            />
                            <span className="abcds_aud">
                              What is not Covered.
                            </span>
                            {item.notCoveredData?.map((item4) => (
                              <ul className="description">
                                <li>{item4.standard_cover_label}</li>
                              </ul>
                            ))}
                          </div>
                        </div>
                        <div className="row overalldetails">
                          <button
                            className="showadd_details"
                            onClick={() => toggleShowMore(item.planData?._id)}
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
                            onClick={() => toggleShowMore(item.planData?._id)}
                          >
                            See Details
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Travelquotes;
