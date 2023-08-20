import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import {
    AccountCircleRounded,
    AssignmentTurnedInRounded,
    AttachMoneyRounded,
    BarChartRounded,
    ColorLensRounded,
    DashboardRounded,
    SettingsRemoteRounded,
    TocRounded,
} from "@material-ui/icons";
import GridViewIcon from '@mui/icons-material/GridView';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import GaugeChart from "react-gauge-chart";
import Chart from "react-apexcharts";
import Item from '../components/item';
import ReactApexChart from 'react-apexcharts';

export default function TrueVision() {
    const [open, setOpen] = useState(true);

    const handleToggle = () => {
        setOpen(!open);
    };

    const sideContainerVariants = {
        false: {
            transition: {
                delay: 0.6,
            },
        },
    };

    const sidebarVariants = {
        true: {},
        false: {
            width: "3rem",
            transition: {
                delay: 0.4,
            },
        },
    };

    const profileVariants = {
        true: {
            alignSelf: "center",
            width: "4rem",
        },
        false: {
            alignSelf: "flex-start",
            marginTop: "2rem",
            width: "3rem",
        },
    };

    const chartOptions = {
        chart: {
            type: "donut",
        },
        legend: {
            labels: {
                colors: '#fff',
            },
            position: 'bottom',
        },
        series: [25, 75],
        labels: ["CONTENT TEAM", "MEDIA TEAM"],
        colors: ["#df4382", "#f47fff"],
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                },
            },
        },
        title: {
            text: '% by project category',
            align: 'center',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#fff',
            },
        },
    };

    const chartCategoriesOptions = {
        chart: {
            type: "donut",
        },
        legend: {
            labels: {
                colors: '#fff',
            },
            position: 'bottom',
        },
        series: [25, 75],
        labels: ["On processing", "Project delay"],
        colors: ["#ffff00", "#ff8e39"],
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                },
            },
        },
        title: {
            text: 'Overall Project status',
            align: 'center',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#fff',
            },
        },
    };

    const barchartNew = {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'No. of projects by category',
            align: 'center',
            style: {
                color: '#fff',
                fontWeight: 'bold'
            },
        },
        xaxis: {
            categories: [
                'MEDIA TEAM',
                'CONTENT TEAM'
            ],
            labels: {
                style: {
                    colors: '#fff',
                },
            },
        },
        series: [
            {
                name: 'Sales',
                data: [6, 2],
            },
        ],
        yaxis: {
            labels: {
                style: {
                    colors: '#fff',
                },
            },
        },
        colors: [
            function ({ value, seriesIndex, dataPointIndex, w }) {
                if (dataPointIndex == 0) {
                    return '#f47fff';
                } else {
                    return '#df4382';
                }
            }
        ],
    };

    const YTDBarchart = {
        series: [
            {
                name: "Bar Chart",
                data: [44, 55, 41, 67, 22, 43],
            },
            {
                name: "Line Chart",
                data: [30, 40, 28, 51, 42, 109],
            },
        ],
        options: {
            chart: {
                id: "mixed-chart",
                toolbar: {
                    show: false,
                },
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            },
            yaxis: [
                {
                    title: {
                        text: "Bar Chart",
                    },
                },
                {
                    opposite: true,
                    title: {
                        text: "Line Chart",
                    },
                },
            ],
            stroke: {
                width: [0, 4],
            },
            markers: {
                size: 6,
                strokeWidth: 0,
                hover: {
                    sizeOffset: 3,
                },
            },
        },
    };

    const data = [
        {
            category: 'MEDIA TEAM',
            series1: 0,
            series2: 5,
            series3: 1,
            series4: 0,
            series5: 0,
        },
        {
            category: 'CONTENT TEAM',
            series1: 0,
            series2: 2,
            series3: 0,
            series4: 0,
            series5: 0,
        },
    ];

    const stackedBar = {
        chart: {
            type: 'bar',
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        title: {
            text: 'Project Status by Business Group',
            align: 'center',
            style: {
                fontWeight: 'bold',
                color: '#fff',
            },
        },
        legend: {
            position: 'bottom',
            labels: {
                colors: '#fff'
            }
        },
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: data.map(item => item.category),
            title: {
                text: 'No. of projects',
                style: {
                    color: '#fff',
                    fontWeight: 'bold'
                }
            },
            labels: {
                style: {
                    colors: '#fff'
                }
            }
        },
        yaxis: {
            title: {
                text: '',
            },
            labels: {
                style: {
                    colors: '#fff'
                }
            }
        },
        colors: ['#33ff33', '#f7f70a', '#e87a36', '#ff3333', '#adadad']
    };

    return (
        <div className="App">
            <motion.div
                data-Open={open}
                variants={sideContainerVariants}
                initial={`${open}`}
                animate={`${open}`}
                className="sidebar_container"
            >
                <motion.div
                    className="sidebar"
                    initial={`${open}`}
                    animate={`${open}`}
                    variants={sidebarVariants}
                >
                    <motion.div
                        whileHover={{
                            cursor: "pointer",
                            scale: 1.2,
                            rotate: 180,
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            backdropFilter: "blur(3.5px)",
                            WebkitBackdropFilter: "blur(3.5px)",
                            border: "1px solid rgba( 255, 255, 255, 0.18 )",
                            transition: {
                                delay: 0.2,
                                duration: 0.4,
                            },
                        }}
                        onClick={handleToggle}
                        className="lines_icon"
                    >
                        <TocRounded />
                    </motion.div>
                    <motion.div
                        layout
                        initial={`${open}`}
                        animate={`${open}`}
                        variants={profileVariants}
                        className="profile"
                        transition={{ duration: 0.4 }}
                        whileHover={{
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                            backdropFilter: "blur(5.5px)",
                            WebkitBackdropFilter: "blur(5.5px)",
                            border: "1px solid rgba( 255, 255, 255, 0.18 )",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src="https://ae01.alicdn.com/kf/H5be6a0fa5f584a8a8420da2a7d4bc809r/RBRARE-Polaroid-Men-s-Goggle-Driving-Sunglasses-Men-Classic-Low-Profile-Sun-Glasses-For-Men-High.jpg"
                            alt="profile_img"
                        />
                    </motion.div>
                    <div className="groups">
                        <div className="group">
                            <motion.h3
                                animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
                            >
                                TRUEVISIONS WARROOM
                            </motion.h3>
                            <Item icon={<DashboardRounded />} name="Dashboard" />
                            <a className='nav-item' href="/project">
                                <Item icon={<BarChartRounded />} name="Project" />
                            </a>
                            <Item icon={<GridViewIcon />} name="Project Prioritization" />
                            <Item icon={<AttachMoneyRounded />} name="Finance" />
                            <Item icon={<AccountCircleRounded />} name="Members" />
                        </div>
                    </div>
                    <div className="group">
                        <motion.h3
                            animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
                        >
                            GLOBAL CASE STUDY RESEARCH
                        </motion.h3>
                        <Item icon={<TravelExploreIcon />} name="Global case study" />
                        <Item icon={<LockResetIcon />} name="Reset Password" />
                        <Item icon={<LogoutIcon />} name="Logout" />
                    </div>
                </motion.div>
            </motion.div>

            <div className={open ? 'body-grid' : 'body-grid-close'}>
                <div className='header_container'>
                    <img className='true-logo' src="/assets/true-logo.png" />
                </div>
                <div className="body_container">
                    <div className='body-title'>
                        Overall Dashboard
                    </div>
                    <div className='card-grid'>
                        <div className='card'>
                            <div>
                                <div className='card-title'>NO. OF PROJECT</div>
                                <div className='card-subtitle'>8 projects</div>
                            </div>
                            <div className='card-img-flex'>
                                <img className='card-img' src="/assets/briefing.png" />
                            </div>
                        </div>
                        <div className='card'>
                            <div>
                                <div className='card-title'>PROJECT YTD INVESTMENT</div>
                                <div className='card-subtitle'>TGT: 7.82 M</div>
                                <div className='card-subtitle'>ACT: 0.0 M</div>
                            </div>
                            <div className='card-img-flex'>
                                <img className='card-img' src="/assets/briefing.png" />
                            </div>
                        </div>
                        <div className='card'>
                            <div>
                                <div className='card-title'>CURRENT YTD RETURN</div>
                                <div className='card-subtitle'>TGT: 0.0 M</div>
                                <div className='card-subtitle'>ACT: 0.0 M</div>
                            </div>
                            <div className='card-img-flex'>
                                <img className='card-img' src="/assets/briefing.png" />
                            </div>
                        </div>
                        <div className='card'>
                            <div style={{ marginBottom: '10px' }}>
                                <div className='card-title'>MEMBER</div>
                                <div className='card-subtitle'>11 Members</div>
                            </div>
                            <div className='card-img-flex'>
                                <img className='card-img' src="/assets/briefing.png" />
                            </div>
                        </div>
                    </div>
                    <div className='gauge'>
                        <div className='gauge-title'>
                            Project Summary
                        </div>
                        <div className='gauge-grid'>
                            <div className='gauge-container'>
                                <GaugeChart
                                    className='gauge-card'
                                    id="gauge-chart2"
                                    nrOfLevels={5}
                                    colors={["red", "orange", "green"]}
                                    arcWidth={0.2}
                                    percent={0.37}
                                    textColor="#ffffff"
                                    animateDuration={5000}
                                />
                            </div>
                            <div className='gauge-container'>
                                <GaugeChart
                                    className='gauge-card'
                                    id="gauge-chart3"
                                    nrOfLevels={5}
                                    colors={["red", "orange", "green"]}
                                    arcWidth={0.2}
                                    percent={0.45}
                                    textColor="#ffffff"
                                    animateDuration={5000}
                                />
                            </div>
                        </div>
                        <div className='gauge-subtitle-grid'>
                            <div className='gauge-subtitle-flex'>
                                <div className='gauge-subtitle'>average of percent progress</div>
                            </div>
                            <div className='gauge-subtitle-flex'>
                                <div className='gauge-subtitle'>roi act/ roi tgt</div>
                            </div>
                        </div>
                    </div>
                    <div className='project_by_project'>
                        <div className='project_by_project-title'>
                            Project by project category : 2023
                        </div>
                        <div className='project_by_project-grid'>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Chart
                                    options={chartOptions}
                                    series={chartOptions.series}
                                    type="donut"
                                    width="400"
                                    height="400"
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Chart options={barchartNew} series={barchartNew.series} type="bar" height={400} />
                            </div>
                        </div>
                    </div>
                    <div className='project_by_project'>
                        <div className='project_by_project-title'>
                            Project Status : 2023
                        </div>
                        <div className='project_by_project-grid'>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Chart
                                    options={chartCategoriesOptions}
                                    series={chartCategoriesOptions.series}
                                    type="donut"
                                    width="400"
                                    height="400"
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <ReactApexChart
                                    series={[
                                        {
                                            name: 'Completed',
                                            data: data.map(item => item.series1)
                                        },
                                        {
                                            name: 'On Processing',
                                            data: data.map(item => item.series2),
                                        },
                                        {
                                            name: 'Project Delay',
                                            data: data.map(item => item.series3)
                                        },
                                        {
                                            name: 'Incompleted',
                                            data: data.map(item => item.series4)
                                        },
                                        {
                                            name: 'Not Start',
                                            data: data.map(item => item.series5)
                                        }
                                    ]}
                                    options={stackedBar}
                                    type="bar"
                                    height={400}
                                    width={500}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className='project_by_project'>
                        <div className='project_by_project-title'>
                            YTD Benefit Return : 0.00 MB
                        </div>
                        <div className='project_by_project-grid'>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Chart
                                    options={chartCategoriesOptions}
                                    series={chartCategoriesOptions.series}
                                    type="donut"
                                    width="400"
                                    height="400"
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <ReactApexChart
                                    options={YTDBarchart.options}
                                    series={YTDBarchart.series}
                                    type="line"
                                    height={350}
                                />
                            </div>
                        </div>
                    </div> */}
                </div>

            </div>

        </div >
    );
}