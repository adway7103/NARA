import api from "../utils/interceptors"; 

export default async function getAccountDetailsAPI() {
  const customerAccessToken = localStorage.getItem("accessToken");
  const query = `
    query getCustomerDetails($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
        defaultAddress{
        id
        }
        orders(first: 3) {
          edges {
            node {
              orderNumber
            }
          }
        }
      }
    }
  `;

  const variables = { customerAccessToken };

  try {
    const response = await api.post("", {
      query,
      variables,
    });

    if (response.data.errors) {
      const errorMessages = response.data.errors.map(error => error.message).join(", ");
      throw new Error(`GraphQL error(s): ${errorMessages}`);
    }

    const customerData = response.data.data?.customer;
    if (!customerData) {
      throw new Error("No customer data found");
    }

    return customerData;
  } catch (error) {
    console.error("Could not fetch account details:", error.message);
    throw error; 
  }
}



export async function updateCustomerDefaultAddress(addressId) {
  // const addressId = "gid://shopify/MailingAddress/9376829997311?model_name=CustomerAddress&customer_access_token=fxxGDlb4FljgEpa8iEplc4Jo6rKv9LKW76Wkb6P7HlXxmb9IHQr1P6QmYgPXd02veFntGiRa0uqRLHcOSm0MX1dvyOfK9-0hdDod3tkrvslb9j83xxmsxqSbvF_7t2keftYAoNAyKBqcuMv1358jsAUHhxQ0s4LG2dai9B1fi6rdT9JFgGhhnSJ_Bp3-7mk-Y1-EYhDiX7dtgSBYs6qT_yUCX6HCD3g3w2bRSHfokunz3Ky_dQ1OzNdgulHvBgHt"

  const customerAccessToken = localStorage.getItem("accessToken");

  const query = `
    mutation customerDefaultAddressUpdate($addressId: ID!, $customerAccessToken: String!) {
      customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
        
        customerUserErrors {
          field
          message
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = { addressId, customerAccessToken };

  try {
    const response = await api.post("", {
      query,
      variables,
    });

    if (response.data.errors) {
      const errorMessages = response.data.errors.map(error => error.message).join(", ");
      throw new Error(`GraphQL error(s): ${errorMessages}`);
    }
    
    const returnedData = response.data.data?.customerDefaultAddressUpdate;
    const customerUserErrors = returnedData?.customerUserErrors;
    const userErrors = returnedData?.userErrors;

    const wasUpdateSuccess = customerUserErrors.length===0 && userErrors.length===0;
    
    if (!wasUpdateSuccess) {
      throw new Error({userErrors, customerUserErrors});
    }

    return wasUpdateSuccess;
  } catch (error) {
    console.error("Could not update default address:", error.message);
    throw error; 
  }
}



