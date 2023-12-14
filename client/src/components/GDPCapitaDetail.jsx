import React, { useState, useEffect, useRef } from "react";
import { colorThailand, colorScale, numberScale } from "../components/color";
import data from "../ThailandGDP.json";
import Chart from "react-apexcharts";

export default function GDPCapitaDetail() {
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
      [2050.0, 2231.8, 2320.4, 2345.6, 2369.6, 2110.3, 1956.9, 1915.3, 2001.2, 2001.2, 1886.9, 2058.3, 2157.4, 2044.4, 2079.9, 2209.3, 2330.8, 2454.7, 2592.6],
      [3411.4, 3915.6, 4106.8, 4198.3, 4185.7, 4018.4, 4164.5, 4444.9, 4718.1, 4946.2, 4674.7, 5067.7, 5391.6, 5687.8, 6074.8, 6498.7, 6928.8, 7374.3, 7840.8],
      [27386.2, 30088.2, 28752.4, 29909.2, 30332.7, 25993.3, 25943.8, 27561.8, 29701.9, 29285.5, 28330.9, 32355.1, 32504.2, 34706.0, 36589.1, 38270.5, 39932.7, 41316.4, 42719.8],
      [10230.6, 13272.9, 12807.1, 12993.3, 13031.9, 11076.5, 10939.8, 11563.3, 11935.9, 11377.5, 9666.8, 11533.5, 13751.8, 13328.2, 13717.0, 14066.0, 14393.2, 14760.0, 15116.4],
      [38749.9, 40238.3, 41412.3, 42499.3, 43610.7, 43784.9, 44169.1, 45839.4, 47945.2, 49479.3, 47845.8, 53185.0, 57707.8, 60859.1, 63064.2, 65198.9, 67467.5, 69773.4, 72185.2],
      [9768.8, 11328.9, 11350.5, 11201.5, 10814.9, 8752.2, 8434.3, 9480.4, 8899.2, 8411.2, 6860.4, 7858.0, 8995.7, 9630.6, 10031.1, 10339.3, 10740.3, 11257.2, 11737.2],
      [9729.7, 10693.4, 10747.8, 10922.7, 11077.2, 10330.1, 10378.0, 10906.0, 11456.9, 11500.2, 11077.3, 12468.4, 12895.4, 13332.8, 13872.4, 14477.1, 15085.9, 15673.5, 16295.8]
    ];

    const customYValues = [1500, 2500, 3500, 5000, 8000, 9500, 10500, 12000, 15000, 17000, 30000, 40000, 70000, 80000];

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
        show: false,
        labels: {
          style: {
            colors: "#fff",
            display: "none",
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
              GDP per Capital Year <br />
              (US Dollar per Capita)
            </div>
            {CapitaChart()}
          </div>
        )}
      </div>
    </div>
  );
}
