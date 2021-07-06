import { getOneProduct } from './API/productsApi.js';
import { getDataLocal } from './getDataLocal.js';
import { inputQuantity } from './inputToCart.js';

window.addEventListener('DOMContentLoaded', () => {
    const renderPageDetail = async () => {
        const id = new URLSearchParams(window.location.search).get('id');
        const productBodyElement = document.querySelector(
            '.product__detail--header'
        );
        let quantityNumber = 1;
        const dataLocal = getDataLocal('productID');
        if (dataLocal && dataLocal.length > 0) {
            const productData = dataLocal.find((value) => {
                return value.id === id;
            });
            quantityNumber = productData.quantity;
        }

        const dataProductInfo = await getOneProduct(id);
        const productInfo = dataProductInfo.body[0];

        const html = `
            <div class="grid wide"> 
              <div class="row"> 
                <div class="col l-4 img-wrap">
                  <div class="img__main"> <img src="./assets/img/product/${productInfo.thumbnailUrl}" alt="${productInfo.name}"></div>
                  <div class="img__similar-wrap">
                    <div class="img__similar" style="--tooltip-img:../img/product/spx2-1.png;"><img src="./assets/img/product/spx2-1.png" alt="Cây dạ lam0"></div>
                    <div class="img__similar-hover"><img src="./assets/img/product/spx2-1.png" alt="Cây dạ lam0"></div>
                    <div class="img__similar" style="--tooltip-img:../img/product/spx2-2.png;"><img src="./assets/img/product/spx2-2.png" alt="Cây dạ lam1"></div>
                    <div class="img__similar-hover"><img src="./assets/img/product/spx2-2.png" alt="Cây dạ lam1"></div>
                    <div class="img__similar" style="--tooltip-img:../img/product/spx2-3.png;"><img src="./assets/img/product/spx2-3.png" alt="Cây dạ lam2"></div>
                    <div class="img__similar-hover"><img src="./assets/img/product/spx2-3.png" alt="Cây dạ lam2"></div>
                    <div class="img__similar" style="--tooltip-img:../img/product/spx2-4.png;"><img src="./assets/img/product/spx2-4.png" alt="Cây dạ lam3"></div>
                    <div class="img__similar-hover"><img src="./assets/img/product/spx2-4.png" alt="Cây dạ lam3"></div>
                    <div class="img__similar" style="--tooltip-img:../img/product/spx2-5.png;"><img src="./assets/img/product/spx2-5.png" alt="Cây dạ lam4"></div>
                    <div class="img__similar-hover"><img src="./assets/img/product/spx2-5.png" alt="Cây dạ lam4"></div>
                  </div>
                </div>
                <div class="col l-8">
                  <div class="product__header--content">
                    <h1 class="content__title">${productInfo.name}</h1><span class="content__star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                    <div class="content__price"> <span class="content__price--sale">${productInfo.price}.000 đ</span><span class="content__price--current">${productInfo.price}.000 đ</span></div>
                    <div class="separate"></div>
                    <p class="content__dsc">${productInfo.description}</p>
                    <div class="separate"></div>
                    <div class="content__qnt quantity">
                      <label class="content__price-label" for="qnt">Số lượng</label>
                      <span class="quantity--esc id="${productInfo.id}"><i class="fas fa-minus"></i></span>
                      <input class="quantity--input" type="number" min="1" max=${productInfo.quantity} value="${quantityNumber}" onkeypress='validateNumber(event)'>
                      <span class="quantity--desc id="${productInfo.id}"><i class="fas fa-plus"></i></span>
                    </div>
                    <div class="separate"></div>
                    <div class="product__control">
                    <button class="btn btn__buy-now" id="${productInfo.id}" onclick="addToCart('${productInfo.id}')">Mua ngay</button
                      <a class="product__control-link" href=""><i class="fas fa-search icon icon--border"></i></a>
                      <input id="1" type="checkbox">
                      <label class="item__heart-label" for="1"><i class="fas fa-heart icon icon--border"></i></label>
                    </div>
                    <div class="btn__share-list"> 
                      <div class="btn__share-wrap">
                        <div class="btn__share-item" tooltip-data="10"><a href="https://www.facebook.com/" target="_blank"><img src="./assets/img/share/facebook-share-button.png" alt="Facebook"></a></div>
                        <div class="btn__share-qnt">
                          <p>10</p>
                        </div>
                      </div>
                      <div class="btn__share-wrap">
                        <div class="btn__share-item" tooltip-data="15"><a href="https://twitter.com/" target="_blank"><img src="./assets/img/share/twitter-share-button.png" alt="Twitter"></a></div>
                        <div class="btn__share-qnt">
                          <p>15</p>
                        </div>
                      </div>
                      <div class="btn__share-wrap">
                        <div class="btn__share-item" tooltip-data="20"><a href="https://www.google.com.vn/?hl=vi" target="_blank"><img src="./assets/img/share/google-plus.png" alt="Google-Plus"></a></div>
                        <div class="btn__share-qnt">
                          <p>20</p>
                        </div>
                      </div>
                      <div class="btn__share-wrap">
                        <div class="btn__share-item" tooltip-data="0"><a href="https://www.google.com/drive/" target="_blank"><img src="./assets/img/share/share.png" alt="Share"></a></div>
                        <div class="btn__share-qnt">
                          <p>0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `;
        productBodyElement.innerHTML = html;
        inputQuantity();
    };
    (() => {
        renderPageDetail();
    })();
});
