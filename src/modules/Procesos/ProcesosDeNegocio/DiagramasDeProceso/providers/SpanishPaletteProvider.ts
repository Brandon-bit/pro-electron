/**
 * Provider personalizado para Palette en Español de México
 * Sobrescribe los tooltips y textos de la paleta de herramientas
 */

export default class SpanishPaletteProvider {
  static $inject = ['palette', 'create', 'elementFactory', 'spaceTool', 'lassoTool', 'handTool', 'globalConnect', 'translate'];

  private palette: any;
  private create: any;
  private elementFactory: any;
  private spaceTool: any;
  private lassoTool: any;
  private handTool: any;
  private globalConnect: any;
  private translate: any;

  constructor(
    palette: any,
    create: any,
    elementFactory: any,
    spaceTool: any,
    lassoTool: any,
    handTool: any,
    globalConnect: any,
    translate: any
  ) {
    this.palette = palette;
    this.create = create;
    this.elementFactory = elementFactory;
    this.spaceTool = spaceTool;
    this.lassoTool = lassoTool;
    this.handTool = handTool;
    this.globalConnect = globalConnect;
    this.translate = translate;
  }

  getPaletteEntries() {
    const actions: any = {};
    const create = this.create;
    const elementFactory = this.elementFactory;
    const spaceTool = this.spaceTool;
    const lassoTool = this.lassoTool;
    const handTool = this.handTool;
    const globalConnect = this.globalConnect;
    const translate = this.translate;

    function createAction(type: string, group: string, className: string, title: string, options?: any) {
      function createListener(event: any) {
        const shape = elementFactory.createShape(Object.assign({ type: type }, options));
        if (options) {
          shape.businessObject.di.isExpanded = options.isExpanded;
        }
        create.start(event, shape);
      }

      return {
        group: group,
        className: className,
        title: translate(title),
        action: {
          dragstart: createListener,
          click: createListener
        }
      };
    }

    function createSubprocess(event: any) {
      const subProcess = elementFactory.createShape({
        type: 'bpmn:SubProcess',
        x: 0,
        y: 0,
        isExpanded: true
      });
      const startEvent = elementFactory.createShape({
        type: 'bpmn:StartEvent',
        x: 40,
        y: 82,
        parent: subProcess
      });

      create.start(event, [subProcess, startEvent], {
        hints: {
          autoSelect: [subProcess]
        }
      });
    }

    Object.assign(actions, {
      'hand-tool': {
        group: 'tools',
        className: 'bpmn-icon-hand-tool',
        title: translate('Activar herramienta de desplazamiento'),
        action: {
          click: function(event: any) {
            handTool.activateHand(event);
          }
        }
      },
      'lasso-tool': {
        group: 'tools',
        className: 'bpmn-icon-lasso-tool',
        title: translate('Activar herramienta de selección múltiple'),
        action: {
          click: function(event: any) {
            lassoTool.activateSelection(event);
          }
        }
      },
      'space-tool': {
        group: 'tools',
        className: 'bpmn-icon-space-tool',
        title: translate('Activar herramienta de espacio'),
        action: {
          click: function(event: any) {
            spaceTool.activateSelection(event);
          }
        }
      },
      'global-connect-tool': {
        group: 'tools',
        className: 'bpmn-icon-connection-multi',
        title: translate('Activar herramienta de conexión global'),
        action: {
          click: function(event: any) {
            globalConnect.start(event);
          }
        }
      },
      'tool-separator': {
        group: 'tools',
        separator: true
      },
      'create.start-event': createAction(
        'bpmn:StartEvent',
        'event',
        'bpmn-icon-start-event-none',
        'Crear Evento de Inicio'
      ),
      'create.end-event': createAction(
        'bpmn:EndEvent',
        'event',
        'bpmn-icon-end-event-none',
        'Crear Evento Final'
      ),
      'create.task': createAction(
        'bpmn:Task',
        'activity',
        'bpmn-icon-task',
        'Crear Tarea'
      ),
      'create.user-task': createAction(
        'bpmn:UserTask',
        'activity',
        'bpmn-icon-user-task',
        'Crear Tarea de Usuario'
      ),
      'create.service-task': createAction(
        'bpmn:ServiceTask',
        'activity',
        'bpmn-icon-service-task',
        'Crear Tarea de Servicio'
      ),
      'create.exclusive-gateway': createAction(
        'bpmn:ExclusiveGateway',
        'gateway',
        'bpmn-icon-gateway-xor',
        'Crear Gateway Exclusivo'
      ),
      'create.parallel-gateway': createAction(
        'bpmn:ParallelGateway',
        'gateway',
        'bpmn-icon-gateway-parallel',
        'Crear Gateway Paralelo'
      ),
      'create.subprocess-expanded': {
        group: 'activity',
        className: 'bpmn-icon-subprocess-expanded',
        title: translate('Crear Subproceso Expandido'),
        action: {
          dragstart: createSubprocess,
          click: createSubprocess
        }
      }
    });

    return actions;
  }
}
