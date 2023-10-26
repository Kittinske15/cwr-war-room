import React, { useState, useEffect, useRef } from "react";
import { colorThailand, colorScale, numberScale } from "../components/color";
import data from "../ThailandGDP.json";
import Chart from "react-apexcharts";

export default function GDPCapitaDetail() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const CapitaChart = () => {
    const categories = [
      "Africa (Region)",
      "Asia and Pacific",
      "Europe",
      "Middle East (Region)",
      "North America",
      "South America",
      "World",
    ];

    const data = categories.map((category) => ({
      name: category,
      data: Array.from({ length: 19 }, (_, i) => 2010 + i), // Years from 2010 to 2028
    }));

    data.forEach((categoryData) => {
      categoryData.data = categoryData.data.map((year) =>
        Math.floor(Math.random() * 1000)
      );
    });

    const options = {
      chart: {
        id: "line-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: data[0].data,
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#000"],
        },
      },
      legend: {
        labels: {
          colors: "#fff", 
        },
      },
    };

    return (
      <div id="line-chart">
        <Chart options={options} series={data} type="line" height={450} />
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
              GDP per Capital Year 2022 <br />
              (US Dollar per Capita)
            </div>
            {CapitaChart()}
          </div>
        )}
      </div>
    </div>
  );
}
