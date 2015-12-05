/// <reference path="../jquery.d.ts"/>
var Convertize;
(function (Convertize) {
    var SignupForm = (function () {
        function SignupForm() {
            this.addListeners();
        }
        SignupForm.prototype.addListeners = function () {
            var _this = this;
            var inputName = document.getElementById("inputName");
            inputName.addEventListener("input", function () { return _this.validate(); });
            var emailName = document.getElementById("inputEmail");
            emailName.addEventListener("input", function () { return _this.validate(); });
            var btn_clickhere = document.getElementById("btn_clickhere");
            btn_clickhere.addEventListener("click", function () { return _this.submitForm(); });
        };
        SignupForm.prototype.submitForm = function () {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                xhr.open('GET', 'php/api.php?name=' + $('#inputName').val() + '&email=' + $('#inputEmail').val(), true);
            }
            xhr.onerror = function () {
                console.log('Cors Request Error');
            };
            xhr.onload = function () {
                var res = JSON.parse(xhr.responseText);
                var html = '';
                html += '<small><p><b>Hi ' + res.query.name + '!</b></p>';
                html += '<p>One of our experts will call you on ' + res.in_3_days + '</p></small>';
                $("#response").html(html);
                $("#form_signup").hide();
            };
            xhr.send();
            return false;
        };
        SignupForm.prototype.validate = function () {
            this.isValid = false;
            var nameOK = false;
            var emailOK = false;
            var name = $('#inputName').val();
            var email = $('#inputEmail').val();
            if (name != '' && name != undefined && name.length > 3) {
                nameOK = true;
                $("#inputNameIcon").attr("src", "img/valid-icon.png");
            }
            else {
                $("#inputNameIcon").attr("src", "img/invalid-icon.png");
            }
            if (email != '' && email != undefined) {
                if (this.checkEmail(email)) {
                    emailOK = true;
                    $("#inputEmailIcon").attr("src", "img/valid-icon.png");
                }
                else {
                    $("#inputEmailIcon").attr("src", "img/invalid-icon.png");
                }
            }
            else {
                $("#inputEmailIcon").attr("src", "img/invalid-icon.png");
            }
            if (emailOK && nameOK) {
                $("#btn_clickhere").removeAttr("disabled");
            }
            else {
                $("#btn_clickhere").attr("disabled", 'true');
            }
        };
        SignupForm.prototype.checkEmail = function (emailAddress) {
            var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
            return pattern.test(emailAddress);
        };
        return SignupForm;
    })();
    Convertize.SignupForm = SignupForm;
})(Convertize || (Convertize = {}));
///<reference path='Convertize/signupForm.ts'/>
var Convertize;
(function (Convertize) {
    var SignupForm = Convertize.SignupForm;
    var Main = (function () {
        function Main() {
            this.SignupForm = new SignupForm();
        }
        return Main;
    })();
    Convertize.Main = Main;
})(Convertize || (Convertize = {}));
