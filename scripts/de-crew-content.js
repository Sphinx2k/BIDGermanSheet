// Statischer deutscher Gangbuch-Katalog. Die gespeicherten Schlüssel entsprechen den
// internen Systembezeichnungen; Texte und Tooltips bleiben reine Darstellungsdaten.
const COMMON_UPGRADES = [
  ["ironhook", "Ironhook-Kontakte", "+1 Stufe im Gefängnis", 1],
  ["elite1", "Elite-Komplizen I", "Eine passende Komplizengruppe erhält +1 Qualität.", 1],
  ["elite2", "Elite-Komplizen II", "Eine weitere passende Komplizengruppe erhält +1 Qualität.", 1]
];

export const CREW_UPGRADE_TOOLTIPS = {
  cult: {
    kit: "Kultisten-Ausstattung: Ihr könnt Dokumente oder Gerätschaften von bis zu 2 Last tragen, ohne dass euch diese Last angerechnet wird. So könnt ihr etwa ein lästerliches Buch der Flüche und eine Dämonenhand für 0 Last tragen.",
    sanctum: "Rituelle Kultstätte im Versteck: Zählt als heilige und arkane Werkstatt für okkulte Praktiken und Rituale.",
    elite1: "Elite-Adepten: Alle eure Komplizen vom Typ Adepten erhalten bei für sie typischen Aktionen +1W auf Qualitätswürfe.",
    elite2: "Elite-Schläger: Alle eure Komplizen vom Typ Schläger erhalten bei für sie typischen Aktionen +1W auf Qualitätswürfe.",
    consecrated: "Weihe: Jeder SC erhält +1 Trauma-Kästchen. Dies kostet drei Verbesserungen. Damit kann auch ein SC mit 4 Trauma wieder ins Spiel zurückkehren."
  },
  bravos: {
    kit: "Haudegen-Ausstattung: Ihr könnt Waffen oder Rüstungen von bis zu 2 Last tragen, ohne dass euch diese Last angerechnet wird, beispielsweise Schwert und Pistole oder normale Rüstung für 0 Last.",
    ironhook: "Ironhook-Kontakte: Eure Stufe gilt im Gefängnis als +1 höher. Das gilt für alle stufenbezogenen Elemente einschließlich des Inhaftierungswurfs.",
    elite1: "Elite-Vagabunden: Alle eure Komplizen vom Typ Vagabunden erhalten bei für sie typischen Aktionen +1W auf Qualitätswürfe.",
    elite2: "Elite-Schläger: Alle eure Komplizen vom Typ Schläger erhalten bei für sie typischen Aktionen +1W auf Qualitätswürfe.",
    tempered: "Abgebrüht: Jeder SC erhält +1 Trauma-Kästchen. Dies kostet drei Verbesserungen. Damit kann auch ein SC mit 4 Trauma wieder ins Spiel zurückkehren."
  },
  assassins: {
    kit: "Attentäter-Ausstattung: Ihr könnt Waffen oder Ausrüstung von bis zu 2 Last tragen, ohne dass euch diese Last angerechnet wird, beispielsweise eine Pistole und Einbrecherwerkzeug für 0 Last.",
    ironhook: "Ironhook-Kontakte: Eure Stufe gilt im Gefängnis als +1 höher. Das gilt für alle stufenbezogenen Elemente einschließlich des Inhaftierungswurfs.",
    elite1: "Elite-Baldower: Alle eure Komplizen vom Typ Baldower erhalten bei für sie typischen Aktionen +1W auf Qualitätswürfe.",
    elite2: "Elite-Schläger: Alle eure Komplizen vom Typ Schläger erhalten bei für sie typischen Aktionen +1W auf Qualitätswürfe.",
    tempered: "Abgebrüht: Jeder SC erhält +1 Trauma-Kästchen. Dies kostet drei Verbesserungen. Damit kann auch ein SC mit 4 Trauma wieder ins Spiel zurückkehren."
  },
  shadows: {
    kit: "Diebes-Ausstattung: Ihr könnt Werkzeuge oder Ausrüstung von bis zu 2 Last tragen, ohne dass euch diese Last angerechnet wird, beispielsweise Einbrecherausrüstung oder Bastlerwerkzeug für 0 Last.",
    maps: "Untergrundkarten und -schlüssel: Ihr könnt ungehindert die unterirdischen Kanäle, Tunnel und Keller der Stadt passieren.",
    elite1: "Elite-Schwindler: Alle eure Komplizen vom Typ Schwindler erhalten bei für sie typischen Aktionen +1W auf Qualitätswürfe.",
    elite2: "Elite-Baldower: Alle eure Komplizen vom Typ Baldower erhalten bei für sie typischen Aktionen +1W auf Qualitätswürfe.",
    quiet: "Ruhig: Jeder SC erhält +1 Stress-Kästchen. Dies kostet drei Verbesserungen."
  },
  hawkers: {
    kit: "Schieber-Ausstattung: Ein getragener Gegenstand ist vollkommen verborgen und zählt nicht als Last. So könnt ihr etwa eine Ladung Drogen oder eine Waffe für 0 Last verborgen tragen.",
    ironhook: "Ironhook-Kontakte: Eure Stufe gilt im Gefängnis als +1 höher. Das gilt für alle stufenbezogenen Elemente einschließlich des Inhaftierungswurfs.",
    elite1: "Elite-Schwindler: Alle eure Komplizen vom Typ Schwindler erhalten bei für sie typischen Aktionen +1W auf Qualitätswürfe.",
    elite2: "Elite-Schläger: Alle eure Komplizen vom Typ Schläger erhalten bei für sie typischen Aktionen +1W auf Qualitätswürfe.",
    calm: "Gelassen: Jeder SC erhält +1 Stress-Kästchen. Dies kostet drei Verbesserungen."
  },
  smugglers: {
    kit: "Schmuggler-Ausstattung: Zwei getragene Gegenstände sind vollkommen verborgen. So können etwa 1 Last Schmuggelware und eine Pistole selbst gegen Abtasten verborgen bleiben.",
    camouflage: "Tarnung: Eure stillstehenden Fahrzeuge sind vollkommen verborgen. Sie gehen als Teil der Umgebung oder als uninteressantes Zivilfahrzeug durch.",
    elite1: "Elite-Vagabunden: Alle eure Komplizen vom Typ Vagabunden erhalten bei für sie typischen Aktionen +1W auf Qualitätswürfe.",
    barge: "Frachtkahn: Ergänzt euer Versteck um Beweglichkeit. Ihr könnt es als Zwischenzeitaktivität an einen neuen Standort bewegen.",
    steadfast: "Standhaft: Jeder SC erhält +1 Stress-Kästchen. Dies kostet drei Verbesserungen.",
    vehicle: "Fahrzeug: Alle Schmuggler beginnen mit einem Fahrzeug. Wird das Fahrzeug mit zwei Kästchen verbessert, erhält es außerdem Panzerung (Rüstung)."
  }
};

export const CREW_CLAIMS = {
  assassins: {
    1: ["Trainingsräume", "+1 Ausmaß für eure Baldower-Komplizen"], 2: ["Lasterhöhle", "(Stufe) - Verdacht = Münzen in der Zwischenzeit"],
    3: ["Mittelsmann", "+2 Münzen bei Unterschicht-Kunden"], 4: ["Informanten", "+1W auf Informationen sammeln für Coups"],
    5: ["Schleimaalzucht", "+1W auf Verdacht verringern nach Tötung"], 6: ["Opfertrophäen", "+1 Respekt pro Coup"],
    7: ["Revier", ""], 8: ["Versteck", ""], 9: ["Revier", ""], 10: ["Legale Fassade", "-2 Verdacht pro Coup"],
    11: ["Schutzgeld", "(Stufe) - Verdacht = Münzen in der Zwischenzeit"], 12: ["Krankenstube", "+1W auf medizinische Behandlung"],
    13: ["Gesandter", "+2 Münzen bei Oberschicht-Kunden"], 14: ["Tarnidentitäten", "+1W auf Einstieg bei Täuschungs-/Gesellschafts-Plänen"],
    15: ["Stadtarchivakten", "+1W auf Einstieg bei Heimlichkeits-Plänen"]
  },
  bravos: {
    1: ["Kaserne", "+1 Ausmaß für eure Schläger-Komplizen"], 2: ["Revier", ""], 3: ["Bürger in Angst", "+2 Münzen für Gefechte oder Erpressung"],
    4: ["Informanten", "+1W auf Informationen sammeln für Coups"], 5: ["Schutzgeld", "(Stufe) - Verdacht = Münzen in der Zwischenzeit"],
    6: ["Kampfarena", "(Stufe) - Verdacht = Münzen in der Zwischenzeit"], 7: ["Revier", ""], 8: ["Versteck", ""], 9: ["Revier", ""], 10: ["Revier", ""],
    11: ["Krankenstube", "+1W auf medizinische Behandlung"], 12: ["Blaurocke in Angst", "-2 Verdacht pro Coup"],
    13: ["Straßenhehler", "+2 Münzen bei Unterschicht-Zielen"], 14: ["Lagerhäuser", "+1W auf Anschaffungen machen"],
    15: ["Blaurock-Büttel", "+1W auf Einstieg bei Angriffs-Plänen"]
  },
  cult: {
    1: ["Kloster", "+1 Ausmaß für eure Adepten-Komplizen"], 2: ["Lasterhöhle", "(Stufe) - Verdacht = Münzen in der Zwischenzeit"],
    3: ["Kollekte", "+2 Münzen für okkulte Unternehmungen"], 4: ["Antiker Obelisk", "-1 Stress-Kosten für arkane Mächte und Rituale"],
    5: ["Antiker Turm", "+1W auf Verkehren mit arkanen Wesen"], 6: ["Revier", ""], 7: ["Revier", ""], 8: ["Versteck", ""], 9: ["Revier", ""], 10: ["Revier", ""],
    11: ["Seelenquelle", "+1W auf Einstimmen"], 12: ["Antikes Tor", "Sichere Reise durch die Siechlande"],
    13: ["Heiligtum", "+1W auf Beeinflussen und Befehlen"], 14: ["Heiliger Knotenpunkt", "+1W auf medizinische Behandlung"],
    15: ["Antiker Altar", "+1W auf Einstieg bei Okkultismus-Plänen"]
  },
  shadows: {
    1: ["Verhörraum", "+1W auf Beeinflussen und Befehlen"], 2: ["Revier", ""], 3: ["Stammhehler", "+2 Münzen für Einbruch oder Raub"],
    4: ["Spielhalle", "(Stufe) - Verdacht = Münzen in der Zwischenzeit"], 5: ["Kneipe", "+1W auf Beeinflussen und Verkehren"],
    6: ["Drogenhöhle", "(Stufe) - Verdacht = Münzen in der Zwischenzeit"], 7: ["Informanten", "+1W auf Informationen sammeln für Coups"],
    8: ["Versteck", ""], 9: ["Revier", ""], 10: ["Späher", "+1W auf Einschätzen und Jagen im Revier"],
    11: ["Schleimaalzucht", "+1W auf Verdacht verringern nach Tötung"], 12: ["Krankenstube", "+1W auf medizinische Behandlung"],
    13: ["Geheimer Treffpunkt", "+2 Münzen für Spionage oder Sabotage"], 14: ["Revier", ""],
    15: ["Schleichpfade", "+1W auf Einstieg bei Heimlichkeits-Plänen"]
  },
  hawkers: {
    1: ["Revier", ""], 2: ["Privatausstatter", "+1W auf Einstieg bei Gesellschafts-Plänen"], 3: ["Klüngel", "+2 Münzen für Exempel oder Geselligkeiten"],
    4: ["Späher", "+1W auf Einschätzen und Jagen im Revier"], 5: ["Informanten", "+1W auf Informationen sammeln für Coups"],
    6: ["Revier", ""], 7: ["Revier", ""], 8: ["Versteck", ""], 9: ["Revier", ""], 10: ["Luxuslokal", "+1W auf Verkehren und Beeinflussen"],
    11: ["Außenmarkt", "(Stufe) - Verdacht = Münzen in der Zwischenzeit"], 12: ["Lasterhöhle", "(Stufe) - Verdacht = Münzen in der Zwischenzeit"],
    13: ["Überschusslager", "+2 Münzen für Lieferungen oder Verkäufe"], 14: ["Legale Fassade", "-2 Verdacht pro Coup"],
    15: ["Tarnidentitäten", "+1W auf Einstieg bei Täuschungs-/Gesellschafts-Plänen"]
  },
  smugglers: {
    1: ["Revier", ""], 2: ["Nebenverdienst", "(Stufe) - Verdacht = Münzen in der Zwischenzeit"],
    3: ["Luxushehler", "+2 Münzen für Oberschicht-Ziele"], 4: ["Lasterhöhle", "(Stufe) - Verdacht = Münzen in der Zwischenzeit"],
    5: ["Kneipe", "+1W auf Verkehren und Beeinflussen"], 6: ["Antikes Tor", "Sichere Reise durch die Siechlande"],
    7: ["Revier", ""], 8: ["Versteck", ""], 9: ["Revier", ""], 10: ["Revier", ""],
    11: ["Geheimrouten", "+1W auf Einstieg für Transport-Pläne"], 12: ["Informanten", "+1W auf Informationen sammeln für Coups"],
    13: ["Flotte", "Eure Komplizen haben eigene Fahrzeuge"], 14: ["Legale Fassade", "-2 Verdacht pro Coup"],
    15: ["Lagerhäuser", "+1W auf Anschaffungen machen"]
  }
};

export const CREW_CONTENT = {
  assassins: {
    names: ["Assassins", "Attentäter"], label: "ATTENTÄTER", tagline: "Auftragsmörder",
    abilities: [
      ["deadly", "Tödlich", "Jeder SC kann sich +1 Aktionswert zu Jagen, Schleichen oder Kämpfen hinzufügen (bis zum Höchstwert von 3)."],
      ["crowveil", "Krähenschleier", "Eure Aktivitäten sind vor den Augen der Todsucher-Krähen verborgen. Ihr erhaltet keinen zusätzlichen Verdacht, wenn ein Coup Tötungen beinhaltet."],
      ["emberdeath", "Todesglut", "Ihr kennt die arkane Methode, die Seele eines lebendigen Opfers im Moment seines Todes zu zerstören. Erleide 3 Stress, um Seele und Körper in glühende Asche aufzulösen."],
      ["no-traces", "Ohne Spuren", "Wenn ihr einen Einsatz geheim haltet oder wie einen Unfall aussehen lasst, erhaltet ihr die Hälfte des Respekt-Wertes des Ziels statt null. Beendet ihr die Zwischenzeit mit 0 Verdacht, erhaltet ihr +1 Respekt."],
      ["patron", "Mäzen", "Wenn ihr eure Stufe steigert, kostet euch das nur halb so viele Münzen wie üblich."],
      ["predators", "Raubtiere", "Nutzt ihr einen Heimlichkeits- oder Täuschungs-Plan, um Morde zu begehen, erhaltet ihr +1W auf den Einstiegswurf."],
      ["vipers", "Giftschlangen", "Wenn ihr Gifte erwerbt oder erzeugt, erhaltet ihr +1 Wirkungsgrad. Setzt ihr ein Gift ein, seid ihr gegen seine Wirkung immun."],
      ["veterans", "Veteranen", "Wählt eine Sonderfähigkeit einer anderen Gang."]
    ],
    contacts: [["Trev","Bandenführer"],["Lydra","Vermittlerin"],["Irimina","bösartige Adlige"],["Karlos","Kopfgeldjäger"],["Exeter","Seelenwächterin"],["Sevoy","Handelsfürst"]],
    upgrades: [["kit","Attentäter-Ausstattung","2 Last Waffen oder Ausrüstung frei",1],...COMMON_UPGRADES.slice(0,1),["elite1","Elite-Baldower","",1],["elite2","Elite-Schläger","",1],["tempered","Abgebrüht","+1 Trauma-Kästchen",3]]
  },
  bravos: {
    names: ["Bravos", "Haudegen"], label: "HAUDEGEN", tagline: "Söldner & Totschläger",
    abilities: [
      ["dangerous","Gefährlich","Jeder SC kann sich +1 Aktionswert zu Jagen, Kämpfen oder Zerstören hinzufügen (bis zum Höchstwert von 3)."],
      ["brothers","Blutsbrüder","Wenn ihr Seite an Seite mit euren Komplizen kämpft, erhalten sie +1W auf Teamarbeits-Würfe. Alle Komplizen erhalten den Typ Schläger gratis."],
      ["door-kickers","Türeintreter","Führt ihr einen Angriffs-Plan durch, erhaltet ihr +1W auf den Einstiegswurf."],
      ["fiends","Unholde","Für euch gilt jeder Fahndungsgrad als Revier."],
      ["battleborn","Feuertaufe","Ihr erhaltet +1W auf Widerstandswürfe."],
      ["patron","Mäzen","Wenn ihr eure Stufe steigert, kostet euch das nur halb so viele Münzen wie üblich."],
      ["war-eaters","Eisenfresser","Wenn ihr euch im Krieg befindet, erleidet eure Gang nicht -1 Griff und SC haben weiterhin zwei Zwischenzeitaktivitäten."],
      ["veterans","Veteranen","Wählt eine Sonderfähigkeit einer anderen Gang."]
    ],
    contacts: [["Meg","Arenakämpferin"],["Conway","Blaurock"],["Keller","Schmiedin"],["Tomas","Medikus"],["Walker","Bezirksboss"],["Lutes","Kneipenbesitzer"]],
    upgrades: [["kit","Haudegen-Ausstattung","2 Last Waffen oder Rüstung",1],...COMMON_UPGRADES.slice(0,1),["elite1","Elite-Vagabunden","",1],["elite2","Elite-Schläger","",1],["tempered","Abgebrüht","+1 Trauma-Kästchen",3]]
  },
  cult: {
    names: ["Cult", "Cultists", "Kultisten"], label: "KULTISTEN", tagline: "Anhänger einer vergessenen Gottheit",
    abilities: [
      ["chosen","Auserwählt","Jeder SC kann sich +1 Aktionswert zu Beeinflussen, Einstimmen oder Studieren hinzufügen (bis zum Höchstwert von 3)."],
      ["anointed","Gesalbt","Ihr erhaltet +1W auf Widerstands- und +1W auf Heilungswürfe gegen übernatürliche Gefahren und Schaden."],
      ["bound-dark","In Dunkelheit gebunden","Ihr könnt Teamarbeit mit allen Mitgliedern eures Kults ausführen, egal welche Entfernung euch trennt. Für +1 Stress kann eine Botschaft an alle Kultisten geflüstert werden."],
      ["faith","Fester Glaube","Jeder SC erhält ein zweites Laster: Gottesdienst. Ein wohlgefälliges Opfer gewährt zusätzlich einmalig Hilfe bei einem Aktionswurf."],
      ["manifest","Fleischgewordene Herrlichkeit","Eure Gottheit manifestiert sich zuweilen. Das kann ein großer Segen sein, doch ihre Prioritäten sind nicht immer eure."],
      ["blood-seal","Mit Blut besiegelt","Jedes Menschenopfer verringert die Kosten eines beliebigen Rituals um 3 Stress."],
      ["fanaticism","Fanatismus","Eure Komplizen führen jeden noch so gefährlichen Auftrag aus und erhalten +1W gegen Feinde des Glaubens."],
      ["veterans","Veteranen","Wählt eine Sonderfähigkeit einer anderen Gang."]
    ],
    contacts: [["Gagan","Akademiker"],["Adikin","Okkultist"],["Hutchins","Antiquarin"],["Moriya","Seelenschieberin"],["Mateas Klayn","Adliger"],["Bennett","Astronomin"]],
    upgrades: [["kit","Kultisten-Ausstattung","2 Last Dokumente oder Gerätschaften frei",1],["sanctum","Rituelle Kultstätte","im Versteck",1],["elite1","Elite-Adepten","",1],["elite2","Elite-Schläger","",1],["consecrated","Weihe","+1 Trauma-Kästchen",3]]
  },
  shadows: {
    names: ["Shadows", "Phantoms", "Phantome"], label: "PHANTOME", tagline: "Diebe und Spione",
    abilities: [
      ["everyone-steals","Alle stehlen","Jeder SC kann sich +1 Aktionswert zu Schleichen, Tricksen oder Tüfteln hinzufügen (bis zum Höchstwert von 3)."],
      ["ghost-echoes","Geisterecho","Alle Gangmitglieder können das im Geisterfeld existierende Echo von Doskvol sehen und mit seinen geisterhaften Bauten, Straßen und Objekten interagieren."],
      ["hoarders","Hamsterer","Euer Versteck ist voller gestohlener Gegenstände. Ihr erhaltet +1W auf Würfe, um Anschaffungen zu machen."],
      ["patron","Mäzen","Wenn ihr eure Stufe steigert, kostet euch das nur halb so viele Münzen wie üblich."],
      ["climbers","Fassadenkletterer","Wenn ihr irgendwo heimlich eindringt, erhaltet ihr +1W auf euren Einstiegswurf."],
      ["smooth","Aalglatt","Bei Verwicklungen würfelt ihr zweimal und nehmt das bessere Ergebnis. Beim Verringern von Verdacht erhaltet ihr +1W."],
      ["teamwork","Ein Rad greift ins andere","Bei einer Gruppenaktion dürft ihr mehrere Sechsen aus unterschiedlichen Würfen für einen kritischen Erfolg zusammennehmen."],
      ["veterans","Veteranen","Wählt eine Sonderfähigkeit einer anderen Gang."]
    ],
    contacts: [["Dowler","Entdecker"],["Laroze","Blaurock"],["Amancio","Vermittler"],["Fitz","Sammlerin"],["Adelaide Phroaig","Adlige"],["Rigney","Kneipenbesitzerin"]],
    upgrades: [["kit","Diebes-Ausstattung","2 Last Werkzeug oder Gerätschaften frei",1],["maps","Untergrundkarten & -schlüssel","",1],["elite1","Elite-Schwindler","",1],["elite2","Elite-Baldower","",1],["quiet","Ruhig","+1 Stress-Kästchen",3]]
  },
  hawkers: {
    names: ["Hawkers", "Schieber"], label: "SCHIEBER", tagline: "Händler des Lasters",
    abilities: [
      ["silver-tongues","Redegewandt","Jeder SC kann sich +1 Aktionswert zu Beeinflussen, Befehlen oder Verkehren hinzufügen (bis zum Höchstwert von 3)."],
      ["accord","Abkommen","Für euch gelten bis zu drei verbündete Fraktionen mit Status +3 als Revier."],
      ["finest","Feinster Stoff","Die Qualität eurer Waren entspricht eurer Stufe +2. Die SL sagt euch, wer danach süchtig ist."],
      ["ghost-market","Geistermarkt","Ihr könnt Waren für den Verkauf an Geister und Dämonen präparieren. Sie zahlen nicht mit Münzen."],
      ["society","Gute Gesellschaft","Ihr erhaltet in der Zwischenzeit -1 Verdacht und +1W beim Sammeln von Informationen über die Elite."],
      ["addicted","Süchtig","Fügt brutal, unzuverlässig oder wild als Schwäche zu euren Banden hinzu, um ihnen +1 Qualität zu verleihen."],
      ["patron","Mäzen","Wenn ihr eure Stufe steigert, kostet euch das nur halb so viele Münzen wie üblich."],
      ["veterans","Veteranen","Wählt eine Sonderfähigkeit einer anderen Gang."]
    ],
    contacts: [["Rolan Wott","Magistrat"],["Laroze","Blaurock"],["Lydra","Vermittlerin"],["Hoxley","Schmuggler"],["Anya","reiche Müßiggängerin"],["Marlo","Bandenführerin"]],
    upgrades: [["kit","Schieber-Ausstattung","1 Gegenstand ist verborgen und keine Last",1],...COMMON_UPGRADES.slice(0,1),["elite1","Elite-Schwindler","",1],["elite2","Elite-Schläger","",1],["calm","Gelassen","+1 Stress-Kästchen",3]]
  },
  smugglers: {
    names: ["Smugglers", "Schmuggler"], label: "SCHMUGGLER", tagline: "Lieferanten verbotener Waren",
    abilities: [
      ["family","Gehört fast zur Familie","Eines eurer Fahrzeuge gilt als Komplize. Seine Qualität entspricht eurer Stufe +1."],
      ["minion","Handlanger","Ein Komplize kann in der Zwischenzeit eine Aktivität ausführen, um Anschaffungen zu machen, Verdacht zu verringern oder an einem Langzeitprojekt zu arbeiten."],
      ["ghost-passage","Geisterfahrt","Alle Gangmitglieder sind immun gegen die Ergreifung durch Seelen, können aber freiwillig einen Geist als Passagier befördern."],
      ["just-passing","Nur auf der Durchreise","Ihr erhaltet in der Zwischenzeit -1 Verdacht. Bei höchstens 4 Verdacht erhaltet ihr +1W, um euch als normale Bürger auszugeben."],
      ["leverage","Druckmittel","Jedes Mal, wenn ihr Respekt erhaltet, erhaltet ihr +1 Respekt dazu."],
      ["boarding","Enterkampf","Wenn ihr mit eurem Fahrzeug kämpft, erhaltet ihr +1 Wirkung. Das Fahrzeug erhält außerdem Rüstung."],
      ["lawless","Gesetzlose","Jeder SC kann sich +1 Aktionswert zu Kämpfen, Schleichen oder Tricksen hinzufügen (bis zum Höchstwert von 3)."],
      ["veterans","Veteranen","Wählt eine Sonderfähigkeit einer anderen Gang."]
    ],
    contacts: [["Elynn","Hafenarbeiterin"],["Rolan","Drogenhändler"],["Sera","Waffenhändlerin"],["Nyelle","Seelenschieberin"],["Decker","Anarchist"],["Esme","Kneipenbesitzerin"]],
    upgrades: [["kit","Schmuggler-Ausstattung","2 Gegenstände sind verborgen",1],["camouflage","Tarnung","Stillstehende Fahrzeuge sind verborgen",1],["elite1","Elite-Vagabunden","",1],["barge","Frachtkahn","+Beweglichkeit für das Versteck",1],["steadfast","Standhaft","+1 Stress-Kästchen",3],["vehicle","Fahrzeug","mit Panzerung verbesserbar",0]]
  }
};

export function crewContentFor(name) {
  // Crew-Type-Namen können je nach Compendium Groß-/Kleinschreibung oder Zusätze
  // enthalten. Der normalisierte Schlüssel koppelt diese Varianten an denselben Inhalt.
  const normalized = String(name ?? "").trim().toLocaleLowerCase("de-DE");
  return Object.entries(CREW_CONTENT).find(([_key, content]) => content.names.some(entry => entry.toLocaleLowerCase("de-DE") === normalized)) ?? ["", null];
}
