import React, { useState } from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Innerbanner from '../Banner/Innerbanner'
import Insurancedetails from '../Common/Insurancedetails'
import { Link } from 'react-router-dom'
import { Form, FormControl, InputGroup, ProgressBar } from 'react-bootstrap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { UseMotorContext } from "../../MultiStepContextApi";
const Enginedetails = () => {
    const Progress = 40;
    const { YatchFormsData, setYatchFormsData } = UseMotorContext();
    return (
        <div>
            <Header />
            <Innerbanner />
            <div className='container-fluid car_info pt-4 pb-4'>
                <div className='container'>
                    <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
                    <div className='row' style={{ justifyContent: 'center' }}>
                        <div className='col-lg-12 nopadding'>
                            <div className='row form_abcd'>
                                <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12 mb-2'>
                                    <ul style={{ paddingLeft: '0px' }}>
                                        <li style={{ listStyle: 'none' }}>Please fill Engine Details :</li>
                                    </ul>
                                </div>
                                <div className='col-lg-5'>
                                    <InputGroup className="mb-4">
                                        <Form.Control required
                                          onChange={(e) => {
                                            setYatchFormsData((prev) => ({
                                              ...prev,
                                              engine_maker: e.target.value,
                                            }));
                                          }}
                                            placeholder="Maker"
                                            aria-label="Masker"
                                        />
                                    </InputGroup>
                                </div>
                                <div className='col-lg-5'>
                                    <select 
                                      onChange={(e) => {
                                        setYatchFormsData((prev) => ({
                                          ...prev,
                                          engine_model_year: e.target.value,
                                        }));
                                      }}
                                     className='form-control'>
                                        <option disabled>Model Year</option>
                                        <option>Model</option>
                                        <option>Model</option>
                                    </select>  
                                </div>
                                <div className='col-lg-5'>
                                    <InputGroup className="mb-4">
                                        <Form.Control required
                                         onChange={(e) => {
                                            setYatchFormsData((prev) => ({
                                              ...prev,
                                              engine_horsepower: e.target.value,
                                            }));
                                          }}
                                            placeholder="Horsepower"
                                            aria-label="Horsepower"
                                        />
                                    </InputGroup>
                                </div>
                                <div className='col-lg-5'>
                                    <InputGroup className="mb-4">
                                        <Form.Control required
                                          onChange={(e) => {
                                            setYatchFormsData((prev) => ({
                                              ...prev,
                                              engine_speed: e.target.value,
                                            }));
                                          }}
                                            placeholder="Speed (knots)"
                                            aria-label="Speed (knots)"
                                        />
                                    </InputGroup>
                                </div>
                                <div className='col-lg-5 mb-4'>
                                    <select 
                                      onChange={(e) => {
                                        setYatchFormsData((prev) => ({
                                          ...prev,
                                          engine_type: e.target.value,
                                        }));
                                      }}
                                    className='form-control'>
                                        <option disabled>Engine Type</option>
                                        <option>Model</option>
                                        <option>Model</option>
                                    </select>  
                                </div>
                                <div className='col-lg-5 mb-4'>
                                </div>
                                <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3'>
                                    <Link to="/Yatchpersonaldetails" className='buttonactions'><i class="fa fa-chevron-left" aria-hidden="true"></i>Back</Link>
                                </div>
                                <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3' style={{ textAlign: 'right' }}>
                                    <Link to="/Suminsured" className='buttonactions'>Next<i class="fa fa-chevron-right" aria-hidden="true"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Insurancedetails />
            <Footer />
        </div>
    )
}

export default Enginedetails