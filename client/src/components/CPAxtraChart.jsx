import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import io from 'socket.io-client';
import { format, fromUnixTime } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export default function CPAxtraChart() {
  useEffect(() => {
    const chartContainer = document.getElementById('cpaxt-chart');
    const containerWidth = chartContainer.clientWidth;
    const containerHeight = 300;

    const chartProperties = {
      width: containerWidth,
      height: containerHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    };

    var darkTheme = {
      chart: {
        layout: {
          background: {
            type: 'solid',
            color: '#2B2B43',
          },
          lineColor: '#2B2B43',
          textColor: '#D9D9D9',
        },
        watermark: {
          color: 'rgba(0, 0, 0, 0)',
        },
        crosshair: {
          color: '#758696',
        },
        grid: {
          vertLines: {
            color: '#2B2B43',
          },
          horzLines: {
            color: '#363C4E',
          },
        },
      },
      series: {
        topColor: 'rgba(32, 226, 47, 0.56)',
        bottomColor: 'rgba(32, 226, 47, 0.04)',
        lineColor: 'rgba(32, 226, 47, 1)',
      },
    };

    const lightTheme = {
      chart: {
        layout: {
          background: {
            type: 'solid',
            color: '#FFFFFF',
          },
          lineColor: '#2B2B43',
          textColor: '#191919',
        },
        watermark: {
          color: 'rgba(0, 0, 0, 0)',
        },
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            color: '#f0f3fa',
          },
        },
      },
      series: {
        topColor: 'rgba(33, 150, 243, 0.56)',
        bottomColor: 'rgba(33, 150, 243, 0.04)',
        lineColor: 'rgba(33, 150, 243, 1)',
      },
    };
    var themesData = {
      Dark: darkTheme,
      Light: lightTheme,
    };

    function syncToTheme(theme) {
      chart.applyOptions(themesData[theme].chart);
    }

    const log = console.log;

    const chart = createChart(document.getElementById('cpaxt-chart'), chartProperties);
    const candleSeries = chart.addCandlestickSeries();

    function fetchDataAndGenerateChart() {
      fetch('https://ibsdo.com/api/CPAXT.BK')
        .then((res) => res.json())
        .then((data) => {
          const cdata = data.map((d) => ({
            time: d[0] / 1000,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
          }));
          candleSeries.setData(cdata);
        })
        .catch((err) => log(err));
    }

    fetchDataAndGenerateChart();
    const fetchInterval = setInterval(fetchDataAndGenerateChart, 1000);
    syncToTheme('Dark');

    const socket = io.connect('http://127.0.0.1:4000/');
    socket.on('KLINE', (pl) => {
      candleSeries.update(pl);
    });

    return () => {
      clearInterval(fetchInterval);
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div id="cpaxt-chart" style={{ width: '100%', height: '100%' }}></div>
  );
}