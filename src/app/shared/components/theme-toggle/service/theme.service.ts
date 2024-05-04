import { Injectable } from '@angular/core';
import { ETypeThem } from '../enum/type.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private mode: ETypeThem = ETypeThem.ThemeIndigo;

  setMode(mode: ETypeThem) {
    const formattedMode = mode.replace(/\s+/g, '-').toLowerCase();

    document.body.className = 'mat-typography';
    document.body.classList.add(`${formattedMode}-theme`);
  }

}
