import api from "../utils/interceptors";

export async function getCheckoutURL() {
  const query = `
    query checkoutURL {
    cart(id: "gid://shopify/Cart/Z2NwLWFzaWEtc291dGhlYXN0MTowMUo3TkQ3Vk4wOUoyMlQzRTBZSEU4TTdDOQ?key=ecc2451247718d0aa6c3daad592104d7") {
    checkoutUrl
  }
}`;

  try {
    const response = await api.post("", {
      query,
    });

    if (response.data.errors) {
      const errorMessages = response.data.errors
        .map((error) => error.message)
        .join(", ");
      throw new Error(`GraphQL error(s): ${errorMessages}`);
    }

    const url = response.data;
    if (!url) {
      throw new Error("No customer data found");
    }

    return url;
  } catch (error) {
    console.error("Could not fetch account details:", error.message);
    throw error;
  }
}

export async function updateBuyersIndentity() {
  const query = `mutation updateCartBuyerIdentity($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!) {
  cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
    cart {
      id
      buyerIdentity {
        email
        phone
        deliveryAddressPreferences {
          ... on MailingAddress {
            address1
            city
            country
            firstName
            lastName
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}

`;

  const variables = {
    buyerIdentity: {
      countryCode: "CA",
      deliveryAddressPreferences: [
        {
          deliveryAddress: {
            address1: "123 Fake St.",
            city: "Bagaha",
            country: "India",
            firstName: "Alice",
            lastName: "Bob",
            province: "BIHAR",
            zip: "845101",
          },
        },
      ],
      email: "example-email@shopify.com",
    },
    cartId:
      "gid://shopify/Cart/Z2NwLWFzaWEtc291dGhlYXN0MTowMUo3TkRSRUVQUlFZRFNGRDFIRUdaWTFIVw?key=6759ee7ff43d13cd750fd6f6adaee088",
  };

  try {
    const response = await api.post("", {
      query,
      variables,
    });

    if (response.data.errors) {
      const errorMessages = response.data.errors
        .map((error) => error.message)
        .join(", ");
      throw new Error(`GraphQL error(s): ${errorMessages}`);
    }

    const cart = response.data;
    if (!cart) {
      throw new Error("No customer data found");
    }

    return cart;
  } catch (error) {
    console.error("Could not fetch account details:", error.message);
    throw error;
  }
}

export default async function createCart(itemId) {
  const query = `mutation createCart($cartInput: CartInput) {
  cartCreate(input: $cartInput) {
    cart {
      id
      createdAt
      updatedAt
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
`;

  const variables = {
    cartInput: {
      lines: [
        {
          quantity: 1,
          merchandiseId: itemId,
        },
      ],
    },
  };

  try {
    const response = await api.post("", {
      query,
      variables,
    });

    if (response.data.errors) {
      const errorMessages = response.data.errors
        .map((error) => error.message)
        .join(", ");
      throw new Error(`GraphQL error(s): ${errorMessages}`);
    }

    const cart = response.data;
    if (!cart) {
      throw new Error("Could not create cart! Try again later!");
    }

    return cart;
  } catch (error) {
    console.error("Could not create cart:", error.message);
    throw error;
  }
}

export async function getItemsInCart(cartId) {
  const query = `query cartQuery($cartId: ID!) {
  cart(id: $cartId) {
    id
    createdAt
    updatedAt
    checkoutUrl
    totalQuantity
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              image{
                src
              }
              selectedOptions{
                name
                value
              }
              product {
                title
              }
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      email
      phone
      customer {
        id
      }
      countryCode
    }
  }
}`;

  const variables = {
    cartId: cartId,
  };

  try {
    const response = await api.post("", {
      query,
      variables,
    });

    if (response.data.errors) {
      const errorMessages = response.data.errors
        .map((error) => error.message)
        .join(", ");
      throw new Error(`GraphQL error(s): ${errorMessages}`);
    }

    const cart = response.data;
    if (!cart) {
      throw new Error(
        "Could not fetch Items in the cart! Maybe the cart has expired! Try adding items again to get a new cart!"
      );
    }

    return cart.data.cart;
  } catch (error) {
    console.error("Could not get items in cart: ", error.message);
    throw error;
  }
}

export async function addItemToCart(cartId, variantId) {
  const query = `
    mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10){
            edges
            {
              node{
                quantity
                merchandise{
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
            totalDutyAmount {
              amount
              currencyCode
            }
          }
        }
        
        
        userErrors {
          field
          message
        }
      }
    }
   `;

  const variables = {
    cartId: cartId,
    lines: {
      merchandiseId: variantId,
      quantity: 1,
    },
  };

  try {
    const response = await api.post("", {
      query,
      variables,
    });

    if (response.data.errors) {
      const errorMessages = response.data.errors
        .map((error) => error.message)
        .join(", ");
      throw new Error(`GraphQL error(s): ${errorMessages}`);
    }

    const cart = response.data;
    if (!cart) {
      throw new Error("Could not add the item to the cart!");
    }

    return cart;
  } catch (error) {
    console.error("Could not add items to the cart: ", error.message);
    throw error;
  }
}


export async function updateLineItem (cartId, lineId, quantity){
 const query = `
  mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
 
 ` 
  const variables = 
  {
    "cartId": cartId,
    "lines": {
      "id": lineId,
      "quantity": quantity
    }
  }


  try {
    const response = await api.post("", {
      query,
      variables,
    });

    if (response.data.errors) {
      const errorMessages = response.data.errors
        .map((error) => error.message)
        .join(", ");
      throw new Error(`GraphQL error(s): ${errorMessages}`);
    }

    const cartLine = response.data;
    if (!cartLine) {
      throw new Error("Could update cart line!");
    }

    return cartLine;
  } catch (error) {
    console.error("Could update cart line item: ", error.message);
    throw error;
  }
}