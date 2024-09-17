import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerDefaultAddress } from "../../apis/getAccoutDetailsAPI";
import { deleteAddressAPI } from "../../apis/addressAPI";
import { toast } from "sonner";
import { setDefaultAddressId, setAddresses } from "../../store";
import { Skeleton } from "@mui/material";

export default function AddressCard({
  fullName,
  addressLine,
  phone,
  addressId,
  province,
}) {
  const defaultAddressId = useSelector((state) => state.user.defaultAddressId);
  const customerAccessToken = useSelector((state) => state.user.accessToken);
  const addresses = useSelector((state) => state.user.addresses);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const thisAddressId = addressId?.split("?")[0];
    setIsDefaultAddress(thisAddressId === defaultAddressId);
  }, [defaultAddressId, addressId]);

  const defaultAddressText = "Default Address";
  const makeDefaultText = "Make Default";

  const handleDefaultAddressChange = async () => {
    try {
      setIsLoading(true);
      const thisAddressId = addressId;
      const updatedAddressId = await updateCustomerDefaultAddress(thisAddressId, customerAccessToken); 
      dispatch(setDefaultAddressId(updatedAddressId));
      toast.success("Default Address Changed Successfully!");
    } catch (error) {
      if (error.message.includes("GraphQL error(s)")) {
        toast.error(
          "Something went wrong! Please be kind enough to contact the owner of this site!"
        );
        // We should email this error! 
      } else {
        toast.error(error.message);
        console.log(error.message)
      }
    }finally {
      setIsLoading(false);
    }
  };




  const deleteAddressHandler = async () => {
    try {
      setIsLoading(true);
      let deletedCustomerAddressId = await deleteAddressAPI(
        customerAccessToken,
        addressId
      );
      
      deletedCustomerAddressId = deletedCustomerAddressId.split("?")[0];
      dispatch(
        setAddresses(
          addresses.filter((address) => address.id.split("?")[0] != deletedCustomerAddressId)
        )
      );
      toast.success("Address was deleted successfully!");
    } catch (error) {
      if (error.message.includes("GraphQL error(s)")) {
        toast.error(
          "Something went wrong! Please be kind enough to contact the owner of this site!"
        );
        // We should email this error! 
      } else {
        toast.error(error.message);
      }
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          className="xl:w-[45%] w-full h-auto p-12 dark:bg-white"
        />
      ) : (
        <div
          className={`p-12 xl:w-[45%] w-full ${
            isDefaultAddress ? "bg-[#D8E3B14A]" : "bg-[#F7F7F7]"
          }  dark:bg-black dark:text-[#ffff] dark:border-2 flex flex-col justify-between`}
        >
          <address className="not-italic mb-4 dark:text-[#ffff]">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-lg">{fullName}</h1>

              {isDefaultAddress ? (
                <span className="bg-[#ffff] dark:text-black lg:text-base text-xs rounded-full px-1">
                  {defaultAddressText}
                </span>
              ) : (
                <span className="flex items-center">
                  <input
                    type="radio"
                    name="makeDefaultAddress"
                    id={`default-address-${fullName.replace(/\s+/g, "-")}`}
                    aria-label={makeDefaultText}
                    onChange={handleDefaultAddressChange}
                  />

                  <label
                    htmlFor={`default-address-${fullName.replace(/\s+/g, "-")}`}
                    className="ml-2 lg:text-base text-xs"
                  >
                    {makeDefaultText}
                  </label>
                </span>
              )}
            </div>
            <p className="text-base text-[#7A7A7A]">{phone}</p>
            <p className="text-base mt-2">{addressLine}</p>
            <br />
            <p>{province}</p>
          </address>
          <div className="flex gap-2">
            <button className="border-r-2 pr-2" onClick={deleteAddressHandler}>
              Remove
            </button>
            <button>Edit</button>
          </div>
        </div>
      )}
    </>
  );
}
