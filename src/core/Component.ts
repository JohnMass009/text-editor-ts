import {EventListener} from "@core/EventListener";
import {DomManager} from "@core/DomManager";

export abstract class Component extends EventListener {
  public className: string[] | null;
  private $domComponent: DomManager;

  constructor(tagName: string,
              className: string[] | null = null,
              eventListeners: any[] | null = null) {
    super(eventListeners);
    this.className = className;
    this.$domComponent = DomManager.createDomComponent(tagName, this.className);
  }

  initEvents() {
    this.initListeners(this.$domComponent)
  }

  removeEvents() {
    this.removeListeners(this.$domComponent)
  }

  render(content: any[] | null): HTMLElement {
    return this.$domComponent.returnHtmlElement(content);
  }
}