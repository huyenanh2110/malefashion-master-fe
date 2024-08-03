let currentCategoryId = 1;
let size = 6;
let itemList = [];
if (localStorage.getItem("items")) {
    itemList = JSON.parse(localStorage.getItem("items"));
}


async function loadProducts(categoryId ='', page = 0, sort = 'asc') {
    try {
        let {data: response} = await axios.get(`http://localhost:8080/api/v1/products/category?id=${categoryId}&page=${page}&size=${size}&sort=${sort}`);
        let products = response.content;
        console.log(products)
        $('#product-row').empty();
        products.forEach(product => {
            console.log(product.productName);
            console.log(product.productId);
            console.log(product.photo);
            console.log(product.price);

            $('#product-row').append(`
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="product__item">
                            <div class="product__item__pic set-bg"  style="background-image: url(/user/img/clothes/${product.photo})">
                                <ul class="product__hover">
                                    <li><a href="#"><img th:src="@{/user/img/icon/heart.png}" alt=""></a></li>
                                    <li><a href="#"><img src="img/icon/compare.png" alt=""> <span>Compare</span></a>
                                    </li>
                                    <li><a href="#"><img src="img/icon/search.png" alt=""></a></li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6>${product.productName}</h6>
                                <a href="#" class="add-cart" id="add-to-cart-${product.productId}">+ Add To Cart</a>
                                <div class="rating">
                                    <i class="fa fa-star-o"></i>
                                    <i class="fa fa-star-o"></i>
                                    <i class="fa fa-star-o"></i>
                                    <i class="fa fa-star-o"></i>
                                    <i class="fa fa-star-o"></i>
                                </div>
                                <h5>$${product.price}</h5>
                                <div class="product__color__select">
                                    <label for="pc-4">
                                        <input type="radio" id="pc-4">
                                    </label>
                                    <label class="active black" for="pc-5">
                                        <input type="radio" id="pc-5">
                                    </label>
                                    <label class="grey" for="pc-6">
                                        <input type="radio" id="pc-6">
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
            
            `)
            let addToCart = document.getElementById(
                `add-to-cart-${product.productId}`);
            addToCart.addEventListener('click', async () => {
                const newItem = {
                    product: product,
                    quantity: 1,
                    price: product.price
                }
                if (itemList !== null) {
                    const index = itemList.findIndex(
                        item => item.product.productId === newItem.product.productId);
                    if (index !== -1) {
                        const quantityChange = itemList[index].quantity + 1;
                        itemList[index].quantity = quantityChange;
                        itemList[index].price = itemList[index].quantity * newItem.price;
                    } else {
                        itemList.push(newItem);
                    }
                }
                localStorage.setItem("items", JSON.stringify(itemList));
                getAmount();
                getCount();
                swal.fire("Added to cart!");
            });

        });

        $('.product__pagination').empty();
        for (let i = 0; i < response.totalPages; i++) {
            if (page === i) {
                $('.product__pagination').append(`
                    <a class="active" onclick="loadProducts('${categoryId}', ${i})">${i}</a>
                `)
            } else {
                $('.product__pagination').append(`
                    <a onclick="loadProducts('${categoryId}', ${i})">${i}</a>
                `)
            }

        }

        // // Set total products
        // $('.productQuantity').text(response.totalElements);

        //Sort Event
        $('.productSorting').off('change').on('change', function () {
            loadProducts(categoryId, page, this.value);
        });


    } catch (error) {
        console.error('Error loading products:', error);
    }
}
async function loadCategoryToGrid() {
    try {
        let {data: response} = await axios.get(`http://localhost:8080/api/v1/categories`);
        let categories = response;
        let result = '';
        categories.forEach(category => {
            result += `
                 <li><a id="category-grid-${category.categoryId}" href="#">${category.categoryName}</a></li>
            `;
        })
        document.getElementById('category-shop-grid-menu').innerHTML = result;

        categories.forEach(category => {
            // let categoryId = document.getElementById(`category-gird-${category.categoryId}`).value;
            document.getElementById(`category-grid-${category.categoryId}`).addEventListener('click',
                async function ()  {
                    let categoryId = category.categoryId;
                    console.log(categoryId)
                    loadProducts(categoryId, page = 0);
                })
        })
    } catch (error) {
        logger.error(error.message);
    }
}

window.loadCategoryToGrid();
window.loadProducts();

