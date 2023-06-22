import { Component, EventEmitter, Output } from '@angular/core';
import { AppConfig } from '../../app.config';
import { EvtIconInfo } from '../../ui-components/icon/icon.component';

export interface IperlemsSelectItemGroup {
  label: string;
  items: IperlemsSelectItem[];
  disabled?: boolean;
}
export interface IperlemsSelectItem {
  label: string;
  value: string; // This will be used to identify the items to be selected, by indicating tag name and attributes (for XML)
  color?: string;
  disabled?: boolean;
}

@Component({
  selector: 'evt-iperlems-select',
  templateUrl: './iperlems-select.component.html',
  styleUrls: ['./iperlems-select.component.scss'],
})
export class IperlemsSelectComponent {
  @Output() selectionChange: EventEmitter<IperlemsSelectItem[]> = new EventEmitter();
  
  iperlemsTypes: Array<IperlemsSelectItem & { group: string }> = (AppConfig.evtSettings.edition.iperlemsSelectItems || [])
    .filter(g => !g.disabled)
    .reduce((x, y) => [...x, ...y.items.filter(i => !i.disabled).map(i => ({ ...i, group: y.label }))], []);

  iconColor: EvtIconInfo = {
    icon: 'circle',
    iconSet: 'fas',
    additionalClasses: 'ml-2 mr-1',
  };

  public selectedIperlemTypes: IperlemsSelectItem[] = [];

  updateSelectedIperlemTypes(iperlemsTypes: IperlemsSelectItem[]) {
    if (Array.isArray(iperlemsTypes)) { // BUGFIX: There is a bug in ng-select change event and second time the parameter is an event
      this.selectionChange.emit(iperlemsTypes);
      // console.log('Prova', AppConfig.evtSettings.edition.iperlemsSelectItems || [])
    }
    
  }

  toggleSelection() {
    if (this.selectedIperlemTypes.length < this.iperlemsTypes.length) {
      this.selectedIperlemTypes = this.iperlemsTypes;
    } else {
      this.selectedIperlemTypes = [];
    }
    this.selectionChange.emit(this.selectedIperlemTypes);
    // console.log('Prova 0', AppConfig.evtSettings.edition.iperlemsSelectItems[0])
    // console.log('Prova 1', AppConfig.evtSettings.edition.iperlemsSelectItems[1])
  }
}
