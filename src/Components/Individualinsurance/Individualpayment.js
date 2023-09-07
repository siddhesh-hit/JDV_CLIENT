/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Individualmedicalbanner from "../Banner/Individualmedicalbanner";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../Image/logo.png";
import { getCardetailsByEmail } from "../../functions";
import swal from "sweetalert";
import { UseMotorContext } from "../../MultiStepContextApi";
import { useNavigate } from "react-router-dom";
import admin from "../../config";
// Replace 'username' and 'password' with your actual credentials
// const username = "merchant.TEST120810000062";
// const password = "e9c1b8c7254e8be8c7a41d71d898f43a";
// Encode the username and password in Base64 format
const Individualpayment = () => {
  const API_URL = process.env.REACT_APP_BACKENDURL;

  const location = useLocation();
  const { state } = location;
  const [Loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState([]);
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
  } = UseMotorContext();

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("IndividualInsurance");
    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
      setQuoteData([JSON.parse(stored).selectFilter]);
      //   setUpdatePolicyId(IndividualInsurance.updatePolicy_id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [IndividualInsurance]);

  let hostname =
    window.location.hostname === "localhost"
      ? window.location.hostname + ":3000"
      : window.location.hostname;
  let host = window.location.protocol + "//" + hostname;

  const UpdatePolicy = async (
    id,
    plan_company_id,
    plan_id,
    final_price,
    ciphertext
  ) => {
    try {
      await axios
        .put(`${admin}/updatePolicyDetails?id=${id}`, {
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
    }
  };

  async function Paymentinitiated() {
    let orderid = "OD" + Date.now();
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
        timeoutUrl:
          host +
          "/thankyou?id=" +
          IndividualInsurance?.updatePolicy_id +
          "&plan_id=" +
          IndividualInsurance?.selectFilter._id +
          "&plan_company_id=" +
          IndividualInsurance?.company_id +
          "&final_price=" +
          IndividualInsurance?.final_price +
          "&status=Pending",
        cancelUrl:
          host +
          "/thankyou?id=" +
          IndividualInsurance?.updatePolicy_id +
          "&plan_id=" +
          IndividualInsurance?.selectFilter._id +
          "&plan_company_id=" +
          IndividualInsurance?.company_id +
          "&final_price=" +
          IndividualInsurance?.final_price +
          "&status=Cancelled",
        returnUrl:
          host +
          "/thankyou?id=" +
          IndividualInsurance?.updatePolicy_id +
          "&plan_id=" +
          IndividualInsurance?.selectFilter._id +
          "&plan_company_id=" +
          IndividualInsurance?.company_id +
          "&final_price=" +
          IndividualInsurance?.final_price +
          "&status=Completed",

        operation: "PURCHASE",
        style: {
          accentColor: "#30CBE3",
        },
      },
      order: {
        amount: 1200,
        currency: "AED",
        description: "Plan Name: " + IndividualInsurance.selectFilter.plan_name,
        id: orderid,
      },
      customer: {
        email: IndividualInsurance.email,
        phone: IndividualInsurance.phone_number,
      },
    };
    await axios
      .post("https://lmpapi.handsintechnology.in/api/payGateway", data)
      .then((response) => {
        window.Checkout.configure({
          session: {
            id: response.data.data.session.id,
          },
        });
        window.Checkout.showPaymentPage();
      });
  }

  return (
    <div>
      <Header />
      <Individualmedicalbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-4">
                  <div className="pay_Details1">
                    <div className="row" style={{ alignItems: "center" }}>
                      <div className="col-lg-5 col-sm-6 col-md-12 col-xs-12 mb-4">
                        {quoteData &&
                          quoteData.map((quote) =>
                            quote.companyDetails &&
                            quote.companyDetails.company_logo
                              ? quote.companyDetails.company_logo.map((val) => (
                                  <img
                                    key={val._id}
                                    alt={val.fieldname}
                                    src={`https://lmpapi.handsintechnology.in/uploads/${val.filename}`}
                                    style={{ width: "100%" }}
                                  />
                                ))
                              : null
                          )}
                      </div>
                      <div className="col-lg-7 col-sm-6 col-md-12 col-xs-12 mb-4">
                        <p> {IndividualInsurance.selectFilter.plan_name} </p>
                      </div>
                      <hr />
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>Total Premium</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6 style={{ textAlign: "right" }}>AED 1200</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>Discount</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6 style={{ textAlign: "right" }}>AED 0.00</h6>
                      </div>
                      {/* <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                                                <h6>Coupon Applied</h6>
                                            </div> */}
                      {/* <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                                                <h6 style={{ textAlign: 'right' }}>AED 500</h6>
                                            </div> */}
                      <hr />
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6>Total Amount</h6>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-md-12 col-xs-12">
                        <h6
                          style={{
                            textAlign: "right",
                            fontWeight: "400",
                            fontSize: "28px",
                            color: "#D91818",
                          }}
                        >
                          AED 1200
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="pay_Details">
                    <img
                      style={{ marginBottom: "20px", width: "110px" }}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Visa_Electron.svg/1200px-Visa_Electron.svg.png"
                    />
                    <p>
                      Please click the button below and follow the instructions
                      provided to complete your AED 1200 payment.
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
                        <i
                          className="fa fa-chevron-left"
                          aria-hidden="true"
                        ></i>
                        Back
                      </Link>
                    </div>
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                      style={{ textAlign: "right", cursor: "pointer" }}
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
      <Footer />
    </div>
  );
};

export default Individualpayment;
