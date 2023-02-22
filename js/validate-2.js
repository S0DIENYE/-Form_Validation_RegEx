/*-------------------------------
    # Submit Validation
-------------------------------*/
const form = document.querySelector('form#form');

if (form)
form.onsubmit = function (e) {

    const state = {
        error: null,
        errDone: false,
    }

    const userData = {
        "email": "",
        "password": "",
        "firstName": "",
        "lastName": "",
        "user_category": ""
    }

    const loginDate = {
        "email": "",
        "password": ""
    }
    
    const userInputs = document.querySelectorAll('form input[validate]');    
    
    userInputs.forEach(input => {
        if(e){
            
            if (input.value === "" || input.value === null ) {
                state.error = true;
                authErrState();
            }
            
            authErrState();
            // Initial state

            state.error === true ? e.preventDefault() : false;
            // If error is recall errstate

            state.error === true ? authErrState() : authSuccState();

            // If error is false call success state
            state.error === false ? authSuccState() : false;
            // state.error === true ? authErrState() : authSuccState();
            
            // On success retrive user data and call post api
        }

        function authErrState() {
            validateNames()
            validateEmail();
            validatePass();
            passConfirm();
            // agreedTandC();
        }

        function authSuccState() {
            e.preventDefault();

            if(state.errDone === true){
                const names = document.querySelectorAll('[validate="name"]');
                const email = document.querySelector('[validate="email"]');
                const userCategory =  document.querySelector('[user-category]');
                const password = document.querySelector('[validate="password"]');
    
                userData.firstName =  names[0].value;
                userData.lastName =  names[1].value;
                userData.email =  email.value;
                userData.user_category =  userCategory.value;
                userData.password =  password.value;
    
                signUpUser(userData);
            }

        }
    });



    function validateNames() {
        const names = document.querySelectorAll('[validate="name"]');
        // regexp condition = names must not be 2 < 15
        const re = /^[a-z]{2,}$/i;

        names.forEach(name => {

            if(name)
            if(!re.test(name.value)){
                // throw error and set error state
                name.classList.add('is-invalid')
                state.error = true;
                name.focus()

            } else{
                // success
                name.classList.remove('is-invalid')
                state.errDone = false;
            }

        })
    }

    function validateEmail() {
        const email = document.querySelector('[validate="email"]');
        // regexp condition @mail !< 3, .com !< 2
        const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

        if(email)
        if(!re.test(email.value)){
            email.classList.add('is-invalid')
            state.error = true;
            email.focus()
        } else{
            email.classList.remove('is-invalid')
            state.errDone = false;
        }
    }

    function validatePass() {
        const password = document.querySelector('[validate="password"]')
        // regexp condition minimum of 8 char
        const re = /^[a-z0-9]{8,}$/i;

        if(password)
        if(!re.test(password.value)){
            // throw error and set error state
            password.classList.add('is-invalid')
            state.error = true;
            password.focus()

        } else{
            // success
            password.classList.remove('is-invalid')
            state.errDone = false;
        }

    }

    // Pass confirmation
    function passConfirm() {
        const initialPass = document.querySelector('[validate="password"]');
        const confirmPass = document.querySelector('[validate="confirmPass"]');

        if (confirmPass){
            if (initialPass.value !== confirmPass.value) {
                // throw error and set error state
                initialPass.classList.remove('is-invalid')
                confirmPass.classList.add('is-invalid');
                state.error = true;
                confirmPass.focus();
            } else {
                confirmPass.classList.remove('is-invalid');
                // if(state.error === false)
                state.errDone = true;
            }
        }
    }

    // function agreedTandC() {
    //     const checkbox = document.querySelector('input[type="checkbox"]')
    
    //     if(checkbox.hasAttribute('checked') === false){
    //         state.error = true;
    //         checkbox.focus()
    //     }
        
    // }
    
    // function verifyCode() {
    // }

    // function agreedToTerms() {
    // }

    // if (input.value === null || input.value === '') {
    //     isError = true
    //     errorMsg = "Inputs are empty"
    //     input.focus()

    // }
    // if (isError && errorMsg != null && errorMsg != "") {
    //     showAlert(`${errorMsg}`, 'alert-danger');
    //     setTimeout(hideAlert, 3000)
    //     input.focus()

    // }

}


/* --------------------------------
  # Password Hide And Show fn
--------------------------------- */
if (form)
form.onclick = function (e) {
    let show = e.target.classList.contains('bi-eye-slash');
    let hide = e.target.classList.contains('bi-eye');

    if (show) {
        e.target.classList = 'bi bi-eye';
        e.target.parentElement.previousElementSibling.setAttribute('type', 'text')
    }
    if (hide) {
        e.target.classList = 'bi bi-eye-slash';
        e.target.parentElement.previousElementSibling.setAttribute('type', 'password')
    }
}

/* --------------------------------
  # SignUp user
--------------------------------- */
/**
 * Post method
 * object params
 * login = {
    "email" : "",
    password: ""
  }
 * signup = {
    "email": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "user_category": ""
    }
 */
async function post  (url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const resData = await response.json();
    return resData;
}

function signUpUser (data) {
    console.log(
        post('http://127.0.0.1:8000/auths/signup/', data)
        .then(data => console.log(data))
        .catch(err => console.log(`Error => ${err}`))
    );
}

function userLogin (data) {
    console.log(
        post('http://127.0.0.1:8000/auths/login/', data)
        .then(data => console.log(data))
        .catch(err => console.log(`Error => ${err}`))
    );

}