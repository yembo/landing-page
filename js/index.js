var lander = {
  // Declare page element variables
  modal1: null,
  modal2: null,
  modal3: null,
  modal4: null,
  modal5: null,
  modal6: null,
  modal7: null,
  modal8: null,
  modalShowBtn: null,
  modalShowBtnMobile: null,
  modalCloseBtn: null,
  modalPrevBtn1: null,
  modalPrevBtn2: null,
  modal2SubmitBtn: null,
  modal4RecordingBtn: null,
  modal4NotHomeButton: null,
  $form1: null,
  $form3: null,
  $form6: null,
  moveDate: null,
  remindDate: null,
  beds: null,
  phoneInput: null,
  phoneInputPluginInstance: null,
  phoneErrorMap: [],
  modal6SetRemainderButton: null,
  modal6GoBackButton: null,
  error: null,
  payload: {
    consumer:{},
    move:{},
    origin:{},
    destination:{},
  },
  postUrl: null,

  // Svgs
  themeSvgs: [],

  init: function () {
    // Initialize the page element variables
    lander.modal1 = document.querySelector("#quote-modal1");
    lander.modal2 = document.querySelector("#quote-modal2");
    lander.modal3 = document.querySelector("#quote-modal3");
    lander.modal4 = document.querySelector("#quote-modal4");
    lander.modal5 = document.querySelector("#quote-modal5");
    lander.modal6 = document.querySelector("#quote-modal6");
    lander.modal7 = document.querySelector("#quote-modal7");
    lander.modal8 = document.querySelector("#quote-modal8");
    lander.modalShowBtn = document.querySelectorAll(".show-quote-button");
    lander.modalCloseBtn = document.querySelector(".close");
    lander.modalPrevBtn1 = document.querySelector("#prev-btn-form2");
    lander.modalPrevBtn2 = document.querySelector("#prev-btn-form3");
    lander.modal2SubmitBtn = document.querySelector("#form2-continue-button");
    lander.modal4RecordingBtn = document.querySelector("#form4-recording-button");
    lander.modal4NotHomeButton = document.querySelector("#form4-not-home-button");
    lander.modal6SetRemainderButton = document.querySelector("#form6-set-remainder-button");
    lander.modal6GoBackButton = document.querySelector("#form6-go-back-button");
    lander.moveDate = document.querySelector("#moveDate");
    lander.remindDate = document.querySelector("#remindDate");
    lander.beds = document.querySelectorAll(".bedroom-options .option");
    lander.phoneInput = document.querySelector("#phone");
    lander.themeSvgs = document.querySelectorAll(".theme-svg");

    // Make value change based on environment
    lander.postUrl = "https://api-us.mariner.yembo.ai/initial-params/";

    // jQuery form objects where jQuery.validate() is needed
    lander.$form1 = jQuery("#form1");
    lander.$form3 = jQuery("#form3");
    lander.$form6 = jQuery("#form6");

    // Init phone input plugin
    lander.phoneInput.style.width = "100%";
    lander.phoneInputPluginInstance = window.intlTelInput(lander.phoneInput, {
      separateDialCode: true,
      utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.3/build/js/utils.js",
    });
    lander.phoneErrorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
    // Add a custom method to jQuery validator for phone validation
    jQuery.validator.addMethod("phone-custom", function (value, element, params) {
      return this.optional(element) || lander.isPhoneValid() == true;
    }, jQuery.validator.format("Please enter a valid phone number"));
  },

  setEventHandlers: function () {
    // Show the modal
    lander.modalShowBtn.forEach(occurence => {
      occurence.addEventListener('click', (e) => {
        lander.modal1.style.display = "flex";
      });
    });

    // Note for using jQuery validator:
    // 1. Always have a <form> element wrapping the input fields for the validation plugin to work properly
    // 2. Handle form submit for such forms by attaching a handler to the submitHandler property of the options object passed to jQuery validate() method

    // form-1
    lander.$form1.validate({
      errorElement: "span",
      errorClass: "form-error-message",
      submitHandler: function (form) {
        // Store form values to payload
        lander.payload.origin.zip = document.querySelector("#originZip").value;
        lander.payload.destination.zip = document.querySelector("#destinationZip").value;
        lander.payload.move.date = document.querySelector("#moveDate").value;
        lander.payload.move.dateKnown = true;
        // Show next modal
        lander.modal1.style.display = "none";
        lander.modal2.style.display = "flex";
        return false;
      },
    });

    // Click on number of beds
    lander.beds.forEach(occurence => {
      occurence.addEventListener('click', (e) => {
        var clickedElement = e.target;
        var errorMsg = document.querySelector(".error-beds");
        var allBedElements = clickedElement.parentElement.children;
        // remove existing selection from all bed buttons
        Array.from(allBedElements).forEach(node => {
          node.classList.remove("active");
        });
        e.target.classList.add("active");
        // Save value to payload
        lander.payload.origin.beds = clickedElement.innerHTML;
        // Remove error messages if shown
        errorMsg.classList.remove("show-true");
        errorMsg.classList.add("show-false");
        return false;
      });
    });

    // Validate & Submit form2 
    lander.modal2SubmitBtn.onclick = function () {
      // Validate if beds are selected
      if (lander.payload.origin.beds !== undefined) {
        lander.modal2.style.display = "none";
        lander.modal3.style.display = "flex";
      } else {
        // Show error message
        var errorMsg = document.querySelector(".error-beds");
        errorMsg.classList.remove("show-false");
        errorMsg.classList.add("show-true");
      }
    };
    lander.modalPrevBtn1.onclick = function () {
      lander.modal2.style.display = "none";
      lander.modal1.style.display = "flex";
    };

    // form-3

    // Validate and submit
    lander.$form3.validate({
      errorElement: "span",
      errorClass: "form-error-message",
      submitHandler: function (form) {
        var welcomeName = document.querySelector("#replace-with-name");
        // Store form values to payload
        lander.payload.consumer.givenName = document.querySelector("#givenName").value;
        lander.payload.consumer.familyName = document.querySelector("#familyName").value;
        lander.payload.consumer.phone = lander.phoneInputPluginInstance.getNumber(); // Returns number with country code
        lander.payload.consumer.email = document.querySelector("#email").value;
        // Set the welcome name for the next form
        welcomeName.innerHTML = lander.payload.givenName;
        // Show next modal
        lander.modal3.style.display = "none";
        lander.modal4.style.display = "flex";
        return false;
      },
    });

    // Go back to prev modal
    lander.modalPrevBtn2.onclick = function () {
      lander.modal3.style.display = "none";
      lander.modal2.style.display = "flex";
    };

    // form-4

    // Show 'Record now' modal
    lander.modal4RecordingBtn.onclick = function () {
      lander.modal4RecordingBtn.setAttribute("disabled", "disabled");
      lander.payload.move.expectedSurveyDate = new Date(Date.now() + 6 * 60 * 1000).toISOString(); //6 minutes in the future to ensure the invite sends
      lander.sendPayload(function () {
        // on Success
        lander.modal4.style.display = "none";
        lander.modal5.style.display = "flex";
        lander.modal4RecordingBtn.removeAttribute("disabled");
        lander.resetFormInputs();
      },
        function () {
          // on Error
          lander.modal4.style.display = "none"
          lander.modal5.style.display = "none"
          lander.modal8.style.display = "flex"
          lander.modal4RecordingBtn.removeAttribute("disabled");
        });
    };

    // Show 'Not Home' modal
    lander.modal4NotHomeButton.onclick = function () {
      lander.modal4.style.display = "none";
      lander.modal5.style.display = "none";
      lander.modal6.style.display = "flex";
    };

    // Validate 'Not home' form and submit
    lander.$form6.validate({
      errorElement: "span",
      errorClass: "form-error-message",
      submitHandler: function (form) {
        var showRemindDateSpan = document.querySelector("#showRemindDate");
        var remindDate = document.querySelector("#remindDate");
        var remindDateTime = new Date(remindDate.value);
        var inSixMinutes = new Date(Date.now() + 6 * 60 * 1000);
        remindDateTime = inSixMinutes > remindDateTime ? inSixMinutes : remindDateTime; //make sure the expected survey date is at least 6 minutes in the future
        // Store form values to payload
        lander.payload.move.expectedSurveyDate = remindDateTime.toISOString();
        // Show reminder date to show back to the user in the next modal
        showRemindDateSpan.innerHTML = remindDateTime.toLocaleString("default",
          { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" });
        lander.modal6SetRemainderButton.setAttribute("disabled", "disabled");
        lander.sendPayload(function () {
          // on success
          lander.modal6.style.display = "none";
          lander.modal7.style.display = "flex";
          lander.modal6SetRemainderButton.removeAttribute("disabled");
          lander.resetFormInputs();
        },
          function () {
            // on Error
            lander.modal6.style.display = "none"
            lander.modal8.style.display = "flex"  
            lander.modal6SetRemainderButton.removeAttribute("disabled");
          }
        );
        return false;
      },
    });

    // Close modal
    lander.modalCloseBtn.onclick = function () {
      lander.modal1.style.display = "none";
    };

    // Go back
    lander.modal6GoBackButton.onclick = function () {
      lander.modal6.style.display = "none";
      lander.modal4.style.display = "flex";
    };
  },

  setCurrentDate: function () {
    // Set the current date in first form
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;
    lander.moveDate.value = today;
  },

  setCurrentDateTime: function () {
    // Set the current date and time in the 'Not home' form
    var now = new Date();
    lander.remindDate.value = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toJSON().slice(0, 16);
  },

  // Method to check validity of phone number using the intltelinput plugin's built in method isValidNumber()
  isPhoneValid: function () {
    var phone = document.querySelector("#phone");
    var phoneErrorMsg = document.querySelector("#error-phone");

    if (phone.value.trim()) {
      if (lander.phoneInputPluginInstance.isValidNumber()) {
        return true;
      } else {
        var errorCode = lander.phoneInputPluginInstance.getValidationError();
        return false;
      }
    }
  },

  // Method to apply color theme to svgs
  themeify: function () {
    // Convert themeSvgs HTML Collection to regular Array & fetch the theme svgs from their source urls
    Array.from(lander.themeSvgs).forEach(function (element) {
      // Parse source urls
      var svgUrl = element.getAttribute("data-svg-src");

      fetch(svgUrl)
        .then((r) => r.text())
        .then((text) => {
          // Load the svgs inline via js so that the company-theme style classes within the svg files are applied
          element.innerHTML = text;
        })
        .catch(console.error.bind(console));
    });
  },

  // Method to Send the payload
  sendPayload: function (handleSuccess, handleFailure) {
    // using fetch
    fetch(lander.postUrl, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lander.payload),
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.status && data.status.length > 0 && data.status[0].type) {
          if(data.status[0].type === 'ok'){
            console.log('Success:', data);
            handleSuccess();
          }else{
            console.error('Error:', data);
            handleFailure();
          }
        }else{
          console.error('Error:', error);
          handleFailure();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        handleFailure();
      });

  },
  resetFormInputs: function () {
    // reset all form fields to their default state
  }
};

jQuery(document).ready(function () {
  lander.init();
  lander.setEventHandlers();
  lander.setCurrentDate();
  lander.setCurrentDateTime();
  lander.themeify();
});
