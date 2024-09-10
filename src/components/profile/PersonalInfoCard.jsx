import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setFullName, setPhone } from "../../store";
import updateCustomerAPI from "../../apis/update/updateCustomerAPI";
import { toast } from "sonner";

import edit_pen_icon from "../../assets/icons/edit_pen_icon.svg";

export default function PersonalInfoCard({ title, value, type }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const updateCustomer = async (field, payload, successMessage, action) => {
    try {
      await updateCustomerAPI(field, { ...payload, userId });
      if (action) dispatch(action(payload));
      toast.success(successMessage);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleUpdate = () => {
    setIsEditing(false);
    const value = inputRef.current.value;

    switch (type) {
      case "name": {
        const nameArray = value.split(" ");
        const firstName = nameArray[0];
        const lastName = nameArray[nameArray.length - 1];
        return updateCustomer(
          "fullName",
          { firstName, lastName },
          "Name Updated Successfully!",
          setFullName
        );
      }
      case "email": {
        return updateCustomer(
          "email",
          { email: value },
          "Email Updated Successfully!",
          setEmail
        );
      }
      case "phone": {
        return updateCustomer(
          "phone",
          { phone: value },
          "Phone Updated Successfully!",
          setPhone
        );
      }
      case "password": {
        return updateCustomer(
          "password",
          { password: value },
          "Password Updated Successfully!"
        );
      }
      default:
        return;
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div className="border-r-2 border-gray-300 pr-4 flex justify-between items-center">
      <div>
        <h2 className="text-[#807D7E]">{title}</h2>
        {isEditing ? (
          <input
            ref={inputRef}
            type={type === "password" ? "password" : "text"}
            defaultValue={value}
            className="xl:text-lg text-md font-bold focus:outline-none"
            onBlur={handleUpdate}
          />
        ) : (
          <h1 className="xl:text-lg text-md font-bold">{value}</h1>
        )}
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="border-2 dark:bg-white border-[#B5B5B5] p-2 hover:border-black"
      >
        <img src={edit_pen_icon}  alt="Edit" />
      </button>
    </div>
  );
}
