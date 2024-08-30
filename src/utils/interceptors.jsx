import axios from "axios";
const STOREFRONT_ACCESS_TOKEN = "2e6a206618648ed49bb3eb57b87bd43d";
const api = axios.create({
  baseURL: "https://3431e4-3b.myshopify.com/api/2024-07/graphql.json", // Replace with your shop's URL
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
  },
});

export default api;