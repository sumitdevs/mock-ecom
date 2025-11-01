import React from 'react'
import {CloudDownload, CheckCheck,Home} from 'lucide-react';
import { Link, useLocation} from 'react-router-dom';

function Receipt() {
    const { state } = useLocation();
    function handlePdf() {
        const byteCharacters = atob(state.pdfBase64);
        const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(blob);
        window.open(pdfUrl, "_blank");
    }
    return (
        <div className='min-h-[90vh] flex items-center justify-center'>
            <div className='flex flex-col gap-y-4 items-center border max-w-sm p-6 border-gray-200 rounded-xl '>
                <div className='flex items-center justify-center gap-x-4'>
                    <h2 className='text-3xl'>Order Completed</h2>
                    <span className='h-5 w-5 p-1 mt-1 text-white bg-green-400 rounded-full flex items-center justify-center'>
                        <CheckCheck />
                    </span>
                </div>
            <div className='flex gap-x-3'>
                <Link to="/" className='flex gap-x-3 rounded-sm px-4 py-1 bg-yellow-200 hover:bg-amber-300 transition-all divide-neutral-300 items-center justify-center '>
                    <Home width={14} strokeWidth={1} />
                    Home
                </Link>
                <button onClick={handlePdf} className='flex gap-x-3 rounded-sm px-4 py-1 bg-yellow-200 hover:bg-amber-300 transition-all divide-neutral-300 items-center justify-center '>
                    receipt
                    <CloudDownload width={14} strokeWidth={1} />
                </button>
            </div>
            </div>
        </div>
    )
}

export default Receipt