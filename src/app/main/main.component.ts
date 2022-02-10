import { Component, OnInit } from '@angular/core';
import { Tache } from '../tache'
import { TacheService } from '../tache.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public taches: Tache[] = [];
  public editTache!: Tache;
  public deleteTache!: Tache;
  //couleur utiliser dans graphe
  colors = ['#6a1b9a', '#e91e63','#ef6c00','#ffc107','#00796b','#c62828','#880e4f'];
  chart: any;
  

  constructor(private tacheService: TacheService){}

  ngOnInit() {
    //appelle fonction getTaches
    this.getTaches();

    // Partie graphe doughnut avec chart.js
    this.tacheService.getAll()
    .subscribe(res => {
      
      let projet = res.map((res: { projet: any; }) => res.projet)
      let charge = res.map((res: { chargeHj: any; }) => res.chargeHj)
      
      let echeanceDates: any[] = []
      projet?.forEach((res: any) => {
        let charge = res ;
        echeanceDates.push(charge)
      })

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
              text: 'Avancement projet'
            },
          }
        }
      })
    })
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

  //Ajoutez tache
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

  //modifier tache
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

  //supprimer tache
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

  //recherche tache pour client
  //la fonction indexOf retourne -1 sil ne trouve pas un element du coup je l'utilise pour le contraire trouver un element
  //Elle fonctionne assez rapidement
  //Ensuite on modifie toutes les taches on y met les taches que l'on a trouvé
  //si on trouve pas la clé oubien sil nya rien dans la variable tableau (results) on reinitialise le tableau (<table>)
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

  //Objectif rechercher par projet à partir liste déroulante(select option)
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

 
  // utilitaire pour saisie formulaire cas : ajouter,modifier tache
  //mais aussi suppression tache
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
