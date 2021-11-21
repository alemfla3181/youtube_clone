import Axios from 'axios';
import {Card, Button, message, Avatar, Col, Typography, Row} from 'antd';
import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux';
import moment from 'moment';

const {Title} = Typography;
const {Meta} = Card;

function LandingPage(props) {
    const user = useSelector(state=> state.user);
    const [Video, setVideo] = useState([])

    useEffect(() => {
        Axios.get('/api/video/getVideos')
        .then(response=>{
            if(response.data.success){
                //console.log(response.data.videos)
                setVideo(response.data.videos)
            }else{
                alert('비디오 가져오기를 실패 했습니다.')
            }
        })
    }, [])

    const renderCards = Video.map((video, index)=> {
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        const onDelete = (id) => {
            if(window.confirm('삭제하시겠습니까?')){
                setVideo(Video.filter(video=> {
                    return video._id !== id
                }))
                Axios.post('/api/video/removeVideo')
                .then(response=>{
                    if(response.data.success){
                        //console.log(response.data.videos)
                    }else{
                        alert('비디오 삭제를 실패하였습니다.')
                    }
                })
            }
        }

        return  <Col key={index} lg={6} md={8} xs={24}>
                    <a href={`/video/${video._id}`}>
                        <div style={{position: 'relative'}}>
                        <img style={{width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                            <div className="duration">
                                <span>{minutes}분 {seconds}초</span>
                            </div>
                        </div>
                    </a>
                    <br />
                    <Meta
                        avatar={
                            <Avatar src={video.writer.image} />
                        }
                        title={video.title}
                        description=""
                    />
                    <span>{video.writer.name}</span> <br />                    
                    <span style={{marginLeft: '3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM do YY")}</span>
                    {user.userData._id === video.writer._id &&  // 로그인한 유저가 비디오 업로드한 유저일경우 삭제 버튼 활성화
                        <Button style={{width: '30%', height: '22px', marginLeft: '70%'}} 
                        onClick={() => onDelete(video._id)}>Delete</Button>
                    }
                </Col>
    })


    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <Title level={2}> Recommended </Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderCards}
                
            </Row>
        </div>
    )
}

export default LandingPage
