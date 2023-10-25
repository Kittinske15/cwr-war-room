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
  const InflationChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            'https://api.worldbank.org/v2/country/THA/indicator/FP.CPI.TOTL.ZG?format=json&per_page=120'
          );

          const data = response.data[1].sort((a, b) => a.date - b.date);

          const filteredData = data.filter(
            item => dayjs(item.date).format('YYYY') >= '2012' && dayjs(item.date).format('YYYY') <= '2022'
          );

          const labels = filteredData.map(item => dayjs(item.date).format('YYYY'));
          const values = filteredData.map(item => item.value);

          const chartData = {
            options: {
              xaxis: {
                type: 'category',
                categories: labels,
                labels: {
                  rotate: -45,
                  formatter: function (value) {
                    return value;
                  },
                  style: {
                    colors: '#fff',
                  },
                },
                tickPlacement: 'on',
                scrollbar: {
                  enabled: true,
                  offsetY: -5,
                },
              },
              yaxis: {
                title: {
                  text: 'Inflation Rate (%)',
                  style: {
                    color: '#fff',
                  },
                },
                min: -2,
                max: 6,
                forceNiceScale: true,
                labels: {
                  formatter: function (value) {
                    return value.toFixed(2);
                  },
                  style: {
                    colors: '#fff',
                  },
                },
              },
            },
            series: [
              {
                name: 'Inflation Rate',
                data: values.map(value => value.toFixed(2)),
              },
            ],
          };

          setChartData(chartData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>Inflation Rate</h3>
        {chartData ? (
          <>
            <Chart options={chartData.options} series={chartData.series} type="line" height={200} />
            <style>{`
              .apexcharts-tooltip {
                color: #000000 !important;
              }
  
              text {
                color: '#fff !important';
              }
            `}</style>
          </>
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    );
  };

  const InterestRateChart = () => {
    const options = {
      chart: {
        type: 'line',
      },
      xaxis: {
        categories: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
        labels: {
          style: {
            colors: '#ffffff',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value.toFixed(2) + '%';
          },
          style: {
            colors: '#ffffff',
          },
        },
        title: {
          text: 'Percentage',
          style: {
            color: '#ffffff',
          },
        },
        tickAmount: 4,
      },
    };

    const series = [
      {
        name: 'Series 1',
        data: [2.50, 2.00, 1.50, 1.50, 1.50, 1.75, 1.25, 0.50, 0.50, 1.50],
      },
    ];

    return (
      <div>
        <div className='thailand-interest-rate'>Interest Rate</div>
        <ReactApexChart options={options} series={series} type="line" height={200} />
      </div>
    );
  };

  const TouristArrivalChart = () => {
    const chartData = {
      options: {
        chart: {
          id: 'bar-chart',
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
          labels: {
            rotate: -45,
            rotateAlways: true,
            style: {
              colors: '#fff',
            },
          },
        },
        yaxis: {
          title: {
            text: 'No. of Tourist Arrival (millions)',
            style: {
              color: '#fff',
            },
          },
          min: 0,
          max: 50,
          tickAmount: 5,
          labels: {
            style: {
              colors: '#fff',
            },
          },
        },
        plotOptions: {
          bar: {
            columnWidth: '50%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          style: {
            colors: '#000000',
          },
        },
        fill: {
          colors: ['#48acf0'],
          opacity: 1,
        },
      },
      series: [
        {
          name: 'Inflation Rate',
          data: [29.9, 32.5, 35.59, 38.18, 39.8, 6.7, 0.43, 11.15],
        },
      ],
    };

    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>Employment Rate</h3>
        <Chart options={chartData.options} series={chartData.series} type="bar" height={200} />
        <style>{`
          .apexcharts-tooltip {
            color: #000000 !important;
          }
  
          text {
            color: '#fff !important';
          }
        `}</style>
      </div>
    );
  };

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
          color: "#000000",
        },
      },
    };

    const series = [
      {
        name: "Line",
        data: [11.1, 12.5, 12.9, 13.4],
      },
      {
        name: "Values",
        data: [11.1, 12.5, 12.9, 13.4, 14.0, 14.6, 15.2],
      },
    ];

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Chart options={options} series={series} type="line" width="500" height="210" />
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
    };

    const series = [
      {
        name: "Line",
        data: [7.68, 7.72, 7.78, 7.85],
      },
      {
        name: "Values",
        data: [7.68, 7.72, 7.78, 7.85, 7.93, 8, 8.08],
      },
    ];

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Chart options={options} series={series} type="line" width="500" height="210" />
      </div>
    );
  };

  const InflationRataChart = () => {
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
    };

    const series = [
      {
        name: "Line",
        data: [3.2, 4.7, 8.7, 7],
      },
      {
        name: "Values",
        data: [3.2, 4.7, 8.7, 7, 4.9, 3.9, 3.6],
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
    };

    const series = [
      {
        name: "Line",
        data: [4.32, 4.62, 5.22, 4.94],
      },
      {
        name: "Values",
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
    };

    const series = [
      {
        name: "Line",
        data: [30.08, 30.19, 33.18, 34.59],
      },
      {
        name: "Values",
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
            <div className='thailand-graph-box'>
              <div className='thailand-graph-box-title'>
                Population
                (Million of People)
              </div>
              <div className='thailand-graph-box-subtitle1'>
                7.85
              </div>
              <div className='thailand-graph-box-subtitle2'>Thousand</div>
              {PopulationChart()}
            </div>
            <div className='thailand-graph-box'>
              <div className='thailand-graph-box-title'>
                Import of Goods & Services <br />
                Year 2022
              </div>
              <div className='thailand-graph-box-subtitle1'>
                5.6
              </div>
              {ImportChart()}
            </div>
            <div className='thailand-graph-box'>
              <div className='thailand-graph-box-title'>
                Inflation rate <br />
                Annual percent change
              </div>
              <div className='thailand-graph-box-subtitle1'>
                7.85
              </div>
              <div className='thailand-graph-box-subtitle2'>Thousand</div>
              {InflationRataChart()}
            </div>
            <div className='thailand-graph-box'>
              <div className='thailand-graph-box-title'>
                Unemployment Rate <br />
                April 2023
              </div>
              <div className='thailand-graph-box-subtitle1' style={{ marginBottom: '60px' }}>
                4.1
              </div>
              <div className='thailand-graph-box-subtitle2'>The People Republic of China
              </div>
            </div>
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