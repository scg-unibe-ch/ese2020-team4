import { ApprovmentAllDialogComponent } from './admin-overview/product-list/approvmentAll-dialog/approvementAll-dialog.component';
import { UserWalletComponent } from './user-overview/user-wallet/user-wallet.component';
import { DeleteOrderItem } from './checkout/order/delete-order-item/delete-order-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { OrderComponent } from './checkout/order/checkout-order.component';
import { ProductsItemDelete } from './user-overview/user-products/products-list/delete-dialog/products-item-delete.component';
import { BuyServiceComponent } from './catalogue/catalogue-service-list/buy-dialog/buy-dialog.component';
import { CatalogueServiceListComponent } from './catalogue/catalogue-service-list/catalogue-service-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BuyDialogComponent } from './catalogue/catalogue-product-list/buy-dialog/buy-dialog.component';
import { CatalogueProductsListComponent } from './catalogue/catalogue-product-list/catalogue-products-list.component';
import { UserSoldComponent } from './user-overview/user-transactions/user-sold/user-sold.component';
import { UserBoughtComponent } from './user-overview/user-transactions/user-bought/user-bought.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {CatalogueComponent} from './catalogue/catalogue.component';
import { UserOverviewComponent} from './user-overview/user-overview.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserLoginComponent } from './user-login/user-login.component';
import {UserRegistrationComponent} from './user-registration/user-registration.component';
import {UserProductsComponent} from './user-overview/user-products/user-products.component';
import {UserItemListComponent} from './user-overview/user-products/products-list/products-list.component';
import {ProductsFormComponent} from './user-overview/user-products/products-list/products-form/products-form.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from "@angular/router";
import {DisableControlDirective} from './user-overview/user-products/products-list/products-form/disableControl';
import {EditProductsFormComponent} from './user-overview/user-products/products-list/edit-product-form/edit-products-form.component';
import {UserTransactionsComponent} from './user-overview/user-transactions/user-transactions.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { UserListComponent } from './admin-overview/user-list/user-list.component';
import { ProductListComponent } from './admin-overview/product-list/product-list.component';
import { DeleteDialogComponent } from './admin-overview/user-list/delete-dialog/delete-dialog.component';
import { ApprovmentDialogComponent } from './admin-overview/product-list/approvment-dialog/approvment-dialog.component';
import { DialogErrorComponent } from './user-registration/dialog-error/dialog-error.component';
import { DialogSuccessfulComponent } from './user-registration/dialog-successful/dialog-successful.component';
import { ResetDialogComponent } from './user-login/reset-dialog/reset-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DeleteItemDialogComponent } from './admin-overview/product-list/delete-item-dialog/delete-item-dialog.component';
import { CheckoutComponent} from './checkout/checkout.component'
import { MatMenuModule} from '@angular/material/menu';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserAccountComponent } from './user-overview/user-account/user-account.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    UserProductsComponent,
    ProductsFormComponent,
    CatalogueComponent,
    UserItemListComponent,
    UserOverviewComponent,
    DisableControlDirective,
    EditProductsFormComponent,
    UserTransactionsComponent,
    UserSoldComponent,
    UserBoughtComponent,
    BuyDialogComponent,
    CatalogueProductsListComponent,
    CatalogueServiceListComponent,
    BuyServiceComponent,
    AdminOverviewComponent,
    UserListComponent,
    ProductListComponent,
    DeleteDialogComponent,
    ApprovmentDialogComponent,
    ProductsItemDelete,
    DialogErrorComponent,
    DialogSuccessfulComponent,
    ResetDialogComponent,
    PageNotFoundComponent,
    PasswordResetComponent,
    MainPageComponent,
    DeleteItemDialogComponent,
    CheckoutComponent,
    OrderComponent,
    DeleteOrderItem,
    UserAccountComponent,
    HeaderComponent,
    UserWalletComponent,
    ApprovmentAllDialogComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'main', component: MainPageComponent, 
      children: [
        { path: 'Available-Products', component: CatalogueProductsListComponent },
        { path: 'Available-Services', component: CatalogueServiceListComponent }]},
      {path: 'checkout', component: CheckoutComponent},
      {path: 'reset/:id', component: PasswordResetComponent},
      {path: '', redirectTo: '/main', pathMatch: 'full'},  
      {path: 'main/your-product', component: UserProductsComponent},
      {path: 'main/your-transaction', component: UserTransactionsComponent},
      {path: 'main/account', component: UserAccountComponent},
      {path: 'main/admin-overview', component: AdminOverviewComponent},
      {path: 'login', component: UserLoginComponent},
      {path: 'register', component: UserRegistrationComponent},
      {path: '**', component: PageNotFoundComponent}
    ]),
  
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatStepperModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
