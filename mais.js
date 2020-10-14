
var modal = document.getElementById("myModal");
var formElem = document.getElementById("form");

var formfields = document.getElementById("formFeilds");

var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("myBtn2");
var btn3 = document.getElementById("myBtn3");
var submitting = false;

var thankyouSection = document.getElementById("thankyouSection");

var contactMethod = document.getElementById("contactMethod");
var emailCon = document.getElementById("emailContainer");
var phoneCon = document.getElementById("phoneContainer");
var whatsAppCon = document.getElementById("whatsAppContainer");
var spinner = document.getElementById("spinner");
var errorDiv = document.getElementById("error");
var submitButton = document.getElementById("submitButton");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};
btn2.onclick = function () {
  modal.style.display = "block";
};
btn3.onclick = function () {
  modal.style.display = "block";
};


span.onclick = function () {
  errorDiv.style.display = "none";
  modal.style.display = "none";
  formfields.style.display = "block";
  thankyouSection.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal && !submitting) {
    errorDiv.style.display = "none";
    modal.style.display = "none";
    formfields.style.display = "block";
    thankyouSection.style.display = "none";
  }
};
//showField
const showField = (data) => {
  switch (data) {
    case "email": {
      contactMethod = "email";
      document.getElementById("email").required = true;
      document.getElementById("phone").required = false;
      document.getElementById("whatsApp").required = false;
      phoneCon.style.display = "none";
      whatsAppCon.style.display = "none";
      emailCon.style.display = "block";
      break;
    }
    case "phone": {
      contactMethod = "phone";
      document.getElementById("email").required = false;
      document.getElementById("phone").required = true;
      document.getElementById("whatsApp").required = false;
      phoneCon.style.display = "block";
      whatsAppCon.style.display = "none";
      emailCon.style.display = "none";
      break;
    }
    case "whatsApp": {
      contactMethod = "whatsApp";
      document.getElementById("email").required = false;
      document.getElementById("phone").required = false;
      document.getElementById("whatsApp").required = true;
      phoneCon.style.display = "none";
      whatsAppCon.style.display = "block";
      emailCon.style.display = "none";
      break;
    }
    case "none": {
      document.getElementById("email").required = false;
      document.getElementById("phone").required = false;
      document.getElementById("whatsApp").required = false;
      phoneCon.style.display = "none";
      whatsAppCon.style.display = "none";
      emailCon.style.display = "none";
    }
    default: {
      return 0;
    }
  }
};
formElem.onsubmit = async (e) => {
  submitting = true;
  spinner.style.display = "block";
  submitButton.disabled = true;
  var name = document.getElementById("name").value;
  e.preventDefault();

  let object = {
    name: name,
    contactMethod: `${contactMethod} ${
      document.getElementById(contactMethod).value
    }`,
  };

  let response = await fetch(
    "https://gwhb7l31r0.execute-api.eu-central-1.amazonaws.com/default/clinicsMailerFunction",
    {
      method: "POST",
      body: JSON.stringify(object),
    }
  );

  if (response.status == 200) {
    fbq("track", "Lead");
    showField("none");
    formElem.reset();
    formfields.style.display = "none";
    thankyouSection.style.display = "grid";
  } else {
    errorDiv.style.display = "block";
  }
  submitting = false;
  submitButton.disabled = false;
  spinner.style.display = "none";
};