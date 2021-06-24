async function createBackButton(event) {
    event.preventDefault();

    document.location.replace('/');
}

document.querySelector('#back-to-show-list').addEventListener('click', createBackButton)
