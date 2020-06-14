import {IComponent} from '@interfaces/icomponent';
import {DomManager} from "@core/DomManager";
import {EventListener} from "@core/EventListener";

export class Toolbar extends EventListener implements IComponent{
  className: string;
  components: any[];

  constructor(className: string,
              components: any[] = [],
              eventListeners: any[] = []) {
    super(className, eventListeners)

    this.className = className;
    this.components = components;

    this.initChilds();
  }

  initChilds() : void {
    this.components.push();
  }

  renderContent() {
    const content = [];
    content.push('Toolbar Component');
    if (this.components) {
      this.components.forEach((component) => {
        content.push(component.render())
      });
    }

    return content;
  }

  render() : HTMLElement {
    return DomManager.createElement('div',
      [this.className],
      this.renderContent());
  }
}