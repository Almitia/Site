function onButtonRegisterClick(ref) {
    showLoading();

    var id = document.getElementsByName('LoginId')[0].value;
    var password = document.getElementsByName('Password')[0].value;
    var re_password = document.getElementsByName('Password2')[0].value;
    var nickname = document.getElementsByName('CharacterName')[0].value;
    var email = document.getElementsByName('Email')[0].value;
    var re_email = document.getElementsByName('Email2')[0].value;

    if (!id || !password || !nickname || !email){
        showError('You need to fill out all required fields');
        return;
    }
    else if (password != re_password) {
        showError('The passwords you\'ve entered don\'t match');
        return;
    }
    else if (email != re_email) {
        showError('The email addresses you\'ve entered don\'t match');
        return;
    }
    else if (!email.includes('@')){
        showError('The email address you\'ve entered are invalid');
        return;
    }

    var registerRequest = new XMLHttpRequest();

    registerRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showSuccess();
        }
        else if (this.readyState == 4 && this.status == 500) {
            showError(this.responseText);
        }

        if (this.readyState == 4) {
            clearPasswords();
        }
    }

    registerRequest.open('POST', './api/pdx-register', true);
    registerRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    registerRequest.send('username=' + id + '&password=' + password + '&email=' + email + '&nickname=' + nickname + "&ref=" + ref + "&captcha=" + grecaptcha.getResponse());
}

function showLoading()
{
    var ajaxMask = document.getElementsByClassName('ajaxLoadingMask');
    ajaxMask[0].style.display = "block";

    var errorMessage = document.getElementById('msgRegister');
    errorMessage.style.display = "none";
}

function showError(errorText) {
    var ajaxMask = document.getElementsByClassName('ajaxLoadingMask');
    ajaxMask[0].style.display = "none";

    var errorMessage = document.getElementById('msgRegister');
    errorMessage.innerHTML = errorText;
    errorMessage.style.display = "block";
}

function showSuccess() {
    /*var errorMessage = document.getElementById('msgRegister');
    errorMessage.innerHTML = "Successfully registered! Login redirect in 2 seconds..";
    errorMessage.style.display = "block";
    errorMessage.style.color = "green";

    setTimeout(function () {
        window.location.href = "./login";
    }, 2000)*/

    window.location.href = "./confirm";
}

function clearPasswords() {
    document.getElementsByName('Password')[0].value = '';
    document.getElementsByName('Password2')[0].value = '';
}