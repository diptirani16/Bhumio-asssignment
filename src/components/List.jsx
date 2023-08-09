import React, { useEffect, useRef, useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container } from '@mui/material';
import { TextField, Button } from '@mui/material';
// const data = require('../address.json');
import data from '../address.json';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
import { useReactToPrint } from 'react-to-print';
import Merge from "./Merge";

export default function List() {
    const componentPDF = useRef();
    const [details, setDetails] = useState([]);
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");
    const [zip, setZip] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [editData, setEditData] = useState("0");
    const [editName, setEditName] = useState("");
    const [editMajor, setEditMajor] = useState("");
    const [editZip, setEditZip] = useState("");
    const [editState, setEditState] = useState("");
    const [editCity, setEditCity] = useState("");
    const [editAddtess1, setEditAddress1] = useState("0");
    const [editAddtess2, setEditAddress2] = useState("0");

    useEffect(() => {
        setDetails(data.Students);
    }, [])

    const onDownload = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "userData",
        onAfterPrint: () => alert("Data saved as pdf")
    })

    const handleEdit = (id) => {
        setEditData(id);
    }

    const handleUpdate = (id) => {
        setDetails(details);
    }

    return(
        <>
        <Container>
        <TextField sx={{m: 1}} onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined" size="small" />
    <TextField sx={{m: 1}} onChange={(e) => setMajor(e.target.value)} id="outlined-basic" label="Major" variant="outlined" size="small" />
    <TextField sx={{m: 1}} onChange={(e) => setZip(e.target.value)} id="outlined-basic" label="Zip" variant="outlined" size="small" />
    <TextField sx={{m: 1}} onChange={(e) => setState(e.target.value)} id="outlined-basic" label="State" variant="outlined" size="small" />
    <TextField sx={{m: 1}} onChange={(e) => setCity(e.target.value)} id="outlined-basic" label="City" variant="outlined" size="small" />
            <TableContainer ref={componentPDF} component={Paper}>
      <Table sx={{ minWidth: 650 }} id="students-details" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Major</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Zip</TableCell>
            <TableCell align="right">Address 1</TableCell>
            <TableCell align="right">Address 2</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details?.filter((ele) => {
            if(name == ""){
                return ele;
            }
            else if(ele.Name.toLowerCase().includes(name.toLowerCase())){
                return ele;
            }
          })
          .filter((ele) => {
            if(major == ""){
                return ele;
            }
            else if(ele.Major.toLowerCase().includes(major.toLowerCase())){
                return ele;
            }
          })
          .filter((ele) => {
            if(zip == ""){
                return ele;
            }
            else if(ele.address.zip.toLowerCase().includes(zip.toLowerCase())){
                return ele;
            }
          })
          .filter((ele) => {
            if(state == ""){
                return ele;
            }
            else if(ele.address.state.toLowerCase().includes(state.toLowerCase())){
                return ele;
            }
          })
          .filter((ele) => {
            if(city == ""){
                return ele;
            }
            else if(ele.address.city.toLowerCase().includes(city.toLowerCase())){
                return ele;
            }
          })
            .map((row, idx) => (
                idx+1 == editData ? 
                <TableRow
              key={row.Name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                    <TableCell component="th" scope="row">{idx+1}</TableCell>
                    <TableCell align="right"><TextField size="small" value={row.Name} onChange={(e) => setEditName(e.target.value)}></TextField></TableCell>
                    <TableCell align="right"><TextField size="small" value={row.Major} onChange={(e) => setEditMajor(e.target.value)}></TextField></TableCell>
                    <TableCell align="right"><TextField size="small" value={row.address.state} onChange={(e) => setEditState(e.target.value)}></TextField></TableCell>
                    <TableCell align="right"><TextField size="small" value={row.address.zip} onChange={(e) => setEditZip(e.target.value)}></TextField></TableCell>
                    <TableCell align="right"><TextField size="small" value={row.address.address_1} onChange={(e) => setEditAddress1(e.target.value)}></TextField></TableCell>
                    <TableCell align="right"><TextField size="small" value={row.address.address_2} onChange={(e) => setEditAddress2(e.target.value)}></TextField></TableCell>
                    <TableCell align="right"><TextField size="small" value={row.address.city} onChange={(e) => setEditCity(e.target.value)}></TextField></TableCell>
                    <TableCell align="right">
                <Button variant="contained" size="small" color="secondary" onClick={() => handleUpdate(idx+1)} >UPDATE</Button>
              </TableCell>
                </TableRow>
                :
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                {idx+1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell align="right">{row.Major}</TableCell>
              <TableCell align="right">{row.address.state}</TableCell>
              <TableCell align="right">{row.address.zip}</TableCell>
              <TableCell align="right">{row.address.address_1}</TableCell>
              <TableCell align="right">{row.address.address_2}</TableCell>
              <TableCell align="right">{row.address.city}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleEdit(idx+1)} variant="contained" size="small" color="success" >EDIT</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Merge />
    <Button onClick={() => onDownload()} variant="contained" color="success" sx={{float: "right", m: 4}}>Download Table</Button>
    </Container>
        </>
    )
}