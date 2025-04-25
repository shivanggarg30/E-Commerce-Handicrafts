import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer, Navbar } from "../components";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import initializeFirebase from "../utils/FirebaseInit"; // Firebase import commented

const Register = () => {
    // const { auth, db } = initializeFirebase(); // Firebase initialization commented

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Firebase functionality commented
            // const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            // const user = userCredential.user;

            // await setDoc(doc(db, "users", user.uid), {
            //     name: formData.name,
            //     email: formData.email,
            //     role: formData.role,
            //     createdAt: new Date().toISOString()
            // });

            alert('Registration Successful! (Simulated)');
            navigate('/login');
        } catch (err) {
            // if (err.code === 'auth/email-already-in-use') {
            //     setError('This email has already been registered');
            // } else {
            //     setError(err.message);
            // }
            setError("Simulated error. Firebase is disabled.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Enter Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form my-3">
                                <label htmlFor="role">Role</label>
                                <select
                                    id="role"
                                    className="form-select"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="user">User</option>
                                    <option value="seller">Seller</option>
                                </select>
                            </div>
                            <div className="my-3">
                                <p>Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button
                                    className="my-2 mx-auto btn btn-dark"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Registering..." : "Register"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;
