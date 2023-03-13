const reg = document.querySelector(".donate-but.registratrion");
const modal = document.querySelector(".myModal");
const myBody = document.querySelector(".forModal");
const overModal = document.querySelector(".overModal");
const showPass = document.querySelector(".showPass");
const pswd = document.querySelector(".pswd");
const errorMessage = document.querySelector(".error-message");
const subBut = document.querySelector(".subBut");
const formSend = document.querySelector(".form-send");

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
  e.stopPropagation();
  pswd.type = "text";
});

showPass.addEventListener("pointerup", (e) => {
  e.stopPropagation();
  pswd.type = "password";
});

pswd.addEventListener("blur", (e) => {
  e.stopPropagation();
  if (pswd.value === "") {
    errorMessage.classList.add("hidden-er");
    errorMessage.textContent = "Поле обязательно для заполнения";
    pswd.setCustomValidity("Поле обязательно для заполнения");
  } else if (pswd.value.length < 6) {
    errorMessage.classList.add("hidden-er");
    errorMessage.textContent = "Пароль должен быть не менее 6 символов";
    pswd.setCustomValidity("Пароль должен быть не менее 6 символов");
  } else {
    errorMessage.classList.remove("hidden-er");
    pswd.setCustomValidity("");
  }
});
