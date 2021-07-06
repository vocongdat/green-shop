import { getSliceProduct } from './API/productsApi.js';
import { $ } from './variables.js';

const handleShowProductFeatured = async () => {
    const productsFeaturedElement = $('.products__featured');
    const data = await getSliceProduct();
    const products = data.body;
    const html = `
            <div class="grid wide">
                <div class="row">
                <div class="col l-12 m-12 c-12">
                    <h2 class="products__title">Sản phẩm nổi bật</h2>
                    <div class="separate"></div>
                </div>
                <div class="col l-6 m-12 c-12 px-0">
                    <div class="col l-12 m-12 c-12">
                    <div class="product">
                        <div class="product__header">
                            <div class="product__header-img"><img src="./assets/img/product/${products[0].thumbnailUrl}" alt="${products[0].name}"></div>
                            <div class="form__control">
                                <button class="btn btn__buy-now" id="${products[0].id}" onclick="addToCart('${products[0].id}')">Mua ngay</button>
                                <a class="icon__link-search" href="/products-detail.html?id=${products[0].id}">
                                    <i class="fas fa-search icon icon--detail"></i>
                                </a>
                            </div>
                        </div>
                        <div class="product__body">
                        <p class="product__name">${products[0].name}</p><span class="product__star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></span>
                        <p class="product__dsc"></p>
                        <div class="product__price"><span class="product__price-sale">${products[0].price}.000 đ</span><span class="product__price-current">${products[0].price}.000 đ</span>
                        </div>
                        <div class="product__control"><a class="btn btn__buy-now" href="cart.html">Mua ngay</a><a href="products-detail.html"><i class="fas fa-search icon icon--detail icon--border"></i></a>
                            <input type="checkbox" name="Cây chân chim">
                            <label class="item__heart-label"><i class="fas fa-heart icon icon--border"></i></label>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col l-12 m-12 c-12">
                    <div class="row mx-0 products__small-mobile">
                        <div class="col l-6 m-6 c-12">
                        <div class="product">
                            <div class="product__header">
                                <div class="product__header-img"><img src="./assets/img/product/${products[1].thumbnailUrl}" alt="${products[1].name}"></div>
                                <div class="form__control">
                                    <button class="btn btn__buy-now" id="${products[1].id}" onclick="addToCart('${products[1].id}')">Mua ngay</button>
                                    <a class="icon__link-search" href="/products-detail.html?id=${products[1].id}">
                                        <i class="fas fa-search icon icon--detail"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="product__body">
                            <p class="product__name">${products[1].name}</p><span class="product__star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                            <p class="product__dsc"></p>
                            <div class="product__price"><span class="product__price-sale">${products[1].price}.000 đ</span><span class="product__price-current">${products[1].price}.000 đ</span>
                            </div>
                            <div class="product__control"><a class="btn btn__buy-now" href="cart.html">Mua ngay</a><a href="products-detail.html"><i class="fas fa-search icon icon--detail icon--border"></i></a>
                                <input type="checkbox" name="Cây dạ lam">
                                <label class="item__heart-label"><i class="fas fa-heart icon icon--border"></i></label>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="col l-6 m-6 c-12">
                        <div class="product">
                            <div class="product__header">
                                <div class="product__header-img"><img src="./assets/img/product/${products[2].thumbnailUrl}" alt="${products[2].name}"></div>
                                <div class="form__control">
                                    <button class="btn btn__buy-now" id="${products[2].id}" onclick="addToCart('${products[2].id}')">Mua ngay</button>
                                    <a class="icon__link-search" href="/products-detail.html?id=${products[2].id}">
                                        <i class="fas fa-search icon icon--detail"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="product__body">
                            <p class="product__name">${products[2].name}</p><span class="product__star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                            <p class="product__dsc"></p>
                            <div class="product__price"><span class="product__price-sale">${products[2].price}.000 đ</span><span class="product__price-current">${products[2].price}.000 đ</span>
                            </div>
                            <div class="product__control"><a class="btn btn__buy-now" href="cart.html">Mua ngay</a><a href="products-detail.html"><i class="fas fa-search icon icon--detail icon--border"></i></a>
                                <input type="checkbox" name="Cây danh dự">
                                <label class="item__heart-label"><i class="fas fa-heart icon icon--border"></i></label>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col l-6 m-12 c-12">
                    <div class="col l-12 m-12 c-12">
                    <div class="row mx-0 products__small-mobile">
                        <div class="col l-6 m-6 c-12 ps-0">
                        <div class="product">
                            <div class="product__header">
                                <div class="product__header-img"><img src="./assets/img/product/${products[3].thumbnailUrl}" alt="${products[3].name}"></div>
                                <div class="form__control">
                                    <button class="btn btn__buy-now" id="${products[3].id}" onclick="addToCart('${products[3].id}')">Mua ngay</button>
                                    <a class="icon__link-search" href="/products-detail.html?id=${products[3].id}">
                                        <i class="fas fa-search icon icon--detail"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="product__body">
                            <p class="product__name">${products[3].name}</p><span class="product__star"><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></span>
                            <p class="product__dsc"></p>
                            <div class="product__price"><span class="product__price-sale">${products[3].price}.000 đ</span><span class="product__price-current">${products[3].price}.000 đ</span>
                            </div>
                            <div class="product__control"><a class="btn btn__buy-now" href="cart.html">Mua ngay</a><a href="products-detail.html"><i class="fas fa-search icon icon--detail icon--border"></i></a>
                                <input type="checkbox" name="Cây cọ ta">
                                <label class="item__heart-label"><i class="fas fa-heart icon icon--border"></i></label>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="col l-6 m-6 c-12 pe-0">
                        <div class="product">
                            <div class="product__header">
                                <div class="product__header-img"><img src="./assets/img/product/${products[4].thumbnailUrl}" alt="${products[4].name}"></div>
                                <div class="form__control">
                                    <button class="btn btn__buy-now" id="${products[4].id}" onclick="addToCart('${products[4].id}')">Mua ngay</button>
                                    <a class="icon__link-search" href="/products-detail.html?id=${products[4].id}">
                                        <i class="fas fa-search icon icon--detail"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="product__body">
                            <p class="product__name">${products[4].name}</p><span class="product__star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                            <p class="product__dsc"></p>
                            <div class="product__price"><span class="product__price-sale">${products[4].price}.000 đ</span><span class="product__price-current">${products[4].price}.000 đ</span>
                            </div>
                            <div class="product__control"><a class="btn btn__buy-now" href="cart.html">Mua ngay</a><a href="products-detail.html"><i class="fas fa-search icon icon--detail icon--border"></i></a>
                                <input type="checkbox" name="Cây dứa nhỏ">
                                <label class="item__heart-label"><i class="fas fa-heart icon icon--border"></i></label>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col l-12 m-12 c-12 pe-0 ps-0">
                    <div class="product">
                        <div class="product__header">
                            <div class="product__header-img"><img src="./assets/img/product/${products[5].thumbnailUrl}" alt="${products[5].name}"></div>
                            <div class="form__control">
                                <button class="btn btn__buy-now" id="${products[5].id}" onclick="addToCart('${products[5].id}')">Mua ngay</button>
                                <a class="icon__link-search" href="/products-detail.html?id=${products[5].id}">
                                    <i class="fas fa-search icon icon--detail"></i>
                                </a>
                            </div>
                        </div>
                        <div class="product__body">
                        <p class="product__name">${products[5].name}</p><span class="product__star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                        <p class="product__dsc"></p>
                        <div class="product__price"><span class="product__price-sale">${products[5].price}.000 đ</span><span class="product__price-current">${products[5].price}.000 đ</span>
                        </div>
                        <div class="product__control"><a class="btn btn__buy-now" href="cart.html">Mua ngay</a><a href="products-detail.html"><i class="fas fa-search icon icon--detail icon--border"></i></a>
                            <input type="checkbox" name="Cây đa búp nhỏ">
                            <label class="item__heart-label"><i class="fas fa-heart icon icon--border"></i></label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `;
    productsFeaturedElement.innerHTML = html;
};

(() => {
    handleShowProductFeatured();
})();
