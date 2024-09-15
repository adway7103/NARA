import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { setAuthStatus, setActiveCart } from "./store";
import { updateCustomerDefaultAddress } from "./apis/getAccoutDetailsAPI";
import createCart, { getCheckoutURL, updateBuyersIndentity } from "./apis/Cart";
import { getProductVariantDetail } from "./apis/Products";


function App() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  async function updateDefaultAddress(){
    try {
      await updateCustomerDefaultAddress("gid://shopify/MailingAddress/9376642302207");
      console.log("address updated");
    } catch (error) {
      console.error(error);
    }
  }
  const createCartQuery = async ()=>{
    try {
      const response = await createCart();
      console.log("logging from cart create query", response);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchProductVariant =async ()=>{
    try {
      const response = await getProductVariantDetail("gid://shopify/ProductVariant/46130453741823");
      console.log("Logging product variant detail: ", response);
    } catch (error) {
      console.log(error)
    }
  }
  const getCheckoutURLNOW = async ()=>{
    try {
      const response = await updateBuyersIndentity();
      console.log("checkout URL", response);
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    // updateDefaultAddress();
    // createCartQuery();
    // fetchProductVariant();
    // getCheckoutURLNOW()
  }, [pathname]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken)
      dispatch(setAuthStatus({ accessToken, isAuthenticated: true }));

    const cartId = localStorage.getItem("cartId");
    const checkoutUrl = localStorage.getItem("checkoutUrl");
    if(cartId && checkoutUrl)
      dispatch(setActiveCart({id: cartId, checkoutUrl}));
  }, []);
  return (
    <div>
      <Toaster position="top-center" richColors />
      <Outlet />
    </div>
  );
}
export default App;



