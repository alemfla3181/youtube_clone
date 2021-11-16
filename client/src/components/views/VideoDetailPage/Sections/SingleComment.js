import Axios from 'axios'
import React,{useState, useEffect} from 'react'
import {Comment, Avatar, Button, Input } from 'antd';
import {useSelector} from 'react-redux';
import LikeDislikes from './LikeDislikes';

const {TextArea} = Input;

function SingleComment(props) {
    const user = useSelector(state=> state.user);
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")
    
    const onClickReplyOpen =() => {
        setOpenReply(!OpenReply)
    }

    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id} />, <span onClick={onClickReplyOpen} key="comment-basic-reply-to"> Reply to </span>
    ]

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables ={
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }
        Axios.post('/api/comment/saveComment', variables)
        .then(response=>{
            if(response.data.success){
                console.log(response.data.result)
                setCommentValue("")
                setOpenReply(false)
                props.refreshFunction(response.data.result)
            }else{
                alert('코맨트 작성 실패')
            }
        })
    }

    const onRemove = (id) => {
        const variables ={
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: id
        }
        console.log(id)

        if(window.confirm('삭제하시겠습니까?')){
            props.setComments(props.commentLists.filter(comment=>{
                return comment._id !== id
            }))
            Axios.post('/api/comment/RemoveComment', variables)
            .then(response=> {
                if(response.data.success){

                }else{
                    alert('comment삭제 실패')
                }
            })
        }
    }

    return (
        <div>
            <Button style={{ width: '10%', height: '30px', backgroundColor: 'orange'}} onClick={() => onRemove(props.comment._id)}>Delete</Button>
            <Comment 
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image } alt/>}
                content={ <p>{props.comment.content}</p>}
            />
            {OpenReply &&
                <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <TextArea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder="코멘트를 작성해 주세요"

                />
                <br />
                <button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</button>
            </form>
            }
        </div>
    )
}

export default SingleComment