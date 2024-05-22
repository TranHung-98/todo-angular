import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private queue: { title: string; icon: string; duration: number }[] = [];
  private isOpened: boolean = false;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  open(config: { title: string; icon: string; }, duration: number = 3000) {
    this.queue.push({ title: config.title, icon: config.icon, duration });
    if (!this.isOpened) {
      this.showNextToast();
    }
  }

  private showNextToast(): void {
    if (this.queue.length === 0) {
      this.isOpened = false;
      return;
    }

    this.isOpened = true;
    const config = this.queue.shift()!;
    const toastFactory = this.resolver.resolveComponentFactory(ToastComponent);
    const toastComponentRef = toastFactory.create(this.injector);

    toastComponentRef.instance.title = config.title;
    toastComponentRef.instance.icon = config.icon;

    this.appRef.attachView(toastComponentRef.hostView);
    const domElem = (toastComponentRef.hostView as EmbeddedViewRef<Node[]>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    setTimeout(() => {
      this.appRef.detachView(toastComponentRef.hostView);
      toastComponentRef.destroy();
      this.showNextToast();
    }, config.duration);
  }
}
