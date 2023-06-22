import { Component, Input } from '@angular/core';
import { take } from 'rxjs/operators';

import { LemmatizedEntityOccurrence, LemmatizedEntityOccurrenceRef } from '../../../models/evt-models';
import { EVTModelService } from '../../../services/evt-model.service';
import { EVTStatusService } from '../../../services/evt-status.service';

@Component({
  selector: 'evt-lemmatized-entity-occurrence',
  templateUrl: './lemmatized-entity-occurrence.component.html',
  styleUrls: ['./lemmatized-entity-occurrence.component.scss'],
})
export class LemmatizedEntityOccurrenceComponent {
  @Input() occurrence: LemmatizedEntityOccurrence;
  @Input() entityLemId: string;

  constructor(
    private evtModelService: EVTModelService,
    private evtStatusService: EVTStatusService,
  ) {
  }

  goToOccurrenceRef(ref: LemmatizedEntityOccurrenceRef) {
    this.evtModelService.pages$.pipe(take(1)).subscribe(pages => {
      const page = pages.find(p => p.id === this.occurrence.pageId);
      this.evtStatusService.updateDocument$.next(ref.docId);
      this.evtStatusService.updatePage$.next(page);
      this.evtStatusService.currentLemmatizedEntityId$.next(this.entityLemId);
    });
  }
}
