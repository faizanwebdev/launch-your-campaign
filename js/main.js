function sendmail(){
    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
    var contact = $("#contact").val().trim();
    var website = $("#website").val().trim();
    var message = $("#message").val().trim();
    var registerform = $('#register-form');
    var signup = $('#signup');
    var sentmessage = $('.sentmessage');
    var errormessage = $('.errormessage');
    if(website == ""){
        website = "NA";
    }
    var jsonData = {
        "fields": {
          "Name": name,
          "Phone": contact, //Should have country code and only numbers. No punctuation.
          "Email": email
        },
        "actions": [
                  {
        "type": "SYSTEM_NOTE",
        "text": "Website URL: "+website+", Message: "+message
        },
        {
        "type": "SYSTEM_NOTE",
        "text": "Source:Website https://enlyft.in/launch-your-campaign/index.html"
        },
        ]
      };
    
    if(name !== ""){
//        $("#errorname").css({"display":"none"});
        if(email !== ""){
            $("#erroremail").css({"display":"none"});
            if(email.includes("gmail") || email.includes("GMAIL")|| email.includes("yahoo") || email.includes("YAHOO") || email.includes("rediff") || email.includes("REDIFF") || email.includes("outlook") || email.includes("OUTLOOK")  || email.includes("hotmail") || email.includes("HOTMAIL")){
                $('#email').focus();
                alert("Please Enter Your Business Email");
//                $('#email-error').css({"display":"inline"});
                return false;
            }
            else{
//                $('#email-error').css({"display":"none"});
                if(contact !== "" && contact.length == 10){
//                    $('#contact-error').css({"display":"none"});
//                    if(website !== ""){
//                        $('#website-error').css({"display":"none"});
//                    }
//                    else{
//                        $('#website').focus();
//                        alert("Please Enter Your Website URL");
//                    }
                    if(message !== ""){
//                        $('#message-error').css({"display":"none"});
                        $.ajax({
                            url: 'mail.php',
                            type: 'POST',
                            data: {name:name,email:email,contact:contact,website:website,message:message,signup:"signup"},
                            beforeSend: function(){
                                $('#signup').css({"display":"none"});
                                $('.onsub').css({"display":"inline"});
                            },
                            success: function(data){
                                if(data == "validemail"){
                                    alert("Please Enter Valid Business Email");
                                    $("#email").focus();
                                    $('#signup').css({"display":"inline-block"});
                                    $('.onsub').css({"display":"none"});
                                }
                                if(data == "validnumber"){
                                    alert("Please Enter Valid 10 Digit Contact Number");
                                    $("#contact").focus();
                                    $('#signup').css({"display":"inline-block"});
                                    $('.onsub').css({"display":"none"});
                                }
                                if(data == "mandatory"){
                                    alert("Please Enter All fields properly");
                                    $('#name').focus();
                                    $('#signup').css({"display":"inline-block"});
                                    $('.onsub').css({"display":"none"});
                                }
                                if(data == "success"){
                                    alert("Thank You for Submitting the form, Our Influencer Expert Will Contact You Shortly");
                                    $('#signup').css({"display":"inline-block"});
                                    $('.onsub').css({"display":"none"});
                                    $('#register-form').trigger("reset");
                                    $('#register-form').css({"display":"none"});
                                    $('.successhide').css({"display":"block"});
                                    fetch('https://app.telecrm.in/api/b1/enterprise/6315b8802e86de0009addba8/autoupdatelead', {
                                        method: 'POST',
                                        mode: 'cors',
                                        cache: 'no-cache',
                                        credentials: 'same-origin',
                                        headers: {
                                          'Content-Type': 'application/json',
                                        },
                                        redirect: 'follow',
                                        referrer: 'no-referrer',
                                        body: JSON.stringify(jsonData)
                                      }).then(result => {
                                        // console.log(JSON.stringify(jsonData));
                                        // console.log(result);
//                                        alert("success");
                                        console.log('success');
                                      });
                                    gtag_report_conversion();
                                }
                                else{
                                    alert("There was some error while submitting, pleas try again later");
                                    $('.onsub').css({"display":"none"});
                                    $('#register-form').trigger("reset");
                                }
                            }
                        });
                    }
                    else{
                        $('#message').focus();
                        alert("Please Enter Your Message");
//                        $('#message-error').css({"display":"inline"});
                    }
                }
                else{
                    $('#contact').focus();
                    alert("Please Enter Valid 10 Digit Mobile Number");
//                    $('#contact-error').css({"display":"inline"});
                }
            }
        }
        else{
            $("#email").focus();
            alert("Please Enter Your Business Email");
//            $("#erroremail").css({"display":"inline"});
        }
    }
    else{
        $("#name").focus();
        alert("Please Enter Your Name");
//        $("#errorname").css({"display":"inline"});
    }
    
    return false;
}  
