import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { colorLegend } from '../components/colorLegend';
import { colorThailand, colorScale, numberScale } from '../components/color';
import data from '../ThailandGDP.json';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import dayjs from 'dayjs';
import axios from 'axios';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';

export default function GDPCapita() {
    const provinces_data = data.map((item) => item['Province_ENG']);
    const estimateGDP = data.map((item) => item['GPP2020']);
    const getColor = (num) => colorThailand(num);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const pinImage = require('../pin/cp-logo2.png')

    const [selectedButton, setSelectedButton] = useState('Button 1');

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    const svgRef = useRef();

    const CapitaChart = () => {
        const options = {
            chart: {
                id: "bar-chart",
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: ["Africa (Region)", "Asia and Pacific", "Europe", "Middle East (Region)", "North America", "South America", "World"],
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
        };

        const series = [
            {
                name: "Data Series 1",
                data: [42, 78, 60, 91, 55, 72, 89],
            },
        ];

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Chart options={options} series={series} type="bar" width="500" />
            </div>
        );
    };

    const InflationYearChart = () => {
        const options = {
            chart: {
                id: "bar-chart",
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: ["Africa", "Asia and Pacific", "Europe", "Middle East", "North America", "South America", "World"],
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
        };

        const series = [
            {
                name: "Data Series 1",
                data: [42, 78, 60, 91, 55, 72, 89],
            },
        ];

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Chart options={options} series={series} type="bar" width="500" />
            </div>
        );
    };

    const ImportChart = () => {
        const options = {
            chart: {
                id: "bar-chart",
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: ["Africa (Region)", "Asia and Pacific", "Europe", "Middle East (Region)", "North America", "South America", "World"],
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
        };

        const series = [
            {
                name: "Data Series 1",
                data: [42, 78, 60, 91, 55, 72, 89],
            },
        ];

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Chart options={options} series={series} type="bar" width="500" />
            </div>
        );
    };

    const UnemploymentChart = () => {
        const options = {
            chart: {
                id: "bar-chart",
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: ["Africa (Region)", "Asia and Pacific", "Europe", "Middle East (Region)", "North America", "South America", "World"],
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
        };

        const series = [
            {
                name: "Data Series 1",
                data: [42, 78, 60, 91, 55, 72, 89],
            },
        ];

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Chart options={options} series={series} type="bar" width="500" />
            </div>
        );
    };


    return (
        <div className="home">
            <a className="home-nav" href='/' />
            <div className="global-title">
                <a href='/Thailand'>
                    <img className="left-arrow" src="/assets/left-arrow-blue.png" />
                </a>
                Thailand Economy
            </div>
            <div className="market-stock-title">
                <a href='/stock'>
                    Capital Market
                </a>
            </div>
            <div className='thailand-body'>
                {/* <div className='thailand-box'>
          <svg className="map" ref={svgRef}></svg>
          <div className="reference">* Reference: สำนักงานคณะกรรมการพัฒนาการเศรษฐกิจและสังคมแห่งชาติ สำนักนายกรัฐมนตรี</div>
        </div> */}
                {isMobile ? (
                    <div className='trading-view-box'>
                    </div>
                    // <div className='trading-view-box'>
                    //   <div className='img-stock-container'>
                    //     <img src='/assets/cpf-stock.png' />
                    //   </div>
                    //   <div className='img-stock-container'>
                    //     <img src='/assets/cpall-stock.png' />
                    //   </div>
                    //   <div className='img-stock-container'>
                    //     <img src='/assets/true-stock.png' />
                    //   </div>
                    //   <div className='img-stock-container'>
                    //     <img src='/assets/makro-stock.png' />
                    //   </div>
                    // </div>
                ) : (
                    <div className='gdp-capita-grid '>
                        <a href="/your-other-page-url" className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                GDP per Capital Year 2022 <br />
                                (US Dollar per Capita)
                            </div>
                            {CapitaChart()}
                        </a>
                        <div className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                Inflation Year 2022 <br />
                                (Annual % Change)
                            </div>
                            {InflationYearChart()}
                        </div>
                        <div className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                Import of Goods & Services <br />
                                Year 2022
                            </div>
                            {ImportChart()}
                        </div>
                        <div className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                Unemployment Rate <br />
                                (Annual % Change)
                            </div>
                            {UnemploymentChart()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}