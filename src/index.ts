import './scss/index.scss';
import {App} from '@components/app/app';
import {DomManager} from '@core/DomManager';

const rootSelector : string = '#root';
const rootElement = DomManager.findElement(rootSelector);

const appComponent = new App(
                    'div',
                  ['app'],
                  null,
);

DomManager.render(appComponent.render(), rootElement)