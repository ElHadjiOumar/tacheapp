import { Component, OnInit } from '@angular/core';
import { Tache } from './tache';
import { TacheService } from './tache.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  public taches: Tache[] = [];
  public editTache!: Tache;
  public deleteTache!: Tache;
  colors = ['#6a1b9a', '#e91e63','#ef6c00','#ffc107','#00796b','#c62828','#880e4f'];
  data =  [200, 300];
  chart: any;
  

  constructor(private tacheService: TacheService){}

  ngOnInit() {
    this.getTaches();
    this.tacheService.getAll()
    .subscribe(res => {
      
      let projet = res.map((res: { projet: any; }) => res.projet)
      let charge = res.map((res: { chargeHj: any; }) => res.chargeHj)
      
      let echeanceDates: any[] = []
      projet?.forEach((res: any) => {
        let charge = res ;
        echeanceDates.push(charge)
      })
      

      const DATA_COUNT = 5;
      //const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
      const data = {
        labels: echeanceDates,
        datasets: [
          {
            label: 'Dataset 1',
            data: charge,
            backgroundColor: this.colors,
          }
        ]
      };
      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: data,          
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          
            title: {
              display: true,
              text: 'Avancement par projet'
            },
          }
        }
      })








    })
  }

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

  public onAddTache(addForm: NgForm): void {
    document.getElementById('add-tache-form')!.click();
    this.tacheService.addTache(addForm.value).subscribe(
      (response: Tache) => {
        console.log(response);
        this.getTaches();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateTache(tache: Tache): void {
    this.tacheService.updateTache(tache).subscribe(
      (response: Tache) => {
        console.log(response);
        this.getTaches();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTache(tacheId: number): void {
    this.tacheService.deleteTache(tacheId).subscribe(
      (response: void) => {
        console.log(response);
        this.getTaches();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchTaches(keys: string): void {
    console.log(keys);
    const results: Tache[] = [];
    for (const tache of this.taches) {
      if (tache.client.toLowerCase().indexOf(keys.toLowerCase()) !== -1) {
        results.push(tache);
      }
    }
    this.taches = results;
    if (results.length === 0 || !keys) {
      this.getTaches();
    }
  }

  public searchProjet(keys: string): void {
    console.log(keys);
    const results: Tache[] = [];
    for (const tache of this.taches) {
      if (tache.projet.toLowerCase().indexOf(keys.toLowerCase()) !== -1) {
        results.push(tache);
      }
    }
    this.taches = results;
    if (results.length === 0 || !keys) {
      this.getTaches();
    }
  }

 

  public onOpenModal(tache: Tache, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTacheModal');
    }
    if (mode === 'edit') {
      this.editTache = tache;
      button.setAttribute('data-target', '#updateTacheModal');
    }
    if (mode === 'delete') {
      this.deleteTache = tache;
      button.setAttribute('data-target', '#deleteTacheModal');
    }
    container!.appendChild(button);
    button.click();
  }



}