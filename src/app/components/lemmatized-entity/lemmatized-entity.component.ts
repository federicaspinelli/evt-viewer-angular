// import { Attribute } from '@angular/core';
//import { LemmatizedEntityLabel } from './../../models/evt-models';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { map, shareReplay } from 'rxjs/operators';

import { LemmatizedEntity } from '../../models/evt-models';
import { register } from '../../services/component-register.service';
import { EVTModelService } from '../../services/evt-model.service';
import { normalizeUrl } from '../../utils/js-utils';

@register(LemmatizedEntity)
@Component({
  selector: 'evt-lemmatized-entity',
  templateUrl: './lemmatized-entity.component.html',
  styleUrls: ['./lemmatized-entity.component.scss'],
})
export class LemmatizedEntityComponent implements OnInit {
  @Input() data: LemmatizedEntity;
  @Input() inList: boolean;
  occurrences$ = this.evtModelService.lemsOccurrences$.pipe(
    map(occ => occ[this.data.id] || []),
    shareReplay(1),
  );
  relations$ = this.evtModelService.relations$.pipe(
    map(el => el.filter(rel => rel.activeParts.indexOf(this.data.id) >= 0 ||
      rel.passiveParts.indexOf(this.data.id) >= 0 || rel.mutualParts.indexOf(this.data.id) >= 0)));

  @ViewChild('lemDetails') lemDetails: NgbNav;

  public contentOpened = true;

  get selectedSection() {
    if (this.contentOpened) {
      return `${this.data && this.data.content.length === 0 ? 'occurrences' : 'info'}_${this.data.id}`;
    }

    return '';
  }

  get linkLem() { 
    return normalizeUrl('http://tlio.ovi.cnr.it/TLIO/'); 
  }

  constructor(
    private evtModelService: EVTModelService,
  ) {
  }

  ngOnInit() {
    if (this.inList) {
      this.contentOpened = false;
    }
  }

  toggleContent() {
    if (this.inList) {
      this.contentOpened = !this.contentOpened;
    }
  }

  tabSelected(event: MouseEvent) {
    event.stopPropagation();
  }

  openlinkLem() {
    if (this.linkLem) {
      window.open(this.linkLem, '_blank');
    }
  }

}
