import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TacheService } from './tache.service';
import { HttpClientModule } from '@angular/common/http';import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule,NgChartsModule
  ],
  providers: [TacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }