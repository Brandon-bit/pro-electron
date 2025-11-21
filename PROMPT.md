Necesito que me ayudes a implementar la funcionalidad real en este apartado, actualmente funciona con mock data, pero te explicare como deberia de funcionar y te pasare los endpoints necesarios para que puedas implementar los services, los composables, los types, las validations, los componentes que consideres necesarios, el store, etc. Puedes tomar los siguientes apartados como referencia ya que esos ya funcionan al 100%

Este apartado o modulo tendra una funcionalidad muy parecia a la de "Minutas"

Necesito que revises bien la implementacion de los modales, la forma correcta es la siguiente, como aqui se trabajaran 2 cruds distintos (Lecciones Aprendidas, Asistentes) cada uno tendra su componente de modal, y ya dependiendo de la accion se renderiza el cuerpo de ese modal, por ejemplo, supongamos que trabajamos con las lecciones aprendidas, los componentes serian los siguientes

- LessonModal -> Este es el modal principal que se encarga de abrir y cerrar los modales
- AddEditLessonForm -> Este es el cuerpo del formulario que se encarga de agregar y editar lecciones aprendidas
- DeleteLesson -> Este es el cuerpo que se encarga de mostrar el mensaje de confirmacion al usuario al eliminar lecciones aprendidas

Revisa las referencias que te indique para mayor contexto y todo el codigo generado debera de ser en ingles.

1.- El usuario entra a la vista y tendra cargado solamente el select con las opciones de los proyectos, para obtener las opciones esta el siguiente endpoint

* METODO: GET
* ENDPOINT: /gestion-de-proyectos/alta-de-proyecto/proyectos-opciones
* RESPONSE: 
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": [
        {
            "dni": "0260bdb91b980000",
            "label": "Desarrollo de aplicación móvil para clientes"
        },
        {
            "dni": "4e9cea5c0dcc0000",
            "label": "Implementación de nuevo sistema de gestión"
        },
        {
            "dni": "7b815196b16e0000",
            "label": "asdasdasdasdasd"
        },
        {
            "dni": "b338c2a39c3a0000",
            "label": "Implementación de nuevo sistema de gestión"
        },
        {
            "dni": "cec03fe1dc1d0000",
            "label": "Desarrollo de aplicación móvil para clientes"
        },
        {
            "dni": "d0ad5a2f67f90000",
            "label": "fadasdasd"
        },
        {
            "dni": "e342a111f7190000",
            "label": "asdasd"
        },
        {
            "dni": "f6674486e8600000",
            "label": "Desarrollo de aplicación móvil para clientes"
        }
    ]
}

2.- Una vez que el usuario seleccione la opcion se cargaran las lecciones aprendidas del proyecto, para obtener las lecciones aprendidas esta el siguiente endpoint, de esta misma response se tienen que sacar los datos para los indicadores que se encuentran en la tab de "Analisis de Tendencias"

* METODO: GET
* ENDPOINT: /gestion-de-proyectos/minutas/obtener-minutas?dniProyecto=0260bdb91b980000
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": [
        {
            "dni": "136c988a4fab0000",
            "dniProyecto": "0260bdb91b980000",
            "categoria": {
                "dni": 4,
                "nombre": "Categoria 1",
                "descripcion": "",
                "activo": true
            },
            "faseProyecto": "Ejecución",
            "descripcion": "Durante la ejecución se identificó la necesidad de automatizar el control de calidad.",
            "causas": "Demora en revisiones manuales.",
            "impacto": "Se redujo el tiempo de entrega en un 15%.",
            "leccionAprendida": "La automatización temprana mejora la eficiencia y reduce errores.",
            "recomendacion": "Implementar herramientas automáticas desde la fase de planificación.",
            "tipo": "Positiva",
            "autor": "Brandon Salinas",
            "etiquetas": [
                "automatización",
                "eficiencia",
                "calidad"
            ],
            "asistentes": [
                {
                    "dni": "a4e7ea8c-9c1f-5f",
                    "nombre": "Brandon",
                    "correo": "brandon.juarez@dcvent.com"
                }
            ]
        }
    ]
}

3.- Para agregar una leccion aprendida es necesario que el usuario de click en el boton de "Registrar leccion" pero el formulario hay que corregirlo y usar los componentes base para formularios que los puedes encontrar en esta carpeta, una vez editado el formulario podemos implementar el envio de la informacion al siguiente enpoint

* METODO: POST
* ENDPOINT: /gestion-de-proyectos/lecciones-aprendidas
* REQUEST:
public class LeccionAprendidaRequest
{
    public string? dni { get; set; }

    [Required(ErrorMessage = "El id del proyecto es obligatorio.")]
    public string dniProyecto { get; set; } = string.Empty;

    [Required(ErrorMessage = "La categoría es obligatoria.")]
    public int dniCategoria { get; set; }

    [Required(ErrorMessage = "La fase del proyecto es obligatoria.")]
    public FaseProyecto faseProyecto { get; set; }

    [Required(ErrorMessage = "La descripción es obligatoria.")]
    public string descripcion { get; set; } = string.Empty;

    public string causas { get; set; } = string.Empty;

    public string impacto { get; set; } = string.Empty;

    public string leccionAprendida { get; set; } = string.Empty;

    public string recomendacion { get; set; } = string.Empty;

    [Required(ErrorMessage = "El tipo de lección aprendida es obligatorio.")]
    public TipoLeccionAprendida tipo { get; set; }

    public List<string> etiquetas { get; set; } = new List<string>();

    [Required(ErrorMessage = "El autor es obligatorio.")]
    public string autor { get; set; } = string.Empty;

    public bool activo { get; set; } = true;
}
* REQUEST EJEMPLO:
{
  "dniProyecto": "0260bdb91b980000",
  "dniCategoria": 4,
  "nombre": "Optimización del proceso de revisión de calidad",
  "faseProyecto": "Ejecucion",
  "descripcion": "Durante la ejecución se identificó la necesidad de automatizar el control de calidad.",
  "causas": "Demora en revisiones manuales.",
  "impacto": "Se redujo el tiempo de entrega en un 15%.",
  "leccionAprendida": "La automatización temprana mejora la eficiencia y reduce errores.",
  "recomendacion": "Implementar herramientas automáticas desde la fase de planificación.",
  "tipo": "Positiva",
  "etiquetas": ["automatización", "eficiencia", "calidad"],
  "autor": "Brandon Salinas",
  "activo": true
}
* RESPONSE: 
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": {
        "dni": "e4f3fbb4564f0000",
        "dniProyecto": "0260bdb91b980000",
        "categoria": {
            "dni": 4,
            "nombre": "",
            "descripcion": "",
            "activo": false
        },
        "faseProyecto": "Ejecucion",
        "descripcion": "Durante la ejecución se identificó la necesidad de automatizar el control de calidad.",
        "causas": "Demora en revisiones manuales.",
        "impacto": "Se redujo el tiempo de entrega en un 15%.",
        "leccionAprendida": "La automatización temprana mejora la eficiencia y reduce errores.",
        "recomendacion": "Implementar herramientas automáticas desde la fase de planificación.",
        "tipo": "Positiva",
        "etiquetas": [
            "automatización",
            "eficiencia",
            "calidad"
        ],
        "autor": "Brandon Salinas",
        "asistentes": [],
        "activo": true
    }
}

4.- Antes de esto es necesario que hagas un get de las opciones de las categorias para que puedas implementarlas en el select del formulario, el endpoint es el siguiente

* METODO: GET
* ENDPOINT: /gestion-de-proyectos/leccion-aprendida-categoria/opciones
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": [
        {
            "dni": 4,
            "label": "Categoria 1"
        },
        {
            "dni": 5,
            "label": "Categoria 2"
        }
    ]
}




5.- Editar una leccion aprendida, para este punto es necesario habilitar un boton (obviamente usando los componentes base) en cada leccion aprendida el cual permita abrir el formulario con la informacion precargada de la leccion aprendida, el endpoint es el siguiente

* METODO: PUT
* URL: /gestion-de-proyectos/lecciones-aprendidas
* REQUEST EJEMPLO: 
{
"dni": "136c988a4fab0000",
  "dniProyecto": "7e3844b446400000",
  "dniCategoria": 5,
  "faseProyecto": "Ejecucion",
  "descripcion": "Durante la ejecución se identificó la necesidad de automatizar el control de calidad.",
  "causas": "Demora en revisiones manuales.",
  "impacto": "Se redujo el tiempo de entrega en un 15%.",
  "leccionAprendida": "La automatización temprana mejora la eficiencia y reduce errores.",
  "recomendacion": "Implementar herramientas automáticas desde la fase de planificación.",
  "tipo": "Positiva",
  "etiquetas": ["automatización", "eficiencia", "calidad"],
  "autor": "Brandon Salinas",
  "activo": true
}
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": true
}

6.- Eliminar una leccion aprendida, todas las lecciones aprendidas deberan tener un boton de eliminar, este disparara un modal de confirmacion para el usuario y si da aceptar se eliminara la leccion aprendida

* METODO: DELETE
* URL: /gestion-de-proyectos/lecciones-aprendidas/136c988a4fab0000
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": {
        "totalItems": 1
    }
}

7.- Agregar Asistente, asi como se manejor en la parte de minutas se manejara aqui, puedes tomarlo como referencia el como se manejan los asistentes en las minutas incluso se hara el mismo componente, para agregar un asistente se usa este endpoint

* METODO: POST
* URL: /gestion-de-proyectos/leccion-aprendida-asistente
* REQUEST EJEMPLO:
{
    "dniLeccionAprendida": "136c988a4fab0000",
    "dniUsuario": "a4e7ea8c-9c1f-5f"
}
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": {
        "dni": "a4e7ea8c-9c1f-5f",
        "nombre": "Brandon Juarez",
        "correo": "brandon.juarez@dcvent.com"
    }
}

8.- Eliminar Asistente, asi como se manejor en la parte de minutas se manejara aqui, puedes tomarlo como referencia el como se manejan los asistentes en las minutas incluso se hara el mismo componente, para eliminar un asistente se usa este endpoint

* METODO: DELETE
* URL: /gestion-de-proyectos/leccion-aprendida-asistente
* REQUEST:
{
    "dniLeccionAprendida": "136c988a4fab0000",
    "dniUsuario": "a4e7ea8c-9c1f-5f"
}
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": true
}

10.- Para obtener el listado de usuarios puedes consultar el siguiente endpoint

* METODO: GET
* URL: /gestion-de-proyectos/minutas/participantes
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": [
        {
            "dni": "1",
            "nombre": "jose perez",
            "correo": "david.tello@dcvent.com"
        },
        {
            "dni": "a4e7ea8c-9c1f-5f",
            "nombre": "Brandon Juarez",
            "correo": "brandon.juarez@dcvent.com"
        }
    ]
}

