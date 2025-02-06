// regular expressions 
const regexTitle = /^(Miss|Mr.|Mrs.)$/; 
const regExFirstName = /^[a-zA-Z]{3,30}$/;
const regExLastName = /^[a-zA-Z]{3,30}$/;
const regExEmail = /([\w\.]+)@northeastern\.edu$/;
const regExPhone = /^\(\d{3}\) \d{3}-\d{4}$/;
const regexZipcode = /^\d{5}$/;
const regexComments = /^[a-zA-Z]{2,30}$/;
const regexAddress = /^[a-zA-Z0-9, ]+$/;
const regexDynamicText = /n\/a/i;

const title = document.getElementById("title");
const feedbackForm = document.getElementById("myForm");
const submitButton = document.getElementById("submitButton");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const emailId = document.getElementById("emailId");
const phoneNumber = document.getElementById("phoneNumber");
const streetAddress1 = document.getElementById("streetAddress1");
const streetAdress2 = document.getElementById("streetAddress2");
const address2Counter = document.getElementById("address2-counter");
const zipcode = document.getElementById("zipcode");
const comments = document.getElementById("comments");
const sources = document.getElementById("source");
const drinkOptionsSelect = document.getElementById("options");
const DnyamicCheckBoxContainer = document.getElementById("DnyamicCheckBoxContainer");


streetAdress2.addEventListener("input", function () {
    const currentLength = streetAdress2.value.length;
    const maxLength = streetAdress2.maxLength;
    
    address2Counter.textContent = `${currentLength}/${maxLength} characters used`;
});
    
let isTitleValid = false, 
    isFirstNameValid = false, 
    isLastNameValid = false, 
    isEmailIDValid = false,
    isAddress1Valid = false, 
    isPhoneNumberValid = false,
    isSourceValid = false,
    isOptionValid = false, 
    isZipcodeValid = false, 
    isCommentsValid = false,
    isDynamicTextFieldValid = false;

// event listener 
feedbackForm.addEventListener("submit", submitForm);
title.addEventListener("mouseout", validateFormControls)
firstName.addEventListener("input", validateFormControls);
lastName.addEventListener("input", validateFormControls);
emailId.addEventListener("input", validateFormControls);
phoneNumber.addEventListener("input", validateFormControls);
streetAddress1.addEventListener("input", validateFormControls);
zipcode.addEventListener("input", validateFormControls);
sources.addEventListener("mouseout", validateFormControls);
drinkOptionsSelect.addEventListener("change", validateFormControls);
comments.addEventListener("input", validateFormControls);

function validateFormControls(event) {

    const value = event.target.value;
    const targetName = event.target.name;
    const targetId = event.target.id;
    const errorFieldId = `error-${targetId}`; 
    const errorField = document.getElementById(errorFieldId);

    if(targetName == "title"){
        errorField.style.display = feedbackForm.querySelector('input[name="title"]:checked') ? "none" : "block";
        isTitleValid = feedbackForm.querySelector('input[name="title"]:checked') ? true: false;
    } else if (targetName === "source") {
        errorField.style.display = feedbackForm.querySelector('input[name="source"]:checked') ? "none" : "block";
        isSourceValid = feedbackForm.querySelector('input[name="source"]:checked') ? true: false;
    } else if(targetId == "firstName") {
        errorField.style.display = value.trim().match(regExFirstName) ? "none" : "block";
        isFirstNameValid = value.trim().match(regExFirstName);
    } else if(targetId == "lastName") {
        errorField.style.display = value.trim().match(regExLastName) ? "none" : "block";
        isLastNameValid = value.trim().match(regExLastName);
    } else if(targetId == "emailId") {
        errorField.style.display = value.trim().match(regExEmail) ? "none" : "block";
        isEmailIDValid = value.trim().match(regExEmail);
    } else if (targetId == "phoneNumber") {
        errorField.style.display = value.trim().match(regExPhone) ? "none" : "block";
        isPhoneNumberValid = value.trim().match(regExPhone);
    } else if (targetId == "streetAddress1") {
        errorField.style.display = value.trim().match(regexAddress) ? "none" : "block";
        isAddress1Valid = value.trim().match(regexAddress);
    } else if (targetId == "zipcode") {
        errorField.style.display = value.trim().match(regexZipcode) ? "none" : "block";
        isZipcodeValid = value.trim().match(regexZipcode);
    } else if (targetId == "comments") {
        errorField.style.display = value.trim().match(regexComments) ? "none" : "block";
        isCommentsValid = value.trim().match(regexComments);
    } else if(targetId == "options") {
        errorField.style.display = value === "" ? "block" : "none";
        isOptionValid = true;
        DnyamicCheckBoxContainer.innerHTML = '';

    // Get selected value
        const selectedValue = drinkOptionsSelect.value;

        if (selectedValue) {
            // Create a checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = "DynamicCheckBox";
            checkbox.value = selectedValue;

            // Create a label for the checkbox
            const checkboxLabel = document.createElement("label");
            checkboxLabel.htmlFor = "DynamicCheckBox";
            checkboxLabel.innerText = `${selectedValue}*`;

            // Create a text field
            const textField = document.createElement("textarea");
            textField.rows = 5;
            textField.cols = 25;
            textField.id = "dynamicTextField";
            textField.placeholder = `Write a review for ${selectedValue}`;
            textField.required = true; // Make it mandatory

            const dynamicErrorField = document.createElement("div");
            dynamicErrorField.id = "error-text";
            dynamicErrorField.style.color = "red";
            dynamicErrorField.style.display= "none";
            dynamicErrorField.value = "Please write a review or N/A, if none";
            
            DnyamicCheckBoxContainer.appendChild(dynamicErrorField);

            // Event listener for the dynamic text field validation
            textField.addEventListener("mouseout", function(event) {
                const value = event.target.value;
                dynamicErrorField.style.display = value === "" ? "block" : "none";
                dynamicErrorField.textContent = "Please write a review or N/A, if none"; // Set error message
                // Enable/disable submit button based on all validations
                if(value === "")
                    submitButton.disabled = true;
            });

            // Append checkbox and label to the container
            DnyamicCheckBoxContainer.appendChild(checkbox);
            DnyamicCheckBoxContainer.appendChild(checkboxLabel);

            // Listen for checkbox change event
            checkbox.addEventListener("change", function() {
                if (checkbox.checked) {
                // Show text field when checkbox is checked
                 DnyamicCheckBoxContainer.appendChild(textField);
                } else {
                    // Remove text field when checkbox is unchecked
                    if (DnyamicCheckBoxContainer.contains(textField)) {
                        DnyamicCheckBoxContainer.removeChild(textField);
                        dynamicErrorField.style.display = "none"; // Hide error message if checkbox is unchecked
                        isDynamicTextFieldValid = false; // Reset validity
                    }
                }
            });
        }
    }
    submitButton.disabled = !(isTitleValid && isFirstNameValid && isLastNameValid && isEmailIDValid && isPhoneNumberValid && isAddress1Valid && isZipcodeValid && isSourceValid && isOptionValid && isCommentsValid);
}

function submitForm(event) {
    if(isFirstNameValid && isLastNameValid && isEmailIDValid && isPhoneNumberValid && isAddress1Valid && isZipcodeValid && isCommentsValid) {
        alert("Form Submitted Successfully !!!");
    } else {
        alert("Enter valid details");
    }
    event.preventDefault();

    const tableTitle = document.querySelector('input[name="title"]:checked').value;
    const tableFirstName = firstName.value;
    const tableLastName = lastName.value;
    const tableEmail = emailId.value;
    const tablePhoneNumber = phoneNumber.value;
    const tableAddress1 = streetAddress1.value;
    const tableAddress2 = streetAdress2.value;
    const tableDrinkOption = drinkOptionsSelect.value;
    const dynamicTextField = document.getElementById("dynamicTextField");
    const tableDynamicTextValue = dynamicTextField ? dynamicTextField.value : 'None'; // Fallback in case the field doesn't exist
    const tableZip = zipcode.value;
    const tableComments = comments.value;

    const sources = Array.from(document.querySelectorAll('input[name="source"]:checked')).map(checkbox => checkbox.value).join(', ') || 'None';

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${tableTitle}</td>
        <td>${tableFirstName}</td>
        <td>${tableLastName}</td>
        <td>${tableEmail}</td>
        <td>${tablePhoneNumber}</td>
        <td>${tableAddress1}</td>
        <td>${tableAddress2}</td>
        <td>${tableDrinkOption}</td>
        <td>${tableDynamicTextValue}</td>
        <td>${tableZip}</td>
        <td>${sources}</td>
        <td>${tableComments}</td>
    `;
    document.querySelector('#resultTable tbody').appendChild(row);

    // Clear form fields
    feedbackForm.reset();
    submitButton.disabled = true;
}
