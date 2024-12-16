export async function sesionUsuario(id, nombre){
    localStorage.setItem("user_id", id);
    localStorage.setItem("nombre", nombre);
}

export async function verificarSesion(){
    const user_id = localStorage.getItem("user_id");
    const nombre = localStorage.getItem("nombre");

    if(user_id && nombre){
        return true;
    }
    return false;
}