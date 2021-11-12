import Axios from 'axios'
import React,{useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {

    const videoId = props.postId;
    const user= useSelector(state=> state.user);
    const [commentValue, setcommentValue] = useState("")


    const handleClick = (e) =>{
        setcommentValue(e.currentTarget.value)  
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables ={
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response=>{
            if(response.data.success){
                console.log(response.data.result)
                setcommentValue("")
                props.refreshFunction(response.data.result)
            }else{
                alert('코맨트 작성 실패')
            }
        })
    } 


    return (
        <div>
            <br />
            <p> Replies </p>
            <hr />

            { /* Comment Lists */ }
            {props.commentLists && props.commentLists.map((comment, index)=>(
                (!comment.responseTo &&
                <React.Fragment>
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} refreshFunction={props.refreshFunction}/>
                    <ReplyComment parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists} refreshFunction={props.refreshFunction}/>
                </React.Fragment>
                )
            ))}
            




            { /* Root Comment Form */ }
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요"

                />
                <br />
                <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
