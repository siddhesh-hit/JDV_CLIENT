import { createSlice } from '@reduxjs/toolkit'
// Define initial state
const date = new Date();
const currentyear = date.getFullYear();
const currentMonth = date.getMonth();

const initialState = {
  line_of_business: "Motor",
  insuranceType: "Motor",
  finall_submit: false,
  ValidYear: false,
  your_electric_car: false,
  buying_used_car: true,
  car_brand_new: false,
  polcy_type: null,
  last_year_policy_type: null,
  model_year: currentMonth > 5 ? (currentyear + 1).toString() : currentyear.toString(),
  car_maker: null,
  car_model: null,
  car_variant: null,
  register_area: "Abu Dabi",
  registration_year: currentyear.toString(),
  vehicle_specification: "GCC",
  name: null,
  phoneno: null,
  date_of_birth: null,
  email: null,
  nationality: "India",
  drivingexp: null,
  drivingexpinuae: null,
  last_year_claim: 0,
  claims_certificate_from_issurer: "",
  repaire_type_name: "",
  your_existing_policy_expired: true,
  comparelist:[],
  nature_of_plan_id: null,
  company_id: null,
  instanpolicy:null
};
// Retrieve data from localStorage only during store initialization
const storedData = localStorage.getItem('MotoformData');
const parsedStoredData = storedData ? JSON.parse(storedData) : {};
const mergedInitialState = { ...initialState, ...parsedStoredData };
export const MotoformData = createSlice({
    name: 'MotoformData',
    initialState:mergedInitialState,
    reducers: {
      AddMotoformData: (state, action) => {
        const { name, value } = action.payload;
        state[name] = value;
        localStorage.setItem('MotoformData', JSON.stringify(state));
      },
      AddToComapre: (state, action) => {
        const data=action.payload.data
        console.log({data})
        if(state["comparelist"].length >0) {
          let compareData= state.comparelist
         console.log({compareData})
          const existcomparelist=compareData.find((item)=>data._id===item._id)
          if(existcomparelist){
            // alert("already exist")
          return ;
          }else{
            state.comparelist.push(data)
            localStorage.setItem('MotoformData',JSON.stringify(state))
          }
      }else{
        state.comparelist.push(data)
        localStorage.setItem('MotoformData',JSON.stringify(state))
      }
      },
      DeleteFromComapre: (state, action) => {
          let compareData= state.comparelist
          const existcomparelistindex=compareData.findIndex((item)=>action.payload.id===item._id)
          console.log("indexnumber",existcomparelistindex)
            compareData.splice(existcomparelistindex, 1)
             console.log("compareData Delete",compareData)
               console.log("save",state.comparelist)
               localStorage.setItem('MotoformData',JSON.stringify(state))
      
      },
      DeleteAllFromComapre: (state) => {
        state.comparelist = [];
        localStorage.setItem('MotoformData',JSON.stringify(state))
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { AddToComapre,DeleteFromComapre,DeleteAllFromComapre,AddMotoformData} = MotoformData.actions

  export default MotoformData.reducer
