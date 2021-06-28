async function loginHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();
    

    if (email && password) {
        
        const response = await fetch('api/users/login', {
            method: 'post',
            body: JSON.stringify({
                password,
                email
            }),
            headers: { 'Content-type': 'application/json' }
        });

        if (response.ok) {
            console.log(email)
            console.log(password)
            document.location.replace('show')
        } else {
            alert(response.statusText + ': Unable to login.  Ensure username and password are correct')
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginHandler)