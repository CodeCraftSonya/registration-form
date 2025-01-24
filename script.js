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

const images = ["desert.jpg", "galaktika2.jpg", "blue-desert2.png"];
let currentIndex = 0;

const imageElement = document.querySelector(".page__image"); // Элемент с изображением
const prevButton = document.querySelector(".slider__prev"); // Кнопка назад
const nextButton = document.querySelector(".slider__next"); // Кнопка вперед

// Функция для обновления изображения
function updateImage() {
  imageElement.src = images[currentIndex];

  // Обновляем видимость кнопок в зависимости от индекса
  if (currentIndex === 0) {
    prevButton.style.display = "none"; // Скрываем кнопку "назад", если первая картинка
    nextButton.style.display = "block"; // Показываем кнопку "вперед"
  } else if (currentIndex === images.length - 1) {
    nextButton.style.display = "none"; // Скрываем кнопку "вперед", если последняя картинка
    prevButton.style.display = "block"; // Показываем кнопку "назад"
  } else {
    prevButton.style.display = "block"; // Показываем кнопку "назад" для всех картинок
    nextButton.style.display = "block"; // Показываем кнопку "вперед" для всех картинок
  }
}

// Функция для переключения на следующее изображение
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
}

// Функция для переключения на предыдущее изображение
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
}

// Слушатели событий для кнопок
nextButton.addEventListener("click", nextImage);
prevButton.addEventListener("click", prevImage);

// Инициализируем отображение при загрузке страницы
updateImage();
