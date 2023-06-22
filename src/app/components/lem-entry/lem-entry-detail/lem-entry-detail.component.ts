import {ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LemEntry, Reading, GenericElement } from './../../../models/evt-models';
import { register } from 'src/app/services/component-register.service';
import { EVTModelService } from '../../../services/evt-model.service';

@Component({
  selector: 'evt-lem-entry-detail',
  templateUrl: './lem-entry-detail.component.html',
  styleUrls: ['./lem-entry-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

@register(LemEntryDetailComponent)
export class LemEntryDetailComponent implements OnInit {
  @Input() data: LemEntry;
  nestedLems: LemEntry [] = [];
  rdgHasCounter = false;
  
  get significantRdg(): Reading[] {
    return this.data.readings.filter((rdg) => rdg.significant);
  }

  get notSignificantRdg(): Reading[]{
    return this.data.readings.filter((rdg) => !rdg.significant);
  }
  
  get readings(): Reading[] {
    return [this.data.lemma, ...this.significantRdg, ...this.notSignificantRdg]
  }

  get rdgMetadata() {
    return Object.keys(this.data.attributes).filter((key) => key !== 'id')
      .reduce((obj, key) => ({
        ...obj,
        [key]: this.data.attributes[key],
      }), {});
  }

  constructor(
    public evtModelService: EVTModelService,
  ) { 
  }

  ngOnInit() {
    if (this.data.nestedLemsIDs.length > 0) {
      this.recoverNestedLems(this.data);
    }
  }

  recoverNestedLems(lem: LemEntry) {
    const nesLems = lem.lemma.content.filter((c: LemEntry | GenericElement) => c.type === LemEntry);
    nesLems.forEach((nesLem: LemEntry) => {
      this.nestedLems = this.nestedLems.concat(nesLem);
      if (nesLem.nestedLemsIDs.length > 0) {
        this.recoverNestedLems(nesLem);
      }
    });
  }

  isLemEntry (item: GenericElement | LemEntry): boolean {
    return item.type === LemEntry;
  }

  getNestedLemLemma(lemId: string): Reading {
    return this.nestedLems.find((c) => c.id === lemId).lemma;
  }

  getNestedLemPos(lemId: string): number {
    return this.nestedLems.findIndex((nesLem) => nesLem.id === lemId);
  }
}
[]