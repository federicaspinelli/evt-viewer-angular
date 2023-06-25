import { Injectable } from '@angular/core';
import { parse, ParserRegister } from '.';
import { LemmatizedEntitiesList, LemmatizedEntity, LemmatizedEntityOccurrence, LemmatizedEntityOccurrenceRef, Page, XMLElement,} from '../../models/evt-models';
import { isNestedInElem } from '../../utils/dom-utils';
import { Map } from '../../utils/js-utils';
import { GenericElemParser } from './basic-parsers';
import { getLemListsToParseTagNames, lemmatizedEntitiesListsTagNamesMap } from './lemmatized-entity-parsers';
import { createParser } from './parser-models';

@Injectable({
  providedIn: 'root',
})

export class LemmatizedEntitiesParserService {
  private tagLemNamesMap = lemmatizedEntitiesListsTagNamesMap;

  public parseLemLists(document: XMLElement) {
    const lemListsToParse = getLemListsToParseTagNames();
    const lemListParser = ParserRegister.get('evt-lemmatized-entities-list-parser');
    // We consider only first level lists; inset lists will be considered
    
    /*const lemlists = Array.from(document.querySelectorAll<XMLElement>(lemListsToParse.toString()))
      .filter((lemlist) => !isNestedInElem(lemlist, lemlist.tagName))
      .map((l) => lemListParser.parse(l) as LemmatizedEntitiesList);
    */
    const lemlists = (lemListsToParse.toString() ? Array.from(document.querySelectorAll<XMLElement>(lemListsToParse.toString())) : [])
      .filter((lemlist) => !isNestedInElem(lemlist, lemlist.tagName))
      .map((l) => lemListParser.parse(l) as LemmatizedEntitiesList);

    return {
      lemlists,
      lementities: lemlists.map(({ content }) => content).reduce((a, b) => a.concat(b), []),
      relations: lemlists.map(({ relations }) => relations).reduce((a, b) => a.concat(b), []),
    };
  }

  public getResultsByType(lemlists: LemmatizedEntitiesList[], lementities: LemmatizedEntity[], type: string[]) {
    return {
      lemlists: lemlists.filter(lemlist => type.indexOf(lemlist.lemmatizedEntityType) >= 0),
      lementities: lementities.filter(entity => type.indexOf(entity.lemmatizedEntityType) >= 0),
    };
  }

  public parseLemmatizedEntitiesOccurrences(pages: Page[]) {
    return pages.map(p => this.getLemmatizedEntitiesOccurrencesInPage(p))
      .reduce(
        (x, y) => {
          Object.keys(y).forEach(k => {
            if (x[k]) {
              x[k] = x[k].concat([y[k]]);
            } else {
              x[k] = [y[k]];
            }
          });

          return x;
        },
        {});
  }

  public getLemmatizedEntitiesOccurrencesInPage(p: Page): Array<Map<LemmatizedEntityOccurrence>> {
    return p.originalContent
      .filter(e => e.nodeType === 1)
      .map(e => {
        const occurrences = [];
        if (this.tagLemNamesMap.occurrences.indexOf(e.tagName) >= 0 && e.getAttribute('ref')) { // Handle first level page contents
          occurrences.push(this.parseLemmatizedEntityOccurrence(e));
        }

        return occurrences.concat(Array.from(e.querySelectorAll<XMLElement>(this.tagLemNamesMap.occurrences))
          .map(el => this.parseLemmatizedEntityOccurrence(el)));
      })
      .filter(e => e.length > 0)
      .reduce((x, y) => x.concat(y), [])
      .reduce(
        (x, y) => {
          const refsByDoc: LemmatizedEntityOccurrenceRef[] = x[y.ref] ? x[y.ref].refsByDoc || [] : [];
          const docRefs = refsByDoc.find(r => r.docId === y.docId);
          if (docRefs) {
            docRefs.refs.push(y.el);
          } else {
            refsByDoc.push({
              docId: y.docId,
              refs: [y.el],
              docLabel: y.docLabel,
            });
          }

          return {
            ...x, [y.ref]: {
              pageId: p.id,
              pageLabel: p.label,
              refsByDoc,
            },
          } as Array<Map<LemmatizedEntityOccurrence>>;
        },
        {});
  }

  private parseLemmatizedEntityOccurrence(xml: XMLElement) {
    const doc = xml.closest('text');
    const elementParser = createParser(GenericElemParser, parse);

    return {
      ref: xml.getAttribute('ref').replace('#', ''),
      el: elementParser.parse(xml),
      docId: doc ? doc.getAttribute('xml:id') : '', // TODO: get proper document id when missing
      docLabel: doc ? doc.getAttribute('n') || doc.getAttribute('xml:id') : '', // TODO: get proper document label when attributes missing
    };
  }
}
