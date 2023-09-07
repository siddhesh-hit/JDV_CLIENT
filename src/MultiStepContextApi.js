import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_URL } from ".";
import { PostData } from "./functions";
import swal from "sweetalert";
import {
  AddMotoformData,
  DeleteAllFromComapre,
} from "./redux/reducers/MotoformDataReducerSlice";
import { useDispatch, useSelector } from "react-redux";

// eslint-disable-next-line
const MotorContext = React.createContext();
const MotorContextAppProvider = ({ children }) => {
  const motorFormsData = useSelector((state) => state.MotoformDataReducer);
  const dispatch = useDispatch();
  // motorFormsData
  //  Add Motoformdata name and value
  const handleSubmitMotorform = (name, value) => {
    dispatch(AddMotoformData({ name, value }));
  };
  // Submit MotorForm Data On Next
  const HandleSubmitMotorFormdata = async () => {
    if (!motorFormsData.email) {
      const email = prompt("please enter your email");
      handleSubmitMotorform("email", email);
    } else if (window.location.pathname === "/Getquote") {
      handleSubmitMotorform("finall_submit", true);
      await axios
        .post(
          API_URL + "/api/fillInsurancePlan?email=" + motorFormsData.email,
          {
            ...motorFormsData,
            form_location: window.location.pathname,
          }
        )
        .then((res) => {
          handleSubmitMotorform("leadid", res?.data?.data?._id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (window.location.pathname === "/Quotes") {
      handleSubmitMotorform("finall_submit", true);
      await axios
        .post(
          API_URL + "/api/fillInsurancePlanemail=?" + motorFormsData.email,
          {
            ...motorFormsData,
            form_location: window.location.pathname,
          }
        )
        .then((res) => {
          handleSubmitMotorform("leadid", res?.data?.data?._id);
        })
        .catch((err) => console.log(err));
    } else {
      await axios
        .post(
          API_URL + "/api/fillInsurancePlan?email=" + motorFormsData.email,
          {
            ...motorFormsData,
            form_location: window.location.pathname,
          }
        )
        .then((res) => {
          handleSubmitMotorform("leadid", res?.data?.data?._id);
        })
        .catch((err) => console.log(err));
    }
  };
  // Submit MotorForm Data On When User Leaves Page
  const handleBeforeUnload = async (event) => {
    event.preventDefault();
    event.returnValue = "";
    if (motorFormsData && motorFormsData.email) {
      await axios
        .post(
          API_URL + "/api/fillInsurancePlan?email=" + motorFormsData.email,
          {
            ...motorFormsData,
            form_location: window.location.pathname,
          }
        )
        .then((res) => console.log("done"))
        .catch((error) => console.log("error"));
    }
  };
  // Save MotorForm Data On Changing details of Motoformdata field
  const SaveDetails = async () => {
    if (motorFormsData && motorFormsData.email) {
      await axios
        .post(
          API_URL + "/api/fillInsurancePlan?email=" + motorFormsData.email,
          {
            ...motorFormsData,
            form_location: window.location.pathname,
          }
        )
        .then((res) => handleSubmitMotorform("leadid", res?.data?.data?._id))
        .catch((error) => console.log(error));
    }
  };

  // end motorformdata
  const [YachtFormsData, setYachtFormsData] = useState({
    name_of_boat: null,
    option1: null,
    reg_no: null,
    hull_serial_number: null,
    option2: null,
    length: null,
    breadth: null,
    option3: null,
    option4: null,

    full_name: null,
    email: null,
    phonenumber: null,
    date: null,
    insurance_type: "Yacht",

    maker: null,
    option5: null,
    horsepower: null,
    speed: null,
    option6: null,

    hull_equipment_value: null,
    dinghy: null,
    outboard: null,
    personal_effect_cash: null,
    trailer: null,

    option7: null,
    craft_kept: null,
    option8: null,
    option9: null,
    option10: null,
    option11: null,

    claim_years1: null,
    condition1: null,
    claim_years2: null,
    condition2: null,
    condition3: null,

    plan_category_id: null,
    insurance_company_id: null,
    nature_id: null,
  });

  const handlYachteSelect = (e, val, nam) => {
    const value = e.target.value === "Any" ? null : e.target.value;
    const name = e.target.name;

    // console.log(value, name, "check bhai");

    if (nam) {
      setYachtFormsData((prevState) => ({
        ...prevState,
        [nam]: val,
      }));
      localStorage.setItem("YachtFormsData", JSON.stringify(YachtFormsData));
    } else {
      setYachtFormsData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      localStorage.setItem("YachtFormsData", JSON.stringify(YachtFormsData));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("YachtFormsData")) {
      setYachtFormsData(JSON.parse(localStorage.getItem("YachtFormsData")));
    }
  }, []);

  // home insurance
  const getInitialHomeFormData = () => {
    // Check if data already exists in localStorage
    const storedFormData = localStorage.getItem("HomeInsurance");
    if (storedFormData) {
      return JSON.parse(storedFormData);
    } else {
      // Set your default values here
      return {
        property_type: null,
        ownership_status: null,
        plan_type: null,
        content_value: null,
        building_value: null,
        personal_belongings_value: null,
        claim_status: null,
        domestic_value: null,
        updatePolicy_id: null,
        plan_type_id: null,
        lead_id: null,
        company_id: null,
        price: null,
        full_name: null,
        email: null,
        insurance_type: "Home",
        phone_number: null,
        date: null,
        address: null,
        country: "UAE",
        home_condition: null,
        plan_category_id: null,
        insurance_company_id: null,
        nature_id: null,
        additional_filter: null,
        compare_date: [],
        full_compare_data: [],
        selected: [],
        bank_name: null,
        policy_issued_date: new Date(),
      };
    }
  };

  const [HomeInsurance, setHomeInsurance] = useState(getInitialHomeFormData);

  const handleHomeInsurance = (e, val, nam) => {
    const value = e.target.value === "Any" ? null : e.target.value;
    const name = e.target.name;

    // console.log(value, name, "chcek");

    if (nam) {
      setHomeInsurance((prevState) => ({
        ...prevState,
        [nam]: val,
      }));
      localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
    } else {
      setHomeInsurance((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
    }
  };

  const handleHomeDate = (date) => {
    setHomeInsurance((prevState) => ({
      ...prevState,
      date: date,
    }));
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };

  const handleHomePhoneChange = (value) => {
    setHomeInsurance((prevState) => ({
      ...prevState,
      phone_number: value,
    }));
    localStorage.setItem("HomeInsurance", JSON.stringify(HomeInsurance));
  };

  useEffect(() => {
    if (localStorage.getItem("HomeInsurance")) {
      setHomeInsurance(JSON.parse(localStorage.getItem("HomeInsurance")));
    }
  }, []);

  const getInitialFormData = () => {
    // Check if data already exists in localStorage
    const storedFormData = localStorage.getItem("travelsFormsData");
    if (storedFormData) {
      return JSON.parse(storedFormData);
    } else {
      // Set your default values here
      return {
        line_of_business: "Travel",
        finall_submit: false,
        name: "",
        phoneno: "",
        email: "",
        date_of_birth: null,
        family_details: [],
        passport_no: "",
        Beneficiary_name: "",
        Beneficiary_phoneno: "",
        Beneficiary_email: "",
        Beneficiary_date_of_birth: "",
        Beneficiary_passport_no: "",
        type_of_trip: "641d700e2e8acf350eaab204",
        travel_destination: "",
        start_date: new Date(),
        end_date: new Date(),
        no_of_travel: "365",
        plan_type: "641d41e519807a3c58191f8a",
        insure_your_travel: "641c25df29b5921dc20ff9eb",
      };
    }
  };

  const [travelsFormsData, settravelsFormsData] = useState(getInitialFormData);

  useEffect(() => {
    if (travelsFormsData.email) {
      localStorage.setItem(`clientemail`, travelsFormsData.email);
    }
    if (localStorage.getItem(`clienttravelformdata`)) {
      let clientFormData = JSON.parse(
        localStorage.getItem("clienttravelformdata")
      );
      settravelsFormsData(clientFormData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("travelsFormsData", JSON.stringify(travelsFormsData));
  }, [travelsFormsData]);

  const getInitialCompareData = () => {
    // Check if data already exists in localStorage
    const storedCompareData = localStorage.getItem("compareselect");
    if (storedCompareData) {
      return JSON.parse(storedCompareData);
    } else {
      // Set your default values here
      return [];
    }
  };
  const getInitialCompareMatchData = () => {
    // Check if data already exists in localStorage
    const storedCompareMatchData = localStorage.getItem("comparematch");
    if (storedCompareMatchData) {
      return JSON.parse(storedCompareMatchData);
    } else {
      // Set your default values here
      return [];
    }
  };
  useEffect(() => {
    if (localStorage.getItem(`compareselect`)) {
      let clientCompareData = JSON.parse(localStorage.getItem("compareselect"));
      setCompareselect(clientCompareData);
    }
    if (localStorage.getItem(`comparematch`)) {
      let clientCompareMatchData = JSON.parse(
        localStorage.getItem("comparematch")
      );
      setComparematch(clientCompareMatchData);
    }
  }, []);

  const [compareselect, setCompareselect] = useState(getInitialCompareData);
  const [comparematch, setComparematch] = useState(getInitialCompareMatchData);
  // console.log("from context compareselect",compareselect)
  // console.log("from context  comparematch",comparematch)

  useEffect(() => {
    localStorage.setItem("compareselect", JSON.stringify(compareselect));
    localStorage.setItem("comparematch", JSON.stringify(comparematch));
  }, [compareselect, comparematch]);



  // Individual Insurance

  const getInitialIndividualFormData = () => {
    // Check if data already exists in localStorage
    const storedFormData = localStorage.getItem("IndividualInsurance");
    if (storedFormData) {
      return JSON.parse(storedFormData);
    } else {
      // Set your default values here
      return {
        full_name: null,
        email: null,
        phone_number: null,
        date: null,
        gender: null,
        country: null,
        insurance_type: "Medical",
        emirates_id: null,
        visa_id: null,
        salary_id: null,
        height: null,
        weight: null,
        insurance_company_id: null,
        nature_id: null,
        plan_category_id: null,
        additional_filter: null,
        selectFilter: null,
        company_id: null,
        final_price: null,
        plan_type_id: null,
        updatePolicy_id: null,
        lead_id: null,
        symptom_condition: [],
        symptom_condition_visit: false,
        maternity_condition: [],
        maternity_condition_visit: false,
        general_condition: [],
        general_condition_visit: false,
        bank_name: null,
        policy_issued_date: new Date(),
        compare_date: [],
        full_compare_data: [],
      };
    }
  };
  const [IndividualInsurance, setIndividualInsurance] = useState(
    getInitialIndividualFormData
  );

  const handleIndividualInsurance = (e, val, nam) => {
    const value = e.target.value === "Any" ? null : e.target.value;
    const name = e.target.name;

    // console.log(e.target, val, nam, "chcek");

    if (nam) {
      setIndividualInsurance((prevState) => ({
        ...prevState,
        [nam]: val,
      }));
      localStorage.setItem(
        "IndividualInsurance",
        JSON.stringify(IndividualInsurance)
      );
    } else {
      setIndividualInsurance((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      localStorage.setItem(
        "IndividualInsurance",
        JSON.stringify(IndividualInsurance)
      );
    }
  };

  const handleIndividualDate = (date) => {
    setIndividualInsurance((prevState) => ({
      ...prevState,
      date: date,
    }));
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  };

  const handleIndividualPhoneChange = (value) => {
    setIndividualInsurance((prevState) => ({
      ...prevState,
      phone_number: value,
    }));
    localStorage.setItem(
      "IndividualInsurance",
      JSON.stringify(IndividualInsurance)
    );
  };

  useEffect(() => {
    if (localStorage.getItem("IndividualInsurance")) {
      setIndividualInsurance(
        JSON.parse(localStorage.getItem("IndividualInsurance"))
      );
    }
  }, []);

  // other insurance
  const getInitialOtherFormData = () => {
    // Check if data already exists in localStorage
    const storedFormData = localStorage.getItem("OtherInsurance");
    if (storedFormData) {
      return JSON.parse(storedFormData);
    } else {
      // Set your default values here
      return {
        other_insurance_option: null,
        full_name: null,
        email: null,
        age: null,
        phone_number: null,
        brief_info: null,
        prefer_day_to_call: null,
        prefer_time_to_call: null,
        insuranceType: "Other",
      };
    }
  };
  const [OtherInsurance, setOtherInsurance] = useState(getInitialOtherFormData);

  const handleOtherInsurance = (e) => {
    const value = e.target.value === "Any" ? null : e.target.value;
    const name = e.target.name;

    console.log(value, name);

    setOtherInsurance((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    localStorage.setItem("OtherInsurance", JSON.stringify(OtherInsurance));
  };

  useEffect(() => {
    if (localStorage.getItem("OtherInsurance")) {
      setOtherInsurance(JSON.parse(localStorage.getItem("OtherInsurance")));
    }
  }, []);

  const state = {
    // motor States
    motorFormsData,
    HandleSubmitMotorFormdata,
    SaveDetails,
    handleBeforeUnload,
    handleSubmitMotorform,
    travelsFormsData,
    settravelsFormsData,
    YachtFormsData,
    setYachtFormsData,
    handlYachteSelect,
    IndividualInsurance,
    setIndividualInsurance,
    handleIndividualInsurance,
    handleIndividualDate,
    handleIndividualPhoneChange,
    OtherInsurance,
    setOtherInsurance,
    handleOtherInsurance,
    HomeInsurance,
    setHomeInsurance,
    handleHomeInsurance,
    handleHomePhoneChange,
    handleHomeDate,
    handleBeforeUnload,
    handleSubmitMotorform,
    travelsFormsData,
    settravelsFormsData,
    compareselect,
    setCompareselect,
    comparematch,
    setComparematch,
  };

  return (
    <MotorContext.Provider value={state}>{children}</MotorContext.Provider>
  );
};
const UseMotorContext = () => {
  return useContext(MotorContext);
};
export { MotorContext, MotorContextAppProvider, UseMotorContext };