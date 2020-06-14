import {IComponent} from '@interfaces/icomponent';
import {DomManager} from "@core/DomManager";
import {EventListener} from "@core/EventListener";

export class Header extends EventListener implements IComponent {
  className: string;
  components: any[];
  constructor(className: string,
              components: any[] = [],
              eventListeners: any[] = []) {
    super(className, ['input', 'click']);
    this.className = className;
    this.components = components;

    this.initChilds();
  }

  initChilds(): void {
    this.components.push();
  }

  onInput(event: Event) {
    console.log(event)
  }

  onClick(event: Event) {
    console.log(this)
  }

  renderContent() {
    const content = [];
    content.push('Header Component');
    if (this.components) {
      this.components.forEach((component) => {
        content.push(component.render())
      });
    }

    return content;
  }

  render(): HTMLElement {
    const $renderedElement = DomManager.createElement('div',
      [this.className],
      this.renderContent());
    this.initListeners($renderedElement);
    return $renderedElement
  }
}