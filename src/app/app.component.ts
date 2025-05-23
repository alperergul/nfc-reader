import { Component } from '@angular/core';
import { NfcService } from './nfc.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'nfc-reader';

  nfcData: string | null = '';

  constructor(private nfcService: NfcService) {
    this.nfcService.nfcData$.subscribe((data) => {
      this.nfcData = data;
    });
  }

  startNfcScan() {
    this.nfcService.startScan();
  }
}
