import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { colors } from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});

const ProjectList = () => {
    const classes = useStyles();

    const originalRows = [
        {
            id: '1', name: "CP Sustainabilty report analysis (New)", owner: 'Kittin Vatabutr', start: '02 Feb 2023', end: '30 Jun 2023', status:
                <div className="ball-container">
                    <div className="ball-processing" />
                </div >,
            manage:
                <div className="project-manage-grid">
                    <a className="project-view" href='/project/detail'>
                        <img className='project-view-img' src="/assets/view.png" />
                        <div className='project-view-title'>View</div>
                    </a>
                    <a className="project-edit">
                        <img className='project-edit-img' src="/assets/edit.png" />
                        <div className='project-edit-title'>Edit</div>
                    </a>
                </div>
        },
        {
            id: '2', name: "CP Land War Room (New)", owner: 'Kittin Vatabutr', start: '01 Jan 2023', end: '30 Jun 2023', status:
                <div className="ball-container">
                    <div className="ball-processing" />
                </div >,
            manage:
                <div className="project-manage-grid">
                    <a className="project-view" href='/project/detail'>
                        <img className='project-view-img' src="/assets/view.png" />
                        <div className='project-view-title'>View</div>
                    </a>
                    <a className="project-edit">
                        <img className='project-edit-img' src="/assets/edit.png" />
                        <div className='project-edit-title'>Edit</div>
                    </a>
                </div>
        },
        {
            id: '3', name: "Savyu", owner: 'Kittin Vatabutr', start: '01 Jan 2023', end: '30 Jun 2023', status:
                <div className="ball-container">
                    <div className="ball-reject" />
                </div >,
            manage:
                <div className="project-manage-grid">
                    <a className="project-view" href='/project/detail'>
                        <img className='project-view-img' src="/assets/view.png" />
                        <div className='project-view-title'>View</div>
                    </a>
                    <a className="project-edit">
                        <img className='project-edit-img' src="/assets/edit.png" />
                        <div className='project-edit-title'>Edit</div>
                    </a>
                </div>
        },
        {
            id: '4', name: "Find new product for CP Group (R&D New)", owner: 'Kittin Vatabutr', start: '01 Jan 2023', end: '30 Jun 2023', status:
                <div className="ball-container">
                    <div className="ball-processing" />
                </div >,
            manage:
                <div className="project-manage-grid">
                    <a className="project-view" href='/project/detail'>
                        <img className='project-view-img' src="/assets/view.png" />
                        <div className='project-view-title'>View</div>
                    </a>
                    <a className="project-edit">
                        <img className='project-edit-img' src="/assets/edit.png" />
                        <div className='project-edit-title'>Edit</div>
                    </a>
                </div>
        },
        {
            id: '5', name: "การเข้าถึง Deal ผ่าน Networking Event (New)", owner: 'Kittin Vatabutr', start: '01 Jan 2023', end: '30 Jun 2023', status:
                <div className="ball-container">
                    <div className="ball-success" />
                </div >,
            manage:
                <div className="project-manage-grid">
                    <a className="project-view" href='/project/detail'>
                        <img className='project-view-img' src="/assets/view.png" />
                        <div className='project-view-title'>View</div>
                    </a>
                    <a className="project-edit">
                        <img className='project-edit-img' src="/assets/edit.png" />
                        <div className='project-edit-title'>Edit</div>
                    </a>
                </div>
        },
    ];

    const [rows, setRows] = useState(originalRows);
    const [searched, setSearched] = useState("");

    const requestSearch = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <>
            <Paper>
                <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                />
                <TableContainer>
                    <Table className="project-table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell align="center">Project Name</TableCell>
                                <TableCell align="center">Project Owner</TableCell>
                                <TableCell align="center">Start Date</TableCell>
                                <TableCell align="center">End Date</TableCell>
                                <TableCell align="center">Overall Status</TableCell>
                                <TableCell align="center">Manage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.owner}</TableCell>
                                    <TableCell align="center">{row.start}</TableCell>
                                    <TableCell align="center">{row.end}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                    <TableCell align="center">{row.manage}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default ProjectList;
