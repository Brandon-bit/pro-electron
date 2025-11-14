// Usuarios
// Configuracion

const routes = [
    // Usuario
    {
        path: '/usuarios/lista',
        name: 'Lista de Usuarios',
        component: () => import("@defaultModule/Usuarios/Lista/views/UserListView.vue")
    },
    {
        path: '/usuarios/nuevo',
        name: 'Nuevo Usuario',
        component: () => import("@defaultModule/Usuarios/Nuevo/views/NewUserView.vue")
    },
    // Configuracion
    {
        path: '/configuracion/dias-inhabiles',
        name: 'Días Inhabiles',
        component: () => import("@defaultModule/Configuracion/DiasInhabiles/views/HolidayListView.vue")
    }
]

export default routes