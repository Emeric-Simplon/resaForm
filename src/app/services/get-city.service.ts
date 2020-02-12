import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class GetCityService {

  baseUrl = 'https://vicopo.selfbuild.fr/cherche/'

  constructor(private httpClient: HttpClient) { }

  getCity(zip): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}${zip}`)
  }

}
