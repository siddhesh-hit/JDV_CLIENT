import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import finance from '../../Image/finance.svg'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UseUserContext } from '../../UserContextAppProvider'
import { API_URL } from '../..'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Claimlist = () => {
  const navigate = useNavigate()
  const { usertoken, Logout } = UseUserContext()
  const [startDate, setStartDate] = useState();
  const [policyData, setPolicyData] = useState([]);
  const [pendingPolicyData, setPendingPolicyData] = useState([]);
  const [renewalPolicyData, setRenewalPolicyData] = useState([]);
  const [claimsData, setClaimsData] = useState([])
  const [cancelledPolicies, setCancelledPolicies] = useState([])
  const [policyOffers, setPolicyOffers] = useState([])

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
        console.log(result.data.data, "Pending Policy")
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
        console.log(result.data.data, "claim data")
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
              <h4 className="text-custom-white no-margin">My Claims List</h4>
            </div>
            <h6 className='para_absdasa'>Best quotes for you !!!</h6>
          </div>
        </div>
      </section>
      <div className='myprofile'>
        <div className='container myprofile1 pt-4 pb-4'>
          <div className='row' style={{ justifyContent: 'center' }}>
            <div className='col-lg-3 col-md-12 col-sm-12 col-xs-12'>
              <div className="sidebar">
                <Link to="/Mypolicies">My Policies <span>({policyData?.length})</span></Link>
                <Link to="/Pendingpolicies">Pending Policies<span>({pendingPolicyData?.length})</span></Link>
                <Link to="/CancelledPolicies">Cancelled Policies<span>({cancelledPolicies?.length})</span></Link>
                <Link to="/Policiesrenewal">Renewal <span>({renewalPolicyData?.length})</span></Link>
                <Link className="active" to="/Claimlist">My Claim <span>({claimsData?.length})</span></Link>
                <Link to="/Specialoffer">Special Offer <span>({policyOffers?.length})</span></Link>
                <Link to="/Myprofile">My Profile</Link>
                <Link onClick={Logout}>Logout</Link>
              </div>
            </div>
            <div className='col-lg-9 col-md-12 col-sm-12 col-xs-12'>
              {
                claimsData?.map((item, index) => (
                  <div key={index} className='row quotes_details pb-3 mb-4' style={{borderBottom:'solid #0D2F92 1px'}}>
                    <div className='col-lg-3'>
                      <img src={`${API_URL}/uploads/${item.companyDetails.company_logo[0]?.filename}`} style={{ width: '100%' }} />
                      <h6 className="companyname">{item.companyDetails?.company_name}</h6>
                    </div>
                    <div className='col-lg-6'>
                      <h4 style={{ fontSize: "19px" }}>{item.planDetails?.plan_name}</h4>
                      <ul className='benefits'>
                        <li>Own Damage Cover :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails?.additional_cover_arr.map((val, indx) => (val.additional_cover_label))}</span></li>
                        <li>Excess :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails?.excess} AED </span></li>
                        <li>Third Party Limit :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails?.additional_cover_arr.map((val, indx) => (val.additional_cover_desc))}</span></li>
                        <li>Expiry Date :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.leadsDetails[0]?.policy_expiry_date?.slice(0, 10)}</span></li>
                      </ul>
                    </div>
                    <div className='col-lg-3 action_abcd'>
                      <h2>{item.leadsDetails[0].paymentStatus}</h2>
                      {/* <Link to="/"><button style={{ marginTop: '50px' }} className='submit_select'>View Details</button></Link> */}
                    </div>
                  </div>
                )
                )
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Claimlist