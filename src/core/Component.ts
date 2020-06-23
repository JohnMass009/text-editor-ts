import {EventListener} from "@core/EventListener";
import {DomManager} from "@core/DomManager";
import {IComponent} from "@interfaces/icomponent";
import {ObjectAny} from "@core/types";

export abstract class Component extends EventListener implements IComponent {
  public classes: string[] | null;
  public props: ObjectAny | null;

  private $domComponent: DomManager;
  private propsListeners: string[] = [];

  protected components: any[] = [];
  protected content: any[] = [];

  constructor(tagName: string,
              classes: string[] | null = null,
              props: ObjectAny | null = null,
              eventListeners: any[] | null = null) {
    super(eventListeners);
    this.classes = classes;

    this.props = props;
    if (this.props && 'propsListeners' in this.props) {
      this.propsListeners = this.props.propsListeners;
    }

    this.$domComponent = DomManager.createDomComponent(tagName, this.classes);
  }

  initEvents() {
    this.initListeners(this.$domComponent)
  }

  removeEvents() {
    this.removeListeners(this.$domComponent)
  }

  isWatchingProps(prop: string) {
    return this.propsListeners.includes(prop);
  }

  propsChanged(props: ObjectAny): void {
    console.log('Changed:', props);
  }

  createContent(): any[] | null {
    if (this.components)
      this.components.forEach((component) => {
        this.content.push(component.render());
      });

    return this.content;
  }

  render(content: any[] | null): HTMLElement {
    return this.$domComponent.returnHtmlElement(content);
  }
}