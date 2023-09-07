import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./thankyou.css";
import thankyou from "../../Image/thankyou.svg";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import admin from "../../config";
import Individualdocument from "./Individualdocument";

const Individualthankyou = () => {
  const [Message, setMessage] = useState("");
  const [Error, setError] = useState(false);
  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const ciphertext = searchParams.get("status");
      // console.log(ciphertext);
      let id = searchParams.get("id");
      let plan_id = searchParams.get("plan_id");
      let plan_company_id = searchParams.get("plan_company_id");
      let final_price = searchParams.get("final_price");
      final_price = final_price == "null" ? null : final_price;

      if (ciphertext == "Pending") {
        UpdatePolicy(id, plan_company_id, plan_id, final_price, ciphertext);
      } else if (ciphertext == "Cancelled") {
        UpdatePolicy(id, plan_company_id, plan_id, final_price, ciphertext);
      } else if (ciphertext == "Completed") {
        UpdatePolicy(id, plan_company_id, plan_id, final_price, ciphertext);
      }
    })();
  }, []);

  const UpdatePolicy = async (
    id,
    plan_company_id,
    plan_id,
    final_price,
    ciphertext
  ) => {
    try {
      axios
        .put(`${admin}/updatePolicyDetails?id=${id}`, {
          plan_company_id,
          plan_id,
          final_price,
          paymentStatus: ciphertext,
        })
        .then((res) => {
          console.log({ res });
          if (res.status === 200) {
            setMessage(res.data?.message);
          } else if (res.status === 400) {
            setError(true);
            setMessage(res.data?.message);
          }
        })
        .catch((error) => {
          console.log({ error });
          setError(true);
          setMessage(
            error?.response.data?.message
              ? error?.response.data?.message
              : "Your Policy Is Not Activate"
          );
        });
    } catch (error) {
      console.error("Error decrypting data:", error.message);
      swal({
        title: `Error`,
        text: "Your Policy has been activated successfully",
        icon: "error",
      });
    }
  };

  return (
    <>
      <Header />
      <section className="login-main-wrapper">
        <div className="main-container">
          <div className="login-process">
            <div className="login-main-container">
              <div className="thankyou-wrapper">
                <h1>
                  {Error ? (
                    <span>something went wrong</span>
                  ) : (
                    <img src={thankyou} alt="thanks" />
                  )}
                </h1>
                <p>{Message}</p>

                <p className="abcds123456 text-danger">Upload your documents</p>
                <Individualdocument />
                <div className="clr" />
              </div>
              <div className="clr" />
            </div>
          </div>
          <div className="clr" />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Individualthankyou;
