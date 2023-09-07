import React, { useState, useEffect } from "react";
import "./App.css";
import "./Responsive.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  BrowserRouter,
  Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home";
import ChatRoom from "./Components/ChatBox/ChatRoom";
import Chasisno from "./Components/Chasis/Chasisno";
import Carbasicinfo from "./Components/Carinfo/Carbasicinfo";
import Carpolicyinfo from "./Components/Carinfo/Carpolicyinfo";
import Carmodelyear from "./Components/Carinfo/Carmodelyear";
import Carmaker from "./Components/Carinfo/Carmaker";
import Carvariant from "./Components/Carinfo/Carvariant";
import Carmodel from "./Components/Carinfo/Carmodel";
import Carregisterlocation from "./Components/Carinfo/Carregisterlocation";
import Carspecification from "./Components/Carinfo/Carspecification";
import Personaldetails from "./Components/Userdetails/Personaldetails";
import Nationality from "./Components/Userdetails/Nationality";
import Uaedrivingexp from "./Components/Userdetails/Uaedrivingexp";
import Lastclaim from "./Components/Userdetails/Lastclaim";
import Getquote from "./Components/Userdetails/Getquote";
import Quotes from "./Components/Quotes/Quotes";
import Comparision from "./Components/Quotes/Comparision";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Vehicledetails from "./Components/Quotes/Vehicledetails";
import Cancelpolicy from "./Components/Payments/Cancelpolicy";
import Selectedquotes from "./Components/Quotes/Selectedquotes";
import Payments from "./Components/Payments/Payments";
import Familydetails from "./Components/Travel/Familydetails";
import Beneficarydetails from "./Components/Travel/Beneficarydetails";
import Termsandcondition from "./Components/Travel/Termsandcondition";
import Yatchdetails from "./Components/Yatch/Yatchdetails";
import Yatchpersonaldetails from "./Components/Yatch/Yatchpersonaldetails";
import Enginedetails from "./Components/Yatch/Enginedetails";
import Suminsured from "./Components/Yatch/Suminsured";
import Territorycoverage from "./Components/Yatch/Territorycoverage";
import Claimsexperience from "./Components/Yatch/Claimsexperience";
import Yatchquotes from "./Components/Yatch/Yatchquotes";
import Homeinsurance from "./Components/Home/Homeinsurance";
import Homevalue from "./Components/Home/Homevalue";
import Homehelper from "./Components/Home/Homehelper";

import Homepersonaldetails from "./Components/Home/Homepersonaldetails";
import Homecondition from "./Components/Home/Homecondition";
import Homecondition2 from "./Components/Home/Homecondition2";
import Homeplan from "./Components/Home/Homeplan";
import Homequotes from "./Components/Home/Homequotes";
import Homeadditionaldetails from "./Components/Home/Homeadditionaldetails";
import Homeselectedquotes from "./Components/Home/Homeselectedquotes";
import Homecompare from "./Components/Home/Homecompare";
import Homecomparelist from "./Components/Home/Homecomparelist";
import HomePayment from "./Components/Home/HomePayments";
import Otherinsurance from "./Components/Otherinsurance/Otherinsurance";
import Mypolicies from "./Components/Clientprofile/Mypolicies";
import Myprofile from "./Components/Clientprofile/Myprofile";
import Claimlist from "./Components/Clientprofile/Claimlist";
import Policiesrenewal from "./Components/Clientprofile/Policiesrenewal";
import Pendingpolicies from "./Components/Clientprofile/Pendingpolicies";
import Claimform from "./Components/Clientprofile/Claimform";
import Otherinsurancesubmit from "./Components/Otherinsurance/Otherinsurancesubmit";
import Individualcountry from "./Components/Individualinsurance/Individualcountry";
import Individualinsurancepersonaldetails from "./Components/Individualinsurance/Individualinsurancepersonaldetails";
import Individualinsuranceids from "./Components/Individualinsurance/Individualinsuranceids";
import Individualinsurancequotes from "./Components/Individualinsurance/Individualinsurancequotes";
import Individualinsurancequote from "./Components/Individualinsurance/Individualinsurancequote";
import Individualinsurancesymptoms from "./Components/Individualinsurance/Individualinsurancesymptoms";
// import Individualinsurancepersonaldetails3 from "./Components/Individualinsurance/Individualinsurancepersonaldetails3";
import Individualinsurancematernity from "./Components/Individualinsurance/Individualinsurancematernity";
import Individualinsuranceunderwriting from "./Components/Individualinsurance/Individualinsuranceunderwriting";
// import Individualinsurancepersonaldetails6 from "./Components/Individualinsurance/Individualinsurancepersonaldetails6";
import Individualthankyou from "./Components/Individualinsurance/Individualthankyou";
import Individualcompare from "./Components/Individualinsurance/Individualcompare";
import Individualselectedquote from "./Components/Individualinsurance/Individualselectedquote";
import Individualpayment from "./Components/Individualinsurance/Individualpayment";
import Individualmetrics from "./Components/Individualinsurance/Individualmetrics";
import Forgetpassword from "./Components/Login/Forgetpassword";
import ResetPassword from "./Components/Login/ResetPassword";
import VerifyEmail from "./Components/Login/VerifyEmail";
import { UseUserContext } from "./UserContextAppProvider";
import ThankYou from "./ThankYou/ThankYou";
import Traveldetails from "./Components/Travel/Traveldetails";
import Traveldetailsform from "./Components/Travel/Traveldetailsform";
import Travelpersonalform from "./Components/Travel/Travelpersonalform";
import Travelquotes from "./Components/Travel/Travelquotes";
import TravelSelectedquotes from "./Components/Travel/TravelSelectedquotes";
import TravelComparelist from "./Components/Travel/TravelComparelist";
import Travelcomparision from "./Components/Travel/Travelcomparision";
import TravelPayments from "./Components/Travel/TravelPayments";
import SpecialOffer from "./Components/Clientprofile/SpecialOffer";
import Privacypolicy from "./Components/Common/Privacypolicy";
import Disclaimer from "./Components/Common/Disclaimer";
import Termsandcond from "./Components/Common/Termsandcond";
import Contactus from "./Components/Common/Contactus";
import Complain from "./Components/Common/Complain";
import Scrolltotop from "./Components/Common/Scrolltotop";
import Claimpolicy from "./Components/Payments/Claimpolicy";
import SelectCarvalue from "./Components/Carinfo/SelectCarvalue";
import SubmitDocument from "./ThankYou/SubmitDocument";
import CancelledPolicies from "./Components/Clientprofile/CancelledPolicies";
import Travelplantype from "./Components/Travel/Travelplantype";
import Individualpolicy from "./Components/Individualinsurance/Individualpolicy";
import Individualcondition from "./Components/Individualinsurance/Individualcondition";
import Individualtnc from "./Components/Individualinsurance/Individualtnc";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { usertoken } = UseUserContext();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="App">
      <div>
        {/* {isLoading ? (
          <div className="body_loader">
            <div class="spinner"></div>
          </div>
        ) : ( */}
        <BrowserRouter>
          <Routes>
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/chasisno" element={<Chasisno />} />
            <Route path="/Carbasicinfo" element={<Carbasicinfo />} />
            <Route path="/Carpolicyinfo" element={<Carpolicyinfo />} />
            <Route path="/Carmodelyear" element={<Carmodelyear />} />
            <Route path="/Carmaker" element={<Carmaker />} />
            <Route path="/Carmodel" element={<Carmodel />} />
            <Route path="/Carvariant" element={<Carvariant />} />
            <Route
              path="/Carregisterlocation"
              element={<Carregisterlocation />}
            />
            <Route path="/Carspecification" element={<Carspecification />} />
            <Route path="/Personaldetails" element={<Personaldetails />} />
            <Route path="/Nationality" element={<Nationality />} />
            <Route path="/Uaedrivingexp" element={<Uaedrivingexp />} />
            <Route path="/Lastclaim" element={<Lastclaim />} />
            <Route path="/Getquote" element={<Getquote />} />
            <Route path="/Quotes" element={<Quotes />} />
            <Route path="/Comparision" element={<Comparision />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Forgetpassword" element={<Forgetpassword />} />
            <Route path="/Vehicledetails" element={<Vehicledetails />} />
            <Route path="/Cancelpolicy" element={<Cancelpolicy />} />
            <Route path="/Selectedquotes" element={<Selectedquotes />} />
            <Route path="/Payments" element={<Payments />} />
            <Route path="/Familydetails" element={<Familydetails />} />
            <Route
              path="/Beneficarydetails"
              element={<Beneficarydetails />}
            />
            <Route
              path="/Termsandcondition"
              element={<Termsandcondition />}
            />
            <Route path="/Yatchdetails" element={<Yatchdetails />} />
            <Route
              path="/Yatchpersonaldetails"
              element={<Yatchpersonaldetails />}
            />
            <Route path="/Enginedetails" element={<Enginedetails />} />
            <Route path="/Suminsured" element={<Suminsured />} />
            <Route
              path="/Territorycoverage"
              element={<Territorycoverage />}
            />
            <Route path="/CancelledPolicies" element={<CancelledPolicies />} />
            <Route path="/SubmitDocument" element={<SubmitDocument />} />
            <Route path="/Claimsexperience" element={<Claimsexperience />} />
            <Route path="/Yatchquotes" element={<Yatchquotes />} />
            <Route path="/Homeinsurance" element={<Homeinsurance />} />
            <Route path="/Homeplan" element={<Homeplan />} />

            <Route path="/Homevalue" element={<Homevalue />} />
            <Route path="/Homehelper" element={<Homehelper />} />

            <Route
              path="/Homepersonaldetails"
              element={<Homepersonaldetails />}
            />
            <Route path="/Homecondition" element={<Homecondition />} />
            <Route path="/Homecondition2" element={<Homecondition2 />} />

            <Route path="/Homequotes" element={<Homequotes />} />
            <Route
              exact
              path="/Homeselectedquotes"
              element={<Homeselectedquotes />}
            />
            <Route exact path="/Homecompare" element={<Homecompare />} />
            <Route
              exact
              path="/Homecomparelist"
              element={<Homecomparelist />}
            />
            <Route
              path="/Homeadditionaldetails"
              element={<Homeadditionaldetails />}
            />
            <Route path="/Homecompare" element={<Homecompare />} />
            <Route path="/HomePayment" element={<HomePayment />} />
            <Route path="/Otherinsurance" element={<Otherinsurance />} />
            <Route
              path="/Otherinsurancesubmit"
              element={<Otherinsurancesubmit />}
            />
            <Route
              path="/Individualinsurancepersonaldetails"
              element={<Individualinsurancepersonaldetails />}
            />
            <Route
              path="/Individualcountry"
              element={<Individualcountry />}
            />
            <Route
              path="/Individualinsuranceids"
              element={<Individualinsuranceids />}
            />
            <Route
              path="/Individualinsurancequotes"
              element={<Individualinsurancequotes />}
            />
            <Route
              path="/Individualinsurancesymptoms"
              element={<Individualinsurancesymptoms />}
            />
            {/* <Route
                path="/Individualinsurancepersonaldetails3"
                element={<Individualinsurancepersonaldetails3 />}
              /> */}
            <Route
              path="/Individualinsurancematernity"
              element={<Individualinsurancematernity />}
            />
            <Route
              path="/Individualinsuranceunderwriting"
              element={<Individualinsuranceunderwriting />}
            />
            {/* <Route
                path="/Individualinsurancepersonaldetails6"
                element={<Individualinsurancepersonaldetails6 />}
              /> */}
            <Route
              path="/Individualinsurancequote"
              element={<Individualinsurancequote />}
            />
            <Route
              path="/Individualpolicy"
              element={<Individualpolicy />}
            />
            {/* <Route
                path="/Individualadditionaldetails"
                element={<Individualadditionaldetails />}
              /> */}
            <Route
              path="/Individualselectedquote"
              element={<Individualselectedquote />}
            />

            <Route
              path="/Individualcompare"
              element={<Individualcompare />}
            />

            <Route
              path="/Individualcondition"
              element={<Individualcondition />}
            />

            <Route
              path="/Individualtnc"
              element={<Individualtnc />}
            />

            <Route
              path="/Individualmetrics"
              element={<Individualmetrics />}
            />

<Route
              path="/Individualthankyou"
              element={<Individualthankyou />}
            />

            <Route
              path="/Individualpayment"
              element={<Individualpayment />}
            />
            <Route path="/ResetPassword/:token" element={<ResetPassword />} />
            <Route path="/emailverify/:token" element={<VerifyEmail />} />
            <Route path="/Traveldetails" element={<Traveldetails />} />
            <Route
              path="/Traveldetailsform"
              element={<Traveldetailsform />}
            />
            <Route
              path="/Travelpersonalform"
              element={<Travelpersonalform />}
            />
            <Route path="/Familydetails" element={<Familydetails />} />
            <Route
              path="/Beneficarydetails"
              element={<Beneficarydetails />}
            />
            <Route path="/Travelquotes" element={<Travelquotes />} />
            <Route
              path="/Travelcomparision"
              element={<Travelcomparision />}
            />
            <Route
              path="/TravelSelectedquotes"
              element={<TravelSelectedquotes />}
            />
            <Route
              path="/TravelComparelist"
              element={<TravelComparelist />}
            />
            <Route
              path="/Termsandcondition"
              element={<Termsandcondition />}
            />
            <Route
              path="/Travelplantype"
              element={<Travelplantype />}
            />
            <Route path="/TravelPayments" element={<TravelPayments />} />
            <Route path="/ThankYou" element={<ThankYou />} />
            {/* Dashboard */}
            <Route
              path="/Mypolicies"
              element={
                usertoken ? <Mypolicies /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="/Myprofile"
              element={
                usertoken ? <Myprofile /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="/Claimlist"
              element={
                usertoken ? <Claimlist /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="/Policiesrenewal"
              element={
                usertoken ? <Policiesrenewal /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="/Pendingpolicies"
              element={
                usertoken ? <Pendingpolicies /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="/Claimform"
              element={
                usertoken ? <Claimform /> : <Navigate replace to="/" />
              }
            />
            <Route path="/SelectCarvalue" element={<SelectCarvalue />} />
            <Route path="/Specialoffer" element={<SpecialOffer />} />
            <Route path="/Privacypolicy" element={<Privacypolicy />} />
            <Route path="/Disclaimer" element={<Disclaimer />} />
            <Route path="/Termsandcond" element={<Termsandcond />} />
            <Route path="/Contactus" element={<Contactus />} />
            <Route path="/Complain" element={<Complain />} />
            <Route path="/Scrolltotop" element={<Scrolltotop />} />
            <Route path="/Claimpolicy" element={<Claimpolicy />} />
            <Route path="/" element={<Home />} />
          </Routes>
          {/* <ChatRoom usertoken={usertoken}/> */}
        </BrowserRouter>
        {/* )} */}
      </div>
    </div>
  );
}

export default App;