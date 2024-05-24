const inputsPhone = document.querySelectorAll('[name="phone"]');

function inputValue() {
  if (this.value.substr(0, 1) === '8' || this.value.substr(0, 1) === '7') {
    this.value = this.value.replace(this.value.substr(0, 1), '+7 (');
  }
}

function initMaskLetter(name, param) {
  let mask = Maska.create(name, {
    mask: param
  });
}

inputsPhone.forEach((e) => {
  e.addEventListener('input', inputValue);
  initMaskLetter(e, '+7 (###) ###-##-##');
});