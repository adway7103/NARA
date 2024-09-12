import axios from "axios";

const api = axios.create({
  baseURL: "https://3431e4-3b.myshopify.com/api/2024-07/graphql.json", 
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": import.meta.env.VITE_STOREFRONT_ACCESS_TOKEN,
  },
});

export default api;