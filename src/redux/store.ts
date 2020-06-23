export function createStore(rootReducer: Function, initialState: object = {}) {
  let state = initialState;
  let listeners: Function[] = [];
  return {
    subscribe(fn: Function): object {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners.filter((listener) => listener !== fn)
        }
      }
    },
    dispatch(action: string): void {
      state = rootReducer({...state}, action);
      listeners.forEach((listener) => listener());
    },
    getState(): object {
      return JSON.parse(JSON.stringify(state));
    }
  };
}