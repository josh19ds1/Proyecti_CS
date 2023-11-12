# Proyecti_CS


Base de datos para probar


create database DB_calidad

-- Crear la tabla Usuarios
CREATE TABLE Usuarios (
    correo VARCHAR(30) PRIMARY KEY,
    nombre VARCHAR(35),
    contraseña VARCHAR(12),
    ocupacion TEXT
);


-- Crear la tabla Categoria
CREATE TABLE Categoria (
    id_Categoria INT AUTO_INCREMENT PRIMARY KEY,
    Categorias VARCHAR(75)
);

-- Crear la tabla Subcategoria
CREATE TABLE Subcategoria (
    id_SubCategorias INT AUTO_INCREMENT PRIMARY KEY,
    SubCategorias VARCHAR(75)
);

-- Crear la tabla de tipo de software
CREATE TABLE Tip_Software (
    id_Tip_Software INT AUTO_INCREMENT PRIMARY KEY,
    Ti_software VARCHAR(75)
);




-- Crear la tabla Preguntas con llaves foráneas
CREATE TABLE respuesta (
    id_Respuesta INT AUTO_INCREMENT PRIMARY KEY,
    respuesta varchar(20),
    comentario text,
    Res_pregunta int,
    Res_correo   VARCHAR(30),
    Res_encuesta int,
    FOREIGN KEY (Res_pregunta) REFERENCES preguntas(id_preguntas),
    FOREIGN KEY (Res_correo)   REFERENCES usuarios(correo),
    FOREIGN KEY (Res_encuesta) REFERENCES encuesta(id_Encuesta)
);



-- Crear la tabla Preguntas con llaves foráneas
CREATE TABLE Preguntas (
    id_preguntas INT AUTO_INCREMENT PRIMARY KEY,
    preguntas VARCHAR(300),
    id_Categoria INT,
    id_SubCategorias INT,
    FOREIGN KEY (id_Categoria) REFERENCES Categoria(id_Categoria),
    FOREIGN KEY (id_SubCategorias) REFERENCES Subcategoria(id_SubCategorias)
);



CREATE TABLE Encuesta (
 id_Encuesta INT AUTO_INCREMENT PRIMARY KEY,
 Nombre_Enc varchar(30),
 fecha varchar(10),
 Tec_Programada varchar(30),
 Cr_usuario varchar(30),
 Enc_software int,
 FOREIGN KEY (Cr_usuario) REFERENCES Usuarios(correo),
 FOREIGN KEY (Enc_software) REFERENCES Tip_Software(id_Tip_Software)


);
------------------------------------------------------------------------------------------------------
INSERT INTO tip_software(Ti_Software) VALUES
("Académico"),
("Investigativo"),
("Bancario"),
("Comercial");


INSERT INTO categoria(Categorias) VALUES
('Adecuación Funcional'),
('Eficiencia de desempeño'),
('Compatibilidad'),
('Usabilidad'),
('Fiabilidad'),
('Seguridad'),
('Mantenibilidad'),
('Portabilidad');

INSERT INTO usuarios (correo, nombre, contraseña, ocupacion) VALUES
('brown.brown@gmail.com', 'Alphonzo', '1234', 'Ingeniero en sistemas'),
('jose_jopse@gmail.com', 'Gonzales', '1234', 'Desarrollo tecnico en enfasis de calidad'),
('Bairon015@gmail.com', 'Camano', '1234', 'Ingeniero Tecnico'),
('prueba1@correo.com', 'Juan Perez', '1234', 'Ingeniero de software');



INSERT INTO subcategoria(SubCategorias) VALUES
('Completitud Funcional'),
('Corrección Funcional'),
('Pertinencia Funcional'),
('Comportamiento temporal'),
('Utilización de recursos'),
('Capacidad'),
('Coexistencia'),
('Interoperabilidad'),
('Reconocibilidad de la adecuación'),
('Aprendizabilidad:'),
('Operabilidad'),
('Protección contra errores de usuario'),
('Estética de la interfaz de usuario'),
('Accesibilidad'),
('Madurez'),
('Disponibilidad'),
('Tolerancia a fallos'),
('Capacidad de recuperación'),
('Confidencialidad'),
('Integridad'),
('No repudio'),
('Responsabilidad'),
('Autenticidad'),
('Modularidad'),
('Reusabilidad'),
('Analizabilidad'),
('Capacidad para ser modificado'),
('Capacidad para ser probado'),
('Adaptabilidad'),
('Capacidad para ser instalado'),
('Capacidad para ser reemplazado');


-- Insertar preguntas en la tabla Pregunta
INSERT INTO preguntas (preguntas,id_Categoria,id_SubCategorias) VALUES
    ('¿El software cumple con todas las funciones especificadas en los requisitos, sin omisiones importantes?',1,1),
    ('¿Existen características críticas que no se encuentran implementadas en el software?',1,1),
    ('¿El software produce resultados correctos y precisos en todas las situaciones de prueba?',1,2),
    ('¿Se han identificado errores graves en el funcionamiento del software que afecten su corrección funcional?',1,2),
    ('¿Las funciones proporcionadas por el software son relevantes y satisfacen las necesidades de los usuarios?',1,3),
    ('¿Existen características que se consideran innecesarias o poco relevantes para el propósito del software?',1,3),
    ('¿El software responde de manera rápida y eficiente a las solicitudes del usuario?',2,4),
    ('¿Se ha identificado un rendimiento deficiente en términos de tiempos de respuesta en situaciones específicas?',2,4),
    ('¿El software utiliza eficientemente los recursos del sistema, como CPU, memoria y almacenamiento?',2,5),
    ('¿Se han observado problemas de consumo excesivo de recursos que puedan afectar el rendimiento general del sistema?',2,5),
    ('¿El software es capaz de manejar grandes volúmenes de datos o usuarios concurrentes según las especificaciones?',2,6),
    ('¿Se han producido fallos o caídas del sistema debido a una capacidad insuficiente en momentos de carga alta?',2,6),
    ('¿El software puede coexistir sin conflictos con otros programas en el mismo entorno de ejecución?',3,7),
    ('¿Se han detectado problemas de compatibilidad con otras aplicaciones o bibliotecas?',3,7),
    ('¿El software es capaz de interactuar eficazmente con sistemas externos, intercambiando datos y comunicándose de manera efectiva?',3,8),
    ('¿Se han experimentado dificultades en la integración con otros sistemas o en la comunicación con ellos?',3,8),
    ('¿Los usuarios pueden reconocer fácilmente las funciones y características del software?',4,9),
    ('¿El diseño de la interfaz de usuario facilita la identificación de las opciones y acciones disponibles?',4,9),
    ('¿Los usuarios pueden aprender a utilizar el software de manera rápida y sin necesidad de una capacitación extensa?',4,10),
    ('¿Existen obstáculos en la curva de aprendizaje que dificultan la adopción del software por parte de nuevos usuarios?',4,10),
    ('¿Es fácil para los usuarios operar el software y realizar las tareas deseadas?',4,11),
    ('¿Cuán cómodo se siente al interactuar con la interfaz de usuario de este software?',4,11),
    ('¿El software evita o minimiza los errores cometidos por los usuarios?',4,12),
    ('¿Cuán confiado se siente al usar este software sin cometer errores importantes?',4,12),
    ('¿La interfaz de usuario del software es atractiva y visualmente agradable?',4,13),
    ('¿Cuán ordenada y clara percibe la disposición de elementos en la interfaz de usuario de este software?',4,13),
    ('¿El software es accesible para personas con discapacidades, como problemas de visión o audición?',4,14),
    ('¿Cuán bien se adhiere este software a las normativas y estándares de accesibilidad para garantizar que todos los usuarios tengan igualdad de oportunidades de uso?',4,14),
    ('¿El software ha demostrado ser estable y libre de defectos críticos durante un período prolongado de uso?',5,15),
    ('¿Se han identificado problemas de estabilidad o confiabilidad en versiones anteriores?',5,15),
    ('¿El software está disponible y accesible cuando los usuarios lo necesitan?',5,16),
    ('¿Se han producido interrupciones inesperadas del servicio que afecten la disponibilidad del software?',5,16),
    ('¿El software puede continuar funcionando correctamente en caso de errores o fallas menores?',5,17),
    ('¿Cuán confiado se siente en la capacidad de este software para manejar situaciones inesperadas o errores sin bloquearse o generar resultados incorrectos?',5,17),
    ('¿El software puede recuperarse rápidamente y sin pérdida de datos en caso de errores o fallas graves?',5,18),
    ('¿Cuán autónoma es la capacidad de este software para recuperarse de errores sin requerir mucha interacción por parte del usuario?',5,18),
    ('¿El software protege adecuadamente la información confidencial de los usuarios?',6,19),
    ('¿Se han producido violaciones de la confidencialidad de los datos debido a vulnerabilidades de seguridad?',6,19),
    ('¿El software garantiza la integridad de los datos y evita su alteración no autorizada?',6,20),
    ('¿Se han detectado incidentes de corrupción de datos debido a deficiencias en la integridad?',6,20),
    ('¿El software proporciona pruebas de que las acciones realizadas por los usuarios son auténticas y no pueden ser negadas?',6,21),
    ('¿Cuán difícil sería para un usuario o entidad negar su participación en una acción o comunicación realizada a través de este software?',6,21),
    ('¿El software permite rastrear y atribuir acciones específicas a usuarios individuales?',6,22),
    ('¿Cuán transparente es el registro de acciones y la presentación de información sobre la responsabilidad en este software?',6,22),
    ('¿El software garantiza que los usuarios sean quienes dicen ser y que no se hagan pasar por otros?',6,23),
    ('¿Cuán seguro se siente que este software verifica la autenticidad de los usuarios y sistemas de manera efectiva?',6,23),
    ('¿El software se ha diseñado de manera modular para facilitar la incorporación de nuevas funcionalidades o la corrección de errores?',7,24),
    ('¿Las modificaciones en una parte del software afectan negativamente a otras partes, dificultando la mantenibilidad?',7,24),
    ('¿El código del software es reutilizable en otros proyectos o contextos?',7,25),
    ('¿Se han identificado limitaciones en la reusabilidad del código debido a dependencias o acoplamiento excesivo?',7,25),
    ('¿El software es fácil de analizar y comprender, lo que facilita la identificación y corrección de errores?',7,26),
    ('¿Cuán completo percibe que es el registro y la documentación de eventos y actividades en este software para fines de análisis posterior?',7,26),
    ('¿El software puede ser modificado de manera eficiente para adaptarse a nuevos requisitos o corregir errores?',7,27),
    ('¿cuán sencillo es para su equipo realizar cambios o actualizaciones en este software para adaptarlo a nuevas necesidades o requisitos?',7,27),
    ('¿El software se puede probar de manera efectiva para garantizar su calidad y funcionamiento correcto?',7,28),
    ('¿cuán sencillo es para su equipo realizar pruebas de calidad en este software para identificar posibles defectos o problemas?',7,28),
    ('¿El software es adaptable a diferentes entornos de hardware y sistemas operativos?',8,29),
    ('¿Existen restricciones significativas que limiten la adaptabilidad del software a diversas plataformas?',8,29),
    ('¿La instalación del software en diferentes entornos es sencilla y bien documentada?',8,30),
    ('¿Se han reportado problemas frecuentes durante el proceso de instalación en diversos sistemas?',8,30),
    ('¿El software se puede reemplazar por una versión más nueva o por otro software sin causar interrupciones significativas en las operaciones?',8,31),
    ('¿cuán costoso considera que sería el proceso de reemplazo de este software por una alternativa?',8,31);


Select * from preguntas join categoria ON preguntas.id_preguntas = categoria.id_Categoria JOIN subcategoria ON preguntas.id_SubCategorias = subcategoria.id_SubCategorias;
