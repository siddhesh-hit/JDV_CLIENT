import { createSlice } from "@reduxjs/toolkit";

// Define initial state
export const searchValue = (property_name, property_value, array) => {
  try {
    let new_data;
    for (let i = 0; i < array.length; i++) {
      if (array[i][property_name] === property_value) {
        new_data = array[i];
      }
    }
    return { questions: new_data.questions, year: new_data.year };
  } catch (error) {
    return null;
  }
};
const date = new Date();
let month = date.getMonth();
let currentyear = date.getFullYear();
if (month >= 5) {
  currentyear = currentyear + 1;
}

const initialState = {
  line_of_business: "Motor",
  insuranceType: "Motor",
  finall_submit: false,
  ValidYear: false,
  your_electric_car: false,
  buying_used_car: true,
  car_brand_new: true,
  polcy_type: null,
  policy_id: null,
  last_year_policy_type: null,
  model_year: currentyear.toString(),
  car_maker: null,
  car_model: null,
  car_variant: null,
  leadid: null,
  policy_issued_date: null,
  BankName: null,
  register_area: null,
  registration_year: currentyear.toString(),
  vehicle_specification: "GCC",
  name: null,
  phoneno: null,
  date_of_birth: null,
  email: null,
  nationality: null,
  drivingexp: null,
  drivingexpinuae: null,
  last_year_claim: 0,
  comparelist: [],
  allplans: [],
  nature_of_plan_id: null,
  company_id: null,
  instanpolicy: null,
  show_more_last_year_claim_length: null,
  claims_certificate_from_issurer: 0,
  show_more_claims_certificate_from_issurer_length: null,
  repaire_type_name: null,
  your_existing_policy_expired: true,
  current_insurance_company_id: "",
  current_renewal: "",
  minCarValue: null,
  maxCarValue: null,
  loading: false,
  error: false,
  uaedrivingquestion: null,
  uaedrivingyear: 6,
  homedrivingquestion: null,
  homedrivingyear: 6,
  last_year_claim_question: null,
  last_year_claim_year: 6,
  last_year_claim_certificate_question: null,
  last_year_claim_certificate_year: 6,
  business_type: "",
  aslider_value: null,
  uaedrivingquestion_id: "64e4816d6e70d6da7ded3155",
  last_year_claim_question_id: "64e482066e70d6da7ded3157",
  last_year_claim_certificate_question_id: "64e4821a6e70d6da7ded3159",
  homedrivingquestion_id: "64e4a6f3b1ffcddeb32e3a85",
};
const storedData = JSON.parse(localStorage.getItem("MotoformData"));
const mergedInitialState = { ...initialState, ...storedData };
const SetDataToLocaleStorage = (state) => {
  localStorage.setItem("MotoformData", JSON.stringify({ ...state }));
};

export const MotoformData = createSlice({
  name: "MotoformData",
  initialState: mergedInitialState,
  reducers: {
    AddMotoformData: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
      SetDataToLocaleStorage(state);
    },
    AddMotoformFilterData: (state, action) => {
      if (action.payload.updatedFormData) {
        state = {
          ...state,
          ...action.payload.updatedFormData,
        };
      }
      SetDataToLocaleStorage(state);
      return state;
    },
    AddAllMotoformData: (state, action) => {
      if (action.payload) {
        state = {
          ...state,
          allplans: action.payload,
        };
      }
      SetDataToLocaleStorage(state);
      return state;
      // state[name] = value;
    },
    AddFilteredMotoformData: (state, action) => {
      if (action.payload) {
        state = {
          ...state,
          filteredata: action.payload,
        };
      }
      SetDataToLocaleStorage(state);
      return state;
      // state[name] = value;
    },
    AddToComapre: (state, action) => {
      const data = action.payload.data;

      // Check if the data already exists in state.comparelist or state.allplans
      const existsInCompareList = state.comparelist.some(
        (item) => data?._id === item?._id
      );
      if (existsInCompareList) {
        SetDataToLocaleStorage(state);
        return state; // If the data already exists, do not add it again
      } else {
        state.comparelist.push(data);
        // Remove the item from allplans if it exists
        const indexInAllPlans = state.allplans.findIndex(
          (item) => data?._id === item?._id
        );
        if (indexInAllPlans !== -1) {
          state.allplans.splice(indexInAllPlans, 1);
        }
        SetDataToLocaleStorage(state);
        return state;
      }
    },
    DeleteFromComapre: (state, action) => {
      const data = action.payload.data;
      console.log({ data: data });
      // Find the index of the item in state.comparelist
      const indexInCompareList = state.comparelist.findIndex(
        (item) => data?._id === item?._id
      );
      console.log({ indexInCompareList });
      if (indexInCompareList !== -1) {
        const itemToRemove = state.comparelist.splice(indexInCompareList, 1)[0];
        // Add the item back to allplans
        state.allplans.push(itemToRemove);
      }

      SetDataToLocaleStorage(state);
      return state;
    },
    DeleteAllFromComapre: (state) => {
      state.comparelist = [];
      state.allplans = [];
      SetDataToLocaleStorage(state);
      return state;
    },
    AddAllPlans: (state, action) => {
      state.comparelist = [];
      state.allplans = action.payload;
      SetDataToLocaleStorage(state);
      return state;
    },
    fetchDrivingExperience(state, action) {
      state.loading = true;
    },
    fetchDrivingExperienceSuccess(state, action) {
      state.loading = false;
      state.error = false;
      // set all
      // set all questions and answers
      if (action.payload.length > 0) {
        // Set UAE Driving questions
        const Uaedrivingexpr = searchValue(
          "_id",
          state.uaedrivingquestion_id,
          action.payload
        );
        if (Uaedrivingexpr) {
          state.uaedrivingquestion = Uaedrivingexpr.questions;
          state.uaedrivingyear = Uaedrivingexpr.year + 1;
        }
        // Set Home Driving questions
        const Homedrivingexpr = searchValue(
          "_id",
          state.homedrivingquestion_id,
          action.payload
        );
        if (Homedrivingexpr) {
          state.homedrivingquestion = Homedrivingexpr.questions;
          state.homedrivingyear = Homedrivingexpr.year + 1;
        }
        // Set Last Year  questions
        const last_year_claim = searchValue(
          "_id",
          state.last_year_claim_certificate_question_id,
          action.payload
        );
        if (last_year_claim) {
          state.last_year_claim_question = last_year_claim.questions;
          state.last_year_claim_year = last_year_claim.year + 1;
        }
        const last_year_claim_certificate = searchValue(
          "_id",
          state.last_year_claim_certificate_question_id,
          action.payload
        );
        if (last_year_claim_certificate) {
          state.last_year_claim_certificate_question =
            last_year_claim_certificate.questions;
          state.last_year_claim_certificate_year =
            last_year_claim_certificate.year + 1;
        }
        SetDataToLocaleStorage(state);
        return state;
      }
    },
    fetchDrivingExperienceError(state) {
      state.loading = false;
      state.error = true;
      SetDataToLocaleStorage(state);
      return state;
    },
    AddSelectedPlans: (state, action) => {
      state.selectedplans = action.payload;
      SetDataToLocaleStorage(state);
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  AddToComapre,
  AddSelectedPlans,
  DeleteFromComapre,
  DeleteAllFromComapre,
  AddMotoformData,
  AddFilteredMotoformData,
  AddMotoformFilterData,
  AddAllPlans,
  AddAllMotoformData,
  fetchDrivingExperience,
  fetchDrivingExperienceSuccess,
  fetchDrivingExperienceError,
} = MotoformData.actions;

export default MotoformData.reducer;