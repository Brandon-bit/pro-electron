<template>
    <div class="space-y-6">
        <!-- Header -->
        <div>
            <h2 class="text-2xl font-bold text-primary">Paso 6</h2>
            <p class="text-base-content/70 mt-1">Resumen y Alta</p>
        </div>

        <!-- Contenedor con borde punteado azul -->
        <div class="border-2 border-dashed border-primary/30 rounded-lg p-6 space-y-6">
            <!-- Datos opcionales personalizados -->
            <div class="bg-base-200 rounded-lg p-4">
                <h3 class="font-bold text-lg mb-4 text-center">Datos opcionales personalizados</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="label">
                            <span class="label-text font-semibold">Código de cliente</span>
                        </label>
                        <input
                            v-model="codigoCliente"
                            type="text"
                            class="input input-bordered w-full"
                            placeholder="Código de cliente"
                        />
                    </div>
                    <div>
                        <label class="label">
                            <span class="label-text font-semibold">Número de cuenta</span>
                        </label>
                        <input
                            v-model="numeroCuenta"
                            type="text"
                            class="input input-bordered w-full"
                            placeholder="Número de cuenta"
                        />
                    </div>
                </div>
            </div>

            <!-- Paso 1: Datos Personales -->
            <div v-if="formData.step1">
                <h3 class="font-bold text-lg mb-3 border-b pb-2">Cliente</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div><span class="font-semibold">Nombre:</span> <span class="text-primary">{{ formData.step1.nombre }}</span></div>
                    <div><span class="font-semibold">Apellidos:</span> <span class="text-primary">{{ formData.step1.apellidos }}</span></div>
                    <div><span class="font-semibold">Fecha de nacimiento:</span> <span class="text-primary">{{ formatDate(formData.step1.fechaNacimiento) }}</span></div>
                    <div><span class="font-semibold">Edad:</span> <span class="text-primary">{{ formData.step1.edad }}</span></div>
                    <div><span class="font-semibold">Sexo:</span> <span class="text-primary">{{ formData.step1.sexo }}</span></div>
                    <div><span class="font-semibold">Estado civil:</span> <span class="text-primary">{{ formData.step1.estadoCivil }}</span></div>
                    <div><span class="font-semibold">CURP:</span> <span class="text-primary">{{ formData.step1.curp }}</span></div>
                    <div><span class="font-semibold">Lugar de nacimiento:</span> <span class="text-primary">{{ formData.step1.lugarNacimiento || '-' }}</span></div>
                    <div><span class="font-semibold">Nacionalidad:</span> <span class="text-primary">{{ formData.step1.nacionalidad }}</span></div>
                    <div><span class="font-semibold">INE:</span> <span class="text-primary">{{ formData.step1.ine }}</span></div>
                </div>
            </div>

            <!-- Paso 2: Contacto -->
            <div v-if="formData.step2">
                <h3 class="font-bold text-lg mb-3 border-b pb-2">Contacto</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div><span class="font-semibold">Teléfono Casa:</span> <span class="text-primary">{{ formData.step2.telefonoCasa ? `${formData.step2.telefonoCasaPais} ${formData.step2.telefonoCasa}` : '-' }}</span></div>
                    <div><span class="font-semibold">Teléfono Celular:</span> <span class="text-primary">{{ formData.step2.telefonoCelularPais }} {{ formData.step2.telefonoCelular }}</span></div>
                    <div class="md:col-span-2"><span class="font-semibold">Correo electrónico:</span> <span class="text-primary">{{ formData.step2.correoElectronico }}</span></div>
                </div>
            </div>

            <!-- Paso 3: Domicilio -->
            <div v-if="formData.step3">
                <h3 class="font-bold text-lg mb-3 border-b pb-2">Domicilio</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div><span class="font-semibold">Calle:</span> <span class="text-primary">{{ formData.step3.calle }}</span></div>
                    <div><span class="font-semibold">No. Exterior:</span> <span class="text-primary">{{ formData.step3.numeroExterior }}</span></div>
                    <div><span class="font-semibold">No. Interior:</span> <span class="text-primary">{{ formData.step3.numeroInterior || '-' }}</span></div>
                    <div><span class="font-semibold">Colonia:</span> <span class="text-primary">{{ formData.step3.colonia }}</span></div>
                    <div><span class="font-semibold">C.P.:</span> <span class="text-primary">{{ formData.step3.codigoPostal }}</span></div>
                    <div><span class="font-semibold">Ciudad:</span> <span class="text-primary">{{ formData.step3.ciudad }}</span></div>
                    <div><span class="font-semibold">Estado:</span> <span class="text-primary">{{ formData.step3.estado }}</span></div>
                    <div><span class="font-semibold">País:</span> <span class="text-primary">{{ formData.step3.pais }}</span></div>
                </div>
            </div>

            <!-- Paso 4: Datos Financieros -->
            <div v-if="formData.step4">
                <h3 class="font-bold text-lg mb-3 border-b pb-2">Datos Financieros</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div><span class="font-semibold">Tipo de Persona:</span> <span class="text-primary">{{ formData.step4.tipoPersona === 'fisica' ? 'Persona Física' : 'Persona Moral' }}</span></div>
                    <div><span class="font-semibold">Régimen Fiscal:</span> <span class="text-primary">{{ formData.step4.regimenFiscal || '-' }}</span></div>
                    <div><span class="font-semibold">Razón Social:</span> <span class="text-primary">{{ formData.step4.razonSocial || '-' }}</span></div>
                    <div><span class="font-semibold">Banco:</span> <span class="text-primary">{{ formData.step4.banco || '-' }}</span></div>
                    <div><span class="font-semibold">RFC:</span> <span class="text-primary">{{ formData.step4.rfc }}</span></div>
                    <div><span class="font-semibold">CLABE:</span> <span class="text-primary">{{ formData.step4.clabe || '-' }}</span></div>
                    <div><span class="font-semibold">Cuenta:</span> <span class="text-primary">{{ formData.step4.cuenta || '-' }}</span></div>
                    <div><span class="font-semibold">Código SWIFT:</span> <span class="text-primary">{{ formData.step4.codigoSwift || '-' }}</span></div>
                </div>
            </div>

            <!-- Paso 5: Beneficiarios -->
            <div v-if="formData.step5 && formData.step5.beneficiarios.length > 0">
                <h3 class="font-bold text-lg mb-3 border-b pb-2">Beneficiarios</h3>
                <div class="overflow-x-auto">
                    <table class="table table-zebra w-full">
                        <thead class="bg-base-300">
                            <tr>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Fecha de nacimiento</th>
                                <th>CURP</th>
                                <th>RFC</th>
                                <th>Parentesco</th>
                                <th>Porcentaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(beneficiario, index) in formData.step5.beneficiarios" :key="index">
                                <td>{{ beneficiario.nombre }}</td>
                                <td>{{ beneficiario.apellidos }}</td>
                                <td>{{ formatDate(beneficiario.fechaNacimiento) }}</td>
                                <td>{{ beneficiario.curp || '-' }}</td>
                                <td>{{ beneficiario.rfc }}</td>
                                <td>{{ beneficiario.parentesco || '-' }}</td>
                                <td>{{ beneficiario.porcentaje }}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { NewPartnerFormData } from '../../types/partnerTypes'

interface Props {
    formData: NewPartnerFormData
}

const props = defineProps<Props>()

const codigoCliente = ref('')
const numeroCuenta = ref('')

// Formatear fecha
const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-MX')
}

// Método de validación (siempre válido para el resumen)
const validateStep = async () => {
    return { valid: true }
}

// Exponer método de validación
defineExpose({
    validate: validateStep
})
</script>
