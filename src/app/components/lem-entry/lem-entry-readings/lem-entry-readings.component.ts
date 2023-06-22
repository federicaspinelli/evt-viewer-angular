import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LemEntry, Reading } from 'src/app/models/evt-models';
import { register } from 'src/app/services/component-register.service';
import { EVTModelService } from 'src/app/services/evt-model.service';

@Component({
  selector: 'evt-lem-entry-readings',
  templateUrl: './lem-entry-readings.component.html',
  styleUrls: ['./lem-entry-readings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

@register(LemEntryReadingsComponent)
export class LemEntryReadingsComponent {
  @Input() data: LemEntry;
  @Input() rdgHasCounter: boolean;
  // tslint:disable-next-line: no-any
  @Input() template: TemplateRef<any>;

  groups$ = this.evtModelService.groups$;
  
  constructor(
    public evtModelService: EVTModelService,
  ) {
  }

  get significantRdg(): Reading[] {
    return this.data.readings.filter((rdg) => rdg.significant);
  }
  
  getWits$(witID: string): Observable<string[]> {
    return this.groups$.pipe(
      map((groups) => {
        return groups.filter((g) => g.id === witID).map((g) => g.witnesses).reduce((x, y) => ([ ...x, ...y ]), []);
      }),
      map((groupWits) => groupWits.length > 0 ? groupWits : [witID]),
    );
  }

}
