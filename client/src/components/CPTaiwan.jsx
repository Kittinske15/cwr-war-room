
import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import io from 'socket.io-client';
import { format, fromUnixTime } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export default function CPTaiwanChart() {
    useEffect(() => {
        const chartContainer = document.getElementById('cptaiwan-chart');
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
        const log = console.log;

        const chart = createChart(document.getElementById('cptaiwan-chart'), chartProperties);
        const candleSeries = chart.addCandlestickSeries();

        function fetchDataAndGenerateChart() {
            fetch('https://ibsdo.com/api/1215.TW')
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
        <div id="cptaiwan-chart" style={{ width: '100%', height: '100%' }}></div>
    );
}