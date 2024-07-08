let renderData = document.getElementById("renderdata");
// let renderCartData = document.querySelector(".rendercartdata");
let dynamicCount = document.querySelector(".dynamic-count");

// Data get api?
async function getData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log(data);
    renderProducts(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

let arr = localStorage.getItem("cartData")
  ? JSON.parse(localStorage.getItem("cartData"))
  : [];
// console.log(arr)
dynamicCount.innerHTML = arr.length; // Update the cart count

function renderProducts(data) {
  data.forEach((products) => {
    // Creating Main Element
    let productMainDiv = document.createElement("div");
    productMainDiv.setAttribute("class", "box-main");

    //Create Image
    let createImage = document.createElement("img");
    createImage.src = products.image;
    // createImage.classList.add("myimage");

    //Create Titel
    let cretaTitle = document.createElement("p");
    cretaTitle.textContent = `${products.title.slice(0, 30)}...`;
    cretaTitle.classList.add("addTitle");

    //Create Description
    let createDescription = document.createElement("p");
    createDescription.textContent = `${products.description.slice(0, 32)}...`;
    createDescription.classList.add("addDecription");

    //Create Price
    let createPrice = document.createElement("p");
    createPrice.textContent = `₹${products.price.toFixed(2)}`;
    createPrice.classList.add("addPrice");

    //Create Button
    let addButton = document.createElement("button");
    addButton.textContent = `Add to Cart`;
    addButton.classList.add("addButton");

    //Appending Element main div;
    productMainDiv.append(
      createImage,
      cretaTitle,
      createDescription,
      createPrice,
      addButton
    );
    renderData.append(productMainDiv);

    // addButton.addEventListener("click", () => {
    //   const isItemExist = arr.find((item) => item.id === products.id);
    //   if (isItemExist) {
    //     alert("Product Already Added");
    //     return;
    //   }
    //   arr.push(products);
    //   console.log(arr)

    //   localStorage.setItem("cartData", JSON.stringify(arr));
    //   // alert("Product Added");
    //   dynamicCount.innerHTML++;

    // });

    addButton.addEventListener("click", () => {
      const isItemExist = arr.find((item) => item.id === products.id);
      if (isItemExist) {
        alert("Product Already Added");
        window.location.href = "cart.html";
        return;
      }
      arr.push(products);
      localStorage.setItem("cartData", JSON.stringify(arr));
      alert("Product Added");
      dynamicCount.innerHTML = arr.length; // Update the cart count dynamically
      // window.location.href='item.html'
    });
  });
}

getData();
