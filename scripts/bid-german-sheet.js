import { BladesActorSheet } from "/systems/blades-in-the-dark/module/blades-actor-sheet.js";
import { registerActorSheet } from "/systems/blades-in-the-dark/module/compat.js";
import { BladesHelpers } from "/systems/blades-in-the-dark/module/blades-helpers.js";
import { openFormDialog } from "/systems/blades-in-the-dark/module/lib/dialog-compat.js";
import { translateAbility, translateContactRole, translateItem, translatePlaybook, translateXpClue } from "./de-content.js";

const MODULE_ID = "BidGermanSheet";
const TEMPLATE = `modules/${MODULE_ID}/templates/character-sheet.hbs`;


const GERMAN_ATTRIBUTES = {
  insight: "Verstand",
  prowess: "Körper",
  resolve: "Wille"
};

const GERMAN_ACTIONS = {
  hunt: "Jagen",
  study: "Studieren",
  survey: "Einschätzen",
  tinker: "Tüfteln",
  finesse: "Finesse",
  prowl: "Schleichen",
  skirmish: "Kämpfen",
  wreck: "Zerstören",
  attune: "Einstimmen",
  command: "Befehlen",
  consort: "Verkehren",
  sway: "Beeinflussen"
};

const GERMAN_TRAUMAS = {
  cold: "Kalt",
  haunted: "Heimgesucht",
  obsessed: "Besessen",
  paranoid: "Paranoid",
  reckless: "Leichtsinnig",
  soft: "Weich",
  unstable: "Labil",
  vicious: "Grausam"
};

const GERMAN_LOAD = {
  "BITD.Light": "Leicht",
  "BITD.Normal": "Normal",
  "BITD.Heavy": "Schwer",
  "BITD.Discreet": "Unauffällig",
  "BITD.Conspicuous": "Auffällig",
  "BITD.Encumbered": "Überladen",
  "BITD.OverMax": "Über Maximum"
};

const GERMAN_PLAYBOOKS = {
  cutter: "Schnitter",
  hound: "Bluthund",
  leech: "Schröpfer",
  lurk: "Lauerer",
  slide: "Emissär",
  spider: "Spinne",
  whisper: "Flüsterer",
  ghost: "Geist",
  hull: "Gehäuse",
  vampire: "Vampir"
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, Number(value) || 0));

// Playbook-Namen können Zusätze, Leerzeichen oder Umlaute enthalten. 
function slugify(value) {
  return String(value ?? "none")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "none";
}

function cleanPlaybookName(value) {
  return BladesHelpers.trimClassFromName(String(value ?? "")).trim();
}

function playbookKey(value) {
  return slugify(cleanPlaybookName(value)).replace(/-/g, "");
}

function germanPlaybookName(value) {
  const clean = cleanPlaybookName(value);
  return GERMAN_PLAYBOOKS[playbookKey(clean)] ?? clean;
}

// Zähler in anklickbare, mit Status versehene Felder zerlegen.
function tracker(value, max) {
  const current = Number(Array.isArray(value) ? value[0] : value) || 0;
  return Array.from({ length: Number(max) || 0 }, (_, index) => ({
    value: index + 1,
    active: index < current
  }));
}

function dots(value, max = 4) {
  const current = Number(Array.isArray(value) ? value[0] : value) || 0;
  return Array.from({ length: max }, (_, index) => ({
    value: index + 1,
    active: index < current
  }));
}

export class BidGermanCharacterSheet extends BladesActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["blades-in-the-dark", "sheet", "actor", "pc", "bid-paper-sheet"],
      template: TEMPLATE,
      width: 1480,
      height: 920,
      resizable: true,
      tabs: []
    });
  }

  get title() {
    return `${this.actor.name} – ${game.i18n.localize("BID.SheetName")}`;
  }

  async getData(options = {}) {
    const data = await super.getData(options);
    const system = data.system;

// deepClone verhindert Änderungen vor dem Speichern.
    const contacts = foundry.utils.deepClone(this.actor.getFlag(MODULE_ID, "contacts") ?? []).map(contact => ({
      ...contact,
      role: translateContactRole(contact.role)
    }));

    const playbook = data.items.find(item => item.type === "class");
    const rawPlaybookClues = playbook?.system?.experience_clues;
    const playbookClues = Array.isArray(rawPlaybookClues)
      ? rawPlaybookClues
      : (rawPlaybookClues ? [rawPlaybookClues] : []);
    const gearDocuments = this.actor.items.filter(item => item.type === "item");
    let carriedLoad = 0;


    const gear = gearDocuments.map(item => {
      const translatedItem = translateItem(item);
      const maximum = Math.max(1, Number(item.system?.num_available) || 1);
      const carried = clamp(item.getFlag(MODULE_ID, "carried") ?? (item.system?.equipped ? 1 : 0), 0, maximum);
      const load = Math.max(0, Number(item.system?.load) || 0);
      const itemClasses = Array.isArray(item.system?.class) ? item.system.class : (item.system?.class ? [item.system.class] : []);
      const isPlaybookGear = itemClasses.some(value => playbookKey(value) === playbookKey(playbook?.name));
      carriedLoad += carried * load;
      return {
        _id: item.id,
        name: translatedItem.name,
        description: BladesHelpers.stripHtml(translatedItem.description),
        system: item.system,
        carried,
        load,
        isPlaybookGear,
        loadBoxes: Array.from({ length: Math.max(1, load) }),
        carryBoxes: Array.from({ length: maximum }, (_, index) => ({ value: index + 1, active: index < carried }))
      };
    });
    const selectedLoadLevel = system.selected_load_level || "BITD.Light";
    const selectedLoadMax = { "BITD.Light": 3, "BITD.Normal": 5, "BITD.Heavy": 6 }[selectedLoadLevel] ?? 3;


    data.bid = {
      contacts,
      stress: tracker(system.stress?.value, system.stress?.max),
      trauma: tracker(Object.keys(system.trauma?.list ?? {}).length, system.trauma?.max),
      healing: tracker(system.healing_clock?.value, system.healing_clock?.max),
      coins: tracker(system.coins, system.coins_max?.hand ?? 4),
      stash: tracker(system.coins_stashed, system.coins_max?.stash ?? 40),
      experience: tracker(system.experience, system.experience_max ?? 8),
      abilities: data.items.filter(item => item.type === "ability").map(translateAbility),
      gear,
      playbookGear: gear.filter(item => item.isPlaybookGear),
      standardGear: gear.filter(item => !item.isPlaybookGear),
      loadout: carriedLoad,
      loadMax: selectedLoadMax,
      loadRemaining: selectedLoadMax - carriedLoad,
      overloaded: carriedLoad > selectedLoadMax,
      loadChoices: [
        { value: "BITD.Light", label: "Leicht", max: 3, selected: selectedLoadLevel === "BITD.Light" },
        { value: "BITD.Normal", label: "Normal", max: 5, selected: selectedLoadLevel === "BITD.Normal" },
        { value: "BITD.Heavy", label: "Schwer", max: 6, selected: selectedLoadLevel === "BITD.Heavy" }
      ],
      playbook,
      playbookSlug: slugify(playbook?.name),
      playbookLabel: playbook ? germanPlaybookName(playbook.name) : "CHARAKTERBUCH",
      playbookDescription: translatePlaybook(playbookKey(playbook?.name), playbook?.system?.description),
      playbookClues: playbookClues.map(clue => translateXpClue(playbookKey(playbook?.name), clue?.startsWith?.("BITD.") ? game.i18n.localize(clue) : clue)),
      loadLabel: GERMAN_LOAD[selectedLoadLevel] ?? game.i18n.localize(selectedLoadLevel),
      loadLevels: Object.entries(system.load_levels ?? {}).map(([value, label]) => ({
        value,
        label: GERMAN_LOAD[label] ?? GERMAN_LOAD[value] ?? game.i18n.localize(label),
        selected: value === system.selected_load_level
      })),
      attributes: Object.entries(system.attributes ?? {}).map(([key, attribute]) => ({
        key,
        label: GERMAN_ATTRIBUTES[key] ?? game.i18n.localize(attribute.label),
        experience: tracker(attribute.exp, attribute.exp_max ?? 6),
        skills: Object.entries(attribute.skills ?? {}).map(([skillKey, skill]) => ({
          key: skillKey,
          label: GERMAN_ACTIONS[skillKey] ?? game.i18n.localize(skill.label),
          value: Number(Array.isArray(skill.value) ? skill.value[0] : skill.value) || 0,
          dots: dots(skill.value, 4)
        }))
      })),
      traumas: (system.trauma?.options ?? []).map(option => ({
        key: option.split(".").pop().replace(/^Trauma/, "").toLowerCase(),
        label: GERMAN_TRAUMAS[option.split(".").pop().replace(/^Trauma/, "").toLowerCase()] ?? game.i18n.localize(option),
        active: Boolean(system.trauma?.list?.[option.split(".").pop().replace(/^Trauma/, "").toLowerCase()])
      }))
    };

    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Würfel an das Blades System weiterreichen
    html.find("[data-bid-action='roll']").on("click", event => {
      event.preventDefault();
      this.actor.rollAttributePopup(event.currentTarget.dataset.roll);
    });

    html.find("[data-bid-action='track']").on("click contextmenu", event => this.#onTrack(event));
    html.find("[data-bid-action='skill']").on("click contextmenu", event => this.#onSkill(event));
    html.find("[data-bid-action='trauma']").on("click", event => this.#onTrauma(event));
    html.find("[data-bid-action='armor']").on("change", event => this.#onArmor(event));
    html.find("[data-bid-action='item-open']").on("click", event => this.#onItemOpen(event));
    html.find("[data-bid-action='item-delete']").on("click", event => this.#onItemDelete(event));
    html.find("[data-bid-action='contact-add']").on("click", () => this.#addContact());
    html.find("[data-bid-action='contact-delete']").on("click", event => this.#deleteContact(event));
    html.find("[data-bid-action='contact-standing']").on("click", event => this.#cycleContactStanding(event));
    html.find("[data-bid-action='contact-move']").on("click", event => this.#moveContact(event));
    html.find("[data-bid-action='contact-actor']").on("click", event => this.#openContactActor(event));
    html.find("[data-bid-action='gear-equipped']").on("change", event => this.#onGearEquipped(event));
    html.find("[data-bid-action='contacts-sync']").on("click", () => this.#syncPlaybookContacts());
    html.find("[data-bid-action='ability-toggle']").on("click", event => this.#onAbilityToggle(event));
    html.find("[data-bid-action='edit-toggle']").on("click", event => this.#toggleEditLock(event, html));
    html.find("[data-bid-action='notes-open']").on("click", () => this.#openNotes());
    html.find("[data-bid-action='gear-carry']").on("click contextmenu", event => this.#onGearCarry(event));
    html.find("[data-bid-action='load-level']").on("click", event => this.#onLoadLevel(event));
    const fittedInputs = html.find(".bid-auto-fit-input");
    fittedInputs.on("input", event => this.#fitTextInput(event.currentTarget));
    requestAnimationFrame(() => fittedInputs.each((_index, input) => this.#fitTextInput(input)));
    html.find(".bid-actor-name").each((_index, input) => {
      input.addEventListener("change", event => {
        if (input.value.trim()) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        input.value = this.actor.name;
        this.#fitTextInput(input);
      }, true);
    });

    this.#applyEditLock(html);

    // Scroll Position merken damit der Bogen nicht rumspringt
    const sheetRoot = html.filter(".bid-sheet").add(html.find(".bid-sheet")).first();
    if (Number.isFinite(this._bidRestoreScrollTop)) {
      sheetRoot.scrollTop(this._bidRestoreScrollTop);
      delete this._bidRestoreScrollTop;
    }
    this.#ensurePlaybookCatalog();
  }

  #fitTextInput(input) {
    const maximum = 14;
    const minimum = 8;
    let size = maximum;
    input.style.fontSize = `${size}px`;
    while (input.scrollWidth > input.clientWidth && size > minimum) {
      size -= 0.5;
      input.style.fontSize = `${size}px`;
    }
  }

  async _onItemAddClick(event) {
    const itemType = event.currentTarget.dataset.itemType;
    if (!["class", "ability"].includes(itemType)) return super._onItemAddClick(event);
    event.preventDefault();
    if (!this.options.editable || !this._bidUnlocked) return;

    // Fähigkeiten Lesen, Gruppieren und übersetzen
    if (itemType === "ability") {
      const abilities = await BladesHelpers.getAllItemsByType("ability", game);
      const abilityRows = [...abilities].map(ability => {
        const translated = translateAbility(ability);
        const sourceClass = Array.isArray(ability.system?.class) ? ability.system.class[0] : ability.system?.class;
        const sourceLabel = sourceClass ? germanPlaybookName(sourceClass) : "Allgemein";
        const description = BladesHelpers.stripHtml(translated.description);
        return { ability, translated, sourceLabel, description };
      }).sort((a, b) => a.sourceLabel.localeCompare(b.sourceLabel, "de") || a.translated.name.localeCompare(b.translated.name, "de"));
      let previousSource = "";
      const rows = abilityRows.map(({ ability, translated, sourceLabel, description }) => {
        const divider = sourceLabel !== previousSource
          ? `<h3 class="bid-ability-group">${Handlebars.escapeExpression(sourceLabel)}</h3>`
          : "";
        previousSource = sourceLabel;
        return `${divider}<label class="bid-ability-choice"><input type="checkbox" name="select_items" value="${Handlebars.escapeExpression(ability.id)}"><span><b>${Handlebars.escapeExpression(translated.name)}</b></span><em>${Handlebars.escapeExpression(description)}</em></label>`;
      }).join("");
      const result = await openFormDialog({
        title: "Sonderfähigkeiten hinzufügen",
        content: `<form class="bid-ability-dialog"><p class="bid-ability-count">${abilityRows.length} Sonderfähigkeiten</p><div class="bid-ability-scroll">${rows}</div></form>`,
        okLabel: "Hinzufügen",
        cancelLabel: "Abbrechen",
        dialog: { width: 620 }
      });
      if (result?.select_items) await this.addItemsToSheet("ability", result.select_items);
      return;
    }

    // Duplikate finden und bereinigen
    const playbooks = await BladesHelpers.getAllItemsByType("class", game);
    const unique = new Map();
    for (const playbook of playbooks) {
      const key = cleanPlaybookName(playbook.name).toLowerCase();
      if (!unique.has(key)) unique.set(key, playbook);
    }
    const rows = [...unique.values()].map(playbook => {
      const description = BladesHelpers.stripHtml(translatePlaybook(playbookKey(playbook.name), playbook.system?.description));
      return `<label class="bid-playbook-choice"><input type="radio" name="select_items" value="${Handlebars.escapeExpression(playbook.id)}"><span><b>${Handlebars.escapeExpression(germanPlaybookName(playbook.name))}</b><small>${Handlebars.escapeExpression(cleanPlaybookName(playbook.name))}</small></span><em>${Handlebars.escapeExpression(description)}</em></label>`;
    }).join("");
    const result = await openFormDialog({
      title: "Playbook auswählen",
      content: `<form class="bid-playbook-dialog">${rows}</form>`,
      okLabel: "Auswählen",
      cancelLabel: "Abbrechen"
    });
    if (result?.select_items) await this.addItemsToSheet("class", result.select_items);
  }

// Ein auf den Kontaktbereich gezogener Actor wird verknüpft
  async handleDrop(event, droppedEntity) {
    const document = await fromUuid(droppedEntity.uuid);
    if (document?.documentName !== "Actor") return super.handleDrop(event, droppedEntity);
    if (!this.options.editable) return;
    const contacts = this.#contacts();
    contacts.push({
      id: foundry.utils.randomID(),
      name: document.name,
      role: translateContactRole(document.system?.description_short),
      notes: "",
      img: document.img ?? "",
      actorUuid: document.uuid,
      standing: "neutral"
    });
    await this.#saveContacts(contacts);
  }

// Nach einem Playbook-Wechsel werden abhängige Kontakte und Katalogeinträge direkt geladen
  async addItemsToSheet(itemType, selections) {
    await super.addItemsToSheet(itemType, selections);
    if (itemType !== "class") return;
    const playbook = this.actor.items.find(item => item.type === "class");
    if (!playbook) return;
    await this.actor.update({ "system.playbook": playbook.name });
    await this.#syncPlaybookContacts(playbook);
    await this.#syncPlaybookCatalog(playbook);
  }

// Erneutes Anklicken des letzten aktiven Feldes leert dieses wieder. 
  async #onTrack(event) {
    event.preventDefault();
    if (!this.options.editable) return;
    const { path, value } = event.currentTarget.dataset;
    const current = Number(foundry.utils.getProperty(this.actor, path)) || 0;
    const clicked = Number(value);
    const next = event.type === "contextmenu" ? Math.max(0, current - 1) : (current === clicked ? clicked - 1 : clicked);
    await this.actor.update({ [path]: next });
  }

  async #onSkill(event) {
    event.preventDefault();
    if (!this.options.editable) return;
    const { path, value } = event.currentTarget.dataset;
    const current = Number(foundry.utils.getProperty(this.actor, path)) || 0;
    const clicked = Number(value);
    const next = event.type === "contextmenu" ? clamp(current - 1, 0, 4) : (current === clicked ? clicked - 1 : clicked);
    await this.actor.update({ [path]: next });
  }

  async #onTrauma(event) {
    event.preventDefault();
    if (!this.options.editable) return;
    const key = event.currentTarget.dataset.trauma;
    const path = `system.trauma.list.${key}`;
    await this.actor.update({ [path]: !foundry.utils.getProperty(this.actor, path) });
  }

  async #onArmor(event) {
    if (!this.options.editable) return;
    await this.actor.update({ [event.currentTarget.dataset.path]: event.currentTarget.checked ? 1 : 0 });
  }

  async #onGearEquipped(event) {
    if (!this.options.editable) return;
    const id = event.currentTarget.closest("[data-item-id]")?.dataset.itemId;
    if (!id) return;
    await this.actor.updateEmbeddedDocuments("Item", [{ _id: id, "system.equipped": event.currentTarget.checked }]);
  }

  async #onGearCarry(event) {
    event.preventDefault();
    if (!this.options.editable) return;
    this._bidRestoreScrollTop = event.currentTarget.closest(".bid-sheet")?.scrollTop ?? 0;
    const id = event.currentTarget.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(id);
    if (!item) return;
    const current = Number(item.getFlag(MODULE_ID, "carried")) || 0;
    const clicked = Number(event.currentTarget.dataset.value) || 1;
    const carried = event.type === "contextmenu" ? Math.max(0, current - 1) : (current === clicked ? clicked - 1 : clicked);
    await item.update({
      [`flags.${MODULE_ID}.carried`]: carried,
      "system.equipped": carried > 0
    });
  }

  async #onLoadLevel(event) {
    event.preventDefault();
    if (!this.options.editable) return;
    await this.actor.update({ "system.selected_load_level": event.currentTarget.dataset.value });
  }

  async #onAbilityToggle(event) {
    if (!this.options.editable || !this._bidUnlocked) return;
    const id = event.currentTarget.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(id);
    if (!item) return;
    await item.update({ "system.purchased": !item.system.purchased });
  }

  #toggleEditLock(event, html) {
    event.preventDefault();
    if (!this.options.editable) return;
    this._bidUnlocked = !this._bidUnlocked;
    this.#applyEditLock(html);
  }

  #applyEditLock(html) {
    const unlocked = Boolean(this._bidUnlocked) && this.options.editable;
    const controls = html.find("input, textarea, select, button");
    controls.prop("disabled", !unlocked);
    html.find(".bid-sheet").addBack(".bid-sheet").toggleClass("is-locked", !unlocked);

    // Festlegen was noch bearbeitet werden darf
    if (this.options.editable) {
      html.find("[data-bid-action='edit-toggle'], [data-bid-action='notes-open'], [data-bid-action='track'][data-path='system.stress.value'], [data-bid-action='armor'], [data-bid-action='load-level'], .bid-harm input, .bid-gear input, .bid-gear button, .bid-standard-gear input, .bid-standard-gear button").prop("disabled", false);
    }

    const toggle = html.find("[data-bid-action='edit-toggle']");
    toggle.attr("title", unlocked ? "Bearbeitung sperren" : "Stammdaten bearbeiten");
    toggle.html(unlocked ? "🔓 BEARBEITUNG OFFEN" : "🔒 BEARBEITUNG GESPERRT");
  }

  #onItemOpen(event) {
    event.preventDefault();
    this.actor.items.get(event.currentTarget.closest("[data-item-id]")?.dataset.itemId)?.sheet.render(true);
  }

  async #openNotes() {
    const notes = String(this.actor.getFlag(MODULE_ID, "notes") ?? "");
    const result = await openFormDialog({
      title: `Notizen – ${this.actor.name}`,
      content: `<form class="bid-notes-dialog"><textarea name="notes" rows="18" placeholder="Notizen">${Handlebars.escapeExpression(notes)}</textarea></form>`,
      okLabel: "Speichern",
      cancelLabel: "Schließen"
    });
    if (result && Object.prototype.hasOwnProperty.call(result, "notes")) await this.actor.setFlag(MODULE_ID, "notes", result.notes);
  }

  async #onItemDelete(event) {
    event.preventDefault();
    if (!this.options.editable) return;
    const id = event.currentTarget.closest("[data-item-id]")?.dataset.itemId;
    if (id) await this.actor.deleteEmbeddedDocuments("Item", [id]);
  }

  async #addContact() {
    if (!this.options.editable) return;
    const result = await openFormDialog({
      title: "NPC und Kontakt erstellen",
      content: `<form class="bid-contact-dialog">
        <div class="bid-contact-dialog-row"><label>Name</label><input name="name" required autofocus></div>
        <div class="bid-contact-dialog-row"><label>Rolle / Beschreibung</label><input name="role"></div>
        <div class="bid-contact-dialog-row bid-contact-dialog-notes"><label>Notizen</label><textarea name="notes" rows="5"></textarea></div>
      </form>`,
      okLabel: "NPC erstellen",
      cancelLabel: "Abbrechen"
    });
    const name = String(result?.name ?? "").trim();
    if (!name) return;
    const role = String(result.role ?? "").trim();
    const notes = String(result.notes ?? "").trim();
    const img = "icons/svg/mystery-man.svg";
    // Das Plus erzeugt zuerst einen echten Foundry-NPC und speichert anschließend eine Referenz im Flag.
    let npc;
    try {
      npc = await Actor.create({
        name,
        type: "npc",
        img,
        system: {
          description_short: role,
          notes
        }
      }, { renderSheet: false });
    } catch (error) {
      console.error(`${MODULE_ID} | NPC konnte nicht erstellt werden`, error);
      ui.notifications.error("Der NPC konnte nicht erstellt werden. Prüfe deine Berechtigungen.");
      return;
    }
    if (!npc) {
      ui.notifications.error("Der NPC konnte nicht erstellt werden.");
      return;
    }
    const contacts = foundry.utils.deepClone(this.actor.getFlag(MODULE_ID, "contacts") ?? []);
    contacts.push({
      id: foundry.utils.randomID(),
      name: npc.name,
      role,
      notes,
      img: npc.img,
      actorUuid: npc.uuid,
      standing: "neutral"
    });
    await this.actor.setFlag(MODULE_ID, "contacts", contacts);
    ui.notifications.info(`${npc.name} wurde als NPC und Kontakt erstellt.`);
  }

  async #deleteContact(event) {
    if (!this.options.editable) return;
    const id = event.currentTarget.closest("[data-contact-id]")?.dataset.contactId;
    await this.#saveContacts(this.#contacts().filter(contact => contact.id !== id));
  }

  async #cycleContactStanding(event) {
    if (!this.options.editable) return;
    const id = event.currentTarget.closest("[data-contact-id]")?.dataset.contactId;
    const contacts = this.#contacts();
    const contact = contacts.find(entry => entry.id === id);
    if (!contact) return;
    const selected = event.currentTarget.dataset.standing;
    if (!(["friend", "rival"].includes(selected))) return;
    contact.standing = contact.standing === selected ? "neutral" : selected;
    await this.#saveContacts(contacts);
  }

  async #moveContact(event) {
    if (!this.options.editable) return;
    const row = event.currentTarget.closest("[data-contact-id]");
    const contacts = this.#contacts();
    const index = contacts.findIndex(contact => contact.id === row?.dataset.contactId);
    const target = index + Number(event.currentTarget.dataset.direction);
    if (index < 0 || target < 0 || target >= contacts.length) return;
    [contacts[index], contacts[target]] = [contacts[target], contacts[index]];
    await this.#saveContacts(contacts);
  }

  async #openContactActor(event) {
    event.preventDefault();
    const uuid = event.currentTarget.closest("[data-contact-id]")?.dataset.actorUuid;
    if (!uuid) return;
    const actor = await fromUuid(uuid);
    if (actor?.documentName === "Actor") actor.sheet.render(true);
    else ui.notifications.warn(game.i18n.localize("BID.ContactActorMissing"));
  }

//Playbook Kontakte Laden, selbst angelegte erhalten
  async #syncPlaybookContacts(playbook = null) {
    if (!this.options.editable) return;
    playbook ??= this.actor.items.find(item => item.type === "class");
    if (!playbook) {
      ui.notifications.warn("Bitte zuerst ein Playbook auswählen.");
      return;
    }

    const sourcedContacts = await BladesHelpers.getPlaybookAcquaintances("character", playbook.name);
    const contacts = this.#contacts().filter(contact => contact.source !== "playbook");
    for (const source of sourcedContacts) {
      contacts.push({
        id: foundry.utils.randomID(),
        name: source.name,
        role: translateContactRole(source.system?.description_short),
        notes: "",
        img: source.img ?? "",
        actorUuid: source.uuid ?? "",
        standing: "neutral",
        source: "playbook",
        playbook: playbook.name
      });
    }
    await this.#saveContacts(contacts);
    ui.notifications.info(`${playbook.name}: ${sourcedContacts.length} Kontakte geladen.`);
  }

// Playbook Enträge laden

  async #syncPlaybookCatalog(playbook) {
    const key = playbookKey(playbook.name);
    const oldCatalogIds = this.actor.items
      .filter(item => item.getFlag(MODULE_ID, "autoCatalog") && (
        item.getFlag(MODULE_ID, "playbook") !== key || Number(item.getFlag(MODULE_ID, "catalogVersion")) < 2
      ))
      .map(item => item.id);
    if (oldCatalogIds.length) await this.actor.deleteEmbeddedDocuments("Item", oldCatalogIds);

    const retainedNames = new Set(this.actor.items.map(item => `${item.type}:${item.name.toLowerCase()}`));
    const sources = [];
    // Playbook-Fähigkeiten. Noch nicht gewählte Einträge starten inaktiv.
    for (const type of ["ability", "item"]) {
      const available = await BladesHelpers.getAllItemsByType(type, game);
      for (const source of available) {
        const sourceClassName = cleanPlaybookName(source.system?.class);
        const sourceClass = sourceClassName ? playbookKey(sourceClassName) : "";
        const belongsToPlaybook = sourceClass === key;
        const isGeneralGear = type === "item" && !sourceClass;
        if (!belongsToPlaybook && !isGeneralGear) continue;
        const identity = `${type}:${source.name.toLowerCase()}`;
        if (retainedNames.has(identity)) continue;
        const data = source.toObject();
        delete data._id;
        foundry.utils.setProperty(data, `flags.${MODULE_ID}.autoCatalog`, true);
        foundry.utils.setProperty(data, `flags.${MODULE_ID}.playbook`, key);
        foundry.utils.setProperty(data, `flags.${MODULE_ID}.catalogVersion`, 2);
        if (type === "ability") data.system.purchased = false;
        if (type === "item") data.system.equipped = false;
        sources.push(data);
        retainedNames.add(identity);
      }
    }
    if (sources.length) await this.actor.createEmbeddedDocuments("Item", sources);
  }

    // Reparatur Funktion
  async #ensurePlaybookCatalog() {
    if (this._bidCatalogChecked) return;
    this._bidCatalogChecked = true;
    const playbook = this.actor.items.find(item => item.type === "class");
    if (!playbook) return;
    const key = playbookKey(playbook.name);
    const catalog = this.actor.items.filter(item => item.getFlag(MODULE_ID, "autoCatalog") && item.getFlag(MODULE_ID, "playbook") === key);
    const hasAbilities = catalog.some(item => item.type === "ability");
    const hasGear = catalog.some(item => item.type === "item");
    const currentCatalog = catalog.every(item => Number(item.getFlag(MODULE_ID, "catalogVersion")) >= 2);
    if (!hasAbilities || !hasGear || !currentCatalog) await this.#syncPlaybookCatalog(playbook);
  }

  #contacts() {
    return foundry.utils.deepClone(this.actor.getFlag(MODULE_ID, "contacts") ?? []);
  }

  async #saveContacts(contacts) {
    await this.actor.setFlag(MODULE_ID, "contacts", contacts);
  }
}

  // Der Bogen als alternative Registrieren
Hooks.once("ready", () => {
  if (game.system.id !== "blades-in-the-dark") return;
  registerActorSheet(MODULE_ID, BidGermanCharacterSheet, {
    types: ["character"],
    makeDefault: false,
    label: "BID.SheetName"
  });
  console.log(`${MODULE_ID} | Deutscher Papierbogen registriert`);
});
