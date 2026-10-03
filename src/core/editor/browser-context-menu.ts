/** Suppress the browser menu without interfering with right-button viewport gestures. */
export function suppressBrowserContextMenu(event: Event): void {
  event.preventDefault();
}
