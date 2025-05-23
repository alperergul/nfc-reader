import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NfcService {
  private nfcDataSubject = new BehaviorSubject<string | null>(null);
  public nfcData$ = this.nfcDataSubject.asObservable();

  async startScan() {
    if ('NDEFReader' in window) {
      const reader = new NDEFReader();
      try {
        await reader.scan();
        console.log('NFC tarama başlatıldı.');

        reader.onreading = (event) => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            const text = decoder.decode(record.data);
            this.nfcDataSubject.next(text);
          }
        };
      } catch (err) {
        console.error('NFC hata:', err);
        this.nfcDataSubject.next('NFC taraması başlatılamadı.');
      }
    } else {
      this.nfcDataSubject.next('Tarayıcı NFC desteklemiyor.');
    }
  }
}
