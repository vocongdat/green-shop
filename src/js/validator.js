// Form validator — ports the legacy rule system (required, email,
// min, phone, address, credit) with the same form-group / .field /
// .form-message DOM contract used by the new markup.

export const Rules = {
  required: (value) => (value ? undefined : 'Vui lòng nhập trường này'),
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : 'Email không hợp lệ',
  min: (value, length) =>
    value.length >= length ? undefined : `Vui lòng nhập tối thiểu ${length} ký tự`,
  phone: (value) =>
    /^(0|\+84)(\s?\d){9,10}$/.test(value.replace(/\s/g, ''))
      ? undefined
      : 'Số điện thoại không hợp lệ',
  address: (value) =>
    /^\d+\s+\D+/.test(value.trim()) ? undefined : 'Địa chỉ chưa hợp lệ (vd: 123 Phố Vườn)',
  credit: (value) =>
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/.test(
      value.replace(/\s/g, '')
    )
      ? undefined
      : 'Số thẻ không hợp lệ',
}

export class Validator {
  constructor(formSelector, { onSubmit } = {}) {
    this.form = document.querySelector(formSelector)
    if (!this.form) return
    this.onSubmit = onSubmit
    this._init()
  }

  _parseRules(input) {
    const raw = input.getAttribute('rules') || ''
    return raw
      .split('|')
      .filter(Boolean)
      .map((r) => {
        const [name, arg] = r.split(':')
        return { name, arg, fn: Rules[name] }
      })
      .filter((r) => typeof r.fn === 'function')
  }

  _validateInput(input) {
    const group = input.closest('.form-group')
    if (!group) return true
    const msgEl = group.querySelector('.form-message')
    let message
    for (const rule of this._parseRules(input)) {
      message = rule.fn(input.value.trim(), rule.arg)
      if (message) break
    }
    if (message) {
      group.classList.add('invalid')
      if (msgEl) msgEl.textContent = message
      return false
    }
    group.classList.remove('invalid')
    if (msgEl) msgEl.textContent = ''
    return true
  }

  _init() {
    const inputs = () => [...this.form.querySelectorAll('[rules]')]
    inputs().forEach((input) => {
      input.addEventListener('blur', () => this._validateInput(input))
      input.addEventListener('input', () => {
        const group = input.closest('.form-group')
        group?.classList.remove('invalid')
        const msg = group?.querySelector('.form-message')
        if (msg) msg.textContent = ''
      })
    })

    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      const ok = inputs()
        .map((i) => this._validateInput(i))
        .every(Boolean)
      if (!ok) {
        const firstInvalid = this.form.querySelector('.form-group.invalid [rules]')
        firstInvalid?.focus()
        return
      }
      const values = this._collect()
      this.onSubmit?.(values, this.form)
    })
  }

  _collect() {
    const data = {}
    this.form.querySelectorAll('[name]').forEach((el) => {
      if (el.disabled) return
      const { name, type, value, checked } = el
      if (type === 'radio') {
        if (checked) data[name] = value
      } else if (type === 'checkbox') {
        data[name] = data[name] || []
        if (checked) data[name].push(value)
      } else {
        data[name] = value
      }
    })
    return data
  }
}

export default Validator
