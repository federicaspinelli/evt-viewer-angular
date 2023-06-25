import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { LemmatizedEntitiesList, Relation } from '../../models/evt-models';
import { EVTModelService } from '../../services/evt-model.service';
import { Map } from '../../utils/js-utils';

interface SpecificList extends LemmatizedEntitiesList {
  icon: string;
}

@Component({
  selector: 'evt-specific-lists',
  templateUrl: './specific-lists.component.html',
  styleUrls: ['./specific-lists.component.scss'],
})
export class SpecificListsComponent {
  lemlists$: Observable<SpecificList[]> = this.evtModelService.lemmatizedEntities$.pipe(
    // add by fs 25.06.23 14:08
    map((ne) => (ne.lemmas.lemlists.concat(ne.item.lemlists, ne.entries.lemlists))),
    //map(ne => (ne.lemmas.lemlists)),
    map(lemlists => (lemlists.map(lemlist => ({
      ...lemlist,
      icon: this.listsIcons[lemlist.lemmatizedEntityType] || 'lemlist',
    })))),
    tap(lemlists => {
      if (!this.selectedList && lemlists[0]) {
        this.openLemList(undefined, lemlists[0]);
      }
    }),
  );

  selectedList: LemmatizedEntitiesList;

  relations$: Observable<Relation[]> = this.evtModelService.lemmatizedEntities$.pipe(
    map(ne => ne.relations),
  );

  showRelations = false;

  private listsIcons: Map<string> = {
    lem: 'user',
    place: 'map-marker',
    org: 'users',
    event: 'calendar',
  };

  constructor(
    private evtModelService: EVTModelService,
  ) {
  }

  openLemList(event: MouseEvent, lemlist: LemmatizedEntitiesList) {
    if (event) {
      event.stopPropagation();
    }
    if (this.selectedList !== lemlist) {
      this.selectedList = lemlist;
    }
    this.showRelations = false;
    
  }

  openRelations() {
    this.showRelations = true;
    this.selectedList = undefined;
  }
}
