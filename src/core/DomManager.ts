export class DomManager {
  private $element: Element;

  constructor(selector: Element | string) {
    this.$element = typeof selector === 'string'
      ? DomManager.findElement(selector)
      : selector;
  }

  static createElement(tagName: string,
                       classes: string[] = [],
                       children: any[] = []): HTMLElement {
    let $element = document.createElement(tagName);

    if (classes)
      $element.classList.add(...classes);

    if (children) {
      children.forEach((child) => {
        $element = DomManager.append(child, $element);
      });
    }

    return $element;
  }

  static append(node: HTMLElement | string, rootElement: HTMLElement) {
    if (typeof node === 'string')
      rootElement.insertAdjacentHTML('beforeend', node);
    else
      rootElement.append(node);

    return rootElement;
  }

  static findElement(selector: string): HTMLElement {
    const $elem = document.querySelector(selector);
    if(!$elem)
      throw new Error(`Element ${selector} is not found`);

    return $elem as HTMLElement;
  }

  static render(node: HTMLElement | string, rootElement: HTMLElement | string): void {
    let $root;

    if (typeof rootElement === 'string')
      $root = DomManager.findElement(rootElement);
    else
      $root = rootElement;

    DomManager.append(node, $root);
  }

  static addEvent(element: HTMLElement, eventType: string, callback: EventListener): void {
    element.addEventListener(eventType, callback);
  }

  static removeEvent(element: HTMLElement, eventType: string, callback: EventListener): void {
    element.removeEventListener(eventType, callback);
  }
}