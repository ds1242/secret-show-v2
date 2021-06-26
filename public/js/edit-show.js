
async function editShow(event) {
    event.preventDefault()
    const bandname = document.querySelector('#band-name').value.trim();
    const genre = document.querySelector('#genres').value.trim();
    const img = document.querySelector('#image-url').value.trim();
    const youtube_id = document.querySelector('#youtube').value.trim();
    const show_location = document.querySelector('#location').value.trim();
    const show_time = document.querySelector('#time').value.trim();
    const show_date = document.querySelector('#show-date').value.trim();
    const privacy = document.querySelector('#privacy').value.trim();
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1]


    if (bandname && genre && img && show_location && show_time && show_date && privacy) {

        const response = await fetch(`/api/show/${id}`, {
            method: 'put',
            body: JSON.stringify({
                bandname,
                genre,
                img,
                youtube_id,
                show_location,
                show_time,
                show_date,
                privacy
            }),
            headers: { 'Content-type': 'application/json' }
        });
        // console.log(response)
        if (response.ok) {
            document.location.replace('/show')
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.edit-show-form').addEventListener('submit', editShow)


