import { Component, EventEmitter, Output } from '@angular/core';
import { AppConfig } from '../../app.config';
import { EvtIconInfo } from '../../ui-components/icon/icon.component';

export interface LemsSelectItemGroup {
  label: string;
  items: LemsSelectItem[];
  disabled?: boolean;
}
export interface LemsSelectItem {
  label: string;
  value: string; // This will be used to identify the items to be selected, by indicating tag name and attributes (for XML)
  color?: string;
  disabled?: boolean;
}

@Component({
  selector: 'evt-lems-select',
  templateUrl: './lems-select.component.html',
  styleUrls: ['./lems-select.component.scss'],
})
export class LemsSelectComponent {
  @Output() selectionChange: EventEmitter<LemsSelectItem[]> = new EventEmitter();
  
  lemsTypes: Array<LemsSelectItem & { group: string }> = (AppConfig.evtSettings.edition.lemsSelectItems || [])
    .filter(g => !g.disabled)
    .reduce((x, y) => [...x, ...y.items.filter(i => !i.disabled).map(i => ({ ...i, group: y.label }))], []);

  iconColor: EvtIconInfo = {
    icon: 'circle',
    iconSet: 'fas',
    additionalClasses: 'ml-2 mr-1',
  };

  public selectedLemTypes: LemsSelectItem[] = [];

  updateSelectedLemTypes(lemsTypes: LemsSelectItem[]) {
    if (Array.isArray(lemsTypes)) { // BUGFIX: There is a bug in ng-select change event and second time the parameter is an event
      this.selectionChange.emit(lemsTypes);
      // console.log('Prova', AppConfig.evtSettings.edition.lemsSelectItems || [])
    }
    

  }

  toggleSelection() {
    if (this.selectedLemTypes.length < this.lemsTypes.length) {
      this.selectedLemTypes = this.lemsTypes;
    } else {
      this.selectedLemTypes = [];
    }
    this.selectionChange.emit(this.selectedLemTypes);
    // console.log('Prova 0', AppConfig.evtSettings.edition.lemsSelectItems[0])
    // console.log('Prova 1', AppConfig.evtSettings.edition.lemsSelectItems[1])
  }
}
