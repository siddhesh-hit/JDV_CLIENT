import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Link } from 'react-router-dom'
import tick from '../../Image/ticks.svg'
import finance from '../../Image/finance.svg'
import cross from '../../Image/cross.svg'
import { API_URL } from '../..'
import { UseUserContext } from '../../UserContextAppProvider'
import { Form, FormControl, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
const Policiesrenewal = () => {
    const navigate = useNavigate()
    const { usertoken, Logout } = UseUserContext()
    const [policyData, setPolicyData] = useState([]);
    const [pendingPolicyData, setPendingPolicyData] = useState([]);
    const [renewalPolicyData, setRenewalPolicyData] = useState([]);
    const [claimsData, setClaimsData] = useState([])
    const [showMore, setShowMore] = useState(true);
    const [cancelledPolicies, setCancelledPolicies] = useState([])
    const [policyOffers, setPolicyOffers] = useState([])

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    useEffect(() => {
        axios.get(API_URL + "/api/getAllCompletePolicy")
            .then((result) => {
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
                console.log(result.data.data, "Pending Policy")
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
                            <h4 className="text-custom-white no-margin">Policies Renewal</h4>
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
                                <Link to="/CancelledPolicies">Cancelled Policies<span>({cancelledPolicies?.length})</span></Link>
                                <Link className="active" to="/Policiesrenewal">Renewal <span>({renewalPolicyData?.length})</span></Link>
                                <Link to="/Claimlist">My Claim <span>({claimsData?.length})</span></Link>
                                <Link to="/Specialoffer">Special Offer <span>({policyOffers?.length})</span></Link>
                                <Link to="/Myprofile">My Profile</Link>
                                <Link onClick={Logout}>Logout</Link>
                            </div>
                        </div>
                        <div className='col-lg-9 col-md-12 col-sm-12 col-xs-12'>
                            {
                                renewalPolicyData?.map((item, index) => (
                                    <div key={index} className='quotes_inner'>
                                        <div className='row quotes_details pb-3'>
                                            <div className='col-lg-3'>
                                                <img src={`${API_URL}/uploads/${item.comapnydetails.company_logo[0]?.filename}`} style={{ width: '100%' }} />
                                                <h4>{item.comapnydetails?.company_name}</h4>
                                            </div>
                                            <div className='col-lg-6'>
                                                <h4>{item.planDetails?.plan_name} </h4>
                                                <ul className='benefits'>
                                                    <li>Own Damage Cover :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails?.additional_cover_arr.map((val, indx) => (val.additional_cover_label))}</span></li>
                                                    <li>Excess :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>  {item.planDetails?.excess} AED </span></li>
                                                    <li>Third Party Limit :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails?.additional_cover_arr.map((val, indx) => (val.additional_cover_desc))}</span></li>
                                                    <li>Expiry Date :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.policy_expiry_date?.slice(0, 10)}</span></li>

                                                </ul>
                                            </div>
                                            <div className='col-lg-3 action_abcd'>
                                                <Link to="/"><button style={{ marginTop: '90px' }} className='submit_select'>Get Quote</button></Link>
                                            </div>
                                        </div>
                                        {showMore ? (
                                            <div className='rowabcds'>
                                                <div className='row'>
                                                    <div className='col-lg-4 pb-2 pt-2'>
                                                        <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>Fully Comprehensive Insurance</span>
                                                        <ul className='description'>
                                                            <li>Own Damage Cover</li>
                                                            <li>Third Party Cover</li>
                                                            <li>Natural Calamity Cover</li>
                                                            <li>Emergency Medical Expenses</li>
                                                            <li>Loss of Personal Belongings</li>
                                                            <li>Windscreen Damage</li>
                                                            <li>Valet Parking Theft</li>
                                                            <li>Replacement Locks</li>
                                                            <li>Car hire Service (Cash Benefit)</li>
                                                        </ul>
                                                    </div>
                                                    <div className='col-lg-4 pb-2 pt-2'>
                                                        <img style={{ width: 'auto', marginRight: '15px' }} src={cross} /><span className='abcds_aud'>Roadside Assistance (AED 120)</span>
                                                        <ul className='description'>
                                                            <li>Mechanical First Aid</li>
                                                            <li>Battery Service</li>
                                                            <li>Lockout Service</li>
                                                            <li>Flat Tyre Service</li>
                                                            <li>Towing Service</li>
                                                        </ul>
                                                    </div>
                                                    <div className='col-lg-4 pb-2 pt-2'>
                                                        <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>Optional Extras</span>
                                                        <ul className='description'>
                                                            <li>Replacement Car</li>
                                                        </ul>
                                                        <h3 className='overallpriceofpolicy' style={{ fontWeight: '500', fontSize: '30px', marginTop: '165px', color: '#ED1C24', marginLeft: '50px' }}>AED 250</h3>
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
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Policiesrenewal