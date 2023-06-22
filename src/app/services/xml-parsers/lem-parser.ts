import { AppConfig } from 'src/app/app.config';
import { xmlParser } from '.';
/* add LemEntry FS */
import { LemEntry, Note, Reading, XMLElement } from '../../models/evt-models';
import { getOuterHTML } from '../../utils/dom-utils';
import { removeSpaces } from '../../utils/xml-utils';
import { AttributeParser, EmptyParser, NoteParser } from './basic-parsers';
import { createParser, getID, Parser } from './parser-models';

@xmlParser('rdg', RdgParser)
export class RdgParser extends EmptyParser implements Parser<XMLElement> {
    private readingGroupTagName = 'rdgGrp';
    attributeParser = createParser(AttributeParser, this.genericParse);

    public parse(rdg: XMLElement): Reading {
        return {
            type: Reading,
            id: getID(rdg),
            attributes: this.attributeParser.parse(rdg),
            witIDs: this.parseReadingWitnesses(rdg) || [],
            content: this.parseAppReadingContent(rdg),
            significant: this.isReadingSignificant(rdg),
            class: rdg.tagName.toLowerCase(),
        };
    }

    private parseReadingWitnesses(rdg: XMLElement) {
        return rdg.getAttribute('wit')?.split('#')
            .map((el) => removeSpaces(el))
            .filter((el) => el.length !== 0);
    }

    private parseAppReadingContent(rdg: XMLElement) {
        return Array.from(rdg.childNodes)
            .map((child: XMLElement) => this.genericParse(child));
    }

    private isReadingSignificant(rdg: XMLElement): boolean {
        const lemNotSignificantReadings = AppConfig.evtSettings.edition.lemNotSignificantVariants;
        let isSignificant = true;

        if (lemNotSignificantReadings.length > 0) {
            isSignificant = this.isSignificant(lemNotSignificantReadings, rdg.attributes);
            if (isSignificant && rdg.parentElement.tagName === this.readingGroupTagName) {
                isSignificant = this.isSignificant(lemNotSignificantReadings, rdg.parentElement.attributes);
            }
        }

        return isSignificant;
    }

    private isSignificant(notSignificantReading: string[], attributes: NamedNodeMap): boolean {
        return !Array.from(attributes).some(({ name, value }) => notSignificantReading.includes(`${name}=${value}`));
    }
}

// add by FS - add here new tag for CPD
@xmlParser('evt-lem-entry-parser', LemParser)
export class LemParser extends EmptyParser implements Parser<XMLElement> {
    private lemmaTagName = 'app[type="lemma"]';
    private noteTagName = 'note';
    private lemEntryTagName = 'lem';
    private readingTagName = 'rdg';

    attributeParser = createParser(AttributeParser, this.genericParse);
    noteParser = createParser(NoteParser, this.genericParse);
    rdgParser = createParser(RdgParser, this.genericParse);

/* add lemEntry FS */
public parse(lemEntry: XMLElement): LemEntry {
    return {
        type: LemEntry,
        id: getID(lemEntry),
        attributes: this.attributeParser.parse(lemEntry),
        content: [],
        lemma: this.parseLemma(lemEntry),
        readings: this.parseReadings(lemEntry),
        notes: this.parseLemNotes(lemEntry),
        originalEncoding: getOuterHTML(lemEntry),
        class: lemEntry.tagName.toLowerCase(),
        nestedLemsIDs: this.getNestedLemsIDs(lemEntry),
    };
}
// add by FS - add here new tag for CPD
    private getNestedLemsIDs(lem: XMLElement): string[] {
        const nesLems = lem.querySelectorAll('app[type="lemma"]');

        return Array.from(nesLems).map((a: XMLElement) => getID(a));
    }

    private parseLemNotes(lemEntry: XMLElement): Note[] {
        const notes = Array.from(lemEntry.children)
            .filter(({ tagName }) => tagName === this.noteTagName)
            .map((note: XMLElement) => this.noteParser.parse(note));
        return notes;
    }

    /* add parseLemma FS */
    private parseLemma(lemEntry: XMLElement): Reading {
        return lemEntry.querySelector(`${this.lemmaTagName}`) ?
            this.rdgParser.parse(lemEntry.querySelector(`${this.lemmaTagName}`)) : undefined;
    }
    
    private parseReadings(lemEntry: XMLElement): Reading[] {
        return Array.from(lemEntry.querySelectorAll(`${this.readingTagName}`))
            .filter((el) => el.closest(this.lemEntryTagName) === lemEntry)
            .map((rdg: XMLElement) => this.rdgParser.parse(rdg));
    }
}
