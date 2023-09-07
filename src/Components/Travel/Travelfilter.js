import React, { useState, useEffect } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { UseMotorContext } from "../../MultiStepContextApi";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import swal from 'sweetalert'

const Travelfilter = (props) => {

    const { travelsFormsData, settravelsFormsData } = UseMotorContext();

    const [travelsFormsData1, setTravelsFormsData1] = useState(
        JSON.parse(localStorage.getItem("travelsFormsData"))
    );

    useEffect(() => {
        localStorage.setItem('travelsFormsDataLocation', window.location.pathname);

        const familyDetailsFromLocalStorage = JSON.parse(localStorage.getItem('travelsFormsData'))?.family_details;
        setFormValues(familyDetailsFromLocalStorage || [{ name: '', email: '', phone: '', date: '' }]);
    }, []);

    const data = props.matchTravelPlan;
    console.log(data);

    const removeDuplicates = (arr) => {
        const uniqueItems = [];
        const uniqueLabels = new Set();

        for (const item of arr) {
            if (!uniqueLabels.has(item.planData?.additional_cover_label)) {
                uniqueItems.push(item);
                uniqueLabels.add(item.planData?.additional_cover_label);
            }
        }

        return uniqueItems;
    };

    const uniqueData = removeDuplicates(data);

    useEffect(() => {
        localStorage.setItem("travelsFormsDataLocation", window.location.pathname);
    }, []);

    const [travelinsuranceforname, settravelinsuranceforname] = useState("");
    const [tripperiodname, setTripperiodname] = useState("");
    const [triptype, setTriptype] = useState("");
    const [destination, setDestination] = useState("");
    const [show, setShow] = useState(false);

    useEffect(() => {
        gettravelinsurancefor(travelsFormsData1.insure_your_travel);
        gettripperiod(travelsFormsData1.plan_type);
        gettriptype(travelsFormsData1.type_of_trip);
        getdestination(travelsFormsData1.travel_destination);
        getinsureyourtraveldetails();
        getplantypedetails();
        gettypeoftripdetails();
        getCountrydetails();

        localStorage.setItem("travelsFormsDataLocation", window.location.pathname);
        const nooftravel = travelsFormsData.no_of_travel == "" ? (travelsFormsData.plan_type == "641d418b19807a3c58191f7f" ? "" : "365") : travelsFormsData.no_of_travel;
        setnooftravel(nooftravel);
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

    const [insureyourtravel, setinsureyourtravel] = useState([]);
    const [plantype, setplantype] = useState([]);
    const [nooftravel, setnooftravel] = useState([]);
    const [typeoftrip, settypeoftrip] = useState([]);
    const [country, setCountry] = useState([]);


    const getinsureyourtraveldetails = async () => {
        var requestOptions = {
            method: 'GET',
        };

        fetch("https://lmpapi.handsintechnology.in/api/getTravelsInsuranceFor", requestOptions)
            .then(response => response.json())
            .then(result => {
                setinsureyourtravel(result.data);
            })
            .catch(error => console.log('error', error));
    };

    const getplantypedetails = async () => {
        var requestOptions = {
            method: 'GET',
        };

        fetch("https://lmpapi.handsintechnology.in/api/getTravelTypes", requestOptions)
            .then(response => response.json())
            .then(result => {
                setplantype(result.data);
            })
            .catch(error => console.log('error', error));
    };

    const gettypeoftripdetails = async () => {
        var requestOptions = {
            method: 'GET',
        };

        fetch("https://lmpapi.handsintechnology.in/api/getTravelPlanTypes", requestOptions)
            .then(response => response.json())
            .then(result => {
                settypeoftrip(result.data);
            })
            .catch(error => console.log('error', error));
    };


    const getCountrydetails = async () => {
        var requestOptions = {
            method: 'GET',
        };

        fetch("https://lmpapi.handsintechnology.in/api/getAllCountries", requestOptions)
            .then(response => response.json())
            .then(result => {
                setCountry(result.data);
            })
            .catch(error => console.log('error', error));
    };


    useEffect(() => {
        // Fetch the data from localStorage whenever it changes
        const storedData = JSON.parse(localStorage.getItem("travelsFormsData"));
        setTravelsFormsData1(storedData);
    }, [localStorage.getItem("travelsFormsData")]);

    console.log(travelsFormsData1);


    const [isEditMode, setIsEditMode] = useState(false);
    const [ispersonalEditMode, setIspersonalEditMode] = useState(false);

    const handleEditModeToggle = () => {
        setIsEditMode((prevEditMode) => !prevEditMode);
        gettravelinsurancefor(travelsFormsData1.insure_your_travel);
        gettripperiod(travelsFormsData1.plan_type);
        gettriptype(travelsFormsData1.type_of_trip);
        getdestination(travelsFormsData1.travel_destination);
        setTimeout(() => {
            if (travelsFormsData1.type_of_trip == "641d700e2e8acf350eaab204") {
                document.getElementById("btd").style.display = "block";
            }
            else {
                document.getElementById("btd").style.display = "none";
            }
        }, 300);

    };

    const handlepersonalEditModeToggle = () => {
        setIspersonalEditMode((prevEditMode) => !prevEditMode);
    };


    const handleTravelType = (id) => {
        settravelsFormsData((prevData) => ({
            ...prevData,
            insure_your_travel: id,
        }));
        localStorage.setItem("travelsFormsData", JSON.stringify({
            ...travelsFormsData, insure_your_travel: id
        })
        );
    };

    const handlePlanChange = (id) => {
        settravelsFormsData((prevData) => ({
            ...prevData,
            plan_type: id,
        }));
        localStorage.setItem("travelsFormsData", JSON.stringify({
            ...travelsFormsData, plan_type: id
        })
        );
    };

    const handleNoOfTravelChange = (id) => {
        settravelsFormsData((prevData) => ({
            ...prevData,
            no_of_travel: id,
        }));
        localStorage.setItem("travelsFormsData", JSON.stringify({
            ...travelsFormsData, no_of_travel: id
        })
        );
    };

    const handleStartDateChange = (date) => {
        const travelsFormsData = JSON.parse(localStorage.getItem("travelsFormsData"));
        const no_of_travel = parseInt(travelsFormsData.no_of_travel); // Convert to a number
        console.log("no_of_travel", no_of_travel);
        settravelsFormsData((prevData) => ({
            ...prevData,
            start_date: date,
            end_date: new Date(date.getTime() + no_of_travel * 24 * 60 * 60 * 1000)
        }));
        localStorage.setItem("travelsFormsData", JSON.stringify({
            ...travelsFormsData, start_date: date,
            end_date: new Date(date.getTime() + no_of_travel * 24 * 60 * 60 * 1000),
        })
        );
    };

    const handleEndDateChange = (date) => {
        settravelsFormsData((prevData) => ({
            ...prevData,
            end_date: date,
        }));
        localStorage.setItem("travelsFormsData", JSON.stringify({
            ...travelsFormsData, end_date: date
        })
        );
    };

    const handleTypeOfTripChange = (id) => {
        settravelsFormsData((prevData) => ({
            ...prevData,
            type_of_trip: id,
        }));
        localStorage.setItem("travelsFormsData", JSON.stringify({
            ...travelsFormsData, type_of_trip: id
        })
        );
        if (id == "641d700e2e8acf350eaab204") {
            document.getElementById("btd").style.display = "block";
        }
        else {
            document.getElementById("btd").style.display = "none";
        }
    };

    const handleDestinationChange = (id) => {
        settravelsFormsData((prevData) => ({
            ...prevData,
            travel_destination: id,
        }));
        localStorage.setItem("travelsFormsData", JSON.stringify({
            ...travelsFormsData, travel_destination: id
        })
        );
    };

    const handlePhoneChange = (phoneValue) => {
        setNewphone(phoneValue);
    };

    const handlemodal = () => {
        setShow(true);
    };

    const [startDate, setStartDate] = useState('');
    const Progress = 70;
    const [formValues, setFormValues] = useState([{ name: "", email: "", phone: "", date: "" }])

    let handleChange = (index, e, date) => {
        const { name, value } = e ? e.target : { name: 'date', value: new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) };
        let newFormValues = [...formValues];
        newFormValues[index][name] = value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { name: "", email: "", phone: "", date: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const email = travelsFormsData.email;
    const insuranceType = travelsFormsData.line_of_business;

    const sendFamilyDetailsToServer = () => {
        // Prepare the data to be sent to the server
        const familyDetails = formValues.map((element) => ({
            Name: element.name,
            phoneNumber: element.phone,
            email: element.email,
            date: element.date,
        }));

        console.log('POST API request data:', familyDetails);

        // Make the POST API request to send the family details to the server
        fetch('https://lmpapi.handsintechnology.in/api/fillInsurancePlan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ insuranceType: insuranceType, email: email, travel_family_details: familyDetails }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                if (result.status == 200) {
                    swal("Success", "Family Details Added Successfully", "success");
                } else {
                    swal("Error", "Error in Adding Family Details", "error");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    let handleSubmit = (event) => {
        const invalidEntries = formValues.filter((element) => (
            element.name === '' ||
            element.email === '' ||
            !element.email.includes('@') ||
            !element.email.includes('.') ||
            element.phone === '' ||
            element.date === ''
          ));
          if (invalidEntries.length > 0) {
            swal("Please fill all fields correctly.", "", "warning");
            return;
          }
          else {
        event.preventDefault();
        settravelsFormsData((prevData) => ({
            ...prevData,
            family_details: formValues,
        }));
        localStorage.setItem('travelsFormsData', JSON.stringify({ ...travelsFormsData, family_details: formValues }));
        console.log(formValues);
        sendFamilyDetailsToServer();
        }
    }

    const [newname, setNewname] = useState('');
    const [newemail, setNewemail] = useState('');
    const [newphone, setNewphone] = useState('');
    const [newdate, setNewdate] = useState(travelsFormsData1.date_of_birth);
    const [newpassport, setNewpassport] = useState('');

    const handlePersonalDetailsSave = () => {
        const updatedData = {
            ...travelsFormsData,
            name: newname !== "" ? newname : travelsFormsData.name,
            phone_no: newphone !== "" ? newphone : travelsFormsData.phone_no,
            date_of_birth: newdate !== "" ? newdate : travelsFormsData.date_of_birth,
            passport_no: newpassport !== "" ? newpassport : travelsFormsData.passport_no
        };

        // Update state with the modified data
        settravelsFormsData(updatedData);

        // Update local storage with the modified data
        localStorage.setItem("travelsFormsData", JSON.stringify(updatedData));

        // Prepare data to send to the API
        const apiData = {
            insuranceType: insuranceType,
            email: email,
            name: updatedData.name,
            phoneno: updatedData.phone_no,
            date_of_birth: updatedData.date_of_birth,
            passport_number: updatedData.passport_no
        };

        // Make an API request
        fetch('https://lmpapi.handsintechnology.in/api/fillInsurancePlan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiData),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 200) {
                    swal("Success", "Personal Details Updated Successfully", "success");
                } else {
                    swal("Error", "Error in Updating Personal Details", "error");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className='col-lg-4 col-md-12 col-sm-12 col-xs-12 filters'>
            {/* <p className='filtercheck'>Additional Filter</p>
            {uniqueData.map((item) => (
                item.planData?.additional_cover_arr.map((item1, index) => ( // Added "index" parameter
                    <Form.Check
                        key={item1.additional_cover_label + index} // Using label + index as a unique key
                        className='abcds_abcs filtercheck'
                        type="checkbox"
                        label={item1.additional_cover_label}
                    />
                ))
            ))} */}


            <h4 className='car details'>Travel Details<i className="fa fa-edit" onClick={handleEditModeToggle}></i></h4>
            <div className='filterssas one'>
                <div className='row travel_detailss_form'>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Travel Type</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {isEditMode ? (
                            <select className='form-control'
                                onChange={(e) => handleTravelType(e.target.value)}
                            >
                                {insureyourtravel.map((item) => (
                                    <option key={item._id} selected={travelinsuranceforname == item.travel_insurance_for ? true : false} value={item._id}>
                                        {item.travel_insurance_for}
                                    </option>
                                ))}
                                {/* Add more options as needed */}
                            </select>
                        ) : (
                            <h6>{travelinsuranceforname}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Trip Period</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>

                        {isEditMode ? (
                            <select className='form-control'
                                onChange={(e) => handlePlanChange(e.target.value)}
                            >
                                {plantype.map((item) => (
                                    <option key={item._id} selected={tripperiodname == item.travel_type ? true : false} value={item._id}>
                                        {item.travel_type}
                                    </option>
                                ))}
                                {/* Add more options as needed */}
                            </select>
                        ) : (
                            <h6>{tripperiodname}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Number of Days</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {isEditMode ? (
                            <input
                                type='text'
                                className='form-control'
                                defaultValue={travelsFormsData1.no_of_travel}
                                onChange={(e) => handleNoOfTravelChange(e.target.value)}
                            />
                        ) : (
                            <h6>{travelsFormsData1.no_of_travel} days</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Start date</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {isEditMode ? (
                            <DatePicker
                                className="form-control"
                                selected={travelsFormsData1.start_date && !isNaN(new Date(travelsFormsData1.start_date))
                                    ? new Date(travelsFormsData1.start_date)
                                    : null}
                                placeholderText="DD/MM/YYYY"
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                                showTimeSelect={false}
                                onChange={handleStartDateChange}
                            />

                        ) : (
                            <h6>{new Date(travelsFormsData1.start_date).toLocaleDateString("en-US")}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>End Date</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {isEditMode ? (
                            <DatePicker
                                className="form-control"
                                selected={travelsFormsData1.end_date && !isNaN(new Date(travelsFormsData1.end_date))
                                    ? new Date(travelsFormsData1.end_date)
                                    : null}
                                placeholderText="DD/MM/YYYY"
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
                                showTimeSelect={false}
                                onChange={handleEndDateChange}
                                disabled
                            />
                        ) : (
                            <h6>{new Date(travelsFormsData1.end_date).toLocaleDateString("en-US")}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Trip Type</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {isEditMode ? (
                            <div>
                                <select className='form-control'
                                    onChange={(e) => handleTypeOfTripChange(e.target.value)}
                                >
                                    {typeoftrip.map((item) => (
                                        <option key={item._id} selected={triptype == item.travel_plan_type ? true : false} value={item._id}>
                                            {item.travel_plan_type}
                                        </option>
                                    ))}
                                    {/* Add more options as needed */}
                                </select>
                                <i onClick={handlemodal} id="btd" className='fa fa-eye'> <span> View Family Details</span></i>

                            </div>
                        ) : (
                            <h6>{triptype}</h6>
                        )}
                    </div>

                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Destination</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {isEditMode ? (
                            <select className='form-control'
                                onChange={(e) => handleDestinationChange(e.target.value)}
                            >
                                {country.map((item) => (
                                    <option key={item._id} selected={destination == item.country_name ? true : false} value={item._id}>
                                        {item.country_name}
                                    </option>
                                ))}
                                {/* Add more options as needed */}
                            </select>
                        ) : (
                            <h6>{destination}</h6>
                        )}
                    </div>
                    {/* {
                        isEditMode && (
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <button className='submit_select'>Save</button>
                            </div>
                        )

                    } */}
                </div>
            </div>
            <h4 className='personal details'>Personal Details<i className="fa fa-edit" onClick={handlepersonalEditModeToggle}></i></h4>
            <div className='filterssas two mb-5'>
                <div className='row travel_detailss_form'>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Name</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6 '>
                        {ispersonalEditMode ? (
                            <input
                                type='text'
                                className='form-control input-sm'
                                defaultValue={travelsFormsData1.name}
                                onChange={(e) => setNewname(e.target.value)}

                            />
                        ) : (
                            <h6>{travelsFormsData1.name}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Email Address</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {ispersonalEditMode ? (
                            <input
                                type='text'
                                className='form-control input-sm'
                                defaultValue={travelsFormsData1.email}
                                disabled
                            />
                        ) : (
                            <h6>{travelsFormsData1.email}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Phone Number</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {ispersonalEditMode ? (
                            // <input
                            //     type='text'
                            //     className='form-control input-sm'
                            //     defaultValue={travelsFormsData1.phone_no}
                            //     onChange={(e) => setNewphone(e.target.value)}
                            // />
                            <PhoneInput
                                style={{ backgroundColor: "transparent", boxShadow: "none" }}
                                international
                                name="phone_no"
                                className="form-control phone_numberas"
                                defaultCountry="AE"
                                value={travelsFormsData1.phone_no}
                                onChange={handlePhoneChange}
                            />
                        ) : (
                            <h6>{travelsFormsData1.phone_no}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Date of Birth</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {ispersonalEditMode ? (
                            <DatePicker
                                className="form-control"
                                selected={newdate && !isNaN(new Date(newdate))
                                    ? new Date(newdate)
                                    : null}
                                placeholderText="/DDMM/YYYY"
                                dateFormat="dd/MM/yyyy"
                                showTimeSelect={false}
                                onChange={(date) => setNewdate(date)}
                            />
                        ) : (
                            <h6>{new Date(travelsFormsData1.date_of_birth).toLocaleDateString("en-US")}</h6>
                        )}
                    </div>
                    <div className='col-lg-5 col-md-6 col-sm-6 col-xs-6'>
                        <h6>Passport Number</h6>
                    </div>
                    <div className='col-lg-7 col-md-6 col-sm-6 col-xs-6'>
                        {ispersonalEditMode ? (
                            <input
                                type='text'
                                className='form-control input-sm'
                                defaultValue={travelsFormsData1.passport_no}
                                onChange={(e) => setNewpassport(e.target.value)}
                            />
                        ) : (
                            <h6>{travelsFormsData1.passport_no}</h6>
                        )}
                    </div>
                    {
                        ispersonalEditMode && (
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <button className="profileupadtes" id="personalupdate" onClick={handlePersonalDetailsSave}>Update</button>
                            </div>
                        )

                    }
                </div>
            </div>
            <Modal size="lg" show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Family Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        {formValues.map((element, index) => (
                            <div className="row" key={index} style={{ justifyContent: 'space-around' }}>
                                {
                                    index ?
                                        <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                                        : null
                                }
                                <div className='col-lg-5'>
                                    <InputGroup className="mb-4">
                                        <InputGroup.Text id="basic-addon1"><i class="fa fa-user" aria-hidden="true"></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                            name='name'
                                            defaultValue={element.name || ""}
                                            onChange={e => handleChange(index, e)}
                                            required
                                            placeholder="Full Name"
                                            aria-label="Full Name"
                                        />
                                    </InputGroup>
                                </div>
                                <div className='col-lg-5'>
                                    <InputGroup className="mb-4">
                                        <InputGroup.Text id="basic-addon1"><i class="fa fa-envelope-o" aria-hidden="true"></i></InputGroup.Text>
                                        <Form.Control name='email' defaultValue={element.email || ""} onChange={e => handleChange(index, e)} required
                                            placeholder="Email ID"
                                            aria-label="Email ID"
                                        />
                                    </InputGroup>
                                </div>
                                <div className='col-lg-5'>
                                    {/* <InputGroup className="mb-4">
                                        <InputGroup.Text id="basic-addon1"><i class="fa fa-phone" aria-hidden="true"></i>
                                        </InputGroup.Text>
                                        <Form.Control required name='phone' defaultValue={element.phone || ""} onChange={e => handleChange(index, e)}
                                            placeholder="Phone Number"
                                            aria-label="Phone Number"
                                        />
                                    </InputGroup> */}
                                    <PhoneInput
                                        international
                                        name="phone"
                                        className="form-control"
                                        defaultCountry="AE"
                                        value={element.phone || ''}
                                        onChange={(phoneValue) => handleChange(index, { target: { name: 'phone', value: phoneValue } })}
                                        inputStyle={{ width: '100%' }}
                                    />
                                </div>
                                <div className='col-lg-5'>
                                    <InputGroup className="mb-4">
                                        <InputGroup.Text id="basic-addon1"><i class="fa fa-calendar" aria-hidden="true"></i></InputGroup.Text>
                                        <DatePicker
                                            selected={
                                                element.date ? new Date(element.date) : new Date()
                                            }
                                            onChange={(date) => handleChange(index, null, date)}
                                            name='date'
                                            placeholderText="Date of Birth"
                                            className='form-control'
                                        />
                                    </InputGroup>
                                </div>
                            </div>
                        ))}
                        <div className="button-section1">
                            <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                            {/* <button className="button submit" type="submit">Submit</button> */}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='submit_select' onClick={handleSubmit}>Save</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Travelfilter