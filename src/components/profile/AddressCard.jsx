
export default function AddressCard({ fullName, addressLine, phone, isDefaultAddress }) {

  const defaultAddressText = "Default Address";
  const makeDefaultText = "Make Default";

  return (
    <div className="p-12 xl:w-[45%] w-full bg-gray-100 dark:bg-black dark:text-[#ffff] dark:border-2 flex flex-col justify-between">
      <address className="not-italic mb-4 dark:text-[#ffff]">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">{fullName}</h1>
          {isDefaultAddress ? (
            <span className="bg-white rounded-full px-1">{defaultAddressText}</span>
          ) : (
            <span className="flex items-center">
              <input 
                type="radio" 
                name="makeDefaultAddress" 
                id={`default-address-${fullName.replace(/\s+/g, '-')}`}
                aria-label={makeDefaultText}
              />
              <label htmlFor={`default-address-${fullName.replace(/\s+/g, '-')}`} className="ml-2">
                {makeDefaultText}
              </label>
            </span>
          )}
        </div>
        <p className="text-base">{phone}</p>
        <p className="text-base mt-2">{addressLine}</p>
      </address>

      <div className="flex gap-2">
        <button className="border-r-2 pr-2">Remove</button>
        <button>Edit</button>
      </div>
    </div>
  );
}
