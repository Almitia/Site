function onButtonResetClick() {
    showLoading();

    var email = document.getElementsByName('Email')[0].value;

    if (!email || !email.includes('@')){
        showError('You need to fill out all required fields');
        return;
    }

    var resetRequest = new XMLHttpRequest();
    
        resetRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                showSuccess();
                clearEmail();
            }
            else if (this.readyState == 4 && this.status == 500) {
                showError(this.responseText);
                clearEmail();
            }
        }
    
        resetRequest.open('POST', './api/pdx-reset', true);
        resetRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        resetRequest.send('email=' + email);
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
    var ajaxMask = document.getElementsByClassName('ajaxLoadingMask');
    ajaxMask[0].style.display = "none";
    
    var errorMessage = document.getElementById('msgRegister');
    errorMessage.innerHTML = "Please check your e-mail inbox.";
    errorMessage.style.display = "block";
    errorMessage.style.color = "green";
}

function clearEmail() {
    document.getElementsByName('Email')[0].value = '';
}