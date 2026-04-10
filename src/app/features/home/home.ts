import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {
  currencySymbol = environment.currencySymbol;

  // Banner slider
  currentBanner = signal(0);
  private bannerInterval: any;

  banners = [
    {
      title: "Fresh Arrivals in Kitchenware",
      subtitle: "Upgrade your kitchen with premium tools",
      btn: "Shop Kitchenware",
      slug: "kitchenware",
      bg: "#f0f7ee",
      accent: "#2d7a4f",
      emoji: "🍳"
    },
    {
      title: "Gift Items for Every Occasion",
      subtitle: "Find the perfect gift for your loved ones",
      btn: "Shop Gift Items",
      slug: "gift-items",
      bg: "#fef9ee",
      accent: "#92702a",
      emoji: "🎁"
    },
    {
      title: "Lighting Solutions for Your Home",
      subtitle: "Brighten every corner beautifully",
      btn: "Shop Lighting",
      slug: "lighting",
      bg: "#eef4ff",
      accent: "#1a56db",
      emoji: "💡"
    },
    {
      title: "Quality Umbrellas for Every Season",
      subtitle: "Stay dry and stylish all year round",
      btn: "Shop Umbrellas",
      slug: "umbrellas",
      bg: "#fdf2f8",
      accent: "#9333ea",
      emoji: "☂️"
    }
  ];

  categories = [
    { name: 'Kitchenware', slug: 'kitchenware', emoji: '🍳', color: '#fff8f0', border: '#f97316' },
    { name: 'Aluminium', slug: 'aluminium', emoji: '🪣', color: '#f0f9ff', border: '#0ea5e9' },
    { name: 'Plastic', slug: 'plastic', emoji: '🧴', color: '#f0fdf4', border: '#22c55e' },
    { name: 'Gift Items', slug: 'gift-items', emoji: '🎁', color: '#fdf4ff', border: '#a855f7' },
    { name: 'Umbrellas', slug: 'umbrellas', emoji: '☂️', color: '#eff6ff', border: '#3b82f6' },
    { name: 'Lighting', slug: 'lighting', emoji: '💡', color: '#fefce8', border: '#eab308' },
    { name: 'General', slug: 'general', emoji: '🛒', color: '#fff1f2', border: '#f43f5e' },
  ];

  // Widget sections like Amazon
  widgets = [
    {
      title: 'Top in Kitchenware',
      slug: 'kitchenware',
      products: [
        { id: 1, name: 'Non-Stick Pan', price: 1850, emoji: '🍳' },
        { id: 2, name: 'Knife Set', price: 2800, emoji: '🔪' },
        { id: 3, name: 'Cutting Board', price: 950, emoji: '🪵' },
        { id: 4, name: 'Bowl Set', price: 1200, emoji: '🥣' },
      ]
    },
    {
      title: 'Popular Gift Items',
      slug: 'gift-items',
      products: [
        { id: 5, name: 'Gift Hamper', price: 3500, emoji: '🎁' },
        { id: 6, name: 'Candle Set', price: 1800, emoji: '🕯️' },
        { id: 7, name: 'Photo Frame', price: 1200, emoji: '🖼️' },
        { id: 8, name: 'Mug Set', price: 950, emoji: '☕' },
      ]
    },
    {
      title: 'Lighting Solutions',
      slug: 'lighting',
      products: [
        { id: 9, name: 'LED Bulb Pack', price: 850, emoji: '💡' },
        { id: 10, name: 'Ceiling Light', price: 2200, emoji: '🔆' },
        { id: 11, name: 'Table Lamp', price: 1800, emoji: '🪔' },
        { id: 12, name: 'Night Light', price: 650, emoji: '✨' },
      ]
    },
    {
      title: 'Aluminium Products',
      slug: 'aluminium',
      products: [
        { id: 13, name: 'Storage Bin', price: 2400, emoji: '🪣' },
        { id: 14, name: 'Aluminium Ladder', price: 8500, emoji: '🪜' },
        { id: 15, name: 'Water Bucket', price: 750, emoji: '🧺' },
        { id: 16, name: 'Storage Rack', price: 3200, emoji: '🗄️' },
      ]
    }
  ];

  featuredProducts = [
    { id: 1, name: 'Non-Stick Frying Pan', category: 'Kitchenware', price: 1850, originalPrice: 2200, badge: 'Best Seller', emoji: '🍳' },
    { id: 2, name: 'Aluminium Storage Bin', category: 'Aluminium', price: 2400, originalPrice: null, badge: 'New', emoji: '🪣' },
    { id: 3, name: 'Gift Hamper Set', category: 'Gift Items', price: 3500, originalPrice: 4000, badge: 'Sale', emoji: '🎁' },
    { id: 4, name: 'LED Ceiling Light', category: 'Lighting', price: 1200, originalPrice: null, badge: null, emoji: '💡' },
    { id: 5, name: 'Folding Umbrella', category: 'Umbrellas', price: 950, originalPrice: 1100, badge: 'Sale', emoji: '☂️' },
    { id: 6, name: 'Plastic Storage Box', category: 'Plastic', price: 650, originalPrice: null, badge: null, emoji: '🧴' },
    { id: 7, name: 'Kitchen Knife Set', category: 'Kitchenware', price: 2800, originalPrice: 3200, badge: 'Best Seller', emoji: '🔪' },
    { id: 8, name: 'Aluminium Ladder', category: 'Aluminium', price: 8500, originalPrice: null, badge: 'New', emoji: '🪜' },
    { id: 9, name: 'Candle Gift Set', category: 'Gift Items', price: 1800, originalPrice: 2100, badge: 'Sale', emoji: '🕯️' },
    { id: 10, name: 'LED Bulb Pack', category: 'Lighting', price: 850, originalPrice: null, badge: null, emoji: '💡' },
  ];

  ngOnInit() {
    this.bannerInterval = setInterval(() => {
      this.currentBanner.set((this.currentBanner() + 1) % this.banners.length);
    }, 4000);
  }

  ngOnDestroy() {
    clearInterval(this.bannerInterval);
  }

  setBanner(index: number) {
    this.currentBanner.set(index);
  }

  addToCart(product: any) {
    console.log('Added to cart:', product);
  }
}