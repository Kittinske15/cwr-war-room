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
                colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#00ff00'],
            },
            xaxis: {
                categories: ["Africa", "APAC", "Europe", "Middle East", "N. America", "S. America", "World"],
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
            yaxis: {
                show: false,
                labels: {
                    style: {
                        colors: "#fff",
                        display: "none",
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
                data: [
                    { x: 'Africa', y: 2157.4 },
                    { x: 'APAC', y: 5391.6 },
                    { x: 'Europe', y: 32504.2 },
                    { x: 'Middle East', y: 13751.8 },
                    { x: 'N. America', y: 57707.8 },
                    { x: 'S. America', y: 8995.7 },
                    { x: 'World', y: 12895.4, fillColor: '#FFFF2B' },
                ],
            },
        ];

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Chart options={options} series={series} type="bar" width="800" height="300" />
                <style>
                    {`
          .apexcharts-tooltip {
            color: #000 !important;
          }
        `}
                </style>
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
                categories: ["Africa", "APAC", "Europe", "Middle East", "N. America", "S. America", "World"],
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
            yaxis: {
                show: false,
                labels: {
                    style: {
                        colors: "#fff",
                        display: "none",
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
                data: [
                    { x: 'Africa', y: 6.9 },
                    { x: 'APAC', y: 5 },
                    { x: 'Europe', y: 8.4 },
                    { x: 'Middle East', y: 14 },
                    { x: 'N. America', y: 7.9 },
                    { x: 'S. America', y: 14 },
                    { x: 'World', y: 8.7, fillColor: '#FFFF2B' },
                ],
            },
        ];

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Chart options={options} series={series} type="bar" width="800" height="300" />
                <style>
                    {`
          .apexcharts-tooltip {
            color: #000 !important;
          }
        `}
                </style>
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
                categories: ["Africa", "APAC", "Europe", "Middle East", "N. America", "S. America", "World"],
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
            yaxis: {
                show: false,
                labels: {
                    style: {
                        colors: "#fff",
                        display: "none",
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
                data: [
                    { x: 'Africa', y: 31.5 },
                    { x: 'APAC', y: 28.5 },
                    { x: 'Europe', y: 34.7 },
                    { x: 'Middle East', y: 24.5 },
                    { x: 'N. America', y: 15.9 },
                    { x: 'S. America', y: 29.9 },
                    { x: 'World', y: 30.1, fillColor: '#FFFF2B' },
                ],
            },
        ];

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Chart options={options} series={series} type="bar" width="800" height="300" />
                <style>
                    {`
          .apexcharts-tooltip {
            color: #000 !important;
          }
        `}
                </style>
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
                categories: ["Africa", "APAC", "Europe", "Middle East", "N. America", "S. America", "World"],
                labels: {
                    style: {
                        colors: "#fff",
                    },
                },
            },
            yaxis: {
                show: false,
                labels: {
                    style: {
                        colors: "#fff",
                        display: "none",
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
                data: [
                    { x: 'Africa', y: 33.5 },
                    { x: 'APAC', y: null },
                    { x: 'Europe', y: 6.7 },
                    { x: 'Middle East', y: null },
                    { x: 'N. America', y: null },
                    { x: 'S. America', y: null },
                    { x: 'World', y: null, fillColor: '#FFFF2B' },
                ],
            },
        ];

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Chart options={options} series={series} type="bar" width="800" height="300" />
                <style>
                    {`
          .apexcharts-tooltip {
            color: #000 !important;
          }
        `}
                </style>
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
                {/* Thailand Economy */}
            </div>
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
                            <div style={{ opacity: '0.5', fontSize: '14px', position: 'absolute', bottom: '10px' }}>*Reference: worldbank</div>
                        </a>
                        <a href="/inflation-rate-detail" className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                Inflation Year 2022 <br />
                                (Annual % Change)
                            </div>
                            {InflationYearChart()}
                            <div style={{ opacity: '0.5', fontSize: '14px', position: 'absolute', bottom: '10px' }}>*Reference: worldbank</div>
                        </a>
                        <a href="/import-good-detail" className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                Import of Goods & Services <br />
                                Year 2022 (%)
                            </div>
                            {ImportChart()}
                            <div style={{ opacity: '0.5', fontSize: '14px', position: 'absolute', bottom: '10px' }}>*Reference: worldbank</div>
                        </a>
                        <a href="/unemployment-rate-detail" className='thailand-graph-box'>
                            <div className='thailand-graph-box-title'>
                                Unemployment Rate <br />
                                (Annual % Change)
                            </div>
                            {UnemploymentChart()}
                            <div style={{ opacity: '0.5', fontSize: '14px', position: 'absolute', bottom: '10px' }}>*Reference: worldbank</div>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}