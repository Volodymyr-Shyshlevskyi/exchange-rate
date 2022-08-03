import { Component } from '@angular/core';
import { ExhangeApiService } from '../exhange-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  currencyPairs = [
    {
      label: 'USD/UAH',
      value: '--',
      symbol: '$'
    },
    {
      label: 'EUR/UAH',
      value: '--',
      symbol: '€'
    }
  ];

  constructor(private exchangeRateS: ExhangeApiService) { 
    this.fetchLatest();
  }

  fetchLatest() {
    this.exchangeRateS.getCurrentRate('UAH', ['USD', 'EUR']).subscribe((res: any) => {
      this.currencyPairs[0].value = (1 / res.rates.USD).toFixed(2);
      this.currencyPairs[1].value = (1 / res.rates.EUR).toFixed(2);
    });
  }

}
