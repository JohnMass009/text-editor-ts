import {getStrWithFirstUpperLetter} from '@core/utils';
import {DomManager} from '@core/DomManager';

export class EventListener {
  selector: string;
  listeners: any[];

  constructor(selector: string, listeners: any[] = []) {
    this.selector = selector;
    this.listeners = listeners;
  }

  initListeners($element: HTMLElement) {
    this.listeners.forEach((listener) => {
      const nameFunc = getMethodName(listener);
      const component: any = this;
      if (!component[nameFunc])
        throw Error(`Method ${nameFunc} is not implemented in ${this.constructor.name}`);

      component[nameFunc] = component[nameFunc].bind(this);
      DomManager.addEvent($element, listener, component[nameFunc]);
    });
  }

  removeListeners($element: HTMLElement) {
    this.listeners.forEach((listener) => {
      const nameFunc = getMethodName(listener);
      const component: any = this;
      if (!component[nameFunc])
        throw Error(`Method ${nameFunc} is not implemented in ${this.constructor.name}`);

      DomManager.removeEvent($element, listener, component[nameFunc]);
    });
  }
}

const getMethodName = (eventName: string): string => {
  return 'on' + getStrWithFirstUpperLetter(eventName);
};