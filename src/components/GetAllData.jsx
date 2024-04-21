import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import BASE_URL from "./ApiUrl";
import useFetchData from './ApiDataFetch'
import axios from "axios";

function GetData() {

    

    const { data, loading, error } = useFetchData(`${BASE_URL}/crud`);
    const [editingIndex, setEditingIndex] = useState(null); // Track which row is being edited
    const [EditData, setEditData] = useState([]);

    //const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${BASE_URL}/crud`);
    //             setData(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

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
            const response = await axios.put(`${BASE_URL}/crud/${data[index].id}`,EditData[index]);
            // Assuming the server returns the updated data, you can update the state
            // const updatedData = [...data];
            // updatedData[index] = response.data;
            // setData(updatedData);
            toggleEditing(null); // Exit edit mode
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    return (
        <div className="container">
            <h1>User Information</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
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
                        {data.map((item, index) => (
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
            )}
        </div>
    );
}

export default GetData;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import BASE_URL from "./BaseUrl";

// function GetData() {
    
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Function to fetch data from API
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/crud`);
//                 setData(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setLoading(false);
//             }
//         };

//         fetchData(); // Call the function to fetch data when the component mounts
//     }, []);


//     useEffect(() => {
//         const fatchData = async () => {
//             try {
//                 const response = await axios.get(`${BASE_URL}/crud`);
//                 setData(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data: ", error);
//                 setLoading(false);
//             }
//         };
//         fatchData();
//     }, []);

//     return (
//         <div className="container">
//             <h1>User Information</h1>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Name</th>
//                             <th>Age</th>
//                             <th>Email</th>
//                         </tr>
//                     </thead>
//                     <tbody>
                        
//                         {data.map((item, index) => (
//                             <tr key={index}>
//                                 <td>{index+1}</td>
//                                 <td>{item.name}</td>
//                                 <td>{item.age}</td>
//                                 <td>{item.email}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }

// export default GetData;
