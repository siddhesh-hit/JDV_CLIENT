import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Link } from "react-router-dom";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseUserContext } from "../../UserContextAppProvider";
import axios from "axios";
import { useFetch } from "../../functions";
import { API_URL } from "../..";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';

const Myprofile = () => {
  const navigate = useNavigate()
  const [policyData, setPolicyData] = useState([]);
  const [pendingPolicyData, setPendingPolicyData] = useState([]);
  const [renewalPolicyData, setRenewalPolicyData] = useState([]);
  const [claimsData, setClaimsData] = useState([])
  const [policyOffers, setPolicyOffers] = useState([])
  const [cancelledPolicies, setCancelledPolicies] = useState([])
  const [Message, setMessage] = useState("Update")
  // Validate Phone Number
  const PhoneNoValidate = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const { UserData } = UseUserContext();
  const [startDate, setStartDate] = useState();
  const [ProfileUpdateData, setProfileUpdateData] = useState({
    full_name: UserData?.full_name ? UserData?.full_name : "",
    email: UserData?.email ? UserData?.email : null,
    mobile_number: UserData?.mobile_number ? UserData?.mobile_number : null,
    nationality: UserData?.nationality ? UserData?.nationality : null,
    description: UserData?.description ? UserData?.description : null,
    date_of_brith: UserData?.date_of_brith
      ? UserData?.date_of_brith
      : startDate,
    profile_image: null
  });
  const [response, Loading, Error] = useFetch(API_URL + "/api/getAllCountries");
  const Countries = response?.data?.data ? response?.data?.data : null;
  const { usertoken, Logout } = UseUserContext()
  useEffect(() => {
    axios.get(API_URL + "/api/getAllCompletePolicy")
      .then((result) => {
        setPolicyData(result.data.data)
        console.log(result.data.data)
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
        console.log(result.data.data)
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
  const handlePersonalDetails = (e) => {
    setProfileUpdateData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
    }));
    console.log({ ProfileUpdateData });
  };
  const UpdateProfile = async (e) => {

    let data = { ...ProfileUpdateData };
    console.log({ data });
    if (!PhoneNoValidate.test(ProfileUpdateData.mobile_number)) {
      swal({
        title: "warning!",
        text: "Please Enter Mobile Number",
        type: "warning",
        icon: "warning",
      }).then(function () {
        return false;
      });
    }
    else {
      setMessage("Please Wait")
      await axios
        .put(API_URL + "/api/updateCustomerProfile?id=" + UserData?._id, { ...ProfileUpdateData })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            swal({
              title: "success!",
              text: res?.data?.message,
              type: "success",
              icon: "success",
            }).then(function () {
              return false;
            })
          }

        })
        .catch((error) => {
          if (error?.response?.status === 400) {
            swal({
              title: "warning!",
              text: error?.response?.data?.message ? error?.response?.data?.message : "Something Went wrong",
              type: "warning",
              icon: "warning",
            }).then(function () {
              return false;
            })
          }
          console.log(error);
        });
    }

  };
  return (
    <div>
      <Header />
      <section className="page-header">
        <div className="page-header-bg"></div>
        <div className="container">
          <div className="page-header__inner">
            <div className="innerbanner">
              <h4 className="text-custom-white no-margin">My Profile</h4>
            </div>
            <h6 className="para_absdasa">Best quotes for you !!!</h6>
          </div>
        </div>
      </section>
      <div className="myprofile">
        <div className="container myprofile1 pt-4 pb-4">
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
              <div className="sidebar">
                <Link to="/Mypolicies">
                  My Policies <span>({policyData?.length})</span>
                </Link>
                <Link to="/Pendingpolicies">Pending Policies<span>({pendingPolicyData?.length})</span></Link>
                <Link to="/Cancelledpolicies">Cancelled Policies<span>({cancelledPolicies?.length})</span></Link>
                <Link to="/Policiesrenewal">Renewal <span>({renewalPolicyData?.length})</span></Link>
                <Link to="/Claimlist">My Claim <span>({claimsData?.length})</span></Link>
                <Link to="/Specialoffer">Special Offer <span>({policyOffers.length})</span></Link>
                <Link className="active" to="/Myprofile">My Profile</Link>
                <Link onClick={Logout}>Logout</Link>
              </div>
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
              <div className="my_profile">
                <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      name="full_name"
                      onChange={handlePersonalDetails}
                      required
                      placeholder="Full Name"
                      aria-label="Full Name"
                      value={ProfileUpdateData?.full_name}
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i class="fa fa-envelope-o" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      name="email"
                      required
                      placeholder="Email ID"
                      aria-label="Email ID"
                      value={ProfileUpdateData?.email}
                      readOnly
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i class="fa fa-phone" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      onChange={handlePersonalDetails}
                      name="mobile_number"
                      required
                      placeholder="Phone Number"
                      aria-label="Phone Number"
                      value={ProfileUpdateData?.mobile_number}
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i class="fa fa-upload" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="file"
                      onChange={handlePersonalDetails}
                      name="profile_image"
                      required
                      placeholder="Profile Image"
                      aria-label="Profile Image"
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i class="fa fa-calendar" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <DatePicker
                      placeholderText={"Please select a date"}
                      className="form-control"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">
                      <i class="fa fa-language" aria-hidden="true"></i>
                    </InputGroup.Text>
                    <select
                      name="nationality"
                      onChange={handlePersonalDetails}
                      className="form-control"
                    >
                      {/* <option disabled >Select Country</option> */}
                      {Countries && Countries.length > 0 ? (
                        Countries.map((val, i) => {
                          return (
                            <option
                              selected={
                                ProfileUpdateData?.nationality ==
                                  val?.country_name
                                  ? val?.country_name
                                  : i === 0
                              }
                              value={val?.country_name}
                            >
                              {val?.country_name}
                            </option>
                          );
                        })
                      ) : (
                        <option>No Options Available</option>
                      )}
                    </select>
                  </InputGroup>
                </div>
                <div className="col-lg-12">
                  <InputGroup className="mb-4">
                    <textarea
                      onChange={handlePersonalDetails}
                      name="description"
                      value={ProfileUpdateData?.description}
                      placeholder="Type Your Information Here...... (Optional)"
                      className="form-control"
                      rows="5"
                    ></textarea>
                  </InputGroup>
                </div>
                <button className="profileupadtes" id="personalupdate" onClick={UpdateProfile}>
                  Update
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Myprofile;
