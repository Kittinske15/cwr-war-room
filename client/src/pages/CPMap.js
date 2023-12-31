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
import { Link } from 'react-router-dom';

export default function Home() {
    const countries_data = data.map((item) => item["Country/Territory"]);
    const estimateGDP = data.map((item) => item["Estimate"]);
    const getColor = (num) => colorData(num);
    const [showGlobe, setShowGlobe] = useState(true);
    const [showMap, setShowMap] = useState(true);
    const [pinCompany, setPinCompany] = useState(true);
    const [sortOrder, setSortOrder] = useState("asc");
    const [highlightCP, setHighlightCP] = useState(false);
    const specialCompanyNames = ['Netherlands', 'Norway', 'Hong Kong', 'Denmark', 'France', 'Japan', 'Taiwan', 'Brazil', 'British Virgin Islands', 'Cayman Islands'];

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

    const roundUpToInteger = (formattedNumber) => {
        const number = parseFloat(formattedNumber.replace(/,/g, ''));
        const roundedNumber = Math.ceil(number);
        return roundedNumber;
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
            gdp: 5.2,
            profit: 'something',
            RegisterCapital: "6,258.33"
        },
        {
            name: "Thailand",
            latitude: 11.9,
            longitude: 105,
            gdp: 3.4,
            profit: 'something',
            RegisterCapital: "67,424.55"
        },
        {
            name: "India",
            latitude: 17,
            longitude: 76,
            gdp: 5.9,
            profit: 'something',
            RegisterCapital: "787.94"
        },
        {
            name: "Russia",
            latitude: 60,
            longitude: 110,
            gdp: 0.7,
            profit: 'something',
            RegisterCapital: "5,277.29"
        },
        {
            name: "United States",
            latitude: 35.7749,
            longitude: -100.4194,
            gdp: 1.8,
            profit: 'something',
            RegisterCapital: "294.45"
        },
        {
            name: "Belgium",
            latitude: 50.5039,
            longitude: 4.4699,
            gdp: 0.7,
            profit: 'something',
            RegisterCapital: "1,0749.87"
        },
        {
            name: "Poland",
            latitude: 51.9194,
            longitude: 19.1451,
            gdp: 0.3,
            profit: 'something',
            RegisterCapital: "91.03"
        },
        {
            name: "Turkey",
            latitude: 38.9637,
            longitude: 35.2433,
            gdp: 1.2,
            profit: 'something',
            RegisterCapital: "272.36"
        },
        {
            name: "Malaysia",
            latitude: 4.2105,
            longitude: 101.9758,
            gdp: 4.5,
            profit: 'something',
            RegisterCapital: "2,379.70"
        },
        {
            name: "United Kingdom",
            latitude: 53.3781,
            longitude: -1.4360,
            gdp: -0.3,
            profit: 'something',
            RegisterCapital: "13.27"
        },
        {
            name: "Pakistan",
            latitude: 28.3753,
            longitude: 68.3451,
            gdp: 0.5,
            profit: 'something',
            RegisterCapital: "0"
        },
        {
            name: "Vietnam",
            latitude: 14.0583,
            longitude: 108.2772,
            gdp: 5.8,
            profit: 'something',
            RegisterCapital: "2,449.75"
        },
        {
            name: "Laos",
            latitude: 19.8563,
            longitude: 102.4955,
            gdp: 2.7,
            profit: 'something',
            RegisterCapital: "150"
        },
        {
            name: "Myanmar",
            latitude: 21.9162,
            longitude: 95.9560,
            gdp: 2.6,
            profit: 'something',
            RegisterCapital: "0"
        },
        {
            name: "Singapore",
            latitude: -1.3521,
            longitude: 102.8198,
            gdp: 1.5,
            profit: 'something',
            RegisterCapital: "0.39"
        },
        {
            name: "Cambodia",
            latitude: 12.5657,
            longitude: 104.9910,
            gdp: 5.8,
            profit: 'something',
            RegisterCapital: "674.07"
        },
        {
            name: "Sri Lanka",
            latitude: 7.8731,
            longitude: 80.7718,
            gdp: -3,
            profit: 'something',
            RegisterCapital: "16.87"
        },
        {
            name: "Bangladesh",
            latitude: 23.6850,
            longitude: 90.3563,
            gdp: 5.5,
            profit: 'something',
            RegisterCapital: "0"
        },
        {
            name: "Indonesia",
            latitude: 0.7893,
            longitude: 113.9213,
            gdp: 5,
            profit: 'something',
            RegisterCapital: "0"
        },
        {
            name: "Japan",
            latitude: 35.8893,
            longitude: 137.9213,
            gdp: 1.3,
            profit: 'something',
            RegisterCapital: "15.20"
        },
        {
            name: "Taiwan",
            latitude: 23.8893,
            longitude: 121.9213,
            gdp: 2.1,
            profit: 'something',
            RegisterCapital: "1,871.34"
        },
        {
            name: "Brazil",
            latitude: -5.7749,
            longitude: -60.4194,
            gdp: 0.9,
            profit: 'something',
            RegisterCapital: "2.27"
        },
        {
            name: "British Virgin Islands",
            latitude: 15.7749,
            longitude: -60.4194,
            gdp: 0,
            profit: 'something',
            RegisterCapital: "3.51"
        },
        {
            name: "Cayman Islands",
            latitude: 17.7749,
            longitude: -78.4194,
            gdp: 0,
            profit: 'something',
            RegisterCapital: "8,231.11"
        },
        {
            name: "Denmark",
            latitude: 55.5039,
            longitude: 8.4699,
            gdp: 0,
            profit: 'something',
            RegisterCapital: "6.20"
        },
        {
            name: "France",
            latitude: 45.5039,
            longitude: 2.4699,
            gdp: 0.7,
            profit: 'something',
            RegisterCapital: "0"
        },
        {
            name: "Hong Kong",
            latitude: 23.7749,
            longitude: 113,
            gdp: 3.5,
            profit: 'something',
            RegisterCapital: "14.67"
        },
        {
            name: "Netherlands",
            latitude: 52.5039,
            longitude: 4.4699,
            gdp: 1,
            profit: 'something',
            RegisterCapital: "12,500.39"
        },
        {
            name: "Norway",
            latitude: 62.5039,
            longitude: 9.4699,
            gdp: 2.1,
            profit: 'something',
            RegisterCapital: "656.53"
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
        const width = 1200;
        const height = 620;
        const colors = colorScale();
        const range = numberScale();
        const initialScale = 1.3; // Adjust the scale factor as needed
        const initialTransform = d3.zoomIdentity.scale(initialScale);
        const getGDP = (country) => estimateGDP[countries_data.findIndex((isCountry) => isCountry === country)];

        const scale = d3.scaleOrdinal()
            .domain(range)
            .range(colors);
        const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

        const projection = geoNaturalEarth1().translate([width / 3.2, height / 2.5]);
        const pathGenerator = geoPath().projection(projection);

        const g = svg.append('g');
        g.attr('transform', initialTransform);

        g.append('path')
            .attr('class', 'sphere')
            .attr('d', pathGenerator({ type: 'Sphere' }));

        const zoom = d3.zoom()
            .scaleExtent([1.4, 8])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoom)
            .call(zoom.transform, d3.zoomIdentity.scale(1.5));

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

            // create a map
            const countries = feature(topoJSONdata, topoJSONdata.objects.countries);
            g.selectAll('path').data(countries.features)
                .enter().append('path')
                .attr('class', 'country')
                .attr('d', pathGenerator)
                .attr('fill', (d) => {
                    const countryGDP = getGDP(countryName[d.id]);
                    if (pinCompany && companyLocations.some(location => location.name === countryName[d.id])) {
                        return getColor(countryGDP);
                    } else {
                        return 'grey';
                    }
                })
                .on("click", (event, d) => {
                    //console.log(countryName[d.id] )
                    window.location.href = `/${countryName[d.id]}`;
                    // window.location.href = `/stock`;
                })
                .on('mouseover', function (e, d) {
                    const GDP = getGDP(countryName[d.id]);
                    const country = companyLocations.find(location => location.name === countryName[d.id]);
                    const displayGDP = country ? country.gdp : GDP;

                    tooltip
                        .html(
                            `${countryName[d.id]
                            }: ${displayGDP} %`
                        )
                        .style('visibility', 'visible');
                })
                .on('mousemove', function (event) {
                    tooltip
                        .style('top', event.pageY - 10 + 'px')
                        .style('left', event.pageX + 10 + 'px');
                })
                .on('mouseout', function () {
                    tooltip.style('visibility', 'hidden');
                });

            g.selectAll("text.country-name")
                .data(countries.features)
                .enter()
                .append("text")
                .attr("class", "country-name")
                .attr("x", d => pathGenerator.centroid(d)[0])
                .attr("y", d => pathGenerator.centroid(d)[1])
                .attr("text-anchor", "middle")
                .attr("font-size", "8px")
                .style("font-weight", "light")
                .style("fill", d => {
                    const countryGDP = getGDP(countryName[d.id]);
                    if (pinCompany && companyLocations.some(location => location.name === countryName[d.id])) {
                        return "#CCCCCC"; // Display country name in grey
                    } else {
                        return "transparent"; // Hide country name for greyed-out countries
                    }
                })
                .text(d => countryName[d.id]);

            g.selectAll('circle.company-marker')
                .data(companyLocations)
                .enter()
                .append('circle')
                .attr('class', 'company-marker')
                .attr('cx', d => projection([d.longitude, d.latitude])[0])
                .attr('cy', d => projection([d.longitude, d.latitude])[1])
                .attr('r', 3)
                .attr('fill', d => specialCompanyNames.includes(d.name) ? 'black' : 'red')
                .attr('opacity', 0.7)
                .on('click', (event, d) => {
                    console.log(`Company Name: ${d.name}`);
                });


            // text Label Name_country
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

            // colorLegend
            // svg.call(colorLegend, {
            //     colorScale: scale,
            //     colorLegendLabel: 'GDP (2023)',
            //     colorLegendX: 35,
            //     colorLegendY: 470,
            // });
        });
    }, [countries_data, estimateGDP, pinCompany, companyLocations]);

    const displayList = (typeData1, typeData2) => typeData1.slice(1, 100).map((data, index) => (
        <div className="list-country" >
            <p>{data}</p>
            {/* <span></span> */}
            <p>{typeData2[index]} % </p>
            <p>{typeData2[index]} % </p>
        </div>
    ));

    const displayCP = (companyLocations) => companyLocations.map((company, index) => (
        <div className="list-country">
            {console.log("company.RegisterCapital: ", company.RegisterCapital)}
            <p style={{ fontSize: '20px' }}>{company.name.replace(/^CP\s*/, '')}</p>
            <p style={{ fontSize: '20px' }}>{company.gdp}</p>
            <p style={{ fontSize: '20px' }}>{roundUpToInteger(company.RegisterCapital).toLocaleString()}</p>
        </div>
    ));

    return (
        <div className="home">
            <video className="video-background" autoPlay muted loop>
                <source src="/assets/BG-Blue.mp4" type="video/mp4" />
            </video>
            <a className="home-nav" href='/' />
            <div className="home-header" />
            <div className="oversea-title">
                <a href="/Thailand">
                    <div class="banner">
                        <img src="/assets/china-menu-item.png" alt="Global Economy" />
                        <h2>Global Economy</h2>
                    </div>
                </a>
                <a href="/stock">
                    <div class="banner">
                        <img src="/assets/china-menu-item.png" alt="Capital Market" />
                        <h2>Capital Market</h2>
                    </div>
                </a>
                <a href="/oversea">
                    <div class="banner">
                        <img src="/assets/china-menu-item.png" alt="Oversea Market" />
                        <h2>Oversea Market</h2>
                    </div>
                </a>
            </div>
            <div className="cp-body">
                <div className="map-container">
                    {/* <p className="map-header">GDP growth </p>
                    <hr /> */}

                    <div className="container" style={{ marginBottom: '60px' }}>
                        <div className="content">
                            {showGlobe ? <img src="assets/rotate-globe.gif" /> : <svg className="map" ref={svgRef}></svg>}
                        </div>
                    </div>
                    <div className="gdp-bar">
                        <div>GDP (2023)</div>
                        <div className="gdp-container">
                            <div className="gdp-dgreen"></div>
                            <div>6% or more</div>
                        </div>
                        <div className="gdp-container">
                            <div className="gdp-green"></div>
                            <div>3% - 6%</div>
                        </div>
                        <div className="gdp-container">
                            <div className="gdp-lgreen"></div>
                            <div>0% - 3%</div>
                        </div>
                        <div className="gdp-container">
                            <div className="gdp-yellow"></div>
                            <div>-3% - 0%</div>
                        </div>
                        <div className="gdp-container">
                            <div className="gdp-red"></div>
                            <div>less than -3%</div>
                        </div>
                        <div className="gdp-container">
                            <div className="gdp-black"></div>
                            <div>(sale office)</div>
                        </div>
                    </div>
                    <div className="reference">* Reference: International Monetary Fund</div>
                </div>

                <div className="list">
                    <Stack direction="row" gap={2} className="list-button">
                        <Link className="country-btn" to="/cp-map">
                            <ListButton
                                variant="outline"
                                disableRipple
                                // onClick={() => {
                                //   setPinCompany(!pinCompany);
                                //   toggleCPHighlight();
                                // }}
                                style={{ borderRadius: '8px', fontSize: '20px' }}
                            >
                                CP
                            </ListButton>
                        </Link>
                        <Link to="/">
                            <ListButton variant="outline" disableRipple style={{ fontSize: '20px' }}>
                                Country
                            </ListButton>
                        </Link>
                    </Stack>
                    <div className="list-container" style={{ textAlign: 'center' }}>
                        <Button
                            endIcon={sortOrder === "asc" ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                            onClick={toggleSortOrder}
                            size="large"
                            style={{ color: "white", fontSize: '20px' }}
                        >
                            Country
                        </Button>
                        <p style={{ fontSize: '20px', fontWeight: '400' }}>GDP (%)</p>
                        <p style={{ fontSize: '20px', fontWeight: '400' }}>Registered Capital <br></br>($M)</p>
                        <p></p>
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