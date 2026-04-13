import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";




export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'RETAIL' | 'WHOLESALE' | 'ADMIN';
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    currentUser = signal<User | null> (null);
    isLoggedIn = signal(false);

    constructor(private router: Router) {
        this.loadFromStorage();
    }

    private loadFromStorage() {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                this.currentUser.set(user);
                this.isLoggedIn.set(true);
            } catch {
                this.logout();
            }
        }
    }

    login(email: string, password: string) : boolean {
        let mockUser: User | null = null;

        if (email === 'admin@ghanim.lk' && password === 'admin123') {
            mockUser = {id: 1, firstName: 'Admin', lastName: 'User', email, role: 'ADMIN'};
        } else if (email === 'wholesale@ghanim.lk' && password === 'wholesale123') {
            mockUser = {id: 2, firstName: 'wholesale', lastName: 'Customer', email, role: 'WHOLESALE'};
        } else if (email && password) {
            mockUser = { id: 3, firstName: 'Retail', lastName: 'Customer', email, role: 'RETAIL'};
        }

        if (mockUser) {
            const mockToken = btoa(JSON.stringify({user: mockUser, exp: Date.now() + 86400000}));
            localStorage.setItem('token', mockToken);
            localStorage.setItem('role', mockUser.role);
            localStorage.setItem('user', JSON.stringify(mockUser));
            this.currentUser.set(mockUser);
            this.isLoggedIn.set(true);
            return true;
        }

        return false;
     }

     logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        this.currentUser.set(null);
        this.isLoggedIn.set(false);
        this.router.navigate(['/']);
     }

     get role(): string {
        return localStorage.getItem('role') || '';
     }

     get isAdmin(): boolean {
        return this.role === 'ADMIN';
     }

     get isWholesale(): boolean {
        return this.role === 'WHOLESALE';
     }

     get isRetail(): boolean {
        return this.role === 'RETAIL';
     }
}