function Cart() {
  this.productArr = [];

  this.addProductToCart = function (product) {
    this.productArr.push(product);
  };

  this.deleteProduct = function (id) {
    this.productArr.splice(id, 1);
  };

  this.calTotalPrice = function () {
    var totalPriceInCart = 0;
    this.productArr.forEach(function (product) {
      totalPriceInCart += product.totalPrice;
    });
    return totalPriceInCart;
  };

  this.purchase = function () {
    if (this.productArr.length === 0) {
      alert("Vui lòng chọn sản phẩm muốn mua");
      return;
    }
    this.productArr = [];
    alert("Thanh toán thành công");
  };
}
