Aplicación red social tipo twitter con Nodejs, Express y PostgreSQL.
Internamente utiliza el patron MVC aplicado a express.

# Carácteristicas de la aplicación

1. login y registro, modificar cuentas y borrarlas.
2. Ver perfiles de los usuarios, su bio y los post que tienen asociados.
3. Crear posts, modificarlos y borrarlos
4. Crear respuestas a los posts y navegar al perfil de quien lo ha escrito

# Que quiero añadirle en el futuro

1. Dar mas opciones al publicar un post, añadir imagenes/videos, enlaces y likes.
2. Hacer que los comentarios sean subposts.
3. Permitir añadir amigos y enviar mensajes en tiempo real

# Muestra de la aplicación en Video:

[Ver video](https://youtu.be/nqhxEBBq-og)

# Como instalar

- **Requisitos previos**: tener NPM y postgresql instalados

1. Clonar o Descargar el repositorio
2. Ejecuta el comando "npm install"
3. Crear el fichero **.env** con estas varibles **según tu instalación de postgresql**

```
PGuser=<usuario de postgres>
PGhost=<host de postgres>
PGdatabase=express_red_social
PGpassword=<contraseña de postgre
PGport=<puerto de postgres>
APPport=<puerto en el que correra la app en mi caso el puerto 3000>
```

4. Importa la base de datos "express_red_social" dentro de postgres con el script en "database/express_red_social.sql"
5. Ejecuta el comando "npm start" y si esta todo bien, la aplicacion se lanzara en `http://localhost:<APPport>/` o en `http://localhost:3000/`
