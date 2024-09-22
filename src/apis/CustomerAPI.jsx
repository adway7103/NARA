import api from "../utils/interceptors"; 
export async function SendRecoveryEmailAPI(email){
 
    const query = `mutation recoverCustomerAccount($email: String!) {
  customerRecover(email: $email) {
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

try {
    const response = await api.post("", {
      query,
      variables: {email},
    });

    console.log("logging response: ", response);

    if (response?.data?.errors) {
      throw new Error("Could not send recovery email: " + response.data.errors[0].message);
    } else if (
      response?.data?.customerRecover?.customerUserErrors[0]
    ) {
      throw new Error(
        "Login failed: " +
        response.data.customerRecover.customerUserErrors[0]
            .message
      );
    } else {
      
      return true;
    }
  } catch (error) {
    console.error("Account recovery error:", error);
    throw error;
  }
}


/* 
{
    "data": {
        "customerRecover": null
    },
    "errors": [
        {
            "message": "Resetting password limit exceeded. Please try again later.",
            "path": [
                "customerRecover"
            ],
            "locations": []
        }
    ]
}
*/

/* 
{
    "data": {
        "customerRecover": {
            "customerUserErrors": [
                {
                    "code": "UNIDENTIFIED_CUSTOMER",
                    "field": [
                        "email"
                    ],
                    "message": "Could not find customer"
                }
            ]
        }
    }
}
*/