import React from "react";
import api from "../utils/interceptors"; // Assuming this imports the API client
import axios from "axios";
async function SignupApi(userData) {
  const { name, phone, email, password } = userData; // Destructure user data
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const mutation = `
   mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      firstName
      lastName
      email
      phone
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}
  `;

  const variables = {
    input: {
      firstName,
      lastName, // Assuming same last name
      email,
      password,
      phone: phone.replace(/\s/g, ""), // Use actual phone number
    },
  };

  try {
    console.log(phone.replace(/\s/g, ""));
    const response = await api.post("", {
      query: mutation,
      variables,
    });

    if (response.data.errors) {
      // Handle API errors (specific details based on your API)
      throw new Error("Signup failed: " + response.data.errors[0].message);
    } else {
      return response.data; // Return data if successful
    }
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

export default SignupApi;
