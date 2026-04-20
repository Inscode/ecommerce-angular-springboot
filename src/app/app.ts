import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { Chatbot } from './shared/components/chatbot/chatbot';

@Component({
  selector: 'app-root',
  standalone:true, 
  imports: [RouterOutlet, Navbar, Footer, CommonModule, Chatbot],
  template: `
  <app-navbar *ngIf="showLayout()" />
  <main>
    <router-outlet />
  </main>
  <app-footer *ngIf="showLayout()" />
  <app-chatbot *ngIf="showLayout()" />`,
  styles: [`
    main {
    min-height: calc(100vh - 70px);
    background: var(--surface-2);}`]
})
export class App {
  showLayout = signal(true);

  private authRoutes = ['/auth/login', '/auth/register', '/admin'];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const isAuthRoute = this.authRoutes.some(route => 
        event.urlAfterRedirects.startsWith(route)
      );
      this.showLayout.set(!isAuthRoute);
    })
  }
}
