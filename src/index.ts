import './scss/index.scss';
import {App} from '@components/app/app';
import {DomManager} from '@core/DomManager';

const rootSelector : string = '#root';
const rootElement = DomManager.findElement(rootSelector);

const appComponent = new App('app');
DomManager.render(appComponent.render(), rootElement)