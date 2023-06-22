import { Component, Input } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { EditionLevel } from '../../app.config';
import { Page } from '../../models/evt-models';
import { EntitiesSelectItem } from '../entities-select/entities-select.component';
import { LemsSelectItem } from '../lems-select/lems-select.component';
import { IperlemsSelectItem } from '../iperlems-select/iperlems-select.component';

@Component({
  selector: 'evt-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() itemsLemsToHighlight: LemsSelectItem[];
  @Input() itemsIperlemsToHighlight: IperlemsSelectItem[];
  @Input() editionLevel: EditionLevel;
  @Input() textFlow: boolean;

  private d: Page;
  @Input() set data(v: Page) {
    this.d = v;
    this.pageDataChange.next(this.d);
  }
  get data() { return this.d; }
  pageDataChange = new BehaviorSubject<Page>(undefined);

  busy = of<boolean>(false); // TODO: manage loading
}
