import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Servicios from "../service/service";

export const Private = () => {
    const [userInfo, setUserInfo] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const data = await Servicios.getUserInfo();
                setUserInfo(data);
            } catch {
                ;
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        Servicios.logout();
        navigate("/");
    };

    return (
        <div className="w-50 mx-auto mt-5">
            <h2>Perfil privado</h2>
            <p>Bienvenido usuario registrado</p>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
    );
};
