# Documentación de API - Users App

## Usuario

- **Obtener, actualizar, eliminar usuario**
  - Método: `GET`, `PUT`, `DELETE`
  - Ruta: `/user/`
  - Descripción: Obtener, actualizar o eliminar información del usuario.
  - Es necesario enviar el `Token de Autenticación` para cada una de estas peticiones.
  - Ruta: PUT -> `/user/` -> Buscar desde el frontend como enviar archivos en la ruta y de ser necesario información extra que desee actualizar el usuario (name, lastname, etc), formato JSON.

- **Registrar usuario (Sign Up)**
  - Método: `POST`
  - Ruta: `/user/sign-up/`
  - Descripción: Registrar un nuevo usuario en la plataforma.
  - Los datos se envian en formato JSON.

- **Iniciar sesión (Sign In)**
  - Método: `POST`
  - Ruta: `/user/sign-in/`
  - Descripción: Iniciar sesión en la plataforma.
  - Se debe enviar el `email` y la `password` en formato JSON.

- **Cerrar sesión (Sign Out)**
  - Método: `PUT`
  - Ruta: `/user/sign-out/`
  - Descripción: Cerrar la sesión actual del usuario.
  - Se debe enviar el `Token de Autenticación`

- **Verificar correo electrónico del usuario**
  - Método: `POST`
  - Ruta: `/user/set-email-verification/`
  - Descripción: Establecer la verificación del correo electrónico del usuario.
  - Se envía el `email` en formato JSON.

## Instructor

- **Convertirse en instructor**
  - Método: `PUT`
  - Ruta: `/user/be-an-instructor/`
  - Descripción: Solicitar convertirse en instructor en la plataforma.

- **Obtener perfil del instructor**
  - Método: `GET`
  - Ruta: `/user/get-instructor-profile/<str:name_lastname>/`
  - Descripción: Obtener el perfil de un instructor por nombre y apellido.

## Otros

- **Agregar último curso visto**
  - Método: `PUT`
  - Ruta: `/user/add-last-watched-course/`
  - Descripción: Agregar información sobre el último curso visto por el usuario.
  - Se debe enviar el `Token de Autenticación` y el JSON debe ser en este estilo.

  ```bash
  {
    # Nombre del curso que esta visualizando el usuario
    "name": "Curso de Programación Avanzada 1",
    "last_module_name": "2", # Nombre del ultimo modulo del curso visto
    "last_subtopic_name": "2", # Nombre del ultimo subtema del curso visto
    "last_subtopic_url": "/assets/" # URL del ultimo video visto
  }
  ```

- **Obtener último curso visto**
  - Método: `GET`
  - Ruta: `/user/get-last-watched-course/<str:course_name>/`
  - Descripción: Obtener información sobre el último curso visto por el usuario.
  - Se debe enviar el `Token de Autenticación` y se retorna un JSON con estos campos.

  ```bash
  {
    # Nombre del curso que esta visualizando el usuario
    "name": "Curso de Programación Avanzada 1",
    "last_module_name": "2", # Nombre del ultimo modulo del curso visto
    "last_subtopic_name": "2", # Nombre del ultimo subtema del curso visto
    "last_subtopic_url": "/assets/" # URL del ultimo video visto
  }
  ```

- **Verificar si está inscrito en un curso**
  - Método: `GET`
  - Ruta: `/user/is-enrolled-in-course/<str:course_name>/`
  - Descripción: Verificar si el usuario está inscrito en un curso específico.
  - Se debe enviar el `Token de Autenticación`, y el `nombre del curso`.
  - Retorna `True` si el usuario esta inscrito, caso contrario `Falso`.


# Documentación de API - Courses App

## Curso

- **Obtener, actualizar o eliminar un curso por ID**
  - Método: `POST, GET`, `PUT`, `DELETE`
  - Ruta: `/course/<int:id>/`
  - Descripción: Obtener, actualizar o eliminar información de un curso específico.
  - Ruta: POST -> `/course/`, aqui se debe averiguar como enviar videos o imagenes desde el frontend.
  - Los campos que tiene `Course` son: `name, description, category, instructor, modules, comments, assessment, trailer_video_url, course_image_url`.
  - El formato JSON debe ser:

  ```bash
  "name": "Curso de Programación Avanzada 4",
  "description": "Aprende programación avanzada con este curso",
  "category": "Fundamentos de programación",
  "instructor": "Jhosel Alexander Guillin Fierro",
  "modules": [
    {
      "title": "Módulo 1",
      "description": "Introducción a la programación avanzada",
      "content": [
        {
          "title": "Clases y Objetos",
          "video_url": "https://example.com/clases_y_objetos"
        },
        {
          "title": "Herencia",
          "video_url": "https://example.com/herencia"
        }
      ]
    },
    {
      "title": "Módulo 2",
      "description": "Estructuras de datos avanzadas",
      "content": [
        {
          "title": "Árboles binarios",
          "video_url": "https://example.com/arboles_binarios"
        },
        {
          "title": "Grafos",
          "video_url": "https://example.com/grafos"
        }
      ]
    }
  ],
  "comments": [
    {
      "student": "Maria Gómez",
      "title": "Excelente curso",
      "description": "Aprendí mucho, ¡gracias!",
      "date": "2023-12-01"
    },
    {
      "student": "Carlos Rodríguez",
      "title": "Recomendado",
      "description": "El curso es muy completo. Lo recomendaré a mis amigos.",
      "date": "2023-12-02"
    }
  ],
  "assessment": 2.5,
  "trailer_video_url": "/assets/coursesVideos/Facturacion_electronica_SRI.webm",
  "course_image_url": "/assets/coursesPhotos/Captura_de_pantalla_2023-03-04_223731.png"
  ```

  - Para los campos `trailer_video_url` y `course_image_url` se debe enviar el video y la imagen respectivamente.
  - Ruta: PUT -> `/course/`, se debe enviar en un JSON el `id` del curso y los campos que se desean actualizar, en el caso que se desee actualizar la foto del curso o el video trailer, se debe averiguar desde el frontend, como enviar.

## Cursos por Categoría

- **Obtener cursos por categoría**
  - Método: `GET`
  - Ruta: `/course/<str:category>/`
  - Descripción: Obtener una lista de cursos en una categoría específica.

## Cursos Destacados

- **Obtener cursos destacados**
  - Método: `GET`
  - Ruta: `/course/featured-courses/`
  - Descripción: Obtener una lista de cursos destacados basados en una calificación mayor o igual a 4.0.

## Cursos Recientemente Agregados

- **Obtener cursos recientemente agregados**
  - Método: `GET`
  - Ruta: `/course/recently-added-courses/`
  - Descripción: Obtener una lista de los últimos 3 cursos agregados, ordenados por fecha de agregado.

## Cursos por Instructor

- **Obtener cursos por instructor**
  - Método: `GET`
  - Ruta: `/course/courses-by-instructor/<str:instructor_name>/`
  - Descripción: Obtener una lista de cursos impartidos por un instructor específico.
  - Se debe enviar el nombre del instructor en la ruta.


# Documentación de API - Categories App

## Categoría

- **Obtener todas las categorías o crear una nueva categoría**
  - Método: `POST`, `GET`
  - Ruta: `/category/`
  - Descripción: Obtener todas las categorías disponibles o crear una nueva categoría.

- **Obtener, actualizar o eliminar una categoría por ID**
  - Método: `GET`, `PUT`, `DELETE`
  - Ruta: `/category/<int:id>/`
  - Descripción: Obtener, actualizar o eliminar información de una categoría específica.

- **Obtener el ID de la categoría por el nombre**
  - Método: `GET`
  - Ruta: `/category/<str:category_name>/`
  - Descripción: Obtener el ID de la categoría utilizando el nombre de la categoría.


**Nota:** Esta documentación está sujeta a cambios a medida que evoluciona la API.