var productServices = new ProductServices();
var listProduct = [];
var cart = new Cart();

// Set dữ liệu cho local storage
function setLocalStorage() {
  var dataString = JSON.stringify(cart.productArr);
  localStorage.setItem("CART", dataString);
}

// Get dữ liệu cho local storage
function getLocalStorage() {
  if (localStorage.getItem("CART") != undefined) {
    var dataString = localStorage.getItem("CART");
    cart.productArr = JSON.parse(dataString);
    renderCart(cart.productArr);
  }
}

getLocalStorage();
console.log(listProduct);
console.log(cart.productArr);

function getEle(id) {
  return document.getElementById(id);
}

// Render list products
function renderProducts(data) {
  var content = "";
  data.forEach((product, index) => {
    content += `
    <div class="col-6 col-md-3 col-lg-3">
            <div class="card">
              <img
                class="card-img-top"
                src="${product.img}"
                alt="Card image"
                style="width: 100%"
              />
              <div class="card-body">
                <h4 class="card-title">${product.name}</h4>
                <p class="card-text">${product.desc}</p>
                <p class="card-text">${product.price}$</p>
                <a href="#" class="btn btn-primary" onclick="addProductToCart(${index})">Add to cart</a>
              </div>
            </div>
          </div>
`;
  });
  getEle("product__container").innerHTML = content;
}

// Get list product from api
function getListProduct() {
  productServices
    .getListProductApi()
    .then(function (result) {
      var data = result.data;
      data.forEach((product) => {
        listProduct.push(product);
      });
      renderProducts(listProduct);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProduct();

// Filter products
getEle("chooseProduct").addEventListener("change", function () {
  var type = getEle("chooseProduct").value;
  listFilterProduct = listProduct;
  if (type !== "") {
<<<<<<< Updated upstream
    listFilterProduct = productList.filter(function (product) {
=======
    isFiltered = true;
    listFilterProduct = listProduct.filter(function (product) {
>>>>>>> Stashed changes
      return product.type.toLowerCase() === type.toLowerCase();
    });
  }
  renderProducts(listFilterProduct);
});

// render Cart
function renderCart(data) {
  var content = ``;
  var totalPriceInCart = 0;
  if (data.length === 0) {
    content += "Giỏ hàng trống";
  } else {
    data.forEach(function (product, index) {
      var products = product;
      totalPriceInCart += product.totalPrice;
      content += `<div class="media border p-3">
      <img
        src="${product.img}"
        alt=""
        style="width: 60px"
      />
      <div
        class="media-body d-flex justify-content-around align-items-center"
        style="height: 60px"
      >
        <small>
          <i>${product.name}</i>
        </small>
        <button onclick="decreaseProductQuantity(${index})">
          <i class="fa-solid fa-chevron-left" style="line-height: 25px"></i>
        </button>
        <p class="mb-0">${product.quantity}</p>
        <button onclick="increaseProductQuantity(${index})">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
        <small>
          <i>${product.totalPrice}$</i>
        </small>
        <button class="delete" onclick="removeProduct(${index})">
          <i
            class="fa-solid fa-trash-can"
            style="transition: all 0.3s ease-in"
          ></i>
        </button>
      </div>
    </div>
    `;
    });
  }
  getEle("cart").innerHTML =
    content +
    `<div class="purchaseBtnContainer pt-3">
    <p>Tổng tiền: ${totalPriceInCart}$</p>
        <button class="btn btn-success" onclick="purchase()">Thanh toán</button>
    </div>`;
}

// Add product to cart
function addProductToCart(index) {
<<<<<<< Updated upstream
  var product = productList[index];
=======
  if (!isFiltered) {
    var product = listProduct[index];
    var isAdded = false;
    for (let i = 0; i < cart.productArr.length; i++) {
      var phone = cart.productArr[i];
      if (product.id === phone.id) {
        phone.quantity += 1;
        var totalPrice = phone.quantity * phone.price;
        phone.totalPrice = totalPrice;
        isAdded = true;
        break;
      }
    }
    if (!isAdded) {
      product.quantity = 1;
      var totalPrice = product.quantity * product.price;
      product.totalPrice = totalPrice;
      cart.productArr.push(product);
    }
    setLocalStorage();
    renderCart(cart.productArr);
    return;
  }
  var product = listFilterProduct[index];
>>>>>>> Stashed changes
  var isAdded = false;
  for (let i = 0; i < cart.productArr.length; i++) {
    var phone = cart.productArr[i];
    if (product.id === phone.id) {
      phone.quantity += 1;
      var totalPrice = phone.quantity * phone.price;
      phone.totalPrice = totalPrice;
      isAdded = true;
      break;
    }
  }
  if (!isAdded) {
    product.quantity = 1;
    var totalPrice = product.quantity * product.price;
    product.totalPrice = totalPrice;
    cart.productArr.push(product);
  }
  setLocalStorage();
  renderCart(cart.productArr);
}

// Remove Product form Cart
function removeProduct(index) {
  cart.deleteProduct(index);
  setLocalStorage();
  renderCart(cart.productArr);
}

// Increase quantity
function increaseProductQuantity(index) {
  var product = cart.productArr[index];
  product.quantity += 1;
  var totalPrice = product.quantity * product.price;
  product.totalPrice = totalPrice;
  product = cart.productArr[index];
  setLocalStorage();
  renderCart(cart.productArr);
}

// Decrease quantity
function decreaseProductQuantity(index) {
  var product = cart.productArr[index];
  if (product.quantity === 1) {
    removeProduct(index);
  } else {
    product.quantity -= 1;
    var totalPrice = product.quantity * product.price;
    product.totalPrice = totalPrice;
  }
  product = cart.productArr[index];
  setLocalStorage();
  renderCart(cart.productArr);
}

function purchase() {
  cart.purchase();
  setLocalStorage();
  renderCart(cart.productArr);
}
