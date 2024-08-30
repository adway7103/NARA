import api from "../utils/interceptors"; 

const GET_ALL_PRODUCTS_QUERY = `
  {
    products(first: 50) {
      edges {
        node {
          id
          title
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  }
`;

export const fetchProducts = async () => {
  try {
    const response = await api.post('/', {
      query: GET_ALL_PRODUCTS_QUERY,
    });
    const products = response.data.data.products.edges.map(edge => edge.node);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
