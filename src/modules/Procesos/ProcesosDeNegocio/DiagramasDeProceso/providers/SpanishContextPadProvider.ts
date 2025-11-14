/**
 * Provider personalizado para Context Pad en Español de México
 * Sobrescribe los tooltips y textos de las herramientas del context pad
 */

export default class SpanishContextPadProvider {
  static $inject = ['contextPad', 'create', 'elementFactory', 'injector', 'translate'];

  private contextPad: any;
  private create: any;
  private elementFactory: any;
  private injector: any;
  private translate: any;

  constructor(contextPad: any, create: any, elementFactory: any, injector: any, translate: any) {
    this.contextPad = contextPad;
    this.create = create;
    this.elementFactory = elementFactory;
    this.injector = injector;
    this.translate = translate;
  }

  getContextPadEntries(element: any) {
    const translate = this.translate;
    const elementFactory = this.elementFactory;
    const create = this.create;

    const actions: any = {};

    const startConnect = (event: any, element: any) => {
      const connect = this.injector.get('connect');
      connect.start(event, element);
    }

    const appendAction = (type: string, className: string, title: string, options?: any) => {
      const appendListener = (event: any, element: any) => {
        const shape = elementFactory.createShape(Object.assign({ type: type }, options));
        create.start(event, shape, element);
      }

      return {
        group: 'model',
        className: className,
        title: translate(title),
        action: {
          dragstart: appendListener,
          click: appendListener
        }
      };
    }

    // Traducciones específicas para elementos BPMN
    if (element.type === 'bpmn:Task' || 
        element.type === 'bpmn:UserTask' || 
        element.type === 'bpmn:ServiceTask' ||
        element.type === 'bpmn:ScriptTask' ||
        element.type === 'bpmn:BusinessRuleTask' ||
        element.type === 'bpmn:ManualTask' ||
        element.type === 'bpmn:ReceiveTask' ||
        element.type === 'bpmn:SendTask') {
      
      // Conectar
      actions.connect = {
        group: 'connect',
        className: 'bpmn-icon-connection-multi',
        title: 'Conectar usando flujo de secuencia',
        action: {
          click: startConnect,
          dragstart: startConnect
        }
      };

      // Agregar Tarea
      actions['append.append-task'] = appendAction(
        'bpmn:Task',
        'bpmn-icon-task',
        'Agregar Tarea'
      );

      // Agregar Gateway Exclusivo
      actions['append.gateway'] = appendAction(
        'bpmn:ExclusiveGateway',
        'bpmn-icon-gateway-xor',
        'Agregar Gateway Exclusivo'
      );

      // Agregar Evento Final
      actions['append.end-event'] = appendAction(
        'bpmn:EndEvent',
        'bpmn-icon-end-event-none',
        'Agregar Evento Final'
      );

      // Eliminar
      actions.delete = {
        group: 'edit',
        className: 'bpmn-icon-trash',
        title: 'Eliminar',
        action: {
          click: (event: any, element: any) => {
            const modeling = this.injector.get('modeling');
            modeling.removeElements([element]);
          }
        }
      };
    }

    // Context pad para Lane
    if (element.type === 'bpmn:Lane') {
      actions['append.append-task'] = appendAction(
        'bpmn:Task',
        'bpmn-icon-task',
        'Agregar Tarea al Carril'
      );

      actions['append.user-task'] = appendAction(
        'bpmn:UserTask',
        'bpmn-icon-user-task',
        'Agregar Tarea de Usuario al Carril'
      );

      actions['append.service-task'] = appendAction(
        'bpmn:ServiceTask',
        'bpmn-icon-service-task',
        'Agregar Tarea de Servicio al Carril'
      );

      actions['append.start-event'] = appendAction(
        'bpmn:StartEvent',
        'bpmn-icon-start-event-none',
        'Agregar Evento de Inicio al Carril'
      );

      actions['append.end-event'] = appendAction(
        'bpmn:EndEvent',
        'bpmn-icon-end-event-none',
        'Agregar Evento Final al Carril'
      );

      actions['append.gateway'] = appendAction(
        'bpmn:ExclusiveGateway',
        'bpmn-icon-gateway-xor',
        'Agregar Gateway al Carril'
      );
    }

    return actions;
  }
}
