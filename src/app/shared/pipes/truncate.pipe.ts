import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(textToTruncate: string, minLengthToShow:number): string {
    let textTruncated = textToTruncate;
    if (textToTruncate.length > minLengthToShow) {
      textTruncated = textToTruncate.slice(0, minLengthToShow) + '...';
    }
    return textTruncated;
  }
}
