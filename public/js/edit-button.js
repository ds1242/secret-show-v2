const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1]

async function editButton(event) {
    event.preventDefault();

    document.location.replace(`/edit-show/${id}`);
}

document.querySelector('#edit-show-btn').addEventListener('click', editButton)