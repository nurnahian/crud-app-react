import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import BASE_URL from "./ApiUrl";
import useFetchData from './ApiDataFetch'
import axios from "axios";

function GetData() {
    const { data, loading, error } = useFetchData(`${BASE_URL}/crud`);
    const [editingIndex, setEditingIndex] = useState(null); // Track which row is being edited
    const [EditData, setEditData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Default page size

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handleEdit = (index, field, value) => {
        const updatedData = [...data];
        updatedData[index][field] = value;
        setEditData(updatedData);
    };

    const toggleEditing = (index) => {
        setEditingIndex(index === editingIndex ? null : index);
    };

    const saveChanges = async (index) => {
        try {
            const response = await axios.put(`${BASE_URL}/crud/${data[index].id}`, EditData[index]);
            toggleEditing(null);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePageSizeChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to first page when page size changes
    };

    return (
        <div className="container">
            <h1>User Information</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {editingIndex === index ? (
                                            <input
                                                type="text"
                                                value={item.name}
                                                onChange={(e) =>
                                                    handleEdit(index, "name", e.target.value)
                                                }
                                            />
                                        ) : (
                                            item.name
                                        )}
                                    </td>
                                    <td>
                                        {editingIndex === index ? (
                                            <input
                                                type="number"
                                                value={item.age}
                                                onChange={(e) =>
                                                    handleEdit(index, "age", e.target.value)
                                                }
                                            />
                                        ) : (
                                            item.age
                                        )}
                                    </td>
                                    <td>
                                        {editingIndex === index ? (
                                            <input
                                                type="email"
                                                value={item.email}
                                                onChange={(e) =>
                                                    handleEdit(index, "email", e.target.value)
                                                }
                                            />
                                        ) : (
                                            item.email
                                        )}
                                    </td>
                                    <td>
                                        {editingIndex === index ? (
                                            <button onClick={() => saveChanges(index)}><i className="bi bi-floppy2-fill"></i></button>
                                        ) : (
                                            <button onClick={() => toggleEditing(index)}><i className="bi bi-pencil-square"></i></button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="row mb-3">
                        <div className="col-md-1">
                            <label htmlFor="pageSize" className="form-label">Page Size:</label>
                            <select id="pageSize" className="form-select" value={itemsPerPage} onChange={handlePageSizeChange}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                    </div>
                    <Pagination

                        itemsPerPage={itemsPerPage}
                        totalItems={data.length}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                </>
            )}
        </div>
    );
}

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className={number === currentPage ? 'page-item active' : 'page-item'}>
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default GetData;
