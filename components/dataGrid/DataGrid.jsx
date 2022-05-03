import TableContainer from "@mui/material/TableContainer"
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { useEffect, useState } from "react"

export default function DataGrid(props)
{
    const [rows,setRows] = useState([])

    useEffect(() => {
        if(props.rows)
        {
            setRows(props.rows)
        }
    },[props.rows])

    return(
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        {
                            props.columns.map((column,index) => {
                                return(
                                    <TableCell key={index}>{column}</TableCell>
                                )
                            })
                        }
                        {
                            props.options 
                            &&
                            <TableCell>opciones</TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row,indexR) => {
                            return(
                                <TableRow key={indexR}>
                                    <TableCell>{indexR+1}</TableCell>
                                    {
                                        props.columns.map((col,indexC) => {
                                            return(
                                                <TableCell key={indexC}>{row[col]}</TableCell>
                                            )
                                        })
                                    }
                                    {
                                        props.options
                                        &&
                                        <TableCell>
                                            {props.options(row)}
                                        </TableCell>
                                    }
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}