async function signupHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    const email = document.querySelector('#signup-email').value.trim();


    if (username && email && password) {
        const response = await fetch('/api/users', {
            mothod: 'post',
            body: JSON.stringify({
                username,
                password,
                email
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log(username)
            console.log(email)
            console.log(password)
            document.location.replace('show');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupHandler)