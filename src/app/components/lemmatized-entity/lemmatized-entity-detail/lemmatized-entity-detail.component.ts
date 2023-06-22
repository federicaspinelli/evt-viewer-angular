import { Component, Input } from '@angular/core';
import { LemmatizedEntityInfo } from '../../../models/evt-models';
import { register } from '../../../services/component-register.service';
// import { normalizeUrl } from '../../../utils/js-utils';

@Component({
  selector: 'evt-lemmatized-entity-detail',
  templateUrl: './lemmatized-entity-detail.component.html',
  styleUrls: ['./lemmatized-entity-detail.component.scss'],
})
@register(LemmatizedEntityInfo)
export class LemmatizedEntityDetailComponent {
  @Input() data: LemmatizedEntityInfo;

  iconData = {
    actors: { icon: 'users' },
    birth: { icon: 'birthday-cake' },
    bloc: { icon: 'map-marker' },
    country: { icon: 'map-marker' },
    death: { icon: 'times', rotate: 45 },
    district: { icon: 'map-marker' },
    geogFeat: { icon: 'map-marker' },
    geoname: { icon: 'map-marker' },
    idno: { icon: 'barcode' },
    note: { icon: 'sticky-note' },
    occupation: { icon: 'briefcase' },
    orgname: { icon: 'users' },
    persname: { icon: 'user' },
    placename: { icon: 'map-marker' },
    region: { icon: 'map-marker' },
    relations: { icon: 'share-alt' },
    residence: { icon: 'home' },
    settlement: { icon: 'location-arrow' },
    sex: { icon: 'venus-mars' },
    link: { icon: 'external-link-alt', iconSet: 'fas'}
  };

  defaultIcon = { icon: 'info-circle' };

  get linkLem() {
    var link = this.data.attributes.lemmaRef
    return link; 
  }

  openlinkLem() {
    if (this.linkLem) {
      window.open(this.linkLem);
    }
  }
  openlinkTLIO() {
      window.open('http://tlio.ovi.cnr.it/TLIO/');
  }
}
