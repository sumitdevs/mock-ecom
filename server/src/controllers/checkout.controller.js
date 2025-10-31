import Receipt from "../models/receipt.model.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const handleCheckout = async (req,res) => {
    try{
        const {name,email,total} = req.body;
        const receipt  = await Receipt.create({name,email,total});

        const doc = new PDFDocument();
        const filePath = path.join("uploads", `receipt-${receipt._id}.pdf`);
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc.fontSize(20).text("Receipt", { align: "center" });
        doc.moveDown();
        doc.text(`Name: ${name}`);
        doc.text(`Email: ${email}`);
        doc.text(`Total Paid: ₹${total}`);
        doc.end();

        stream.on("finish", () => {
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            return res.status(201).json({
                pdfUrl: `${baseUrl}/${filePath}`,
            });
        });
    } catch(err){
        return res.status(500).json({message: err.message})
    }
}

