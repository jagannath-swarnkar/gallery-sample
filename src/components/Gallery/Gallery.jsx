import React from "react";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import CloseIcon from "@material-ui/icons/Close";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { useState, useEffect } from "react";
import { Button, Card } from "@material-ui/core";
var justifiedLayout = require("justified-layout");

/*
 * Make this component
 */

// different geometries for different grid
var Geometries = [
    [0.5,1.5,1,1.8,2.2,0.7,0.9,1.1,1.7,2,2.1,0.5,1.5,1,1.8,1.7,0.7,0.9,1.1,1.7],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [2,2,1.2,1.5,2.5,1,2,1,0.5,1.5,0.5,1,1,1,2,1,1,1.5,0.5,1.7],
    [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5]
]

export const Gallery = ({ data }) => {
  const [state, setState] = useState({
    containerWidth: 0,
    geometry: { boxes: [] },
    imageUrl: [],
    isClicked: false,
    id: null
  });

  let resizeGeometry = () => {
    let width = window.innerWidth - 16;

    setState({
      ...state,
      containerWidth: width,
      geometry: justifiedLayout(Geometries[0], {
        containerWidth: width
      })
    });
  };

  useEffect(() => {
    resizeGeometry();
    window.addEventListener("resize", resizeGeometry);
  }, []);

  // assinging new geometry while click on the grid icon
  const newGeometry = e => {
    let width = window.innerWidth - 16;
    setState({
      ...state,
      containerWidth: width,
      geometry: justifiedLayout(Geometries[e - 1], {
        containerWidth: width
      })
    });
  };

  // on clicking an image setting state with is clicked true and id to open the full page image
  const imageClickHandler = i => {
    setState({
      ...state,
      isClicked: true,
      id: i
    });
  };

  // main images list
  const images = state.geometry.boxes.map((box, i) => {
    return (
      <img
        key={i}
        className="img_div"
        src={data[i].url}
        alt={data[i].alt}
        left={box.left}
        top={box.top}
        width={box.width}
        height={box.height}
        onClick={e => imageClickHandler(i)}
      />
    );
  });

  // function for shifting next image
  const nextImage = () => {
    if (state.id < data.length - 1) {
      setState({
        ...state,
        id: state.id + 1
      });
    }
  };

  // function for shifting previous image
  const pastImage = () => {
    if (state.id > 0) {
      setState({
        ...state,
        id: state.id - 1
      });
    }
  };

  // opening a particular image which is clicked(after checking)
  if (state.isClicked) {
    return (
      <div>
        <Card className="card">
          <div id="float_right">
            <Button onClick={() => setState({ ...state, isClicked: false })}>
              <CloseIcon id="font_70" />
            </Button>
          </div>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ flexGrow: 1, alignSelf: "center" }}>
              <Button onClick={pastImage}>
                <NavigateBeforeIcon id="font_70" />
              </Button>
            </div>
            <div style={{ flexGrow: 8 }}>
              <img
                src={data[state.id].url}
                alt={data[state.id].alt}
                className="clicked_image"
              />
            </div>
            <div style={{ flexGrow: 1, alignSelf: "center" }}>
              <Button onClick={nextImage}>
                <NavigateNextIcon id="font_70" />
              </Button>
            </div>
          </div>
        </Card>
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
    <div
      className="main_div"
      style={{
        height: state.geometry.containerHeight + "px",
        width: state.containerWidth + "px"
      }}
    >
      <div className="grid_icon">
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
