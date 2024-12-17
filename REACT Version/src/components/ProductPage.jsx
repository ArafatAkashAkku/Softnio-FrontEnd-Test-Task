import React, { useEffect, useState } from "react";
import CheckoutButton from "./CheckoutButton";
import CartModal from "./CartModal";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductPage() {
  const [checkout, setCheckout] = useState(false);
  const [cartmodal, setCartModal] = useState(false);
  const [cartqty, setCartQty] = useState(0);

  // dummy products
  const dummyproducts = [
    {
      id: 1,
      name: "Classy Modern Smart Watch",
      color: "purple",
      image: "./images/purple-image.png",
    },
    {
      id: 2,
      name: "Classy Modern Smart Watch",
      color: "cyan",
      image: "./images/cyan-image.png",
    },
    {
      id: 3,
      name: "Classy Modern Smart Watch",
      color: "blue",
      image: "./images/blue-image.png",
    },
    {
      id: 4,
      name: "Classy Modern Smart Watch",
      color: "black",
      image: "./images/black-image.png",
    },
  ];

  // dummy sizes,prices,colors
  const sizes = ["S", "M", "L", "XL"];
  const prices = [69.0, 79.0, 89.0, 99.0];
  const colors = ["purple", "cyan", "blue", "gray"];

  const colorClasses = {
    purple: "bg-purple-700",
    cyan: "bg-cyan-700",
    blue: "bg-blue-700",
    gray: "bg-gray-700",
  };
  
  const colorClassesLight = {
    purple: "bg-purple-600",
    cyan: "bg-cyan-600",
    blue: "bg-blue-600",
    gray: "bg-gray-600",
  };

  const [selectedproduct, setSelectedProduct] = useState({});
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSizePriceIndex, setSelectedSizePriceIndex] = useState();
  const [cartproduct, setCartProduct] = useState({});

  // const [checkoutcartcount, setCheckoutCartCount] = useState();
  const [totalcartproduct, settotalcartProduct] = useState([]);
  const [totalcartproductqty, setTotalCartProductQty] = useState();
  const [totalcartproductprice, setTotalCartProductPrice] = useState();

  const productSet = (p) => {
    setSelectedProduct(dummyproducts[p]);
    setCartProduct(dummyproducts[p]);
  };

  useEffect(() => {
    productSet(0);
  }, []);

  useEffect(() => {
    if (cartqty == 0) {
      setCartProduct((prev) => {
        const newCartProduct = { ...prev };
        delete newCartProduct.qty;
        return newCartProduct;
      });
    }
  }, [cartqty]);

  // capitalize every first letter in sentence
  const capitalizeFirstLetters = (input = " ") => {
    return input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const addToCart = () => {
    if (cartproduct.price == undefined && cartproduct.size == undefined) {
      toast.warn("Select Size and Price", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return false;
    }
    if (
      cartproduct.qty == 0 ||
      cartproduct.qty == undefined ||
      cartproduct.qty < 0
    ) {
      toast.warn("Choose Quantity", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return false;
    }
    settotalcartProduct((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === cartproduct.id && item.size === cartproduct.size
      );
      let updatedCart;
      if (existingItemIndex !== -1) {
        updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          qty: updatedCart[existingItemIndex].qty + cartproduct.qty,
        };
      } else {
        updatedCart = [...prevCart, cartproduct];
      }
      const combineTotals = updatedCart.reduce(
        (acc, item) => {
          acc.totalQuantity += Number(item.qty);
          acc.totalPrice += Number(item.qty) * Number(item.price);
          return acc;
        },
        { totalQuantity: 0, totalPrice: 0 }
      );
      setTotalCartProductQty(combineTotals.totalQuantity);
      setTotalCartProductPrice(combineTotals.totalPrice);
      return updatedCart;
    });
    setCartQty(0);
    setSelectedSizePriceIndex();
    setCartProduct((prev) => {
      const newCartProduct = { ...prev };
      delete newCartProduct.qty;
      delete newCartProduct.size;
      delete newCartProduct.price;
      return newCartProduct;
    });
    setCheckout(true);
    setTimeout(() => setCheckout(false), 60000);
    return;
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center w-[100vw] h-[100vh]">
        <div className="flex justify-center h-full w-full lg:h-[75%] lg:w-[86%]">
          <div className="flex flex-col lg:flex-row">
            {/* <!-- left side image show  --> */}
            <div className="w-full p-4 lg:w-1/2">
              <img
                src={selectedproduct.image}
                alt={`${capitalizeFirstLetters(
                  selectedproduct.name
                )} - ${capitalizeFirstLetters(selectedproduct.color)}`}
                loading="lazy"
                className="object-contain object-center h-full w-full"
              />
            </div>
            {/* <!-- right size text description price color size quantity etc show  --> */}
            <div className="w-full p-4 lg:w-1/2 flex flex-col justify-center">
              <h1
                className="text-[40px] font-bold leading-[44px] pb-3 pt-3"
                style={{ color: "#364a63" }}
              >
                Classy Modern Smart Watch
              </h1>
              <div className="flex gap-12">
                <div className="flex gap-[4.5px]">
                  <img
                    src="./images/icon/full-star.png"
                    alt="full-star"
                    loading="lazy"
                  />
                  <img
                    src="./images/icon/full-star.png"
                    alt="full-star"
                    loading="lazy"
                  />
                  <img
                    src="./images/icon/full-star.png"
                    alt="full-star"
                    loading="lazy"
                  />
                  <img
                    src="./images/icon/half-star.png"
                    alt="half-star"
                    loading="lazy"
                  />
                  <img
                    src="./images/icon/no-star.png"
                    alt="no-star"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p
                    className="text-[14px] font-normal leading-[23.1px]"
                    style={{ color: "#8091a7" }}
                  >
                    (2 reviews)
                  </p>
                </div>
              </div>
              <div className="flex gap-[5px] pt-5">
                <span
                  className="text-[20px] font-normal leading-[30px] line-through"
                  style={{ color: "#8091a7" }}
                >
                  $99.00
                </span>
                <span
                  className="text-[24px] font-bold leading-[30px]"
                  style={{ color: "#6576ff" }}
                >
                  $79.00
                </span>
              </div>
              <p
                className="text-[18px] font-normal leading-[30px] pt-5"
                style={{ color: "#8091a7" }}
              >
                I must explain to you how all this mistaken idea of denoun cing
                ple praising pain was born and I will give you a complete
                account of the system, and expound the actual teaching.
              </p>
              <div className="pt-5 flex gap-11">
                <div>
                  <p
                    className="text-[14px] font-normal leading-[23.1px]"
                    style={{ color: "#8091a7" }}
                  >
                    Type
                  </p>
                  <p
                    className="text-[16px] font-bold leading-[23px]"
                    style={{ color: "#364a63" }}
                  >
                    Watch
                  </p>
                </div>
                <div>
                  <p
                    className="text-[14px] font-normal leading-[23.1px]"
                    style={{ color: "#8091a7" }}
                  >
                    Model number
                  </p>
                  <p
                    className="text-[16px] font-bold leading-[23px]"
                    style={{ color: "#364a63" }}
                  >
                    Forerunner 290XT
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-[10px] pt-5">
                <h1
                  className="text-[18px] font-bold leading-[20px]"
                  style={{ color: "#364a63" }}
                >
                  Band Color
                </h1>
                {/* <!-- band color select and image show on selecting each color  --> */}
                <div className="flex gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-[25px] h-[25px] rounded-full flex justify-center items-center border ${
                        selectedColorIndex === index ? colorClasses[color] : ""
                      }`}
                      onClick={() => {
                        productSet(index);
                        setSelectedColorIndex(index);
                        setSelectedSizePriceIndex();
                        setCartQty(0);
                      }}
                    >
                      <span
                        className={`block p-2 w-4 h-4 border rounded-full ${colorClassesLight[color]}`}
                      ></span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-[10px] pt-5">
                <h1
                  className="text-[18px] font-bold leading-[20px]"
                  style={{ color: "#364a63" }}
                >
                  Wrist Size
                </h1>
                {/* <!-- select price and sizes for chekout cart  --> */}
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`px-[18px] py-2 text-[13px] font-bold leading-5 border border-gray-400 rounded-sm size-price-button ${
                        selectedSizePriceIndex === index ? `active` : ""
                      }`}
                      onClick={() => {
                        setSelectedSizePriceIndex(index);
                        setCartProduct({
                          ...cartproduct,
                          size: sizes[index],
                          price: prices[index],
                        });
                        setCartQty(0);
                      }}
                    >
                      {size}
                      <span
                        className="ms-1 font-extralight"
                        style={{ color: "rgba(54, 74, 99, 1)" }}
                      >
                        ${prices[index]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              {/* <!-- cart quantity add and add to cart button  --> */}
              <div className="flex gap-4 pt-5 flex-wrap">
                <div className="flex items-center">
                  <button
                    className="bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded-s-lg"
                    style={{ border: "0.5px solid rgba(219, 223, 234, 1)" }}
                    onClick={() => {
                      if (cartqty > 0) {
                        setCartQty(cartqty - 1);
                        setCartProduct({ ...cartproduct, qty: cartqty - 1 });
                      } else {
                        setCartQty(0);
                      }
                    }}
                  >
                    -
                  </button>
                  <span
                    className="text-gray-700 font-bold py-2 px-6"
                    style={{
                      border: "0.5px solid rgba(219, 223, 234, 1)",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {cartqty}
                  </span>
                  <button
                    className="bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded-e-lg"
                    style={{ border: "0.5px solid rgba(219, 223, 234, 1)" }}
                    onClick={() => {
                      setCartQty(cartqty + 1);
                      setCartProduct({ ...cartproduct, qty: cartqty + 1 });
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
                <button>
                  <img
                    src="./images/icon/heart.png"
                    alt="Heart"
                    loading="lazy"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- checkout button show on click add to cart and disable automatically after 60s or disable immediately on click  --> */}
      {checkout && (
        <CheckoutButton
          totalcartproductqty={totalcartproductqty}
          checkout={setCheckout}
          cartmodal={setCartModal}
        />
      )}
      {cartmodal && (
        <CartModal
          totalcartproductprice={totalcartproductprice}
          totalcartproductqty={totalcartproductqty}
          totalcartproduct={totalcartproduct}
          cartmodal={setCartModal}
          capitalizeFirstLetters={capitalizeFirstLetters}
        />
      )}
    </>
  );
}
