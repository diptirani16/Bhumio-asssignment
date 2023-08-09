import React from "react";
import { mergePDF, pdfArrayToBlob } from 'pdf-actions';
import { Button } from "@mui/material";

export default function Merge() {
    const handleMerge = async () => {
        const mergedPDFDocument = await mergePDF('table.pdf', 'table1.pdf');
        const mergedPdfFile = await mergedPDFDocument.save();
        const pdfBlob = pdfArrayToBlob(mergedPdfFile);
    }

    return(
        <>
            <Button onClick={() => handleMerge()} variant="contained" color="success" sx={{float: "right", m: 4}}>MERGE</Button>
        </>
    )
}