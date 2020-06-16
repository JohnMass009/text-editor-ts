import {IComponent} from '@interfaces/icomponent';
import {Component} from "@core/Component";

export class Toolbar extends Component implements IComponent{
  components: any[] = [];
  constructor(tagName: string = 'div',
              className: string[] | null = [],
              components: any[] | null = [],
              eventListeners: any[] = []) {
    super(tagName, className, eventListeners);

    if (components) {
      this.components = components;
    }
  }

  onClick(event: Event) {
    console.log(this)
  }

  createContent(): any[] | null {
    const content = [];
    content.push(`<h3>Toolbar Component</h3>`);

    if (this.components)
      this.components.forEach((component) => {
        content.push(component.render());
      });

    return content;
  }

  render(): HTMLElement {
    const content = this.createContent();
    this.initEvents();

    return super.render(content);
  }
}