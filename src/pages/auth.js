import '../js/app.js'
import { Validator } from '../js/validator.js'
import { toast } from '../js/toast.js'
import { $ } from '../js/utils.js'

document.addEventListener('DOMContentLoaded', () => {
  if ($('#login-form')) {
    new Validator('#login-form', {
      onSubmit: () => {
        toast({ title: 'Đăng nhập thành công', message: 'Chào mừng bạn trở lại Green Shop!', type: 'success' })
        setTimeout(() => (location.href = 'index.html'), 900)
      },
    })
  }

  if ($('#register-form')) {
    new Validator('#register-form', {
      onSubmit: (values, form) => {
        const pwd = form.querySelector('[name="password"]')?.value
        const confirm = form.querySelector('[name="confirm"]')?.value
        if (pwd !== confirm) {
          const group = form.querySelector('[name="confirm"]').closest('.form-group')
          group.classList.add('invalid')
          group.querySelector('.form-message').textContent = 'Mật khẩu xác nhận không khớp'
          return
        }
        toast({ title: 'Đăng ký thành công', message: 'Tài khoản của bạn đã sẵn sàng.', type: 'success' })
        setTimeout(() => (location.href = 'login.html'), 1000)
      },
    })
  }
})
