import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LemmatizedEntity, Relation } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EVTModelService } from '../../services/evt-model.service';

@register(Relation)
@Component({
  selector: 'evt-lemmatized-entity-relation',
  templateUrl: './lemmatized-entity-relation.component.html',
  styleUrls: ['./lemmatized-entity-relation.component.scss'],
})
export class LemmatizedEntityRelationComponent {
  @Input() data: Relation;
  @Input() inEntity: boolean;

  selectedEntity: LemmatizedEntity;

  activeParts$ = this.getEntities('activeParts');
  mutualParts$ = this.getEntities('mutualParts');
  passiveParts$ = this.getEntities('passiveParts');

  constructor(
    private evtModelService: EVTModelService,
  ) {
  }

  toggleEntity(entity: LemmatizedEntity) {
    // TODO: if inEntity, then open entity in list
    if (!this.inEntity) {
      if (this.selectedEntity === entity) {
        this.selectedEntity = undefined;
      } else {
        this.selectedEntity = entity;
      }
    }
  }

  private getEntities(partIdsGroup: 'activeParts' | 'mutualParts' | 'passiveParts'):
    Observable<Array<{ id: string; entity: LemmatizedEntity; label: string }>> {
    return this.evtModelService.lemmatizedEntities$.pipe(
      map(ne => this.data[partIdsGroup].map(entityId => {
        const entity = ne.all.lementities.find(e => e.id === entityId);

        return {
          id: entityId,
          entity,
          get label() {
            return (entity ? entity.label : entityId);
          },
        };
      })),
      map(neslem => neslem.filter(e => !!e)),
    );
  }
}
