import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, combineLatest, combineLatestWith, filter, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { ExhangeApiService } from '../exhange-api.service';

@Component({
  selector: 'app-exchange-calculator',
  templateUrl: './exchange-calculator.component.html',
  styleUrls: ['./exchange-calculator.component.scss']
})
export class ExchangeCalculatorComponent implements OnInit {

  form = new FormGroup({
    from: new FormControl(),
    amountFrom: new FormControl(1),
    to: new FormControl(),
    amountTo: new FormControl(0),
  });

  symbols: string[] = [];
  currentRate = 0;

  constructor(private exchangeApi: ExhangeApiService) { }

  ngOnInit(): void {
    this.exchangeApi.getSymbols().subscribe((res: any) => this.symbols = Object.keys(res.symbols));
    this.form.get('from')?.valueChanges.pipe(
      combineLatestWith(this.form.get('to')?.valueChanges as Observable<string>),
      switchMap(([from, to]) => this.exchangeApi.getCurrentRate(from, [to]).pipe(
        catchError(() => {
          alert('Data for this currency pair is not available. API Issue');
          return of(false);
        }
        )
      )),
      filter(res => !!res)
    ).subscribe((res: any) => {
      this.currentRate = res.rates[Object.keys(res.rates)[0]];
      this.recalculate();
    });
    this.form.get('from')?.setValue('USD');
    this.form.get('to')?.setValue('UAH');
    this.form.get('amountFrom')?.valueChanges.subscribe(() => this.recalculate());
    this.form.get('amountTo')?.valueChanges.subscribe(() => this.recalculate(true));
  }

  recalculate(reverse?: boolean): void {
    const amountToFC = this.form.get('amountTo');
    const amountFromFC = this.form.get('amountFrom');
    if (reverse) {
      amountFromFC?.setValue((Number(amountToFC?.value) / this.currentRate).toFixed(2), {emitEvent: false});
    }
    else {
      amountToFC?.setValue((Number(amountFromFC?.value) * this.currentRate).toFixed(2), {emitEvent: false});
    }
  }
}
