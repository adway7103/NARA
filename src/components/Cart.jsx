import { useEffect, useRef, useCallback, useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  addItemToCart,
  getItemsInCartAPI,
  removeCartLine,
  updateBuyersIndentity,
  updateLineItem,
} from "../apis/Cart";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  setCheckoutUrl,
  setProductsinCart,
  setTotalQuantityInCart,
} from "../store";

function CartItem({
  src,
  title,
  quantity,
  size,
  pricePerItem,
  cartLineId,
  cartId,
  productId,
  setItemsQuantity,
  fetchAllItems,
}) {
  const [productQuantity, setProductQuantity] = useState();
  const [quantityUpdating, setQuantityUpdating] = useState(false);
  const [productIsUpdating, setProductIsUpdating] = useState(false);
  const totalQuantityInCart = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const productsInCart = useSelector((state) => state.cart.productsInCart);

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

  const updateCartItem = async (
    cartId,
    cartLineId,
    quantity,
    totalQuantityInCart
  ) => {
    try {
      setQuantityUpdating(true);
      const response = await updateLineItem(
        cartId,
        cartLineId,
        productId,
        quantity
      );
      const updatedQuantity = response; //. data.cartLinesUpdate.cart.lines.edges[1].node.merchandise.id

      // check if product is out of stock
      if (productQuantity === updatedQuantity) {
        toast.info(
          `Only ${productQuantity} items are in stock for this variant!`
        );
        return;
      }

      console.log("Updated quantity: ", updatedQuantity);
      console.log(cartLineId);
      console.log(productsInCart);
      console.log(updatedQuantity, cartLineId);

      const updatedProducts = productsInCart.map((el) => {
        if (el.node.id === cartLineId)
          return { node: { ...el.node, quantity: updatedQuantity } };
        else return { node: el.node };
      });

      console.log("Updated Products in Cart", updatedProducts);
      dispatch(setProductsinCart(updatedProducts));
      dispatch(
        setTotalQuantityInCart(
          totalQuantityInCart - productQuantity + updatedQuantity
        )
      );
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
      const updatedProducts = productsInCart.filter(
        (el) => el.node.id != cartLineId
      );
      dispatch(setProductsinCart(updatedProducts));
      dispatch(setTotalQuantityInCart(totalQuantityInCart - productQuantity));
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
    // alert(cartId);
    // alert(totalQuantityInCart);

    if (cartId && cartLineId) {
      updateCartItem(
        cartId,
        cartLineId,
        productQuantity + 1,
        totalQuantityInCart
      );
    }
  };

  const decreaseQuantityHandler = () => {
    if (cartId && cartLineId) {
      if (productQuantity === 1) {
        removeProductFromCart(cartId, cartLineId);
      } else {
        updateCartItem(
          cartId,
          cartLineId,
          productQuantity - 1,
          totalQuantityInCart
        );
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
                    <p className="  w-[20px] flex items-center justify-center ">
                      {productQuantity}
                    </p>
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

export default function Cart({ toggleCartOpen, cartOpen }) {
  const [itemsQuantity, setItemsQuantity] = useState(0);
  const totalQuantityInCart = useSelector((state) => state.cart.totalQuantity);
  const checkoutUrl = useSelector((state) => state.cart.checkoutUrl);
  const [slideInCart, setSlideInCart] = useState(false);
  // const [products, setProducts] = useState(null);
  const productsInCart = useSelector((state) => state.cart.productsInCart);
  const dispatch = useDispatch();
  const cartRef = useRef(null);
  const cartId = useSelector((state) => state.cart.id);
  const [cartLoading, setCartLoading] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const defaultAddress = useSelector((state) => state.user.defaultAddress);
  const email = useSelector((state) => state.user.email);
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

  const prefillAdress = async (cartId, email, deliveryAddress) => {
    try {
      const response = await updateBuyersIndentity(
        cartId,
        email,
        deliveryAddress
      );
      console.log(response);
    } catch (error) {
      if (error?.message?.includes("GraphQL error(s)")) {
        toast.error("Something went wrong");
      } else if (error?.meesage) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      // set Checkout button loading to false
    }
  };

  const checkOutHandler = async () => {
    // alert("The user is authenticated: " + isAuthenticated);
    // if (isAuthenticated) {
    //   // console.log("default address", defaultAddress)
    //   if (defaultAddress && cartId) {
    //     console.log(
    //       "The user is authenticated and has the default address: ",
    //       defaultAddress
    //     );
    //     await prefillAdress(cartId, email, {
    //       firstName: defaultAddress.firstName,
    //       lastName: defaultAddress.lastName,
    //       phone: defaultAddress.phone,
    //       province: defaultAddress.province,
    //       zip: defaultAddress.zip,
    //       address1: defaultAddress.address1,
    //       address2: defaultAddress.address2,
    //       country: defaultAddress.country,
    //       city: defaultAddress.city
    //     });
        
    //     console.log("out of prefillAddress");
    //   } else {
    //     console.log(
    //       "Although the user is authenticated he/she has no default address set!"
    //     );
    //   }
    // }
    if (!checkoutUrl) 
    {
      //proceed to delete cart
      return;
    }
    if (totalQuantityInCart === 0)
      return toast.error(
        "You have no items in the cart! Please add products first!"
      );
    window.open(checkoutUrl);
  };

  const fetchAllItems = async (cartId) => {
    try {
      setCartLoading(true);
      setItemsQuantity(0); // so that the checkout button can be disabled
      const response = await getItemsInCartAPI(cartId);
      const itemsQuantity = response?.totalQuantity;
      setItemsQuantity(itemsQuantity);
      dispatch(setCheckoutUrl(response?.checkoutUrl));
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
  //     alert(cartId)
  //   }
  // }, [cartId]);

  useEffect(() => {
    console.log(productsInCart);
  }, [productsInCart]);

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
  const closeCartHandler = () => {
    toggleCartOpen();
  };
  useEffect(() => {
    setSlideInCart(true);
    return () => {
      setSlideInCart(false);
    };
  }, []);
  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} // Fade in/out for the backdrop
          onClick={closeCartHandler}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            width: "100vw",
            zIndex: 5000000,
            margin: 0,
          }}
        >
          <motion.div
            key="box"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{
              duration: 0.5, // Duration of the sliding in/out animation
              ease: "linear",
              delay: 0, // Delay so the backdrop mounts first
            }}
            onClick={(e) => e.stopPropagation()}
            ref={cartRef}
            className={`border-2 absolute z-[100] top-0 bottom-0 right-0 transition-transform duration-300 ease-in-out bg-[#ffff] w-[100vw] sm:w-[500px] dark:!bg-black dark:!text-white`}
          >
            <div className="flex items-center justify-between border-b-2 p-4">
              <h1 className="text-2xl font-black">MY CART</h1>
              <button
                className="border-2 px-2 shadow-lg"
                onClick={toggleCartOpen}
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col h-full pb-4">
              <div className="flex flex-col gap-4 h-5/6 p-4">
                {cartLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={"100%"}
                    className="p-3 dark:bg-white"
                  />
                ) : (
                  <>
                    <h2 className="font-black">
                      Added Products ({totalQuantityInCart})
                    </h2>
                    <div className="flex flex-col gap-2 overflow-auto">
                      {productsInCart?.map((el) => (
                        <CartItem
                          setItemsQuantity={setItemsQuantity}
                          key={el?.node?.id}
                          cartLineId={el?.node?.id}
                          cartId={cartId}
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
              <div className="flex justify-around font-outfit">
                <button
                  onClick={continueShoppingHandler}
                  className="text-[#1F4A40] dark:text-[#ffff] border-1 border-[#1F4A40] px-2 py-1 flex items-center gap-2"
                >
                  <HiArrowNarrowLeft /> Continue Shopping
                </button>
                <button
                  onClick={checkOutHandler}
                  className="disabled:opacity-50 bg-[#1F4A40] px-2 py-1 text-[#ffff]"
                  disabled={totalQuantityInCart > 0 ? false : true}
                >
                  Continue to Checkout
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
