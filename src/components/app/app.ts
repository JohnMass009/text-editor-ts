import {IComponent} from '@interfaces/icomponent';
import {Header} from '@components/header/header';
import {Toolbar} from "@components/toolbar/toolbar";
import {Component} from "@core/Component";

export class App extends Component implements IComponent {
  components: any[] = [];
  constructor(tagName: string = 'div',
              className: string[] | null = null,
              components: any[] | null = null,
              eventListeners: any[] | null = null) {
    super(tagName, className, eventListeners);

    if (components) {
      this.components = components;
    }
  }

  onInput(event: Event) {
    console.log(event)
  }

  onClick(event: Event) {
    console.log(this)
  }

  createContent(): any[] | null {
    const content = [];
    content.push(`<h1>App Component</h1>`);

    const header = new Header('div',
                  null,
                 null,
              ['input', 'click']);
    const toolbar = new Toolbar('div',
                    ['toolbar'],
                   null,
                 ['click']);
    this.components.push(header, toolbar);

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