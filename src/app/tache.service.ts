import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tache } from './tache';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TacheService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiServerUrl}/tache/all`);
  }

  public addTache(tache: Tache): Observable<Tache> {
    return this.http.post<Tache>(`${this.apiServerUrl}/tache/add`, tache);
  }

  public updateTache(tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiServerUrl}/tache/update`, tache);
  }

  public deleteTache(tacheId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tache/delete/${tacheId}`);
  }

  getAll() :Observable<any> {
    return this.http.get("http://localhost:8080/tache/all").pipe(map(result => result));
  }
}