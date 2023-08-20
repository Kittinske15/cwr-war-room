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

const Log = () => {
    const classes = useStyles();

    const originalRows = [
        {
            id: '1', type: 'Wait for approve', date: 'Thu 02 Feb 2023 17:10:14', by: 'Kittin Vatabutr'
        },
        {
            id: '2', type: 'Update', date: 'Thu 02 Feb 2023 17:11:42', by: 'Kittin Vatabutr'
        },
        {
            id: '3', type: 'Update', date: 'Mon 20 Feb 2023 00:28:03', by: 'Kittin Vatabutr'
        },
        {
            id: '4', type: 'Update', date: 'Fri 10 Mar 2023 10:31:09', by: 'Kittin Vatabutr'
        },
        {
            id: '5', type: 'Update Project Action plan', date: 'Mon 03 Apr 2023 00:26:35', by: 'Kittin Vatabutr'
        },
        {
            id: '6', type: 'Update', date: 'Mon 03 Apr 2023 09:10:14', by: 'Kittin Vatabutr'
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
                                <TableCell align="center">Action Type</TableCell>
                                <TableCell align="center">Action Date</TableCell>
                                <TableCell align="center">Action By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.type}</TableCell>
                                    <TableCell align="center">{row.date}</TableCell>
                                    <TableCell align="center">{row.by}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default Log;
