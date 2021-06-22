async function createShowHandler(event) {
    event.preventDefault();

    document.location.replace('create-show');
}

document.querySelector('.create-show-btn').addEventListener('submit', createShowHandler)
