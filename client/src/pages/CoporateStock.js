import 'react-svg-map/lib/'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import PingAnChart from '../components/PingAnChart';
import ItochuChart from '../components/ItochuChart';
import CitricChart from '../components/CitricChart';
import TrueChart from '../components/TrueChart';
import CPFChart from '../components/CPFChart';
import CPAllChart from '../components/CPAllChart';
import MakroChart from '../components/MakroChart';

export default function CoporateStock() {
    const CPFStockChart = () => {
        const [chartData, setChartData] = useState(null);

        useEffect(() => {
            const fetchStockData = async () => {
                try {
                    const response = await axios.get('https://api.example.com/stock/cpf'); // Replace with actual API endpoint
                    // Parse and format the stock data
                    const parsedData = response.data.map(item => ({
                        date: item.date,
                        price: item.close, // Assuming the API provides a 'close' price for each date
                    }));

                    const labels = parsedData.map(item => item.date);
                    const prices = parsedData.map(item => item.price);

                    const chartData = {
                        options: {
                            // Chart options here
                            // ...
                        },
                        series: [
                            {
                                name: 'CPF Stock Price',
                                data: prices,
                            },
                        ],
                    };

                    setChartData(chartData);
                } catch (error) {
                    console.error('Error fetching stock data:', error);
                }
            };

            fetchStockData();
        }, []);

        return (
            <div>
                <div className='oversea-grid'>
                    <div>
                        <h3 style={{ textAlign: 'center' }}>PingAn Stock Market Chart</h3>
                        <PingAnChart />
                    </div>
                    <div>
                        <h3 style={{ textAlign: 'center' }}>ITOCHU Stock Market Chart</h3>
                        <ItochuChart />
                    </div>
                    <div>
                        <h3 style={{ textAlign: 'center' }}>Citric Stock Market Chart</h3>
                        <CitricChart />
                    </div>
                </div>
            </div>
        );
    };

    const CoporateStock = (
        <div>
            <div className='coporate-stock'>
                Coporate Stock
            </div>
            <div className='coporate-stock-grid'>
                <div>
                    <h3 style={{ textAlign: 'center' }}>CPF Stock Market Chart</h3>
                    <CPFChart />
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>TRUE Stock Market Chart</h3>
                    <TrueChart />
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>CPALL Stock Market Chart</h3>
                    <CPAllChart />
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>MAKRO Stock Market Chart</h3>
                    <MakroChart />
                </div>
            </div>
        </div>
    )

    const Oversea = (
        <div className='thailand-footer'>
            <div className='oversea'>
                Oversea
            </div>
        </div>
    )

    return (
        <div className="home">
            <div className="home-header" />
            <div className='thailand-body'>
                <div className='thailand-box'>
                    {CoporateStock}
                </div>
                <div className='thailand-box-content'>
                    {Oversea}
                    <CPFStockChart />
                </div>
            </div>
        </div>
    );
}
