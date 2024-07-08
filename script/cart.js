const renderData = document.querySelector("#renderdata");
const dynamicCount = document.querySelector(".dynamic-count");
const totalPrice = document.getElementById("total_price");
let cartItems = JSON.parse(localStorage.getItem("cartData")) || [];

function updateTotalPrice() {
  const totalSum = cartItems.reduce((sum, item) => sum + item.price * item.quantity,0);
  totalPrice.textContent = `Subtotal(${(dynamicCount.innerHTML =cartItems.length)} items): ₹${totalSum.toFixed(3)}`;
  totalPrice.classList.add("removePriceTotal");
}

function renderCart() {
  dynamicCount.innerHTML = cartItems.length;
  renderData.innerHTML = "";

  cartItems.forEach((item, index) => {
    const productMainDiv = document.createElement("div");
    productMainDiv.classList.add("box-main");

    const createImage = document.createElement("img");
    createImage.setAttribute("src", item.image);

    const createTitle = document.createElement("p");
    // createTitle.textContent = `${item.title.slice(0, 20)}`;
    createTitle.textContent = `${item.title}`;
    createTitle.classList.add("removeTitle");

    const createDescription = document.createElement("p");
    createDescription.textContent = `${item.description.slice(0, 32)}`;
    createDescription.classList.add("removeDescription");

    const createtPrice = document.createElement("p");
    createtPrice.textContent = `$${item.price}`;
    createtPrice.classList.add("removePrice");

    const removeButton = document.createElement("button");
    removeButton.textContent = `Delete`;
    removeButton.classList.add("removeButton");

    const createInput = document.createElement("input");
    createInput.setAttribute("value", 1);
    if (typeof item.quantity !== "number" || isNaN(item.quantity)) {
      item.quantity = 1; // Set a default value\
    }
    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.classList.add("decrement-button");
    decrementButton.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        createInput.value = item.quantity;
        updateTotalPrice();
      }
    });

    const incrementButton = document.createElement("button");
    incrementButton.textContent = "+";
    incrementButton.classList.add("increment-button");
    incrementButton.addEventListener("click", () => {
      item.quantity++;
      createInput.value = item.quantity;
      updateTotalPrice();
    });

    productMainDiv.append(
      createImage,
      createTitle,
      createDescription,
      createtPrice,
      removeButton,
      decrementButton,
      createInput,
      incrementButton
    );
    renderData.append(productMainDiv);

    removeButton.addEventListener("click", () => removeItem(index));
  });
  updateTotalPrice();
}

function removeItem(index) {
  dynamicCount.innerHTML--;
  cartItems.splice(index, 1);
  localStorage.setItem("cartData", JSON.stringify(cartItems));
  renderCart();
}

renderCart();
