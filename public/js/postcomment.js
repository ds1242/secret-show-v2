console.log("load show detail");
var showid;

fetch('/api/show', {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
}).then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        showid = data[0].id;

        if (showid !== undefined) {
            //Display all comments for the show 
            fetch('/api/show/comment/' + showid, {
                method: 'GET',
                headers: { 'content-type': 'application/json' }
            }).then(response => response.json())
                .then(allComments => {
                    console.log('all comments:', allComments);
                })
                .catch((error) => {
                    console.log('error:', error)
                });
        }
    })
    .catch((error) => {
        console.log('error:', error)
    });




var btnComment = document.getElementById('btnComment');

const postComment = () => {
    // var commentText = document.getElementById('comment_text').value;
    // var showName = "BB"; 
    var commentDetails = {
        comment_text: document.getElementById('comment_text').value,
        show_id: showid
    }
    console.log(commentDetails);

    fetch('/api/show/comment', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(commentDetails)
    });
}

btnComment.onclick = postComment;