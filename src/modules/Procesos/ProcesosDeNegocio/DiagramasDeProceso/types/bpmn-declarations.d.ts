// Declaraciones de tipos para módulos sin tipos TypeScript

declare module 'bpmn-js-task-resize/lib' {
  const resizeTask: any
  export default resizeTask
}

declare module 'html-to-image' {
  export function toPng(node: HTMLElement | SVGElement, options?: any): Promise<string>
  export function toJpeg(node: HTMLElement | SVGElement, options?: any): Promise<string>
  export function toBlob(node: HTMLElement | SVGElement, options?: any): Promise<Blob>
  export function toPixelData(node: HTMLElement | SVGElement, options?: any): Promise<Uint8ClampedArray>
  export function toSvg(node: HTMLElement | SVGElement, options?: any): Promise<string>
}
