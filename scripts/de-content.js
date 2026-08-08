// Reiner deutscher Inhaltskatalog. Die Funktionen am Dateiende gleichen Namen aus
// verschiedenen System-/Compendium-Versionen ab, ohne deren Quelldokumente zu ändern.
const ABILITIES = {
  "Sharpshooter": ["Scharfschütze", "Du kannst dich verausgaben, um einen Fernkampfangriff aus extremer Entfernung zu machen – oder – ein Sperrfeuer zu eröffnen, das den Feind hemmt."],
  "Focused": ["Konzentriert", "Du kannst deine Spezialrüstung verbrauchen, um den Konsequenzen einer Überraschung oder psychischem Schaden zu widerstehen oder dich im Fernkampf oder bei der Verfolgung zu verausgaben."],
  "Ghost Hunter": ["Geisterjäger", "Dein Jagdtier kann das Übernatürliche besser verfolgen oder bekämpfen und erhält eine arkane Fähigkeit: Geistergestalt, Psychische Verbindung oder Pfeilschnell."],
  "Scout": ["Kundschafter", "Sammelst du Informationen, um den Standort eines Zieles aufzuspüren, erhältst du +1 Wirkung. Versteckst du dich an einer vorbereiteten Stelle oder nutzt Tarnung, erhältst du +1W gegen Entdeckung."],
  "Survivor": ["Überlebenskünstler", "Du bist immun gegen den giftigen Pesthauch der Siechlande, kannst dich von der dortigen Flora und Fauna ernähren und erhältst 1 zusätzliches Stress-Kästchen."],
  "Tough as Nails": ["Knochenhart", "Abzüge durch Schaden sind um einen Grad verringert (Schaden 4. Grades ist dennoch tödlich)."],
  "Vengeful": ["Rachsüchtig", "Du erhältst einen zusätzlichen EP-Auslöser, wenn du dich an jemandem rächst, der dir oder einer dir wichtigen Person geschadet hat."],
  "Rook's Gambit": ["Gaunerstreich", "Erleide 2 Stress, um auf deinen besten Aktionswert zu würfeln, obwohl du eine andere Aktion ausführst. Schildere, wie du deine Fertigkeit dafür anpasst."],
  "Cloak & Dagger": ["Tarnen & Täuschen", "Nutzt du Verkleidungen oder andere Formen von Tarnung und Irreführung, erhältst du +1W auf Würfe zum Verwirren oder Ablenken von Verdacht. Wirfst du die Tarnung ab, verleiht dir die Überraschung die Initiative."],
  "Ghost Voice": ["Geisterstimme", "Du kannst selbst mit wild und ungezähmt wirkenden Geistern und Dämonen wie mit normalen Menschen interagieren und gewinnst dabei an Eignung."],
  "Like Looking into a Mirror": ["Den Schleier lüften", "Du merkst stets, wenn dich jemand belügt."],
  "A Little Something on the Side": ["Nebeneinkünfte", "Am Ende jeder Zwischenzeit verdienst du +2 Vermögen."],
  "Mesmerism": ["Hypnose", "Wenn du jemanden beeinflusst, kannst du die Person das Geschehene vergessen lassen, bis sie wieder mit dir in Kontakt kommt."],
  "Subterfuge": ["List", "Du kannst deine Spezialrüstung verbrauchen, um Konsequenzen von Misstrauen oder Überredung zu widerstehen oder dich für eine Ausrede zu verausgaben."],
  "Trust in Me": ["Vertraulich", "Du erhältst +1W gegen Ziele, mit denen du in inniger Beziehung stehst."],
  "Compel": ["Binden", "Du kannst dich auf das Geisterfeld Einstimmen, um einen nahen Geist zu zwingen, vor dir zu erscheinen und einem Befehl zu gehorchen. Du hast keine übernatürliche Angst vor diesen Geistern."],
  "Ghost Mind": ["Geistersinn", "Du bist dir stets übernatürlicher Wesen in deiner Gegenwart bewusst. Wenn du über das Übernatürliche Informationen sammelst, erhältst du +1W."],
  "Iron Will": ["Eiserner Wille", "Du bist unempfindlich gegenüber der Todesangst durch übernatürliche Wesen. Bei einem Widerstandswurf mit Wille erhältst du +1W."],
  "Occultist": ["Okkultist", "Du kannst mit uralten Mächten, vergessenen Gottheiten oder Dämonen Verkehren. Danach erhältst du +1W beim Befehligen von Kultisten, die dieses Wesen anbeten."],
  "Ritual": ["Rituale", "Du kannst okkulte Rituale Studieren oder neu erfinden, um einen übernatürlichen Effekt oder ein Wesen hervorzurufen. Zu Beginn kennst du ein Ritual."],
  "Strange Methods": ["Seltsame Praktiken", "Wenn du eine arkane Erfindung erfindest oder anfertigst, erhältst du +1 Wirkungsgrad. Du kennst bereits eine arkane Konstruktion."],
  "Tempest": ["Sturmwind", "Du kannst dich verausgaben, um einen Blitzschlag als Waffe zu entfesseln – oder – in deiner Nähe ein Unwetter heraufzubeschwören."],
  "Warded": ["Gefeit", "Du kannst deine Spezialrüstung verbrauchen, um übernatürlichen Konsequenzen zu widerstehen oder dich beim Ringen mit arkanen Kräften zu verausgaben."],
  "Infiltrator": ["Unterwanderung", "Wenn du Sicherheitsmaßnahmen umgehst, wirst du nicht durch Qualität oder Stufe beeinträchtigt."],
  "Ambush": ["Hinterhalt", "Wenn du aus dem Verborgenen angreifst oder eine Falle zuschnappen lässt, erhältst du +1W auf deinen Wurf."],
  "Daredevil": ["Draufgänger", "Bei einer aussichtslosen Aktion erhältst du +1W, falls du dafür −1W auf alle Widerstandswürfe gegen Konsequenzen deiner Aktion annimmst."],
  "The Devil's Footsteps": ["Des Teufels Fußstapfen", "Du kannst dich verausgaben, um einen schier übermenschlichen sportlichen Kraftakt zu leisten – oder – Feinde so auszumanövrieren, dass sie sich gegenseitig angreifen."],
  "Expertise": ["Kompetenz", "Wähle einen Aktionswert. Führst du damit eine Gruppenaktion an, kannst du höchstens 1 Stress erleiden, ungeachtet der Anzahl fehlgeschlagener Würfe."],
  "Ghost Veil": ["Geisterschleier", "Du kannst dich zum Teil ins Geisterfeld versetzen und schemenhaft und gestaltlos erscheinen. Für 2 Stress hält dies einige Augenblicke; weitere Eigenschaften kosten je 1 Stress."],
  "Reflexes": ["Reflexe", "Wenn fraglich ist, wer zuerst handelt, lautet die Antwort: Du."],
  "Shadow": ["Schatten", "Du kannst deine Spezialrüstung verbrauchen, um Konsequenzen von Sicherheitsmaßnahmen oder Entdeckung zu widerstehen oder dich für Höchstleistungen in Athletik oder Heimlichkeit zu verausgaben."],
  "Battleborn": ["Zum Kampf geboren", "Du kannst deine Spezialrüstung verbrauchen, um durch einen Angriff erlittenen Schaden zu verringern oder dich im Kampf zu verausgaben."],
  "Bodyguard": ["Leibwächter", "Wenn du ein Gruppenmitglied beschützt, erhältst du +1W auf deinen Widerstandswurf. Beim Sammeln von Informationen über mögliche Bedrohungen erhältst du +1 Wirkung."],
  "Ghost Fighter": ["Geisterkrieger", "Du kannst Hände, Nahkampfwaffen oder Werkzeuge mit Seelenenergie durchwirken. Gegen das Übernatürliche haben sie höhere Eignung; du kannst mit Seelen ringen, um sie zu bändigen oder einzufangen."],
  "Leader": ["Anführer", "Befiehlst du Komplizen im Kampf, kämpfen sie auch dann weiter, wenn sie sonst erledigt wären. Sie erhalten +1 Wirkung und 1 Rüstung."],
  "Mule": ["Packesel", "Deine Lastgrenzen sind erhöht. Leicht: 5. Normal: 7. Schwer: 8."],
  "Not to be Trifled With": ["Nicht mit zu spaßen", "Du kannst dich verausgaben, um einen schier übermenschlichen körperlichen Kraftakt zu leisten – oder – es gleichberechtigt mit einer kleinen Bande aufzunehmen."],
  "Savage": ["Brutal", "Wenn du rohe Gewalt entfesselst, ist das besonders furchterregend. Beim Befehlen eines verängstigten Ziels erhältst du +1W."],
  "Vigorous": ["Kraftstrotzend", "Du erholst dich schneller von Schaden. Fülle ein Segment deiner Heilungsuhr dauerhaft aus und erhalte +1W auf Würfe zur medizinischen Behandlung."],
  "Alchemist": ["Alchemist", "Wenn du eine alchemische Erfindung erfindest oder anfertigst, erhältst du +1 Wirkungsgrad. Zu Beginn kennst du bereits eine Spezialformel."],
  "Analyst": ["Analytiker", "Du erhältst während der Zwischenzeit zwei Uhren-Segmente für Langzeitprojekte zur Recherche oder zum Herausfinden einer neuen Formel oder eines Konstruktionsplans."],
  "Artificer": ["Konstrukteur", "Wenn du eine Funkenwerk-Erfindung erfindest oder anfertigst, erhältst du +1 Wirkungsgrad. Zu Beginn kennst du bereits eine Spezialkonstruktion."],
  "Fortitude": ["Unerschütterlich", "Du kannst deine Spezialrüstung verbrauchen, um Konsequenzen von Ermüdung, Schwäche oder chemischen Effekten zu widerstehen oder dich bei technischer oder alchemistischer Arbeit zu verausgaben."],
  "Ghost Ward": ["Bannkreis", "Zerstörst du einen Bereich mit arkanen Substanzen, wird er für Seelen abstoßend oder anziehend (du hast die Wahl)."],
  "Physicker": ["Medikus", "Du kannst an Körpern tüfteln, um Wunden zu versorgen oder Sterbende zu stabilisieren, sowie Erkrankungen oder Leichen studieren. Jeder in deiner Gang erhält +1W auf medizinische Behandlung."],
  "Saboteur": ["Saboteur", "Beim Zerstören ist dein Werk sehr viel leiser und die Beschädigung vor flüchtiger Betrachtung äußerst gut verborgen."],
  "Venomous": ["Toxisch", "Wähle eine Droge oder ein Gift aus deinem Bandelier, gegen das du immun bist. Du kannst dich verausgaben, um es über die Haut abzusondern oder als Gifthauch auszuatmen."],
  "Foresight": ["Weitblick", "Zweimal pro Coup darfst du einem Teammitglied helfen, ohne Stress auszugeben. Beschreibe, wie du dich hierauf vorbereitet hast."],
  "Calculating": ["Kalkül", "Dank sorgfältiger Planung darfst du dir selbst und einem weiteren Gangmitglied während der Zwischenzeit +1 Aktivität gewähren."],
  "Connected": ["Beziehungen", "Während der Zwischenzeit erhältst du +1 Wirkungsgrad, wenn du Anschaffungen machst oder Verdacht verringerst."],
  "Functioning Vice": ["Kontrolliertes Laster", "Wenn du dich deinem Laster hingibst, kannst du das Würfelergebnis um 1 oder 2 nach oben oder unten anpassen. Verbündete können das ebenso."],
  "Ghost  Contract": ["Geistervertrag", "Wenn du eine Abmachung per Handschlag oder schriftlich besiegelst, tragen beide das Mal des Schwurs. Wer den Vertrag bricht, erleidet Schaden 3. Grades: „Verflucht“."],
  "Jail Bird": ["Knastologie", "Wenn du inhaftiert bist, gilt dein Fahndungsgrad als −1, deine Stufe als +1 und du erhältst +1 Status bei einer Fraktion, der du drinnen hilfst."],
  "Mastermind": ["Drahtzieher", "Du kannst deine Spezialrüstung verbrauchen, um ein Teammitglied zu schützen oder dich beim Sammeln von Informationen oder bei einem Langzeitprojekt zu verausgaben."],
  "Weaving the Web": ["Im Zentrum des Netzes", "Du erhältst +1W auf Verkehren, wenn du für einen Coup Informationen über ein Ziel sammelst, und +1W auf den Einstiegswurf dieses Einsatzes."],
  "Ghost Form": ["Geistergestalt", "Du bist eine Ansammlung elektroplasmatischen Nebels mit geringem Einfluss auf die physische Welt. Du kannst schweben, fliegen und durch kleine Öffnungen sickern. Statt Stress erleidest du Verfall, statt Trauma erleidest du Gram."],
  "Dissipate": ["Auflösen", "Du kannst deine Geistergestalt kurz auflösen, um dich durch feste Gegenstände zu bewegen. Erleide 1 Verfall für das Auflösen und je 1 weiteren Verfall für zusätzliche Eigenschaften."],
  "Manifest": ["Erscheinen", "Erleide 1 Verfall, um durch die elektroplasmatischen Bahnen des Geisterfeldes sofort an einen Ort zu reisen, den du als Lebender gut kanntest, oder einer Beschwörung durch Binden zu folgen."],
  "Poltergeist": ["Poltergeist", "Erleide 1 Verfall, um für wenige Augenblicke starken Einfluss auf die physische Welt zu nehmen. Nimm mehr Verfall in Kauf, um Reichweite und Größenordnung auszudehnen."],
  "Possess": ["Besitz ergreifen", "Du kannst dich auf das Geisterfeld Einstimmen, um die Kontrolle über einen lebenden Körper zu übernehmen. Wird sie angefochten, musst du dich erneut einstimmen oder den Körper verlassen."],
  "Automaton": ["Automat", "Als Seele in einem Blitzwerkkörper hast du menschenähnliche Stärke und Sinne sowie grundsätzliche Rüstung. Statt Stress erleidest du Verfall und existierst nun, um deine Bestimmungen zu erfüllen."],
  "Compartments": ["Bauteile", "Deine Gegenstände sind in dein Gestell verbaut und können in Fächern darin verstaut werden. Dein Gestell kann nun +2 Last tragen."],
  "Electroplasmic Projectors": ["Elektroplasma-Werfer", "Du kannst Energie als elektrischen Schock im Umkreis oder als gerichteten Strahl freisetzen und damit auch eine Blitzbarriere schaffen. Pro Grad Größenordnung erleidest du 1 Verfall."],
  "Interface": ["Schnittstelle", "Du kannst dich auf das örtliche elektroplasmatische Feld Einstimmen, um dieses Feld oder etwas damit Verbundenes zu kontrollieren, einschließlich eines anderen Gehäuses."],
  "Overcharge": ["Überladen", "Erleide 1 Verfall, um einen Kraftakt besonderer Stärke oder Schnelligkeit zu leisten. Das wird in die Wirkung miteinbezogen."],
  "Secondary Hull": ["Zweitgehäuse", "Wähle zu Beginn ein zusätzliches Gestell und ein Merkmal. Du kannst dein Bewusstsein zwischen deinen Gestellen hin- und her transferieren."],
  "Undead": ["Untot", "Du bist eine Seele in einem untoten Körper. Wähle vier Traumazustände. Tödlicher Schaden oder Trauma setzt dich außer Gefecht, bis du genug gefressen hast; arkaner Schaden kann dich dann endgültig zerstören."],
  "Arcane Sight": ["Arkaner Blick", "Erleide 1 Stress, um für einige Minuten über übermenschliche Wahrnehmung zu verfügen: Gedanken und Gefühle hören, in Dunkelheit sehen oder Unsichtbares und Verborgenes wahrnehmen."],
  "Dark Talent": ["Düsteres Talent", "Wähle Verstand, Wille oder Zähigkeit. Der maximale Aktionswert dieses Attributs erhöht sich auf 5 und du erhältst +1W auf Widerstandswürfe damit."],
  "Sinister Guile": ["Finstere List", "Wähle in der Zwischenzeit eine kostenlose zusätzliche Aktivität oder +1 auf alle Zwischenzeitwürfe."],
  "Terrible Power": ["Schreckliche Kraft", "Erleide 1 Stress, um einen Kraftakt übermenschlicher Stärke oder Schnelligkeit zu leisten. Das wird in die Wirkung miteinbezogen."],
  "A Void in the Echo": ["Die Leere im Echo", "Du bist für Seelen unsichtbar und kannst nicht von ihnen verletzt werden. Erleide 2 Stress, um Lebende zu zwingen, ihren Blick abzuwenden und dich kurz nicht zu bemerken."],
  "Veteran": ["Veteran", "Wähle eine Sonderfähigkeit aus einer anderen Quelle."]
};

const ITEMS = {
  "Fine pair of pistols":"Hochwertige Pistolen (2)", "Fine long rifle":"Hochwertiges langläufiges Gewehr", "Electroplasmic ammunition":"Elektroplasma-Munition", "A trained hunting pet":"Abgerichtetes Jagdtier", "Spyglass":"Fernrohr",
  "Fine clothes & jewelry":"Hochwertige Kleidung & Schmuck", "Fine disguise kit":"Hochwertiger Verkleidungskoffer", "Fine loaded dice, trick cards":"Hochwertig gezinkte Würfel & Karten", "Trance powder":"Trancepulver", "A cane-sword":"Stockdegen",
  "Fine lightning hook":"Hochwertiger Blitzhaken", "Fine spirit mask":"Hochwertige Seelenmaske", "Electroplasm vials":"Phiolen mit Elektroplasma", "Spirit bottles (2)":"Seelenflaschen (2)", "Ghost key":"Geisterschlüssel", "Demonbane charm":"Dämonenbann-Talisman",
  "Fine lockpicks":"Hochwertige Dietriche", "Fine shadow cloak":"Hochwertiger Schattenläufermantel", "Light climbing gear":"Leichte Kletterausrüstung", "Silence potion vial":"Phiole Lautloselixier", "Dark-sight goggles":"Dunkelsichtbrille",
  "Fine hand weapon":"Hochwertige Handwaffe", "Fine heavy weapon":"Hochwertige schwere Waffe", "Scary weapon or tool":"Furchterregende Waffe / Werkzeug", "Manacles & chain":"Handschellen mit Ketten", "Rage essence vial":"Phiole Rauschessenz",
  "Fine tinkering tools":"Hochwertiges Bastlerwerkzeug", "Fine wrecking tools":"Hochwertiges Brechwerkzeug", "Blowgun & darts, syringes":"Blasrohr & Pfeile, Spritzen", "Bandolier":"Bandelier (3 Anwendungen)", "Gadgets":"Apparaturen",
  "Fine cover identity":"Hochwertige Tarnidentität", "Fine bottle of whiskey":"Hochwertige Flasche Whiskey", "Blueprints":"Blaupausen", "Vial of slumber essence":"Phiole Schlafessenz", "Concealed palm pistol":"Verborgene Taschenpistole",
  "+ Heavy":"Schwere Rüstung", "A 2nd Pistol":"2. Pistole", "A Blade or Two":"Ein oder zwei Klingen", "A Large Weapon":"Große Waffe", "A Pistol":"Pistole", "An Unusual Weapon":"Ungewöhnliche Waffe", "Arcane Implements":"Arkane Gerätschaften", "Armor":"Rüstung", "Burglary Gear":"Einbrecherausrüstung", "Climbing Gear":"Kletterausrüstung", "Demolition Tools":"Brechwerkzeug", "Documents":"Dokumente", "Lantern":"Laterne", "Spiritbane Charm":"Geisterbann-Talisman", "Subterfuge Supplies":"Täuscherzubehör", "Throwing Knives":"Wurfmesser", "Tinkering Tools":"Tüftlerwerkzeug"
};

const ITEM_DESCRIPTIONS = {
  "Fine pair of pistols":"Ein aufeinander abgestimmtes Paar hochwertiger einschüssiger Pistolen.",
  "Fine long rifle":"Ein präzises, weitreichendes Jagdgewehr von hervorragender Qualität.",
  "Electroplasmic ammunition":"Spezialmunition, die auch gegen Geister und andere übernatürliche Wesen wirkt.",
  "A trained hunting pet":"Ein abgerichtetes Tier, das Befehle befolgt, Fährten liest und Beute stellt.",
  "Spyglass":"Ein kompaktes Fernrohr für Beobachtungen über große Entfernung.",
  "Fine clothes & jewelry":"Elegante Kleidung und echter Schmuck für gesellschaftliche Auftritte.",
  "Fine disguise kit":"Hochwertige Schminke, Perücken und Zubehör für überzeugende Verkleidungen.",
  "Fine loaded dice, trick cards":"Unauffällig manipulierte Spielgeräte für kontrollierte Ergebnisse.",
  "Trance powder":"Eine Dosis des bewusstseinsverändernden Pulvers Trance.",
  "A cane-sword":"Ein eleganter Stock mit einer darin verborgenen Klinge.",
  "Fine lightning hook":"Ein hochwertiges Gerät zum Einfangen und Bändigen von Geistern.",
  "Fine spirit mask":"Eine fein gearbeitete Maske zum Wahrnehmen des Geisterfeldes.",
  "Electroplasm vials":"Mehrere Phiolen konzentrierten Elektroplasmas.",
  "Spirit bottles (2)":"Zwei arkane Behälter, in denen Geister eingeschlossen werden können.",
  "Ghost key":"Ein arkaner Schlüssel, der geisterhafte Wege und Zugänge öffnen kann.",
  "Demonbane charm":"Ein Talisman, der gegen dämonische Einflüsse schützt.",
  "Fine lockpicks":"Ein vollständiger Satz präziser Werkzeuge für anspruchsvolle Schlösser.",
  "Fine shadow cloak":"Ein hochwertiger Mantel, der Gestalt und Bewegung in Dunkelheit verschleiert.",
  "Light climbing gear":"Leichte Seile, Haken und Gurte für unauffälliges Klettern.",
  "Silence potion vial":"Eine Phiole, deren Inhalt Bewegungen und Geräusche vorübergehend dämpft.",
  "Dark-sight goggles":"Eine Spezialbrille zum Sehen bei schwachem Licht und in Dunkelheit.",
  "Fine hand weapon":"Eine hervorragend gefertigte Nahkampfwaffe deiner Wahl.",
  "Fine heavy weapon":"Eine hochwertige schwere Waffe für besonders wirkungsvolle Angriffe.",
  "Scary weapon or tool":"Eine Waffe oder ein Werkzeug mit besonders einschüchternder Wirkung.",
  "Manacles & chain":"Robuste Handschellen mit einer schweren Sicherungskette.",
  "Rage essence vial":"Eine Phiole Rauschessenz, die unkontrollierte Aggression auslöst.",
  "Fine tinkering tools":"Hochwertige Präzisionswerkzeuge für feine mechanische Arbeiten.",
  "Fine wrecking tools":"Hochwertige Spezialwerkzeuge für Sabotage und Zerstörung.",
  "Blowgun & darts, syringes":"Ein Blasrohr mit Pfeilen sowie Spritzen zum Verabreichen von Alchemika.",
  "Bandolier":"Ein Bandelier mit drei Anwendungen alchemistischer Mittel oder Bomben.",
  "Gadgets":"Spezielle Apparaturen, die für einen Einsatz konstruiert wurden.",
  "Fine cover identity":"Vollständige Unterlagen und Ausstattung für eine überzeugende Tarnidentität.",
  "Fine bottle of whiskey":"Eine hochwertige Spirituose, geeignet als Genussmittel oder Geschenk.",
  "Blueprints":"Detaillierte Baupläne, Karten oder technische Zeichnungen.",
  "Vial of slumber essence":"Eine Phiole Schlafessenz, die das Ziel in tiefen Schlaf versetzt.",
  "Concealed palm pistol":"Eine sehr kleine Pistole, die sich leicht in der Hand verbergen lässt.",
  "+ Heavy":"Zusätzliche Kettenrüstung, Metallplatten und ein schützender Helm.",
  "A 2nd Pistol":"Eine zweite schwere, einschüssige Hinterladerpistole.",
  "A Blade or Two":"Ein Kampfmesser, zwei Klingen oder eine vergleichbare Nahkampfbewaffnung.",
  "A Large Weapon":"Eine große zweihändige Waffe, ein Gewehr, Bogen oder eine Armbrust.",
  "A Pistol":"Eine schwere, einschüssige Hinterladerpistole.",
  "An Unusual Weapon":"Eine ungewöhnliche Kuriosität oder ein Werkzeug, das als Waffe dient.",
  "Arcane Implements":"Arkane Substanzen und Geräte für Rituale und den Umgang mit Geistern.",
  "Armor":"Eine dicke Ledertunika mit verstärkten Handschuhen und Stiefeln.",
  "Burglary Gear":"Dietriche, Brecheisen, Öl, Draht, Haken und weiteres Einbruchswerkzeug.",
  "Climbing Gear":"Seile, Wurfhaken, Klettergurt, Eisenhaken und Hammer.",
  "Demolition Tools":"Vorschlaghammer, Eisenkeile, schwerer Bohrer und Brecheisen.",
  "Documents":"Nachschlagewerke, Verzeichnisse, Papier, Tinte, Feder und Karten.",
  "Lantern":"Eine Öl- oder Elektroplasmalaterne beziehungsweise eine andere Lichtquelle.",
  "Spiritbane Charm":"Ein kleiner arkaner Talisman, dem Geister lieber aus dem Weg gehen.",
  "Subterfuge Supplies":"Schminke, Blankodokumente, Modeschmuck und weitere Täuschungsmittel.",
  "Throwing Knives":"Sechs kleine, leichte und ausgewogene Wurfklingen.",
  "Tinkering Tools":"Werkzeuge für feine mechanische Arbeiten und einfache Reparaturen."
};

const PLAYBOOKS = {
  hound:["Ein tödlicher Scharfschütze und Fährtenleser.","Du hast eine Herausforderung mit Verfolgung oder Gewalt angegangen."],
  slide:["Ein raffinierter und manipulativer Spion.","Du hast eine Herausforderung mit Täuschung oder Einflussnahme angegangen."],
  whisper:["Ein Medium und Meister des Arkanen.","Du hast eine Herausforderung mit Wissen oder arkaner Macht angegangen."],
  lurk:["Ein heimlicher Eindringling und Dieb.","Du hast eine Herausforderung mit Heimlichkeit oder Ausweichen angegangen."],
  cutter:["Ein gefährlicher und furchterregender Kämpfer.","Du hast eine Herausforderung mit Gewalt oder Zwang angegangen."],
  leech:["Ein Saboteur und Techniker.","Du hast eine Herausforderung mit technischem Geschick oder Chaos angegangen."],
  spider:["Ein verschlagener Strippenzieher.","Du hast eine Herausforderung mit Berechnung oder Komplotten angegangen."],
  ghost:["Eine Seele ohne Körper.","Du hast Vergeltung an jenen geübt, die du für schuldig hältst."],
  hull:["Eine Seele, die ein Blitzwerkgestell belebt.","Du hast deine Bestimmungen trotz Schwierigkeiten oder Gefahr erfüllt."],
  vampire:["Eine Seele, die einen untoten Körper belebt.","Du hast deine Dominanz bewiesen oder ohne Gnade gemordet."]
};

const ROLES = {
  "an assassin":"ein Auftragsmörder", "a sentinel":"ein Wachposten", "a physicker":"ein Medikus", "a spy":"ein Spion", "a bounty hunter":"eine Kopfgeldjägerin",
  "a drug dealer":"eine Drogenhändlerin", "a gang leader":"ein Gang-Chef", "a tavern owner":"eine Wirtin", "a prostitute":"eine Sexarbeiterin", "a jail-bird":"ein Häftling",
  "a possessor ghost":"ein Geist", "a vampire":"ein Vampir", "a demon":"eine Dämonin", "a witch":"eine Hexe", "a spirit trafficker":"ein Seelenhändler",
  "a beggar":"eine Bettlerin", "a bluecoat":"ein Blaurock", "a locksmith":"ein Schlosser", "a noble":"eine Adlige", "a city clerk":"eine Stadtbeamtin",
  "a pugilist":"eine Boxerin", "a vicious thug":"ein übler Schläger", "a cold killer":"eine eiskalte Killerin", "an extortionist":"eine Erpresserin",
  "an apothecary":"eine Apothekerin", "a psychonaut":"ein Psychonaut", "a corpse thief":"ein Leichendieb", "a blood dealer":"ein Bluthändler", "a priestess":"eine Priesterin",
  "an information broker":"eine Informationshändlerin", "a master architect":"ein Meisterarchitekt", "a servant":"eine Bedienstete", "a chemist":"ein Chemiker", "a bluecoat archivist":"ein Blaurock-Archivar",
  "a butler":"ein Butler", "a consort":"eine Mätresse", "a bodyguard":"eine Leibwache", "a coachman":"ein Kutscher", "an envoy":"ein Gesandter"
};

// Manche Compendien stellen dem Namen eine Quellenangabe in Klammern voran. Sie darf
// den Lookup nicht beeinflussen und wird deshalb vor der Normalisierung entfernt.
const clean = value => String(value ?? "").replace(/^\([^)]*\)\s*/, "").trim();
const abilityKey = value => clean(value).replace(/\s*\([^)]*\)\s*$/, "").replace(/\s+/g, " ").toLowerCase();
const ABILITIES_NORMALIZED = Object.fromEntries(Object.entries(ABILITIES).map(([key, value]) => [abilityKey(key), value]));
const ATTRIBUTE_SUFFIXES = { insight: "Verstand", prowess: "Körper", resolve: "Wille" };
export function translateAbility(item) {
  const original = clean(item.name);
  const text = ABILITIES_NORMALIZED[abilityKey(original)];
  const suffix = original.match(/\(([^)]+)\)\s*$/)?.[1];
  const translatedSuffix = suffix ? (ATTRIBUTE_SUFFIXES[suffix.toLowerCase()] ?? suffix) : "";
  const name = text ? `${text[0]}${translatedSuffix ? ` (${translatedSuffix})` : ""}` : original;
  return {_id:item._id??item.id,name,description:text?.[1]??item.system?.description??"",system:item.system};
}
export function translateItem(item) { const key=clean(item.name); return {name:ITEMS[key]??key,description:ITEM_DESCRIPTIONS[key]??item.system?.description??""}; }
export function translatePlaybook(key, description) { return PLAYBOOKS[key]?.[0]??description??""; }
export function translateXpClue(key, clue) { return PLAYBOOKS[key]?.[1]??clue; }
export function translateContactRole(role) { return ROLES[String(role??"").toLowerCase()]??role??""; }
