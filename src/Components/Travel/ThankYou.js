import React, { useEffect, useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import "../../thankyou.css"
import thankyou from "../../Image/thankyou.svg"
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';
const ThankYou = () => {
   const [Message, setMessage] = useState("")
   const [Error, setError] = useState(false)
   const navigate=useNavigate()

   const id = JSON.parse(localStorage.getItem("leaddetails")); 

   useEffect(() => {
    handlePaymentstatus();
    }, [])


   const handlePaymentstatus = async() => {

    const requestOptions = {
        method: 'Put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            paymentStatus : "Completed",
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
    
}
  
  
  return (
    <>
    <Header/>
    <section className="login-main-wrapper">
    <div className="main-container">
      <div className="login-process">
        <div className="login-main-container">
          <div className="thankyou-wrapper">
            <h1>
             {Error ?(<span>something went wrong</span>):(
               <img
               src={thankyou}
               alt="thanks"
             />
             )}
            </h1>
            <p>{Message}</p>
            <p className='abcds123456'>To view policy click on the below button</p>
            <Link  className="gotodashboard"to={"/"}>Back to Home</Link>
            <div className="clr" />
          </div>
          <div className="clr" />
        </div>
      </div>
      <div className="clr" />
    </div>
  </section>
  <Footer/>
    </>
 
  
  )
}

export default ThankYou
