import {Component} from "@core/Component";

export class Toolbar extends Component {
  components: any[] = [];
  constructor(tagName: string = 'div',
              classes: string[] | null = [],
              props: object | null = null,
              components: any[] | null = [],
              eventListeners: any[] = []) {
    super(tagName, classes, props, eventListeners);

    if (components) {
      this.components = components;
    }
  }

  onClick(event: Event) {
    console.log(this)
  }

  createContent(): any[] | null {
    this.content.push(`<h3>Toolbar Component</h3>`);

    return super.createContent();
  }

  render(): HTMLElement {
    const content = this.createContent();
    this.initEvents();

    return super.render(content);
  }
}