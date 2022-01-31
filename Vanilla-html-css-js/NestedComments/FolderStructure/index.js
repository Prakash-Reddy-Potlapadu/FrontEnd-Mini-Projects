let comment='';
const variableNames={
    COMMENTS: 'comments'
}

window.addEventListener('load',handleWindowLoad)

function handleWindowLoad(){
    //localStorage.setItem(variableNames.COMMENTS,JSON.stringify([]))
    renderComments();

}

function setItem(variableName,value){
localStorage.setItem(variableName,JSON.stringify(value))
}
function getItem(variableName){
    return JSON.parse(localStorage.getItem(variableName)||'[]')
}


function handleCommentTextareaChange(e){
    comment=e.target.value;
}
function handlePostComment(){
    if(comment===''){
        return;
    }
   debugger
    const comments=getItem(variableNames.COMMENTS);
   const commentObj={
       commentID:comments.length,
       comment:comment,
       parentID:-1
   }
   comments.push(commentObj);
   setItem(variableNames.COMMENTS,comments);
   comment='';
   document.getElementById('commentTextArea').value='';
   renderSingleComment(commentObj)
}


function renderComments(){
    const commentsContainer=document.getElementsByClassName('comments-container')[0]
    while(commentsContainer.lastChild){
        commentsContainer.removeChild(commentsContainer.lastChild)
    }
    const comments=getItem(variableNames.COMMENTS);
    comments&&comments.length&&comments.forEach(comment => {
        renderSingleComment(comment)
    });
}


function renderSingleComment(commentObj){
    const commentsContainer=document.getElementsByClassName('comments-container')[0]

    const commentCotainer= document.createElement('DIV');
    commentCotainer.innerHTML=commentObj.comment;
    commentCotainer.classList.add('comment')

    const commentActionContainer=document.createElement('span')
    const reply=document.createElement('span')
    const edit=document.createElement('span')
    const deleteText=document.createElement('span')
    reply.innerHTML='reply';
    edit.innerHTML='edit';
    deleteText.innerHTML='delete';
    commentActionContainer.classList.add('comment-action-container')
    reply.classList.add('reply');
    edit.classList.add('edit');
    deleteText.classList.add('delete-text');

    reply.addEventListener('click',()=>{
        handleReplyClick(commentObj,commentCotainer)
    })
    edit.addEventListener('click',()=>{
        handleEditClick(commentObj,commentCotainer)
    })
    deleteText.addEventListener('click',()=>{
        handleDeleteClick(commentObj,commentCotainer);
    
    })

    
    commentActionContainer.appendChild(reply)
    commentActionContainer.appendChild(edit) 
    commentActionContainer.appendChild(deleteText) 
    commentCotainer.appendChild(commentActionContainer)
     
    commentsContainer.appendChild(commentCotainer);
    
}


function handleReplyClick(commentObj,commentCotainer){
    const replyInput=document.createElement('input');
    replyInput.classList.add('reply-comment-input');
     commentCotainer.appendChild(replyInput)
    // replyInput.value=commentObj.comment;
    replyInput.addEventListener('blur',(e)=>{
        handleReplyInputBlur(e,commentObj)
    })
    

}
function handleEditClick(commentObj,commentCotainer){
 debugger
    const editInput=document.createElement('input');
     editInput.classList.add('edit-comment-input');
     commentCotainer.appendChild(editInput)
    editInput.value=commentObj.comment;
    editInput.addEventListener('blur',(e)=>{
        handleEditInputBlur(e,commentObj)
    })
    
}
function handleDeleteClick(commentObj,commentCotainer){
    debugger
    let comments=getItem(variableNames.COMMENTS);
    const index=comments.findIndex(comment=>comment.commentID===commentObj.commentID);
    comments.splice(index,1)
    setItem(variableNames.COMMENTS,comments) ;
    removeChildComments(commentObj.commentID,comments);
    renderComments();
}

function removeChildComments(commentID){
    let comments=getItem(variableNames.COMMENTS);
    let removedID;
    if(comments.findIndex(comment=>comment.parentID===commentID)===-1){
        return;
    }
    while(comments.findIndex(comment=>comment.parentID===commentID)!==-1){
    const index=comments.findIndex(comment=>comment.parentID===commentID);
    removedID=comments[index].commentID;
    comments.splice(index,1);
    setItem(variableNames.COMMENTS,comments) ;
    }
    //if(index===-1){
    //    return;
    //}
    removeChildComments(removedID)

} 

function handleEditInputBlur(e,commentObj){
     commentObj.comment=e.target.value;
     const comments=getItem(variableNames.COMMENTS);
     const index=comments.findIndex(comment=>comment.commentID.toString()===commentObj.commentID.toString());
     comments[index]=commentObj;
     setItem(variableNames.COMMENTS,comments)
     renderComments()
    
}

function handleReplyInputBlur(e,commentObj){
    const value=e.target.value;
    debugger
    if(value===''){
        renderComments();
        return;
    }
    const comments=getItem(variableNames.COMMENTS);
    const newCommentObj={
        commentID:comments.length,
        comment:value,
        parentID:commentObj.commentID
    }
    //const index=comments.findIndex(comment=>comment.commentID.toString()===commentObj.commentID.toString());
    //comments[index]=commentObj;
    comments.push(newCommentObj)
    setItem(variableNames.COMMENTS,comments)
    renderComments()
}