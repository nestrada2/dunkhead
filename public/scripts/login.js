$(function () 
{
    // Contact Form's Submit Button was Clicked
    $('#yep-btn').click(function () {
        // Form Values
        let username = $('#login-name').val(), password = $('#login-password').val();

        let data = {
            username: username,
            password: password
        }

        // Contructing Error Message
        let message = [];

        // No Usrname
        if (username === "") {
            // Build Error Message
            message.push("hmmm. You left no username, so I don't know what your alter ego is.");
        }

        // No Password
        if (password === "") 
        {
            // Build Error Message
            message.push("oh-oh! You left no password, so I can't double-check if you are who you say you are.");
        }
        // Not a Valid password: Regex
        // else if (!/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
        //     // Build Error Message
        //     message.push("oh-no! You didn't provide a valid email, so if I respond to you, you will not receive it.");
        // }

        // If There is an Error Message, then We Show It
        if (message.length != 0) 
        {
            // Construct Modal
            const modal = new bootstrap.Modal('.alert-box');
            modal.show();

            $(".pop-up-message").html('<p>' + message.join('</p><p style="text-align: center;">&</p><p>') + '</p>');
        }
        // Post Login Data to the Server
        else {
            $.post('/login_post', data,
                // Callback Function - Message
                function (data) 
                {
                    // Remove the Orginal Animation Class and Adds the Exit Animation Class
                    $('.contact-form').removeClass("animate__bounceInLeft").addClass("animate__bounceOutRight");

                    // Checks/Waits when New Animation Ends
                    $('.contact-form')[0].addEventListener('animationend', function () 
                    {
                        // Stylize/Center the Contact Confirmation Message
                        $('.login-confirmation').css("padding", "100px 40px 40px 40px");

                        $(".login-confirmation").append(`Hey ${data.username}!<br>
                        welcome back! <i class="nes-icon heart"></i> We missed you!<br>
                        <span id="login-afterthough">
                        </span>
                        `);

                        // Start Afterthough Text in 3 Seconds
                        setTimeout(afterthough, 3000);
                    })
                },
                'json'
            )
        }
    })
})

// Afterthough Text Typed
function afterthough()
{
    let typed = new Typed('#login-afterthough',
        {
            strings: ['...<br>...<br>...<br>well, sort of.'],
            typeSpeed: 100,
        });
}

/*
-------------------- References --------------------
    Check if Animation Ends - https://animate.style/
    Regex - https://stackoverflow.com/questions/6603015/check-whether-a-string-matches-a-regex-in-js
    Valid Email - https://www.geeksforgeeks.org/how-to-validate-email-id-in-jquery/
*/