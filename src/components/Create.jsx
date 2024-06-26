import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Toast } from "react-bootstrap";
import BASE_URL from "./ApiUrl";

function Create() {

    // const [name, setName] = useState('');
    // const [age, setAge] = useState('');
    // const [email, setEmail] = useState('');

    const [formData,setFormData] = useState({
        name:'',
        age:'',
        email:'',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,age,email} = formData;

        if (!name || !age || !email) {
            setErrorMessage("All fields are required.");
            setShowToast(true);
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/crud`, formData);
            console.log("Data sent successfully:", response.data);
            setSuccessMessage("Data saved successfully.");
            setShowToast(true);
            // Clear form fields after successful submission
            setFormData({
                name:'',
                age:'',
                email:'',
            });
            setErrorMessage('');
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row">
                <div className="col-md-12">
                    <div className="bg-info p-4 text-center">
                        <h1>Create Form</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="Name">Enter Name: </label>
                            <input type="text" placeholder="Name" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Age">Enter Age: </label>
                            <input type="text" placeholder="Age" className="form-control" name="age" value={formData.age} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email">Enter Email: </label>
                            <input type="text" placeholder="Email" className="form-control" name="email" value={formData.email} onChange={handleChange}required  />
                        </div>
                        <br />
                        <div className="d-grid">
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </div>
                        <div>
                            <Link to="/GetData">Go to DataTable</Link>
                        </div>
                    </form>
                    <Toast show={showToast} onClose={() => setShowToast(false)} className="position-fixed bottom-0 end-0 m-3" autohide>
                        <Toast.Header>
                            <strong className="me-auto">{successMessage ? "Success" : "Error"}</strong>
                        </Toast.Header>
                        <Toast.Body>{successMessage ? successMessage : errorMessage}</Toast.Body>
                    </Toast>
                </div>
            </div>
        </div>
    );
}

export default Create;
