import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TacheService } from './tache.service';
import { HttpClientModule } from '@angular/common/http';import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SelectionClientComponent } from './selection-client/selection-client.component';
import { SelectionProjetComponent } from './selection-projet/selection-projet.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    SelectionClientComponent,
    SelectionProjetComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule,NgChartsModule,RouterModule.forRoot([
      {path: 'main', component: MainComponent},
      {path: 'selection-client', component: SelectionClientComponent},
      {path: 'selection-projet', component: SelectionProjetComponent},
    ]),
  ],
  providers: [TacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }