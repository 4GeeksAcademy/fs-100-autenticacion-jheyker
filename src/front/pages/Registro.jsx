import { useState } from "react";
import Servicios from "../service/service";
import { useNavigate } from "react-router-dom";

export const Registro = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Servicios.registro(form);
            setForm({ email: "", password: "" });
            navigate("/login")
        } catch {
            ("Registro fallido");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-50 mx-auto mt-5">
            <h2>Registro</h2>

            <div className="mb-3">
                <input type="email" name="email" id="email" placeholder="Email" className="form-control" value={form.email} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <input type="password" name="password" placeholder="Password" id="password" className="form-control" value={form.password} onChange={handleChange} required minLength={6} />
            </div>

            <button type="submit" className="btn btn-primary">Registro</button>
        </form>
    );
};
