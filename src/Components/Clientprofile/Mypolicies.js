import React, { useEffect, useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import tick from '../../Image/ticks.svg'
import finance from '../../Image/finance.svg'
import cross from '../../Image/cross.svg'
import axios from 'axios'
import { API_URL } from '../..'
import swal from 'sweetalert'
import { UseUserContext } from '../../UserContextAppProvider'
import { Button, Container, Modal, Row } from 'react-bootstrap'
import Claimform from './Claimform'
const Mypolicies = () => {
  const navigate = useNavigate()
  const { usertoken, Logout } = UseUserContext()
  const [showMore, setShowMore] = useState(false);
  const [policyData, setPolicyData] = useState([]);
  const [pendingPolicyData, setPendingPolicyData] = useState([]);
  const [renewalPolicyData, setRenewalPolicyData] = useState([]);
  const [claimsData, setClaimsData] = useState([])
  const [policyOffers, setPolicyOffers] = useState([])
  const [cancelledPolicies, setCancelledPolicies] = useState([])
  const [show, setShow] = useState(false)
  const [filedata, setFiledata] = useState('')
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  useEffect(() => {
    axios.get(API_URL + "/api/getAllCompletePolicy")
      .then((result) => {
        setPolicyData(result.data.data)
        console.log(result.data.data, "complete policy")
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
        console.log(result.data.data)
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
  const handleModal = (file) => {
    setFiledata(file)
    setShow(true)
  }
  const handleDownload = async (filePath, FileName) => {
    try {
      const response = await axios.get(filePath, {
        responseType: 'blob',
      });
      const blob = response.data;
      console.log(blob)
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', FileName);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error retrieving file data:', error);
    }
  };
  const Claimform = (lead_id, email, name, number, newId, lob) => {
    const claimData = {
      lead_id: lead_id,
      email: email,
      name: name,
      phoneno: number,
      new_lead: newId,
      lobId: lob
    };
    navigate("/Claimform", { state: { claimData } })
  }
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
                <Link className="active" to="/Mypolicies">
                  My Policies <span>({policyData?.length})</span>
                </Link>
                <Link to="/Pendingpolicies">Pending Policies<span>({pendingPolicyData?.length})</span></Link>
                <Link to="/CancelledPolicies">Cancelled Policies<span>({cancelledPolicies?.length})</span></Link>
                <Link to="/Policiesrenewal">Renewal <span>({renewalPolicyData?.length})</span></Link>
                <Link to="/Claimlist">My Claim <span>({claimsData?.length})</span></Link>
                <Link to="/Specialoffer">Special Offer <span>({policyOffers?.length})</span></Link>
                <Link to="/Myprofile">My Profile</Link>
                <Link onClick={Logout}>Logout</Link>
              </div>
            </div>
            <div className='col-lg-9 col-md-12 col-sm-12 col-xs-12'>
              {

                policyData?.map((item, index) => (
                  <div key={index} className='quotes_inner'>
                    <div className='row quotes_details pb-3'>
                      <div className='col-lg-3'>
                        <img src={`${API_URL}/uploads/${item.comapnydetails.company_logo[0]?.filename}`} style={{ width: '100%' }} />
                        <h6 className="companyname">{item.comapnydetails?.company_name}</h6>
                      </div>
                      <div className='col-lg-6'>
                        <div className=''>
                          <h4 style={{ fontSize: "19px" }}>{item.planDetails?.plan_name}</h4>

                        </div>
                        <ul className='benefits'>
                          <li>Own Damage Cover :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails?.additional_cover_arr.map((val, indx) => (val.additional_cover_label))}</span></li>
                          <li>Excess :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails?.excess} AED</span></li>
                          <li>Third Party Limit :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.planDetails?.additional_cover_arr.map((val, indx) => (val.additional_cover_desc))}</span></li>
                          <li>Expiry Date :<span style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.policy_expiry_date?.slice(0, 10)}</span></li>
                          <li>Line Of Business :<span className='mx-3' style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.lobdetails[0]?.line_of_business_name}</span></li>
                        </ul>
                      </div>

                      <div className='col-lg-3 action_abcd'>
                        <button className='claims_abcd1'>Renewal</button><br />
                        <button onClick={() => Claimform(item.lead_id, item.email, item.name, item.phoneno, item._id, item.lobdetails[0])} className='claims_abcd'>Claim</button>
                      </div>
                    </div>
                    {showMore ? (
                      <div className='rowabcds'>
                        {
                          item.documents.map((item, index) => (
                            <div key={index} className='row policy_documents'>
                              <div className='col-lg-6'>
                                <p>{item.name}</p>
                              </div>

                              <div className='col-lg-6'>

                                {
                                  item.file.filename ? (
                                    <>
                                      <button className='uploaddocus' onClick={() => handleDownload("http://localhost:8000/documents/" + item.file?.filename, item.name)} download>Download</button>
                                      <button className='uploaddocus' style={{ marginRight: '10px' }} onClick={() => handleModal(item.file?.filename)}>View</button>
                                    </>
                                  ) : ('')

                                }
                              </div>
                            </div>
                          ))
                        }
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
      <Modal size='lg' show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container >
            <Row >
              <div className="col-md-12">
                <div className="form-group col-md-12">
                  <img style={{ width: '100%', height: 'auto' }} src={`http://localhost:8000/documents/${filedata}`} />
                </div>
              </div>
            </Row>
          </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>


  )
}

export default Mypolicies