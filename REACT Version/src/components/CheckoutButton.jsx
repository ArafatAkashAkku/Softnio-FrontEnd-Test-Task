import React from "react";

export default function CheckoutButton({
  totalcartproductqty,
  checkout,
  cartmodal,
}) {
  return (
    <>
      <div
        className="fixed bottom-4 flex justify-center items-center w-full"
        onClick={() => {
          checkout(false);
          cartmodal(true);
        }}
      >
        <button
          className="py-2 px-6 border rounded-[20px] text-[14px] font-bold leading-5 shadow-2xl"
          style={{ background: "#ffbb5a" }}
        >
          Checkout
          <span
            className="ml-1 py-[2px] px-[6px] border rounded-lg"
            style={{ background: "#ffffff" }}
          >
            {totalcartproductqty}
          </span>
        </button>
      </div>
    </>
  );
}
