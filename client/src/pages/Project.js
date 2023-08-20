import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import ProjectList from '../components/projectList';

export default function Project() {
    const [open, setOpen] = useState(true);

    const ProjectStatus = () => {
        const chartOptions = {
            chart: {
                id: 'donut-chart',
            },
            title: {
                text: 'PROJECT STATUS',
                align: 'center',
                style: {
                    fontSize: '16px',
                    color: '#fff', // Title text color
                },
            },
            labels: ['Completed', 'On Process', 'Not Start', 'In Completed', 'Delay'],
            colors: ['#A1DC67', '#FAFF1C', '#A1A1A1', '#FF4D4D', '#FF4906'],
            legend: {
                position: 'bottom',
                labels: {
                    colors: ['#fff'],
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        };

        const projectStatusData = [20, 45, 10, 10, 25]

        return (
            <Chart
                options={chartOptions}
                series={projectStatusData}
                type="donut"
                width="100%"
                height={300}
            />
        );
    };

    const ProjectGroup = () => {
        const chartOptions = {
            chart: {
                id: 'donut-chart',
            },
            title: {
                text: 'PROJECT GROUP',
                align: 'center',
                style: {
                    fontSize: '16px',
                    color: '#fff', // Title text color
                },
            },
            labels: ['Completed', 'On Process', 'Not Start', 'In Completed', 'Delay'],
            colors: ['#A1DC67', '#FAFF1C', '#A1A1A1', '#FF4D4D', '#FF4906'],
            legend: {
                position: 'bottom',
                labels: {
                    colors: ['#fff'],
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        };

        const projectStatusData = [20, 45, 10, 10, 25]

        return (
            <Chart
                options={chartOptions}
                series={projectStatusData}
                type="donut"
                width="100%"
                height={300}
            />
        );
    };


    return (
        <div className="App">
            <div className='project'>
                <div className='project_container'>
                    <a href='/'>
                        <img className='true-logo' src="/assets/true-logo.png" />
                    </a>
                    <a className='menu-item' href='/'>
                        <img className='' src="/assets/dashboard.png" />
                        <div>Dashboard</div>
                    </a>
                    <a className='menu-item' href='/project'>
                        <img className='' src="/assets/project-icon.png" />
                        <div>Project</div>
                    </a>
                    <div className='menu-item'>
                        <img className='' src="/assets/hand.png" />
                        <div>Finance</div>
                    </div>
                    <div className='menu-item'>
                        <img className='' src="/assets/member.png" />
                        <div>Member</div>
                    </div>
                    <div className='menu-item'>
                        <img className='' src="/assets/manual.png" />
                        <div>Manual</div>
                    </div>
                    <div className='menu-item'>
                        <img className='' src="/assets/Prioritize.png" />
                        <div>Prioritization</div>
                    </div>
                    <div className='menu-item'>
                        <img className='' src="/assets/contact.png" />
                        <div>Contact Us</div>
                    </div>
                </div>
                <div className='project-body'>
                    <div className='project-title-flex'>
                        <div className='project-title'>MEDIA TEAM : 6 Projects</div>
                        <div className='project-title'>CONTENT TEAM : 2 Projects</div>
                    </div>
                    <div className='project-status-grid'>
                        <div className='project-chart-grid'>
                            <div className='project-card'>
                                {ProjectStatus()}
                            </div>
                            <div className='project-card'>
                                {ProjectGroup()}
                            </div>
                        </div>
                        <div>
                            <ProjectList />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}