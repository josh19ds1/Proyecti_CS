const express = require('express');
const router = express.Router();
const conexion = require('./database/db');

let crro = null;
let enc = 0;

router.get('/', (req, res) => {
    conexion.query('SELECT * FROM usuarios', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('index.ejs', { results: results });
        }
    })
})

router.get('/create', (req, res) => {
    res.render('create');
})

router.get('/edit/:id', (req, res) => {
    const id_cliente = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE id_cliente=?', [id_cliente], (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('edit.ejs', { usuarios: results[0] });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    const id_cliente = req.params.id;
    conexion.query('DELETE FROM usuarios WHERE id_cliente = ?', [id_cliente], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/');
        }
    })
});

//Aqui si no pones en donde lo mandas res.redirect <- "/encuesta" no manda el  codigo 
router.get('/encuesta', (req, res) => {
 
    conexion.query('Select preguntas.id_preguntas, preguntas.preguntas, categoria.Categorias from preguntas join categoria ON preguntas.id_Categoria = categoria.id_Categoria', (error, results) => {
        if (error) {
            throw error;
        } else {
           // console.log(results); // Agrega esto para verificar los resultados
            res.render('formulario.ejs', { results: results });
        }
    });
    
})

//Aqui si no pones en donde lo mandas res.redirect <- "/encuesta" no manda el  codigo 
router.get('/Resultado', (req, res) => {

    conexion.query('SELECT respuesta.id_Respuesta,respuesta.respuesta,respuesta.comentario,preguntas.preguntas,preguntas.id_Categoria,categoria.Categorias,subcategoria.SubCategorias,respuesta.Res_correo FROM respuesta JOIN preguntas ON preguntas.id_preguntas = respuesta.Res_pregunta JOIN encuesta ON encuesta.id_Encuesta = respuesta.Res_encuesta JOIN categoria on preguntas.id_Categoria = categoria.id_Categoria JOIN subcategoria ON preguntas.id_SubCategorias = subcategoria.id_SubCategorias WHERE respuesta.Res_correo=?',[crro], (error, results) => {
        if (error) {
            throw error;
        } else {
           // console.log(results); // Agrega esto para verificar los resultados
            res.render('Resultado.ejs', { results: results });
        }
    });
    
})




router.post('/guardar_respuestas', (req, res) => {
    const respuestas = req.body; // Obtiene todas las respuestas del formulario

    // Recorre las respuestas y guárdalas en la base de datos
    for (const key in respuestas) {
        
        if (key.startsWith('respuesta_')) {
            const preguntaId = key.replace('respuesta_', ''); // Obtiene el ID de la pregunta
            const valorRespuesta = respuestas[key]; // Obtiene el valor de la respuesta (e.g., 1, 2, 3, 4, 5 o ND)

            // Verifica si se proporcionó un comentario para esta pregunta
            const comentario = respuestas[`comentario_${preguntaId}`];

            // Define el query de inserción
            const query = 'INSERT INTO respuesta (respuesta,comentario,Res_pregunta,Res_correo,Res_encuesta) VALUES (?, ?, ?, ?,?)';

            // Ejecuta el query con los datos
            conexion.query(query, [valorRespuesta, comentario, preguntaId, crro,enc], (error, result) => {
                if (error) {
                    console.error('Error al insertar datos en la base de datos: ' + error.message);
                    res.status(500).send('Error al insertar datos en la base de datos');
                } else {
                    console.log('Datos insertados correctamente');
                }
            });
        }
    }   
   
    res.redirect('/Resultado'); // Redirige al usuario a una página de confirmación
});



router.post('/encuesta', (req, res) => {
     
      const { nombreSoftware, tipoSoftware, fechaProgramada, tecnologiaProgramada } = req.body;

    // El valor de tipoSoftware se obtendrá como un valor numérico según las opciones seleccionadas en el formulario.
    if (crro == null) {
        console.log("errores en el correo");

    } else {
      enc++;
        // Asumiendo que tienes una tabla llamada 'Software' en tu base de datos con las columnas adecuadas.
        const softwareData = {
            Nombre_Enc: nombreSoftware,
            fecha: fechaProgramada,
            Tec_Programada	: tecnologiaProgramada,
            Cr_usuario: crro,
            Enc_software: tipoSoftware,
        };

        // Realiza la inserción de datos en la base de datos
        conexion.query('INSERT INTO encuesta SET ?', softwareData, (error, result) => {
            if (error) {
                console.error('Error al insertar datos:', error);
                res.status(500).send('Error al insertar datos en la base de datos');
            } else {
                console.log('Datos insertados correctamente');
                // Redirige a la página principal u otra página de tu elección.
                res.redirect('/encuesta');
            }
        });

    }   
 //  res.redirect('/encuesta'); 

});


// Agrega una ruta POST para manejar la consulta
router.post('/Consulta', (req, res) => {
    const correo = req.body.correo;
    const contraseña = req.body.contraseña;
    crro = correo;
    // Realiza la consulta en la base de datos
    conexion.query(
        'SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?',
        [correo, contraseña],
        (error, results) => {
            if (error) {
                console.log(error);
                // Manejo de errores: muestra un mensaje de error o redirige a la página de inicio de sesión
                res.redirect('/login?error=1'); // Agrega un parámetro de error en la redirección
            } else {
                if (results.length > 0) {
                    // Se encontró un usuario con el correo y contraseña proporcionados
                    // Puedes redirigir al usuario a una página de inicio de sesión exitosa
                    res.render('login');
                } else {
                    // No se encontró un usuario con el correo y contraseña proporcionados
                    // Puedes mostrar un mensaje de error al usuario o redirigir a la página de inicio de sesión
                    res.redirect('/login?error=2'); // Agrega un parámetro de error en la redirección
                }
            }
        }
    );
});









const crud = require('./controllers/crud');

router.post('/save', crud.save);
router.post('/update', crud.update);


module.exports = router;