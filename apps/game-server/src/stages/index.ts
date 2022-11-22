import cuid from 'cuid';

export class Stage {
  static instances: Map<string, Stage> = new Map();

  id = cuid();

  constructor(public callbackUrl: string) {
    Stage.instances.set(this.id, this);
  }

  destroy() {
    Stage.instances.delete(this.id);
  }
}
