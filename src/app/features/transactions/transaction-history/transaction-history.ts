import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css'
})
export class TransactionHistory implements OnInit {

  userRole: string = '';
  fromAccountNumber: number | null = null;
  toAccountNumber: number | null = null;
  amount: number | null = null;
  receiverName = signal<string>('');
  transactions = signal<any[]>([]);
  pageSize = signal(5);
 currentPage = signal(1);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userRole = user.role;
  if (this.userRole === 'User') {
    this.fromAccountNumber = user.accountNumber;
    this.loadTransactions();
  }
    
  }

onFromAccountChange() {

  if (!this.fromAccountNumber) return;

  this.loadTransactions();

}

  downloadHistory() {

    let content = 'Date\tType\tAmount\tBalance After\n';

    this.transactions().forEach(t => {
      content += `${t.date}\t${t.type}\t₹${t.amount}\t₹${t.balance}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'TransactionHistory.txt';
    a.click();

    window.URL.revokeObjectURL(url);
  }

 totalPages = computed(() =>
  Math.ceil(this.transactions().length / this.pageSize())
);



  get paginatedTransactions() {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.transactions().slice(start, start + this.pageSize());
  }

  nextPage() {
     if (this.currentPage() < this.totalPages()) {
    this.currentPage.update(v => v + 1);
  }

  }

  prevPage() {
    if (this.currentPage() > 1) {
    this.currentPage.update(v => v - 1);
  }

  }

  validateAccount() {

  if (!this.toAccountNumber) return;

  this.http.get<any>(`https://localhost:7182/api/account/validate-account/${this.toAccountNumber}`)
    .subscribe({
      next: res => {
        debugger;
         this.receiverName.set(res.accountHolderName);
      },
      error: () => {
        alert("Invalid account number");
      }
    });
}

transferMoney() {
  if (!this.fromAccountNumber || !this.toAccountNumber || !this.amount) {
    alert("Please fill all fields");
    return;
  }

  const payload = {
    fromAccountNumber: this.fromAccountNumber,
    toAccountNumber: this.toAccountNumber,
    amount: this.amount
  };

  this.http.post<any>('https://localhost:7182/api/account/transfer', payload)
    .subscribe({
      next: res => {
        debugger;
        alert("Transfer Successful");

        this.loadTransactions();

      },
      error: err => {
        debugger;
        alert(err.error?.message );
      }
    });
}
loadTransactions() {

  const accountNumber = this.fromAccountNumber;

  this.http.get<any[]>(`https://localhost:7182/api/account/history/${accountNumber}`)
    .subscribe(data => {
      const mapped = data.map(t => ({
        date: new Date(t.transactionDate).toLocaleDateString(),
        type: t.transactionType,
        amount: t.amount,
        balance: t.balanceAfterTransaction
      }));

      this.transactions.set(mapped);

    });
}
}