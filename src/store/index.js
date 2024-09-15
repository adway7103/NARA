
import { configureStore, createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: null,
    isAuthenticated: null,
    id: null,
    fullName: null,
    email: null,
    phone: null,
    addresses: [],
    defaultAddressId:null,
    areAddressesLoading: false,
    defaultAddress: null,
  },
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id; 
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.defaultAddressId = action.payload.defaultAddressId;
      state.defaultAddress = action.payload.defaultAddress;
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
        state.areAddressesLoading = false;
    },
    setAreAddressesLoading(state, action){
      state.areAddressesLoading = action.payload;
    },
    setAuthStatus(state, action){
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setDefaultAddressId(state, action){
      state.defaultAddressId = action.payload;
    },
    setDefaultAddress(state, action){
      state.defaultAddress = action.payload;
    }
  },
});


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    id: null,
    checkoutUrl: null,
  },
  reducers: {
    setActiveCart(state, action){
      state.id = action.payload.id;
      state.checkoutUrl = action.payload.checkoutUrl;
    }
  }

})


const activeProductSlice = createSlice({
  name: "activeProduct",
  initialState: {
    currentVariant: null,
    outOfStock: false,
  },
  reducers:{
    setCurrentVariant(state, action){
      state.currentVariant = action.payload;
    },
    setOutOfStock(state, action){
      state.outOfStock = action.payload
    }
  }

})



const store = configureStore({
  reducer: {
    user: userSlice.reducer, 
    activeProduct: activeProductSlice.reducer,
    cart: cartSlice.reducer
  },
});



export const { setUser, setFullName, setEmail, setPhone, setAddresses, setAuthStatus, setDefaultAddressId, setDefaultAddress, setAreAddressesLoading } = userSlice.actions;
export const {setCurrentVariant, setOutOfStock} = activeProductSlice.actions;
export const {setActiveCart} = cartSlice.actions;
export default store;
