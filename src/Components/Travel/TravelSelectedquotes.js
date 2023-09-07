import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Innerbanner from '../Banner/Innerbanner'
import finance from '../../Image/finance.svg'
import { Button, InputGroup, Form, Modal } from 'react-bootstrap'
import { useState } from 'react'
import tick from '../../Image/ticks.svg'
import cross from '../../Image/cross.svg'
// import Filters from './Filters'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Comparelist from '../Quotes/Comparelist'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios';


const TravelSelectedquotes = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const [travelsFormsData1, setTravelsFormsData1] = useState(
        JSON.parse(localStorage.getItem("travelsFormsData"))
    );

    const [travelinsuranceforname, settravelinsuranceforname] = useState("");
    const [tripperiodname, setTripperiodname] = useState("");
    const [triptype, setTriptype] = useState("");
    const [destination, setDestination] = useState("");


    useEffect(() => {
        gettravelinsurancefor(travelsFormsData1.insure_your_travel);
        gettripperiod(travelsFormsData1.plan_type);
        gettriptype(travelsFormsData1.type_of_trip);
        getdestination(travelsFormsData1.travel_destination);
    }, [])

    const gettravelinsurancefor = (ParamValue) => {
        var requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ParamValue: ParamValue })
        };
        fetch('https://lmpapi.handsintechnology.in/api/get_travel_insurance_for_detailsbyid', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                settravelinsuranceforname(data.data[0].travel_insurance_for);
            })
    }

    const gettripperiod = (ParamValue) => {
        var requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ParamValue: ParamValue })
        };
        fetch('https://lmpapi.handsintechnology.in/api/get_travel_type_by_id', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.data.travel_type);
                setTripperiodname(data.data.travel_type);
            })
    }

    const handleClose = () => {
        setShow(false)
    };

    const gettriptype = (ParamValue) => {
        var requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ParamValue: ParamValue })
        };
        fetch('https://lmpapi.handsintechnology.in/api/get_travel_plan_type_by_id', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.data.travel_plan_type);
                setTriptype(data.data.travel_plan_type);
            })
    }

    const getdestination = (ParamValue) => {
        var requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ParamValue: ParamValue })
        };
        fetch('https://lmpapi.handsintechnology.in/api/getCountrybyid', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                setDestination(data.data.country_name);
            }
            )
    }


    const [plandetails, setPlandetails] = useState([]);

    const location = useLocation();
    const { selectedPlan } = location.state;

    useEffect(() => {
        // Do something with the selectedPlanIds data in the Comparison component
        setPlandetails([selectedPlan]);
    }, [selectedPlan]);

    console.log(plandetails);

    const [startDate, setStartDate] = useState(new Date());
    const [showMore, setShowMore] = useState(true);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const handleShow = () => setShow(true);
    const [selectedValues, setSelectedValues] = useState([]);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedValues([...selectedValues, value]);
        } else {
            setSelectedValues(selectedValues.filter((item) => item !== value));
        }
    };

    console.log(selectedValues);


    const getTotalAmountDue = () => {
        let totalAmount = 0;

        // Loop through selectedValues and add corresponding additional_cover_value
        selectedValues.forEach((selectedValue) => {
            plandetails.forEach((item) => {
                if (item.planData?.additional_cover_arr) {
                    const selectedCover = item.planData.additional_cover_arr.find(
                        (label) => label.additional_cover_label === selectedValue
                    );

                    if (selectedCover) {
                        totalAmount += parseInt(selectedCover.additional_cover_value, 10);
                    }
                }
            });
        });

        // Add the travelBasePremium from the first plan to the total amount
        if (plandetails.length > 0) {
            const { travelBasePremium } = plandetails[0];
            totalAmount += parseInt(travelBasePremium, 10);
        }

        return totalAmount;
    };

    console.log(getTotalAmountDue());


    const [terms, setTerms] = useState(false);

    console.log(terms)

    const totaldueamount = getTotalAmountDue();
    const company_id = plandetails.map((item) => item.companies.map((company) => company._id).toString());
    const plan_id = plandetails.map((item) => item.planData._id).toString();
    const id = JSON.parse(localStorage.getItem("leaddetails"));

    const [Mortgage, setMortgage] = useState(false);
    const [mortgagevalue, setMortgagevalue] = useState('');

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 6);

    //send all the data to payments page
    const handlePayment = async () => {
        console.log(mortgagevalue)
        console.log(startDate)
        const requestOptions = {
            method: 'Put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                final_price: totaldueamount,
                company_id: company_id.toString(),
                plan_id: plan_id,
                paymentStatus: "Pending",
                bank_name: mortgagevalue,
                policy_issued_date: startDate
            })
        };
        await fetch(`https://lmpapi.handsintechnology.in/api/updatePolicyDetails?id=${id}`, requestOptions)
            .then(response => {
                console.log(response);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.response)
            })
        localStorage.setItem("plandetails", JSON.stringify(plandetails,));
        localStorage.setItem("totaldueamount", JSON.stringify(totaldueamount));
        navigate('/TravelPayments')
    }

    const handleback = () => {
        window.history.back();
    }
    const [termscondition, setTermscondition] = useState([]);
    useEffect(() => {
        gettermscondition();
    }, [])
    const gettermscondition = () => {
        var requestOptions = {
            method: 'GET',
        };
        fetch(`https://lmpapi.handsintechnology.in/api/termsAndCondition?insuranceType=Travel`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setTermscondition(result.data);
                console.log(result.data);
            })
            .catch(error => console.log('error', error));
    };
    console.log(termscondition.terms_constions)
    return (
        <div>
            <Header />
            <Innerbanner />
            <div className='Selectedinfo'>
                <div className='container Quotes_info1212 pt-4 pb-4'>
                    <div className='row quotes_all'>
                        <div className='col-lg-4 col-md-12 col-sm-12 col-xs-12 filters'>
                            <h4 className='car details'>Travel Details</h4>
                            <div className='filterssas one'>
                                <div className='row travel_detailss_form'>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Travel Type</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{travelinsuranceforname}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Trip Period</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{tripperiodname}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Number of Days</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{travelsFormsData1.no_of_travel} days</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Start date</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{new Date(travelsFormsData1.start_date).toLocaleDateString("en-US")}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>End Date</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{new Date(travelsFormsData1.end_date).toLocaleDateString("en-US")}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Trip Type</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{triptype}</h6>
                                    </div>

                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Destination</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{destination}</h6>
                                    </div>
                                </div>
                            </div>
                            <h4 className='personal details'>Personal Details</h4>
                            <div className='filterssas two mb-5'>
                                <div className='row travel_detailss_form'>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Name</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 '>
                                        <h6>{travelsFormsData1.name}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Email Address</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{travelsFormsData1.email}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Mobile Number</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{travelsFormsData1.phone_no}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Date of Birth</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{new Date(travelsFormsData1.date_of_birth).toLocaleDateString("en-US")}</h6>
                                    </div>
                                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>Passport Number</h6>
                                    </div>
                                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                                        <h6>{travelsFormsData1.passport_no}</h6>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12' style={{ marginTop: '40px' }}>
                            <div>
                                {plandetails.map((item, index) => (
                                    <div key={index} className='quotes_inner'>
                                        <div
                                            className="row quotes_details"
                                            style={{
                                                marginLeft: "0px",
                                                marginRight: "0px",
                                                paddingTop: "20px",
                                                paddingBottom: "20px",
                                            }}
                                        >
                                            <div className="col-lg-3 action_abcd">
                                                {item.companies?.map((item1) => (
                                                    item1.company_logo.map((logo) => (

                                                        <img src={`https://lmpapi.handsintechnology.in/uploads/${logo.filename}`} alt='logo' />

                                                    ))
                                                ))}
                                            </div>
                                            <div className='col-lg-6'>
                                                <h4>{item.planData?.plan_name}</h4>
                                                {item.planData?.additional_cover_arr?.map((item2) => (
                                                    <ul className='benefits'>
                                                        <li>{item2.additional_cover_label}</li>
                                                    </ul>
                                                ))}
                                            </div>
                                            <div className='col-lg-3 action_abcd'>
                                                <h2>AED {item.travelBasePremium}</h2>
                                                {/* <label htmlFor="compareCheckbox" onClick={() => handleCheckboxClick(item)}>
                                                            <Form.Check
                                                                id="compareCheckbox"
                                                                className='abcds_abcs1'
                                                                type="checkbox"
                                                                label="Compare"
                                                                defaultChecked={selectedPlanIds.includes(item.planData?.plan_id)} // Set the checked state here
                                                            />
                                                        </label> */}

                                                {/* <Link to="/Selectedquotes"><button className='submit_select'>Select</button></Link> */}
                                                <p>T&C Apply</p>
                                            </div>
                                        </div>
                                        {showMore ? (
                                            <div className='rowabcds'>
                                                <div className='row'>
                                                    <div className='col-lg-6 abc'>
                                                        <img style={{ width: 'auto', marginRight: '15px' }} src={tick} /><span className='abcds_aud'>What is Covered.</span>
                                                        {item.planData?.standard_cover_arr?.map((item3) => (
                                                            <ul className='description'>
                                                                <li>{item3.standard_cover_label}</li>

                                                            </ul>
                                                        ))}
                                                    </div>
                                                    <div className='col-lg-6 cde'>
                                                        <img style={{ width: 'auto', marginRight: '15px' }} src={cross} /><span className='abcds_aud'>What is not Covered.</span>
                                                        {item.notCoveredData?.map((item4) => (
                                                            <ul className='description'>
                                                                <li>{item4.standard_cover_label}</li>

                                                            </ul>
                                                        ))}
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
                                ))}
                            </div>
                            <div className='colnopadding additional mb-3'>
                                <div className='row form_abcd' style={{ justifyContent: 'initial' }}>
                                    <p className="">Additional Filter</p>
                                    {plandetails.map((item) => (
                                        <div className='col-lg-12 mb-4 mt-2' key={item.id}>
                                            {item.planData?.additional_cover_arr && item.planData.additional_cover_arr.length > 0 && (
                                                <>
                                                    {item.planData.additional_cover_arr.map((label, index) => (
                                                        <>
                                                            <Form.Check
                                                                className='abcds_abcs'
                                                                type="checkbox"
                                                                label={label.additional_cover_label}
                                                                key={index}
                                                                value={label.additional_cover_label}
                                                                onClick={handleCheckboxChange}
                                                            />
                                                            {/* <span className='side-by-side-item'>AED { label.additional_cover_value}</span> */}
                                                        </>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    ))}

                                    <div className="col-lg-12 nopadding">
                                        <div className="row form_abcd">
                                            <div className="col-lg-6">
                                                <h4>Mortgage</h4>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="d-flex justify-space-between">
                                                    <Form.Check className="mortageee"
                                                        type="radio"
                                                        name="Mortgage"
                                                        label="Yes"
                                                        checked={Mortgage === true}
                                                        onChange={() => setMortgage(true)}
                                                    />
                                                    <Form.Check className="mortageee"
                                                        type="radio"
                                                        name="Mortgage"
                                                        label="No"
                                                        checked={Mortgage === false}
                                                        onChange={() => {
                                                            setMortgage(false);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {Mortgage && (
                                                <div className="col-lg-12">
                                                    <InputGroup className="mb-4">
                                                        <Form.Control
                                                            placeholder="Bank Name"
                                                            aria-label="Bank Name"
                                                            onChange={(e) => setMortgagevalue(e.target.value)}
                                                        />
                                                    </InputGroup>
                                                </div>
                                            )}
                                            <div className="col-lg-6">
                                                <h4> Policy Start Date</h4>
                                            </div>
                                            <div className="col-lg-6">
                                                <InputGroup className="mb-5">
                                                    <InputGroup.Text id="basic-addon1">
                                                        <i class="fa fa-calendar" aria-hidden="true"></i>
                                                    </InputGroup.Text>
                                                    <DatePicker
                                                        placeholder="Select Date"
                                                        className='form-control'
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        minDate={minDate}
                                                        maxDate={maxDate}
                                                    />
                                                </InputGroup>
                                            </div>
                                        </div>
                                    </div>
                                    {plandetails.map((base) => (
                                        <div className='abcdsfloat' style={{ textAlign: 'right' }}>
                                            <h3>AED {getTotalAmountDue()}</h3>
                                            <h5>Total Amount Due</h5>
                                        </div>
                                    ))}
                                </div>
                                <h1 className='taxzesd'>Note : All prices are excluding taxes</h1>
                                <div className='colnopadding additional mb-4'>
                                    <div className='row form_abcd' style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                        <div className='col-lg-3'>
                                            <Form.Check className='abcds_abcs' name='terms' type="checkbox" label="Discount Code" />
                                        </div>
                                        <div className='col-lg-6'>
                                            <input className='coupons' placeholder='Discount Code' /><button className='hjkbfhdb'>Apply</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex labelssss">
                                    <Form.Check className='abcds_abcs' type="checkbox" onClick={(e) => setTerms(e.target.checked)} /><label>I have read and agree to <a className="termscond" onClick={handleShow}>Terms and Conditions</a></label>
                                </div>
                            </div>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-3'>
                                <div className='row'>
                                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ paddingLeft: '0px' }}>
                                        <button to="/Vehicledetails" className='buttonactions' onClick={handleback}><i class="fa fa-chevron-left" aria-hidden="true" ></i>Back</button>
                                    </div>
                                    <div className='col-lg-6 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ textAlign: 'right', paddingRight: '0px' }}>
                                        {!terms ?
                                            <button className='disablebtn' disabled>Proceed To Payment</button>
                                            :
                                            <button className='buttonactions' onClick={handlePayment} >Proceed To Payment</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <Comparelist /> */}
                </div>
            </div>
            <Modal size="md" centered
                aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Travel T&C</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="paragraph">{termscondition.terms_constions}</p>
                </Modal.Body>
                <Modal.Footer style={{ padding: '5px 10px' }}>
                    <a className="savechanges" onClick={handleClose}>
                        Ok
                    </a>
                </Modal.Footer>
            </Modal>
            <Footer />
        </div>
    )
}
export default TravelSelectedquotes;