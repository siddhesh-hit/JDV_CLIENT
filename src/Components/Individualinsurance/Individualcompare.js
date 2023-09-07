import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Filters from "./Individualmedicalfilter";
import { Table } from "react-bootstrap";
import cross from "../../Image/cross.svg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import admin from "../../config";
const Individualcompare = () => {
  const state = {
    lazyLoad: true,
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 3,
      },
      1024: {
        items: 6,
      },
    },
  };

  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
  } = UseMotorContext();
  const [notCoveredData, setNotCoveredData] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const [filteredCompareData, setFilteredCompareData] = useState([]);
  const [fullCompareData, setFullCompareData] = useState([]);
  const [updatePolicyId, setUpdatePolicyId] = useState("");
  const API_URL = "http://localhost:8000/api/";

  const fetchData = async () => {
    await fetch(`${admin}getAllStandardCovered?lob=Medical`)
      .then((data) => data.json())
      .then((data) => setNotCoveredData(data.data))
      .catch((e) => console.log(e));
  };

  // const filterData = () => {
  //   const filteredData = fullCompareData.filter((fullData) => {
  //     return !compareData.some(
  //       (compareItem) => compareItem._id === fullData._id
  //     );
  //   });
  //   setFilteredCompareData(filteredData);
  // };

  const handleAddFunction = (item) => {
    // Check if the item is already in compareData
    if (!compareData.some((compareItem) => compareItem._id === item._id)) {
      const updatedCompareData = [...compareData, item];

      // Remove the item from filteredCompareData
      setFilteredCompareData((prevFilteredData) =>
        prevFilteredData.filter((filteredItem) => filteredItem._id !== item._id)
      );

      setIndividualInsurance((prevIndividualInsurance) => ({
        ...prevIndividualInsurance,
        compare_data: updatedCompareData,
      }));

      setCompareData(updatedCompareData); // Update the state directly with updatedCompareData

      return updatedCompareData;
    }
    return compareData; // No need to return the previous state here, just return compareData
  };

  const handlePlanRemove = (plan) => {
    setCompareData((prevCompareData) => {
      // Check if the plan is in compareData
      const planIndex = prevCompareData.findIndex(
        (compareItem) => compareItem._id === plan._id
      );

      if (planIndex !== -1) {
        // Remove the plan from compareData
        const updatedCompareData = [
          ...prevCompareData.slice(0, planIndex),
          ...prevCompareData.slice(planIndex + 1),
        ];

        // Update compareData and filteredCompareData simultaneously
        setCompareData(updatedCompareData);
        setFilteredCompareData((prevFilteredData) => {
          if (!prevFilteredData.some((item) => item._id === plan._id)) {
            return [...prevFilteredData, plan];
          }
          return prevFilteredData;
        });

        setIndividualInsurance((prevIndividualInsurance) => ({
          ...prevIndividualInsurance,
          compare_data: updatedCompareData,
        }));

        return updatedCompareData;
      }

      return prevCompareData;
    });
  };

  const handleStoreSelected = async (data) => {
    console.log(data);
    setIndividualInsurance((prevState) => ({
      ...prevState,
      selectFilter: data,
      company_id: data.company_id,
      final_price: 1200,
      plan_type_id: data._id,
    }));
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
    const { company_id, plan_type_id } = data;
    const dataToSend = {
      plan_category_id: company_id,
      plan_type_id,
      final_price: 1200,
      paymentStatus: "pending",
    };
    console.log(dataToSend);

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("IndividualInsurance");
    const parse = JSON.parse(data);
    if (parse) {
      setIndividualInsurance(parse);
      setCompareData(parse.compare_data);
      setFullCompareData(parse.full_compare_data);
      setUpdatePolicyId(IndividualInsurance.updatePolicy_id);
    }
  }, []);

  const filterData = useCallback(() => {
    const filteredData = fullCompareData.filter((fullData) => {
      return !compareData.some(
        (compareItem) => compareItem._id === fullData._id
      );
    });
    setFilteredCompareData(filteredData);
  }, [fullCompareData, compareData]);

  useEffect(() => {
    filterData(); // Update filteredCompareData when fullCompareData changes
  }, [fullCompareData, compareData]);

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
      <Innerbanner />
      <div className="quotes_filters1 comparision">
        <div className="container quotes_filters hide pt-4 pb-4">
          <div className="row">
            <Filters />
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
              {IndividualInsurance.compare_data.length === 0 ? (
                (window.location.href = "/Individualinsurancequote")
              ) : (
                // <></>
                <Table
                  style={{ textAlign: "center" }}
                  striped
                  size="lg"
                  className="comparisions"
                >
                  <tbody>
                    <tr>
                      <td style={{ whiteSpace: "nowrap" }}>
                        Policy Features List
                      </td>
                      {compareData.map((data) =>
                        data.companyDetails.company_logo.map((val) => (
                          <td key={val._id}>
                            <img
                              className="comp_logoas"
                              alt={val.fieldname}
                              src={`https://lmpapi.handsintechnology.in/uploads/${val.filename}`}
                            />
                          </td>
                        ))
                      )}
                    </tr>

                    <tr>
                      <td style={{ fontWeight: "bold", color: "#003399" }}>
                        Plan Name
                      </td>
                      {compareData.map((data) => (
                        <td
                          style={{ fontWeight: "bold", color: "#003399" }}
                          key={data._id}
                        >
                          <p>{data.plan_name}</p>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={{ fontWeight: "bold", color: "#003399" }}>
                        Premium Amount
                      </td>
                      {compareData.map((data) => (
                        <td
                          style={{ fontWeight: "bold", color: "#003399" }}
                          key={data._id}
                        >
                          <p>596</p>
                        </td>
                      ))}
                    </tr>

                    {notCoveredData.map((nv) => (
                      <tr key={nv._id}>
                        <td>{nv.standard_cover_label}</td>
                        {compareData.map((data) => {
                          const foundData = data?.standard_cover_arr.find(
                            (item) => {
                              if (nv?._id === item?.standard_cover_id) {
                                return true;
                              } else {
                                return false;
                              }
                            }
                          );
                          return (
                            <td key={data._id}>
                              <>
                                {foundData ? (
                                  <td>
                                    {data?.standard_cover_arr &&
                                    data?.standard_cover_arr.length > 0 ? (
                                      data.standard_cover_arr.map((cover) => {
                                        return (
                                          <li style={{ listStyleType: "none" }}>
                                            {cover?.standard_cover_label} (
                                            {cover?.standard_cover_desc})
                                          </li>
                                        );
                                      })
                                    ) : (
                                      <></>
                                    )}
                                  </td>
                                ) : (
                                  <img src={cross} alt="Cross" />
                                )}
                              </>{" "}
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    <tr>
                      <td></td>
                      {compareData.map((data) => (
                        <td key={data._id}>
                          <Link to="/Individualselectedquote">
                            <button
                              className="submit_select"
                              onClick={() => handleStoreSelected(data)}
                            >
                              Select
                            </button>
                          </Link>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td></td>
                      {compareData.map((data) => (
                        <td key={data._id}>
                          <button
                            className="removecompare"
                            onClick={() => handlePlanRemove(data)}
                          >
                            Remove
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </Table>
              )}
            </div>
          </div>
          <div className="mt-4 compare_list">
            <h3 className="mb-4 mt-2">How about these ?</h3>

            {filteredCompareData.length > 0 ? (
              <OwlCarousel
                margin={30}
                autoplay={true}
                loop={false}
                nav={false}
                dots={false}
                items={1}
                touchDrag={true}
                lazyLoad={true}
                responsive={state.responsive}
              >
                {filterData &&
                  filteredCompareData.map((data) => (
                    <div className="item" key={data._id}>
                      <div className="comparelistcarousel">
                        {data.companyDetails.company_logo.map((val) => (
                          <img
                            key={val._id}
                            alt={val.fieldname}
                            src={`https://lmpapi.handsintechnology.in/uploads/${val.filename}`}
                          />
                        ))}
                        <p>{data.plan_name}</p>
                        <h4>AED 2500</h4>
                        <h5>
                          <strike>AED 2500!</strike>
                        </h5>
                        <span>
                          <i className="fa fa-star" aria-="true"></i>4.5
                        </span>
                        <button
                          className="addtocomparebutton"
                          onClick={() => handleAddFunction(data)}
                        >
                          Add to compare
                        </button>
                      </div>
                    </div>
                  ))}
              </OwlCarousel>
            ) : (
              <div>No data to display</div>
            )}
          </div>
        </div>
        <h3 className="disclaimerss">
          Individual medical insurance comparision for your medical requirements
        </h3>
      </div>
      <Footer />
    </div>
  );
};

export default Individualcompare;
