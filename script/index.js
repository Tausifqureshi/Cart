const mainCards = document.querySelector(".cards");
const renderCartData = document.querySelector(".renderDataCart");
const totalPrice = document.getElementById("totalPrice");
let quantity = 1;
let calculeteTotal = [];

async function getData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    renderProducts(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

function renderProducts(data) {
  data.forEach((item) => {
    const productMainDiv = document.createElement("div");
    productMainDiv.classList.add("box-main");

    const product = `
      <div class="card">
        <img src=${item.image} alt="" class="itemImg">
        <p class="itemTitle">${item.title.slice(0, 30)}</p>
        <p class="itemDes">${item.description.slice(0, 30)}...</p>
        <p class="itemPrice">$${item.price}</p>
        <button class="addToCart">Add to Cart</button>
      </div>
    `;

    productMainDiv.innerHTML = product;
    mainCards.appendChild(productMainDiv);

    productMainDiv.querySelector(".addToCart").addEventListener("click", () => addToCart(item));
  });
}

function addToCart(productItem) {
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  const isItemExist = cartData.find((curItem) => curItem.id == productItem.id);

  if (isItemExist) {
    alert("Product already exists in cart");
    return;
  }

  const itemWithQuantity = { ...productItem, quantity: 1 };
  // cartData.push({ ...productItem, quantity: 1});
  cartData.push(itemWithQuantity)
  //  console.log(cartData)
  localStorage.setItem("cartData", JSON.stringify(cartData));

  const cartMDiv = createCartElement(productItem);
  renderCartData.appendChild(cartMDiv);

  updateTotalPrice(cartData);

 
  const quantityInput = cartMDiv.querySelector(".input");
  const incrementButton = cartMDiv.querySelector(".cartIncre");
  const decrementButton = cartMDiv.querySelector(".cartDecre");
  

  incrementButton.addEventListener("click", () => {
    itemWithQuantity.quantity++;
    quantityInput.value = itemWithQuantity.quantity;
    updateTotalPrice(cartData);
  });

  decrementButton.addEventListener("click", () => {
    console.log(decrementButton)
    if (itemWithQuantity.quantity >1) {
      console.log(itemWithQuantity)
      itemWithQuantity.quantity--;
      console.log(quantity)
      quantityInput.value = itemWithQuantity.quantity;
      console.log(quantityInput)
      updateTotalPrice(cartData);
        
    }
  });
  updateTotalPrice(cartData);
}

function createCartElement(productItem) {
  const cartMDiv = document.createElement("div");
  cartMDiv.setAttribute("id", productItem.id);
  cartMDiv.classList.add("cartStyling");

  const products = `
    <div class="cart">
      <p id="totalPrice"></p>
      <img src=${productItem.image} alt="" class="cartImg">
      <p class="cartTitle">${productItem.title.slice(0, 30)}</p>
      <p class="cartPrice">$${productItem.price}</p>
      <div class="quntit">
        <button class="cartDecre">-</button>
        <input type="text" value="1" min="1" class="input">
        <button class="cartIncre">+</button>
      </div>
      <button class="cartDelete">Delete</button>
    </div>
  `;

  cartMDiv.innerHTML = products;

  cartMDiv.querySelector(".cartDelete").addEventListener("click", () => deleteCart(productItem.id));

  return cartMDiv;
}

function deleteCart(id) {
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  const updatedCartData = cartData.filter((item) => item.id !== id);
  localStorage.setItem("cartData", JSON.stringify(updatedCartData));

  const cartDiv = document.getElementById(id);
  cartDiv.remove();

  updateTotalPrice(updatedCartData);
}

function updateTotalPrice(prices) {
  // console.log(prices)
  const totalPriceValue = prices.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // console.log(totalPriceValue)
  totalPrice.textContent = `Total Price: $${totalPriceValue.toFixed(2)}`;

}

getData();


