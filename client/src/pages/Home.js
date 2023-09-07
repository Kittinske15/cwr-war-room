// import "react-svg-map/lib/";
// import World from "@svg-maps/world";
import React, { useEffect, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import * as d3 from "d3";
import { feature } from 'topojson';
import { colorLegend } from "../components/colorLegend";
import { colorData, colorScale, numberScale } from "../components/color";
import data from "../gdp.json";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSpring, animated } from 'react-spring';

export default function Home() {
  const countries_data = data.map((item) => item["Country/Territory"]);
  const estimateGDP = data.map((item) => item["Estimate"]);
  const getColor = (num) => colorData(num);
  const [showGlobe, setShowGlobe] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [pinCompany, setPinCompany] = useState(false);
  const companyLocations = [
    {
      name: "CP China",
      latitude: 30.7749,
      longitude: 100,
    },
    {
      name: "CP Thailand",
      latitude: 11.9,
      longitude: 105,
    },
    {
      name: "CP India",
      latitude: 15,
      longitude: 82,
    },
    {
      name: "CP Russia",
      latitude: 57,
      longitude: 110,
    },
    {
      name: "CP USA",
      latitude: 35.7749,
      longitude: -100.4194,
    }
  ]
  const companyPinImage = require('../pin/cp-logo.png')

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGlobe(false);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const ListButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    borderColor: '#d9d9d9',
    color: '#ffffff',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#000000',
      backgroundColor: '#eeee',
      borderColor: '#ffffff',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#ffffff',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });

  const [sortCountry, setSortCountry] = useState(true);

  const svgRef = useRef();

  useEffect(() => {
    const width = 1300;
    const height = 620;
    const colors = colorScale();
    const range = numberScale();
    const getGDP = (country) => estimateGDP[countries_data.findIndex((isCountry) => isCountry === country)];

    const scale = d3.scaleOrdinal()
      .domain(range)
      .range(colors);
    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

    const projection = geoNaturalEarth1().translate([width / 2, height / 2]);
    const pathGenerator = geoPath().projection(projection);

    const g = svg.append('g');

    g.append('path')
      .attr('class', 'sphere')
      .attr('d', pathGenerator({ type: 'Sphere' }));

    svg.call(d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);

      }));

    // create a tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('padding', '10px')
      .style('background', 'rgba(0,0,0,0.6)')
      .style('border-radius', '5px')
      .style('color', 'white');

    Promise.all([
      d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
      d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
    ]).then(([tsvData, topoJSONdata]) => {
      const countryName = tsvData.reduce((accumulator, d) => {
        accumulator[d.iso_n3] = d.name;
        return accumulator;
      }, {});

      //creat a map
      const countries = feature(topoJSONdata, topoJSONdata.objects.countries);
      g.selectAll('path').data(countries.features)
        .enter().append('path')
        .attr('class', 'country')
        .attr('d', pathGenerator)
        .attr('fill', (d) => getColor(
          getGDP(countryName[d.id])
        ))
        .on("click", (event, d) => {
          //console.log(countryName[d.id] )
          window.location.href = `/${countryName[d.id]}`;
        })
        .on('mouseover', function (e, d) {
          let GDP = getGDP(countryName[d.id])
          if (GDP !== undefined) {
            GDP = GDP + '%'
          }
          else { GDP = 'No data' }
          tooltip
            .html(
              `${countryName[d.id]
              }: ${GDP}`
            )
            .style('visibility', 'visible');
        })
        .on('mousemove', function (event) {
          tooltip
            .style('top', event.pageY - 10 + 'px')
            .style('left', event.pageX + 10 + 'px')
            ;
        })
        .on('mouseout', function () {
          tooltip.style('visibility', 'hidden');
        })
        .append('title')
        // .text(d => "Country: "+ countryName[d.id] +"( " 
        //   + getGDP(countryName[d.id]) + " )" )


        ;
      //text Label Name_country
      g.selectAll("text.country-name")
        .data(countries.features)
        .enter()
        .append("text")
        .attr("class", "country-name")
        .attr("x", d => pathGenerator.centroid(d)[0])
        .attr("y", d => pathGenerator.centroid(d)[1])
        .attr("text-anchor", "middle")
        .attr("font-size", "6px")
        .style("font-weight", "light")
        .style("fill", "#CCCCCC")
        .text(d => countryName[d.id]);

      //colorLengend
      svg.call(colorLegend, {
        colorScale: scale,
        colorLegendLabel:
          'GDP (2023)',
        colorLegendX: 35,
        colorLegendY: 470,
      });


    });

  }, [countries_data, estimateGDP]);

  useEffect(() => {
    if (showMap) {
      const width = 1300;
      const height = 620;
      const colors = colorScale();
      const range = numberScale();
      const getGDP = (country) => estimateGDP[countries_data.findIndex((isCountry) => isCountry === country)];

      const scale = d3.scaleOrdinal()
        .domain(range)
        .range(colors);
      const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

      if (pinCompany) {
        const projection = geoNaturalEarth1().translate([width / 2, height / 2]);

        companyLocations.forEach((company) => {
          const pinCoordinates = projection([company.longitude, company.latitude]);

          svg
            .append("image")
            .attr("class", "company-pin-image")
            .attr("x", pinCoordinates[0] - 20)
            .attr("y", pinCoordinates[1] - 20) 
            .attr("width", 18)
            .attr("height", 18)
            .attr("xlink:href", companyPinImage);
        });
      }
    }
  }, [showMap, pinCompany, companyLocations]);

  const displayList = (typeData1, typeData2) => typeData1.slice(1, 20).map((data, index) => (
    <div className="list-country" >
      <p>{data}</p>
      {/* <span></span> */}
      <p>{typeData2[index]} % </p>
    </div>
  ));

  return (
    <div className="home">
      <div className="home-header" />
      <div className="global-title">
        Global Macro Econ
      </div>
      <div className="home-body">
        <div className="map-container">
          <p className="map-header">GDP growth </p>
          <hr />

          <div className="container">
            <div className="content">
              {showGlobe ? <img src="assets/rotate-globe.gif" /> : <svg className="map" ref={svgRef}></svg>}
            </div>
          </div>
          <div className="reference">* Reference: International Monetary Fund</div>
        </div>

        <div className="list">
          <p className="list-header">List ( 2023 ) </p>
          <hr />
          <Stack direction="row" gap={2} className="list-button">
            <ListButton variant="outline" disableRipple onClick={() => setPinCompany(!pinCompany)}>
              CP
            </ListButton>
            <ListButton variant="outline" disableRipple>
              Country
            </ListButton>
          </Stack>
          <div className="list-container">
            <Button endIcon={sortCountry ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
              onClick={() => { setSortCountry(!sortCountry); }}
              size="large"
              style={{ color: 'white' }}
            >
              Country
            </Button>
            <p> Value </p>
          </div>
          <div className="country-list-scroll">
            {displayList(countries_data, estimateGDP)}
          </div>
        </div>
      </div>
    </div>
  );
}