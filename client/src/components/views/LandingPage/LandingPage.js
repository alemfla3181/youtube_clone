import Axios from 'axios';
import {Card, Icon, message, Avatar, Col, Typography, Row} from 'antd';
import React,{useEffect,useState} from 'react'
import { FaCode } from "react-icons/fa";
import moment from 'moment';

const {Title} = Typography;
const {Meta} = Card;

function LandingPage(props) {

    const [Video, setVideo] = useState([])

    useEffect(() => {
        Axios.get('/api/video/getVideos')
        .then(response=>{
            if(response.data.success){
                console.log(response.data.videos)
                setVideo(response.data.videos)
            }else{
                alert('비디오 가져오기를 실패 했습니다.')
            }
        })
    }, [])

    const onDelete = (id) => {
        setVideo(Video.filter(video => video.id !== id))
        console.log(id)
    }

    const renderCards = Video.map((video, index)=> {
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

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
                    <span>{video.writer.name}</span> <br/>
                    <span style={{marginLeft: '3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM do YY")}</span>
                    <button style={{width: '40%', height: '22px'}} onClick={onDelete}>Delete</button>
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
