import {IComponent} from '@interfaces/icomponent';
import {DomManager} from "@core/DomManager";
import {Header} from '@components/header/header';
import {Toolbar} from "@components/header/toolbar";
import {EventListener} from "@core/EventListener";

export class App extends EventListener implements IComponent {
  className: string;
  components: any[];
  constructor(className: string,
              components: any[] = [],
              eventListeners: any[] = []) {
    super(className, eventListeners);
    this.className = className;
    this.components = components;

    this.initChilds();
  }

  initChilds(): void {
    const header = new Header('header');
    const toolbar = new Toolbar('toolbar');
    this.components.push(header, toolbar);
  }

  renderContent(): any[] {
    const content = [];
    content.push('App Component');
    if (this.components) {
      this.components.forEach((component) => {
        content.push(component.render())
      });
    }

    return content;
  }

  render(): HTMLElement {
    return DomManager
            .createElement('div',
              [this.className],
              this.renderContent());
  }
}