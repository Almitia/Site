function onButtonQuickLoginClick()
{
    showLoadingQuick();

    var id = document.getElementsByName('userName')[0].value;
    var password = document.getElementsByName('password')[0].value;

    if (!id || !password || id == "Login ID"){
        showErrorQuick('You need to fill out all required fields');
        return;
    }

    var loginRequest = new XMLHttpRequest();
    
        loginRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == "confirm")
                    window.location.href = "/confirm";
                else
                    window.location.href = "/club";
            }
            else if (this.readyState == 4 && this.status == 500) {
                showErrorQuick(this.responseText);
                clearPasswordQuick();
            }
        }
    
        loginRequest.open('POST', './api/pdx-login', true);
        loginRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        loginRequest.send('username=' + id + '&password=' + password);
}

function showLoadingQuick()
{
    var ajaxMask = document.getElementsByClassName('ajaxLoadingMaskQuick');
    ajaxMask[0].style.display = "block";

    document.getElementById('wrong_password_board').style.display = "none";
    var errorMessage = document.getElementById('msgLogin');
    errorMessage.style.display = "none";
}

function showErrorQuick(errorText) {
    var ajaxMask = document.getElementsByClassName('ajaxLoadingMaskQuick');
    ajaxMask[0].style.display = "none";


    document.getElementById('wrong_password_board').style.display = "block";
    var errorMessage = document.getElementById('msgLogin');
    errorMessage.innerHTML = errorText;
    errorMessage.style.display = "block";
}

function clearPasswordQuick() {
    document.getElementsByName('password')[0].value = '';
}