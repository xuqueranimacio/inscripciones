"use server"
import { createClient } from "@libsql/client"
import { hash, compare } from "bcrypt";

const client = createClient({
    url: process.env.DB_URL,
    authToken: process.env.DB_KEY,
});

export async function loginCliente(mail, contrasena) {

    try {
        // Consulta SQL para obtener el usuario por correo
        const result = await client.execute(`
            SELECT * FROM users WHERE mail = ?;
        `, [mail]);

        // Si no se encuentra al usuario
        if (result.length === 0) {
            return { success: false, error: "Usuario no encontrado" };
        }

        const user = result.rows[0];

        // Verificar la contraseña usando bcrypt
        const passwordMatch = await compare(contrasena, user.password);

        if (passwordMatch) {
            return { 
                success: true, 
                user_id: user.user_id,
                nombre: user.nombre,
            };
        } else {
            return { success: false, error: "Contraseña incorrecta" };
        }
    } catch (error) {
        console.error('Error al verificar las credenciales:', error);
        return { 
            success: false, 
            error: error.message 
        };
    }
}


export async function registroCliente(clienteData) {
    // Extrae la información del cliente desde el objeto recibido (clienteData)
    const { nombre, apellidos, correo, telefono, password } = clienteData;

    // Generar un ID único para el usuario (usando UUID)
    const user_id = crypto.randomUUID();
    const safePassword = await hash(password, 10);

    try {
        // Consulta SQL para insertar un nuevo cliente en la base de datos
        const result = await client.execute(`
            INSERT INTO users (user_id, nombre, apellido1, mail, phone, password)
            VALUES (?, ?, ?, ?, ?, ?);
        `, [user_id, nombre, apellidos, correo, telefono, safePassword]);

        // Si la consulta es exitosa, devuelve el ID del nuevo cliente
        return { success: true, user_id };
    } catch (error) {
        // Manejo de errores si algo sale mal con la consulta
        console.error('Error al registrar cliente:', error);
        return { success: false, error: error.message };
    }
}

export async function requestActividades(){
    try {
        const result = await client.execute(`
            SELECT * FROM actividades;
        `);

        // Asegúrate de transformar cada fila en un objeto plano
        const actividades = result.rows.map(row => ({ ...row }));

        return { success: true, actividades };

        return actividades;
    } catch (error) {
        console.error('Error al consultar actividades:', error);
        return { success: false, error: error.message };
    }
}

export async function requestActividad(id) {
    try {
        const result = await client.execute(`
            SELECT * FROM actividades WHERE id = ?;
        `, [id]);

        // Asegúrate de transformar cada fila en un objeto plano
        const actividad = result.rows.length > 0 ? { ...result.rows[0] } : null;
        return { success: true, actividad };

    } catch (error) {
        console.error('Error al consultar actividad:', error);
        return { success: false, error: error.message };
    }
}

export async function crearActividad(actividadData){

    console.log("Creando actividad:", actividadData);

    const actividad_id = crypto.randomUUID();

    try {
        const result = await client.execute(`
            INSERT INTO actividades (id, nombre, descripcion, fecha_inicio, fecha_fin, imagen, tipoimagen)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `, [actividad_id, actividadData.nombre, actividadData.descripcion, actividadData.fecha_inicio, actividadData.fecha_fin, actividadData.imagen, actividadData.tipo_imagen]);

        return { success: true};
    } catch (error) {
        console.error('Error al crear actividad:', error);
        return { success: false, error: error.message };
    }
}