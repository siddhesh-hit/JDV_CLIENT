import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import finance from '../../Image/finance.svg'
import Innerbanner from '../Banner/Innerbanner'
import { Link } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
const TravelPayments = () => {
  const [totalamount, setTotalAmount] = useState(0);
  const [plan, setPlan] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTotalAmount(JSON.parse(localStorage.getItem('totaldueamount')));
    setPlan(JSON.parse(localStorage.getItem('plandetails')));
  }, [])

  console.log(plan);
  console.log(totalamount);
  const username = process.env.REACT_APP_PAYMENTAPIUSERNAME;
  const password = process.env.REACT_APP_PAYMENTAPIPASSWORD;
  const LeadId = localStorage.getItem('leaddetails').replace(/['"]+/g, '');
  const plan_id = plan?.map((item) => item.planData?._id);
  const plan_name = plan?.map((item) => item.planData?.plan_name);
  const plan_company_id = plan?.map((item) => item.planData?.company_id);
  const vat_price = plan?.map((item) => item.addOptionalCondition);
  const final_price = totalamount + parseFloat(vat_price);
  const company_name = plan?.map((item) => item.companies[0]?.company_name);
  const travelsFormsData1 = JSON.parse(localStorage.getItem("travelsFormsData"));
  const email = travelsFormsData1?.email;
  const phone = travelsFormsData1?.phone_no;
  console.log(username)
  console.log(password)
  console.log(LeadId)
  console.log(plan_id)
  console.log(plan_name)
  console.log(plan_company_id)
  console.log(final_price)
  console.log(company_name)
  console.log(email)
  console.log(phone)
  console.log(vat_price)
  let hostname =
    window.location.hostname === "localhost"
      ? window.location.hostname + ":3000"
      : window.location.hostname;
  let host = window.location.protocol + "//" + hostname;
  const handlepayment = async () => {
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
          "/ThankYou?id=" +
          LeadId +
          "&plan_id=" +
          plan_id +
          "&plan_company_id=" +
          plan_company_id +
          "&final_price=" +
          final_price +
          "&status=Pending",
        cancelUrl:
          host +
          "/TravelPayments",
        returnUrl:
          host +
          "/ThankYou?id=" +
          LeadId +
          "&plan_id=" +
          plan_id +
          "&plan_company_id=" +
          plan_company_id +
          "&final_price=" +
          final_price +
          "&status=Completed",
        operation: "PURCHASE",
        style: {
          accentColor: "#30CBE3",
        },
      },
      order: {
        amount: totalamount,
        currency: "AED",
        description: "Plan Name: " + plan_name,
        id: orderid,

      },
      customer: {
        email: email,
        phone: phone,
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
  const handleback = () => {
    window.history.back();
  }
  return (
    <div>
      <Header />
      <Innerbanner />
      <div className='container-fluid car_info pt-4 pb-4'>
        <div className='container'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-lg-12 nopadding'>
              <div className='row form_abcd'>
                {plan.map((item, index) => (
                  <div className='col-lg-4'>
                    <div className='pay_Details1'>
                      <div className='row' style={{ alignItems: 'center' }}>
                        <div className='col-lg-5 col-sm-6 col-md-12 col-xs-12 mb-4'>
                          {item.companies?.map((item1) => (
                            item1.company_logo.map((logo) => (
                              <img src={`https://lmpapi.handsintechnology.in/uploads/${logo.filename}`} alt='logo' />
                            ))
                          ))}
                        </div>
                        <div className='col-lg-7 col-sm-6 col-md-12 col-xs-12 mb-4'>
                          <p>{item.planData?.plan_name}</p>
                        </div>
                        <hr />
                        <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6>Total Premium</h6>
                        </div>
                        <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6 style={{ textAlign: 'right' }}>{totalamount}</h6>
                        </div>
                        <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6>Discount</h6>
                        </div>
                        <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6 style={{ textAlign: 'right' }}>AED 0.00</h6>
                        </div>
                        <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6>VAT</h6>
                        </div>
                        <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6 style={{ textAlign: 'right' }}>{item.addOptionalCondition}</h6>
                        </div>
                        <hr />
                        <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6>Total Amount</h6>
                        </div>
                        <div className='col-lg-6 col-sm-6 col-md-12 col-xs-12'>
                          <h6 style={{ textAlign: 'right', fontWeight: '400', fontSize: '28px', color: '#D91818' }}>AED {final_price}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className='col-lg-7'>
                  <div className='pay_Details'>
                    <p>Please click the button below and follow the instructions provided to complete your AED 624.75 payment.</p>
                    <p><b style={{ color: '#ed2a30' }}>Or</b></p>
                    <p>You can pay in our bank account mentioned below.</p>
                    <p>Abu Dhabi Commercial Bank, P.O. Box 118385, Dubai, UAE JOIE de VIVRE INTL INSURANCE BROKERAGE LLC</p>
                    <p>744598020002</p>
                    <p>Swift Code : ADCBAEAA</p>
                    <p>IBAN: AE880030000744598020002</p>
                  </div>
                  <div className='row'>
                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3'>
                      <button className='buttonactions' onClick={handleback}><i class="fa fa-chevron-left" aria-hidden="true"></i>Back</button>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ textAlign: 'right' }}>
                      <button className='buttonactions' onClick={handlepayment}>Pay Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className='disclaimerss'>
        Medical insurance comparision for your medical requirements
      </h3>
      <Footer />
    </div>
  )
}
export default TravelPayments