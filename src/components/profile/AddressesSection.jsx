import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAddresses } from "../../store";
import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";
import { getAddressesAPI } from "../../apis/addressAPI";

export default function AddressesSection() {
    const userAddresses = useSelector((state) => state.user.addresses);
    const dispatch = useDispatch();
    const [addressFormOpen, setAddressFormOpen] = useState(false);
  
  
    const openAddressForm = () => {
      setAddressFormOpen(true);
    };
    const closeAddressForm = () => {
      setAddressFormOpen(false);
    };
  
    const getAddresses = async () => {
      try {
        const addresses = await getAddressesAPI();
        dispatch(setAddresses(addresses));
        console.log(addresses);
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getAddresses();
    }, []);
  
    return (
      <>
        <div className="flex justify-between my-2">
          <h2 className="font-bold text-xl">Address</h2>
          <button
            onClick={openAddressForm}
            className="active:bg-gray-100 border-2 px-2 py-1"
          >
            Add New Address
          </button>
          {addressFormOpen && <AddressForm closeForm={closeAddressForm} />}
        </div>
  
        <div className="p-2 flex flex-wrap box-border justify-between gap-2">
          {userAddresses.map((address) => (
            <AddressCard
              key={address.id}
              fullName={address.firstName + " " + address.lastName}
              addressLine={address.address1 + address.address2}
              phone={address.phone}
            />
          ))}
        </div>
      </>
    );
  }