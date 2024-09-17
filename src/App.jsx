import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { setAuthStatus, setActiveCartId, setTotalQuantityInCart, setProductsinCart } from "./store";
import { updateCustomerDefaultAddress } from "./apis/getAccoutDetailsAPI";
import createCart, { getCheckoutURL, getItemsInCartAPI, updateBuyersIndentity } from "./apis/Cart";
import { getProductVariantDetail } from "./apis/Products";

function App() {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const fetchAllItemsInCart = async (cartId) => {
    try {
      const response = await getItemsInCartAPI(cartId);
      const itemsQuantity = response?.totalQuantity;
      dispatch(setTotalQuantityInCart(itemsQuantity));
      dispatch(setActiveCartId(cartId));
      const products = response?.lines?.edges;
      dispatch(setProductsinCart(products));
    } catch (error) {
      console.error(error);
      if (error?.message?.includes("GraphQL error(s)")) {
        toast.error("Something went wrong");
      } else if (error?.meesage) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
  }, [pathname]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken)
      dispatch(setAuthStatus({ accessToken, isAuthenticated: true }));

    const cartId = localStorage.getItem("cartId");
    if(cartId )
      // dispatch(setActiveCartId({id: cartId}));
     fetchAllItemsInCart(cartId);
  }, []);
  return (
    <div>
      <Toaster position="top-center" richColors />
      <Outlet />
    </div>
  );
}
export default App;



