import React, { useState, useEffect, useRef } from "react";
import { colorThailand, colorScale, numberScale } from "../components/color";
import data from "../ThailandGDP.json";
import Chart from "react-apexcharts";

export default function InflationDetail() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const CapitaChart = () => {
    const categories = [
      "Africa (Region)",
      "Southeast Asia",
      "Europe",
      "Middle East (Region)",
      "North America",
      "South America",
      "World",
    ];

    const realData = [
      [
        4.2, 5, 5.6, 5.7, 6.1, 4.6, 6.3, 5.3, 4.6, 4.1, 3.3, 4.6, 6.9, 5.8, 4.8,
        4.5, 4.5, 4.5, 4.5,
      ],
      [
        4.5, 6, 3.9, 4.5, 4.3, 2.9, 2.3, 2.9, 2.8, 2.2, 1.4, 2, 5, 3.9, 2.8,
        2.7, 2.7, 2.5, 2.3,
      ],
      [
        1.6, 2.7, 2.5, 1.4, 0.4, 0.2, 0.2, 1.5, 1.8, 1.2, 0.3, 2.6, 8.4, 5.6,
        3.3, 2.2, 2, 1.9, 1.9,
      ],
      [
        6.6, 9.1, 9.2, 8.6, 6.5, 5.6, 5.9, 7.1, 9.9, 7.6, 10.4, 12.8, 14, 18,
        15.2, 10.5, 8.6, 7.8, 7.3,
      ],
      [
        1.9, 3.1, 2.2, 1.7, 1.9, 0.5, 1.4, 2.5, 2.7, 2, 1.4, 4.7, 7.9, 4.2, 2.8,
        2.5, 2.2, 2.1, 2.2,
      ],
      [
        4.2, 5.2, 4.6, 4.6, 4.9, 5.4, 5.5, 6.3, 6.5, 7.6, 6.4, 9.8, 14, 13.8,
        10.7, 7.3, 6.4, 6.1, 5.7,
      ],
      [
        3.7, 5.1, 4.1, 3.6, 3.2, 2.7, 2.7, 3.2, 3.6, 3.5, 3.2, 4.7, 8.7, 6.9,
        5.8, 4.6, 4.2, 3.9, 3.8,
      ],
    ];

    const customYValues = [0, 1.5, 2, 2.3, 2.4, 2.5, 5, 8, 9, 12, 16, 20];

    const data = realData.map((dataPoints, index) => ({
      name: categories[index],
      data: dataPoints,
    }));

    const lineColors = [
      "#FF5733",
      "#008000",
      "#0000FF",
      "#FFA500",
      "#800080",
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
      <a className="home-nav" href="/" />
      <div className="global-title">
        <a href="/Thailand">
          <img className="left-arrow" src="/assets/left-arrow-blue.png" />
        </a>
        Thailand Economy
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
              Inflation Year 2022 <br />
              (Annual % Change)
            </div>
            {CapitaChart()}
          </div>
        )}
      </div>
    </div>
  );
}
