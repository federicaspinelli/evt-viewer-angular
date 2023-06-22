import { ChangeDetectionStrategy, Component, Input, Optional } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { LemEntry } from 'src/app/models/evt-models';
import { register } from 'src/app/services/component-register.service';
import { EVTModelService } from 'src/app/services/evt-model.service';
import { LemEntryDetailComponent } from './lem-entry-detail/lem-entry-detail.component';


@Component({
  selector: 'evt-lem-entry',
  templateUrl: './lem-entry.component.html',
  styleUrls: ['./lem-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

@register(LemEntry)
export class LemEntryComponent {

  @Input() data: LemEntry;

  public opened = false;
  public isInsideLemDetail: boolean;
  public nestedLems : LemEntry[] = [];

  variance$ = this.evtModelService.appVariance$.pipe(
    map((variances) => variances[this.data.id]),
    shareReplay(1),
  );
  
  constructor(
    private evtModelService: EVTModelService,
    @Optional() private parentDetailComponent?: LemEntryDetailComponent,
  ) {
    this.isInsideLemDetail = this.parentDetailComponent ? true : false;
  }

  toggleLemEntryBox(e: MouseEvent) {
    e.stopPropagation();
    this.opened = !this.opened;
  }

  closeLemEntryBox() {
    this.opened = false;
  }

  stopPropagation(e: MouseEvent) {
    e.stopPropagation();
  }
}
