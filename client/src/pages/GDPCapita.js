import React, { useState, useEffect, useRef } from 'react';
import { colorThailand, colorScale, numberScale } from '../components/color';
import data from '../ThailandGDP.json';
import Chart from 'react-apexcharts';

export default function GDPCapita() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const CapitaChart = () => {
        const options = {
            chart: {
                id: "bar-chart",
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: ["Africa", "Asia Pacific", "Europe", "Middle East", "North America", "South America", "World"],
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
            grid: {
                show: false,
            },
        };

        const series = [
            {
                name: "Data Series 1",
                data: [2157.39, 5391.62, 32504.17, 13751.79, 57707.78, 8995.74, 12895.37],
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
                categories: ["Africa", "Southeast Asia", "Europe", "Middle East", "North America", "South America", "World"],
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
            grid: {
                show: false,
            },
        };

        const series = [
            {
                name: "Data Series 1",
                data: [6.9, 5, 8.4, 14, 7.9, 14, 8.7],
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
                categories: ["Africa (Region)", "Southeast Asia", "Europe", "Middle East (Region)", "North America", "South America", "World"],
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
            grid: {
                show: false,
            },
        };

        const series = [
            {
                name: "Data Series 1",
                data: [31.46, 28.54, 34.67, 24.54, 15.88, 29.90, 30.14],
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
                categories: ["Africa", "Asia Pacific", "Europe", "Middle East", "North America", "South America", "World"],
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
            grid: {
                show: false,
            },
        };

        const series = [
            {
                name: "Data Series 1",
                data: [33.5, null, 6.7, null, null, null, null],
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
            <video className="video-background" autoPlay muted loop>
                <source src="/assets/BG-Blue.mp4" type="video/mp4" />
            </video>
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
                {isMobile ? (
                    <div className='trading-view-box'>
                    </div>
                ) : (
                    <div className='gdp-capita-grid '>
                        <a href="/gdp-capita-detail" className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                GDP per Capital Year 2022 <br />
                                (US Dollar per Capita)
                            </div>
                            {CapitaChart()}
                            <div style={{ opacity: '0.5', fontSize: '14px', position: 'absolute', bottom: '10px' }}>*Reference: https://data.worldbank.org/</div>
                        </a>
                        <a href="/inflation-rate-detail" className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                Inflation Year 2022 <br />
                                (Annual % Change)
                            </div>
                            {InflationYearChart()}
                            <div style={{ opacity: '0.5', fontSize: '14px', position: 'absolute', bottom: '10px' }}>*Reference: https://data.worldbank.org/</div>
                        </a>
                        <a href="/import-good-detail" className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                Import of Goods & Services <br />
                                Year 2022
                            </div>
                            {ImportChart()}
                            <div style={{ opacity: '0.5', fontSize: '14px', position: 'absolute', bottom: '10px' }}>*Reference: https://data.worldbank.org/</div>
                        </a>
                        <a href="/unemployment-rate-detail" className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                Unemployment Rate <br />
                                (Annual % Change)
                            </div>
                            {UnemploymentChart()}
                            <div style={{ opacity: '0.5', fontSize: '14px', position: 'absolute', bottom: '10px' }}>*Reference: https://data.worldbank.org/</div>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}