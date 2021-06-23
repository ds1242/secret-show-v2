console.log("load show detail");

fetch('/api/shows', {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
}).then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.log('error:', error)
    });

var btnComment = document.getElementById('btnComment');

const postComment = () => {
    // var commentText = document.getElementById('comment_text').value;
    // var showName = "BB"; 
    var commentDetails = {
        commentText: document.getElementById('comment_text').value,
        showName: 'BB',
    }

    fetch('/comments', {
        method: 'POST',
        header: 'Content',
        body: JSON.stringify(commentDetails)
    });
}

btnComment.onclick = postComment;