import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Travelbanner from "../Banner/Travelbanner";
import Insurancedetails from "../Common/Insurancedetails";
import { Link } from "react-router-dom";
import { Form, InputGroup, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseMotorContext } from "../../MultiStepContextApi";
import swal from "sweetalert";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function Familydetails() {
  const navigate = useNavigate();
  const { travelsFormsData, settravelsFormsData } = UseMotorContext();
  const [todos, setTodos] = useState([{ name: "", email: "", date: "" }]);
  const Progress = 70;
  const handleTodoChange = (e, i) => {
    // console.log(e.target.name, i);
    const field = e.target.name;
    const newTodos = [...todos];
    newTodos[i][field] = e.target.value;
    setTodos(newTodos);
  };

  const handleAddTodo = () => {
    setTodos([...todos, { name: "", email: "", date: "" }]);
  };

  const handleDeleteTodo = (i) => {
    const newTodos = [...todos];
    newTodos.splice(i, 1);
    setTodos(newTodos);
  };
  const handleNextButtonClick = (event) => {
    const invalidEntries = todos.filter(
      (element) =>
        element.name === "" ||
        // element.email === '' ||
        !element.email.includes("@") ||
        !element.email.includes(".") ||
        element.date === ""
    );

    if (invalidEntries.length > 0) {
      swal("Please fill all fields correctly.", "", "warning");
      return;
    } else {
      event.preventDefault();
      settravelsFormsData((prevData) => ({
        ...prevData,
        family_details: todos,
      }));

      localStorage.setItem(
        "travelsFormsData",
        JSON.stringify({ ...travelsFormsData, family_details: todos })
      );
      console.log(todos);
      sendFamilyDetailsToServer();
    }
  };

  const email = travelsFormsData.email;
  const insuranceType = travelsFormsData.line_of_business;

  const sendFamilyDetailsToServer = async () => {
    // Prepare the data to be sent to the server
    const familyDetails = todos.map((element) => ({
      Name: element.name,
      email: element.email,
      date: element.date,
    }));

    console.log("POST API request data:", familyDetails);

    // Make the POST API request to send the family details to the server
    await fetch("https://lmpapi.handsintechnology.in/api/fillInsurancePlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        insuranceType: insuranceType,
        email: email,
        travel_family_details: familyDetails,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        if (result.status == 200) {
          swal("Success", "Family Details Added Successfully", "success");
          navigate("/Beneficarydetails");
        } else {
          swal("Error", "Error in Adding Family Details", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("travelsFormsData"));
    if (data.family_details.length > 0) {
      setTodos(data.family_details);
    }
  }, []);

  return (
    <div>
      <Header />
      <Travelbanner />
      <div className="container-fluid car_info pt-4 pb-4">
        <div className="container">
          <ProgressBar now={Progress} label={`${Progress}%`} visuallyHidden />
          <div className="row" style={{ justifyContent: "center" }}>
            <div className="col-lg-12 nopadding">
              <div className="row form_abcd">
                <div className="col-lg-11 col-md-12 col-sm-12 col-xs-12 mb-2">
                  <ul style={{ paddingLeft: "0px" }}>
                    <li style={{ listStyle: "none" }}>
                      Please fill your family details :
                    </li>
                  </ul>
                </div>
                <form onSubmit={handleNextButtonClick}>
                  {todos.map((todo, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={todo.name}
                        onChange={(e) => handleTodoChange(e, index)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="email"
                        name="email"
                        value={todo.email}
                        onChange={(e) => handleTodoChange(e, index)}
                        required
                      />
                      <input
                        type="date"
                        placeholder="date"
                        name="date"
                        value={todo.date}
                        onChange={(e) => handleTodoChange(e, index)}
                        required
                      />
                      {todos.length > 1 && (
                        <button onClick={() => handleDeleteTodo(index)}>
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={handleAddTodo}>Add Todo</button>
                </form>
                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3">
                  <Link to="/Travelpersonalform" className="buttonactions">
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    Back
                  </Link>
                </div>
                <div
                  className="col-lg-5 col-md-12 col-sm-12 col-xs-12 buttons mt-3 mb-3"
                  style={{ textAlign: "right" }}
                >
                  <button
                    className="button_next"
                    onClick={handleNextButtonClick}
                  >
                    Next
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Insurancedetails />
      <Footer />
    </div>
  );
}

export default Familydetails;
