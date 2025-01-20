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
