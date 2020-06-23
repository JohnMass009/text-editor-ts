import {ArrayComponents, ObjectAny} from "@core/types";
import {isEqual} from "@core/utils";

export class StoreSubscriber {
  private store: any;
  private prevState: ObjectAny;
  private storeSubscribe: ObjectAny;

  constructor(store: object) {
    this.store = store;
    this.prevState = {};
    this.storeSubscribe = {};
  }

  subscribeComponents(components: ArrayComponents) {
    this.prevState = this.store.getState();
    this.storeSubscribe = this.store.subscribe((state: ObjectAny) => {
      Object.keys(state).forEach((key) => {
        if (!isEqual(this.prevState[key], state[key]))
          components.forEach((component) => {
            if (component.isWatchingProps(key)) {
              const change = {[key]: state[key]};
              component.propsChanged(change);
            }
          });
      });
      this.prevState = this.store.getState();
    });
  }

  unsubscribeFromStore() {
    this.storeSubscribe.unsubscribe();
  }
}