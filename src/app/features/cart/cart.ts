import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  currencySymbol = environment.currencySymbol;

  cartItems = signal([
    { id: 1, name: 'Non-Stick Frying Pan', category: 'Kitchenware', price: 1850, quantity: 1, emoji: '🍳' },
    { id: 11, name: 'Gift Hamper Set', category: 'Gift Items', price: 3500, quantity: 2, emoji: '🎁' },
    { id: 14, name: 'Folding Umbrella', category: 'Umbrellas', price: 950, quantity: 1, emoji: '☂️' },
  ]);

  promoCode = signal('');
  promoApplied = signal(false);
  promoDiscount = signal(0);

  subtotal = computed(() => 
  this.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0))

  discount = computed(() => 
    this.promoApplied() ? this.promoDiscount() : 0
  );

  deliveryFee = computed(() => 
  this.subtotal() > 5000 ? 0: 350);

  total = computed(() => 
  this.subtotal() - this.discount() + this.deliveryFee());

  totalItems = computed(() => 
  this.cartItems().reduce((sum, item) => sum + item.quantity, 0));

  increaseQty(id: number) {
    this.cartItems.update(items => 
      items.map(item => 
        item.id === id ? {...item, quantity: item.quantity + 1} : item
      )
    )
  }

  decreaseQty(id: number) {
    this.cartItems.update(items => 
      items.map(item => 
        item.id === id && item.quantity > 1 ?
         { ...item, quantity: item.quantity - 1} : item
      )
    );
  }

  removeItem(id: number) {
    this.cartItems.update(items => items.filter(item => item.id !== id));
  }

  applyPromo() {
    const code = this.promoCode().trim().toUpperCase();

    if(code === 'SAVE10') {
      this.promoDiscount.set(Math.round(this.subtotal() * 0.1));
      this.promoApplied.set(true);
    } else if (code === 'FLAT500') {
      this.promoDiscount.set(500);
      this.promoApplied.set(true);
    } else {
      this.promoApplied.set(false);
      this.promoDiscount.set(0);
      alert('Invalid promo code');
    }
  }

  removePromo() {
    this.promoCode.set('');
    this.promoApplied.set(false);
    this.promoDiscount.set(0);
  }

  onPromoInput(event: Event) {
    this.promoCode.set((event.target as HTMLInputElement).value);
  }

  clearCart() {
    this.cartItems.set([]);
  }
};

 