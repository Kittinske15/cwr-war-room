//import 'react-svg-map/lib/index.css';
import 'react-svg-map/lib/'
import china from "@svg-maps/china";
import { SVGMap } from 'react-svg-map';
import LabelSVGMap from '../label-svg-map';
import React, { useState, useEffect } from 'react';

export default function China() {
  const [tooltipContent, setTooltipContent] = useState('');
  useEffect(() => { console.log("Country: ", tooltipContent); }, [tooltipContent]);
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    setWindowPosition({ x: e.clientX, y: e.clientY });
    setTooltipContent(e.target.getAttribute('name'));

  };
  useEffect(() => { }, [windowPosition]);

  useEffect(() => {
    china.locations.forEach((location, index) => {
      const textElement = document.getElementById('text_' + location.id);
      textElement.style.fontSize = "0.7rem";
      const path = document.getElementById(location.id);
      const bbox = path.getBBox();

      const centerX = bbox.x + bbox.width / 2;
      const centerY = bbox.y + bbox.height / 2;


      console.log(bbox.width, textElement.getAttribute('name'))
      if (bbox.width < 65 || bbox.height < 65) {
        textElement.style.fontSize = "0.5rem";
        console.log("Small : " + textElement.getAttribute('name'))
      }
      else if (bbox.width < 50 || bbox.height < 50) {
        textElement.style.fontSize = "0.2rem";
        console.log("Small : " + textElement.getAttribute('name'))
      }

      textElement.setAttribute('x', centerX);
      textElement.setAttribute('y', centerY);
    })
  }, []);

  const chinaMap = (
    <>
      <div
        onMouseMove={handleMouseMove}
        onMouseOut={() => setTooltipContent('')}
        style={{ position: 'relative' }}
      >

        {tooltipContent && (
          <div
            className="tooltip"
            style={{
              position: 'absolute',
              top: windowPosition.y,
              left: windowPosition.x,
              transform: 'translate(-400px, -200%)'
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
      <LabelSVGMap
        onLocationMouseMove={(e) => {
          handleMouseMove(e);
        }}
        locationClassName='location'
        className='svgMap'
        map={china}
      //locationAriaLabel={this.props.locationAriaLabel}
      //locationAriaLabel={(location) => `Country: ${location.name}`}
      >
      </LabelSVGMap>
    </>

  )

  return (
    <div className="home">
      <div className="home-header" />
      <div className='home-body'>
        {chinaMap}
      </div>
    </div>
  );
}
