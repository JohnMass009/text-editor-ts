import {ObjectAny} from "@core/types";

export interface IComponent {
  classes: string[] | null;
  props: ObjectAny | null;
  isWatchingProps: (key: string) => boolean;
  propsChanged: (props: ObjectAny) => void;
  createContent: () => any[] | null
  render: (content: any[] | null) => HTMLElement;
}