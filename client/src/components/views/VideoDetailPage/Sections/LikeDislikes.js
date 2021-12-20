import React,{useEffect,useState} from 'react'
import {Tooltip} from 'antd';
import Axios from 'axios';
import {useSelector} from 'react-redux';
import {LikeOutlined, DislikeOutlined} from '@ant-design/icons';

function LikeDislikes(props) {
    const user= useSelector(state=> state.user);
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)

    let variable = {}
    if(props.video){
        variable = {videoId: props.videoId, userId: props.userId}
    }else{
        variable = {commentId: props.commentId, userId: props.userId}
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
        .then(response=>{
            if(response.data.success){
                // 얼마나 많은 좋아요를 받았는지
                setLikes(response.data.likes.length)
                // 내가 이미 그 좋아요를 눌렀는지
                response.data.likes.map(like=>{
                    if(like.userId === props.userId){
                        setLikeAction('liked')
                    }
                })

            }else{
                alert('Likes에 정보를 가져오지 못했습니다.')
            }
        })

        Axios.post('/api/like/getDislikes', variable)
        .then(response=>{
            if(response.data.success){
                // 얼마나 많은 싫어요를 받았는지
                setDislikes(response.data.dislikes.length)
                // 내가 이미 그 싫어요를 눌렀는지
                response.data.dislikes.map(dislike=>{
                    if(dislike.userId === props.userId){
                        setDisLikeAction('disliked')
                    }
                })

            }else{
                alert('DisLikes에 정보를 가져오지 못했습니다.')
            }
        })


    }, [])

    const onLike = () => {
        if(user.userData.isAuth){
            if(user.userData._id !== props.writerId){
                if(LikeAction === null){
                    Axios.post('/api/like/upLike', variable)
                    .then(response => {
                        if(response.data.success){
                            // console.log(user.userData._id, props.writerId)
                            setLikes(Likes + 1)
                            setLikeAction('liked')
                            if(DisLikeAction !== null) {
                                setDisLikeAction(null)
                                setDislikes(Dislikes -1)
                            }
                        }else{
                            alert('Like를 올리지 못했습니다.')
                        }
                    })
                }else{
                    Axios.post('/api/like/unLike', variable)
                    .then(response => {
                        if(response.data.success){
                            setLikes(Likes - 1)
                            setLikeAction(null)
                        }else{
                            alert('Like를 내리지 못했습니다.')
                        }
                    })
                }
            }else{
                window.confirm('your...')
            }
        }else{
            window.confirm('login plz')
        }
    }

    const onDislike = () => {
        if(user.userData.isAuth){
            if( user.userData._id !== props.writerId){
                if(DisLikeAction !== null){
                    Axios.post('/api/like/unDislike', variable)
                    .then(response => {
                        if(response.data.success){
                            setDislikes(Dislikes - 1)
                            setDisLikeAction(null)
                        }else{
                            alert('dislike를 지우지 못했습니다.')
                        }
                    })
                }else{
                    Axios.post('/api/like/upDislike', variable)
                    .then(response => {
                        if(response.data.success){
                            setDislikes(DisLikeAction + 1)
                            setDisLikeAction('disliked')
                            
                            if(LikeAction !== null){
                                setLikeAction(null)
                                setLikes(Likes - 1)
                            }
                        }else{
                            alert('dislike를 지우지 못했습니다.')
                        }
                    })
                }
            }else{
                window.confirm('your...')
            }
        }else{
            window.confirm('login plz')
        }
    }


    return (
        <div>
            <span key= "comment-basic-like">
                <Tooltip title="Like">
                    <LikeOutlined 
                        theme={LikeAction=== 'liked'? 'filled' : 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}> {Likes} </span>
            </span>&nbsp;&nbsp;

            <span key= "comment-basic-dislike">
                <Tooltip title="Dislike">
                    <DislikeOutlined
                        theme={DisLikeAction === 'disliked'? 'filled' : 'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}> {Dislikes} </span>
            </span>&nbsp;&nbsp;
        </div>
    )
}

export default LikeDislikes
