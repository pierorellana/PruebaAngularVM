import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoetasModule } from './pages/poetas.module';
import { AutoresComponent } from './pages/autores/autores.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ObrasModalComponent } from './pages/obras-modal/obras-modal.component';
import { InterceptorInterceptor } from './interceptor.interceptor';
import { LoadingService } from './loading.service';
import { AuthorService } from './pages/author.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PoetasModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
    LoadingService,
    AuthorService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
