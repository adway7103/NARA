import { FaPlus } from "react-icons/fa";
import { MdBookmarkBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import createCart, { addItemToCart, getItemsInCart } from "../../apis/Cart";
import { toast } from "sonner";
import { setActiveCart } from "../../store";
import { useState } from "react";
export default function ActionButtons() {

  const [addingToThecart, setAddingToTheCart] = useState(false);

  const currentVariant = useSelector(
    (state) => state.activeProduct.currentVariant
  );
  const productOutOfStock = useSelector(
    (state) => state.activeProduct.outOfStock
  );
  const cartId = useSelector((state) => state.cart.id);
  const dispatch = useDispatch();

  const createCartWithOneitem = async (variantId) => {
    try {
      const response = await createCart(variantId);
      const cartId = response.data.cartCreate.cart.id;
      const checkoutUrl = response.data.cartCreate.cart.checkoutUrl;
      toast.success("Item added to cart successfully!");
      dispatch(setActiveCart({ id: cartId, checkoutUrl }));
      localStorage.setItem("cartId", cartId);
      localStorage.setItem("checkoutUrl", checkoutUrl);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const addAnotherItemToTheCart = async(cartId, variantId)=>{
    try {
      setAddingToTheCart(true)
      const response = await addItemToCart(cartId, variantId);
      console.log(response);
      toast.success("1 item added to the cart!")

    } catch (error) {
      console.error(error);
      if(error.message.includes("GraphQL error(s)")){
        toast.error("Something went wrong");
        //proceed to delete the cartId from localstorage and redux
      }
    }finally{
      setAddingToTheCart(false)
    }
  }

  const addToCartHandler = () => {
    if (!currentVariant || productOutOfStock) {
      console.log("variant is non existant at this point!");
      return;
    }

    if (cartId) {
      const variantId = currentVariant.node.id;
      addAnotherItemToTheCart(cartId, variantId );
    } else {
      // alert("cart does not exist so creating the cart");
      // alert(currentVariant.node.id);
      // alert(cartId);
      const variantId = currentVariant.node.id;
      createCartWithOneitem(variantId);
    }
  };

  const fetchItemsInCart = async ()=>{
    try {
      const response = await getItemsInCart(cartId);
      console.log(response);
    } catch (error) {
      console.error(error);
      if(error.message.includes("GraphQL error(s)")){
        toast.error("Something went wrong");
        //proceed to delete the cartId from localstorage and redux
      }
    }
  }


  const checkOutHandler = () => {
    // const checkoutUrl = localStorage.getItem("checkoutUrl");
    // window.open(checkoutUrl, "_blank");
    if(cartId){
    fetchItemsInCart(); 
  }else{
    alert("No Item added to cart! Please add items to the cart first!")
  }

  };

  const createCartAndCheckout = async (variantId) => {
    try {
      const response = await createCart(variantId);
      const cartId = response.data.cartCreate.cart.id;
      const checkoutUrl = response.data.cartCreate.cart.checkoutUrl;
      window.open(checkoutUrl);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const buyNowHandler = ()=>{

    createCartAndCheckout(currentVariant.node.id);

  }

  return (
    <div className="md:relative fixed bottom-0 right-0 left-0 bg-[#ffff] md:bg-transparent p-2 xl:!p-0 md:p-0 flex sm:flex-row gap-2 justify-center md:justify-start border-2 md:border-none shadow-lg md:!shadow-none dark:bg-black font-outfit text-md  md:text-base  ">
      <button
        onClick={addToCartHandler}
        disabled={productOutOfStock || addingToThecart}
        className={` disabled:bg-gray-400 px-4 py-2  ${addingToThecart ? "bg-gray-800": " bg-[#1F4A40]"}   text-white border-2 shadow-lg flex items-center justify-center gap-2`}
      >
         {addingToThecart? "Adding Item..." : <> <FaPlus /> <pan>Add Item</pan> </>}
      </button>
      <button
        disabled={!currentVariant}
        className="disabled:text-gray-200 px-4 py-2 border-2 shadow-lg"
        onClick={buyNowHandler}
      >
        Buy Now
      </button>
      <button className="px-2 py-2 border-2 shadow-lg flex items-center justify-center">
        <MdBookmarkBorder size={24} />
      </button>
    </div>
  );
}


