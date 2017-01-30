function getNumberInPx (n: string) {
  let r = parseInt(n.replace('px', ''), 10);

  return isNaN(r) ? 0 : r;
}


export default class InputField {
  element: HTMLInputElement
  baseCanvas: HTMLCanvasElement
  constructor (parent: HTMLElement, x: number, y: number, length: number) {
    this.element = document.createElement("input");
    this.element.style.position = 'fixed';
    this.element.style.width = `${length}px`;
    this.baseCanvas = parent.getElementsByTagName('canvas')[0];
    (window as any).t = this.baseCanvas
    
    this.move(x, y);
    parent.appendChild(this.element);
  }

  move (x: number, y: number) {
    // Fixme: ensure to have canvas styles
    window.setTimeout(() => {
      this.element.style.left = `${getNumberInPx(this.baseCanvas.style.marginLeft) + x}px`;
      this.element.style.top = `${getNumberInPx(this.baseCanvas.style.marginTop) + y}px`;
    }, 100); 
  }

  value () {
    return this.element.value;
  }

  hide () {
    this.element.style.display = 'none';
  }

  show () {
    this.element.style.display = 'block'
  }

  remove () {
    this.element.remove();
  }
}