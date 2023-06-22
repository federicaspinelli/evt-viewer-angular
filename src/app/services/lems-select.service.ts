import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AppConfig } from '../app.config';
import { LemsSelectItem } from '../components/lems-select/lems-select.component';
import { Attributes } from '../models/evt-models';

@Injectable({
  providedIn: 'root',
})
export class LemsSelectService {
  public updateLemsSelection$ = new Subject<LemsSelectItem[]>();
  public selectedLemsItems$ = this.updateLemsSelection$.pipe(
    shareReplay(1),
  );

  public getClassNameFromValue(value) {
    return value.toLowerCase().replace(/\s/g, '').replace(/(\[.*?\])/g, '');
  }

  public getAttributesFromValue(value): Array<{ key: string, value: string }> {
    return (value.toLowerCase().replace(/\s/g, '').match(/(\[.*?\])/g) || [])
      .map(i => i.replace(/(\[|\]|\')/g, '').split('=')).map(i => ({ key: i[0], value: i[1] }));
  }

  public matchClassAndAttributes(valueForCheck: string, attributesToCheck: Attributes, classToCheck: string) {
    return valueForCheck.split(',')
      .some(v => this.matchClass(v, classToCheck) && this.matchAttributes(v, attributesToCheck));
  }

  public matchClass(classForCheck: string, classToCheck: string) {
    return classToCheck === this.getClassNameFromValue(classForCheck);
  }

  public matchAttributes(attributesForCheck: string, attributesToCheck: Attributes) {
    return this.getAttributesFromValue(attributesForCheck).every(a => attributesToCheck[a.key] === a.value);
  }

  public getHighlightColor(attributesToCheck: Attributes, classNameToCheck: string, selectedLemsItems?: LemsSelectItem[]) {
    const lemsSelectItems = AppConfig.evtSettings.edition.lemsSelectItems
      .reduce((i: LemsSelectItem[], g) => i.concat(g.items), [])
      .reduce((x: LemsSelectItem[], y) => {
        const multiValues: LemsSelectItem[] = [];
        y.value.split(',').forEach(t => {
          multiValues.push({ ...y, value: t });
        });

        return x.concat(multiValues);
      },      []);

    let bestMatch: LemsSelectItem & { score: number };
    lemsSelectItems.forEach(item => {
      let score = 0;
      score += this.matchClass(item.value, classNameToCheck) ? 1 : 0;
      const attributes = this.getAttributesFromValue(item.value);
      score += attributes.length && this.matchAttributes(item.value, attributesToCheck) ? 1 : 0;
      if (score > 0 && selectedLemsItems) {
        score += selectedLemsItems.find(i => i.value === item.value) ? 1 : 0;
      }
      if (score > 0 && (!bestMatch || bestMatch.score < score)) {
        bestMatch = {
          ...item,
          score,
        };
      }
    });

    return bestMatch ? bestMatch.color : '';
  }
}
