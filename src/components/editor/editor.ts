import {Component} from "@core/Component";

export class Editor extends Component {
  components: any[] = [];
  constructor(tagName: string = 'div',
              classes: string[] | null = null,
              props: object | null = null,
              components: any[] | null = null,
              eventListeners: any[] | null = null) {
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
    this.content.push(`<h1>Editor Component</h1>`);

    return super.createContent();
  }

  render(): HTMLElement {
    const content = this.createContent();
    this.initEvents();

    return super.render(content);
  }
}