import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary implements OnInit {
summary = signal<any | null>(null);

  accountNumber: number | null = null;
  balance = 0;
  totalTransactions = 0;
  lastTransactionAmount = 0;
  lastTransactionType = '';
  lastTransactionDate = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const accountNumber = user.accountNumber;

    if (accountNumber) {
      this.loadSummary(accountNumber);
    }
  }

  loadSummary(accountNumber: number) {
    this.http
      .get<any>(`https://localhost:7182/api/account/summary/${accountNumber}`)
      .subscribe(res => {

        this.summary.set(res);

      });

  }
}