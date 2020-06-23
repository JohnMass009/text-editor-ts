import './styles/index.scss';
import {App} from '@components/app/app';
import {DomManager} from '@core/DomManager';
import {createStore} from "@/redux/store";
import {rootReducer} from "@/redux/root-reducer";
import {defaultState} from '@/constants';
import {debounce, toSessionStorage} from "@core/utils";
import {ObjectAny} from "@core/types";

const initialState = toSessionStorage('123') || defaultState;

const store = createStore(rootReducer, initialState)

const callbackDebounce = debounce((state: ObjectAny) => {
  toSessionStorage('text-editor_state', state);
}, 500);
store.subscribe(callbackDebounce);

const rootSelector : string = '#root';
const rootElement = DomManager.findElement(rootSelector);

const appComponent = new App('div',['app'],{store});

DomManager.render(appComponent.render(), rootElement);