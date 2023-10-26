import React, { useState, useEffect, useRef } from 'react';
import { colorThailand, colorScale, numberScale } from '../components/color';
import data from '../ThailandGDP.json';
import Chart from 'react-apexcharts';

export default function InflationRate() {
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
                categories: ["Africa (Region)", "Asia and Pacific", "Europe", "Middle East (Region)", "North America", "South America", "World"],
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
            }
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
            yaxis: {
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            }
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
            yaxis: {
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            }
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
            yaxis: {
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            }
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
                        </a>
                        <a href="/inflation-rate-detail" className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                Inflation Year 2022 <br />
                                (Annual % Change)
                            </div>
                            {InflationYearChart()}
                        </a>
                        <a href="/import-good-detail" className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                Import of Goods & Services <br />
                                Year 2022
                            </div>
                            {ImportChart()}
                        </a>
                        <a href="/unemployment-rate-detail" className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                Unemployment Rate <br />
                                (Annual % Change)
                            </div>
                            {UnemploymentChart()}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}