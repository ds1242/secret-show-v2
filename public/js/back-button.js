async function createBackButton(event) {
    event.preventDefault();

    document.location.replace('/show');
}

document.querySelector('#back-to-show-list').addEventListener('click', createBackButton)
