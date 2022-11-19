let productsBackup = [];

fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(function(data) {

    document.querySelector("#search").value = "";

    let htmlStr = `
    <div>Select products category</div>
    <ul>
      <li>All</li>
      ${data.reduce(function (html, product) {
      if (!html.includes(product.category)) {
        html += '<li>' + product.category + '</li>';
      }
      return html;
      }, "")}
    </ul>`;
    
    document.querySelector(".custom-dropdown").innerHTML = htmlStr;

    productsBackup = data.map(function (element) {
        return {
          image: element.image,
          title: element.title,
          category: element.category,
          price: element.price
        }
    });
    
    renderProducts(productsBackup);

});

function renderProducts(productsBackup) {
  
  let htmlStr = "";
  for (let product of productsBackup) {
   
    htmlStr += `
    <div class="col-sm-3">
      <div class = "product">
        <div>
          <img class = "card-img-top" src="${product.image}" alt = "Product image" title = "${product.title}">
        </div>
        <h5 class="card-title">${product.title}</h5>
        <p>Category: ${product.category}</p>
        <div class = "price">$${product.price}</div>
      </div>
    </div>`
  }

  document.querySelector("#products").innerHTML = htmlStr;

}

document.querySelector("#search").onkeyup = function (event) {
  let searchValue = event.currentTarget.value.trim().toLowerCase();
  filterProducts(searchValue);
};

function filterProducts(searchValue) {
  let filteredProducts = productsBackup.filter(function (product) {
    return product.title.toLowerCase().indexOf(searchValue) >= 0 || product.category.toLowerCase().indexOf(searchValue) >= 0;
  });
  renderProducts(filteredProducts);
}
