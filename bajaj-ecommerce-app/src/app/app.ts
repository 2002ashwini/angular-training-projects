import { Component, signal } from '@angular/core';
import { NavBar } from './shared/components/nav-bar/nav-bar';
import { Footer } from './shared/components/footer/footer';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { RouterOutlet } from "@angular/router";
@Component({
  selector: 'bajaj-root',
  imports: [NavBar , Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bajaj-ecommerce-app');
}
