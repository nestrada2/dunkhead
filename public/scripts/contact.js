$(function()
{
    // Contact Form's Submit Button was Clicked
    $('#sup-btn').click(function()
    {
        // Form Values
        let name = $('#contact-name').val(), email = $('#contact-email').val(), msg = $('#contact-message').val();

        let data = {
            name: name,
            email: email,
            message: msg
        }

        // Contructing Error Message
        let message = [];

        // No Name
        if (name === "") 
        {
            // Build Error Message
            message.push("hmmm.You left no name, so I don't know what to call you.");
        }

        // No Email
        if (email === "") 
        {
            // Build Error Message
            message.push("oh-oh! You left no email, so I can't respond to you even if I wanted to.");
        }
        // Not a Valid Email: Regex
        else if (!/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) 
        {
            // Build Error Message
            message.push("oh-no! You didn't provide a valid email, so if I respond to you, you will not receive it.");
        }

        // No Message
        if ($('#contact-message').val() === "") 
        {
            // Build Error Message
            message.push("oops! I believe you made a mistake. You left no message.");
        }

        // If There is an Error Message, then We Show It
        if (message.length != 0) 
        {
            // Construct Modal
            const modal = new bootstrap.Modal('.alert-box');
            modal.show();

            $(".pop-up-message").html('<p>' + message.join('</p><p style="text-align: center;">&</p><p>') + '</p>');
        }
        // Post Form Data to the Server
        else 
        {
            $.post('/contact_post', data,
                // Callback Function - Message
                function (data) 
                {                    
                    let positiveCount = checkMood(positiveWords, msg);
                    let negativeCount = checkMood(negativeWords, msg);

                    let positivity = 0.5;

                    if (positiveCount > 0 || negativeCount > 0)
                    {
                        positivity = positiveCount / (positiveCount + negativeCount);
                    }

                    // Remove the Orginal Animation Class and Adds the Exit Animation Class
                    $('.contact-form').removeClass("animate__bounceInDown").addClass("animate__bounceOutDown");
                    
                    // Checks/Waits when New Animation Ends
                    $('.contact-form')[0].addEventListener('animationend', function()
                    {
                        // Stylize/Center the Contact Confirmation Message
                        $('.contact-confirmation').css("padding", "100px 40px 40px 40px");

                        // Check the Mood of the Message
                        if (positivity >= .6) 
                        {
                            // Positive Response Back
                            $(".contact-confirmation").append(`Hey ${data.name}!<br>Thank you <i class="nes-icon heart"></i> so much for your kind message! We will get back to you as soon as possible at the <i class="nes-icon gmail is-small"></i> you provided, ${data.email}.<br><br>cheers,<br>dunkhead`);
                        }
                        else if (positivity <= .3)
                        {
                            // Negative Response Back
                            $(".contact-confirmation").append(`Thank you ${data.name} for your constructive criticsm. We will look into it.`)
                        }
                        else
                        {
                            // Neutral Response Back
                            $(".contact-confirmation").append(`Thank you ${data.name} for your message. We will try to get back to you as soon as possible at the email you provided, ${data.email}.<br><br>- dunkhead`);
                        }
                    })
                },
                'json'
            )
        }
    })
})

// Helper Function: Counts how Many Words inside the Message are in the Passed in Array
function checkMood(arr, message)
{
    let count = 0;

    // Regex: Remove Punctuations
    let msgArr = message.replaceAll(/[^a-zA-Z\-\s]/g, "").split(/\s/);
 
    // Loop through the Message
    for (let i = 0; i < msgArr.length; i += 1)
    {
        // Current Word
        let word = msgArr[i];
        
        // Checks if Word is in the Array
        if (arr.includes(word))
        {
            // Increment Count
            count += 1;
        }
    }

    return count;
}

/*
-------------------- References --------------------
    Check if Animation Ends - https://animate.style/
    Regex - https://stackoverflow.com/questions/6603015/check-whether-a-string-matches-a-regex-in-js
    Valid Email - https://www.geeksforgeeks.org/how-to-validate-email-id-in-jquery/
*/