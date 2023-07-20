//SELECTORS
const cardCvc = document.querySelector(".ooo");
const cardNumber = document.querySelector(".oooo");
const cardName = document.querySelector(".cardName");
const cardMonth = document.querySelector(".month");
const cardYear = document.querySelector(".year");
const inputName = document.querySelector("#inputName");
const inputMonth = document.querySelector("#inputMonth");
const inputYear = document.querySelector("#inputYear");
const inputNumber = document.querySelector("#inputNumber");
const inputCvc = document.querySelector("#inputCvc");
const confBtn = document.querySelector(".confirm-btn");
const cardinp = document.querySelector(".cardinp");
const cvcDiv = document.querySelector(".cvc");
const dateDiv = document.querySelector(".ceevee");
const nameDiv = document.querySelector(".nameDiv");
const numberDiv = document.querySelector(".numDiv");
const specDiv = document.querySelector(".dateDiv");
// console.log(specDiv);
// const valMessage = document.querySelectorAll(".validationMessage");

// Add event listeners to form inputs
inputNumber.addEventListener("input", updateCardNumber);
inputName.addEventListener("input", updateCardName);
inputMonth.addEventListener("input", updateExpiryDate);
inputYear.addEventListener("input", updateExpiryDate);
inputCvc.addEventListener("input", updateCVC);
confBtn.addEventListener("click", confirm);

// - Receive error messages when the form is submitted if:

// - View the optimal layout depending on their device's screen size
// - See hover, active, and focus states for interactive elements on the page

// - Update the details on the card as the user fills in the fields

// Update card number display
function updateCardNumber() {
  const groups = inputNumber.value.match(/.{1,4}/g);
  cardNumber.textContent = "";
  cardNumber.textContent = groups.join(" ");
}

// Update card name display
function updateCardName() {
  if (inputName.length <= 20) {
    cardName.textContent = inputName;
  } else {
    cardName.textContent = inputName.value.slice(0, 20);
  }
}

// Update expiry date display
function updateExpiryDate() {
  cardMonth.textContent = inputMonth.value;
  cardYear.textContent = inputYear.value;
}

// Update CVV display
function updateCVC() {
  cardCvc.textContent = inputCvc.value;
}

// - Any input field is empty

function confirm() {
  const isError = isBlank() || isCorrect();
  if (!isError) {
    const boxIn = document.querySelector(".box-in");
    boxIn.classList.add("complete");
    boxIn.innerHTML =
      "<h1>Thank you</h1><h4>We've added your card details</h4>";
    // boxIn.classList.add("complete");
    // compDiv.appendChild(boxIn);
  }
}

function isBlank() {
  let isError = false;

  if (inputCvc.value.trim() === "") {
    createErrorMessage("Can't be blank", cvcDiv);
    cvcDiv.classList.add("redBorder");
    isError = true;
  } else {
    removeErrorMessage(cvcDiv);
    cvcDiv.classList.remove("redBorder");
  }

  if (inputName.value.trim() === "") {
    createErrorMessage("Can't be blank", nameDiv);
    nameDiv.classList.add("redBorder");
    isError = true;
  } else {
    removeErrorMessage(nameDiv);
    nameDiv.classList.remove("redBorder");
  }

  if (inputNumber.value.trim() === "") {
    createErrorMessage("Can't be blank", numberDiv);
    numberDiv.classList.add("redBorder");
    isError = true;
  } else {
    removeErrorMessage(numberDiv);
    numberDiv.classList.remove("redBorder");
  }

  //   if (inputMonth.value.trim() === "" || inputYear.value.trim() === "") {
  //     createErrorMessage("Can't be blank", dateDiv);
  //     dateDiv.classList.add("redBorder");
  //     isError = true;
  //   } else {
  //     removeErrorMessage(dateDiv);
  //     dateDiv.classList.remove("redBorder");
  //   }

  if (inputMonth.value.trim() === "" || inputYear.value.trim() === "") {
    createErrorMessage("Can't be blank", dateDiv);
    specDiv.classList.add("redBorder");
    isError = true;
  } else {
    removeErrorMessage(dateDiv);
    specDiv.classList.remove("redBorder");
  }

  return isError;
}

function isCorrect() {
  let isError = false;

  if (!/^\d{3}$/.test(inputCvc.value)) {
    createErrorMessage("CVC must be 3 digits", cvcDiv);
    isError = true;
  } else {
    removeErrorMessage(cvcDiv);
  }

  if (!/^[A-Za-z]+$/.test(inputName.value)) {
    createErrorMessage("Name must contain only alphabets", nameDiv);
    isError = true;
  } else {
    removeErrorMessage(nameDiv);
  }

  if (!/^\d{16}$/.test(inputNumber.value)) {
    createErrorMessage("Number must be 16 digits", numberDiv);
    isError = true;
  } else {
    removeErrorMessage(numberDiv);
  }

  if (!/^\d{2}$/.test(inputMonth.value) || !/^\d{2}$/.test(inputYear.value)) {
    createErrorMessage("Expiry date must be 2 digits", dateDiv);
    isError = true;
  } else {
    removeErrorMessage(dateDiv);
  }

  return isError;
}

function createErrorMessage(message, parentElement) {
  removeErrorMessage(parentElement);
  const errMsg = document.createElement("h4");
  errMsg.textContent = message;
  errMsg.classList.add("errMsg");
  parentElement.appendChild(errMsg);
}

function removeErrorMessage(parentElement) {
  const errMsg = parentElement.querySelector(".errMsg");
  if (errMsg) {
    parentElement.removeChild(errMsg);
  }
}

// If any of the input is blank, add create a new html element and append to that particular input indicating the error
