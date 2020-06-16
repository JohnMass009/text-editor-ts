export interface IComponent {
  className: string[] | null;
  components: any[];
  createContent: () => any[] | null
  render: () => HTMLElement;
}