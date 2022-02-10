import { Component, OnInit } from '@angular/core';
import { Tache } from '../tache'
import { TacheService } from '../tache.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-selection-projet',
  templateUrl: './selection-projet.component.html',
  styleUrls: ['./selection-projet.component.css']
})
export class SelectionProjetComponent implements OnInit {

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
