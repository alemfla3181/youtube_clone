import React,{useEffect, useState} from 'react'
import {Row, Col, List, Avatar,Button} from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
import LikeDislikes from './Sections/LikeDislikes';
import { useSelector } from 'react-redux';

function VideoDetailPage(props) {
    const user = useSelector(state=> state.user);
    const videoId = props.match.params.videoId
    const variable = { videoId: videoId }

    const [Comments, setComments] = useState([])
    const [VideoDetail, setVideoDetail] = useState([])
    
    useEffect(() => {

        Axios.post('/api/video/getVideoDetail',variable)
        .then(response =>{
            if(response.data.success){
                setVideoDetail(response.data.VideoDetail)
            }else{
                alert('비디오 정보를 가져오길 실패했습니다.')
            }
        })

        Axios.post('/api/comment/getComments', variable)
        .then(response=>{
            if(response.data.success){
                setComments(response.data.comments)
                //console.log(response.data.comments)
            }else{
                alert('코멘트 정보 가져오기 실패');
            }
        })
    }, [])


    const refreshFunction = (newComment) =>{
        setComments(Comments.concat(newComment))
    }

    if(VideoDetail.writer){
        const subscribeButton = (VideoDetail.writer._id !== user.userData._id) && user.userData.isAuth &&  // 로그인시에만 구독버튼 활성화, 자신의 비디오엔 비활성화
        <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{width: '100%', padding:'3rem 4rem'}}>
                        <video style={{width: '100%'}} src={`https://ancient-bastion-21512.herokuapp.com/${VideoDetail.filePath}`} controls />
                        
                        <List.Item
                            actions= {[<LikeDislikes video userId={localStorage.getItem('userId')} videoId={videoId} writerId={VideoDetail.writer._id}/>,subscribeButton]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={VideoDetail.writer.image}/>}
                                    title={VideoDetail.writer.name}
                                    description={VideoDetail.description}
                                />
                            </List.Item>

                            {/* Comments */}
                            <Comment refreshFunction={refreshFunction} commentLists={Comments} setComments={setComments} postId={VideoDetail._id}/>
                    </div>

                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else{
        return(
            <div>...loading </div>
        )
    }
}

export default VideoDetailPage