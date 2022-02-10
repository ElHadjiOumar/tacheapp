import { Component, OnInit } from '@angular/core';
import { Tache } from '../tache'
import { TacheService } from '../tache.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-selection-client',
  templateUrl: './selection-client.component.html',
  styleUrls: ['./selection-client.component.css']
})
export class SelectionClientComponent implements OnInit {
  public taches: Tache[] = [];

  constructor(private tacheService: TacheService){}

  ngOnInit() {
    //appelle fonction getTaches
    this.getTaches();

   
  }

  //Renvoie toute les taches 
  public getTaches(): void {
    this.tacheService.getTaches().subscribe(
      (response: Tache[]) => {
        this.taches = response;
        console.log(this.taches);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


}
