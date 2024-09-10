
import { configureStore, createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    fullName: null,
    email: null,
    phone: null,
    addresses: [],
  },
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id; 
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    setFullName(state, action){
        state.fullName = action.payload.firstName+ " " + action.payload.lastName;
    },
    setEmail(state, action){
        state.email = action.payload.email;
    },
    setPhone(state, action){
        state.phone = action.payload.phone;
    },
    setAddresses(state, action){
        state.addresses = action.payload;
    }
  },
});


const store = configureStore({
  reducer: {
    user: userSlice.reducer, 
  },
});


export const { setUser, setFullName, setEmail, setPhone, setAddresses } = userSlice.actions;
export default store;
