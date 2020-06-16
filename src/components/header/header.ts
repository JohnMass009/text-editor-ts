import {IComponent} from '@interfaces/icomponent';
import {DomManager} from "@core/DomManager";
import {Component} from "@core/Component";
import {Toolbar} from "@components/toolbar/toolbar";

export class Header extends Component implements IComponent {
  components: any[] = [];
  constructor(tagName: string = 'div',
              className: string[] | null = null,
              components: any[] | null = [],
              eventListeners: any[] = []) {
    super(tagName, className, eventListeners);

    if (components) {
      this.components = components;
    }
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

  createContent(): any[] | null {
    const content = [];
    content.push(`<h2>Header Component</h2>`);

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