import Axios from 'axios'
import {auth} from '../../../../_actions/user_actions';
import {Button, Input } from 'antd';
import React,{useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const { TextArea } = Input;

function Comment(props) {

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
            postId: props.postId
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response=>{
            if(response.data.success){
                //console.log(response.data.result)
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
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} commentLists={props.commentLists} setComments={props.setComments} postId={props.postId}/>
                    <ReplyComment parentCommentId={comment._id} postId={props.postId} comment={comment}  commentLists={props.commentLists} setComments={props.setComments} refreshFunction={props.refreshFunction}/>
                </React.Fragment>
                )
            ))}
            




            { /* Root Comment Form */ }
            {user.userData.isAuth &&  // 로그인시에만 댓글 작성 가능
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <TextArea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</Button>
            </form>
            }
        </div>
    )
}

export default Comment
