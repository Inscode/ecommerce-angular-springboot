import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./features/home/home').then(m => m.Home)
    },
    {   
        path: 'products',
        loadComponent: () => 
            import('./features/products/products').then(m => m.Products)
    },

    {
        path: 'products/:id',
        loadComponent: () => 
            import('./features/products/product-detail/product-detail').then(m => m.ProductDetail)
    }, 

    {
        path: 'cart',
        loadComponent: () => 
            import('./features/cart/cart').then(m => m.Cart)
    },

    {
        path: 'auth/login',
        loadComponent: () => 
        import('./features/auth/login/login').then(m => m.Login)   
     },

     {
        path: 'auth/register',
        loadComponent: () => 
            import('./features/auth/register/register').then(m => m.Register)
        
     },
    
    {
        path: "**",
        redirectTo: ''
    }
];
