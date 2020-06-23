import {getStrWithFirstUpperLetter} from '@core/utils';
import {DomManager} from '@core/DomManager';

export class EventListener {
  public eventListeners: any[] | null;

  constructor(eventListeners: any[] | null = null) {
    this.eventListeners = eventListeners;
  }

  protected initListeners($element: DomManager) {
    if (this.eventListeners)
      this.eventListeners.forEach((eventListener) => {
        const nameFunc = getMethodName(eventListener);
        const component: any = this;
        if (!component[nameFunc])
          throw Error(`Method ${nameFunc} is not implemented in ${this.constructor.name}`);

        component[nameFunc] = component[nameFunc].bind(this);
        $element.addEvent(eventListener, component[nameFunc]);
      });
  }

  protected removeListeners($element: DomManager) {
    if (this.eventListeners)
      this.eventListeners.forEach((eventListener) => {
        const nameFunc = getMethodName(eventListener);
        const component: any = this;
        if (!component[nameFunc])
          throw Error(`Method ${nameFunc} is not implemented in ${this.constructor.name}`);

        $element.removeEvent(eventListener, component[nameFunc]);
      });
  }
}

const getMethodName = (eventName: string): string => {
  return 'on' + getStrWithFirstUpperLetter(eventName);
};