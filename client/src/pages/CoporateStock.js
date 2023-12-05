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
import CPTaiwanChart from '../components/CPTaiwan';

export default function CoporateStock() {
    const CPFStockChart = () => {
        return (
            <div className='oversea-grid'>
                <div>
                    <h3 style={{ textAlign: 'center' }}>PingAn</h3>
                    <PingAnChart />
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>ITOCHU</h3>
                    <ItochuChart />
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>Citic</h3>
                    <CiticChart />
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
                    <h3 style={{ textAlign: 'center' }}>CPF</h3>
                    <CPFChart />
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>TRUE</h3>
                    <TrueChart />
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>CPALL</h3>
                    <CPAllChart />
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>CPAXT</h3>
                    <CPAxtraChart />
                </div>
            </div>
        </div>
    )

    const Oversea = (
        <div className='thailand-footer'>
            <div className='oversea'>
                Business Partner
            </div>
        </div>
    )

    return (
        <div className="home">
            <video className="video-background" autoPlay muted loop>
                <source src="/assets/BG-Blue.mp4" type="video/mp4" />
            </video>
            <a className="home-nav" href='/' />
            <div className='coporate-body'>
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