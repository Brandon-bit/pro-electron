import { z } from "zod";

export const supplierSchema = z.object({
  idDireccion: z.number()
    .min(1, "La dirección es requerida"),

  razonSocial: z.string()
    .min(1, "La razón social es requerida"),

  nombreComercial: z.string()
    .min(1, "El nombre comercial es requerido"),

  rfc: z.string()
    .optional(),

  correo: z.string()
    .min(1, "El correo es requerido")
    .email("Debe ser un correo válido"),

  contacto: z.string()
    .min(1, "El contacto es requerido"),

  telefono: z.string()
    .min(1, "El teléfono es requerido"),

  sitioWeb: z.string()
    .optional(),

  condicionesPago: z.string()
    .min(1, "Las condiciones de pago son requeridas"),

  idUsuario: z.string()
    .min(1, "El usuario es requerido"),

  activo: z.boolean({
    required_error: "El campo Activo es requerido"
  })
});
