async function updateViewCount() {

    
    let view_count = document.querySelector('#page-count').innerHTML;
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1]

    view_count = parseInt(view_count) + 1

    if(id && view_count) {
        const response = await fetch(`/api/show/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                view_count
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            document.querySelector('#page-count').innerHTML = view_count; 
        } else {
            console.log('did not update')
            alert(response.statusText)
        }
    }
}


updateViewCount();