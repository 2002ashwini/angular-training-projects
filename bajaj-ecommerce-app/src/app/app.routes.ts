
import { Routes } from "@angular/router";

import { EpHome } from "./features/home/ep-home/ep-home";
import { ProductsList } from "./features/products/components/products-list/products-list";
import { Login } from "./features/security/components/login/login";
import { CategoriesListComponent } from "./features/categories/components/categories-list/categories-list";
import { CartList } from "./features/carts/components/cart-list/cart-list";
import { Register } from "./features/security/components/register/register";
import { RegisterCategory } from "./features/categories/components/register-category/register-category";

import { adminGuard } from "./auth/gurds/admin.gurd";
import { authGuard } from "./auth/gurds/auth.gurd";

import { Checkout } from "./features/orders/components/checkout/checkout";

export const routes: Routes = [
  {
    path: "",
    component: EpHome,
    title: "Bajaj EP Home",
  },
  {
    path: "home",
    component: EpHome,
    title: "Bajaj EP Home",
  },
  {
    path: "products",
    component: ProductsList,
    title: "Products List",
  },
  { path: 'checkout', canActivate: [authGuard], loadComponent: () => import("./features/orders/components/checkout/checkout").then(m => m.Checkout) },
  { path: 'orders', canActivate: [authGuard], loadComponent: () => import('./features/orders/components/my-orders/my-orders').then(m => m.MyOrders) },
  { path: 'orders/:id', canActivate: [authGuard], loadComponent: () => import('./features/orders/components/order-details/order-details').then(m => m.OrderDetails) },

  {
    path: "categories",
    component: CategoriesListComponent,
    title: "Categories",
  },
  {
    path: 'categories/register',
    component: RegisterCategory,
    title: "category-registration",
    canActivate: [adminGuard]

  },

  {
    path: "carts",
    component: CartList,
    title: "Carts"

  },
  {
    path: "login",
    component: Login,
    title: "Login",
  },
  {
    path: 'register',
    component: Register,
    title: "registration"

  },

  {
    path: "**", 
    redirectTo: "",
  },
];
