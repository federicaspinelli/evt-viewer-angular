import { Directive, Input } from '@angular/core';
import { EditionLevelType, TextFlow } from '../app.config';
import { HighlightData } from '../models/evt-models';
import { EntitiesSelectItem } from './entities-select/entities-select.component';
// add by FS
import { LemsSelectItem } from './lems-select/lems-select.component';
import { IperlemsSelectItem } from './iperlems-select/iperlems-select.component';
import { HighlightDataLem } from '../models/evt-models';
import { HighlightDataIperlem } from '../models/evt-models';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class Highlightable {
  @Input() highlightData: HighlightData;
  @Input() highlightDataLem: HighlightDataLem;
  @Input() highlightDataIperlem: HighlightDataIperlem;
  @Input() itemsToHighlight: EntitiesSelectItem[];
  @Input() itemsLemsToHighlight: LemsSelectItem[];
  @Input() itemsIperlemsToHighlight: IperlemsSelectItem[];

}

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class EditionlevelSusceptible {
  @Input() editionLevel: EditionLevelType;
}

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class TextFlowSusceptible {
  @Input() textFlow: TextFlow;
}
