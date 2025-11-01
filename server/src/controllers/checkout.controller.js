import Receipt from "../models/receipt.model.js";
import PDFDocument from "pdfkit";

export const handleCheckout = async (req,res) => {
    try{
        const {name,email,total} = req.body;
        const receipt  = await Receipt.create({name,email,total});

        const doc = new PDFDocument();
        let buffers = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => {
        const pdfData = Buffer.concat(buffers).toString("base64");
        return res.status(201).json({
            receiptId: receipt._id,
            pdfBase64: pdfData
        });
        });

        doc.fontSize(20).text("Receipt", { align: "center" });
        doc.moveDown();
        doc.text(`Name: ${name}`);
        doc.text(`Email: ${email}`);
        doc.text(`Total Paid: ₹${total}`);
        doc.end();
        
    } catch(err){
        return res.status(500).json({message: err.message})
    }
}

