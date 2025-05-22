import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Servicios from "../service/service";

export const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await Servicios.login(form);
            localStorage.setItem('token', data.token)
            navigate("/private");
        } catch {
            ("Invalid credentials, please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-50 mx-auto mt-5">
            <h2>Login</h2>

            <div className="mb-3">
                <input type="email" name="email" id="email" placeholder="Email" className="form-control" value={form.email} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <input type="password" name="password" placeholder="Password" id="password" className="form-control" value={form.password} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
};
