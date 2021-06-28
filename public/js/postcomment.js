console.log("load show detail");
var showid;

fetch('/api/show', {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
}).then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        showid = window.location.toString().split("/")[
            window.location.toString().split("/").length - 1];

        if (showid !== undefined) {
            //Display all comments for the show 
            fetch('/api/show/comment/' + showid, {
                method: 'GET',
                headers: { 'content-type': 'application/json' }
            }).then(response => response.json())
                .then(allComments => {
                    console.log("DB Data", allComments);
                    for (let i = 0; i < allComments.length; i++) {
                        const li = document.createElement("li");
                        li.innerHTML = allComments[i].comment_text;
                        li.id = "li-" + allComments[i].id;
                        //cretae a delete button 
                        const delBtn = document.createElement("button");
                        delBtn.value = allComments[i].id; //set the comment id 
                        delBtn.textContent = "DELETE";
                        delBtn.onclick = deleteComment;  //call the delete fetch request 
                        //EDIT button 
                        const editBtn = document.createElement("button");
                        editBtn.value = allComments[i].id; //set the comment id 
                        editBtn.textContent = "EDIT";
                        editBtn.onclick = editComment;
                        const ol = document.querySelector('#display-allcomments');
                        ol.appendChild(li);
                        ol.appendChild(delBtn);
                        ol.appendChild(editBtn);
                    }
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
    })
        .then(document.location.reload())

}

const editComment = (event) => {
    event.preventDefault();

    const commentID = event.target.value;
    console.log(event.target.value, "edit button");

    console.log(document.getElementById("li-" + commentID).textContent);
    //set value on the comment 
    document.getElementById('comment_text').value = document.getElementById("li-" + commentID).textContent;
    //LEAVE COMMENT chnage to save comment 


    // var commentDetails = {
    //     comment_text: document.getElementById('comment_text').value,
    //     show_id: showid
    // }
    // console.log(commentDetails);

    // fetch('/api/show/comment/' + commentID, {
    //     method: 'PUT',
    //     headers: { 'content-type': 'application/json' },
    //     body: JSON.stringify(commentDetails)
    // })
    //     .then(document.location.reload())

}


const deleteComment = (event) => {
    event.preventDefault();

    const commentID = event.target.value;
    console.log(event.target.value, "delet button");

    fetch('/api/show/comment/' + commentID, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
    })
        .then(document.location.reload());
};

btnComment.onclick = postComment;