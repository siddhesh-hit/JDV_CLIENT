/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Innerbanner from "../Banner/Innerbanner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../Image/logo.png";
import { getCardetailsByEmail } from "../../functions";
import swal from "sweetalert";
import md5 from "md5";
import { API_URL, forntendurl } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { AddSelectedPlans } from "../../redux/reducers/MotoformDataReducerSlice";
// Replace 'username' and 'password' with your actual credentials
const username = process.env.REACT_APP_PAYMENTAPIUSERNAME;
const password = process.env.REACT_APP_PAYMENTAPIPASSWORD;
const anotherfee = 100;
// Encode the username and password in Base64 format
const Payments = () => {
  const dispatch=useDispatch();
  const location = useLocation();
  console.log("location",location)
  const navigate = useNavigate();
  const counter = useSelector((state) => state.MotoformDataReducer);
  var { state } = location;
  if(!state){
    state=counter.selectedplans
  }
  // useEffect(()=>{
    
  // },[])
  let totalAmount = state?.totaldueamount + parseFloat(state?.addOptionalCondition) + anotherfee;
  console.log({ state })
  var url =
    forntendurl +
    "/thankyou?id=" +
    counter?.leadid +
    "&plan_id=" +
    state?._id +
    "&plan_company_id=" +
    state?.company_id +
    "&final_price=" +
    totalAmount;
  async function Paymentinitiated() {
   dispatch(AddSelectedPlans(state))
    let data = {
      apiOperation: "INITIATE_CHECKOUT",
      interaction: {
        merchant: {
          name: "Last Minute Policy",
          url: "http://localhost:3000",
          logo: "https://lmpfrontend.handsintechnology.in/static/media/logo.55d872f39191272d5983.png",
        },
        displayControl: {
          billingAddress: "MANDATORY",
          customerEmail: "MANDATORY",
        },
        timeout: 1800,
        timeoutUrl: url + "&status=Pending",
        cancelUrl: forntendurl+window.location.pathname,
        returnUrl: url + "&status=Completed",
        operation: "PURCHASE",
        style: {
          accentColor: "#30CBE3",
        },
      },

      order: {
        amount: totalAmount,
        currency: "AED",
        description: "Plan Name: " + state?.companies?.company_name,
        id: counter?.leadid,
      },
      // customer: {
      //   email: counter?.email,
      // },
    };
    await axios
      .post(API_URL + "/api/payGateway", data)
      .then((response) => {
        window.Checkout.configure({
          session: {
            id: response.data.data.session.id,
          },
        });
        window.Checkout.showPaymentPage();
      });
  };

  return (
    <div>
      <Header />
      <Innerbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-4">
                  <div className="pay_Details1">
                    <div className="row" style={{ alignItems: "center" }}>
                      <div className="col-lg-5 col-sm-6 col-md-12 col-xs-12 mb-4">
                        {state?.companies?.company_logo &&
                          state?.companies?.company_logo?.length > 0 ? (
                          state?.companies?.company_logo.map((company) => {
                            return (
                              <img
                                // key={company?._id}
                                src={`${API_URL}/${company?.destination}/${company?.filename}`}
                                alt="company_logo"
                                style={{ width: "100px" }}
                              />
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-lg-7 col-sm-6 col-md-12 col-xs-12 mb-4">
                        <p> {state?.plan_name} </p>
                      </div>
                      <hr />
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>Total Premium</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6 style={{ textAlign: "right" }}>
                          AED {state?.totaldueamount}
                        </h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>FEE</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6 style={{ textAlign: "right" }}>
                          AED {anotherfee}
                        </h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>VAT</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6 style={{ textAlign: "right" }}>
                          AED {state?.addOptionalCondition}
                        </h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>Discount</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6 style={{ textAlign: "right" }}>AED 0.00</h6>
                      </div>
                      <hr />
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>Total Amount</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6
                          style={{
                            textAlign: "right",
                            fontWeight: "600",
                            fontSize: "28px",
                            color: "#D91818",
                          }}
                        >
                          AED {totalAmount}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="pay_Details">
                    <img style={{ marginBottom: '20px', width: '110px' }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Visa_Electron.svg/1200px-Visa_Electron.svg.png" />
                    <p>
                      Please click the button below and follow the instructions
                      provided to complete your AED {state?.totaldueamount}{" "}
                      payment.
                    </p>
                    <p>
                      <b style={{ color: "#ed2a30" }}>Or</b>
                    </p>
                    <p>You can pay in our bank account mentioned below.</p>
                    <p>
                      Abu Dhabi Commercial Bank, P.O. Box 118385, Dubai, UAE
                      JOIE de VIVRE INTL INSURANCE BROKERAGE LLC
                    </p>
                    <p>744598020002</p>
                    <p>Swift Code : ADCBAEAA</p>
                    <p>IBAN: AE880030000744598020002</p>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                      <Link
                        onClick={() => navigate(-1)}
                        state={{ ...state }}
                        className="buttonactions1"
                      >
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right" }}
                    >
                      <a onClick={Paymentinitiated} className="buttonactions1">
                        Pay Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <h3 className="disclaimerss">
        Medical insurance comparision for your medical requirements
      </h3> */}
      <Footer />
    </div>
  );
};

export default Payments;
