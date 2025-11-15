import { defineStore } from 'pinia'
import type { EDTNodeType, ProjectDataType } from '@/modules/GestionDeProyectos/Operacion/EDTDelProyecto/types/edtTypes'

// Proyecto de ejemplo para desarrollo
const mockProject: ProjectDataType = {
    id: 1,
    name: 'Sistema CRM Empresarial',
    classification: 'Estratégico'
}

// Árbol EDT de ejemplo
const mockEDTTree: EDTNodeType = {
    id: 'root',
    name: 'Sistema CRM Empresarial',
    level: 0,
    parentId: null,
    children: [
        {
            id: 'node-1',
            name: 'Análisis y Diseño',
            level: 1,
            parentId: 'root',
            children: [
                {
                    id: 'node-1-1',
                    name: 'Levantamiento de Requerimientos',
                    level: 2,
                    parentId: 'node-1',
                    children: [
                        {
                            id: 'node-1-1-1',
                            name: 'Entrevistas con Stakeholders',
                            level: 3,
                            parentId: 'node-1-1',
                            children: []
                        },
                        {
                            id: 'node-1-1-2',
                            name: 'Documentación de Procesos',
                            level: 3,
                            parentId: 'node-1-1',
                            children: []
                        }
                    ]
                },
                {
                    id: 'node-1-2',
                    name: 'Diseño de Arquitectura',
                    level: 2,
                    parentId: 'node-1',
                    children: []
                }
            ]
        },
        {
            id: 'node-2',
            name: 'Desarrollo',
            level: 1,
            parentId: 'root',
            children: [
                {
                    id: 'node-2-1',
                    name: 'Backend',
                    level: 2,
                    parentId: 'node-2',
                    children: [
                        {
                            id: 'node-2-1-1',
                            name: 'API REST',
                            level: 3,
                            parentId: 'node-2-1',
                            children: []
                        },
                        {
                            id: 'node-2-1-2',
                            name: 'Base de Datos',
                            level: 3,
                            parentId: 'node-2-1',
                            children: []
                        }
                    ]
                },
                {
                    id: 'node-2-2',
                    name: 'Frontend',
                    level: 2,
                    parentId: 'node-2',
                    children: [
                        {
                            id: 'node-2-2-1',
                            name: 'Interfaz de Usuario',
                            level: 3,
                            parentId: 'node-2-2',
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            id: 'node-3',
            name: 'Pruebas y Despliegue',
            level: 1,
            parentId: 'root',
            children: [
                {
                    id: 'node-3-1',
                    name: 'Pruebas Unitarias',
                    level: 2,
                    parentId: 'node-3',
                    children: []
                },
                {
                    id: 'node-3-2',
                    name: 'Pruebas de Integración',
                    level: 2,
                    parentId: 'node-3',
                    children: []
                },
                {
                    id: 'node-3-3',
                    name: 'Despliegue en Producción',
                    level: 2,
                    parentId: 'node-3',
                    children: []
                }
            ]
        }
    ]
}

const useEDTStore = defineStore('edt-store', {
    state: () => ({
        selectedProject: mockProject as ProjectDataType | null,
        availableProjects: [mockProject] as ProjectDataType[],
        edtRoot: mockEDTTree as EDTNodeType | null,
        editingNodeId: null as string | null,
        editingValue: '',
        modalId: 'edt-modal'
    }),
    actions: {
        setSelectedProject(project: ProjectDataType | null) {
            this.selectedProject = project
            if (project) {
                // Crear nodo raíz
                this.edtRoot = {
                    id: 'root',
                    name: project.name,
                    level: 0,
                    children: [],
                    parentId: null
                }
            } else {
                this.edtRoot = null
            }
        },
        setAvailableProjects(projects: ProjectDataType[]) {
            this.availableProjects = projects
        },
        setEDTRoot(root: EDTNodeType | null) {
            this.edtRoot = root
        },
        startEditing(nodeId: string, nodeName: string) {
            this.editingNodeId = nodeId
            this.editingValue = nodeName
        },
        cancelEditing() {
            this.editingNodeId = null
            this.editingValue = ''
        },
        updateNodeName(nodeId: string, newName: string) {
            if (!this.edtRoot) return

            const updateTree = (node: EDTNodeType): EDTNodeType => {
                if (node.id === nodeId) {
                    return { ...node, name: newName }
                }
                return { ...node, children: node.children.map(updateTree) }
            }

            this.edtRoot = updateTree(this.edtRoot)
            this.cancelEditing()
        },
        addChildNode(parentNode: EDTNodeType) {
            if (!this.edtRoot) return

            const generateId = () => `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            
            const newNode: EDTNodeType = {
                id: generateId(),
                name: parentNode.level === 0 ? 'Nueva Etapa' : 
                      parentNode.level === 1 ? 'Nueva Actividad' : 'Nueva Sub-actividad',
                level: parentNode.level + 1,
                children: [],
                parentId: parentNode.id
            }

            const updateTree = (node: EDTNodeType): EDTNodeType => {
                if (node.id === parentNode.id) {
                    return { ...node, children: [...node.children, newNode] }
                }
                return { ...node, children: node.children.map(updateTree) }
            }

            this.edtRoot = updateTree(this.edtRoot)
        },
        deleteNode(nodeId: string) {
            if (!this.edtRoot || nodeId === 'root') return

            const updateTree = (node: EDTNodeType): EDTNodeType => {
                return {
                    ...node,
                    children: node.children
                        .filter(child => child.id !== nodeId)
                        .map(updateTree)
                }
            }

            this.edtRoot = updateTree(this.edtRoot)
        },
        loadFromLocalStorage() {
            const edtProject = localStorage.getItem('edtProject')
            if (edtProject) {
                const project = JSON.parse(edtProject)
                this.availableProjects = [project]
            }
        }
    }
})

export default useEDTStore
