import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import { Form, Button, InputGroup } from "react-bootstrap";
import { UseMotorContext } from "../../MultiStepContextApi";
import { useLocation } from "react-router-dom";
import admin from "../../config";
const Individualmedicalfilter = () => {
  const {
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
    handleIndividualDate,
    handleIndividualPhoneChange,
  } = UseMotorContext();

  const [update, setUpdate] = useState(false);
  const [country, setCountry] = useState([]);
  const [emirates, setEmirates] = useState([]);
  const [visa, setVisa] = useState([]);
  const [salary, setSalary] = useState([]);

  const [emiratesId, setEmiratesId] = useState("");
  const [visaId, setVisaId] = useState("");
  const [salaryId, setSalaryId] = useState("");

  const { pathname } = useLocation();
  const API = process.env.REACT_APP_BACKENDURL;

  const fetchData = async () => {
    await fetch(`${admin}/getAllCountries`)
      .then((res) => res.json())
      .then((data) => setCountry(data.data))
      .catch((e) => console.log(e));

    await fetch(`${admin}/getEmirate`)
      .then((res) => res.json())
      .then((data) => setEmirates(data.data))
      .catch((e) => console.log(e));

    await fetch(`${admin}/getVisaTypes`)
      .then((res) => res.json())
      .then((data) => setVisa(data.data))
      .catch((e) => console.log(e));

    await fetch(`${admin}/getsalary`)
      .then((res) => res.json())
      .then((data) => setSalary(data.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchData();

    // console.log(emirates, visa, salary, "heck");
  }, []);

  const idToName = () => {
    const stored = localStorage.getItem("IndividualInsurance");
    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
    }
    if (IndividualInsurance.emirates_id) {
      const findEle = emirates.filter(
        (val) => val._id === IndividualInsurance.emirates_id
      );
      findEle.length > 0 && setEmiratesId(findEle[0].medical_visa_country);
    }
    if (IndividualInsurance.visa_id) {
      const findEle = visa.filter(
        (val) => val._id === IndividualInsurance.visa_id
      );
      findEle.length > 0 && setVisaId(findEle[0].medical_plan_condition);
    }
    if (IndividualInsurance.salary_id) {
      const findEle = salary.filter(
        (val) => val._id === IndividualInsurance.salary_id
      );
      findEle.length > 0 && setSalaryId(findEle[0].medical_salary_range);
    }
  };

  useEffect(() => {
    idToName();
    // console.log(emiratesId, salaryId, visaId, "value");
  }, [emirates, visa, salary]);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleSubmit = async () => {
    const {
      full_name,
      email,
      phone_number,
      date,
      gender,
      country,
      insurance_type,
      emirates_id,
      visa_id,
      salary_id,
      height,
      weight,
    } = IndividualInsurance;

    const dataToSend = {
      name: full_name,
      email: email,
      phoneno: phone_number,
      date_of_birth: date,
      insuranceType: insurance_type,
      gender: gender,
      nationality: country,
      emirate_issuing_visa: emirates_id,
      visa_type: visa_id,
      salary: salary_id,
      hight: height,
      weight: weight,
    };

    await fetch(`${admin}/fillInsurancePlan`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((val) => console.log(val))
      .catch((err) => console.log(err));

    handleUpdate();
  };
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  useEffect(() => {
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  }, [IndividualInsurance]);

  useEffect(() => {
    const stored = localStorage.getItem("IndividualInsurance");
    if (stored) {
      setIndividualInsurance(JSON.parse(stored));
    }
  }, []);

  // useEffect(() => {
  // }, [
  //   IndividualInsurance.emirates_id,
  //   IndividualInsurance.visa_id,
  //   IndividualInsurance.salary_id,
  // ]);

  return (
    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 filters">
      {pathname === "/Individualinsurancequote" ||
      pathname === "/Individualinsurancequotes" ? (
        <h4 className="car details">
          Medical Details
          {update ? (
            <i
              className="fa fa-check"
              style={{ cursor: "pointer" }}
              onClick={handleSubmit}
            ></i>
          ) : (
            <i
              className="fa fa-edit"
              style={{ cursor: "pointer" }}
              onClick={handleUpdate}
            ></i>
          )}
        </h4>
      ) : (
        <h4 className="car details">Medical Details</h4>
      )}
      <div className="filterssas one">
        {update ? (
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Full Name</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <Form.Control
                  required
                  className="input-height"
                  name="full_name"
                  type="text"
                  value={IndividualInsurance.full_name}
                  onChange={handleIndividualInsurance}
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Email</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <Form.Control
                  required
                  className="input-height"
                  name="email"
                  type="text"
                  value={IndividualInsurance.email}
                  onChange={handleIndividualInsurance}
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Mobile Number</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <PhoneInput
                  international
                  className="form-control"
                  defaultCountry="AE"
                  value={IndividualInsurance.phone_number}
                  onChange={handleIndividualPhoneChange}
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Date of Birth</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <DatePicker
                  placeholderText="Date Of Birth"
                  className="form-control"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  selected={
                    IndividualInsurance.date
                      ? new Date(IndividualInsurance?.date)
                      : null
                  }
                  onChange={(startDate) => {
                    handleIndividualDate(startDate);
                  }}
                  maxDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  showTimeSelect={false}
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Gender</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <select
                  className="form-control"
                  name="gender"
                  value={IndividualInsurance.gender}
                  onChange={handleIndividualInsurance}
                >
                  <option hidden>Gender</option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Nationality</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <select
                  name="country"
                  className="form-control"
                  placeholder="Select Country"
                  value={IndividualInsurance.country}
                  onChange={handleIndividualInsurance}
                >
                  {country.length === 0 ? (
                    <option>No options available</option>
                  ) : (
                    country &&
                    country.map((val) => (
                      <option value={val.country_name} key={val._id}>
                        {val.country_name}
                      </option>
                    ))
                  )}
                </select>
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Emirate Issuing Visa</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <select
                  className="form-control"
                  name="emirates_id"
                  value={IndividualInsurance.emirates_id}
                  onChange={handleIndividualInsurance}
                >
                  <option hidden>Emirate Issuing Visa</option>
                  {emirates.length === 0 ? (
                    <option>No options available</option>
                  ) : (
                    emirates &&
                    emirates.map((val) => (
                      <option value={val._id} key={val._id}>
                        {val.medical_visa_country}
                      </option>
                    ))
                  )}
                </select>
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Visa Type</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <select
                  className="form-control"
                  name="visa_id"
                  value={IndividualInsurance.visa_id}
                  onChange={handleIndividualInsurance}
                >
                  <option hidden>Visa Type</option>
                  {visa.length === 0 ? (
                    <option>No options available</option>
                  ) : (
                    visa &&
                    visa.map((val) => (
                      <option value={val._id} key={val._id}>
                        {val.medical_plan_condition}
                      </option>
                    ))
                  )}
                </select>
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Salary</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup>
                <select
                  className="form-control"
                  name="salary_id"
                  value={IndividualInsurance.salary_id}
                  onChange={handleIndividualInsurance}
                >
                  <option hidden>Salary</option>
                  {salary.length === 0 ? (
                    <option>No options available</option>
                  ) : (
                    salary &&
                    salary.map((val) => (
                      <option value={val._id} key={val._id}>
                        {val.medical_salary_range}
                      </option>
                    ))
                  )}
                </select>
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Height</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <Form.Control
                  required
                  type="number"
                  name="height"
                  min={0}
                  onKeyDown={blockInvalidChar}
                  onInput={(e) => Math.abs(e.target.value)}
                  value={IndividualInsurance.height}
                  onChange={handleIndividualInsurance}
                  placeholder="Height (cm)"
                  aria-label="Height (cm)"
                />
              </InputGroup>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Weight</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <InputGroup className="">
                <Form.Control
                  required
                  type="number"
                  name="weight"
                  min={0}
                  onKeyDown={blockInvalidChar}
                  onInput={(e) => Math.abs(e.target.value)}
                  value={IndividualInsurance.weight}
                  onChange={handleIndividualInsurance}
                  placeholder="Weight (kg)"
                  aria-label="Weight (kg)"
                />
              </InputGroup>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Full Name</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.full_name}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Email</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.email}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Mobile Number</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.phone_number}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Date of Birth</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>
                {new Date(IndividualInsurance.date).getDate() +
                  "/" +
                  new Date(IndividualInsurance.date).getMonth() +
                  "/" +
                  new Date(IndividualInsurance.date).getFullYear()}
              </h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Gender</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.gender}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Nationality</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.country}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Emirate Issuing Visa</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{emiratesId}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Visa Type</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{visaId}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Salary</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{salaryId}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Height</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.height}</h6>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>Weight</h6>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 margin_bottom">
              <h6>{IndividualInsurance.weight}</h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Individualmedicalfilter;
