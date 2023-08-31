import 'react-svg-map/lib/'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import PingAnChart from '../components/PingAnChart';
import ItochuChart from '../components/ItochuChart';
import TrueChart from '../components/TrueChart';
import CPFChart from '../components/CPFChart';
import CPAllChart from '../components/CPAllChart';
import CPAxtraChart from '../components/CPAxtraChart';
import CiticChart from '../components/CiticChart';

export default function CoporateStock() {
    const CPFStockChart = () => {
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
                        <h3 style={{ textAlign: 'center' }}>Citic Stock Market Chart</h3>
                        <CiticChart />
                    </div>
                </div>
            </div>
        );
    };

    const CoporateStock = (
        <div>
            <div className='coporate-stock'>
                Corporate stock
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
                    <CPAxtraChart />
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
            <a className="home-nav" href='/' />
            <div className='thailand-body'>
                <div className='thailand-box'>
                    {CoporateStock}
                    <div className='reference'>
                        * Reference: Yahoo Financial data API
                    </div>
                </div>
                <div className='thailand-box-content'>
                    {Oversea}
                    <CPFStockChart />
                </div>
            </div>
        </div>
    );
}