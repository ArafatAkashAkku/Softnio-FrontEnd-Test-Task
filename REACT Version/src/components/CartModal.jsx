import React from "react";

export default function CartModal({
  totalcartproduct,
  cartmodal,
  capitalizeFirstLetters,
  totalcartproductprice,
  totalcartproductqty,
}) {
  return (
    <>
      {/* <!-- checkout modal pop show on click checkout and remove on click itself modal because nothing else was in the assignment --> */}
      <div
        className="h-[100vh] w-[100vw] fixed top-0 justify-center items-center flex"
        style={{ background: "rgba(17, 18, 27, 0.55)" }}
        onClick={() => {
          cartmodal(false);
        }}
      >
        <div className="w-[90%] h-[90%] lg:w-[42%] lg:h-[80%] bg-white border rounded-2xl">
          <div className="p-[44px]">
            <h1
              className="text-[22px] font-bold leading-6 pb-2"
              style={{ color: "#364a63" }}
            >
              Your Cart
            </h1>
            <div className="flex flex-col pt-1">
              <div className="-m-1.5 overflow-x-scroll">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div>
                    <table className="min-w-full divide-y divide-gray-200 h-[56vh] overflow-y-scroll block">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3 text-start text-[14px] font-normal w-[278px] block"
                            style={{ color: "#8091a7" }}
                          >
                            Item
                          </th>
                          <th
                            scope="col"
                            className="py-3 text-[14px] font-normal text-center w-[62px]"
                            style={{ color: "#8091a7" }}
                          >
                            Color
                          </th>
                          <th
                            scope="col"
                            className="py-3 text-[14px] font-normal text-center w-[69px]"
                            style={{ color: "#8091a7" }}
                          >
                            Size
                          </th>
                          <th
                            scope="col"
                            className="py-3 text-[14px] font-normal text-center w-[59px]"
                            style={{ color: "#8091a7" }}
                          >
                            Qnt
                          </th>
                          <th
                            scope="col"
                            className="py-3 text-[14px] font-normal text-right pr-4"
                            style={{ color: "#8091a7" }}
                          >
                            Prize
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {totalcartproduct.map((c, index) => {
                          return (
                            <tr className="pb-4" key={index}>
                              <td
                                className="py-4 whitespace-nowrap text-[14px] font-normal text-start flex gap-2 leading-[23.1px] items-center"
                                style={{ color: "#364a63" }}
                              >
                                <img
                                  src={c.image}
                                  alt={`${capitalizeFirstLetters(
                                    c.name
                                  )}-${capitalizeFirstLetters(c.color)}`}
                                  loading="lazy"
                                  className="w-[37] h-[42px] border rounded"
                                />
                                {capitalizeFirstLetters(c.name)}
                              </td>
                              <td
                                className="py-4 whitespace-nowrap text-[14px] font-normal text-center leading-[23.1px]"
                                style={{ color: "#364a63" }}
                              >
                                {capitalizeFirstLetters(c.color)}
                              </td>
                              <td
                                className="py-4 whitespace-nowrap text-[14px] font-bold text-center leading-[23.1px]"
                                style={{ color: "#364a63" }}
                              >
                                {c.size.toUpperCase()}
                              </td>
                              <td
                                className="py-4 whitespace-nowrap text-[14px] font-bold text-center leading-[23.1px]"
                                style={{ color: "#364a63" }}
                              >
                                {c.qty}
                              </td>
                              <td
                                className="py-4 whitespace-nowrap text-[14px] font-bold text-right leading-[23.1px] pr-4"
                                style={{ color: "#364a63" }}
                              >
                                ${c.price.toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="divide-y divide-gray-200">
                        <tr className="pb-4">
                          <td
                            colSpan="3"
                            className="py-4 whitespace-nowrap text-[16px] font-bold text-left leading-[22px]"
                            style={{ color: "#373737" }}
                          >
                            Total
                          </td>
                          <td
                            className="py-4 whitespace-nowrap text-[14px] font-bold text-center leading-[34px]"
                            style={{ color: "#364a63" }}
                          >
                            {totalcartproductqty}
                          </td>
                          <td
                            className="py-4 whitespace-nowrap text-[18px] font-bold text-right leading-[34px] pr-4"
                            style={{ color: "#364a63" }}
                          >
                            ${totalcartproductprice}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-3 flex flex-col lg:flex-row gap-6 justify-center items-center lg:justify-end">
              <button
                className="py-2 px-[18px] text-[13px] font-bold leading-5 border rounded"
                style={{ color: "#364a63", border: "1px solid #dbdfea" }}
              >
                Continue Shopping
              </button>
              <button
                className="py-2 px-[18px] text-[13px] font-bold leading-5 border rounded"
                style={{ color: "#ffffff", background: "#6576ff" }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
