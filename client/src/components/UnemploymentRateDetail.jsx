import React, { useState, useEffect, useRef } from "react";
import { colorThailand, colorScale, numberScale } from "../components/color";
import data from "../ThailandGDP.json";
import Chart from "react-apexcharts";

export default function UnemploymentRateDetail() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const CapitaChart = () => {
    const categories = [
      "Africa",
      "APAC",
      "Europe",
      "Middle East",
      "N. America",
      "S. America",
      "World",
    ];

    const realData = [
      [
        24.9, 24.8, 24.9, 24.7, 25.1, 25.4, 26.7, 27.5, 27.1, 28.7, 29.2, 34.3,
        33.5, 32.8, 32.8, 32.9, 33.2, 33.5, 33.8,
      ],
      [null],
      [
        10.3, 10.3, 11.5, 12.1, 11.7, 11, 10.1, 9.2, 8.2, 7.6, 8, 7.7, 6.7, 6.6,
        6.5, 6.4, 6.3, 6.3, 6.3,
      ],
      [null],
      [null],
      [null],
      [null],
    ];

    const customYValues = [5, 10, 20, 25, 30, 35];

    const data = realData.map((dataPoints, index) => ({
      name: categories[index],
      data: dataPoints,
    }));

    const lineColors = [
      "#FF5733",
      "#008000",
      "#0000FF",
      "#FFA500",
      "#ff00a6",
      "#FFFF00",
      "#00FFFF",
    ];

    const options = {
      chart: {
        id: "line-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: data[0].data.map((_, index) => (2010 + index).toString()), // Assuming years are 2010 to 2028
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
        tickAmount: 11,
        forceNiceScale: true,
        min: customYValues[0],
        max: customYValues[customYValues.length - 1],
        tickValues: customYValues,
      },
      //   dataLabels: {
      //     enabled: true,
      //     style: {
      //       colors: ["#000"],
      //     },
      //   },
      legend: {
        labels: {
          colors: "#fff",
        },
      },
      grid: {
        show: false,
      },
      colors: lineColors,
    };

    return (
      <div id="line-chart">
        <Chart options={options} series={data} type="line" height={700} />
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
        categories: [
          "Africa",
          "APAC",
          "Europe",
          "Middle East",
          "N. America",
          "S. America",
          "World",
        ],
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
        categories: [
          "Africa",
          "Asia and Pacific",
          "Europe",
          "Middle East",
          "N. America",
          "S. America",
          "World",
        ],
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
        categories: [
          "Africa",
          "APAC",
          "Europe",
          "Middle East",
          "N. America",
          "S. America",
          "World",
        ],
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Chart options={options} series={series} type="bar" width="500" />
      </div>
    );
  };

  return (
    <div className="home">
      <video className="video-background" autoPlay muted loop>
        <source src="/assets/BG-Blue.mp4" type="video/mp4" />
      </video>
      <a className="home-nav" href="/" />
      <div className="global-title">
        <a href="/gdp-capita">
          <img className="left-arrow" src="/assets/left-arrow-blue.png" />
        </a>
        {/* Global Economy */}
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
      <div className="thailand-body">
        {isMobile ? (
          <div className="trading-view-box"></div>
        ) : (
          <div className="thailand-graph-box">
            <div className="thailand-graph-box-title">
              Unemployment Rate <br />
              (Annual % Change)
            </div>
            {CapitaChart()}
          </div>
        )}
      </div>
    </div>
  );
}
