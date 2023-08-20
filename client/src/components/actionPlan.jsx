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

const ActionPlan = () => {
    const classes = useStyles();

    const originalRows = [
        {
            id: '1', plan: "Mockup design report and input form.", owner: 'Kittin Vatabutr', start: '20 Mar 2023', end: '31 Mar 2023	', status:
                <div className="ball-container">
                    <div className="ball-processing" />
                </div >,
        },
        {
            id: '2', plan: "Feedback after Mockup.", owner: 'Kittin Vatabutr', start: '03 Apr 2023', end: '07 Apr 2023', status:
                <div className="ball-container">
                    <div className="ball-processing" />
                </div >,
        },
        {
            id: '3', plan: "Design database structure.", owner: 'Kittin Vatabutr', start: '07 Apr 2023', end: '12 Apr 2023', status:
                <div className="ball-container">
                    <div className="ball-processing" />
                </div >,
        },
        {
            id: '4', plan: "Build up webpage (Frontend) - Build up backend and database data", owner: 'Kittin Vatabutr', start: '13 Apr 2023', end: '28 Apr 2023', status:
                <div className="ball-container">
                    <div className="ball-processing" />
                </div >,
        },
        {
            id: '5', plan: "Feedback after design - UAT", owner: 'Kittin Vatabutr', start: '02 May 2023', end: '05 May 2023', status:
                <div className="ball-container">
                    <div className="ball-processing" />
                </div >,
        },
        {
            id: '6', plan: "Go live input form", owner: 'Kittin Vatabutr', start: '08 May 2023', end: '11 May 2023', status:
                <div className="ball-container">
                    <div className="ball-processing" />
                </div >,
        },
        {
            id: '7', plan: "Go live report analysis", owner: 'Kittin Vatabutr', start: '12 May 2023', end: '17 May 2023', status:
                <div className="ball-container">
                    <div className="ball-processing" />
                </div >,
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
                <TableContainer>
                    <Table className="project-table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell align="center">Action Plan</TableCell>
                                <TableCell align="center">Responsibility</TableCell>
                                <TableCell align="center">Start Date</TableCell>
                                <TableCell align="center">End Date</TableCell>
                                <TableCell align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.plan}</TableCell>
                                    <TableCell align="center">{row.owner}</TableCell>
                                    <TableCell align="center">{row.start}</TableCell>
                                    <TableCell align="center">{row.end}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default ActionPlan;
