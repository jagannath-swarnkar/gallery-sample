import React from "react";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import CloseIcon from "@material-ui/icons/Close";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useState, useEffect } from "react";
import { Button, Card } from "@material-ui/core";
var justifiedLayout = require("justified-layout");
/*
 * Make this component
 */

export const Gallery = ({ data }) => {
  const [url, setUrl] = useState(null);
  const [img, setImg] = useState(false);
  const [id, setId] = useState(null);
  const [geometry, setGeometry] = useState(
    justifiedLayout(
      [0.5, 1.5, 1, 1.8, 2.2, 0.7, 0.9, 1.1, 1.7, 2, 2.1, 0.5, 1.5, 1, 1.8, 1.7, 0.7, 0.9, 1.1, 1.7],
      { containerWidth: 1500 }
    )
  );
  const imgClick = (url,id) => {    
    setUrl(url);
    setId(id)
    setImg(true);
  };
  const images = data.map((e, i) => {
    return (
      <div
        onClick={(url,id) => imgClick(e.url,i)}
        className="img_div"
        style={{
          position: "absolute",
          top: `${geometry.boxes[i].top}px`,
          left: `${geometry.boxes[i].left}px`
        }}
      >
        <img
          key={i}
          src={e.url}
          width={`${geometry.boxes[i].width}px`}
          height={`${geometry.boxes[i].height}px`}
        />
      </div>
    );
  });

  const newGeometry = e => {
    if (e === 1) {
      setGeometry(
        justifiedLayout(
          [0.5, 1.5, 1, 1.8, 2.2, 0.7, 0.9, 1.1, 1.7, 2, 2.1, 0.5, 1.5, 1, 1.8, 1.7, 0.7, 0.9, 1.1, 1.7],
          { containerWidth: 1500 }
        )
      );
    } else if (e === 2) {
      setGeometry(
        justifiedLayout(
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
          { containerWidth: 1500 }
        )
      );
    } else if (e === 3) {
      setGeometry(
        justifiedLayout(
          [2,2,1.2,1.5,2.5,1,2,1,0.5,1.5,0.5,1,1,1,2,1,1,1.5,0.5,1.7,1.3,2.3,0.7],
          { containerWidth: 1500, targetRowHeight: 250 }
        )
      );
    } else if (e === 4) {
      setGeometry(
        justifiedLayout(
          [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],
          {
            containerWidth: 1500,
            targetRowHeight: 220,
            forceAspectRatio: true,
            showWidows: true
          }
        )
      );
    }
  };

  const nextImage =()=>{
    if(id < data.length-1){
      setUrl(data[id+1].url)
      setId(id+1)
    }
  }

  const pastImage =()=>{
    if(id > 0){
      setUrl(data[id-1].url)
      setId(id-1)
    }
  }


  if (img) {
    return (
      <div>
        <div style={{ marginTop: 50 }}>
          <Card style={{padding:'10px'}}>
            <div style={{ float: "right" }}>
              <Button onClick={() => setImg(false)}>
                <CloseIcon style={{ fontSize: 50 }} />
              </Button>
            </div>
            <div style={{display:'flex'}}>
              <div style={{flexGrow:1, alignSelf:'center'}}><Button onClick={pastImage}><NavigateBeforeIcon style={{fontSize:70}} /></Button></div>
              <div style={{flexGrow:8}}><img src={url} width="900px" height="700px" /></div>
              <div style={{flexGrow:1, alignSelf:'center'}}><Button onClick={nextImage}><NavigateNextIcon style={{fontSize:70}} /></Button></div>
            </div>
            
            
          </Card>
        </div>
        <div className="main_div" style={{ position: "relative" }}>
          <div>
            <Button onClick={e => newGeometry(1)}>
              <ViewQuiltIcon />
            </Button>
            <Button onClick={e => newGeometry(2)}>
              <ViewModuleIcon />
            </Button>
            <Button onClick={e => newGeometry(3)}>
              <ViewCompactIcon />
            </Button>
            <Button onClick={e => newGeometry(4)}>
              <ViewComfyIcon />
            </Button>
          </div>
          {images}
        </div>
      </div>
    );
  }

  return (
    <div className="main_div" style={{ position: "relative" }}>
      <div>
        <Button onClick={e => newGeometry(1)}>
          <ViewQuiltIcon />
        </Button>
        <Button onClick={e => newGeometry(2)}>
          <ViewModuleIcon />
        </Button>
        <Button onClick={e => newGeometry(3)}>
          <ViewCompactIcon />
        </Button>
        <Button onClick={e => newGeometry(4)}>
          <ViewComfyIcon />
        </Button>
      </div>
      {images}
    </div>
  );
};
