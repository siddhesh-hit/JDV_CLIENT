import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MotorContextAppProvider } from './MultiStepContextApi';
import { UserContextAppProvider } from './UserContextAppProvider';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import axios from 'axios';
const root = ReactDOM.createRoot(document.getElementById('root'));
if(localStorage.getItem("usertoken")){
  // axios.defaults.headers.common["Authorization"]="Bearer "+"eyJhbGcuOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2EyZjIxNTk3NzgwZjdjNWM2ZTJhMCIsImlhdCI6MTY5MDk4MDY5OX0.ELyRLN8yvArfnAomj1tCu1gaCKJO-aDV7sPKAfdXUG0"
  axios.defaults.headers.common["Authorization"]="Bearer "+localStorage.getItem("usertoken")
}
root.render(
  <React.StrictMode>
   <Provider store={store}>
    <UserContextAppProvider>
    <MotorContextAppProvider>
    <App />
    </MotorContextAppProvider>
    </UserContextAppProvider>
   </Provider>
  </React.StrictMode>
);

reportWebVitals();
export const API_URL="https://lmpapi.handsintechnology.in" 
// export const API_URL="https://lmpapi.handsintechnology.in"
const  hostname =
    window.location.hostname === "localhost"
      ? window.location.hostname + ":3000"
      : window.location.hostname;
export const  forntendurl = window.location.protocol + "//" + hostname;
