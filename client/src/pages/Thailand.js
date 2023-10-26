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

export default function Thailand() {
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

  useEffect(() => {
    const width = 1300;
    const height = 620;
    const colors = colorScale();
    const range = numberScale();
    const getGDP = (country) =>
      estimateGDP[provinces_data.findIndex((isCountry) => isCountry === country)];

    const scale = d3
      .scaleOrdinal()
      .domain(range)
      .range(colors);
    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

    const projection = geoNaturalEarth1()
      .scale(2200)
      .translate([-2700, 800]);
    var pathGenerator = geoPath().projection(projection);

    const g = svg.append('g');

    g.append('path').attr('class', 'sphere').attr('d', pathGenerator({ type: 'Sphere' }));

    svg.call(
      d3
        .zoom()
        .scaleExtent([1, 12])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        })
    );

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('padding', '10px')
      .style('background', 'rgba(0,0,0,0.6)')
      .style('border-radius', '5px')
      .style('color', 'white');

    d3.json('https://raw.githubusercontent.com/apisit/thailand.json/master/simplified/thailandWithName.json').then(function (jsondata) {
      console.log('jsondata: ', jsondata.features);
      console.table('1: ' + jsondata.features.length);
      console.table('2: ' + jsondata.features[0].properties.CHA_NE);

      g.selectAll('path')
        .data(jsondata.features)
        .join('path')
        .attr('class', 'province')
        .attr('d', pathGenerator)
        .attr('fill', (d) =>
          getColor(getGDP(d.properties.CHA_NE))
        );

      g.selectAll('text.country-name')
        .data(jsondata.features)
        .enter()
        .append('text')
        .attr('class', 'province-name')
        .attr('x', (d) => pathGenerator.centroid(d)[0])
        .attr('y', (d) => pathGenerator.centroid(d)[1])
        .attr('text-anchor', 'middle')
        .attr('font-size', '3px')
        .style('font-weight', 'light')
        .style('fill', 'black')
        .text((d) => d.properties.CHA_NE);

      const companyMarkers = g.append('g').attr('class', 'company-markers');

      const companyLocations = [
        { name: 'CP', coordinates: [100, 14] },
        { name: 'CP', coordinates: [102, 13.5] },
        { name: 'CP', coordinates: [101, 13.15] },
        { name: 'CP', coordinates: [100.7, 13.7] },
        { name: 'CP', coordinates: [100.55, 14.8] },
        { name: 'CP', coordinates: [102.7, 14.6] },
      ];

      companyLocations.forEach((location) => {
        companyMarkers
          .append('image')
          .attr('x', projection(location.coordinates)[0] - 15)
          .attr('y', projection(location.coordinates)[1] - 30)
          .attr('width', 10)
          .attr('height', 10)
          .attr('xlink:href', pinImage)
          .on('mouseover', () => {
            tooltip.html(location.name).style('visibility', 'visible');
          })
          .on('mousemove', (event) => {
            tooltip
              .style('top', event.pageY - 10 + 'px')
              .style('left', event.pageX + 10 + 'px');
          })
          .on('mouseout', () => {
            tooltip.style('visibility', 'hidden');
          });
      });
    });
  }, [provinces_data, estimateGDP]);

  const ThailandProportion = (
    <div className='thailand-footer'>
      {/* <InflationChart />
      <InterestRateChart />
      <TouristArrivalChart /> */}
    </div>
  )

  const GDPChart = () => {
    const options = {
      chart: {
        id: "line-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2025",
          "2026",
        ],
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: [4, 2, 2],
        dashArray: [0, 5, 0],
      },
      markers: {
        size: 4,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#000000", "#000000"],
        },
        formatter: function (val) {
          return val;
        },
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: "14px",
          fontFamily: "Arial",
        },
      },
      legend: {
        labels: {
          colors: "#fff",
        },
      },
    };

    const series = [
      {
        name: "Value",
        data: [11.1, 12.5, 12.9, 13.4],
      },
      {
        name: "Forecast",
        data: [11.1, 12.5, 12.9, 13.4, 14.0, 14.6, 15.2],
      },
    ];

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Chart options={options} series={series} type="line" width="500" height="210" />
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

  const PopulationChart = () => {
    const options = {
      chart: {
        id: "line-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2025",
          "2026",
        ],
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: [4, 2, 2],
        dashArray: [0, 5, 0],
      },
      markers: {
        size: 4,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#000000", "#000000"],
        },
        formatter: function (val) {
          return val;
        },
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: "14px",
          fontFamily: "Arial",
          color: "#000000",
        },
      },
      legend: {
        labels: {
          colors: "#fff",
        },
      },
    };

    const series = [
      {
        name: "Value",
        data: [7.68, 7.72, 7.78, 7.85],
      },
      {
        name: "Forecast",
        data: [7.68, 7.72, 7.78, 7.85, 7.93, 8, 8.08],
      },
    ];

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Chart options={options} series={series} type="line" width="500" height="210" />
      </div>
    );
  };

  const InflationRateChart = () => {
    const options = {
      chart: {
        id: "line-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2025",
          "2026",
        ],
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: [4, 2, 2],
        dashArray: [0, 5, 0],
      },
      markers: {
        size: 4,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#000000", "#000000"],
        },
        formatter: function (val) {
          return val;
        },
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: "14px",
          fontFamily: "Arial",
          color: "#000000",
        },
      },
      legend: {
        labels: {
          colors: "#fff",
        },
      },
    };

    const series = [
      {
        name: "Value",
        data: [-0.8, 1.2, 6.1, 1.5],
      },
      {
        name: "Forecast",
        data: [-0.8, 1.2, 6.1, 1.5, 1.6, 1.9, 1.9
        ],
      },
    ];

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Chart options={options} series={series} type="line" width="500" height="210" />
      </div>
    );
  };

  const ImportChart = () => {
    const options = {
      chart: {
        id: "import-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"
        ],
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#000000", "#000000"],
        },
        formatter: function (val) {
          return val;
        },
      },
    };

    const series = [
      {
        name: "Import of Goods & Services",
        data: [
          63, 58, 55, 53.5, 55, 52.5, 47.5, 52.8, 64
        ],
      },
    ];

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Chart options={options} series={series} type="line" width="500" height="210" />
      </div>
    );
  };

  const ExchangeRataChinaChart = () => {
    const options = {
      chart: {
        id: "line-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2025",
          "2026",
        ],
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: [4, 2, 2],
        dashArray: [0, 5, 0],
      },
      markers: {
        size: 4,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#000000", "#000000"],
        },
        formatter: function (val) {
          return val;
        },
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: "14px",
          fontFamily: "Arial",
          color: "#000000",
        },
      },
      legend: {
        labels: {
          colors: "#fff",
        },
      },
    };

    const series = [
      {
        name: "Value",
        data: [4.32, 4.62, 5.22, 4.94],
      },
      {
        name: "Forecast",
        data: [4.32, 4.62, 5.22, 4.94, 4.55, 4.42, 4.75],
      },
    ];

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Chart options={options} series={series} type="line" width="250" height="200" />
      </div>
    );
  };

  const ExchangeRataUSAChart = () => {
    const options = {
      chart: {
        id: "line-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2025",
          "2026",
        ],
        labels: {
          style: {
            colors: "#fff",
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: [4, 2, 2],
        dashArray: [0, 5, 0],
      },
      markers: {
        size: 4,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#000000", "#000000"],
        },
        formatter: function (val) {
          return val;
        },
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: "14px",
          fontFamily: "Arial",
          color: "#000000",
        },
      },
      legend: {
        labels: {
          colors: "#fff",
        },
      },
    };

    const series = [
      {
        name: "Value",
        data: [30.08, 30.19, 33.18, 34.59],
      },
      {
        name: "Forecast",
        data: [30.08, 30.19, 33.18, 34.59, 35.12, 33.58, 33.85],
      },
    ];

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Chart options={options} series={series} type="line" width="250" height="200" />
      </div>
    );
  };

  return (
    <div className="home">
      <a className="home-nav" href='/' />
      <div className="global-title">
        <a href='/'>
          <img className="left-arrow" src="/assets/left-arrow-blue.png" />
        </a>
        Global Economy
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
          <div className='thailand-graph-grid'>
            <a href="/gdp-capita" className='thailand-graph-box'>
              <div className='thailand-graph-box-title'>
                GDP per Capita, current prices <br />
                US Dollars per Capita
              </div>
              <div className='thailand-graph-box-subtitle1'>
                13.44
              </div>
              <div className='thailand-graph-box-subtitle2'>Thousand</div>
              {GDPChart()}
            </a>
            <a href="/population" className='thailand-graph-box'>
              <div className='thailand-graph-box-title'>
                Population
                (Million of People)
              </div>
              <div className='thailand-graph-box-subtitle1'>
                7.85
              </div>
              <div className='thailand-graph-box-subtitle2'>Thousand</div>
              {PopulationChart()}
            </a>
            <a href='import-good' className='thailand-graph-box'>
              <div className='thailand-graph-box-title'>
                Import of Goods & Services <br />
                Year 2022
              </div>
              <div className='thailand-graph-box-subtitle1'>
                5.6
              </div>
              {ImportChart()}
            </a>
            <a href='inflation-rate' className='thailand-graph-box'>
              <div className='thailand-graph-box-title'>
                Inflation rate <br />
                Annual percent change
              </div>
              <div className='thailand-graph-box-subtitle1'>
                1.5 %
              </div>
              {InflationRateChart()}
            </a>
            <a href='unemployment-rate' className='thailand-graph-box'>
              <div className='thailand-graph-box-title'>
                Unemployment Rate <br />
                April 2023
              </div>
              <div className='thailand-graph-box-subtitle1' style={{ marginBottom: '60px' }}>
                1.2
              </div>
              <div className='thailand-graph-box-subtitle2'>The People in Thailand
              </div>
            </a>
            <div className='thailand-graph-box'>
              <div className='thailand-graph-box-title'>
                Exchange Rate <br />
                Year 2022 (BTH)
              </div>
              <div className='exchange-rate-grid'>
                <div className='exchange-rate-img-grid'>
                  <img src="assets/usa-flag.png" className='exchange-rate-flag' />
                  {ExchangeRataUSAChart()}
                </div>
                <div className='exchange-rate-img-grid'>
                  <img src="assets/china-flag.png" className='exchange-rate-flag' />
                  {ExchangeRataChinaChart()}
                </div>
              </div>
            </div>
          </div>
          // <div className='thailand-box-content'>
          //   {ThailandProportion}
          //   <ContentSwitcher />
          // </div>
        )}
      </div>
    </div>
  );
}