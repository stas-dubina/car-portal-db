import { saveAs } from 'file-saver';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';

function savePDF() {
    try {
        const doc = (
            <Document>
                <Page>
                    <Text>Hello, World!</Text>
                </Page>
            </Document>
        );

        const asPdf = pdf([]); // {} is important, throws without an argument
        asPdf.updateContainer(doc);
        const pdfBlob = asPdf.toBlob();
        saveAs(pdfBlob, 'document.pdf');
    } catch (error) {
        console.error(error);
        alert('Error generating PDF');
    }
}

function CarsOnSaleList() {
    return (
        <div>
            <button onClick={savePDF}>Save PDF</button>
        </div>
    );
}

export default CarsOnSaleList;