async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/show/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/show/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#delete-show-btn').addEventListener('click', deleteFormHandler);