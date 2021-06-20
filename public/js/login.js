async function loginHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();
    console.log(email)

    if (email && password) {
        const response = await fetch('api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('show')
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginHandler)