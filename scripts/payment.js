function enableDisablePayBtn() {
    
    let loginBtn = document.getElementById("login");
    let payNowBtn = document.getElementById("pay-now-btn");
    payNowBtn.disabled = true;
    if(loginBtn.innerText === "Logout") {
        payNowBtn.disabled = false;
    }
    
}


enableDisablePayBtn();