import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone:true, 
  imports: [RouterOutlet, Navbar, Footer],
  template: `
  <app-navbar />
  <main>
    <router-outlet />
  </main>
  <app-footer />`,
  styles: [`
    main {
    min-height: calc(100vh - 70px);
    background: var(--surface-2);}`]
})
export class App {
}
