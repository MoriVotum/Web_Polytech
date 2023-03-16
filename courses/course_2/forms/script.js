const reg = document.querySelector(".donate-but.registratrion");
const modal = document.querySelector(".myModal");
const myBody = document.querySelector(".forModal");
const overModal = document.querySelector(".overModal");
const showPass = document.querySelector(".showPass");
const pswd = document.querySelector(".pswd");
const errorMessage = document.querySelector(".error-message");
const subBut = document.querySelector(".subBut");
const formSend = document.querySelector(".form-send");
const mail = document.querySelector(".mail");

let s = "";

function closeModal() {
  const overlay = document.querySelector(".overlay");
  overlay.parentNode.removeChild(overlay);
  document.body.style.overflow = "auto";
}

function alToggle() {
  modal.classList.toggle("hidden");
  myBody.classList.toggle("scroll");
  overModal.classList.toggle("overlay");
}

reg.addEventListener("click", (e) => {
  e.stopPropagation();
  alToggle();
});

overModal.addEventListener("click", (e) => {
  e.stopPropagation();
  alToggle();
  errorMessage.classList.remove("hidden-er");
});

modal.addEventListener("click", (e) => {
  e.stopPropagation();
});

showPass.addEventListener("click", (e) => {
  e.preventDefault();
});

// Отправка формы

formSend.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formSend);
  const data = Object.fromEntries(formData.entries());

  console.log(data);

  alToggle();
  errorMessage.classList.remove("hidden-er");
});

showPass.addEventListener("pointerdown", (e) => {
  pswd.type = "text";
});

showPass.addEventListener("pointerup", (e) => {
  pswd.type = "password";
});

function errors()
{
  s = "";
  if (mail.value === "") {
    errorMessage.classList.add("hidden-er");
    s += "Почта обязательна для заполнения\n";
    mail.setCustomValidity("Почта обязательна для заполнения\n");
  }
  if (mail.validity.typeMismatch) {
    errorMessage.classList.add("hidden-er");
    s += "Почта заполнена неправильно\n";
    mail.setCustomValidity("Почта заполнена неправильно\n");
  }
  if (pswd.value === "") {
    errorMessage.classList.add("hidden-er");
    s += "Пароль обязателен для заполнения ";
    pswd.setCustomValidity("Пароль обязателен для заполнения ");
  } else if (pswd.value.length < 6) {
    errorMessage.classList.add("hidden-er");
    s += "Пароль должен быть не менее 6 символов ";
    pswd.setCustomValidity("Пароль должен быть не менее 6 символов");
  }

  if (mail.value === "" || pswd.value === "" || pswd.value.length < 6 || mail.validity.typeMismatch) {
    errorMessage.textContent = s;
  } else {
    errorMessage.classList.remove("hidden-er");
    pswd.setCustomValidity("");
    mail.setCustomValidity("");
  }
}

pswd.addEventListener("blur", (e) => {
  errors();
});

mail.addEventListener("blur", (e) => {
  errors();
});
