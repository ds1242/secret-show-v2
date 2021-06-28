async function signupHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
    const email = document.querySelector('#signup-email').value.trim();


    if (username && password && email) {
        const response = await fetch('/api/users', {
            method: 'post',
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
            alert(response.statusText + ': Ensure the email is unique and the password is longer than 6 characters');
            
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupHandler)