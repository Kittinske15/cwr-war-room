import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import {
    AccountCircleRounded,
    AttachMoneyRounded,
    BarChartRounded,
    DashboardRounded,
    TocRounded,
} from "@material-ui/icons";
import GridViewIcon from '@mui/icons-material/GridView';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Chart from "react-apexcharts";
import MenuItem from '../components/menuItem';

export default function CPLWarroom() {
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

    const payrollPieChart = {
        chart: {
            type: "pie",
        },
        legend: {
            labels: {
                colors: '#fff',
            },
            position: 'bottom',
        },
        series: [14301624.91, 6925059.29, 1077353, 25372413.94],
        labels: ["CPL", "CG", "CPFM", "Hotel"],
        colors: ["#9999ff", "#9dc3e6", "#f4b183", "#3d8061"],
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                },
            },
        },
        title: {
            text: 'Payroll Cost',
            align: 'center',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#fff',
            },
        },
    };

    const recruitPieChart = {
        chart: {
            type: "pie",
        },
        legend: {
            labels: {
                colors: '#fff',
            },
            position: 'bottom',
        },
        series: [562, 15, 308, 586],
        labels: ["CPL", "CG", "CPFM", "Hotel"],
        colors: ["#9999ff", "#9dc3e6", "#f4b183", "#3d8061"],
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                },
            },
        },
        title: {
            text: 'Total Staff',
            align: 'center',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#fff',
            },
        },
    };

    const newHirePieChart = {
        chart: {
            type: "pie",
        },
        legend: {
            labels: {
                colors: '#fff',
            },
            position: 'bottom',
        },
        series: [26, 2, 17, 31],
        labels: ["CPL", "CG", "CPFM", "Hotel"],
        colors: ["#9999ff", "#9dc3e6", "#f4b183", "#3d8061"],
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                },
            },
        },
        title: {
            text: 'New Hire',
            align: 'center',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#fff',
            },
        },
    };

    const resignedPieChart = {
        chart: {
            type: "pie",
        },
        legend: {
            labels: {
                colors: '#fff',
            },
            position: 'bottom',
        },
        series: [8, 22, 18],
        labels: ["CPL", "CPFM", "Hotel"],
        colors: ["#9999ff", "#9dc3e6", "#f4b183", "#3d8061"],
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                },
            },
        },
        title: {
            text: 'Resigned January 2023',
            align: 'center',
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#fff',
            },
        },
    };

    const barchartRecruitCPL = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'CPL Recruit',
            align: 'center',
            style: {
                color: '#fff',
                fontWeight: 'bold'
            },
        },
        xaxis: {
            categories: [
                'Jan-65',
                'Feb-65',
                'Mar-65',
                'Apr-65',
                'May-65',
                'Jun-65',
                'Jul-65',
                'Aug-65',
                'Sep-65',
                'Oct-65',
                'Nov-65',
                'Dec-65',
                'Jan-66',
                'Feb-66',
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
                data: [9, 6, 5, 10, 7, 6, 14, 11, 10, 8, 8, 7, 8, 4],
            },
        ],
        yaxis: {
            title: {
                style: {
                    color: '#fff',
                },
                text: 'Resigned',
            },
            labels: {
                style: {
                    colors: '#fff',
                },
            },
        },
        colors: '#f47fff'
    };

    const barchartRecruitCPLAND = {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'CPLAND Recruit',
            align: 'center',
            style: {
                color: '#fff',
                fontWeight: 'bold'
            },
        },
        xaxis: {
            categories: [
                'Jan-65',
                'Feb-65',
                'Mar-65',
                'Apr-65',
                'May-65',
                'Jun-65',
                'Jul-65',
                'Aug-65',
                'Sep-65',
                'Oct-65',
                'Nov-65',
                'Dec-65',
                'Jan-66',
                'Feb-66',
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
                data: [35, 30, 46, 32, 22, 45, 44, 32, 37, 39, 23, 39, 48, 22],
            },
        ],
        yaxis: {
            title: {
                style: {
                    color: '#fff',
                },
                text: 'Resigned',
            },
            labels: {
                style: {
                    colors: '#fff',
                },
            },
        },
    };

    const barchartRecruitHotel = {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'Hotel Recruit',
            align: 'center',
            style: {
                color: '#fff',
                fontWeight: 'bold'
            },
        },
        xaxis: {
            categories: [
                'Jan-65',
                'Feb-65',
                'Mar-65',
                'Apr-65',
                'May-65',
                'Jun-65',
                'Jul-65',
                'Aug-65',
                'Sep-65',
                'Oct-65',
                'Nov-65',
                'Dec-65',
                'Jan-66',
                'Feb-66',
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
                data: [16, 11, 23, 13, 8, 21, 17, 14, 18, 21, 9, 17, 18, 9],
            },
        ],
        yaxis: {
            title: {
                style: {
                    color: '#fff',
                },
                text: 'Resigned',
            },
            labels: {
                style: {
                    colors: '#fff',
                },
            },
        },
        colors: '#bec95d'
    };

    const barchartRecruitCPFM = {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'CPFM Recruit',
            align: 'center',
            style: {
                color: '#fff',
                fontWeight: 'bold'
            },
        },
        xaxis: {
            categories: [
                'Jan-65',
                'Feb-65',
                'Mar-65',
                'Apr-65',
                'May-65',
                'Jun-65',
                'Jul-65',
                'Aug-65',
                'Sep-65',
                'Oct-65',
                'Nov-65',
                'Dec-65',
                'Jan-66',
                'Feb-66',
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
                data: [10, 13, 18, 9, 7, 18, 13, 7, 9, 5, 4, 13, 22, 9],
            },
        ],
        yaxis: {
            title: {
                style: {
                    color: '#fff',
                },
                text: 'Resigned',
            },
            labels: {
                style: {
                    colors: '#fff',
                },
            },
        },
        colors: '#1e01d4'
    };

    const barchartRecruitCG = {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'CG Recruit',
            align: 'center',
            style: {
                color: '#fff',
                fontWeight: 'bold'
            },
        },
        xaxis: {
            categories: [
                'Jan-65',
                'Feb-65',
                'Mar-65',
                'Apr-65',
                'May-65',
                'Jun-65',
                'Jul-65',
                'Aug-65',
                'Sep-65',
                'Oct-65',
                'Nov-65',
                'Dec-65',
                'Jan-66',
                'Feb-66',
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
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2, 2, 0, 0],
            },
        ],
        yaxis: {
            title: {
                style: {
                    color: '#fff',
                },
                text: 'Resigned',
            },
            labels: {
                style: {
                    colors: '#fff',
                },
            },
        },
        colors: '#0ae2a7'
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
                                CP LAND WAR ROOM
                            </motion.h3>
                            <a className='menu-link' href='/'>
                                <MenuItem icon={<DashboardRounded />} name="Dashboard" />
                            </a>
                            <MenuItem icon={<BarChartRounded />} name="Project" />
                            <MenuItem icon={<GridViewIcon />} name="Project Prioritization" />
                            <MenuItem icon={<AttachMoneyRounded />} name="Finance" />
                            <a className='menu-link' href='/people'>
                                <MenuItem icon={<AccountCircleRounded />} name="Members" />
                            </a>
                        </div>
                    </div>
                    <div className="group">
                        <motion.h3
                            animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
                        >
                            GLOBAL CASE STUDY RESEARCH
                        </motion.h3>
                        <MenuItem icon={<TravelExploreIcon />} name="Global case study" />
                        <MenuItem icon={<LockResetIcon />} name="Reset Password" />
                        <MenuItem icon={<LogoutIcon />} name="Logout" />
                    </div>
                </motion.div>
            </motion.div>

            <div className={open ? 'body-grid' : 'body-grid-close'}>
                <div className='header_container'>
                    <img className='true-logo' src="/assets/cpland-logo.png" />
                </div>
                <div className="body_container">
                    <div className='body-title'>
                        Overall Dashboard
                    </div>
                    <div className='card-grid'>
                        <div className='card'>
                            <div>
                                <div className='card-title'>Total Employee</div>
                                <div className='card-subtitle'>1,503 people</div>
                            </div>
                            <div className='card-img-flex'>
                                <img className='card-img' src="/assets/division.png" />
                            </div>
                        </div>
                        <div className='card'>
                            <div>
                                <div className='card-title'>Total Employee Resigned</div>
                                <div className='card-subtitle'>494 people</div>
                            </div>
                            <div className='card-img-flex'>
                                <img className='card-img' src="/assets/resign.png" />
                            </div>
                        </div>
                        <div className='card'>
                            <div>
                                <div className='card-title'>Total Employee New Hire</div>
                                <div className='card-subtitle'>76 people</div>
                            </div>
                            <div className='card-img-flex'>
                                <img className='card-img' src="/assets/talent-search.png" />
                            </div>
                        </div>
                        <div className='card'>
                            <div style={{ marginBottom: '10px' }}>
                                <div className='card-title'>Payroll Cost</div>
                                <div className='card-subtitle'>47,676,451.14 Baht</div>
                            </div>
                            <div className='card-img-flex'>
                                <img className='card-img' src="/assets/briefing.png" />
                            </div>
                        </div>
                    </div>
                    {/* <div className='gauge'>
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
                    </div> */}
                    <div className='project_by_project'>
                        <div className='project_by_project-title'>
                            Overall
                        </div>
                        <div className='overall-grid'>
                            <Chart
                                options={payrollPieChart}
                                series={payrollPieChart.series}
                                type="pie"
                                width="400"
                                height={400}
                                style={{ marginBottom: '30px' }}
                            />
                            <Chart
                                options={recruitPieChart}
                                series={recruitPieChart.series}
                                type="pie"
                                width="400"
                                height={400}
                                style={{ marginBottom: '30px' }}
                            />
                            <Chart
                                options={newHirePieChart}
                                series={newHirePieChart.series}
                                type="pie"
                                width="400"
                                height={400}
                                style={{ marginBottom: '30px' }}
                            />
                            <Chart
                                options={resignedPieChart}
                                series={resignedPieChart.series}
                                type="pie"
                                width="400"
                                height={400}
                            />
                        </div>
                    </div>
                    <div className='project_by_project'>
                        <div className='project_by_project-title'>
                            Employee Recruit
                        </div>
                        <div className='project_by_project-grid'>
                            <Chart options={barchartRecruitCPLAND} series={barchartRecruitCPLAND.series} type="bar" height={400} />
                            <Chart options={barchartRecruitCPL} series={barchartRecruitCPL.series} type="bar" height={400} />
                            <Chart options={barchartRecruitHotel} series={barchartRecruitHotel.series} type="bar" height={400} />
                            <Chart options={barchartRecruitCPFM} series={barchartRecruitCPFM.series} type="bar" height={400} />
                            <Chart options={barchartRecruitCG} series={barchartRecruitCG.series} type="bar" height={400} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}