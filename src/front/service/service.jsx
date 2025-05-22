const Servicios = {};
const backendUrl = import.meta.env.VITE_BACKEND_URL;

Servicios.registro = async (formData) => {
  try {
    const resp = await fetch(backendUrl + "/api/registro", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (!resp.ok) throw Error("something went wrong");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
Servicios.logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

Servicios.login = async (formData) => {
  try {
    const resp = await fetch(backendUrl + "/api/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (!resp.ok) throw Error("something went wrong");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

Servicios.getUserInfo = async () => {
  try {
    const token = localStorage.getItem('token');
    const resp = await fetch(backendUrl + "/api/private", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    });
    if (!resp.ok) throw Error("something went wrong");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default Servicios;