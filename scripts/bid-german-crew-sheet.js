import { BladesCrewSheet } from "/systems/blades-in-the-dark/module/blades-crew-sheet.js";
import { registerActorSheet } from "/systems/blades-in-the-dark/module/compat.js";
import { BladesHelpers } from "/systems/blades-in-the-dark/module/blades-helpers.js";
import { openFormDialog } from "/systems/blades-in-the-dark/module/lib/dialog-compat.js";
import { CREW_CLAIMS, CREW_UPGRADE_TOOLTIPS, crewContentFor } from "./de-crew-content.js";

const MODULE_ID = "BidGermanSheet";
const TEMPLATE = `modules/${MODULE_ID}/templates/crew-sheet.hbs`;


const CREW_TYPE_NAMES = {
  Assassins: "Attentäter",
  Bravos: "Haudegen",
  Cult: "Kultisten",
  Hawkers: "Schieber",
  Shadows: "Phantome",
  Smugglers: "Schmuggler"
};
const CREW_TYPE_DESCRIPTIONS = {
  Assassins: "Auftragsmörder",
  Bravos: "Söldner & Totschläger",
  Cult: "Anhänger einer vergessenen Gottheit",
  Hawkers: "Händler des Lasters",
  Shadows: "Diebe und Spione",
  Smugglers: "Lieferanten verbotener Waren"
};
const CREW_XP_CLUES = {
  assassins: ["Führt einen erfolgreichen Unfall-, Beseitigungs-, Mord- oder Geiselnahmeeinsatz durch."],
  bravos: ["Führt einen erfolgreichen Kampf-, Erpressungs-, Sabotage- oder Raubzugeinsatz durch."],
  cult: ["Treibt die Ziele eurer Gottheit voran oder verkörpert ihre Gebote im Handeln."],
  hawkers: ["Erschließt eine neue Warenquelle, führt einen geheimen Verkauf durch oder sichert euch neues Revier."],
  shadows: ["Führt einen erfolgreichen Spionage-, Sabotage-, Diebstahl- oder Einbruchseinsatz durch."],
  smugglers: ["Führt einen erfolgreichen Schmuggeleinsatz durch oder gewinnt neue Kunden beziehungsweise Quellen für Schmuggelware."],
  common: [
    "Messt euch mit Herausforderungen oberhalb eures Standes.",
    "Unterstreicht den Ruf eurer Gang oder entwickelt einen neuen.",
    "Bringt die Ziele, Antriebe, inneren Konflikte oder den wahren Kern der Gang zum Ausdruck."
  ]
};
const CREW_FOOTERS = {
  assassins: { label: "Jagdgebiet", examples: "Beseitigung - Geiselnahme - Mord - Unfall" },
  bravos: { label: "Jagdgebiet", examples: "Gefecht - Erpressung - Sabotage - Blitzeinbruch" },
  cult: { label: "Heilige Stätte", examples: "Beschaffung - Opferung - Prophezeihung - Weihung" },
  hawkers: { label: "Absatzgebiet", examples: "Geselligkeiten - Lieferung - Exempel - Verkauf" },
  shadows: { label: "Jagdgebiete", examples: "Einbruch - Raub - Sabotage - Spionage" },
  smugglers: { label: "Fracht", examples: "Arkan/Unheimlich - Heisse Ware - Passagiere - Waffen" }
};
const COHORT_LABELS = {
  Gang: "Bande",
  Expert: "Experte",
  Adepts: "Adepten",
  Rooks: "Schwindler",
  Rovers: "Vagabunden",
  Skulks: "Baldower",
  Thugs: "Schläger",
  Fearsome: "Furchteinflößend",
  Independent: "Eigenständig",
  Loyal: "Loyal",
  Tenacious: "Hartnäckig",
  Principled: "Prinzipientreu",
  Savage: "Brutal",
  Unreliable: "Unzuverlässig",
  Wild: "Wild"
};
const COHORT_GANG_TYPES = ["Adepts", "Rooks", "Rovers", "Skulks", "Thugs"];
const COHORT_GANG_DESCRIPTIONS = {
  Adepts: "Gelehrte, Tüftler, Okkultisten und Chemiker.",
  Skulks: "Kundschafter, Einbrecher und Diebe.",
  Thugs: "Mörder, Raufbolde und Unruhestifter.",
  Rooks: "Trickbetrüger, Spitzel und Salonlöwen.",
  Rovers: "Seeleute, Kutscher und Siechland-Plünderer."
};
const COHORT_EDGES = ["Fearsome", "Independent", "Loyal", "Tenacious"];
const COHORT_FLAWS = ["Principled", "Savage", "Unreliable", "Wild"];
const COHORT_EDGE_DESCRIPTIONS = {
  Independent: "Man kann sich darauf verlassen, dass die Komplizen auch ohne direkte Befehle die richtigen Entscheidungen treffen und in Eigeninitiative handeln.",
  Fearsome: "Die Komplizen sind beängstigend in Erscheinung und Ruf.",
  Tenacious: "Die Komplizen lassen sich von ihrer Aufgabe nicht abbringen.",
  Loyal: "Die Komplizen lassen sich nicht bestechen oder gegen euch wenden."
};
const COHORT_FLAW_DESCRIPTIONS = {
  Savage: "Die Komplizen sind übertrieben gewalttätig und grausam.",
  Principled: "Die Komplizen haben Ethik oder Werte, die sie nie verraten würden.",
  Unreliable: "Die Komplizen sind aufgrund anderer Verpflichtungen, Benommenheit durch ihre Laster etc. nicht immer verfügbar.",
  Wild: "Die Komplizen sind versoffen, zügellos und großmäulig."
};
const COHORT_HARM = {
  No: "Unverletzt",
  Weakened: "Geschwächt",
  Impaired: "Angeschlagen",
  Broken: "Erledigt",
  Dead: "Tot"
};
const COHORT_HARM_DESCRIPTIONS = {
  No: "Die Komplizen sind unverletzt und können normal handeln.",
  Weakened: "Die Komplizen haben verringerte Wirkung.",
  Impaired: "Die Komplizen agieren mit verringerter Qualität (-1W).",
  Broken: "Die Komplizen können nicht mehr handeln, bis sie sich erholt haben.",
  Dead: "Die Komplizen sind vernichtet."
};
const GENERAL_UPGRADES = [
  { group: "Versteck", key: "carriage", label: "Kutsche", boxes: 2 },
  { group: "Versteck", key: "boat", label: "Boot", boxes: 2 },
  { group: "Versteck", key: "hidden", label: "Geheim", boxes: 1 },
  { group: "Versteck", key: "quarters", label: "Wohnraum", boxes: 1 },
  { group: "Versteck", key: "secure", label: "Sicher", boxes: 2 },
  { group: "Versteck", key: "vault", label: "Speicher", boxes: 2 },
  { group: "Versteck", key: "workshop", label: "Werkstatt", boxes: 1 },
  { group: "Qualität", key: "documents", label: "Dokumente", boxes: 1 },
  { group: "Qualität", key: "gear", label: "Ausrüstung", boxes: 1 },
  { group: "Qualität", key: "implements", label: "Gerätschaften", boxes: 1 },
  { group: "Qualität", key: "supplies", label: "Zubehör", boxes: 1 },
  { group: "Qualität", key: "tools", label: "Werkzeug", boxes: 1 },
  { group: "Qualität", key: "weapons", label: "Waffen", boxes: 1 },
  { group: "Training", key: "insight", label: "Verstand", boxes: 1 },
  { group: "Training", key: "resolve", label: "Wille", boxes: 1 },
  { group: "Training", key: "prowess", label: "Zähigkeit", boxes: 1 },
  { group: "Training", key: "playbook", label: "Charakterbuch", boxes: 1 },
  { group: "Training", key: "mastery", label: "Meisterschaft", boxes: 4 }
];
const GENERAL_UPGRADE_DESCRIPTIONS = {
  carriage: "Kutschenhaus: Ihr habt eine Kutsche, zwei Zugziegen und einen Stall. Eine zweite Verbesserung ergänzt die Kutsche um Panzerung sowie größere und schnellere Ziegen. Pferde sind in Doskvol sehr selten; die meisten Kutschen verwenden die große akorosische Ziege als Zugtier.",
  boat: "Bootshaus: Ihr habt ein Boot, eine Anlegestelle an einer Wasserstraße und einen kleinen Schuppen für eure Bootsausrüstung. Eine zweite Verbesserung ergänzt das Boot um Panzerung und mehr Laderaum.",
  hidden: "Geheimes Versteck: Euer Versteck liegt an einem geheimen Ort und ist vor fremden Blicken getarnt. Wird es entdeckt, müsst ihr zwei Zwischenzeitaktivitäten aufwenden und Münzen in Höhe eurer Stufe zahlen, um es umzuziehen und erneut zu verstecken.",
  quarters: "Wohnraum: Euer Versteck besitzt einen Wohnbereich für die Gang. Ohne diese Verbesserung muss jeder SC anderswo schlafen und ist dabei entsprechend angreifbar.",
  secure: "Sicheres Versteck: Schlösser, Alarmvorrichtungen und Fallen wehren Eindringlinge ab. Eine zweite Verbesserung ergänzt arkane Abwehrmaßnahmen gegen Geister. Werden diese Maßnahmen auf die Probe gestellt, kann ein Wurf auf die Gang-Stufe nötig werden.",
  vault: "Speicher: Ein sicherer Speicher vergrößert euren Münzen-Lagerraum auf 8. Eine zweite Verbesserung erhöht ihn auf 16. Ein abgetrennter Bereich kann als Gefängniszelle dienen.",
  workshop: "Werkstatt: Euer Versteck verfügt über Bastler- und Alchemiewerkzeuge sowie eine kleine Bibliothek mit Büchern, Dokumenten und Karten. Damit könnt ihr Langzeitprojekte bearbeiten, ohne das Versteck zu verlassen.",
  documents: "Qualität: Diese Verbesserung erhöht den Qualitätswert aller Dokumente der SC um 1, zusätzlich zu Gang-Stufe und hochwertigen Gegenständen.",
  gear: "Qualität: Diese Verbesserung erhöht den Qualitätswert von Ausrüstung der SC um 1. Sie umfasst Einbrecher- und Kletterausrüstung.",
  implements: "Qualität: Diese Verbesserung erhöht den Qualitätswert aller arkanen Gerätschaften der SC um 1.",
  supplies: "Qualität: Diese Verbesserung erhöht den Qualitätswert allen Täuscherzubehörs der SC um 1.",
  tools: "Qualität: Diese Verbesserung erhöht den Qualitätswert aller Werkzeuge der SC um 1. Sie umfasst Brech- und Bastlerwerkzeug.",
  weapons: "Qualität: Diese Verbesserung erhöht den Qualitätswert aller Waffen der SC um 1, zusätzlich zu Gang-Stufe und hochwertigen Gegenständen.",
  insight: "Verstands-Training: Beim Training von Verstand während der Zwischenzeit erhältst du 2 EP statt 1 EP.",
  resolve: "Willens-Training: Beim Training von Wille während der Zwischenzeit erhältst du 2 EP statt 1 EP.",
  prowess: "Zähigkeits-Training: Beim Training von Zähigkeit während der Zwischenzeit erhältst du 2 EP statt 1 EP.",
  playbook: "Charakterbuch-Training: Beim Training des Charakterbuchs während der Zwischenzeit erhältst du 2 EP statt 1 EP.",
  mastery: "Meisterschaft: Eure Gang hat Zugang zu Training auf Meisterniveau. Die Aktionswerte der SC dürfen bis auf 4 gesteigert werden; ohne diese Verbesserung liegt die Obergrenze bei 3. Das Freischalten kostet vier Verbesserungskästchen."
};

function numeric(value) {
  if (Array.isArray(value)) value = value[0];
  return Number(value) || 0;
}

function tracker(value, maximum) {
  const current = numeric(value);
  return Array.from({ length: Number(maximum) || 0 }, (_entry, index) => ({
    value: index + 1,
    active: index < current
  }));
}

function plainText(value) {
  const div = document.createElement("div");
  div.innerHTML = String(value ?? "");
  return div.textContent?.trim() ?? "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export class BidGermanCrewSheet extends BladesCrewSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["blades-in-the-dark", "sheet", "actor", "crew", "bid-paper-crew-sheet"],
      template: TEMPLATE,
      width: 1500,
      height: 900,
      resizable: true,
      tabs: []
    });
  }

  getData(options) {
    const data = super.getData(options);
    const system = data.system ?? {};
    const items = Array.from(data.items ?? []);
    const crewType = items.find(item => item.type === "crew_type");
    const [crewKey, crewContent] = crewContentFor(crewType?.name);
    const crewSelections = this.actor.getFlag(MODULE_ID, "crewSelections") ?? {};
    const selectedCrewData = crewSelections[crewKey] ?? {};
    const claimTranslations = CREW_CLAIMS[crewKey] ?? {};
    const claims = Object.entries(crewType?.system?.turfs ?? {}).map(([id, claim]) => {
      const translated = claimTranslations[id];
      return {
        id,
        itemId: crewType?.id ?? crewType?._id ?? "",
        name: translated?.[0] ?? game.i18n.localize(claim.name ?? "Revier"),
        description: translated?.[1] ?? plainText(game.i18n.localize(claim.description ?? "")),
        active: Boolean(claim.value)
      };
    });
    const generalUpgradeFlags = this.actor.getFlag(MODULE_ID, "crewUpgrades") ?? {};
    const prepareGeneralUpgrades = group => GENERAL_UPGRADES.filter(upgrade => upgrade.group === group).map(upgrade => ({
        ...upgrade,
        description: GENERAL_UPGRADE_DESCRIPTIONS[upgrade.key] ?? "",
        active: Boolean(generalUpgradeFlags[upgrade.key]),
        connected: upgrade.boxes > 1,
        square: upgrade.key === "mastery",
        boxList: Array.from({ length: upgrade.boxes })
      }));
    const generalUpgrades = {
      hideout: prepareGeneralUpgrades("Versteck"),
      quality: prepareGeneralUpgrades("Qualität"),
      training: prepareGeneralUpgrades("Training")
    };

    // Jedes aktive Revier reduziert die zum Aufstieg erforderliche Reputation.
    const reputation = tracker(system.reputation, system.max?.rep ?? 12);
    const turfReduction = Math.min(reputation.length, numeric(system.turfs_amount));
    reputation.forEach((entry, index) => {
      entry.territory = index >= reputation.length - turfReduction;
    });

    data.bidCrew = {
      crewType,
      crewTypeId: crewType?.id ?? crewType?._id ?? "",
      crewTypeName: crewContent?.label ?? crewType?.name ?? "GANGBUCH WÄHLEN",
      crewTypeDescription: crewContent?.tagline ?? plainText(crewType?.system?.description),
      crewKey,
      footer: {
        ...(CREW_FOOTERS[crewKey] ?? { label: "Jagdgebiet", examples: "" }),
        value: this.actor.getFlag(MODULE_ID, "crewFooters")?.[crewKey]
          ?? this.actor.getFlag(MODULE_ID, "huntingGround")
          ?? items.find(item => item.type === "hunting_grounds")?.name
          ?? ""
      },
      reputationName: this.actor.getFlag(MODULE_ID, "reputationName")
        ?? items.find(item => item.type === "crew_reputation")?.name
        ?? "",
      reputation,
      heat: tracker(system.heat, system.max?.heat ?? 9),
      wanted: tracker(system.wanted, system.max?.wanted ?? 4),
      experience: tracker(system.experience, system.max?.exp ?? 10),
      tier: tracker(system.tier, system.max?.tier ?? 4),
      coins: tracker(system.coins?.value, system.coins?.max ?? 4),
      vault: tracker(system.vault?.value, Math.max(numeric(system.vault?.max), 12)),
      hold: Array.isArray(system.hold) ? system.hold[0] : system.hold,
      claims,
      generalUpgrades,
      abilities: (crewContent?.abilities ?? []).map(([key, name, description]) => ({
        key, name, descriptionText: description, selected: Boolean(selectedCrewData.abilities?.[key])
      })),
      upgrades: (crewContent?.upgrades ?? []).map(([key, name, description, boxes]) => ({
        key, name, descriptionText: description, tooltip: CREW_UPGRADE_TOOLTIPS[crewKey]?.[key] ?? description,
        selected: Boolean(selectedCrewData.upgrades?.[key]),
        informational: boxes === 0,
        connected: boxes > 1, boxList: Array.from({ length: boxes })
      })),
      // Komplizen sind eingebettete System-Items. Qualität und Ausmaß werden aus der aktuellen Gang-Stufe abgeleitet
      cohorts: items.filter(item => item.type === "cohort").map(item => {
        const cohortDocument = this.actor.items.get(item.id ?? item._id);
        const cohortType = Array.isArray(item.system?.cohort) ? item.system.cohort[0] : item.system?.cohort;
        const gangTypes = Array.from(item.system?.gang_type ?? []).map(type => COHORT_LABELS[type] ?? type);
        const selectedEdgeKeys = Object.entries(item.system?.edges_list ?? {})
          .filter(([_key, edge]) => edge.selected)
          .map(([key]) => key);
        const selectedFlawKeys = Object.entries(item.system?.flaws_list ?? {})
          .filter(([_key, flaw]) => flaw.selected)
          .map(([key]) => key);
        const harm = Array.isArray(item.system?.harm) ? item.system.harm[0] : item.system?.harm;
        const specialty = plainText(item.system?.expert_type);
        const crewTier = numeric(system.tier);
        const elite = Boolean(cohortDocument?.getFlag(MODULE_ID, "elite"));
        return {
          _id: item.id ?? item._id,
          name: /^[A-Za-z0-9]{16}$/.test(item.name ?? "") ? "Unbenannter Komplize" : item.name,
          typeLabel: COHORT_LABELS[cohortType] ?? cohortType ?? "Komplize",
          subtype: cohortType === "Gang" ? [gangTypes.join(", "), specialty].filter(Boolean).join(" - ") : specialty,
          isGang: cohortType === "Gang",
          isExpert: cohortType === "Expert",
          elite,
          quality: cohortType === "Gang" ? crewTier : (cohortType === "Expert" ? crewTier + 1 : numeric(item.system?.quality)),
          scale: cohortType === "Gang" ? crewTier : (cohortType === "Expert" ? 0 : numeric(item.system?.scale)),
          descriptionText: plainText(item.system?.description),
          edges: selectedEdgeKeys.map(key => COHORT_LABELS[key] ?? key).join(", "),
          flaws: selectedFlawKeys.map(key => COHORT_LABELS[key] ?? key).join(", "),
          edgesTitle: selectedEdgeKeys.map(key => `${COHORT_LABELS[key]}: ${COHORT_EDGE_DESCRIPTIONS[key]}`).join("\n"),
          flawsTitle: selectedFlawKeys.map(key => `${COHORT_LABELS[key]}: ${COHORT_FLAW_DESCRIPTIONS[key]}`).join("\n"),
          weakened: harm === "Weakened",
          impaired: harm === "Impaired",
          broken: ["Broken", "Dead"].includes(harm),
          harmLabel: COHORT_HARM[harm] ?? harm ?? "Unverletzt",
          harmTitle: COHORT_HARM_DESCRIPTIONS[harm] ?? "",
          armor: Boolean(item.system?.armor)
        };
      }),
      contacts: (Array.isArray(selectedCrewData.contactList)
        ? selectedCrewData.contactList
        : (crewContent?.contacts ?? []).map(([name, description], index) => ({ id: `contact${index}`, name, description })))
        .map(contact => ({
          key: contact.id, name: contact.name, description_short: contact.description,
          standing: selectedCrewData.contacts?.[contact.id] ?? selectedCrewData.contacts?.[contact.name] ?? "neutral"
        })),
      xpClues: crewKey
        ? [...(CREW_XP_CLUES[crewKey] ?? []), ...CREW_XP_CLUES.common]
        : plainText(crewType?.system?.experience_clues)
          .split(/\r?\n|\u25C6|\u2022/)
          .map(entry => entry.trim())
          .filter(Boolean)
    };
    return data;
  }

    // Scrollpositionen Speichern um springen zu verhindern
  activateListeners(html) {
    super.activateListeners(html);
    this.#restoreScrollPositions(html);
    this.#watchClaimTitleSizes(html);
    this.#watchCohortDescriptionSizes(html);
    html.find("button, input[type='checkbox'], input[type='radio']")
      .on("mousedown.bidCrewScroll contextmenu.bidCrewScroll", () => this.#rememberScrollPositions(html));
    html.find(".turf-select").off("click").on("click", event => this.#onTurfSelect(event, html));
    html.find("[data-bid-crew-action='track']").on("click contextmenu", event => this.#onTrack(event));
    html.find("[data-bid-crew-action='hold']").on("click", event => this.#onHold(event));
    html.find("[data-bid-crew-action='upgrade-toggle']").on("click", event => this.#onUpgradeToggle(event));
    html.find("[data-bid-crew-action='ability-toggle']").on("click", event => this.#onCrewCatalogToggle(event, "abilities"));
    html.find("[data-bid-crew-action='crew-upgrade-toggle']").on("click", event => this.#onCrewCatalogToggle(event, "upgrades"));
    html.find("[data-bid-crew-action='contact-standing']").on("click", event => this.#onContactStanding(event));
    html.find("[data-bid-crew-action='contacts-edit']").on("click", event => this.#openContactsEditor(event));
    html.find("[data-bid-crew-action='hunting-ground']").on("change", event => this.#saveHuntingGround(event));
    html.find("[data-bid-crew-action='reputation-name']").on("change", event => this.#saveReputationName(event));
    html.find(".item-sheet-open").off("click").on("click", event => this.#openCohortEditor(event));
  }
//Größenanderung der Karte anpassen
  #watchClaimTitleSizes(html) {
    this._bidCrewClaimResizeObserver?.disconnect();
    const grid = html.filter(".bid-crew-sheet").add(html.find(".bid-crew-sheet")).first()
      .find(".bid-crew-claims").get(0);
    if (!grid) return;
    const fit = () => this.#fitClaimTitles(grid);
    this._bidCrewClaimResizeObserver = new ResizeObserver(fit);
    this._bidCrewClaimResizeObserver.observe(grid);
    fit();
  }

  #fitClaimTitles(grid) {
    for (const title of grid.querySelectorAll("article > strong")) {
      title.style.fontSize = "";
      let size = Number.parseFloat(getComputedStyle(title).fontSize) || 18;
      while (title.scrollWidth > title.clientWidth && size > 8) {
        size -= 0.5;
        title.style.fontSize = `${size}px`;
      }
    }
  }

//Skalierung des Crew Textes
  #watchCohortDescriptionSizes(html) {
    this._bidCrewCohortResizeObserver?.disconnect();
    const container = html.filter(".bid-crew-sheet").add(html.find(".bid-crew-sheet")).first()
      .find(".bid-crew-cohorts").get(0);
    if (!container) return;
    const fit = () => {
      for (const description of container.querySelectorAll("article > p")) {
        description.style.fontSize = "";
        let size = Number.parseFloat(getComputedStyle(description).fontSize) || 13;
        while (description.scrollHeight > description.clientHeight + 1 && size > 9) {
          size -= 0.5;
          description.style.fontSize = `${size}px`;
        }
      }
    };
    this._bidCrewCohortResizeObserver = new ResizeObserver(fit);
    this._bidCrewCohortResizeObserver.observe(container);
    fit();
  }

  #rememberScrollPositions(html) {
    const find = selector => html.filter(selector).add(html.find(selector)).first();
    this._bidCrewScrollPositions = {
      sheet: find(".bid-crew-sheet").scrollTop() ?? 0,
      abilities: find(".bid-crew-abilities").scrollTop() ?? 0,
      cohorts: find(".bid-crew-cohorts").scrollTop() ?? 0
    };
  }

  #restoreScrollPositions(html) {
    const positions = this._bidCrewScrollPositions;
    if (!positions) return;
    const find = selector => html.filter(selector).add(html.find(selector)).first();
    find(".bid-crew-sheet").scrollTop(positions.sheet);
    find(".bid-crew-abilities").scrollTop(positions.abilities);
    find(".bid-crew-cohorts").scrollTop(positions.cohorts);
    delete this._bidCrewScrollPositions;
  }

  async #onTurfSelect(event, html) {
    event.preventDefault();
    if (!this.options.editable) return;
    this.#rememberScrollPositions(html);
    const { itemId, turfId, turfStatus } = event.currentTarget.dataset;
    if (!itemId || !turfId) return;
    await this.actor.updateEmbeddedDocuments("Item", [{
      _id: itemId,
      [`system.turfs.${turfId}.value`]: turfStatus !== "true"
    }]);
  }

  async _onItemAddClick(event) {
    const itemType = event.currentTarget.dataset.itemType;
    if (itemType !== "crew_type") return super._onItemAddClick(event);
    event.preventDefault();
    if (!this.options.editable) return;

    const crewTypes = await BladesHelpers.getAllItemsByType("crew_type", game);
    const rows = crewTypes.map(item => {
      const name = escapeHtml(CREW_TYPE_NAMES[item.name] ?? item.name);
      const description = escapeHtml(CREW_TYPE_DESCRIPTIONS[item.name] ?? plainText(item.system?.description));
      return `<label class="bid-crew-type-choice" title="${description}">
        <input type="radio" name="select_items" value="${item._id}">
        <i class="bid-crew-type-marker" aria-hidden="true"></i>
        <span><strong>${name}</strong><small>${description}</small></span>
      </label>`;
    }).join("");

    const result = await openFormDialog({
      title: "Gangbuch auswählen",
      content: `<form class="bid-crew-type-dialog"><h3>Gangbuch</h3>${rows}</form>`,
      okLabel: "Auswählen",
      cancelLabel: "Abbrechen"
    });
    if (!result?.select_items) return;
    await this.addItemsToSheet("crew_type", result.select_items);
  }

  async #onTrack(event) {
    event.preventDefault();
    if (!this.options.editable) return;
    const { path, value } = event.currentTarget.dataset;
    const current = numeric(foundry.utils.getProperty(this.actor, path));
    const clicked = Number(value);
    const next = event.type === "contextmenu" ? Math.max(0, current - 1) : (current === clicked ? clicked - 1 : clicked);
    await this.actor.update({ [path]: next });
  }

  async #onHold(event) {
    event.preventDefault();
    if (!this.options.editable) return;
    await this.actor.update({ "system.hold": [event.currentTarget.dataset.value] });
  }

  async #openCohortEditor(event) {
    event.preventDefault();
    if (!this.options.editable) return;
    const item = this.actor.items.get(event.currentTarget.closest("[data-item-id]")?.dataset.itemId);
    if (!item) return;

    const cohortType = Array.isArray(item.system.cohort) ? item.system.cohort[0] : item.system.cohort;
    const rawGangTypes = item.system.gang_type;
    const gangTypes = new Set(Array.isArray(rawGangTypes) ? rawGangTypes : (rawGangTypes ? [rawGangTypes] : []));
    const harm = Array.isArray(item.system.harm) ? item.system.harm[0] : item.system.harm;
    const checkboxRows = (keys, prefix, selected, descriptions = {}, showDescriptions = false) => keys.map(key =>
      `<label title="${escapeHtml(descriptions[key] ?? "")}"><input type="checkbox" name="${prefix}_${key}" ${selected(key) ? "checked" : ""}> <span><b>${escapeHtml(COHORT_LABELS[key] ?? key)}</b>${showDescriptions && descriptions[key] ? `<small>${escapeHtml(descriptions[key])}</small>` : ""}</span></label>`
    ).join("");
    const harmRows = Object.entries(COHORT_HARM).map(([key, label]) =>
      `<label title="${escapeHtml(COHORT_HARM_DESCRIPTIONS[key])}"><input type="radio" name="harm" value="${key}" ${harm === key ? "checked" : ""}> <span>${label}</span></label>`
    ).join("");
    const selectedGangType = COHORT_GANG_TYPES.find(key => gangTypes.has(key)) ?? "Adepts";
    const currentSpecialty = String(item.system.expert_type ?? "");
    const crewTier = numeric(this.actor.system.tier);
    const scaleSizes = ["1 bis 2 Personen", "3 bis 6 Personen", "12 Personen", "20 Personen", "40 Personen", "80 Personen", "160 Personen"];
    const gangSize = scaleSizes[Math.min(crewTier, scaleSizes.length - 1)] ?? `${crewTier} Ausmaß`;
    const elite = Boolean(item.getFlag(MODULE_ID, "elite"));
    const gangTypeRows = COHORT_GANG_TYPES.map(key =>
      `<label class="bid-cohort-gang-type"><input type="radio" name="gang_type" value="${key}" ${selectedGangType === key ? "checked" : ""}><span><b>${escapeHtml(COHORT_LABELS[key])}</b><small>${escapeHtml(COHORT_GANG_DESCRIPTIONS[key])}</small></span></label>`
    ).join("");

    // Beim Umschalten zwischen Bande und Experte zeigt der offene Dialog sofort nur die jeweils gültigen abgeleiteten Werte und die zulässige Elite-Option an.
    const syncPowerDisplay = event => {
      if (!event.target.matches?.(".bid-cohort-editor input[name='cohort']")) return;
      const form = event.target.closest(".bid-cohort-editor");
      for (const row of form?.querySelectorAll(".bid-cohort-power-row") ?? []) {
        row.classList.toggle("active", row.dataset.cohort === event.target.value);
      }
      form?.querySelector(".bid-cohort-editor-elite")?.classList.toggle("active", event.target.value === "Gang");
    };
    document.addEventListener("change", syncPowerDisplay);
    const resetDialogScroll = new MutationObserver(() => {
      const form = document.querySelector(".bid-cohort-editor");
      if (!form) return;
      form.scrollTop = 0;
      let parent = form.parentElement;
      while (parent && parent !== document.body) {
        if (parent.scrollTop) parent.scrollTop = 0;
        parent = parent.parentElement;
      }
      requestAnimationFrame(() => {
        form.scrollTop = 0;
        form.querySelector("input[name='name']")?.focus({ preventScroll: true });
      });
      resetDialogScroll.disconnect();
    });
    resetDialogScroll.observe(document.body, { childList: true, subtree: true });
    let result;
    try {
      result = await openFormDialog({
      title: "Komplizen bearbeiten",
      content: `<form class="bid-cohort-editor">
        <div class="bid-cohort-editor-header-row">
          <b class="bid-cohort-editor-name-label">Name des Komplizen</b>
          <input class="bid-cohort-editor-name-input" type="text" name="name" value="${escapeHtml(item.name)}" placeholder="Komplizen benennen">
          <b class="bid-cohort-editor-type-label">Komplizentyp</b>
          <div class="bid-cohort-editor-options">
            <label><input type="radio" name="cohort" value="Gang" ${cohortType === "Gang" ? "checked" : ""}> <span>Bande</span></label>
            <label><input type="radio" name="cohort" value="Expert" ${cohortType === "Expert" ? "checked" : ""}> <span>Experte</span></label>
          </div>
        </div>
        <div class="bid-cohort-editor-columns">
          <fieldset class="bid-cohort-editor-gang-types"><legend>Bandentyp</legend>${gangTypeRows}</fieldset>
          <div class="bid-cohort-editor-specialty">
            <label class="bid-cohort-editor-elite ${cohortType === "Gang" ? "active" : ""}" title="Elite-Banden erhalten +1W, wenn sie für ihren Bandentyp würfeln."><input type="checkbox" name="elite" ${elite ? "checked" : ""}><span><b>Elite-Bande</b><small>+1W auf Würfe für den gewählten Bandentyp.</small></span></label>
            <label><b>Fachgebiet</b><input type="text" name="specialty" value="${escapeHtml(currentSpecialty)}" placeholder="Fachgebiet eintragen"></label>
            <div class="bid-cohort-editor-power">
              <b>Aus der Gang-Stufe abgeleitete Werte</b>
              <div class="bid-cohort-power-row ${cohortType === "Gang" ? "active" : ""}" data-cohort="Gang"><strong>Bande</strong><span>Qualität ${crewTier} · Ausmaß ${crewTier}</span><small>${gangSize}</small></div>
              <div class="bid-cohort-power-row ${cohortType === "Expert" ? "active" : ""}" data-cohort="Expert"><strong>Experte</strong><span>Qualität ${crewTier + 1} · Ausmaß 0</span><small>1 Person</small></div>
              <em>Aktuelle Gang-Stufe: ${crewTier}</em>
            </div>
          </div>
        </div>
        <div class="bid-cohort-editor-columns">
          <fieldset><legend>Stärken</legend>${checkboxRows(COHORT_EDGES, "edge", key => Boolean(item.system.edges_list?.[key]?.selected), COHORT_EDGE_DESCRIPTIONS)}</fieldset>
          <fieldset><legend>Schwächen</legend>${checkboxRows(COHORT_FLAWS, "flaw", key => Boolean(item.system.flaws_list?.[key]?.selected), COHORT_FLAW_DESCRIPTIONS)}</fieldset>
        </div>
        <fieldset><legend>Zustand</legend><div class="bid-cohort-editor-harm">${harmRows}</div><label><input type="checkbox" name="armor" ${item.system.armor ? "checked" : ""}> <span>Rüstung</span></label></fieldset>
        <label class="bid-cohort-editor-description"><b>Beschreibung und Notizen</b><textarea name="description">${escapeHtml(item.system.description)}</textarea></label>
        <label class="bid-cohort-editor-delete"><input type="checkbox" name="delete_cohort"><span><b>Komplizen löschen</b><small>Nach dem Speichern folgt eine zusätzliche Sicherheitsabfrage.</small></span></label>
      </form>`,
      okLabel: "Speichern",
      cancelLabel: "Abbrechen",
      dialog: { width: 560 }
      });
    } finally {
      document.removeEventListener("change", syncPowerDisplay);
      resetDialogScroll.disconnect();
    }
    if (!result) return;

    // Unabsichtliches Löschen verhindern
    if (result.delete_cohort !== undefined) {
      const confirmation = await openFormDialog({
        title: "Komplizen endgültig löschen?",
        content: `<form class="bid-cohort-delete-confirm"><p><b>${escapeHtml(item.name)}</b> wird dauerhaft aus der Gang entfernt.</p><p>Dieser Vorgang kann nicht rückgängig gemacht werden.</p></form>`,
        okLabel: "Endgültig löschen",
        cancelLabel: "Abbrechen",
        okIcon: "fas fa-trash"
      });
      if (confirmation) await item.delete();
      return;
    }

    const savedCohort = result.cohort ?? cohortType ?? "Gang";
    const update = {
      name: String(result.name ?? item.name).trim() || "Unbenannter Komplize",
      "system.cohort": [savedCohort],
      "system.gang_type": [result.gang_type ?? selectedGangType],
      "system.expert_type": String(result.specialty ?? "").trim(),
      "system.harm": [result.harm ?? harm ?? "No"],
      "system.armor": result.armor !== undefined,
      "system.description": String(result.description ?? "")
    };
    for (const key of COHORT_EDGES) update[`system.edges_list.${key}.selected`] = result[`edge_${key}`] !== undefined;
    for (const key of COHORT_FLAWS) update[`system.flaws_list.${key}.selected`] = result[`flaw_${key}`] !== undefined;
    await item.update(update);
    if (savedCohort === "Gang") await item.setFlag(MODULE_ID, "elite", result.elite !== undefined);
    else if (item.getFlag(MODULE_ID, "elite") !== undefined) await item.unsetFlag(MODULE_ID, "elite");
  }

  async #onUpgradeToggle(event) {
    event.preventDefault();
    if (!this.options.editable) return;
    const key = event.currentTarget.dataset.key;
    const upgrades = foundry.utils.deepClone(this.actor.getFlag(MODULE_ID, "crewUpgrades") ?? {});
    upgrades[key] = !upgrades[key];
    await this.actor.setFlag(MODULE_ID, "crewUpgrades", upgrades);
  }

  async #onCrewCatalogToggle(event, group) {
    event.preventDefault();
    if (!this.options.editable) return;
    const crewKey = event.currentTarget.closest(".bid-crew-sheet")?.dataset.crewKey;
    if (!crewKey) return;
    const selections = foundry.utils.deepClone(this.actor.getFlag(MODULE_ID, "crewSelections") ?? {});
    const crew = selections[crewKey] ??= {};
    const values = crew[group] ??= {};
    const key = event.currentTarget.dataset.key;
    values[key] = !values[key];
    await this.actor.setFlag(MODULE_ID, "crewSelections", selections);
  }

  async #onContactStanding(event) {
    event.preventDefault();
    if (!this.options.editable) return;
    const crewKey = event.currentTarget.closest(".bid-crew-sheet")?.dataset.crewKey;
    if (!crewKey) return;
    const selections = foundry.utils.deepClone(this.actor.getFlag(MODULE_ID, "crewSelections") ?? {});
    const crew = selections[crewKey] ??= {};
    const contacts = crew.contacts ??= {};
    const key = event.currentTarget.dataset.key;
    const standing = event.currentTarget.dataset.standing;
    contacts[key] = contacts[key] === standing ? "neutral" : standing;
    await this.actor.setFlag(MODULE_ID, "crewSelections", selections);
  }

  async #saveHuntingGround(event) {
    if (!this.options.editable) return;
    const crewKey = event.currentTarget.closest(".bid-crew-sheet")?.dataset.crewKey;
    if (!crewKey) return;
    const footers = foundry.utils.deepClone(this.actor.getFlag(MODULE_ID, "crewFooters") ?? {});
    footers[crewKey] = String(event.currentTarget.value ?? "").trim();
    await this.actor.setFlag(MODULE_ID, "crewFooters", footers);
  }

  async #saveReputationName(event) {
    if (!this.options.editable) return;
    await this.actor.setFlag(MODULE_ID, "reputationName", String(event.currentTarget.value ?? "").trim());
  }

  async #openContactsEditor(event) {
    event.preventDefault();
    if (!this.options.editable) return;
    const crewKey = event.currentTarget.closest(".bid-crew-sheet")?.dataset.crewKey;
    if (!crewKey) return;
    const crewType = Array.from(this.actor.items).find(item => item.type === "crew_type");
    const [, crewContent] = crewContentFor(crewType?.name);
    const selections = foundry.utils.deepClone(this.actor.getFlag(MODULE_ID, "crewSelections") ?? {});
    const crew = selections[crewKey] ??= {};
    const source = Array.isArray(crew.contactList)
      ? foundry.utils.deepClone(crew.contactList)
      : (crewContent?.contacts ?? []).map(([name, description], index) => ({ id: `contact${index}`, name, description }));
    const row = contact => `<div class="bid-crew-contact-edit-row" data-contact-id="${escapeHtml(contact.id)}">
      <input name="contact_name_${escapeHtml(contact.id)}" value="${escapeHtml(contact.name)}" placeholder="Name">
      <input name="contact_description_${escapeHtml(contact.id)}" value="${escapeHtml(contact.description)}" placeholder="Beschreibung">
      <button type="button" data-contact-action="up" title="Nach oben"><i class="fa-solid fa-arrow-up"></i></button>
      <button type="button" data-contact-action="down" title="Nach unten"><i class="fa-solid fa-arrow-down"></i></button>
      <button type="button" data-contact-action="delete" title="Kontakt löschen"><i class="fa-solid fa-trash"></i></button>
    </div>`;
    // Reihenfolge und IDs werden in einem versteckten Feld mitgeführt
    const updateOrder = form => {
      form.querySelector("input[name='contact_order']").value = Array.from(form.querySelectorAll("[data-contact-id]"))
        .map(entry => entry.dataset.contactId).join(",");
    };
    const onEditClick = click => {
      const button = click.composedPath?.().find(node => node?.matches?.(".bid-crew-contacts-editor [data-contact-action]"))
        ?? click.target.closest?.(".bid-crew-contacts-editor [data-contact-action]");
      if (!button) return;
      click.preventDefault();
      const form = button.closest(".bid-crew-contacts-editor");
      const current = button.closest("[data-contact-id]");
      if (button.dataset.contactAction === "add") {
        const id = foundry.utils.randomID();
        form.querySelector(".bid-crew-contact-edit-list").insertAdjacentHTML("beforeend", row({ id, name: "", description: "" }));
        form.querySelector(`[data-contact-id='${id}'] input`)?.focus();
      } else if (button.dataset.contactAction === "delete") current?.remove();
      else if (button.dataset.contactAction === "up" && current?.previousElementSibling) current.parentElement.insertBefore(current, current.previousElementSibling);
      else if (button.dataset.contactAction === "down" && current?.nextElementSibling) current.parentElement.insertBefore(current.nextElementSibling, current);
      updateOrder(form);
    };
    // DialogV2 liefert beim Speichern ein flaches FormData-Objekt. Dieses wird unten wieder in die strukturierte Kontaktliste und die separaten Beziehungen zerlegt.
    const { DialogV2 } = foundry.applications.api;
    const result = await DialogV2.wait({
      window: { title: "Kontakte bearbeiten" },
      position: { width: 650 },
      content: `<div class="bid-crew-contacts-editor"><input type="hidden" name="contact_order" value="${source.map(contact => contact.id).join(",")}">
          <div class="bid-crew-contact-edit-head"><b>Name</b><b>Rolle / Beschreibung</b><span>Sortieren / Löschen</span></div>
          <div class="bid-crew-contact-edit-list">${source.map(row).join("")}</div>
          <button type="button" class="bid-crew-contact-add" data-contact-action="add"><i class="fa-solid fa-plus"></i> Kontakt hinzufügen</button>
        </div>`,
      render: (_event, dialog) => dialog.element.querySelector(".bid-crew-contacts-editor")?.addEventListener("click", onEditClick),
      buttons: [{
        action: "save", label: "Speichern", icon: "fas fa-check", default: true,
        callback: (_event, _button, dialog) => Object.fromEntries(new FormData(dialog.element.querySelector("form")).entries())
      }, {
        action: "cancel", label: "Abbrechen", icon: "fas fa-times", type: "button"
      }]
    });
    if (!result || result === "cancel") return;
    const order = String(result.contact_order ?? "").split(",").filter(Boolean);
    const previousContacts = Object.fromEntries(source.map(contact => [contact.id, contact]));
    const previousStandings = crew.contacts ?? {};
    crew.contactList = order.map(id => ({
      id,
      name: String(result[`contact_name_${id}`] ?? "").trim() || "Unbenannter Kontakt",
      description: String(result[`contact_description_${id}`] ?? "").trim()
    }));
    crew.contacts = Object.fromEntries(order.map(id => {
      const oldName = previousContacts[id]?.name;
      return [id, previousStandings[id] ?? previousStandings[oldName] ?? "neutral"];
    }));
    await this.actor.setFlag(MODULE_ID, "crewSelections", selections);
  }
}
// Der Crew-Bogen ist für Crew-Actors die bevorzugte Alternative
Hooks.once("ready", () => {
  if (game.system.id !== "blades-in-the-dark") return;
  registerActorSheet(MODULE_ID, BidGermanCrewSheet, {
    types: ["crew"],
    makeDefault: true,
    label: "Deutscher Papierbogen (Crew)"
  });
  console.log(`${MODULE_ID} | Deutscher Crew-Papierbogen registriert`);
});
