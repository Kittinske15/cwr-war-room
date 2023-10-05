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
import ChaitaiChart from '../components/ChaitaiChart';

export default function OverseaStock() {
    const OverseaStock = (
        <div>
            <div className='coporate-stock'>
                Oversea stock
            </div>
            <div className='oversea-stock-grid'>
                <div>
                    <h3 style={{ textAlign: 'center' }}>CP Lotus</h3>
                    <CPFChart />
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>CPP</h3>
                    <TrueChart />
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>CTEI</h3>
                    <CPAllChart />
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>CP Taiwan (CPT)</h3>
                    <CPAxtraChart />
                </div>
                <div>
                    <h3 style={{ textAlign: 'center' }}>CHAITAI Investment</h3>
                    <ChaitaiChart />
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
            <a className="home-nav" href='/' />
            <div className='oversea-body'>
                <div className='oversea-box'>
                    {OverseaStock}
                    <div className='reference'>
                        * Reference: Yahoo Financial data API
                    </div>
                </div>
            </div>
        </div>
    );
}