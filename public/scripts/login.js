$(function () {
  // Contact Form's Submit Button was Clicked
  $("#sup-login-btn").click(function () {
    // Form Values
    const username = $("#login-name").val();
    const password = $("#login-password").val();

    let data = {
      username: username,
      password: password,
    };

    // Contructing Error Message
    let message = [];

    // Error Messages
    let noUsername =
      "hmmm. You left no username, so I don't know what your alter ego is.";
    let noPassword =
      "oh-oh! You left no password, so I can't double-check if you are who you say you are.";

    // No Usrname
    if (username === "") message.push(noUsername);

    // No Password
    if (password === "") message.push(noPassword);

    // If There is an Error Message, then We Show It
    if (message.length != 0) {
      createModal(message);
    }
    // Post Login Data to the Server
    else {
      $.post(
        "/login_post",
        data,
        // Callback Function - Message
        function (data) {
          // Remove the Orginal Animation Class and Adds the Exit Animation Class
          $(".contact-form")
            .removeClass("animate__bounceInLeft")
            .addClass("animate__bounceOutRight");

          // Checks/Waits when New Animation Ends
          $(".contact-form")[0].addEventListener("animationend", function () {
            // Stylize/Center the Contact Confirmation Message
            $(".login-confirmation").css("padding", "100px 40px 40px 40px");

            let welcomeBackMessage = `Hey ${data.username}!<br>
                welcome back! <i class="nes-icon heart"></i> We missed you!<br>
                <span id="login-afterthough"></span>`;

            $(".login-confirmation").append(welcomeBackMessage);

            // Start Afterthough Text in 3 Seconds
            setTimeout(afterthough, 3000);
          });
        },
        "json"
      );
    }
  });
});

// Helper Function: Create a Modal
function createModal(message) {
  // Construct Modal
  const modal = new bootstrap.Modal(".alert-box");
  modal.show();

  $(".pop-up-message").html(
    "<p>" + message.join('</p><p style="text-align: center;">&</p><p>') + "</p>"
  );
}

// Afterthough Text Typed
function afterthough() {
  new Typed("#login-afterthough", {
    strings: ["...<br>well, sort of."],
    typeSpeed: 100,
  });
}

/*
-------------------- References --------------------
    Check if Animation Ends - https://animate.style/
*/
