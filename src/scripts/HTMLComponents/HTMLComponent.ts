export interface Component {
  show: () => void;
  hide: () => void;
  on(event: string, cb: () => void);
}