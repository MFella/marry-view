import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizedHtml',
  standalone: true,
})
export class SanitizedHtmlPipe implements PipeTransform {
  #domSanitizer = inject(DomSanitizer);

  transform(value?: any): any {
    return this.#domSanitizer.bypassSecurityTrustHtml(value);
  }
}
