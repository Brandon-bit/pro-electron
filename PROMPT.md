Necesito que me ayudes a implementar la funcionalidad real en este apartado, actualmente funciona con mock data, pero te explicare como deberia de funcionar y te pasare los endpoints necesarios para que puedas implementar los services, los composables, los types, las validations, los componentes que consideres necesarios, el store, etc. Puedes tomar los siguientes apartados como referencia ya que esos ya funcionan al 100%

Necesito que revises bien la implementacion de los modales, la forma correcta es la siguiente, como aqui se trabajaran 3 cruds distintos (Minutas, Acciones acordadas, Asistentes) cada uno tendra su componente de modal, y ya dependiendo de la accion se renderiza el cuerpo de ese modal, por ejemplo, supongamos que trabajamos con las minutas, los componentes serian los siguientes

- MinuteModal -> Este es el modal principal que se encarga de abrir y cerrar los modales
- AddEditMinuteForm -> Este es el cuerpo del formulario que se encarga de agregar y editar minutas
- DeleteMinute -> Este es el cuerpo que se encarga de mostrar el mensaje de confirmacion al usuario al eliminar minutas

Revisa las referencias que te indique para mayor contexto y todo el codigo generado debera de ser en ingles.

1.- El usuairio entra a la vista y tendra cargado solamente el select con las opciones de los proyectos, para obtener las opciones esta el siguiente endpoint

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

2.- Una vez que el usuario seleccione la opcion se cargaran las minutas del proyecto, para obtener las minutas esta el siguiente endpoint, de esta misma response se sacaran todas las actividades acordadas para mostrar en la tab de "Acciones pendientes"

* METODO: GET
* ENDPOINT: /gestion-de-proyectos/minutas/obtener-minutas?dniProyecto=0260bdb91b980000
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": [
        {
            "dni": "0a0c01bb23bd0000",
            "dniProyecto": "0260bdb91b980000",
            "nombre": "Dictamen Normativo - Revisión mensual",
            "fecha": "2025-10-29T15:00:00",
            "agenda": "Evaluar el cumplimiento normativo del último trimestre.",
            "puntosDiscutidos": "Se revisaron los informes técnicos y los avances en auditorías.",
            "decisionesTomadas": "Se solicitó una actualización del marco regulatorio interno.",
            "asistentes": [
                {
                    "dni": "a4e7ea8c-9c1f-5f",
                    "nombre": "Brandon",
                    "correo": "brandon.juarez@dcvent.com"
                }
            ],
            "accionesAcordadas": [
                {
                    "dni": 4,
                    "dniMinuta": "0a0c01bb23bd0000",
                    "minutaOrigen": "",
                    "descripcion": "Revisar el informe técnico de la planta norte antes del 15 de noviembre.",
                    "responsable": {
                        "dni": "a4e7ea8c-9c1f-5f",
                        "nombre": "Brandon",
                        "correo": "brandon.juarez@dcvent.com"
                    },
                    "estatus": {
                        "dni": 1,
                        "nombre": "En Tiempo",
                        "color": "#4CAF50"
                    },
                    "fechaLimite": "2025-11-25T00:00:00"
                }
            ],
            "activo": true
        },
        {
            "dni": "9b9d145bf7b00000",
            "dniProyecto": "0260bdb91b980000",
            "nombre": "Dictamen Normativo - Revisión mensual",
            "fecha": "2025-10-29T15:00:00",
            "agenda": "Evaluar el cumplimiento normativo del último trimestre.",
            "puntosDiscutidos": "Se revisaron los informes técnicos y los avances en auditorías.",
            "decisionesTomadas": "Se solicitó una actualización del marco regulatorio interno.",
            "asistentes": [
                {
                    "dni": "a4e7ea8c-9c1f-5f",
                    "nombre": "Brandon",
                    "correo": "brandon.juarez@dcvent.com"
                }
            ],
            "accionesAcordadas": [],
            "activo": true
        },
        {
            "dni": "eba1a7a2232d0000",
            "dniProyecto": "0260bdb91b980000",
            "nombre": "Dictamen Normativo - Revisión mensual",
            "fecha": "2025-10-29T15:00:00",
            "agenda": "Evaluar el cumplimiento normativo del último trimestre.",
            "puntosDiscutidos": "Se revisaron los informes técnicos y los avances en auditorías.",
            "decisionesTomadas": "Se solicitó una actualización del marco regulatorio interno.",
            "asistentes": [
                {
                    "dni": "a4e7ea8c-9c1f-5f",
                    "nombre": "Brandon",
                    "correo": "brandon.juarez@dcvent.com"
                }
            ],
            "accionesAcordadas": [],
            "activo": true
        }
    ]
}

3.- Para agregar una minuta se usara el modal y el formulario que ya se tiene pero antes hay que eliminar la seccion de "Agregar Asistentes" del formulario ya que se manejara por separado, para agregar la minuta cuando el usuario haga submit se usara el siguiente endpoint

* METODO: POST
* ENDPOINT: /gestion-de-proyectos/minutas
* REQUEST:
public class MinutaRequest
{
    public string? dni { get; set; }

    [Required(ErrorMessage = "El id del proyecto es obligatorio.")]
    public string dniProyecto { get; set; } = string.Empty;

    [Required(ErrorMessage = "El nombre es obligatorio.")]
    [StringLength(256, ErrorMessage = "El nombre no puede exceder los 256 caracteres.")]
    public string nombre { get; set; } = string.Empty;

    [Required(ErrorMessage = "La fecha es obligatoria.")]
    [DataType(DataType.DateTime, ErrorMessage = "La fecha no tiene un formato válido.")]
    public DateTime fecha { get; set; }

    [Required(ErrorMessage = "La agenda es obligatoria.")]
    [StringLength(5000, ErrorMessage = "La agenda no puede exceder los 5000 caracteres.")]
    public string agenda { get; set; } = string.Empty;

    [Required(ErrorMessage = "Los puntos discutidos son obligatorios.")]
    [StringLength(10000, ErrorMessage = "Los puntos discutidos no pueden exceder los 10000 caracteres.")]
    public string puntosDiscutidos { get; set; } = string.Empty;

    [Required(ErrorMessage = "Las decisiones tomadas son obligatorias.")]
    [StringLength(10000, ErrorMessage = "Las decisiones tomadas no pueden exceder los 10000 caracteres.")]
    public string decisionesTomadas { get; set; } = string.Empty;

    [Required(ErrorMessage = "El campo activo es obligatorio.")]
    public bool activo { get; set; }
}
* REQUEST EJEMPLO:
{
   "dniProyecto": "0260bdb91b980000",
   "nombre": "Dictamen Normativo - Revisión mensual",
   "fecha": "2025-10-29T15:00:00",
   "agenda": "Evaluar el cumplimiento normativo del último trimestre.",
   "puntosDiscutidos": "Se revisaron los informes técnicos y los avances en auditorías.",
   "decisionesTomadas": "Se solicitó una actualización del marco regulatorio interno.",
   "activo": true
}
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": {
        "dni": "6e144de8c5810000",
        "dniProyecto": "0260bdb91b980000",
        "nombre": "Dictamen Normativo - Revisión mensual",
        "fecha": "2025-10-29T15:00:00",
        "agenda": "Evaluar el cumplimiento normativo del último trimestre.",
        "puntosDiscutidos": "Se revisaron los informes técnicos y los avances en auditorías.",
        "decisionesTomadas": "Se solicitó una actualización del marco regulatorio interno.",
        "activo": true,
        "accionesAcordadas": [],
        "asistentes": []
    }
}

4.- Para editar una minuta se usara el mismo modal y el mismo formulario pero con los campos llenados con la informacion de la minuta que se desea editar, este modal se disparara al hacer click en el boton "Editar" que se encuentra al abrir el detalle de la minuta, el endpoint a usar es el siguiente

* METODO: PUT
* ENDPOINT: /gestion-de-proyectos/minutas
* REQUEST EJEMPLO:
{
    "dni": "6e144de8c5810000",
   "dniProyecto": "0260bdb91b980000",
   "nombre": "Dictamen Normativo - Revisión mensual",
   "fecha": "2025-10-29T15:00:00",
   "agenda": "Evaluar el cumplimiento normativo del último trimestre.",
   "puntosDiscutidos": "Se revisaron los informes técnicos y los avances en auditorías.",
   "decisionesTomadas": "Se solicitó una actualización del marco regulatorio interno.",
   "activo": true
}
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": true
}

5.- Para eliminar una minuta se usara el boton "Eliminar" que se encuentra al abrir el detalle de la minuta, se tiene que usar el modal de confirmacion de eliminacion para que el usuario pueda confirmar, el endpoint a usar es el siguiente

* METODO: DELETE
* ENDPOINT: /gestion-de-proyectos/minutas/6e144de8c5810000
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": {
        "totalItems": 1
    }
}


6.- Para agregar un asistente se va a crear un boton especifico para ello que estara al lado de todos los botones del footer cuando se abre el detalle de la minuta, al dar click se abrira un modal con el select de usuarios, para obtener a estos usuarios se tienen que consultar en el siguiente endpoint, es importante que este lo ejectues una vez cargada la vista, en el Mounted y guardamos a los asistentes en el store porque el select de usuarios se usara en distintas secciones y no es necesario hacer la consulta cada que se quiera usar

* METODO: GET
* ENDPOINT: /gestion-de-proyectos/minutas/participantes
* RESPONSE EJEMPLO:
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

Despues cuando se quiera agregar un asistente se usara el siguiente endpoint

* METODO: POST
* ENDPOINT: /gestion-de-proyectos/minuta-asistente
* REQUEST EJEMPLO:
{
    "dniMinuta": "6e144de8c5810000",
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


7.- Para elimiar un asistente se creara un boton flotante en cada etiqueta de asistente, al dar click en este boton se abrira un modal de confirmacion, el endpoint a usar es el siguiente

* METODO: DELETE
* ENDPOINT: /gestion-de-proyectos/minuta-asistente
* REQUEST EJEMPLO:
{
    "dniMinuta": "6e144de8c5810000",
    "dniUsuario": "a4e7ea8c-9c1f-5f"
}
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": true
}

8.- Para agregar "Acciones acordadas" esta el boton en la parte de abajo cuando se abre el detalle de la minuta, cuando se de click este abrira el modal con el formulario que ya se tiene y cuando el usuario haga submit se usara el siguiente endpoint

* METODO: POST
* ENDPOINT: /gestion-de-proyectos/accion-acordada
* REQUEST:
public class AccionAcordadaRequest
{
    public int? dni { get; set; }

    [Required(ErrorMessage = "El dni de la minuta es obligatorio.")]
    public string dniMinuta { get; set; } = string.Empty;

    [Required(ErrorMessage = "El dni del responsable es obligatorio.")]
    public string dniResponsable { get; set; } = string.Empty;

    [Required(ErrorMessage = "La descripción es obligatoria.")]
    public string descripcion { get; set; } = string.Empty;

    [Required(ErrorMessage = "La fecha límite es obligatoria.")]
    [DataType(DataType.DateTime, ErrorMessage = "El formato de fecha no es válido.")]
    [CustomValidation(typeof(AccionAcordadaRequest), nameof(ValidateFechaLimite))]
    public DateTime fechaLimite { get; set; }

    public static ValidationResult? ValidateFechaLimite(DateTime fecha, ValidationContext context)
    {
        if (fecha < DateTime.Today)
        {
            return new ValidationResult("La fecha límite no puede ser anterior al día de hoy.");
        }
        return ValidationResult.Success;
    }
}
* REQUEST EJEMPLO:
{
  "dniMinuta": "6e144de8c5810000",
  "dniResponsable": "a4e7ea8c-9c1f-5f",
  "descripcion": "Revisar el informe técnico de la planta norte antes del 15 de noviembre.",
  "fechaLimite": "2025-11-25T00:00:00"
}
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": {
        "dni": 7,
        "dniMinuta": "6e144de8c5810000",
        "minutaOrigen": "",
        "responsable": {
            "dniUsuario": "a4e7ea8c-9c1f-5f",
            "nombre": "Brandon Juarez",
            "correo": "brandon.juarez@dcvent.com"
        },
        "estatus": {
            "dni": 0,
            "nombre": "En Tiempo",
            "color": "#4CAF50"
        },
        "descripcion": "Revisar el informe técnico de la planta norte antes del 15 de noviembre.",
        "fechaLimite": "2025-11-25T00:00:00",
        "activo": true
    }
}



9.- Para editar una accion acordada ya se abre el modal con la informacion precargada al formulario cuando hacemos click sobre la actividad en si y el endpoint a usar es este

* METODO: PUT
* ENDPOINT: /gestion-de-proyectos/accion-acordada
* REQUEST EJEMPLO:
{
    "dni": 7,
    "dniMinuta": "6e144de8c5810000",
    "dniResponsable": "a4e7ea8c-9c1f-5f",
    "descripcion": "Revisar el informe técnico de la planta norte antes del 15 de noviembre. edit",
    "fechaLimite": "2025-11-25T00:00:00"
}
* RESPONSE: 
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": true
}


10.- Para eliminar una accion acordada cada card de acciones acordadas tendra un boton flotante para eliminar, al igual que con los asistentes, al dar click en este boton se abrira un modal de confirmacion, el endpoint a usar es el siguiente

* METODO: DELETE
* ENDPOINT: /gestion-de-proyectos/accion-acordada/7
* RESPONSE:
{
    "success": true,
    "message": "Operación realizada exitosamente",
    "data": {
        "totalItems": 1
    }
}



