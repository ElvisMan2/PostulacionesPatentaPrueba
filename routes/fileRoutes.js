(req, res) => {
    const query = 'SELECT * FROM postulaciones';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al obtener los datos' });
        }
        res.json({ success: true, data: results });
    });
}