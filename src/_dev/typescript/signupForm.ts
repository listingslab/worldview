/// <reference path="../jquery.d.ts"/>


module Convertize
{
    
    export class SignupForm
    {
        private main:any;
        private isPristine: boolean;
        private isValid: boolean;

        constructor()
        {
            this.addListeners ();
        }


        addListeners (){
            // add a listener to the name field
            var inputName = document.getElementById("inputName");
            inputName.addEventListener ("input", () => this.validate ());

            // add a listener to the email field
            var emailName = document.getElementById("inputEmail");
            emailName.addEventListener ("input", () => this.validate ());

            // add a listener to the click here button
            var btn_clickhere = document.getElementById("btn_clickhere");
            btn_clickhere.addEventListener ("click", () => this.submitForm ());
        }

        submitForm (){
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                xhr.open('GET', 'php/api.php?name='+$('#inputName').val()+'&email='+$('#inputEmail').val(), true);
            }
            xhr.onerror = function() {
                console.log ('Cors Request Error');
            };

            xhr.onload = function() {
                // Parse the response from the Ajax call
                var res = JSON.parse (xhr.responseText);
                var html = '';
                html += '<small><p><b>Hi ' + res.query.name + '!</b></p>';
                html += '<p>One of our experts will call you on ' + res.in_3_days + '</p></small>';
                $("#response").html (html);
                // Hide the form. We don't need it any more
                $("#form_signup").hide ();
            };
            xhr.send();
            return false;
        }


        validate (){

            // Assume the form is not valid
            this.isValid= false;
            var nameOK = false;
            var emailOK = false;

            // Get the current values
            var name:String = $('#inputName').val();
            var email:String = $('#inputEmail').val();

            // Check name field has a good username
            if (name != '' && name != undefined && name.length > 3){
                nameOK = true;
                $("#inputNameIcon").attr("src", "img/valid-icon.png");
            }else{
                $("#inputNameIcon").attr("src", "img/invalid-icon.png");
            }

            // Check email field has a valid email address
            if (email != '' && email != undefined){
                if (this.checkEmail (email)){
                    emailOK = true;
                    $("#inputEmailIcon").attr("src", "img/valid-icon.png");
                }else{
                    $("#inputEmailIcon").attr("src", "img/invalid-icon.png");
                }
            }else{
                $("#inputEmailIcon").attr("src", "img/invalid-icon.png");
            }

            if (emailOK && nameOK){
                // OK! the form is valid, we can submit it
                $("#btn_clickhere").removeAttr( "disabled") ; 
            }else{
                // Nope the form is invalid, disable the button
                $("#btn_clickhere").attr("disabled", 'true');
            }
                
        }

        checkEmail (emailAddress) {
            // Make sure the email is valid
          var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
          return pattern.test(emailAddress);
        }



        
    }
}