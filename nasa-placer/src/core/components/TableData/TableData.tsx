import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { NasaData } from "../../interfaces/Models";
import './TableData.scss';

type TableData = {
  tableData: NasaData[]
}

const TableDate = (props: TableData) => {
  useEffect(() => {

  }, [props.tableData])

  return (
    <TableContainer className="dataTable" component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Id</TableCell>
            <TableCell>Mass(g)</TableCell>
            <TableCell>year</TableCell>
            <TableCell>Reclong</TableCell>
            <TableCell>Reclat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableData.map((row: NasaData) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.mass}</TableCell>
              <TableCell>{((new Date(row.year)).getFullYear()).toString()}</TableCell>
              <TableCell>{row.reclong}</TableCell>
              <TableCell>{row.reclat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableDate;
