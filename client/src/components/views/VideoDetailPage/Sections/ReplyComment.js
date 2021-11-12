import React,{useEffect, useState} from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildeCommentNumber, setChildeCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {
    

        let commentNumber = 0;

        props.commentLists.map((comment) => {
            if(comment.responseTo === props.parentCommentId){
                commentNumber ++
            }
        })

        setChildeCommentNumber(commentNumber)

    }, [])

    const renderReplyComment = (parentCommentId) =>{
        props.commentLists.map((comment, index)=>(
            <React.Fragment> 
                {comment.responseTo=== parentCommentId &&
                    <div style={{width: '80%', marginLeft: '40px'}}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId}/>
                        <ReplyComment commentLists={props.commentLists}/>
                    </div>
                }
            </React.Fragment>
        ))
    }

    const onHandleChange = () => {
            setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>
            {ChildeCommentNumber > 0 && 
                <p style={{fontSize: '14px', margin: 0, color: 'gray'}} onClick={onHandleChange}>
                view {ChildeCommentNumber} more comment(s)
                </p>
            }

            {OpenReplyComments && 
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
