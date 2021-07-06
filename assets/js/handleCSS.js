export const handleLayOutButton = () => {
    const btnLayoutElement = document.querySelectorAll('.icon__layout');
    for (let itemBtn of btnLayoutElement) {
        itemBtn.onclick = (e) => {
            if (e.target === btnLayoutElement[0]) {
                const isCheck = e.target.classList.contains('icon--active');
                if (!isCheck) {
                    e.target.classList.add('icon--active');
                    btnLayoutElement[1].classList.remove('icon--active');
                }
            } else {
                const isCheck = e.target.classList.contains('icon--active');
                if (!isCheck) {
                    e.target.classList.add('icon--active');
                    btnLayoutElement[0].classList.remove('icon--active');
                }
            }
        };
    }
};

export const handlePayment = () => {
    const checkedMoney = document.querySelector('#money');
    const checkedCard = document.querySelector('#card');
    const creditElements = document.querySelector('.credit-form');
    const formElements = document.querySelector('#form-1');
    checkedMoney.addEventListener('click', () => {
        if (checkedMoney.checked) {
            creditElements.querySelector('.form-label').remove();
            creditElements.querySelector('.form-control').remove();
            creditElements.querySelector('.form-message').remove();
        }
    });
    checkedCard.addEventListener('click', () => {
        let html;

        if (checkedCard.checked) {
            html = `
              <label class="form-label" for="credit">Nhập tài khoản ngân hàng của bạn</label>
              <input class="form-control" id="credit" name="credit" rules="required|credit" type="text" placeholder="VD: 4045...."><span class="form-message"></span>
            `;
        }
        creditElements.innerHTML = html;
    });
};
