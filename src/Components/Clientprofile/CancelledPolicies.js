import React, { useState, useEffect } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Link, Navigate } from 'react-router-dom'
import tick from '../../Image/ticks.svg'
import cross from '../../Image/cross.svg'
import { Button, Container, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../..'
import swal from 'sweetalert'
import { UseUserContext } from '../../UserContextAppProvider'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const CancelledPolicies = () => {
  const navigate = useNavigate()
  const { usertoken, Logout } = UseUserContext()
  const [showMore, setShowMore] = useState(true);
  const [policyData, setPolicyData] = useState([]);
  const [pendingPolicyData, setPendingPolicyData] = useState([]);
  const [renewalPolicyData, setRenewalPolicyData] = useState([]);
  const [policyOffers, setPolicyOffers] = useState([]);
  const [cancelledPolicies, setCancelledPolicies] = useState([])
  const [claimsData, setClaimsData] = useState([])

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  useEffect(() => {
    axios.get(API_URL + "/api/getAllCompletePolicy")
      .then((result) => {
        // console.log(result.data.data,"hiiii")
        setPolicyData(result.data.data)
      }).catch((err) => {
        console.log(err.message)
        if (err?.response.status === 401) {
          swal({
            title: "Error!",
            text: err?.response?.data?.message,
            type: "error",
            icon: "error",
          }).then(function () {
            navigate("/Login")
          });
        }
      });

    axios.get(API_URL + "/api/getAllPendingPolicy")
      .then((result) => {
        console.log(result.data.data, "Pending Policy>>>>>>>>>>>>>>")
        setPendingPolicyData(result.data.data)
      }).catch((err) => {
        console.log(err.message)
        if (err?.response.status === 401) {
          swal({
            title: "Error!",
            text: err?.response?.data?.message,
            type: "error",
            icon: "error",
          }).then(function () {
            navigate("/Login")
          });
        }
      });
    axios.get(API_URL + "/api/getAllCancelledPolicies")
      .then((result) => {
        setCancelledPolicies(result.data.data)
      }).catch((err) => {
        console.log(err.message)
        if (err?.response.status === 401) {
          swal({
            title: "Error!",
            text: err?.response?.data?.message,
            type: "error",
            icon: "error",
          }).then(function () {
            navigate("/Login")
          });
        }
      });
    axios.get(API_URL + "/api/getAllRenewalPolicy")
      .then((result) => {
        setRenewalPolicyData(result.data.data)
      }).catch((err) => {
        console.log(err.message)
        if (err?.response.status === 401) {
          swal({
            title: "Error!",
            text: err?.response?.data?.message,
            type: "error",
            icon: "error",
          }).then(function () {
            navigate("/Login")
          });
        }
      });
    axios.get(API_URL + "/api/getClaims")
      .then((result) => {
        console.log(result.data.data, "claim list")
        setClaimsData(result.data.data)
      }).catch((err) => {
        console.log(err.message)
        if (err?.response.status === 401) {
          swal({
            title: "Error!",
            text: err?.response?.data?.message,
            type: "error",
            icon: "error",
          }).then(function () {
            navigate("/Login")
          });
        }
      });
    axios.get(API_URL + "/api/get_all_special_offer")
      .then((result) => {
        console.log(result.data.data, "Offer Data")
        setPolicyOffers(result.data.data)
      }).catch((err) => {
        console.log(err.message)
        if (err?.response.status === 401) {
          swal({
            title: "Error!",
            text: err?.response?.data?.message,
            type: "error",
            icon: "error",
          }).then(function () {
            navigate("/Login")
          });
        }
      });
  }, [usertoken])

  return (
    <div>
      <Header />
      <section className="page-header">
        <div className="page-header-bg"></div>
        <div className="container">
          <div className="page-header__inner">
            <div className="innerbanner">
              <h4 className="text-custom-white no-margin">Pending Policies</h4>
            </div>
            <h6 className='para_absdasa'>Best quotes for you !!!</h6>
          </div>
        </div>
      </section>
      <div className='policyrenewals'>
        <div className='container myprofile1 pt-4 pb-4'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-lg-3 col-md-12 col-sm-12 col-xs-12'>

              <div className="sidebar">
                <Link to="/Mypolicies">
                  My Policies <span>({policyData?.length})</span>
                </Link>
                <Link to="/Pendingpolicies">Pending Policies<span>({pendingPolicyData?.length})</span></Link>
                <Link className="active" to="/CancelledPolicies">Cancelled Policies<span>({cancelledPolicies?.length})</span></Link>
                <Link to="/Policiesrenewal">Renewal <span>({renewalPolicyData?.length})</span></Link>
                <Link to="/Claimlist">My Claim <span>({claimsData?.length})</span></Link>
                <Link to="/Specialoffer">Special Offer <span>({policyOffers?.length})</span></Link>
                <Link to="/Myprofile">My Profile</Link>
                <Link onClick={Logout}>Logout</Link>
              </div>
            </div>
            <div className='col-lg-9 col-md-12 col-sm-12 col-xs-12'>
              {
                cancelledPolicies?.map((item, index) => {
                  return (
                    item.camcelPolicyStatus === true ? (
                      <div key={index} className='quotes_inner'>
                        <div className='row quotes_details pb-3'>
                          <div className='col-lg-3'>
                            <img src={`${API_URL}/uploads/${item.comapnydetails[0]?.company_logo[0].filename}`} style={{ width: '100%' }} />
                            <h6 className="companyname">{item.comapnydetails[0]?.company_name}</h6>
                          </div>
                          <div className='col-lg-6'>
                            <div className='d-flex justify-content-center'>
                              <h4 style={{ fontSize: "19px" }}>{item.planDetails?.plan_name}</h4>
                            </div>
                            <ul className='benefits'>
                              <li>Own Damage Cover :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails[index]?.additional_cover_arr.map((val, indx) => (val.additional_cover_label))}</span></li>

                              <li>Excess :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails[0]?.excess}  AED </span></li>
                              <li>Third Party Limit :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails[index]?.additional_cover_arr.map((val, indx) => (val.additional_cover_desc))}</span></li>
                              <li>Expiry Date :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.policy_expiry_date?.slice(0, 10)}</span></li>
                            </ul>
                          </div>
                          <div className='col-lg-3 action_abcd'>

                          </div>
                        </div>
                        {showMore ? (
                          <div className='rowabcds'>
                            <div className='row'>
                              <div className='col-lg-4 pb-2 pt-2'>
                                <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>What is Covered.</span>
                                <ul className='description'>
                                  {
                                    item.planDetails?.map((cover, indx) => (
                                      cover.standard_cover_arr?.map((coverItem, coverIndex) => {
                                        return (
                                          <li key={coverIndex}>{coverItem.standard_cover_label}</li>
                                        )
                                      })
                                    ))
                                  }
                                </ul>
                              </div>
                              <div className='col-lg-4 pb-2 pt-2'>
                                <img style={{ width: 'auto', marginRight: '15px' }} src={cross} /><span className='abcds_aud'>What is not Covered.</span>
                                <ul className='description'>
                                  {
                                    item.notCoveredData?.map((cover, indx) => {

                                      return (
                                        <li key={indx}>{cover.standard_cover_label}</li>
                                      )

                                    })
                                  }
                                </ul>
                              </div>
                              <div className='col-lg-4 pb-2 pt-2'>
                                <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>Optional Extras</span>
                                <ul className='description'>
                                  <li>Replacement Car</li>
                                </ul>
                              </div>
                            </div>
                            <div className='row'>
                              <button className='showadd_details' onClick={toggleShowMore}>Hide Details</button>
                            </div>
                          </div>
                        ) : (
                          <div className='rowabcds'>
                            <div className='row'>
                              <button className='showadd_details' onClick={toggleShowMore}>See Details</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : ("")

                  )
                })
              }
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CancelledPolicies