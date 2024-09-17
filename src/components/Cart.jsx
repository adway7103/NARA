import { useEffect, useRef, useCallback, useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  addItemToCart,
  getItemsInCartAPI,
  removeCartLine,
  updateLineItem,
} from "../apis/Cart";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setProductsinCart } from "../store";

function CartItem({
  src,
  title,
  quantity,
  size,
  pricePerItem,
  cartLineId,
  productId,
  setItemsQuantity,
  fetchAllItems,
}) {
  const [productQuantity, setProductQuantity] = useState();
  const [quantityUpdating, setQuantityUpdating] = useState(false);
  const [productIsUpdating, setProductIsUpdating] = useState(false);

  const cartId = useSelector((state) => state.cart?.id);

  useEffect(() => {
    if (quantity) {
      setProductQuantity(quantity);
    }
  }, [quantity]);

  const increaseTheProductQuantity = async (cartId, variantId) => {
    try {
      setQuantityUpdating(true);
      const response = await addItemToCart(cartId, variantId);
      const updatedQuantity =
        response?.data?.cartLinesAdd?.cart?.lines?.edges?.[0]?.node?.quantity;
      if (updatedQuantity === productQuantity)
        toast.info(
          "Only that much stock is available for the selected variant for now"
        );
      else setProductQuantity(updatedQuantity);
    } catch (error) {
      console.error(error);
      if (error?.message?.includes("GraphQL error(s)")) {
        toast.error("Something went wrong");
        // proceed to delete the cartId from localstorage and redux
      }
    } finally {
      setQuantityUpdating(false);
    }
  };

  const updateCartItem = async (cartId, cartLineId, quantity) => {
    try {
      setQuantityUpdating(true);
      const response = await updateLineItem(
        cartId,
        cartLineId,
        productId,
        quantity
      );
      const updatedQuantity = response; //. data.cartLinesUpdate.cart.lines.edges[1].node.merchandise.id

      console.log("Updated quantity: ", updatedQuantity);
      console.log(cartLineId);
      setProductQuantity(updatedQuantity);
    } catch (error) {
      console.error(error);
      if (error?.message?.includes("GraphQL error(s)")) {
        toast.error("Something went wrong");
        // proceed to delete the cartId from localstorage and redux
      }
    } finally {
      setQuantityUpdating(false);
    }
  };

  const removeProductFromCart = async (cartId, cartLineId) => {
    try {
      setProductIsUpdating(true);
      const wasRemoved = await removeCartLine(cartId, cartLineId);
      if (wasRemoved) console.log("Item was removed successfully!");
      fetchAllItems(cartId);
    } catch (error) {
      if (error?.message?.includes("GraphQL error(s)")) {
        toast.error("Something went wrong");
      } else {
        toast.error(error.message);
      }
    } finally {
      setProductIsUpdating(false);
    }
  };

  const removeProductFromCarthandler = async () => {
    if (cartId && cartLineId) {
      removeProductFromCart(cartId, cartLineId);
    }
  };

  const increaseQuantityHandler = () => {
    if (cartId && cartLineId) {
      updateCartItem(cartId, cartLineId, productQuantity + 1);
    }
  };

  const decreaseQuantityHandler = () => {
    if (cartId && cartLineId) {
      if (productQuantity === 1) {
        removeProductFromCart(cartId, cartLineId);
      } else {
        updateCartItem(cartId, cartLineId, productQuantity - 1);
      }
    }
  };

  return (
    <>
      <div className="flex gap-2 z-100 sm:h-32 h-24 pb-2 border-b-2  dark:bg-black dark:text-white">
        {productIsUpdating ? (
          <Skeleton
            variant="rectangular"
            className=" w-full h-auto p-3 dark:bg-white"
          />
        ) : (
          <>
            <div className="flex w-1/3  ">
              <img
                src={src}
                alt="Frock"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex sm:gap-4 sm:gap-2 items-start w-2/3 ">
              <div className="flex flex-col justify-between h-full sm:gap-2   sm:text-base text-sm w-5/6 ">
                <div className="flex flex-col gap-2 ">
                  <h1 className="font-bold w-full overflow-hidden text-ellipsis line-clamp-2">
                    {title}
                  </h1>

                  <p className="text-xs sm:text-base">
                    {pricePerItem?.currencyCode}{" "}
                    <strong className="font-black">
                      {(pricePerItem?.amount * 1.0 * productQuantity).toFixed(
                        2
                      )}
                    </strong>{" "}
                    | Size: <strong className="font-bold">{size}</strong>
                  </p>
                </div>

                <div className="text-xs sm:text-base flex flex-row gap-2">
                  <button
                    className="disabled:text-gray-400 px-2 bg-[#F7F7F7] border-1 dark:bg-black dark:text-white"
                    onClick={increaseQuantityHandler}
                    disabled={quantityUpdating}
                  >
                    +
                  </button>{" "}
                  {quantityUpdating ? (
                    <Skeleton
                      variant="rectangular"
                    
                      width={"20px"}
                      height={"100%"}
                      className=" dark:bg-white  "
                    />
                  ) : (
                    <p className="  w-[20px] flex items-center justify-center ">{productQuantity}</p>
                  )}
                  <button
                    className="disabled:text-gray-400 px-2 bg-[#F7F7F7] border-1 dark:bg-black dark:text-white"
                    onClick={decreaseQuantityHandler}
                    disabled={quantityUpdating}
                  >
                    &mdash;{" "}
                  </button>
                </div>
              </div>
              {/* delete button */}
              <button className="w-1/6" onClick={removeProductFromCarthandler}>
                <img src="/icons/deleteIcon.svg" alt="" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

const useDebounce = (fn, delay) => {
  const timerRef = useRef(null);

  const debouncedFn = useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );

  return debouncedFn;
};

export default function Cart({ toggleCartOpen }) {
  const [itemsQuantity, setItemsQuantity] = useState(0);
  const [checkoutURL, setCheckoutUrl] = useState(null);
  // const [products, setProducts] = useState(null);
  const productsInCart = useSelector(state=>state.cart.productsInCart);
  const dispatch = useDispatch();
  const cartRef = useRef(null);
  const cartId = useSelector((state) => state.cart?.id);
  const [cartLoading, setCartLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const checkOutHandler = () => {
    if (!checkoutURL) return alert("Checkout Url does not exist");
    if (itemsQuantity === 0)
      return toast.error(
        "You have no items in the cart! Please add products first!"
      );
    window.open(checkoutURL);
  };

  const fetchAllItems = async (cartId) => {
    try {
      setCartLoading(true);
      setItemsQuantity(0); // so that the checkout button can be disabled
      const response = await getItemsInCartAPI(cartId);
      const itemsQuantity = response?.totalQuantity;
      setItemsQuantity(itemsQuantity);
      setCheckoutUrl(response?.checkoutUrl);
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
    } finally {
      setCartLoading(false);
    }
  };

  const continueShoppingHandler = () => {
    toggleCartOpen();
  };

  // useEffect(() => {
  //   if (cartId) {
  //     fetchAllItems(cartId);
  //   }
  // }, [cartId]);

  useEffect(()=>{
    console.log(productsInCart);
  }, [productsInCart])

  // const handleClickOutside = (event) => {
  //   if (cartRef.current && !cartRef.current.contains(event.target)) {
  //     toggleCartOpen();
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      <div
        ref={cartRef}
        className={`border-2 fixed z-[100]  top-0 bottom-0 right-0   transition-transform duration-300 ease-in-out bg-[#ffff] w-[100vw] sm:w-[500px] dark:!bg-black dark:!text-white `}
      >
        <div className=" flex items-center justify-between border-b-2 p-4">
          <h1 className="text-2xl font-black ">MY CART</h1>
          <button
            className="border-2 px-2 shadow-lg"
            onClick={() => toggleCartOpen()}
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col  h-full pb-4">
          <div className="flex flex-col gap-4 h-5/6 p-4">
            {cartLoading ? (
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={"100%"}
                className=" p-3 dark:bg-white"
              />
            ) : (
              <>
                <h2 className="font-black ">
                  Added Products ({itemsQuantity}){" "}
                </h2>
                {/* cartItems */}
                <div className="flex flex-col gap-2  overflow-auto">
                  {productsInCart?.map((el) => (
                    <CartItem
                      setItemsQuantity={setItemsQuantity}
                      key={el?.node?.id}
                      cartLineId={el?.node?.id}
                      src={el?.node?.merchandise?.image?.src}
                      quantity={el?.node?.quantity}
                      title={el?.node?.merchandise?.product?.title}
                      pricePerItem={el?.node?.merchandise?.price}
                      productId={el?.node?.merchandise?.id}
                      fetchAllItems={fetchAllItems}
                      size={
                        el?.node?.merchandise?.selectedOptions?.find(
                          (el) => el?.name === "Size"
                        )?.value
                      }
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="flex justify-around font-outfit ">
            <button
              onClick={continueShoppingHandler}
              className="text-[#1F4A40] dark:text-[#ffff] border-1 border-[#1F4A40] px-2 py-1 flex items-center gap-2"
            >
              <HiArrowNarrowLeft /> Continue Shopping
            </button>
            <button
              onClick={checkOutHandler}
              className="disabled:opacity-50  bg-[#1F4A40] px-2 py-1 text-[#ffff]"
              disabled={itemsQuantity > 0 ? false : true}
            >
              Continue to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
