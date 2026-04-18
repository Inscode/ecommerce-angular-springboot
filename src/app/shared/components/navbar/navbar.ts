import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';  
import { CartService } from '../../../core/services/cart.service';  

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  shopName = environment.shopName;
  searchQuery = signal('');
  menuOpen = signal(false);

  categories = [
    { name: 'All', slug: '' },
    { name: 'Kitchenware', slug: 'kitchenware' },
    { name: 'Aluminium', slug: 'aluminium' },
    { name: 'Plastic', slug: 'plastic' },
    { name: 'Gift Items', slug: 'gift-items' },
    { name: 'Umbrellas', slug: 'umbrellas' },
    { name: 'Lighting', slug: 'lighting' },
    { name: 'General', slug: 'general' },
    { name: "Today's Deals", slug: 'deals' },
  ];

  constructor(public authService: AuthService, public cartService: CartService) {}

  onSearch() {
    console.log('Search:', this.searchQuery());
  }

  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
  }

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  logout() {this.authService.logout();}
}