const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkPasswordValidity = (password) => {
  const passwordRegex = /^[a-zA-Z0-9]{8,}$/;
  return passwordRegex.test(password);
};

const checkDateValidity = (date) => {
  const today = new Date();
  const birthDate = new Date(date);

  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 18;
};

const passwordField = document.getElementById("password");

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.name === "password") {
    if (!checkPasswordValidity(inputElement.value)) {
      showInputError(
        formElement,
        inputElement,
        "Пароль должен быть не менее 8 символов и содержать только латинские буквы и цифры.",
      );
      return;
    }
  }

  if (inputElement.name === "password-confirm") {
    if (inputElement.value !== passwordField.value) {
      showInputError(
        formElement,
        inputElement,
        "Пароли не совпадают. Убедитесь, что вы ввели их правильно.",
      );
      return;
    }
  }

  if (inputElement.name === "birth-day") {
    if (!checkDateValidity(inputElement.value)) {
      showInputError(
        formElement,
        inputElement,
        "Вы должны быть старше 18 лет для регистрации.",
      );
      return;
    }
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".registration__input"),
  );
  const buttonElement = formElement.querySelector(".registration__submit");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".registration__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();

      const inputList = Array.from(
        formElement.querySelectorAll(".registration__input"),
      );
      const isValid = inputList.every((inputElement) => {
        if (inputElement.name === "password") {
          return checkPasswordValidity(inputElement.value);
        } else if (inputElement.name === "password-confirm") {
          return inputElement.value === passwordField.value;
        } else if (inputElement.name === "birth-day") {
          return checkDateValidity(inputElement.value);
        }
        return inputElement.validity.valid;
      });

      if (isValid) {
        alert("Вы успешно зарегистрированы!");
        formElement.reset();
        const buttonElement = formElement.querySelector(
          ".registration__submit",
        );
        toggleButtonState(inputList, buttonElement);
      }
    });

    setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    if (inputElement.name === "password") {
      return !checkPasswordValidity(inputElement.value);
    }
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("button_inactive");
    buttonElement.disabled = false;
  }
};

enableValidation();

const registrationLink = document.querySelector(".registration__link");
registrationLink.addEventListener("click", function (evt) {
  evt.preventDefault();
});

const images = ["desert.jpg", "galaktika2.jpg", "blue-desert2.png"];
let currentIndex = 0;

const imageElement = document.querySelector(".page__image");
const prevButton = document.querySelector(".slider__prev");
const nextButton = document.querySelector(".slider__next");

function updateImage() {
  imageElement.src = images[currentIndex];

  if (currentIndex === 0) {
    prevButton.style.display = "none";
    nextButton.style.display = "block";
  } else if (currentIndex === images.length - 1) {
    nextButton.style.display = "none";
    prevButton.style.display = "block";
  } else {
    prevButton.style.display = "block";
    nextButton.style.display = "block";
  }
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
}

nextButton.addEventListener("click", nextImage);
prevButton.addEventListener("click", prevImage);

updateImage();
