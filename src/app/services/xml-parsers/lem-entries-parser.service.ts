import { Injectable } from '@angular/core';
import { ParserRegister } from '.';
import { LemEntry, Reading, Witness, XMLElement } from '../../models/evt-models';

@Injectable({
  providedIn: 'root',
})
export class LemEntriesParserService {
  private lemEntryTagName = 'app[type="lemma"]';

  public parseLemEntries(document: XMLElement) {
    const lemParser = ParserRegister.get('evt-lem-entry-parser');

    return Array.from(document.querySelectorAll<XMLElement>(this.lemEntryTagName))
      .map((lemEntry) => lemParser.parse(lemEntry) as LemEntry);
  }

  // add by FS - add here new tag for CPD
  public getSignificantReadings(lems: LemEntry[]) {
    const signRdgs = {};
    lems.forEach((lem) => {
      signRdgs[lem.id] = lem.readings.concat(lem.lemma).filter((rdg: Reading) => rdg.significant);
    });

    return signRdgs;
  }

  public getSignificantReadingsNumber(signRdgs: { [key: string]: LemEntry[] }) {
    const signRdgsNumber = {};
    Object.keys(signRdgs).forEach((lem) => {
      signRdgsNumber[lem] = signRdgs[lem].length;
    });

    return signRdgsNumber;
  }

  public getLemVariance(signRdgsNum: { [key: string]: number }, witList: Witness[]) {
    const lemsVariance = {};
    if (Object.keys(witList).length > 1) {
      Object.keys(signRdgsNum).forEach((x) => {
        lemsVariance[x] = signRdgsNum[x] / Object.keys(witList).length;
      });
    }

    return lemsVariance;
  }
}
