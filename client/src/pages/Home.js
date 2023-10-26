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
import { Link } from 'react-router-dom';


export default function Home() {
  const countries_data = data.map((item) => item["Country/Territory"]);
  const estimateGDP = data.map((item) => item["Estimate"]);
  const getColor = (num) => colorData(num);
  const [showGlobe, setShowGlobe] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [pinCompany, setPinCompany] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [highlightCP, setHighlightCP] = useState(false);

  const toggleCPHighlight = () => {
    setHighlightCP(!highlightCP);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortData = (data, order) => {
    if (order === "asc") {
      return data.slice().sort();
    } else {
      return data.slice().sort().reverse();
    }
  };

  const sortedCountriesData = sortData(countries_data, sortOrder);
  const sortedEstimateGDP = sortData(estimateGDP, sortOrder);

  console.log("sortedCountriesData: ", sortedCountriesData)
  console.log("estimateGDP: ", estimateGDP)
  console.log("sortedEstimateGDP: ", sortedEstimateGDP)

  const companyLocations = [
    {
      name: "China",
      latitude: 30.7749,
      longitude: 100,
      gdp: 5.2
    },
    {
      name: "Thailand",
      latitude: 11.9,
      longitude: 105,
      gdp: 3.4
    },
    {
      name: "India",
      latitude: 15,
      longitude: 82,
      gdp: 5.9
    },
    {
      name: "Russia",
      latitude: 57,
      longitude: 110,
      gdp: 0.7
    },
    {
      name: "USA",
      latitude: 35.7749,
      longitude: -100.4194,
      gdp: 1.8
    },
    {
      name: "Belgium",
      latitude: 50.5039,
      longitude: 4.4699,
      gdp: 0.7
    },
    {
      name: "Poland",
      latitude: 51.9194,
      longitude: 19.1451,
      gdp: 0.3
    },
    {
      name: "Turkey",
      latitude: 38.9637,
      longitude: 35.2433,
      gdp: 1.2
    },
    {
      name: "Malaysia",
      latitude: 4.2105,
      longitude: 101.9758,
      gdp: 4.5
    },
    {
      name: "United Kingdom",
      latitude: 55.3781,
      longitude: 3.4360,
      gdp: -0.3
    },
    {
      name: "Pakistan",
      latitude: 30.3753,
      longitude: 69.3451,
      gdp: 0.5
    },
    {
      name: "Vietnam",
      latitude: 14.0583,
      longitude: 108.2772,
      gdp: 5.8
    },
    {
      name: "Laos",
      latitude: 19.8563,
      longitude: 102.4955,
      gdp: 2.7
    },
    {
      name: "Myanmar",
      latitude: 21.9162,
      longitude: 95.9560,
      gdp: 2.6
    },
    {
      name: "Singapore",
      latitude: 1.3521,
      longitude: 103.8198,
      gdp: 1.5
    },
    {
      name: "Cambodia",
      latitude: 12.5657,
      longitude: 104.9910,
      gdp: 5.8
    },
    {
      name: "Sri Lanka",
      latitude: 7.8731,
      longitude: 80.7718,
      gdp: -3
    },
    {
      name: "Bangladesh",
      latitude: 23.6850,
      longitude: 90.3563,
      gdp: 5.5
    },
    {
      name: "Indonesia",
      latitude: 0.7893,
      longitude: 113.9213,
      gdp: 5
    },
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
          // window.location.href = `/stock`;
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

      g.selectAll('path')
        .attr('fill', (d) => {
          if (highlightCP) {
            const countryGDP = getGDP(countryName[d.id]);
            if (["Indonesia", "Bangladesh", "Vietnam", "Laos", "Myanmar", "Singapore", "Cambodia", "Sri Lanka", "Thailand", "Russia", "China", "India", "United States", "Belgium", "Poland", "Turkey", "Malaysia", "United Kingdom", "Pakistan"].includes(countryName[d.id])) {
              return getColor(countryGDP);
            } else {
              g.select(`text.country-name-${d.id}`).style('visibility', 'hidden');
              return 'grey';
            }
          } else {
            g.select(`text.country-name-${d.id}`).style('visibility', 'visible');
            return getColor(getGDP(countryName[d.id]));
          }
        });
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
            .attr("width", 20)
            .attr("height", 20)
            .attr("xlink:href", companyPinImage);
        });
      }
    }
  }, [showMap, pinCompany, companyLocations]);

  const displayList = (typeData1, typeData2) => typeData1.slice(1, 100).map((data, index) => (
    <div className="list-country" >
      <p>{data}</p>
      {/* <span></span> */}
      <p>{typeData2[index]} % </p>
    </div>
  ));

  const displayCP = (companyLocations) => companyLocations.map((company, index) => (
    <div className="list-country" key={index}>
      <p>{company.name.replace(/^CP\s*/, '')}</p>
      <p>{company.gdp} % </p>
    </div>
  ));

  return (
    <div className="home">
      <div className="home-header" />
      {/* <div className="global-title">
        Global Macro Econ
      </div> */}
      <div className="oversea-title">
        <a href='/oversea'>
          Oversea Market
        </a>
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
            <Link to="/cp-map">
              <ListButton
                variant="outline"
                disableRipple
                // onClick={() => {
                //   setPinCompany(!pinCompany);
                //   toggleCPHighlight();
                // }}
                style={{ backgroundColor: highlightCP ? 'green' : 'transparent' }}
              >
                CP
              </ListButton>
            </Link>
            <ListButton variant="outline" disableRipple>
              Country
            </ListButton>
          </Stack>
          <div className="list-container">
            <Button
              endIcon={sortOrder === "asc" ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
              onClick={toggleSortOrder}
              size="large"
              style={{ color: "white" }}
            >
              Country
            </Button>
            <p> Value </p>
          </div>
          {pinCompany ? (
            <div className="country-list-scroll">
              {displayCP(companyLocations)}
            </div>
          ) : (
            <div className="country-list-scroll">
              {displayList(sortedCountriesData, sortedEstimateGDP)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}