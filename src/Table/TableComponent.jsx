import React from 'react';
import { Link } from 'react-router-dom';
import './SimpleTable.css'; // Import your CSS file

const SimpleTable = ({ tableHeaders, studentData, enquiryData }) => {
    return (
        <div>
            {/* Student Data Table */}
            {studentData && studentData.length > 0 && (
                <table border="1" style={{ width: '50%', margin: 'auto', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            {tableHeaders.map((header, index) => (
                                <th className='table-header' key={`header-${index}`}>
                                    {header}
                                </th>
                            ))}
                            <th className='table-header'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.map((data, index) => (
                            <tr key={`student-${index}`}>
                                <td className='table-cell'>{data.name || '-'}</td>
                                <td className='table-cell'>{data.admissionNo || '-'}</td>
                                <td className='table-cell'>{data.type || '-'}</td>
                                <td className='table-cell'>{data.phone || '-'}</td>
                                <td className='table-cell'>{data.email || '-'}</td>
                                <td className='table-cell'>{data.class || '-'}</td>
                                <td className='table-cell'>{data.section || '-'}</td>
                                <td className='table-cell'>{data.rollNumber || '-'}</td>
                                <td className='table-cell'>{data.status || '-'}</td>
                                <td className='table-cell'>{data.fathersName || '-'}</td>
                                <td className='table-cell'>
                                    <button className="btn-view">View Details</button>
                                    <Link to={`/editDetails/${data.admissionNo}`}>
                                        <button className="btn-edit">Edit Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Enquiry Data Table */}
            {enquiryData && enquiryData.length > 0 && (
                <table border="1" style={{ width: '50%', margin: 'auto', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            {Object.keys(enquiryData[0]).map((key, index) => (
                                <th className='table-header' key={`enquiry-header-${index}`}>
                                    {key}
                                </th>
                            ))}
                            <th className='table-header'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiryData.map((row, index) => (
                            <tr key={`enquiry-${index}`}>
                                {Object.values(row).map((value, colIndex) => (
                                    <td className='table-cell' key={`enquiry-cell-${colIndex}`}>
                                        {value || '-'}
                                    </td>
                                ))}
                                <td className='table-cell'>
                                    <button className="btn-view">View Details</button>
                                    <Link to={`/editDetails/${row.admissionNo}`}>
                                        <button className="btn-edit">Edit Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SimpleTable;
