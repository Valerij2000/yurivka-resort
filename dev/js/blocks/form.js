document.addEventListener("DOMContentLoaded", (event) => {
  const form = document.querySelector('#telegram-form');
  const TOKEN = '7081774459:AAEDBWQPhiX6xV89RMvn1m6Xe_MAuNrpt3Q';
  const CHAT_ID = '-1002211069743';
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let message = `<b>Заявка с сайта:</b>\n`;
    message += `<b>Номер отправителя: </b>${this.phone.value}\n`;
    message += `<b>Дата заезда: </b>${this.checkIn.value}\n`;
    message += `<b>Дата выезда: </b>${this.checkOut.value}\n`;
    message += `<b>Взрослые: </b>${this.adults.value}\n`;
    message += `<b>Дети: </b>${this.children.value}`;
    postData(URI_API, {
        chat_id: CHAT_ID,
        parse_mode: 'html',
        text: message
      })
      .then((data) => {
        $('#modal-success').modal('show');
        this.phone.value = '';
        this.checkIn.value = '';
        this.checkOut.value = '';
        this.adults.value = '1';
        this.children.value = '0';
      })
      .catch((err) => {
        $('#modal-fail').modal('show');
        console.log(err);
      })
  })
});