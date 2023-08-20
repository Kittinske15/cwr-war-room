import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import ActionPlan from '../components/actionPlan';
import Log from '../components/log';

export default function ProjectDetail() {
    const [open, setOpen] = useState(true);
    const [selectedMenuItem, setSelectedMenuItem] = useState('overall');

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    let content;
    if (selectedMenuItem === 'overall') {
        content = <>
            <div style={{ marginBottom: '20px' }}>
                <div className='project-objective'>Obstruction(s)</div>
                <div className='project-objective-detail'>-</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <div className='project-objective'>Solution(s)</div>
                <div className='project-objective-detail'>-</div>
            </div>
            <div style={{ marginBottom: '20px' }}>

            </div>
            <div style={{ marginBottom: '20px' }}>
                <div className='project-objective'>Project Prioritization </div>
                <div className='project-objective-detail'>Possibility : High</div>
                <div className='project-objective-detail'>Impact : High</div>

            </div>
            <div style={{ marginBottom: '20px' }}>
                <div className='project-objective'>Team Member</div>
                <div className='project-objective-detail'>1. Kittin Vatabutr (Project Owner - Responsibility)</div>
                <div className='project-objective-detail'>2. Pattarapong Bhannasiri (Project Advisor)</div>
                <div className='project-objective-detail'>3. Wisarut Duangmorakot (Supporting)</div>
                <div className='project-objective-detail'>3. Apiwoot Thongsodsang (Responsibility)</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <div className='project-objective'>Project Prioritization</div>
                <div className='project-objective-detail'>02/02/2023 - 30/06/2023</div>

            </div>
            <div style={{ marginBottom: '20px' }}>
                <div className='project-objective'>Project Investment</div>
                <div className='project-objective-detail'>Investment : TBD</div>
                <div className='project-objective-detail'>Investment Detail: TBD</div>
            </div></>;
    } else if (selectedMenuItem === 'actionPlan') {
        content = <ActionPlan />;
    } else if (selectedMenuItem === 'roi') {
        content =
            <div className='roi-flex'>
                <div className='roi-menu-flex'>
                    <div className='project-roi-title'>
                        KPI Type
                    </div>
                    <div className='project-roi-detail'>
                        Quantitative
                    </div>
                </div>
                <div className='roi-menu-flex'>
                    <div className='project-roi-title'>
                        ROI Type
                    </div>
                    <div className='project-roi-detail'>
                        Cost saving
                    </div>
                </div>
                <div className='roi-menu-flex'>
                    <div className='project-roi-title'>
                        Year
                    </div>
                    <div className='project-roi-detail'>
                        2023
                    </div>
                </div>
                <div className='roi-menu-flex'>
                    <div className='project-roi-title'>
                        Target
                    </div>
                    <div className='project-roi-detail'>
                        1,000,000 Baht
                    </div>
                </div>
                <div className='roi-menu-flex'>
                    <div className='project-roi-title'>
                        Description
                    </div>
                    <div className='project-roi-detail'>
                        Cost saving for team (AI, Power-Bi, Developer)
                    </div>
                </div>
            </div>
    } else if (selectedMenuItem === 'attachment') {
        content =
            <div className='roi-flex'>
                <div className='roi-menu-flex'>
                    <div className='project-attachment-title'>
                        File 1
                    </div>
                    <div className='project-roi-detail'>
                        <form action="/action_page.php">
                            <input type="file" id="myFile" name="filename" />
                        </form>
                    </div>
                </div>
                <div className='roi-menu-flex'>
                    <div className='project-attachment-title'>
                        File 2
                    </div>
                    <div className='project-roi-detail'>
                        <form action="/action_page.php">
                            <input type="file" id="myFile" name="filename" />
                        </form>
                    </div>
                </div>
                <div className='roi-menu-flex'>
                    <div className='project-attachment-title'>
                        File 3
                    </div>
                    <div className='project-roi-detail'>
                        <form action="/action_page.php">
                            <input type="file" id="myFile" name="filename" />
                        </form>
                    </div>
                </div>
                <div className='roi-menu-flex'>
                    <div className='project-attachment-title'>
                        File 4
                    </div>
                    <div className='project-roi-detail'>
                        <form action="/action_page.php">
                            <input type="file" id="myFile" name="filename" />
                        </form>
                    </div>
                </div>
                <div className='insert-note-flex'>
                    <div className='insert-note'>
                        <img className='insert-img' src="/assets/plus.png" />
                        <div>
                            Upload File
                        </div>
                    </div>
                </div>
            </div>
    } else if (selectedMenuItem === 'note') {
        content =
            <div>
                <TextField
                    style={{ textAlign: 'left', width: '100%', marginBottom: '15px' }}
                    hintText="Message Field"
                    floatingLabelText="MultiLine and FloatingLabel"
                    multiline
                    rows={15}
                />
                <div className='insert-note-flex'>
                    <div className='insert-note'>
                        <img className='insert-img' src="/assets/plus.png" />
                        <div>
                            Insert Note
                        </div>
                    </div>
                </div>
            </div>
    } else if (selectedMenuItem === 'log') {
        content = <Log />
    }

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
                <div className='project_detail-body'>
                    <div className='project-detail-title-flex'>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img className='ball-detial-processing' />
                            <div className='project-detail-title'>Project : CP Sustainabilty report analysis (New)</div>
                        </div>
                        <div className='download-model-box'>
                            <img className='subtract-icon' src="/assets/subtract.png" />
                            <div className='download-model'>Download Business Model</div>
                        </div>
                    </div>
                    <div className='project-owner-grid'>
                        <div className='project-owner-box'>
                            <div className='project-owner-box-flex'>
                                <div className='project-owner-title'>
                                    PROJECT OWNER
                                </div>
                                <img className='project-owner-img' src="/assets/project-owner.jpg" />
                                <div className='project-owner-name'>
                                    MR.KITTIN VATABUTR
                                </div>
                                <div className='project-owner-detail-box'>
                                    <div style={{ marginBottom: '20px' }}>
                                        <div className='project-description'>Project Description</div>
                                        <div className='project-description-detail'>Collecting data from CP Sustainablity and executing as a data visualization.</div>
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <div className='project-objective'>Project Objective</div>
                                        <div className='project-objective-detail'>Making CP Sustainablity data easy to be collect, operate, execute and show report analysis.</div>
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <div className='project-description'>Project Progress / What you have done ?(s)</div>
                                        <div className='project-objective-detail'>- Collect raw data (old report from google form etc.) and analyse.</div>
                                        <div className='project-objective-detail'>- Meeting with HR team training for customize data and action plan phase by phase.</div>
                                        <div className='project-objective-detail'>- Connect with IT team and present solution for collect data in which database and naming domain name for this system</div>
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <div className='project-objective'>Project Progress</div>
                                        <div className='project-description-detail'>Level : SF - Strategy Formulation</div>
                                        <div className='project-description-detail'>% Progress : 15 %</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='project-create-time'>Create Date : 19 Dec 2022 15:30:38 | Create By : K. Kittin Vatabutr</div>
                                <div className='project-update-time'>Last Update : 14 May 2023 15:52:56 | Update By : K. Kittin Vatabutr</div>
                            </div>
                        </div>
                        <div className='project-description-box'>
                            <div className='project-description-menu'>
                                <div className='project-description-menuitem' onClick={() => handleMenuItemClick('overall')}>Overall</div>
                                <div className='project-description-menuitem' onClick={() => handleMenuItemClick('actionPlan')}>Action Plan</div>
                                <div className='project-description-menuitem' onClick={() => handleMenuItemClick('roi')}>ROI</div>
                                <div className='project-description-menuitem' onClick={() => handleMenuItemClick('attachment')}>Attachment</div>
                                <div className='project-description-menuitem' onClick={() => handleMenuItemClick('note')}>Note</div>
                                <div className='project-description-menuitem' onClick={() => handleMenuItemClick('log')}>Log</div>
                            </div>
                            <div className='project-description-detail-box'>
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}