import React, { useState, useEffect, useRef } from "react";
import { colorThailand, colorScale, numberScale } from "../components/color";
import data from "../ThailandGDP.json";
import Chart from "react-apexcharts";

export default function ImportGood() {
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
      [24.6, 26.9, 28.4, 30.5, 30.5, 29.0, 27.7, 26.2, 27.1, 26.8, 23.2, 25.0, 31.5],
      [null],
      [29.8, 30.4, 30.0, 29.7, 30.2, 30.5, 31.1, 32.5, 33.8, 33.3, 32.6, 34.8, 34.7],
      [null],
      [null],
      [20.5, 21.4, 22.4, 22.9, 23.1, 23.0, 22.3, 22.0, 24.7, 24.5, 24.0, 28.1, 29.9],
      [27.9, 29.7, 29.4, 29.3, 29.2, 27.6, 26.6, 27.6, 28.5, 27.8, 25.6, 27.9, 30.1],
    ];

    const customYValues = [
      20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    ];

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
        <Chart options={options} series={data} type="line" height={450} />
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
          "Asia and Pacific",
          "Europe",
          "Middle East",
          "North America",
          "South America",
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
          "Africa (Region)",
          "Asia and Pacific",
          "Europe",
          "Middle East (Region)",
          "North America",
          "South America",
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
          "Africa (Region)",
          "Asia and Pacific",
          "Europe",
          "Middle East (Region)",
          "North America",
          "South America",
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
      <div className="market-stock-title">
        <a href="/stock">Capital Market</a>
      </div>
      <div className="thailand-body">
        {isMobile ? (
          <div className="trading-view-box"></div>
        ) : (
          <div className="thailand-graph-box">
            <div className="thailand-graph-box-title">
              Import of Goods & Services <br />
              Year 2022
            </div>
            {CapitaChart()}
          </div>
        )}
      </div>
    </div>
  );
}
