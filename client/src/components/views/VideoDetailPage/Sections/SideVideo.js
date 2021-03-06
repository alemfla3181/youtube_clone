import React,{useEffect, useState} from 'react'
import Axios from 'axios'

function SideVideo() {

    const [SideVideos, setSideVideos] = useState([])

    useEffect(() => {
        Axios.get('/api/video/getVideos')
        .then(response=>{
            if(response.data.success){
                //console.log(response.data.videos)
                setSideVideos(response.data.videos)
            }else{
                alert('비디오 가져오기를 실패 했습니다.')
            }
        })
    }, [])


    const renderSideVideo = SideVideos.map((video, index)=> {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return  <div key={index} style={{display:'flex', marginBottom:'1rem', padding: '0 2rem'}}>
            <div style={{width: '40%', marginRight: '1rem'}}>
                <a href>
                    <img style={{width:'100%', height: '100%'}} src={`https://ancient-bastion-21512.herokuapp.com/${video.thumbnail}`} alt="thumbnail" />
                </a>
            </div>

            <div style={{width: '50%'}}>
                <a href={{color: 'gray'}}>
                    <span style={{fontSize: '1rem', color:'black'}}>{video.title}</span>
                    <span>{video.writer.name}</span><br/>
                    <span>{video.views}</span><br/>
                    <span>{minutes}:{seconds}</span>
                </a>
            </div>
            SideVideo
        </div>
    })


    return (

        <React.Fragment>
            <div style={{marginTop:'3rem'}} />
            {renderSideVideo}
        </React.Fragment>

        
    )
}

export default SideVideo
