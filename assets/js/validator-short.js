import toast from './toast-message.js';
import { handleCart } from './handleCart.js';

function Validator(formSelector) {
    // Lấy selector cha
    const getParent = (element, selector) => {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    };

    const formRules = {};

    // Quy ước
    const validatorRules = {
        required: (value) => {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email: (value) => {
            const regex =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            return regex.test(value) ? undefined : 'Trường này phải là email';
        },
        min: (min) => {
            return (value) => {
                return value.length >= min
                    ? undefined
                    : `Vui lòng nhập tối thiểu ${min} kí tự`;
            };
        },
        phone: (value) => {
            const regex =
                /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;

            return regex.test(value)
                ? undefined
                : 'Trường này phải là số điện thoại';
        },
        address: (value) => {
            const regex = /^\d+\s[A-z]+\s[A-z]+/g;

            return regex.test(value) ? undefined : 'Trường này phải là địa chỉ';
        },
        credit: (value) => {
            const regex =
                /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

            return regex.test(value)
                ? undefined
                : 'Trường này phải là số thẻ tín dụng';
        },
    };

    // Lấy form element trong DOM theo 'formSelector'
    const formElement = document.querySelector(formSelector);

    // Chỉ xử lí khi có element trong form
    if (formElement) {
        const inputs = formElement.querySelectorAll('[name][rules]');

        // Hàm thực hiện validate
        var handleValidate = (e) => {
            const rules = formRules[e.target.name];
            var errorMessage;
            for (let rule of rules) {
                errorMessage = rule(e.target.value);
                if (errorMessage) break;
            }

            // Nếu có lỗi thì hiển thị message lỗi
            if (errorMessage) {
                const formGroup = getParent(e.target, '.form-group');
                if (formGroup) {
                    formGroup.classList.add('invalid');
                    const formMessage =
                        formGroup.querySelector('.form-message');
                    if (formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }
            return !errorMessage;
        };
        // Hàm clear message error
        const handleClearError = (e) => {
            const formGroup = getParent(e.target, '.form-group');
            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');

                const formMessage = formGroup.querySelector('.form-message');

                if (formMessage) {
                    formMessage.innerText = '';
                }
            }
        };

        for (let input of inputs) {
            const rules = input.getAttribute('rules').split('|');

            for (let rule of rules) {
                let ruleInfo;
                const isRuleHasValue = rule.includes(':');

                if (isRuleHasValue) {
                    ruleInfo = rule.split(':');

                    rule = ruleInfo[0];
                }
                let ruleFunc = validatorRules[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [validatorRules[rule]];
                }
            }
            // Lắng nghe sự kiện đẻ validate

            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }
    }
    // Xử lí hành vi submit form
    formElement.onsubmit = (e) => {
        e.preventDefault();

        const inputs = formElement.querySelectorAll('[name][rules]');
        let isValid = true;

        for (let input of inputs) {
            if (
                !handleValidate({
                    target: input,
                })
            ) {
                isValid = false;
            }
        }
        if (isValid) {
            if (typeof this.onSubmit === 'function') {
                const enableInputs = formElement.querySelectorAll(
                    '[name]:not([disabled])'
                );

                const formValues = Array.from(enableInputs).reduce(
                    (values, input) => {
                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector(
                                    'input[name="' + input.name + '"]:checked'
                                ).value;
                                break;
                            case 'checkbox':
                                if (input.matches(':checked')) return values;

                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);

                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;

                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    },
                    {}
                );
                // Gọi lại hàm onSubmit và trả về Data
                this.onSubmit(formValues);

                const elementsFormPay = document.querySelector('.main');
                const otherButtonElement =
                    document.querySelector('.btn--other');

                const overplayElement =
                    elementsFormPay.querySelector('.overplay');
                overplayElement.classList.add('display-block');
                otherButtonElement.addEventListener('click', () => {
                    toast({
                        title: 'Đặt hàng thành công!',
                        message: 'Cảm ơn bạn đã đặt hàng trên GreenShop',
                        type: 'success',
                        duration: 3000,
                    });
                    localStorage.clear();
                    handleCart();
                    overplayElement.classList.remove('display-block');
                    elementsFormPay.classList.remove('display');
                });
            } else {
                formElement.submit();
            }
        }
    };
}

export default Validator;
