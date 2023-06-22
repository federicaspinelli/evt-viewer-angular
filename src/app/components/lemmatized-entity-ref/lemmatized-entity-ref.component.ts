import { Component, Input } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { LemmatizedEntityRef } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { LemsSelectService } from '../../services/lems-select.service';
import { EVTModelService } from '../../services/evt-model.service';
import { EVTStatusService } from '../../services/evt-status.service';
import { EditionlevelSusceptible, Highlightable, TextFlowSusceptible } from '../components-mixins';

export interface LemmatizedEntityRefComponent extends EditionlevelSusceptible, Highlightable, TextFlowSusceptible { }

@Component({
  selector: 'evt-lemmatized-entity-ref',
  templateUrl: './lemmatized-entity-ref.component.html',
  styleUrls: ['./lemmatized-entity-ref.component.scss'],
})
@register(LemmatizedEntityRef)
export class LemmatizedEntityRefComponent {
  @Input() data: LemmatizedEntityRef;
  availableLemEntities$ = this.evtModelService.lemmatizedEntities$.pipe(
    map(ne => ne.all.lementities.length > 0),
  );

  entity$ = this.evtModelService.lemmatizedEntities$.pipe(
    map(ne => ne.all.lementities.find(e => e.id === this.data.entityLemId) || 'notFound'),
  );

  public highlighted$ = this.lemsSelectService.selectedLemsItems$.pipe(
    tap(items => {
      if (this.data) {
        this.data.class = this.data.class || '';
        this.data.attributes = this.data.attributes || {};
      }

      return items;
    }),
    map(items => items.some(i => i && this.data &&
      this.lemsSelectService.matchClassAndAttributes(i.value, this.data.attributes, this.data.class))),
  );

  public opened = false;

  constructor(
    public evtStatusService: EVTStatusService,
    private evtModelService: EVTModelService,
    private lemsSelectService: LemsSelectService,
  ) {
  }

  toggleLemEntityData(event: MouseEvent) {
    event.stopPropagation();
    this.opened = !this.opened;
  }
}
