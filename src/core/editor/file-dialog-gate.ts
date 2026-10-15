export class FileDialogGate {
  private active = false;
  constructor(private readonly onChange: (active: boolean) => void) {}
  tryOpen(): boolean {
    if (this.active) return false;
    this.active = true; this.onChange(true); return true;
  }
  close(): void {
    if (!this.active) return;
    this.active = false; this.onChange(false);
  }
  isOpen(): boolean { return this.active; }
  async run<T>(choose: () => Promise<T>): Promise<T | null> {
    if (!this.tryOpen()) return null;
    try { return await choose(); } finally { this.close(); }
  }
}
