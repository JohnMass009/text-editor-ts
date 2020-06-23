import {Component} from "@core/Component";

export class Topbar extends Component {
  constructor(tagName: string = 'div',
              classes: string[] | null = null,
              props: object | null = null,
              components: any[] | null = [],
              eventListeners: any[] = []) {
    super(tagName, classes, props, eventListeners);

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
    this.content.push(`<h3>Topbar Component</h3>`);

    return super.createContent();
  }

  render(): HTMLElement {
    const content = this.createContent();
    this.initEvents();

    return super.render(content);
  }
}