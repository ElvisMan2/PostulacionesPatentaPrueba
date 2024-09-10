//registro
const register = (req, res) => {
    console.log('Datos recibidos:', req.body);
    const { usuario, contrasena, nombre_completo, email } = req.body;
    
    const query = 'INSERT INTO usuarios (usuario, contrasena, nombre_completo, email) VALUES (?, ?, ?, ?)';

    db.query(query, [usuario, contrasena, nombre_completo, email], (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err);  // Log del error en el servidor
            return res.status(500).json({ success: false, message: 'Error en el servidor' });  // Enviar un JSON en caso de error
        }
        res.json({ success: true });
    });
}


//login
const login=(req, res) => {
    const { usuario, contrasena } = req.body;
    const query = 'SELECT * FROM usuarios WHERE usuario = ?';

    db.query(query, [usuario], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const user = result[0];
            if (user.contrasena === contrasena) { // Generar el JWT usando la misma clave secreta
                const token = jwt.sign({ id: user.id, usuario: user.usuario }, secretKey, {//JWT
                    expiresIn: '1h',  // Token válido por 1 hora
                });
                return res.json({ success: true, token });
            } else {
                return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
            }
        } else {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
    });
}

module.exports = {
    register,
    login,
};