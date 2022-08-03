import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExhangeApiService {

  constructor(private http: HttpClient) { }

  getCurrentRate(base: string, symbols: string[]) {
    return this.http.get(`${environment.exchangeRateApiUrl}/latest`, {params: {base, symbols: symbols.join(',')}});
  }

  getSymbols() {
    return this.http.get(`${environment.exchangeRateApiUrl}/symbols`);
  }
}
