const form = document.querySelector(".forms");

const queryPrimary = document.querySelector("#GeneralEnquiry")
const radioPrimary = document.querySelector("#radio-1")

const querySecondary = document.querySelector("#SupportRequest")
const radioSecondary = document.querySelector("#radio-2")

const inputs = form.querySelectorAll("input");

const emailInput = document.getElementById('email-area');
const textarea = document.getElementById("textarea-message");
const checkbox = document.getElementById("permission-checkbox");

const emailRegex = /^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/

queryPrimary.addEventListener('click', ()=>{
    radioPrimary.checked =true;
    queryPrimary.classList.add('query-selected')
    queryPrimary.value = "General Enquiry"
    querySecondary.classList.remove('query-selected')
    let erro = findError('querytype-error')
    erro.textContent = ""
})

querySecondary.addEventListener('click', ()=>{
    radioSecondary.checked = true;
    querySecondary.classList.add('query-selected')
    querySecondary.value = "Support Request"
    queryPrimary.classList.remove('query-selected')
    let erro = findError('querytype-error')
    erro.textContent = ""
})


function showError(element, message) {

  const error = element.parentElement.querySelector(".error-message");

  element.classList.add("required-element");
  error.textContent = message;

}

function clearError(element) {

  const error = element.parentElement.querySelector(".error-message");

  element.classList.remove("required-element");
  error.textContent = "";

}

form.addEventListener("submit", (e) => {

  inputs.forEach((input) => {

    if (!input.value.trim()) {
      e.preventDefault();
      showError(input,input.dataset.required)
    }
  });

  if (!emailRegex.test(emailInput.value.trim())) {
    e.preventDefault();
    showError(emailInput,"Please enter a valid email address.")
  }

  if (!textarea.value.trim()) {
    e.preventDefault();
    textarea.classList.add("required-element");
    let erro = document.getElementById("textarea-error");
    erro.textContent = textarea.dataset.required;
  }

  if (radioPrimary.checked == false && radioSecondary.checked == false) {
    e.preventDefault();
    const error = document.getElementById("querytype-error");
    error.textContent = "Please select a query type.";
  }

  if (checkbox.checked == false || checkbox.value === null) {
    e.preventDefault();
    const error = document.getElementById("checkbox-error");
    error.textContent = checkbox.dataset.required;
  }

});

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.trim() != null) {
      clearError(input);
    }
  });
});

textarea.addEventListener("input", () => {
  if (textarea.value.trim() != null) {
    clearError(textarea);
  }
});

checkbox.addEventListener("change", () => {
  if (radioPrimary.checked != false || radioSecondary.checked != false) {
    const error = document.getElementById("checkbox-error");
    error.textContent = "";
  }
});

