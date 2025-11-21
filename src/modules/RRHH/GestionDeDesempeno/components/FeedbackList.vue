<script setup lang="ts">
import FeedbackCard from '@/modules/RRHH/GestionDeDesempeno/components/FeedbackCard.vue'

const feedbackItems = [
    {
        id: 1,
        author: 'Manager A',
        date: 'Hace 2 días',
        type: 'Kudos',
        message: 'Excelente trabajo en la presentación del proyecto. Tu liderazgo fue clave para el éxito del equipo.'
    },
    {
        id: 2,
        author: 'Manager B',
        date: 'Hace 5 días',
        type: 'Reconocimiento',
        message: 'Gran iniciativa en la optimización del proceso. Los resultados han sido excepcionales.'
    },
    {
        id: 3,
        author: 'Manager C',
        date: 'Hace 1 semana',
        type: 'Feedback',
        message: 'Muy buen desempeño en el último sprint. La colaboración con el equipo fue destacable.'
    }
]
</script>

<template>
    <div class="card shadow-base bg-base-100">
        <div class="card-body">
            <h2 class="card-title">Feedback Continuo 365</h2>
            <p class="text-base-content/60 mb-4">
                Sistema de reconocimiento y feedback fuera del ciclo formal
            </p>

            <div class="space-y-4">
                <FeedbackCard
                    v-for="item in feedbackItems"
                    :key="item.id"
                    :item="item"
                />
            </div>
        </div>
    </div>
</template>
