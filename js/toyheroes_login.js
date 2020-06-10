function onButtonLoginClick(redirect_page) {
    showLoading();

    var id = document.getElementsByName('LoginId')[0].value;
    var password = document.getElementsByName('Password')[0].value;

    if (!id || !password){
        showError('You need to fill out all required fields');
        return;
    }

    var loginRequest = new XMLHttpRequest();
    
        loginRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == "confirm")
                    window.location.href = "/confirm";
                else
                    window.location.href = "/" + redirect_page;
            }
            else if (this.readyState == 4 && this.status == 500) {
                showError(this.responseText);
                clearPassword();
            }
        }
    
        loginRequest.open('POST', './api/pdx-login', true);
        loginRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        loginRequest.send('username=' + id + '&password=' + password);
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

function clearPassword() {
    document.getElementsByName('Password')[0].value = '';
}