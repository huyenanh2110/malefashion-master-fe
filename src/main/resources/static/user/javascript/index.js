async function loadFeatureProducts() {
    try {
        // Gọi API để lấy dữ liệu the loai
        let {data: products} = await axios.get(
            'http://localhost:8080/api/v1/products');
        console.log(products);
        $('#product-list').empty();
        products.content.forEach(product => {
            $('#product-list').append(
                `
                    <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                <div class="product__item">
                    <div class="product__item__pic set-bg"
                         style="background-image: url(/user/img/clothes/${product.photo})"><span
                            class="label">New</span>
                        <ul class="product__hover">
                            <li><a href="#"><img th:src="@{/user/img/icon/heart.png}" alt=""></a></li>
                            <li><a href="#"><img th:src="@{/user/img/icon/compare.png}" alt=""> <span>Compare</span></a>
                            </li>
                            <li><a href="#"><img th:src="@{/user/img/icon/search.png}" alt=""></a></li>
                        </ul>
                    </div>
                    <div class="product__item__text">
                        <h6>${product.productName}</h6>
                        <a href="#" class="add-cart">+ Add To Cart</a>
                        <div class="rating">
                            <i class="fa fa-star-o"></i>
                            <i class="fa fa-star-o"></i>
                            <i class="fa fa-star-o"></i>
                            <i class="fa fa-star-o"></i>
                            <i class="fa fa-star-o"></i>
                        </div>
                        <h5>${product.price}</h5>
                        <div class="product__color__select">
                            <label for="pc-1">
                                <input type="radio" id="pc-1">
                            </label>
                            <label class="active black" for="pc-2">
                                <input type="radio" id="pc-2">
                            </label>
                            <label class="grey" for="pc-3">
                                <input type="radio" id="pc-3">
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            
`
            );
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.loadFeatureProducts()