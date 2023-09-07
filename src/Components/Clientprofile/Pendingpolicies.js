import React, { useState, useEffect } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Link, Navigate } from 'react-router-dom'
import tick from '../../Image/ticks.svg'
import finance from '../../Image/finance.svg'
import cross from '../../Image/cross.svg'
import { Button, Container, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from '../..'
import swal from 'sweetalert'
import { UseUserContext } from '../../UserContextAppProvider'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const Pendingpolicies = () => {
  const navigate = useNavigate()
  const { usertoken, Logout } = UseUserContext()
  const [showMore, setShowMore] = useState(true);
  const [policyData, setPolicyData] = useState([]);
  const [pendingPolicyData, setPendingPolicyData] = useState([]);
  const [renewalPolicyData, setRenewalPolicyData] = useState([]);
  const [policyOffers, setPolicyOffers] = useState([]);
  const [cancelledPolicies,setCancelledPolicies] = useState([])
  const [claimsData, setClaimsData] = useState([])
  const [documents, setDocuments] = useState([]);

  // const  [policyDocuments,setDocumets] =useState([]);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false)
  const [filedata, setFiledata] = useState('')
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [docData, setDocData] = useState({})

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
      axios.get(API_URL+"/api/getAllCancelledPolicies")
              .then((result) => {
                setCancelledPolicies(result.data.data)
              }).catch((err) => {
                console.log(err.message)
                if(err?.response.status===401){
                    swal({
                        title: "Error!",
                        text:err?.response?.data?.message ,
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

  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    // console.log(file,"hiiii",index)
    const updatedDocuments = [...uploadedDocuments];
    updatedDocuments[index] = file;
    setUploadedDocuments(updatedDocuments);
  };
  const handleModal = (file) => {
    setFiledata(file)
    setShow(true)


  }
  const openModal = (id, index, name, docLenght) => {
    setDocData({
      id: id,
      index: index,
      fileName: name,
      DocTotal: docLenght
    })
    try {
      axios.post('http://localhost:8000/api/get_Documents_listbyid', {
        method: 'post',
        ParamValue: id,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((result) => {
          console.log(result.data.data)
          setDocuments(result.data.data);
        })
    } catch (error) {
      console.log(error.message)
    }
    setVisible(!visible)
  }
  const uploadAllDocuments = () => {
    const formData = new FormData();

    const docId = docData.id;
    const documentName = docData.fileName;
    const documentFile = uploadedDocuments[docData.index]
    const fileIndex = docData.index;

    formData.append('id', docId)
    formData.append('name', documentName)
    formData.append('status', '')
    formData.append('reason', '')
    formData.append('file', documentFile)
    formData.append('fileindex', fileIndex)
    formData.append('totaldocs', docData.DocTotal)

    console.log(Array.from(formData))
    if (documentFile != null) {
      axios.post('https://lmpapi.handsintechnology.in/api/update_single_documents', formData, {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then(data => {
          console.log(data.status)
          if (data.status === 200) {
            swal("Success!", "Updated", "success");
            
          }
          else {
            swal("Error!", "Something went wrong", "error");
          }
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      alert("Please select required document")
    }

  }
  // item.email,item.name,item.lead_id,item.planDetails[0]?.line_of_business_id
  const Cancelpolicy = (email,full_name,policy_number,lobId,leadId) => {
    const CancelPolicyData = {
      email:email,
      full_name:full_name,
      policy_number:policy_number,
      lobId:lobId,
      leadId:leadId
    }
    console.log(CancelPolicyData,"CancelPolicyData")
    navigate("/Cancelpolicy",{ state: { CancelPolicyData } })
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
                <Link to="/Mypolicies">
                  My Policies <span>({policyData?.length})</span>
                </Link>
                <Link className="active" to="/Pendingpolicies">Pending Policies<span>({pendingPolicyData?.length})</span></Link>
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
                pendingPolicyData?.map((item, index) => {
                  return (
                    item.camcelPolicyStatus === false ? (
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
                          <li>Line Of Business :<span className='mx-3'style={{ color: '#0D2F92', marginLeft: '5px' }}>{item.lobdetails[0]?.line_of_business_name}</span></li>

                        </ul>
                      </div>
                      <div className='col-lg-3 action_abcd'>
                
                      </div>
                    </div>
                    {showMore ? (
                      <div className='rowabcds'>

                        {
                          item.result?.map((doc, indeX) => (
                            doc.document_lob.map((val, ind) => {
                              return (
                                val === item.type_of_policy ? (
                                  <div key={ind} className='row policy_documents'>
                                    <div className='col-lg-6'>
                                      <p>{doc.document_type}</p>
                                    </div>
                                    <div className='col-lg-6'>

                                      <button type='file' className='uploaddocus' onClick={() => openModal(item._id, indeX, doc.document_type, item.result.length)}>Upload</button>

                                      {
                                        item?.documents.map((docItem, i) => {
                                          return (
                                            docItem.name === doc.document_type ? (
                                              <>
                                                <button key={i} type='file' className='text-primary uploaddocus mx-2' onClick={() => handleModal(docItem.file[0].filename)}>View</button>
                                                {
                                                  docItem.message != '' ? (
                                                    <p key={i} className='text-danger'>{docItem.reason}</p>
                                                  ) : ('')
                                                }

                                              </>
                                            ) : ('')
                                          )
                                        })
                                      }
                                    </div>
                                  </div>
                                ) : ""
                              )
                            })
                          ))
                        }
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
                            <div style={{ display: 'flex' }}>
                              <h3 className='overallpriceofpolicy' style={{ fontWeight: '500', fontSize: '30px', marginTop: '165px', color: '#ED1C24' }}>{item.planDetails[0]?.excess}  AED </h3>
                              <button className='cancelpolicynew' onClick={()=>Cancelpolicy(item.email,item.name,item.lead_id,item.planDetails[0]?.line_of_business_id,item._id)}>Cancel Policy</button>
                            </div>
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

                )})
              }
            </div>

          </div>
        </div>
      </div>
      <Footer />
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Upload {docData.fileName}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div >
            <input type="file" className="form-control" id="DHA" defaultValue="" required
              onChange={(e) => handleFileUpload(e, docData.index)}
            />
          </div>

        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary"
            onClick={uploadAllDocuments}
            href={'/Pendingpolicies'}
          >Upload</CButton>
        </CModalFooter>
      </CModal>
      <Modal size='lg' show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
          <Container >
            <Row >
              <div className="col-md-12">
                <div className="form-group col-md-12">
                  {
                    filedata?.includes(".pdf") ? (
                      <div>
                        <iframe
                          title="PDF Viewer"
                          style={{ width: '100%', height: '300px', border: 'none' }}
                          src={`http://localhost:8000/documents/${filedata}`}
                        />
                      </div>
                    ) : (
                      <img style={{ width: '100%', height: 'auto' }} src={`http://localhost:8000/documents/${filedata}`} />
                    )
                  }

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

export default Pendingpolicies