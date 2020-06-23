import {ObjectAny} from "@core/types";

export class DomManager {
  private $element: HTMLElement;

  constructor(element: HTMLElement | string) {
    this.$element = typeof element === 'string'
      ? DomManager.findElement(element)
      : element;
  }

  static createDomComponent(tagName: string,
                       classes: string[] | null = null): DomManager {
    let $element = document.createElement(tagName);

    if (classes)
      $element.classList.add(...classes);

    return new DomManager($element);
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

    if (typeof node === 'string')
      $root.insertAdjacentHTML('beforeend', node);
    else
      $root.append(node);
  }

  get getElement() {
    return this.$element;
  }

  addEvent(eventType: string, callback: EventListener): void {
    this.$element.addEventListener(eventType, callback);
  }

  removeEvent(eventType: string, callback: EventListener): void {
    this.$element.removeEventListener(eventType, callback);
  }

  insertChild(node: HTMLElement | string): void {
    if (typeof node === 'string')
      this.$element.insertAdjacentHTML('beforeend', node);
    else
      this.$element.append(node);
  }

  returnHtmlElement(children: any[] | null = []): HTMLElement {
    if (children) {
      children.forEach((child) => {
        this.insertChild(child);
      });
    }

    return this.$element;
  }

  findParent(selector: string) {
    return this.$element.closest(selector);
  }

  getSize() {
    const { width, height } = this.$element.getBoundingClientRect();
    return { width, height };
  }

  getCoordinates() {
    const { left, right, top, bottom } = this.$element.getBoundingClientRect();
    return { left, right, top, bottom };
  }

  getDataAtr(selector: string) {
    return this.$element.dataset[selector];
  }

  setDataAtr(selector: string, value: string) {
    this.$element.dataset[selector] = value;
  }

  getValueStyle(style: string) {
    return window.getComputedStyle(this.$element).getPropertyValue(style);
  }

  setStyles(styles: ObjectAny = {}) {
    Object.keys(styles).forEach((key: string) => {
      this.$element.style.setProperty(key, styles[key]);
    });
  }

  setClass(className: string) {
    this.$element.classList.add(className);
  }

  removeClass(className: string) {
    this.$element.classList.remove(className);
  }

  focus() {
    this.$element.focus();
  }
}