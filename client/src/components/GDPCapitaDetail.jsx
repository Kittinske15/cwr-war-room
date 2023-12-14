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
      [
        2050.02, 2231.78, 2320.37, 2345.35, 2369.60, 2110.29, 1956.89, 1915.31, 2001.19, 2001.22, 1886.89, 2058.28, 2157.39, 2044.40, 2079.88, 2209.34, 2330.81, 2454.72, 2592.56
      ],
      [
        3411.38, 3915.59, 4106.76, 4198.34, 4185.70, 4018.40, 4164.49, 4444.94, 4718.13, 4946.21, 4674.70, 5067.70, 5391.62, 5687.84, 6074.78, 6498.71, 6928.75, 7374.33, 7840.77
      ],
      [
        27386.20, 30088.23, 28752.42, 29909.24, 30332.67, 25993.32, 25943.76, 27561.83, 29701.87, 29285.53, 28330.91, 32355.13, 32504.17, 34705.97, 36589.11, 38270.45, 39932.65, 41316.43, 42719.77
      ],
      [
        10230.59, 13272.85, 12807.08, 12993.34, 13031.88, 11076.52, 10939.83, 11563.32, 11935.92, 11377.52, 9666.81, 11533.52, 13751.79, 13328.23, 13716.99, 14066.01, 14393.19, 14760.02, 15116.41
      ],
      [
        38749.90, 40238.29, 41412.28, 42499.32, 43610.71, 43784.93, 44169.08, 45839.36, 47945.24, 49479.26, 47845.80, 53184.98, 57707.77, 60859.12, 63064.16, 65198.86, 67467.54, 69773.36, 72185.22
      ],
      [
        9768.77, 11328.92, 11350.52, 11201.45, 10814.93, 8752.20, 8434.34, 9480.41, 8899.23, 8411.22, 6860.40, 7857.98, 8995.74, 9630.55, 10031.09, 10339.25, 10740.27, 11257.20, 11737.24
      ],
      [
        9729.71, 10693.36, 10747.83, 10922.70, 11077.17, 10330.08, 10378.0, 10905.99, 11456.93, 11500.19, 11077.29, 12468.43, 12895.37, 13332.78, 13872.36, 14477.05, 15085.86, 15673.54, 16295.82
      ],
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
