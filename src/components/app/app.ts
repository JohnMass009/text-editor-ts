import {Topbar} from '@components/topbar/topbar';
import {Toolbar} from "@components/toolbar/toolbar";
import {Component} from "@core/Component";
import {Editor} from "@components/editor/editor";
import {StoreSubscriber} from "@/redux/StoreSubscriber";

export class App extends Component {
  public store: object = {};
  constructor(tagName: string = 'div',
              classes: string[] | null = null,
              props: object | null = null,
              components: any[] | null = null,
              eventListeners: any[] | null = null) {
    super(tagName, classes, props, eventListeners);

    if (components) {
      this.components = components;
    }

    if (this.props && 'store' in this.props) {
      this.store = this.props.store;
      const storeSubscriber = new StoreSubscriber(this.store);
    }
  }

  onInput(event: Event) {
    console.log(event)
  }

  onClick(event: Event) {
    console.log(this)
  }

  createContent(): any[] | null {
    this.content.push(`<h3>App Component</h3>`);

    const topbar = new Topbar(
                    'div',
                  ['topbar'],
                      null,
                null,
              ['input', 'click']);
    const toolbar = new Toolbar(
                      'div',
                    ['toolbar'],
                        null,
                  null,
                ['click']);
    const editor = new Editor(
                    'div',
                  ['editor'],
                      null,
                null,
              ['click']);
    this.components.push(topbar, toolbar, editor);

    return super.createContent();
  }

  render(): HTMLElement {
    const content = this.createContent();
    this.initEvents();

    return super.render(content);
  }
}