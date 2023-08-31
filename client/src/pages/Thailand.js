import React, { useState, useEffect, useRef } from 'react';
import * as d3 from "d3";
import { colorLegend } from "../components/colorLegend";
import { colorData, colorScale, numberScale } from "../components/color";
import data from "../ThailandGDP.json";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import dayjs from 'dayjs';
import axios from 'axios';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';

export default function Thailand() {
  const provinces_data = data.map((item) => item["Province_ENG"]);
  const estimateGDP = data.map((item) => item["GPP2020"]);
  const getColor = (num) => colorData(num);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [selectedButton, setSelectedButton] = useState("Button 1");


  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const svgRef = useRef();


  useEffect(() => {
    const width = 1300;
    const height = 620;
    const colors = colorScale();
    const range = numberScale();
    const getGDP = (country) => estimateGDP[provinces_data.findIndex((isCountry) => isCountry === country)];

    const scale = d3.scaleOrdinal()
      .domain(range)
      .range(colors);
    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

    const projection = geoNaturalEarth1()
      .scale(2200)
      .translate([-2700, 800])
      ;
    var pathGenerator = geoPath().projection(projection);

    const g = svg.append('g');


    g.append('path')
      .attr('class', 'sphere')
      .attr('d', pathGenerator({ type: 'Sphere' }));

    svg.call(d3.zoom()
      .scaleExtent([1, 12])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      }));


    // create a tooltip
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

    //create a map
    d3.json('https://raw.githubusercontent.com/apisit/thailand.json/master/simplified/thailandWithName.json')
      .then(function (jsondata) {
        console.log('jsondata: ', jsondata.features)
        console.table("1: " + jsondata.features.length);
        console.table("2: " + jsondata.features[0].properties.CHA_NE);

        g.selectAll('path')
          .data(jsondata.features)
          .join('path')
          .attr('class', 'province')
          .attr('d', pathGenerator)
          .attr('fill', (d) => getColor(
            getGDP(d.properties.CHA_NE)
          ))

        //text Label Name_country
        g.selectAll("text.country-name")
          .data(jsondata.features)
          .enter()
          .append("text")
          .attr("class", "province-name")
          .attr("x", d => pathGenerator.centroid(d)[0])
          .attr("y", d => pathGenerator.centroid(d)[1])
          .attr("text-anchor", "middle")
          .attr("font-size", "3px")
          .style("font-weight", "light")
          .style("fill", "black")
          .text(d => d.properties.CHA_NE);

      });

    //colorLengend
    svg.call(colorLegend, {
      colorScale: scale,
      colorLegendLabel:
        'GDP (2023)',
      colorLegendX: 35,
      colorLegendY: 470,
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
        <h3 style={{ textAlign: 'center' }}>Tourist Arrival</h3>
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
      <InflationChart />
      <InterestRateChart />
      <TouristArrivalChart />
    </div>
  )

  return (
    <div className="home">
      <a className="home-nav" href='/' />
      <div className="global-title">
        <a href='/'>
          <img className="left-arrow" src="/assets/left-arrow-blue.png" />
        </a>
        Thailand Macro Econ
      </div>
      <div className="market-stock-title">
        <a href='/stock'>
          Market Stock
        </a>
      </div>
      <div className='thailand-body'>
        <div className='thailand-box'>
          <svg className="map" ref={svgRef}></svg>
          <div className="reference">* Reference: สำนักงานคณะกรรมการพัฒนาการเศรษฐกิจและสังคมแห่งชาติ สำนักนายกรัฐมนตรี</div>
        </div>
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
          <div className='thailand-box-content'>
            {ThailandProportion}
            {/* <ContentSwitcher /> */}
          </div>
        )}
      </div>
    </div>
  );
}