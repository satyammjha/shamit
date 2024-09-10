import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Table/simpleTable.css';
import { Link } from 'react-router-dom';

const StudentList = () => {
    const [studentData, setStudentData] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [studentSection, setSectionData] = useState([]);
    const [studentClass, setStudentClass] = useState([])
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const sectionMap = studentSection.reduce((acc, section) => {
        acc[section.ID] = section.label;
        return acc;
    }, {});

    const classMap = studentClass.reduce((acc, section) => {
        acc[section.ID] = section.label;
        return acc;
    }, {});

    useEffect(() => {
        if (searchQuery.length == 0) {

        }
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://sc-1-jiat.onrender.com/');
                const sectionResponse = await axios.get("https://sc-1-jiat.onrender.com/section");
                const classResponse = await axios.get("https://sc-1-jiat.onrender.com/classes");
                setStudentClass(classResponse.data)
                setSectionData(sectionResponse.data)
                setStudentData(response.data);
                setFilteredStudents(response.data);
                console.log('Fetched student data:', response.data);
                console.log('Section Data:', sectionResponse.data)
            } catch (error) {
                if (error.response) {
                    console.error('Server responded with an error:', error.response.status);
                } else if (error.request) {
                    console.error('No response received from server:', error.request);
                } else {
                    console.error('Error during setup:', error.message);
                }
                console.error('Error fetching student data:', error);
            }
        };

        fetchData();
    }, []);


    const handleSearchQueryChange = (event) => {
        const newQuery = event.target.value;
        setSearchQuery(newQuery);
        handleSearch(newQuery);
    };

    const handleSearch = async (searchedTerm) => {
        if (searchedTerm.trim() === '') {
            // If search term is empty, reset to original data
            setFilteredStudents(studentData);
            return;
        }

        try {
            const searchedStudent = await axios.get(`https://sc-1-jiat.onrender.com/search/${searchedTerm}`);
            setFilteredStudents(searchedStudent.data);
        } catch (error) {
            console.error('Error searching students:', error);
        }
    };
    const tableHeaders = ['S No.', 'Name', 'Admission No.', 'Phone', 'Email', 'Class', 'section', 'Roll Number', 'Fathers Name', 'Action'];
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
            printWindow.document.write('<h1>SHAMIT School</h1>');
            printWindow.document.write('</div>');
            printWindow.document.write('<div class="section">');
            printWindow.document.write(`<p><strong>Name:</strong> ${selectedStudent.name || '-'}</p>`);
            printWindow.document.write(`<p><strong>Admission No.:</strong> ${selectedStudent.admission_number || '-'}</p>`);
            printWindow.document.write(`<p><strong>Gender:</strong> ${selectedStudent.gender || '-'}</p>`);
            printWindow.document.write('<div class="flex">');
            printWindow.document.write(`<p><strong>Class:</strong> ${classMap[selectedStudent.session_id]}</p>`);
            printWindow.document.write(`<p><strong>Section:</strong> ${sectionMap[selectedStudent.section_id]}</p>`);

            printWindow.document.write(`<p><strong>Roll Number:</strong> ${selectedStudent.roll_number || '-'}</p>`);
            printWindow.document.write('</div>');
            printWindow.document.write(`<p><strong>Blood Group:</strong> ${selectedStudent.blood_group || '-'}</p>`);
            printWindow.document.write(`<p><strong>Id Number:</strong> ${selectedStudent.id_number || '-'}</p>`);
            printWindow.document.write(`<p><strong>Medium:</strong> ${selectedStudent.medium || '-'}</p>`);
            printWindow.document.write(`<p><strong>Bus:</strong> ${selectedStudent.bus || '-'}</p>`);
            printWindow.document.write(`<p><strong>Bus Route:</strong> ${selectedStudent.route_vehicle_id || '-'}</p>`);
            printWindow.document.write(`<p><strong>Student House:</strong> ${selectedStudent.student_house || '-'}</p>`);
            printWindow.document.write('</div>');
            printWindow.document.write('<h1>Parents Details</h1>');
            printWindow.document.write('<div class="section">');
            printWindow.document.write(`<p><strong>Father's Name:</strong> ${selectedStudent.father_name || '-'}</p>`);
            printWindow.document.write(`<p><strong>Father's Phone:</strong> ${selectedStudent.father_phone || '-'}</p>`);
            printWindow.document.write(`<p><strong>Father's Qualification:</strong> ${selectedStudent.father_qualification || '-'}</p>`);
            printWindow.document.write(`<p><strong>Father's Occupation:</strong> ${selectedStudent.father_occupation || '-'}</p>`);

            printWindow.document.write(`<p><strong>Mother's Name:</strong> ${selectedStudent.mother_name || '-'}</p>`);
            printWindow.document.write(`<p><strong>Mother's Phone:</strong> ${selectedStudent.mother_phone || '-'}</p>`);
            printWindow.document.write(`<p><strong>Mother's Qualification:</strong> ${selectedStudent.mother_qualification || '-'}</p>`);
            printWindow.document.write(`<p><strong>Mother's Occupation:</strong> ${selectedStudent.mother_occupation || '-'}</p>`);
            printWindow.document.write('</div>');

            printWindow.document.write('<h1>Other Details</h1>');
            printWindow.document.write('<div class="section">');
            printWindow.document.write(`<p><strong>Phone:</strong> ${selectedStudent.phone || '-'}</p>`);
            printWindow.document.write(`<p><strong>Email:</strong> ${selectedStudent.email || '-'}</p>`);
            printWindow.document.write(`<p><strong>Admission Date:</strong> ${selectedStudent.admission_date || '-'}</p>`);
            printWindow.document.write(`<p><strong>Birth Place:</strong> ${selectedStudent.place_of_birth || '-'}</p>`);
            printWindow.document.write(`<p><strong>Address:</strong> ${selectedStudent.address || '-'}</p>`);
            printWindow.document.write(`<p><strong>Religion:</strong> ${selectedStudent.religion || '-'}</p>`);
            printWindow.document.write('<div class="flex">');
            printWindow.document.write(`<p><strong>Caste:</strong> ${selectedStudent.caste || '-'}</p>`);
            printWindow.document.write(`<p><strong>Sub Caste:</strong> ${selectedStudent.sub_caste || '-'}</p>`);
            printWindow.document.write(`<p><strong>Category:</strong> ${selectedStudent.category || '-'}</p>`);
            printWindow.document.write('</div>');
            printWindow.document.write(`<p><strong>Type of Admission:</strong> ${selectedStudent.type_of_admission || '-'}</p>`);
            printWindow.document.write('<div class="flex">');
            printWindow.document.write(`<p><strong>Type:</strong> ${selectedStudent.student_type || '-'}</p>`);

            printWindow.document.write('</div>');
            printWindow.document.write('</div>');
            printWindow.document.write('<h1>Previous School Details</h1>');
            printWindow.document.write('<div class="section">');
            printWindow.document.write(`<p><strong>Previous School Attended:</strong> ${selectedStudent.previous_school_name || '-'}</p>`);
            printWindow.document.write(`<p><strong>Previous Class Attended:</strong> ${selectedStudent.previous_class_attended || '-'}</p>`);
            printWindow.document.write(`<p><strong>Previous School Board:</strong> ${selectedStudent.previous_school_board || '-'}</p>`);
            printWindow.document.write(`<p><strong>Previous School Contact Number:</strong> ${selectedStudent.previous_school_contact_no || '-'}</p>`);
            printWindow.document.write(`<p><strong>Previous School Details:</strong> ${selectedStudent.previous_school_details || '-'}</p>`);
            printWindow.document.write('</div>');

            printWindow.document.write(`<p><strong>Medical History:</strong> ${selectedStudent.student_medical_history || '-'}</p>`);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };

    const openModal = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
    };

    return (
        <>
            {studentData.length === 0 && <div className='text-red-500 absolute mt-[20vh] height-[15vh]  ml-[20vw]'>
                <img src=" https://media.tenor.com/G7LfW0O5qb8AAAAi/loading-gif.gif" />
            </div>}
            <div className='flex bg-[#007BFF] p-3 rounded-lg text-white'>
                <h1 className='font-mono text-4xl font-bold ml-20'>Students List</h1>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    placeholder='Name/Admission Number'
                    className='p-1 border-solid border-2 rounded-lg border-cyan-700 ml-10 text-black'
                />
                {/* 
                <button onClick={handleSearchQueryChange} className='p-1 rounded-lg bg-green-600 w-20 font-bold ml-[10%]'>
                    Search
                </button> */}
                <Link to='/InquiryList'>
                    <button className='p-1 rounded-lg bg-white text-black w-[8vw] font-bold ml-[10%]'>
                        Inquiry List
                    </button>
                </Link>
                <Link to="/inquiryForm">
                    <button className='p-1 rounded-lg bg-white text-black w-max font-bold ml-[15%]'>Enquiry Form</button>
                </Link>
                <a href='https://school.gigabytecoders.com/wp-admin/index.php' target="_blank" className='p-0 rounded-lg cursor-pointer content-center bg-white text-black w-[8vw] font-bold ml-[5%]'>CRM</a>
            </div>
            <div className='mt-10'>
                {filteredStudents && filteredStudents.length > 0 && (
                    <table border="1" style={{ width: '80%', margin: 'auto', textAlign: 'left' }}>
                        <thead>
                            <tr>
                                {tableHeaders.map((header, index) => (
                                    <th className='table-header' key={`header-${index}`}>
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((data, index) => {

                                return (
                                    <tr key={`student-${index}`}>
                                        <td className='table-cell'>{index + 1}</td>
                                        <td className='table-cell'>{data.name || '-'}</td>
                                        <td className='table-cell'>{data.admission_number || '-'}</td>
                                        <td className='table-cell'>{data.phone || '-'}</td>
                                        <td className='table-cell'>{data.email || '-'}</td>
                                        <td className='table-cell'>{classMap[data.session_id] || '-'}</td>
                                        <td className='table-cell'>{sectionMap[data.section_id] || '-'}</td>
                                        <td className='table-cell'>{data.roll_number || '-'}</td>
                                        <td className='table-cell'>{data.father_name || '-'}</td>
                                        <td className='table-cell'>
                                            <button
                                                onClick={() => openModal(data)}
                                                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                type="button"
                                            >
                                                View Details
                                            </button>

                                        </td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {isModalOpen && (
                <div id="default-modal" className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-lg">
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Student Details
                            </h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-4 bg-white text-left overflow-scroll h-[75vh]">
                            {selectedStudent && (
                                <>
                                    <h1 className='font-bold'>Student Details:</h1>
                                    <div className='border-solid border-2 border-[#374151] p-3 rounded-[3px]'>
                                        <span className="flex ">
                                            <p><strong>Name:</strong> {selectedStudent.name || '-'}</p>
                                            <p className='ml-10'><strong>Admission No.:</strong> {selectedStudent.admission_number || '-'}</p>
                                        </span>

                                        <p><strong>Gender:</strong>{selectedStudent.gender
                                        }</p>
                                        <span className="flex gap-[10vh]">

                                            <p><strong>Class:</strong> {classMap[selectedStudent.session_id] || '-'}</p>
                                            <p><strong>Section:</strong> {sectionMap[selectedStudent.session_id] || '-'}</p>
                                            <p><strong>Roll Number:</strong> {selectedStudent.roll_number || '-'}</p>
                                        </span>
                                        <p><strong>Blood Group:</strong>{selectedStudent.blood_group
                                        }</p>
                                        <p><strong>Id Number:</strong>{selectedStudent.id_number
                                        }</p>

                                        <p><strong>Medium:</strong>{selectedStudent.medium
                                        }</p>
                                        <p><strong>Bus:</strong>{selectedStudent.bus
                                        }</p>
                                        <p><strong>Bus Route:</strong>{selectedStudent.route_vehicle_id
                                        }</p>

                                        <p><strong>Student house:</strong> {selectedStudent.student_house || '-'}</p>
                                    </div>

                                    <h1 className='font-bold mt-5'>Parents Details:</h1>

                                    <div className="border-solid border-2 border-[#374151] p-3 rounded-[3px]">
                                        <p><strong>Father's Name:</strong> {selectedStudent.father_name || '-'}</p>
                                        <p><strong>Father's Phone:</strong> {selectedStudent.father_phone || '-'}</p>

                                        <p><strong>Father's Qualification:</strong> {selectedStudent.father_qualification || '-'}</p>
                                        <p><strong>Father's Occupation:</strong> {selectedStudent.father_occupation || '-'}</p>

                                        <div className="my-5">
                                            <p><strong>Mother's Name:</strong> {selectedStudent.mother_name || '-'}</p>

                                            <p><strong>Mother's Phone:</strong> {selectedStudent.mother_phone || '-'}</p>
                                            <p><strong>Mother's Qualification:</strong> {selectedStudent.mother_phone || '-'}</p>
                                            <p><strong>Mother's Occupation:</strong> {selectedStudent.mother_occupation || '-'}</p>
                                        </div>
                                    </div>
                                    <h1 className='font-bold'>Other Details:</h1>
                                    <span className="flex flex-col border-solid border-2 border-[#374151] p-3 rounded-[3px]">
                                        <p><strong>Phone:</strong> {selectedStudent.phone || '-'}</p>
                                        <p><strong>Email:</strong> {selectedStudent.email || '-'}</p>


                                        <p><strong>Admission Date:</strong> {selectedStudent.admission_date || '-'}</p>
                                        <p><strong>Birth Place:</strong> {selectedStudent.place_of_birth || '-'}</p>
                                        <p><strong>Address:</strong> {selectedStudent.address || '-'}</p>
                                        <p><strong>Religion:</strong> {selectedStudent.religion || '-'}</p>
                                        <span className="flex">
                                            <strong>Caste:</strong>{selectedStudent.caste}
                                            <strong className='ml-5'>Sub Caste:</strong>{selectedStudent.sub_caste}
                                            <strong className='ml-10'>Category:</strong>{selectedStudent.category}
                                        </span>
                                        <strong className=''>Type of Admission
                                            :</strong>{selectedStudent.type_of_admission}
                                        <span className="flex gap-4">
                                            <p><strong>Type:</strong> {selectedStudent.student_type || '-'}</p>

                                        </span>
                                    </span>
                                    <h1 className='font-bold'>Previous school details:</h1>
                                    <div className='border-solid border-2 border-[#374151] p-3 rounded-[3px]'>

                                        <p><strong>Previous school attended:</strong> {selectedStudent.previous_school_name || '-'}</p>
                                        <p><strong>Previous class attended:</strong> {selectedStudent.previous_class_attended || '-'}</p>
                                        <p><strong>Previous school board:</strong> {selectedStudent.previous_school_board || '-'}</p>
                                        <p><strong>Previous school contact number:</strong> {selectedStudent.previous_school_contact_no || '-'}</p>
                                        <p><strong>Previous school details:</strong> {selectedStudent.previous_school_details || '-'}</p>
                                    </div>
                                    <p className='mt-5'><strong>Medical History:</strong> {selectedStudent.student_medical_history || '-'}</p>
                                </>
                            )}
                        </div>

                        <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                onClick={printStudentDetails}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Print Details
                            </button>
                            <button
                                onClick={closeModal}
                                className="ml-3 text-gray-900 bg-white border border-gray-200 rounded-lg py-2.5 px-5 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4"
                            >
                                Close
                            </button>
                            {/* <button
                                onClick={printStudentDetails}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ml-5 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Edit Details
                            </button> */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StudentList;