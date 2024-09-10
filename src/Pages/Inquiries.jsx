import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Inquiries = () => {
    const [submitting, setSubmitting] = useState()
    const [formData, setFormData] = useState({
        admissionForSession: '',
        studentName: '',
        enquiryNo: '',
        dob: '',
        address: '',
        presentSchool: '',
        presentClass: '',
        curriculum: '',
        applyingFor: '',
        nationality: '',
        religion: '',
        caste: '',
        busRequired: '',
        fathersName: '',
        fatherDob: '',
        fathersQualification: '',
        fathersEmail: '',
        fathersOccupation: '',
        fathersOrganisation: '',
        fathersDesignation: '',
        fathersContact: '',
        mothersName: '',
        mothersDob: '',
        mothersQualification: '',
        mothersEmail: '',
        mothersOccupation: '',
        mothersOrganisation: '',
        mothersDesignation: '',
        mothersContact: '',
        familyType: '',
        numberOfSibling: '',
        siblingName: '',
        SiblingSchoolName: '',
        siblingClass: '',
        sourceOfInfo: '',
        referenceName: '',
        satisfiedWithInfo: '',
        preferedCallTime: ''
    });
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        try {
            const response = await axios.post('https://sc-1-jiat.onrender.com/add-student', formData);
            if (response.data.success) {
                setSubmitting(false)
                alert('Student data submitted successfully');

                setFormData(
                    {
                        admissionForSession: '',
                        studentName: '',
                        enquiryNo: '',
                        dob: '',
                        address: '',
                        presentSchool: '',
                        presentClass: '',
                        curriculum: '',
                        applyingFor: '',
                        nationality: '',
                        religion: '',
                        caste: '',
                        busRequired: '',
                        fathersName: '',
                        fatherDob: '',
                        fathersQualification: '',
                        fathersEmail: '',
                        fathersOccupation: '',
                        fathersOrganisation: '',
                        fathersDesignation: '',
                        fathersContact: '',
                        mothersName: '',
                        mothersDob: '',
                        mothersQualification: '',
                        mothersEmail: '',
                        mothersOccupation: '',
                        mothersOrganisation: '',
                        mothersDesignation: '',
                        mothersContact: '',
                        familyType: '',
                        numberOfSibling: '',
                        siblingName: '',
                        SiblingSchoolName: '',
                        siblingClass: '',
                        sourceOfInfo: '',
                        referenceName: '',
                        satisfiedWithInfo: '',
                        preferedCallTime: ''
                    }
                )
            } else {
                alert('Failed to submit student data');
            }
        } catch (error) {
            console.error('There was an error submitting the form:', error);
            alert('An error occurred while submitting the form');
        }
    };
    return (
        <div >
            {submitting == true ? <div className='text-red-500 absolute mt-[100vh] height-[15vh]  ml-[20vw]'>
                <img src=" https://media.tenor.com/G7LfW0O5qb8AAAAi/loading-gif.gif" />
            </div> : ''}
            <div className='flex bg-blue-600 p-3 rounded-lg text-white items-center'>
                <p className='font-mono text-2xl font-bold ml-20'>Inquiry form</p>
                {/* <button className='p-2 rounded-lg bg-green-600 w-24 font-bold ml-auto'>Export</button>
                 */}
                <Link className='ml-10 px-3 py-1 rounded bg-white text-black font-bold' to='/inquiryList'>Enquiry List</Link>
                <Link className='ml-10 px-3 py-1 rounded bg-white text-black font-bold' to='/'>Student List</Link>
                <a href='https://school.gigabytecoders.com/wp-admin/index.php' target="_blank" className='p-0 rounded-lg cursor-pointer content-center bg-white text-black w-[8vw] font-bold ml-[5%]'>CRM</a>
            </div>
            <form className="p-6 bg-white shadow-md rounded-lg mt-6" onSubmit={handleSubmit}>

                <div className="border-4 p-5">
                    <h2 className="font-bold text-xl mb-4">Personal Details:</h2>
                    <div className="flex flex-col">
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Name:</label>
                            <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>

                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Residential Address:</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                        <div className="flex flex-row">
                            <div className="mb-4 flex items-center">
                                <label className="block font-bold text-[20px]">Present Class:</label>
                                <input type="text" name="presentClass" value={formData.presentClass} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                            </div>
                            <div className="mb-4 flex items-center ml-10">
                                <label className="block font-bold text-[20px]">Applying for Class:</label>
                                <input type="text" name="applyingFor" value={formData.applyingFor} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                            </div>

                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Present School:</label>
                            <input type="text" name="presentSchool" value={formData.presentSchool} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />

                            <div className='ml-[10vw] flex items-center'>
                                <label className="block font-bold text-[20px]">Curriculum:</label>
                                <div className=" flex gap-4 ml-4">
                                    <span>
                                        <input
                                            type="radio"
                                            value="CBSE"
                                            name="curriculum"
                                            checked={formData.curriculum === 'CBSE'}
                                            onChange={handleChange}
                                        /> CBSE
                                    </span>
                                    <span>
                                        <input
                                            type="radio"
                                            value="State"
                                            name="curriculum"
                                            checked={formData.curriculum === 'State'}
                                            onChange={handleChange}
                                        /> State
                                    </span>
                                    <span>
                                        <input
                                            type="radio"
                                            value="Semi English"
                                            name="curriculum"
                                            checked={formData.curriculum === 'Semi English'}
                                            onChange={handleChange}
                                        /> English
                                    </span>
                                </div>
                            </div>


                        </div>


                        <div className="flex flex-row">
                            <div className="mb-4 flex items-center">
                                <label className="block font-bold text-[20px]">Nationality:</label>
                                <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                            </div>
                        </div>
                        <div className="flex flex-row ml-[-2.5vw]">
                            <div className="mb-4 flex items-center ml-10">
                                <label className="block font-bold text-[20px]">Religion:</label>
                                <input type="text" name="religion" value={formData.religion} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                            </div>
                            <div className="mb-4 flex items-center ml-10">
                                <label className="block font-bold text-[20px]">Caste:</label>
                                <input type="text" name="caste" value={formData.caste} onChange={handleChange} className="border-4 rounded p-2 w-[8vw]" />
                            </div>
                        </div>
                        <div className='ml-[10vw] flex items-center'>
                            <label className="block font-bold text-[20px] ml-[-10vw]">Bus Required:</label>
                            <div className=" flex gap-4 ml-4">
                                <span>
                                    <input
                                        type="radio"
                                        value="Yes"
                                        name="busRequired"
                                        checked={formData.busRequired === 'Yes'}
                                        onChange={handleChange}
                                    /> Yes
                                </span>
                                <span>
                                    <input
                                        type="radio"
                                        value="no"
                                        name="busRequired"
                                        checked={formData.busRequired === 'no'}
                                        onChange={handleChange}
                                    /> No
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-4 rounded-md p-5'>
                    <h5 className='underline font-bold'>FATHER'S/GUARDIAN PARTICULARS:</h5>
                    <div className="flex flex-row gap-4">
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Father's name:</label>
                            <input type="text" name="fathersName" value={formData.fathersName} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Date of Birth:</label>
                            <input type="date" name="fatherDob" value={formData.fatherDob} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Academic Qualification:</label>
                            <input type="text" name="fathersQualification" value={formData.fathersQualification} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Occupation:</label>
                            <input type="text" name="fathersOccupation" value={formData.fathersOccupation} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Name of Organization:</label>
                            <input type="text" name="fathersOrganisation" value={formData.fathersOrganisation} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Designation:</label>
                            <input type="text" name="fathersDesignation" value={formData.fathersDesignation} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Email:</label>
                            <input type="text" name="fathersEmail" value={formData.fathersEmail} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Tel (M):</label>
                            <input type="number" name="fathersContact" value={formData.fathersContact} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                    </div>
                </div>
                <div className='border-4 rounded-md p-3'>
                    <h5 className='underline font-bold'>MOTHER'S PARTICULARS:</h5>
                    <div className="flex flex-row gap-4">
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Mothers's name:</label>
                            <input type="text" name="mothersName" value={formData.mothersName} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Date of Birth:</label>
                            <input type="date" name="mothersDob" value={formData.mothersDob} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Academic Qualification:</label>
                            <input type="text" name="mothersQualification" value={formData.mothersQualification} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Occupation:</label>
                            <input type="text" name="mothersOccupation" value={formData.mothersOccupation} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Name of Organization:</label>
                            <input type="text" name="mothersOrganisation" value={formData.mothersOrganisation} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Designation:</label>
                            <input type="text" name="mothersDesignation" value={formData.mothersDesignation} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Email:</label>
                            <input type="text" name="mothersEmail" value={formData.mothersEmail} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Tel (M):</label>
                            <input type="number" name="mothersContact" value={formData.mothersContact} onChange={handleChange} className="border-4 rounded p-2 w-[25vw]" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row ml-[-12.5%] w-[100vw] items-center">
                    <div className='ml-[10vw] flex items-center'>
                        <label className="block font-bold text-[20px]">We live in a:</label>
                        <div className=" flex gap-4 ml-4">
                            <span>
                                <input
                                    type="radio"
                                    value="joint"
                                    name="familyType"
                                    checked={formData.familyType === 'joint'}
                                    onChange={handleChange}
                                /> Joint or extended Family
                            </span>
                            <span>
                                <input
                                    type="radio"
                                    value="nuclear"
                                    name="familyType"
                                    checked={formData.familyType === 'nuclear'}
                                    onChange={handleChange}
                                /> Nuclear Family
                            </span>
                            <span>
                                <input
                                    type="radio"
                                    value="single parent family"
                                    name="familyType"
                                    checked={formData.familyType === 'single parent family'}
                                    onChange={handleChange}
                                /> Single Parent Family
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex-col border-4 rounded-md p-5">
                    <h5 className='underline font-bold'>OTHER'S PARTICULARS:</h5>
                    <div className="mb-4 flex items-center">
                        <label className="block font-bold text-[20px]">Number of siblings:</label>
                        <input type="text" name="numberOfSibling" value={formData.numberOfSibling} onChange={handleChange} className="border-4 rounded p-2" />
                    </div>
                    <div className="flex flex-row gap-8">

                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Sibling's Name:</label>
                            <input type="text" name="siblingName" value={formData.siblingName} onChange={handleChange} className="border-4 rounded p-2" />
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">School Name:</label>
                            <input type="text" name="SiblingSchoolName" value={formData.SiblingSchoolName} onChange={handleChange} className="border-4 rounded p-2" />
                        </div>
                        <div className="mb-4 flex items-center">
                            <label className="block font-bold text-[20px]">Class:</label>
                            <input type="text" name="siblingClass" value={formData.siblingClass} onChange={handleChange} className="border-4 rounded p-2" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <label className="block font-bold text-[20px]">Source of Information:</label>

                        <span>
                            <input
                                type="radio"
                                value="Newspaper"
                                name="sourceOfInfo"
                                checked={formData.sourceOfInfo === 'Newspaper'}
                                onChange={handleChange}
                            />
                            Newspaper
                        </span>

                        <span>
                            <input
                                type="radio"
                                value="Radio"
                                name="sourceOfInfo"
                                checked={formData.sourceOfInfo === 'Radio'}
                                onChange={handleChange}
                            />
                            Radio
                        </span>

                        <span>
                            <input
                                type="radio"
                                value="Outdoor"
                                name="sourceOfInfo"
                                checked={formData.sourceOfInfo === 'Outdoor'}
                                onChange={handleChange}
                            />
                            Outdoor
                        </span>

                        <span>
                            <input
                                type="radio"
                                value="Social Media"
                                name="sourceOfInfo"
                                checked={formData.sourceOfInfo === 'Social Media'}
                                onChange={handleChange}
                            />
                            Social Media
                        </span>

                        <span>
                            <input
                                type="radio"
                                value="Reference"
                                name="sourceOfInfo"
                                checked={formData.sourceOfInfo === 'Reference'}
                                onChange={handleChange}
                            />
                            Reference (Please Specify):
                            {formData.sourceOfInfo === 'Reference' && (
                                <input
                                    type="text"
                                    className="border-4 rounded-md ml-2"
                                    name="referenceName"
                                    value={formData.referenceName || ''}
                                    onChange={handleChange}
                                />
                            )}
                        </span>
                    </div>
                    <div className='ml-[10vw] flex items-center'>
                        <label className="block font-bold text-[20px] ml-[-10vw]">Satisfied with:</label>
                        <div className=" flex gap-4 ml-4">
                            <span>
                                <input
                                    type="radio"
                                    value="Yes"
                                    name="satisfiedWithInfo"
                                    checked={formData.satisfiedWithInfo === 'Yes'}
                                    onChange={handleChange}
                                /> Yes
                            </span>
                            <span>
                                <input
                                    type="radio"
                                    value="no"
                                    name="satisfiedWithInfo"
                                    checked={formData.satisfiedWithInfo === 'no'}
                                    onChange={handleChange}
                                /> No
                            </span>
                        </div>
                    </div>
                </div>

                <button className='bg-green-400 px-5 py-2 text-bold rounded' onClick={() => {
                    handleSubmit()
                }}>Submit</button>
            </form>
        </div>
    );
}
export default Inquiries;