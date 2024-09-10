import React from "react";
import { addAddressAPI } from "../../apis/addressAPI";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAddresses } from "../../store";
export default function AddressForm({ closeForm }) {
const currentAddresses = useSelector(state=>state.user.addresses);
const dispatch = useDispatch();

  const handleClose = (e) => {
    e.preventDefault();
    closeForm();
  };

  const addAddress = async (data)=>{
    try{
        await addAddressAPI(data);
        toast.success("New Address Added Successfully!");
        dispatch(setAddresses([...currentAddresses, data]));
        closeForm();
  
      }catch(err){
        console.log(err);
        toast.error(err.message);
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        data[key] = data[key].trim();
      }
    }
    const isValid = Object.values(data).every(value => value !== "");
    if (!isValid) {
      console.error("All fields are required.");
      alert("All fields are required!");
      return; 
    }
    console.log(data); 
    addAddress({...data, country: "India"});
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <form
        className="flex flex-col w-96 gap-4 border-2 shadow-lg p-4 dark:bg-black bg-[#fff] h-[80%] overflow-y-scroll"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl">Add Address</h1>
          <button onClick={handleClose} className="border-2 w-8 text-2xl font-bold">
            &times;
          </button>
        </div>
        <div className="flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            placeholder="Jhon"
            className="border-b-2 focus:outline-none focus:border-b-black bg-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            placeholder="Doe"
            className="border-b-2 focus:outline-none focus:border-b-black bg-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            placeholder="+911234567890"
            className="border-b-2 focus:outline-none focus:border-b-black bg-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address1">Address Line 1</label>
          <input
            type="text"
            id="address1"
            name="address1"
            required
            placeholder="1/4 Pragatinagar Flats, opp. jain derasar"
            className="border-b-2 focus:outline-none focus:border-b-black bg-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address2">Address Line 2</label>
          <input
            type="text"
            id="address2"
            name="address2"
            required
            placeholder="near Jain derasar, Vijaynagar road"
            className="border-b-2 focus:outline-none focus:border-b-black bg-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="province">province</label>
          <input
            type="text"
            id="province"
            name="province"
            required
            placeholder="Punjab"
            className="border-b-2 focus:outline-none focus:border-b-black bg-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="zip">Zip</label>
          <input
            type="text"
            id="zip"
            name="zip"
            required
            placeholder="845101"
            className="border-b-2 focus:outline-none focus:border-b-black bg-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            required
            placeholder="Ludhiana"
            className="border-b-2 focus:outline-none focus:border-b-black bg-transparent"
          />
        </div>
        <button className="border-2 p-2 hover:bg-green-800 hover:text-white" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
