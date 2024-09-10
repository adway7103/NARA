import PersonalInfoCard from "./PersonalInfoCard";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store";
import { useEffect } from "react";
import getAccountDetailsAPI from "../../apis/getAccoutDetailsAPI";
export default function PersonalInfoSection() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const fullName = useSelector(state=>state.user.fullName);
    const email = useSelector(state=>state.user.email);
    const phone = useSelector(state=>state.user.phone);
  
    const fetchAccountDetails = async () => {
      try {
        const customer = await getAccountDetailsAPI();
        const customerName = customer.firstName + " " + customer.lastName;
        const customerEmail = customer.email;
        const customerPhone = customer.phone;
        dispatch(setUser({ id: customer.id, fullName: customerName, email: customerEmail, phone: customerPhone }));
      } catch (error) {
        console.error("could not fetch account details: " + error.message);
      }
    };
  
    useEffect(() => {
      fetchAccountDetails();
    }, []);
  
    return (
      <div className=" mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:border-b-2 border-gray-300 my-4 pb-6 pt-2">
          <PersonalInfoCard title="Your Name" value={fullName} type="name" />
          <PersonalInfoCard title="Email Address" value={email} type="email" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2  gap-12 xl:border-b-2 border-gray-300 my-4 pb-6 pt-2">
          <PersonalInfoCard title="Phone Number" value={phone} type="phone"/>
          <PersonalInfoCard title="Password" value="********" type="password" />
        </div>
      </div>
    );
  }