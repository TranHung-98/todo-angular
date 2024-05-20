import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { ELangMode, ELangTitle } from "src/app/enums/language.enum";
import { SweetAlertService } from "src/app/shared/sweetalert/service/sweetalert.service";


@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private lang: ELangMode = ELangMode.VI;
  private language = this.cookieService.get('language');

  constructor(
    private cookieService: CookieService,
    public translate: TranslateService,
    private sweetalertService: SweetAlertService,) { }

  getLanguage() {
    if (this.language === ELangMode.VI || this.language === ELangMode.EN) {
      return this.language;
    } else {
      return ELangMode.EN;
    }
  }

  isLang() {
    return this.lang;
  }

  setLang(lang: ELangMode, message: ELangTitle) {
    if (this.language === lang) {
      return;
    } else {
      this.language = lang;
      this.sweetalertService.fireSuccessAlert('', message, 2000, true, false, "bottom-end");
      this.translate.setDefaultLang(lang);
      this.cookieService.set('language', lang);
    }
  }
}
