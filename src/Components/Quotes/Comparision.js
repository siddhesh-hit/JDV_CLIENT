import React, { useCallback, useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import Filters from "./Filters";
import { Table } from "react-bootstrap";
import finance from "../../Image/finance.svg";
import cross from "../../Image/cross.svg";
import { PostData, getCardetailsByEmail, getData } from "../../functions";
import { API_URL } from "../..";
import { useSelector, useDispatch } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import {
  AddToComapre,
  DeleteFromComapre,
} from "../../redux/reducers/MotoformDataReducerSlice";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UseMotorContext } from "../../MultiStepContextApi";
import axios from "axios";
const Comparision = () => {
  const navigate = useNavigate();
  const counter = useSelector((state) => state.MotoformDataReducer);
  const [notCoveredData, setnotCoveredData] = useState([]);
  const [alldata, setalldata] = useState(counter?.alldata || []);
  const dispatch = useDispatch();
  const handleAddFunction = (item) => {
    dispatch(AddToComapre({ data: item }));
  };
  const handlePlanRemove = (id) => {
    dispatch(DeleteFromComapre({ data: id }));
  };

  useEffect(() => {
    setalldata(counter.allplans);
  }, [counter]);

  const [LeadId, setLeadId] = useState(null);
  useEffect(() => {
    getPersonalDeatails();
    getAllStandardCovered();
  }, [counter]);
  const getPersonalDeatails = async () => {
    await getCardetailsByEmail()
      .then(async (response) => {
        setLeadId(response?._id);
      })
      .catch((error) => console.log(error));
  };
  const getAllStandardCovered = async () => {
    try {
      getData(API_URL + "/api/getAllStandardCovered?lob=Motor")
        .then((res) => {
          setnotCoveredData(res.data.data);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
  const UpdatePolicy = async (
    id,
    plan_company_id,
    plan_id,
    final_price,
    ciphertext
  ) => {
    try {
      await axios
        .put(`${API_URL}/api/updatePolicyDetails?id=${id}`, {
          plan_company_id,
          plan_id,
          final_price,
          paymentStatus: ciphertext,
        })
        .then((res) => {
          console.log({ res });
        })
        .catch((error) => {
          console.log({ error });
        });
    } catch (error) {
      console.log(error);
      // Handle the error here, such as showing an error message or fallback behavior.
    }
  };
  const SelectPolicy = async (LeadId, company_id, id, totaldueamount) => {
    await UpdatePolicy(LeadId, company_id, id, totaldueamount, "Pending");
  };
  const statecarousel = {
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
  return (
    <div>
      <Header />
      {/* <Innerbanner /> */}
      <div className="quotes_filters1 comparision">
        <div className="container quotes_filters hide pt-4 pb-4">
          <div className="row">
            <Filters />
            <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 table-container">
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
              {counter?.comparelist && counter?.comparelist.length > 0 ? (
                <div className="scroll_abcd">
                  <table
                    className="comparisions table table-lg table-striped"
                    style={{ textAlign: "center" }}
                  >
                    <thead>
                      <tr>
                        <td style={{ whiteSpace: "nowrap" }}>
                          Policy Features List
                        </td>
                        {counter?.comparelist &&
                          counter?.comparelist.length > 0 &&
                          counter?.comparelist.map((companydata) => {
                            return (
                              <td>
                                {companydata?.companies?.company_logo &&
                                  companydata?.companies?.company_logo?.length >
                                  0 ? (
                                  companydata?.companies?.company_logo.map(
                                    (company) => {
                                      return (
                                        <img className="comp_logoas"
                                          // key={company?._id}
                                          src={`${API_URL}/${company?.destination}/${company?.filename}`}
                                          alt="company_logo"

                                        />
                                      );
                                    }
                                  )
                                ) : (
                                  <></>
                                )}
                              </td>
                            );
                          })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 'bold', color: '#003399' }}>Plan Name</td>
                        {counter?.comparelist &&
                          counter?.comparelist.length > 0 &&
                          counter?.comparelist.map((p) => {
                            return <td style={{ fontWeight: 'bold', color: '#003399' }}>{p?.plan_name}</td>;
                          })}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 'bold', color: '#003399' }}>Premium Amount</td>
                        {counter?.comparelist &&
                          counter?.comparelist.length > 0 &&
                          counter?.comparelist.map((Pr) => {
                            return <td> <span style={{ fontWeight: 'bold', color: '#003399' }}>{typeof Pr?.finallBasePremium === "number" ? "AED" : ""} {Pr?.finallBasePremium}</span> </td>;
                          })}
                      </tr>
                      {notCoveredData && notCoveredData.length > 0
                        ? notCoveredData.map((nv) => {
                          return (
                            <tr key={nv?._id}>
                              <td>{nv?.standard_cover_label}</td>
                              {counter?.comparelist &&
                                counter?.comparelist.length > 0 &&
                                counter?.comparelist.map((data) => {
                                  const foundData = data?.standard_cover_arr.find(
                                    (item) => nv?._id === item?.standard_cover_id
                                  );
                                  return (
                                    <td key={data?._id}>
                                      {foundData ? (
                                        <div className="hover-effect">
                                          <img
                                            style={{
                                              width: "25px"
                                            }}
                                            src="https://static.vecteezy.com/system/resources/previews/010/143/044/non_2x/tick-icon-sign-symbol-design-free-png.png"
                                            alt="Tick"
                                          />
                                          <span className="hover-text">
                                            {foundData?.standard_cover_desc}
                                          </span>
                                        </div>
                                      ) : (
                                        <img src={cross} alt="Cross" />
                                      )}
                                    </td>
                                  );
                                })}
                            </tr>
                          );
                        })
                        : null}

                      <tr>
                        <td>{""}</td>
                        {counter?.comparelist &&
                          counter?.comparelist.length > 0 &&
                          counter?.comparelist.map((p) => {

                            return (
                              <td>
                                {typeof p?.finallBasePremium === "number" ? (
                                  <Link
                                    onClick={() =>
                                      SelectPolicy(
                                        LeadId,
                                        p?.company_id,
                                        p?._id,
                                        p?.finallBasePremium
                                      )
                                    }
                                    to={`/Selectedquotes`}
                                    state={{ ...p }}
                                  >
                                    <button className="submit_select">Buy this</button>
                                  </Link>
                                ) : typeof p?.finallBasePremium === "string" ? (
                                  <Link
                                    to={
                                      "/thankyou?id=" +
                                      LeadId +
                                      "&plan_id=" +
                                      p?._id +
                                      "&plan_company_id=" +
                                      p?.company_id +
                                      "&final_price=" +
                                      p?.finallBasePremium +
                                      "&status=Completed"
                                    }
                                  >
                                    <button className="submit_select">
                                      Buy this
                                    </button>
                                  </Link>
                                ) : (
                                  <Link
                                    to={
                                      "/thankyou?id=" +
                                      LeadId +
                                      "&plan_id=" +
                                      p?._id +
                                      "&plan_company_id=" +
                                      p?.company_id +
                                      "&final_price=" +
                                      p?.finallBasePremium +
                                      "&status=Completed"
                                    }
                                  >
                                    <button className="submit_select">
                                      Buy this
                                    </button>
                                  </Link>
                                )}
                              </td>
                            );
                          })}
                      </tr>
                      <tr>
                        <td>{""}</td>
                        {counter?.comparelist &&
                          counter?.comparelist.length > 0 &&
                          counter?.comparelist.map((p) => {
                            return (
                              <td>
                                <Link>
                                  <button
                                    onClick={() => handlePlanRemove(p)}
                                    className="removecompare"
                                  >
                                    Remove
                                  </button>
                                </Link>
                              </td>
                            );
                          })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
                  <Navigate replace to="/Quotes" />
                </>
              )}
            </div>
          </div>
          <div className="mt-4 compare_list">
            <h3 className="mb-4 mt-2">How about these ?</h3>
            <OwlCarousel
              margin={30}
              nav={false}
              dots={false}
              items={2}
              touchDrag={true}
              lazyLoad={true}
              responsive={statecarousel.responsive}
            >
              {alldata && alldata.length > 0 ? (
                <>
                  {alldata.map((c) => {
                    return (
                      <div className="item">
                        <div className="comparelistcarousel">
                          {c?.companies?.company_logo &&
                            c?.companies?.company_logo.length > 0 ? (
                            c?.companies?.company_logo.map((company) => {
                              return (
                                <img
                                  key={company?._id}
                                  src={`${API_URL}/${company?.destination}/${company?.filename}`}
                                  alt="company_logo"
                                />
                              );
                            })
                          ) : (
                            <></>
                          )}

                          <p> {c?.plan_name} </p>
                          <h4>{c?.finallBasePremium}</h4>
                          <strike>{c?.finallBasePremium}</strike>
                          <span>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            4.5
                          </span>
                          <button
                            className="addtocomparebutton"
                            onClick={() => handleAddFunction(c)}
                          >
                            Add to compare
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>No Data Found</>
              )}
            </OwlCarousel>
          </div>
          {/* <p className="similarviews">Show most viewed and similar products</p> */}
        </div>
        <h3 className="disclaimerss mt-4">
          Motor insurance comparision for your Motor requirements
        </h3>
      </div>
      <Footer />
    </div>
  );
};

export default Comparision;
