import {getStrWithFirstUpperLetter} from '@core/utils';
import {DomManager} from '@core/DomManager';

export class EventListener {
  listeners: any[] | null;

  constructor(listeners: any[] | null = null) {
    this.listeners = listeners;
  }

  protected initListeners($element: DomManager) {
    if (this.listeners)
      this.listeners.forEach((listener) => {
        const nameFunc = getMethodName(listener);
        const component: any = this;
        if (!component[nameFunc])
          throw Error(`Method ${nameFunc} is not implemented in ${this.constructor.name}`);

        component[nameFunc] = component[nameFunc].bind(this);
        $element.addEvent(listener, component[nameFunc]);
      });
  }

  protected removeListeners($element: DomManager) {
    if (this.listeners)
      this.listeners.forEach((listener) => {
        const nameFunc = getMethodName(listener);
        const component: any = this;
        if (!component[nameFunc])
          throw Error(`Method ${nameFunc} is not implemented in ${this.constructor.name}`);

        $element.removeEvent(listener, component[nameFunc]);
      });
  }
}

const getMethodName = (eventName: string): string => {
  return 'on' + getStrWithFirstUpperLetter(eventName);
};