localStorage.setItem("isUserLoggedIn","false");

function headerTemplate() {
    let headerTemplateString  =  `
    <!-- Making logo image a link -->
    <a id="logo" href="index.html"><img id="logo_image" src="assests/images/logo.png" alt="logo"></a>
    <!-- <a id="login" href="login.html">Login</a> -->
    <button id="login" type="button" class="btn btn-light" onclick="verifyLogin()" data-toggle="modal" data-target="#loginModal" >
        Login
    </button>
    `

    document.getElementById("header-div").innerHTML += headerTemplateString;
}

headerTemplate();

function footerTemplate() {
    let footerTemplateString = `
    <!-- <p id="contact_us"><a href="contact.html">Contact Us</a></p> -->
    <!-- Button trigger modal -->
    <button id="contact_us" type="button" class="btn btn-info btn-sm" data-toggle="modal"
        data-target="#contactUsModal">
        Contact Us
    </button>

    <div id="social_media_group">
        <a href="https://www.facebook.com/" target="_blank"><img class="footer_social_media_images"
                src="assests/images/facebook.png" alt="Facebook Logo" /></a>
        <a href="https://www.instagram.com/" target="_blank"><img class="footer_social_media_images"
                src="assests/images/instagram.png" alt="Instagram Logo" /></a>
        <a href="https://www.twitter.com/" target="_blank"><img class="footer_social_media_images"
                src="assests/images/twitter.png" alt="Twitter Logo" /></a>
    </div>

    <p id="copyright">&copy; ROOM SEARCH PVT. LTD.</p>

    `
    document.getElementById("footer-div").innerHTML += footerTemplateString;
}

footerTemplate();


function modalTemplate() {
    let modalTemplateString = `
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="loginModalLabel">Please Login</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="index.html" method="GET">
                    <div id="username_div">
                        <label for="username">Username: </label>
                        <input type="text" id="username" name="username" placeholder="Enter Username" required
                            autocomplete="on" />
                    </div>

                    <div id="password_div">
                        <label for="password">Password: </label>
                        <input type="password" id="password" name="password" placeholder="Enter Password" required
                            autocomplete="off" />
                    </div>
                </form>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-primary" onclick="storeCredentials();enableDisablePayBtn()" >Login</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="contactUsModal" tabindex="-1" role="dialog" aria-labelledby="contactUsModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="contactUsModalLabel">Get in touch</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Thankyou for reaching out..!!!</p>
                <p>Enter your email and we will get back to you.</p><br>
                <form action="index.html" method="GET">
                    <label for="user_email">Email :</label>
                    <input type="email" name="user_email" id="user_email" placeholder="Enter your email" required /><br>
                    
                </form>
            </div>
            <div id="submit_button_modal" class="modal-footer">

                <button type="button" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
</div>
    `
    document.getElementById("modal-div").innerHTML += modalTemplateString;
   
}

modalTemplate();

function storeCredentials() {
    let userElement = document.getElementById("username");
    console.log(userElement.value);
    let passElement = document.getElementById("password");
    console.log(passElement.value);
    localStorage.setItem("user",userElement.value);
    localStorage.setItem("password",passElement.value);

    let storedUser = localStorage.getItem("user");
    let storedPassword = localStorage.getItem("password");
    
    let loginBtn = document.getElementById("login");
    

    if(storedUser === "admin" && storedPassword === "admin") {
       
        alert("Successfully Logged In..!");
        loginBtn.innerText = "Logout";
    }
    else {
        alert("Invalid user and password. Please try again..!");
        
    }
}


function verifyLogin() {
    let loginBtn = document.getElementById("login");
    if(loginBtn.innerText === "Login") {
        loginBtn.setAttribute("data-target","#loginModal");
    }
    else if(loginBtn.innerText === "Logout") {
        loginBtn.setAttribute("data-target","");
        loginBtn.innerText = "Login";
        localStorage.clear();
        location.reload();
    }
}

function enableDisablePayBtn() {

}