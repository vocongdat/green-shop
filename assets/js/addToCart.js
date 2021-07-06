const addToCart = (id) => {
    const dataLocal = localStorage.getItem('productID');
    const productID = JSON.parse(dataLocal) || [];
    const isHasID = productID.find((idProduct) => idProduct.id === id);
    const quantityElement = document.querySelector('.quantity--input');

    if (!isHasID && !quantityElement) {
        productID.push({ id: id, quantity: 1 });
    } else if (!isHasID && quantityElement) {
        productID.push({
            id: id,
            quantity: quantityElement.value,
        });
        location.assign('./cart.html');
    } else {
        if (quantityElement) {
            isHasID.quantity = Number(quantityElement.value);
            location.assign('./cart.html');
        } else {
            isHasID.quantity = isHasID.quantity + 1;
        }
    }
    toast({
        title: 'Thành công!',
        message: 'Bạn đã thêm thành công sản phẩm vào giỏ hàng',
        type: 'success',
        duration: 2000,
    });
    localStorage.setItem('productID', JSON.stringify(productID));
};

function toast({ title = '', message = '', type = 'info', duration = 3000 }) {
    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div');

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: 'fas fa-check-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-circle',
            error: 'fas fa-exclamation-circle',
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                <div class="toast__icon">
                    <i class="${icon}"></i>
                </div>
                <div class="toast__body">
                    <h3 class="toast__title">${title}</h3>
                    <p class="toast__msg">${message}</p>
                </div>
                <div class="toast__close">
                    <i class="fas fa-times"></i>
                </div>
            `;
        main.appendChild(toast);
    }
}
