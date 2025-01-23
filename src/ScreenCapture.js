import React, { useState, useEffect, useCallback } from 'react';
import html2canvas from 'html2canvas';

const ScreenCapture = ({ onStartCapture = () => null, onEndCapture = () => null, children }) => {
  const [state, setState] = useState({
    on: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    crossHairsTop: 0,
    crossHairsLeft: 0,
    isMouseDown: false,
    windowWidth: 0,
    windowHeight: 0,
    borderWidth: 0,
    cropPositionTop: 0,
    cropPositionLeft: 0,
    cropWidth: 0,
    cropHeigth: 0,
  });

  const handleWindowResize = useCallback(() => {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    setState((prevState) => ({
      ...prevState,
      windowWidth,
      windowHeight,
    }));
  }, []);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [handleWindowResize]);

  const handleStartCapture = () => setState((prevState) => ({ ...prevState, on: true }));

  const handleMouseMove = (e) => {
    const { isMouseDown, windowWidth, windowHeight, startX, startY, borderWidth } = state;

    if (!isMouseDown) return;

    let cropPositionTop = startY;
    let cropPositionLeft = startX;
    const endX = e.clientX;
    const endY = e.clientY;
    const isStartTop = endY >= startY;
    const isStartBottom = endY <= startY;
    const isStartLeft = endX >= startX;
    const isStartRight = endX <= startX;
    const isStartTopLeft = isStartTop && isStartLeft;
    const isStartTopRight = isStartTop && isStartRight;
    const isStartBottomLeft = isStartBottom && isStartLeft;
    const isStartBottomRight = isStartBottom && isStartRight;

    let newBorderWidth = borderWidth;
    let cropWidth = 0;
    let cropHeigth = 0;

    if (isStartTopLeft) {
      newBorderWidth = `${startY}px ${windowWidth - endX}px ${windowHeight - endY}px ${startX}px`;
      cropWidth = endX - startX;
      cropHeigth = endY - startY;
    }

    if (isStartTopRight) {
      newBorderWidth = `${startY}px ${windowWidth - startX}px ${windowHeight - endY}px ${endX}px`;
      cropWidth = startX - endX;
      cropHeigth = endY - startY;
      cropPositionLeft = endX;
    }

    if (isStartBottomLeft) {
      newBorderWidth = `${endY}px ${windowWidth - endX}px ${windowHeight - startY}px ${startX}px`;
      cropWidth = endX - startX;
      cropHeigth = startY - endY;
      cropPositionTop = endY;
    }

    if (isStartBottomRight) {
      newBorderWidth = `${endY}px ${windowWidth - startX}px ${windowHeight - startY}px ${endX}px`;
      cropWidth = startX - endX;
      cropHeigth = startY - endY;
      cropPositionLeft = endX;
      cropPositionTop = endY;
    }

    setState((prevState) => ({
      ...prevState,
      crossHairsTop: e.clientY,
      crossHairsLeft: e.clientX,
      borderWidth: newBorderWidth,
      cropWidth,
      cropHeigth,
      cropPositionTop,
      cropPositionLeft,
    }));
  };

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startY = e.clientY;

    setState((prevState) => ({
      ...prevState,
      startX,
      startY,
      cropPositionTop: startY,
      cropPositionLeft: startX,
      isMouseDown: true,
      borderWidth: `${prevState.windowWidth}px ${prevState.windowHeight}px`,
    }));
  };

  const handleMouseUp = () => {
    handleClickTakeScreenShot();
    setState((prevState) => ({
      ...prevState,
      on: false,
      isMouseDown: false,
      borderWidth: 0,
    }));
  };

  const handleClickTakeScreenShot = () => {
    const { cropPositionTop, cropPositionLeft, cropWidth, cropHeigth } = state;
    const body = document.querySelector('body');

    html2canvas(body).then((canvas) => {
      const croppedCanvas = document.createElement('canvas');
      const croppedCanvasContext = croppedCanvas.getContext('2d');

      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeigth;

      croppedCanvasContext.drawImage(
        canvas,
        cropPositionLeft,
        cropPositionTop,
        cropWidth,
        cropHeigth,
        0,
        0,
        cropWidth,
        cropHeigth
      );

      onEndCapture(croppedCanvas.toDataURL());
    });
  };

  const renderChild = () => {
    const props = {
      onStartCapture: handleStartCapture,
    };

    return typeof children === 'function' ? children(props) : children;
  };

  const {
    on,
    crossHairsTop,
    crossHairsLeft,
    borderWidth,
    isMouseDown,
  } = state;

  if (!on) return renderChild();

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {renderChild()}
      <div
        className={`overlay ${isMouseDown && 'highlighting'}`}
        style={{ borderWidth }}
      />
      <div
        className="crosshairs"
        style={{ left: crossHairsLeft + 'px', top: crossHairsTop + 'px' }}
      />
    </div>
  );
};

export default ScreenCapture;
