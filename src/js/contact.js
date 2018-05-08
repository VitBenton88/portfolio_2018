//function for clearing out contact form
clearForm = () => {

  const contactForm = $('#contactForm');
  const inputNormalColor = 'rgba(255,255,255, 0.3)'

  for (let i = 0; i < contactForm.length; i++) {
    contactForm[i].reset();
  };
  $("#name, #email, #message").css('background-color', inputNormalColor);
};

//function for alerting when contact form is not properly filled out
formAlert = () => {
  alert(

    `Message not sent. Please make sure the form is filled out correctly.\n\n
          • Make sure each field is filled.\n
          • Make sure the provided email is in the correct format:\n
          - e.g. example@example.com`
  );
};

//warning formatting
formWarning = () => {
  let nameInput = $("#name").val().trim();
  let emailInput = $("#email").val().trim();
  let messageInput = $("#message").val().trim();
  const inputWarningColor = 'rgba(255, 228, 178, 0.9)'

  if (nameInput == '') {
    $("#name").css('background-color', inputWarningColor);
  }

  if (emailInput == '') {
    $("#email").css('background-color', inputWarningColor);
  }

  if (messageInput == '') {
    $("#message").css('background-color', inputWarningColor);
  }
};

// contact form validator function
formVal = () => {

  let nameInput = $("#name").val().trim();
  let emailInput = $("#email").val().trim();
  let messageInput = $("#message").val().trim();

  if (nameInput == '' || emailInput == '' || messageInput == '') {
    formWarning();
    return false;

  } else {

    return true;
  };
};

//handle contact form submissions
contactSendBtn.on("click", () => {

  event.preventDefault();

  if (formVal()) {

    let contactForm = $('#contactForm');
    let nameInput = $("#name").val().trim();
    let emailInput = $("#email").val().trim();
    let messageInput = $("#message").val().trim();

    let newMessage = {
      name: nameInput,
      email: emailInput,
      message: messageInput
    };


    $.post("/contact", newMessage)
      .done((data) => {
        if (data === true) {
          alert("Thanks for contacting");
          clearForm();
        } else {
          formAlert();
        };

      });

  } else {
    formAlert();
  };

});
