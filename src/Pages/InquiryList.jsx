import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const InquiryList = () => {

    const [inquiries, setInquiries] = useState([])
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchInquiries = async () => {

            try {
                const inquiryData = await axios.get('https://sc-1-jiat.onrender.com/inquiriesList');
                setInquiries(inquiryData.data);
            }
            catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                }
            }

        }
        fetchInquiries();
    }, [])


    const printStudentDetails = () => {
        if (selectedStudent) {
            const printWindow = window.open('', '', 'height=600,width=800');
            printWindow.document.write('<html><head><title>Print Student Details</title>');
            printWindow.document.write('<style>');
            printWindow.document.write('body { font-family: Arial, sans-serif; margin: 20px; }');
            printWindow.document.write('h1 { font-size: 24px; font-weight: bold; margin-bottom: 10px; }');
            printWindow.document.write('p { font-size: 18px; margin: 5px 0; }');
            printWindow.document.write('strong { font-weight: bold; }');
            printWindow.document.write('.section { border: 2px solid #374151; padding: 10px; border-radius: 5px; margin-bottom: 20px; }');
            printWindow.document.write('.flex { display: flex; gap: 20px; }');
            printWindow.document.write('</style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write('<div class="flex gap-4">');
            printWindow.document.write('<img height="80px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDz-2YfwHblfKUoM6Fx0m6zj7Xw3fPUMwZ-A&s"/>');
            printWindow.document.write('<div class="flex flex-row">');
            printWindow.document.write('<h1>SHAMIT School</h1>');
            printWindow.document.write('<h4>+91 9272216888</h4>');
            printWindow.document.write('<h4>contact@shamitschool.com</h4>');
            printWindow.document.write('</div>');
            printWindow.document.write('</div>');
            printWindow.document.write('<div class="section">');
            printWindow.document.write(`<p><strong>Enquiry No.:</strong> ${selectedStudent.ID || '-'}</p>`);
            printWindow.document.write('<div class="flex">');
            printWindow.document.write(`<p><strong>Name:</strong> ${selectedStudent.name || '-'}</p>`);
            printWindow.document.write('</div>');
            printWindow.document.write(`<p><strong>Address:</strong> ${selectedStudent.address || '-'}</p>`);
            printWindow.document.write(`<p><strong>Nationality:</strong> ${selectedStudent.nationality || '-'}</p>`);
            printWindow.document.write(`<p><strong>School:</strong> ${selectedStudent.presentSchool || '-'}</p>`);
            printWindow.document.write(`<p><strong>Bus Required:</strong> ${selectedStudent.busRequired || '-'}</p>`);
            printWindow.document.write(`<p><strong>Applying For:</strong> ${selectedStudent.applyingFor || '-'}</p>`);
            printWindow.document.write('</div>');
            printWindow.document.write('<h1>Parents Details</h1>');
            printWindow.document.write('<div class="section">');
            printWindow.document.write(`<p><strong>Father's Name:</strong> ${selectedStudent.fathersName || '-'}</p>`);
            printWindow.document.write(`<p><strong>Father's Phone:</strong> ${selectedStudent.fathersContact || '-'}</p>`);
            printWindow.document.write(`<p><strong>Father's Qualification:</strong> ${selectedStudent.fathersQualification || '-'}</p>`);
            printWindow.document.write(`<p><strong>Father's Occupation:</strong> ${selectedStudent.fathersOccupation || '-'}</p>`);

            printWindow.document.write(`<p><strong>Mother's Name:</strong> ${selectedStudent.mothersName || '-'}</p>`);
            printWindow.document.write(`<p><strong>Mother's Phone:</strong> ${selectedStudent.mothersContact || '-'}</p>`);
            printWindow.document.write(`<p><strong>Mother's Email:</strong> ${selectedStudent.mothersEmail || '-'}</p>`);
            printWindow.document.write(`<p><strong>Mother's Qualification:</strong> ${selectedStudent.mothersQualification || '-'}</p>`);
            printWindow.document.write(`<p><strong>Mother's Occupation:</strong> ${selectedStudent.mothersOccupation || '-'}</p>`);

            printWindow.document.write('</div>');
            printWindow.document.write('<h1>Siblings Details</h1>');
            printWindow.document.write('<div class="section">');
            printWindow.document.write(`<p><strong>Number of Sibling:</strong> ${selectedStudent.numberOfSibling || '-'}</p>`);
            printWindow.document.write(`<p><strong>Sibling's Name:</strong> ${selectedStudent.siblingName || '-'}</p>`);
            printWindow.document.write(`<p><strong>Sibling's school Name:</strong> ${selectedStudent.SiblingSchoolName || '-'}</p>`);
            printWindow.document.write('</div>');
            printWindow.document.write('<h1>Other Details</h1>');
            printWindow.document.write('<div class="section">');
            printWindow.document.write(`<p><strong>Preffered Call Time:</strong> ${selectedStudent.preferedCallTime || '-'}</p>`);
            printWindow.document.write(`<p><strong>Family type:</strong> ${selectedStudent.familyType || '-'}</p>`);
           
            printWindow.document.write('</div>');

            printWindow.document.write(`<p><strong>Reference:</strong> ${selectedStudent.satisfiedWithInfo || '-'}</p>`);
            printWindow.document.write(`<p><strong>Satisfied with Info:</strong> ${selectedStudent.referenceName || '-'}</p>`);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };

    const detailHandler = (data) => {
        setSelectedStudent(data);
        setShowDetails(true);
        console.log("Data is: ", data);
    }




    const tableHeaders = ['S No.', 'Enquiry No.', 'Name', 'Fathers Name', 'Fathers Contact', 'Mothers Name', 'Mothers Contact', 'Action'];
    return (
        <>

            {inquiries.length === 0 && <div className='text-red-500 absolute mt-[20vh] height-[15vh]  ml-[20vw]'>
                <img src=" https://media.tenor.com/G7LfW0O5qb8AAAAi/loading-gif.gif" />
            </div>}
            <div className='flex bg-[#007BFF] p-3 rounded-lg  text-white'>
                <h1 className='font-mono text-4xl font-bold ml-20'>Enquiry List</h1>
                <Link to="/">
                    <button className='p-1 rounded-lg bg-white text-black w-max font-bold ml-[20vw]'>Students</button>
                </Link>
                <Link to="/inquiryForm">
                    <button className='p-1 rounded-lg bg-white text-black w-max font-bold ml-[5%]'>Enquiry Form</button>
                </Link>

                <a href='https://school.gigabytecoders.com/wp-admin/index.php' target="_blank" className='p-0 rounded-lg cursor-pointer content-center bg-white text-black w-[8vw] font-bold ml-[5%]'>CRM</a>
            </div>
            <table border="1" className='mt-10' style={{ width: '80%', margin: 'auto', marginTop: '10px', textAlign: 'left' }}>
                <thead>
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th className='table-header w-max' key={`header-${index}`}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>

                    {
                        inquiries.map((data, index) => {
                            return (
                                <tr key={index + 1}>
                                    <td className='table-cell'>{index + 1}</td>
                                    <td className='table-cell'>{data.ID || '-'}</td>
                                    <td className='table-cell'>{data.name || '-'}</td>
                               
                                    <td className='table-cell'>{data.fathersName || '-'}</td>
                                    <td className='table-cell'>{data.fathersContact || '-'}</td>
                                    <td className='table-cell'>{data.mothersName || '-'}</td>
                                    <td className='table-cell'>{data.mothersContact || '-'}</td>
                                    <td className='table-cell'>

                                        <div className="flex flex-col gap-4">
                                            <button className='bg-blue-400 font-bold px-5 py-1 rounded text-white' onClick={() => {
                                                detailHandler(data);
                                            }}>Details</button>
                                            {/* <button className='bg-green-400 font-bold px-5 py-1 rounded text-white'>Admission</button> */}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            {
                showDetails &&
                <div className=" overflow-x-scroll  p-3 flex flex-col left-auto h-[70vh] w-[70vw] text-white bg-white rounded-lg shadow dark:bg-gray-700 absolute mt-[-10vh] ml-[6vw]">
                    <button className='text-black font-bold rounded bg-white px-2 w-24' onClick={() => {
                        setShowDetails(false);
                    }}>Close</button>

                    <div className="overflow-y-scroll  container flex flex-col items-start mt-8">
                        <div className="flex-col">
                            <div className="flex">
                                <span className='font-bold'>Enquiry No. : </span>
                                <span>{selectedStudent.ID == 0 ? "N/A" : selectedStudent.ID}</span>
                            </div>
                           
                            <div className="flex">
                                <span className='font-bold'>Name: </span>
                                <span>{selectedStudent.name || "-"}</span>
                            </div>
                         
                            <div className="flex">
                                <span className='font-bold'>Address: </span>
                                <span>{selectedStudent.address || "-"}</span>
                            </div>
                            <div className="flex">
                                <span className='font-bold'>Nationality: </span>
                                <span>{selectedStudent.nationality || "-"}</span>
                            </div>
                            <div className="flex">
                                <span className='font-bold'>School: </span>
                                <span>{selectedStudent.presentSchool || "-"}</span>
                            </div>
                           
                            <div className="flex">
                                <span className='font-bold'>Curriculum: </span>
                                <span>{selectedStudent.curriculum || "-"}</span>
                            </div>
                            <div className="flex">
                                <span className='font-bold'>Bus Required: </span>
                                <span>{selectedStudent.busRequired || "-"}</span>
                            </div>
                            <div className="flex">
                                <span className='font-bold'>Applying For: </span>
                                <span>{selectedStudent.applyingFor || "-"}</span>
                            </div>
                        </div>
                        <h3 className="text-[25px] mt-10">Parents Details</h3>
                        <div className="flex-col rounded-md border w-[60vw] p-2">
                            <div className="flex">
                                <span className='font-bold'>Father's Name: </span>
                                <span>{selectedStudent.fathersName || "-"}</span>
                            </div>
                            <div className="flex w-[60vw]">
                                <span className='font-bold'>Father's Contact: </span>
                                <span>{selectedStudent.fathersContact || "-"}</span>
                            </div>
                            <div className="flex w-[60vw]">
                                <span className='font-bold'>Father's Email: </span>
                                <span>{selectedStudent.fathersEmail || "-"}</span>
                            </div>
                            <div className="flex w-[60vw]">
                                <span className='font-bold'>Father's DOB: </span>
                                <span>{selectedStudent.fatherDob || "-"}</span>
                            </div>
                            <div className="flex w-[60vw]">
                                <span className='font-bold'>Father's Qualification: </span>
                                <span>{selectedStudent.fathersQualification || "-"}</span>
                            </div>
                            <div className="flex w-[60vw]">
                                <span className='font-bold'>Father's Occupation: </span>
                                <span>{selectedStudent.fathersOccupation || "-"}</span>
                            </div>
                            <div className="flex w-[60vw]">
                                <span className='font-bold'>Father's Organisation: </span>
                                <span>{selectedStudent.fathersOrganisation || "-"}</span>
                            </div>
                            <div className="flex w-[60vw]">
                                <span className='font-bold'>Father's Designation: </span>
                                <span>{selectedStudent.fathersDesignation || "-"}</span>
                            </div>
                            <div className="flex w-[60vw] mt-5">
                                <span className='font-bold'>Mother's Name: </span>
                                <span>{selectedStudent.mothersName || "-"}</span>
                            </div>


                            <div className="flex w-[60vw]">
                                <span className='font-bold'>Mother's Contact: </span>
                                <span>{selectedStudent.mothersContact || "-"}</span>
                            </div>
                            <div className="flex w-[60vw]">
                                <span className='font-bold'>MOthers's Email: </span>
                                <span>{selectedStudent.mothersEmail || "-"}</span>
                            </div>
                            <div className="flex w-[60vw]">
                                <span className='font-bold'>MOthers's DOB: </span>
                                <span>{selectedStudent.mothersDob || "-"}</span>
                            </div>
                            <div className="flex w-[60vw]">
                                <span className='font-bold'>Mothers's Qualification: </span>
                                <span>{selectedStudent.mothersQualification || "-"}</span>
                            </div>
                            <div className="flex w-[60vw]">
                                <span className='font-bold'>Mother's Occupation: </span>
                                <span>{selectedStudent.mothersOccupation || "-"}</span>
                            </div>
                            <div className="flex w-[60vw]">
                                <span className='font-bold'>Mother's Organisation: </span>
                                <span>{selectedStudent.mothersOrganisation || "-"}</span>
                            </div>
                            <div className="flex w-[60vw]">
                                <span className='font-bold'>Mother's Designation: </span>
                                <span>{selectedStudent.mothersDesignation || "-"}</span>
                            </div>
                        </div>
                        <h3 className="text-[25px] mt-10">Sibling Details</h3>
                        <div className="flex-col rounded-md border w-[60vw] p-2">
                            <div className="flex">
                                <span className='font-bold'>Number of Siblings: </span>
                                <span>{selectedStudent.numberOfSibling || "-"}</span>
                            </div>
                            <div className="flex">
                                <span className='font-bold'>Sibling's Name: </span>
                                <span>{selectedStudent.siblingName || "-"}</span>
                            </div>
                            <div className="flex">
                                <span className='font-bold'>Sibling school Name: </span>
                                <span>{selectedStudent.SiblingSchoolName || "-"}</span>
                            </div>
                            <div className="flex">
                                <span className='font-bold'>Sibling's Class: </span>
                                <span>{selectedStudent.siblingClass || "-"}</span>
                            </div>
                        </div>


                        <h3 className="text-[25px] mt-10">Other Details</h3>
                        <div className="flex-col rounded-md border w-[60vw] p-2">
                            <div className="flex">
                                <span className='font-bold'>Preffered Call Time: </span>
                                <span>{selectedStudent.preferedCallTime || "-"}</span>
                            </div>
                            <div className="flex">
                                <span className='font-bold'>Family type: </span>
                                <span>{selectedStudent.familyType || "-"}</span>
                            </div>
                           
                            <div className="flex">
                                <span className='font-bold'>Reference: </span>
                                <span>{selectedStudent.satisfiedWithInfo || "-"}</span>
                            </div>
                            <div className="flex">
                                <span className='font-bold'>Satisfied with Info: </span>
                                <span>{selectedStudent.referenceName || "-"}</span>
                            </div>
                        </div>
                        <button
                            onClick={printStudentDetails}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-5 px-5 py-2.5"
                        >
                            Print Details
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default InquiryList;