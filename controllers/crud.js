//Invocamos a la conexion de la DB
const conexion = require('../database/db');
//GUARDAR un REGISTRO
exports.save = (req, res) => {
    const nm_software = req.body.nm_software;
    const tipo_software = req.body.tipo_software;
    const tecnologia = req.body.tecnologia;
    const fecha = req.body.fecha;
    
    conexion.query('INSERT INTO software SET ?', { nm_software: nm_software, tipo_software: tipo_software, tecnologia: tecnologia, fecha: fecha }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            //console.log(results);   
            res.redirect('/');         
        }
    });
};

//ACTUALIZAR un REGISTRO
exports.update = (req, res)=>{
    const id = req.body.id;
    const nombreS = req.body.nombre;
    const apellidoS = req.body.apellido;
    const emailS = req.body.email;
    const cedulaS = req.body.cedula;
    conexion.query('UPDATE usuarios SET ? WHERE id_cliente = ?',[{nombre:nombreS, apellido:apellidoS, email:emailS, cedula:cedulaS}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
});
};

//consulta
exports.Consulta = (req, res) => {
    const correo = req.body.correo;
    const contraseña = req.body.contraseña;

    // Aquí se realiza la consulta SQL para buscar un usuario con el correo y contraseña proporcionados
    conexion.query(
        'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?',
        [correo, contraseña],
        (error, results) => {
            if (error) {
                console.log(error);
                // Manejo de errores, por ejemplo, mostrar un mensaje de error al usuario
            } else {
                if (results.length > 0) {
                    // Se encontró un usuario con el correo y contraseña proporcionados
                    // Puedes redirigir al usuario a una página de inicio de sesión exitosa
                    res.redirect('/dashboard');
                } else {
                    // No se encontró un usuario con el correo y contraseña proporcionados
                    // Puedes mostrar un mensaje de error al usuario o redirigir a la página de inicio de sesión
                    res.redirect('/login');
                }
            }
        }
    );
};