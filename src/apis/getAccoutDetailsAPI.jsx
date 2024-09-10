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
