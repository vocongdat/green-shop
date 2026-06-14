import '../js/app.js'
import { Validator } from '../js/validator.js'
import { toast } from '../js/toast.js'
import { $ } from '../js/utils.js'

document.addEventListener('DOMContentLoaded', () => {
  if (!$('#contact-form')) return
  new Validator('#contact-form', {
    onSubmit: (values, form) => {
      toast({ title: 'Đã gửi lời nhắn', message: 'Cảm ơn bạn! Green Shop sẽ phản hồi sớm.', type: 'success' })
      form.reset()
    },
  })
})
