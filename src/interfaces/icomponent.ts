export interface IComponent {
  className: string;
  components: any[];
  render: () => HTMLElement;
}