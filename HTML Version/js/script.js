// variables decalare
const sizePrizeButton = document.querySelectorAll(".size-price-button");
const productImage = document.getElementById("product-image");
const colorChooseButton = document.querySelectorAll(".color-choose-button");
const minusButtonCart = document.getElementById("minus-button-cart");
const plusButtonCart = document.getElementById("plus-button-cart");
const cartButtonCount = document.getElementById("cart-button-count");
const addToCart = document.getElementById("add-to-cart");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartTotalModal = document.getElementById("cart-total-modal");
const cartQtyModal = document.getElementById("cart-qty-modal");
const checkoutButton = document.getElementById("checkout-button");
const checkoutModal = document.getElementById("checkout-modal");

// dummy products
const products = [
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

// cart count
var count = 0;
cartButtonCount.innerHTML = count;

minusButtonCart.onclick = () => {
  if (count > 0) {
    count -= 1;
  }
  cartButtonCount.innerHTML = count;
  dummycart.forEach((obj) => {
    obj.qty = count;
  });
};
plusButtonCart.onclick = () => {
  count += 1;
  cartButtonCount.innerHTML = count;
  dummycart.forEach((obj) => {
    obj.qty = count;
  });
};

// capitalize every first letter in sentence
const capitalizeFirstLetters = (input) => {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// initializing dummy cart for cart
let dummycart;

// product image show on selecting color and pushing to dummy cart in array of object
const productImageAdd = (p) => {
  productImage.innerHTML = `
  <img
    src="${products[p].image}"
    alt="${capitalizeFirstLetters(products[0].name)}-${capitalizeFirstLetters(
    products[0].color
  )}"
    loading="lazy"
    class="object-contain object-center h-full w-full"/>
`;
  dummycart = [];
  dummycart.push(products[p]);
  count = 0;
  cartButtonCount.innerHTML = count;
  sizePrizeButton.forEach((b) => {
    b.classList.remove("active");
  });
  return dummycart;
};

// normally show always on browser
productImageAdd(0);
colorChooseButton[0].classList.add(`bg-${colors[0]}-700`);

// adding size to dummy cart object array
const addSizeDummyCart = (s, p) => {
  dummycart.forEach((obj) => {
    obj.size = s;
    obj.price = p;
  });
};

// adding css on size button clicked
sizePrizeButton.forEach((e, index) => {
  e.onclick = () => {
    sizePrizeButton.forEach((b) => {
      b.classList.remove("active");
    });
    e.classList.add("active");
    addSizeDummyCart(sizes[index], prices[index]);
    count = 0;
    cartButtonCount.innerHTML = count;
    dummycart.forEach((obj) => {
      obj.qty = count;
    });
  };
});

// adding css on color button clicked
colorChooseButton.forEach((e, index) => {
  e.onclick = () => {
    colorChooseButton.forEach((c) => {
      c.classList.remove("bg-purple-700");
      c.classList.remove("bg-cyan-700");
      c.classList.remove("bg-blue-700");
      c.classList.remove("bg-gray-700");
    });
    e.classList.add(`bg-${colors[index]}-700`);
    productImageAdd(index);
  };
});

// addd to cart and dummy cart to newcart products
let cart = [];
addToCart.onclick = () => {
  let newCart = {
    id: dummycart[0].id,
    name: dummycart[0].name,
    color: dummycart[0].color,
    image: dummycart[0].image,
    size: dummycart[0].size,
    price: dummycart[0].price,
    qty: dummycart[0].qty,
  };

  if (newCart.price == undefined && newCart.size == undefined) {
    alert("Select Size and Prize");
    return false;
  } else if (newCart.qty == 0 || newCart.qty == undefined || newCart.qty < 0) {
    alert("Choose Quantity");
    return false;
  } else {
    let newCartId = newCart.id;
    let newCartSize = newCart.size;
    const existingItem = cart.find((cartItem) => {
      return cartItem.id === newCartId && cartItem.size === newCartSize;
    });
    if (existingItem) {
      existingItem.qty += newCart.qty;
    } else {
      cart.push(newCart);
    }
    cartCount.innerHTML = cart.reduce((total, item) => total + item.qty, 0);
    cartModal.innerHTML = cart.map((c) => {
      return `
        <tr class="pb-4">
          <td class="py-4 whitespace-nowrap text-[14px] font-normal text-start flex gap-2 leading-[23.1px] items-center" style="color: #364a63">
            <img
            src="${c.image}"
            alt="${capitalizeFirstLetters(c.name)}-${capitalizeFirstLetters(
        c.color
      )}"
            loading="lazy"
            class="w-[37] h-[42px] border rounded"/>
              ${capitalizeFirstLetters(c.name)}
          </td>
          <td class="py-4 whitespace-nowrap text-[14px] font-normal text-center leading-[23.1px]" style="color: #364a63">
              ${capitalizeFirstLetters(c.color)}
          </td>
          <td class="py-4 whitespace-nowrap text-[14px] font-bold text-center leading-[23.1px]" style="color: #364a63">
              ${c.size.toUpperCase()}
          </td>
          <td class="py-4 whitespace-nowrap text-[14px] font-bold text-center leading-[23.1px]" style="color: #364a63">
              ${c.qty}
          </td>
          <td class="py-4 whitespace-nowrap text-[14px] font-bold text-right leading-[23.1px] pr-4" style="color: #364a63">
              $${c.price.toFixed(2)}
          </td>
        </tr>
        `;
    });
    const combineTotalQty = cart.reduce(
      (acc, product) => {
        acc.totalPrice +=
          Number.parseInt(product.qty) * Number.parseInt(product.price);
        acc.totalQuantity += Number.parseInt(product.qty);
        return acc;
      },
      { totalPrice: 0, totalQuantity: 0 }
    );
    cartQtyModal.innerHTML = combineTotalQty.totalQuantity;
    cartTotalModal.innerHTML = `$${combineTotalQty.totalPrice.toFixed(2)}`;
    checkoutButton.classList.replace("hidden", "flex");
    setTimeout(() => {
      checkoutButton.classList.replace("flex", "hidden");
    }, 60000);
    count = 0;
    cartButtonCount.innerHTML = count;
    sizePrizeButton.forEach((b) => {
      b.classList.remove("active");
    });
    delete dummycart[0].size;
    delete dummycart[0].price;
    delete dummycart[0].qty;
  }
};

// checkout button clicked and modal pop up show
checkoutButton.onclick = () => {
  checkoutModal.style.display = "flex";
  checkoutButton.classList.replace("flex", "hidden");
};

// dummy click for removing checkout modal
checkoutModal.onclick = () => {
  checkoutModal.style.display = "none";
};
