/* ===================================================
   ÉDUCATIFS ÉPS — Zone Total Sport
   Application principale
   =================================================== */

'use strict';

// ─────────────────────────────────────────────────────
// BANQUE DE DONNÉES — TAXONOMIE ET ÉDUCATIFS
// ─────────────────────────────────────────────────────
const TAXONOMY = [
  {
    section: '🎯 Manipulation d\'objets',
    categories: [
      {
        key: 'balles_ballons',
        emoji: '🎾',
        name: 'Balles et ballons',
        desc: 'Jonglerie, lancer, attraper, frapper',
        count: '15+ éducatifs',
        educatifs: [
          {
            titre: 'Lancer contre le mur',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 10,
            desc: 'L\'élève lance une balle contre le mur et la rattrape à deux mains, puis à une main. Progressions: augmenter la distance, alterner les mains, ajouter des rebonds au sol, imposer la main non dominante, introduire un rebond contre le mur avant la réception.',
            materiel: ['1 balle de tennis par élève', 'Mur lisse'],
            competence: 'Manipulation',
            variantes: 'Lancer en dessous, lancer en cloche, lancer avec rotation, lancer en reculant d\'un pas à chaque réception réussie.',
            adaptation: 'Utiliser une balle plus grosse ou plus légère pour les élèves en difficulté. Réduire la distance.',
            tags: ['lancer', 'attraper', 'mur', 'précision']
          },
          {
            titre: 'Jonglerie 2 balles',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'L\'élève maîtrise la cascade à 2 balles: partir avec 1 balle, puis introduire la 2e. Séquence: lancer balle A, attraper balle A, lancer balle B... Travailler les croises, l\'envoi simultané (fontaine), la synchronisation œil-main.',
            materiel: ['2 balles de jonglerie par élève', 'Foulards de jonglerie en option pour débutants'],
            competence: 'Manipulation',
            variantes: 'Jonglerie assise, en marchant, passer de 2 à 3 balles, jongler en duo (échange).',
            adaptation: 'Commencer avec des foulards (descente lente) avant les balles. Travailler d\'abord une main puis l\'autre.',
            tags: ['jonglerie', 'coordination', 'yeux-mains', 'rythme']
          },
          {
            titre: 'Passe-et-va',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'En dyade, l\'élève A passe le ballon à l\'élève B et se déplace immédiatement vers une nouvelle position. L\'élève B reçoit, passe, et se déplace à son tour. Travailler la passe à deux mains, la passe à une main, la passe sur la course du partenaire.',
            materiel: ['1 ballon par duo (basketball ou volleyball)'],
            competence: 'Manipulation',
            variantes: 'Ajouter un défenseur passif, intégrer dans un circuit, imposer type de passe (rebond, poitrine, lob).',
            adaptation: 'Réduire la distance de passe, utiliser un ballon plus léger ou plus gros.',
            tags: ['passe', 'déplacement', 'duo', 'coordination']
          },
          {
            titre: 'Circuit de dribble',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 20,
            desc: 'Parcours de 6 cônes en slalom avec dribble constant (basketball ou soccer). Aller en dribble main droite, retour main gauche. Intégrer des arrêts contrôlés, des changements de direction, des pivots à chaque cône. Chronométrer et progresser.',
            materiel: ['6 cônes', '1 ballon par élève', 'Chronomètre'],
            competence: 'Manipulation',
            variantes: 'Dribble les yeux fermés sur dernier cône, course à relais, ajout de défi au dernier cône (tir, passe).',
            adaptation: 'Élargir l\'espace entre les cônes, ralentir le rythme, éliminer le chronométrage.',
            tags: ['dribble', 'slalom', 'agilité', 'coordination']
          },
          {
            titre: 'Aérotball ballon prisonnier',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'L\'élève lance un ballon gonflable vers le plafond et le rattrape avant qu\'il touche le sol. Défi progressif: 1 main, 2 mains, dos tourné, clap avant attraper, s\'asseoir et se relever. Excellent pour développer le suivi visuel et les réflexes de base.',
            materiel: ['1 ballon gonflable léger par élève'],
            competence: 'Manipulation',
            variantes: 'Lancers en duo (l\'un lance, l\'autre attrape), lancer en groupe en cercle.',
            adaptation: 'Ballon plus gros et plus léger pour faciliter. Éliminer la contrainte de temps.',
            tags: ['lancer', 'attraper', 'réflexes', 'suivi visuel']
          },
          {
            titre: 'Soccer freestyle touches',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 20,
            desc: 'L\'élève réalise des jongleries avec un ballon de soccer: pied droit, pied gauche, genou, tête. Objectif progressif: 5 touches, puis 10, puis 20 sans que le ballon touche le sol. Travailler la surface de contact (milieu du pied), l\'amortissement et la régularité du rythme.',
            materiel: ['1 ballon de soccer par élève'],
            competence: 'Manipulation',
            variantes: 'Jonglerie en mouvement, jonglerie en duo avec passes hautes, comptage en groupe.',
            adaptation: 'Permettre les rebonds au sol entre chaque touche. Commencer en position assise.',
            tags: ['soccer', 'jonglerie', 'équilibre', 'coordination']
          },
          {
            titre: 'Balle-cible précision',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 12,
            desc: 'Lancer une balle pour toucher des cibles dessinées au sol ou fixées au mur à différentes distances (2 m, 4 m, 6 m). 3 essais par distance, compter les points. Varier le type de lancer: par en haut, par en bas, roulé au sol.',
            materiel: ['3 balles par élève', 'Cibles (cerceaux au sol ou cibles au mur)'],
            competence: 'Manipulation',
            variantes: 'Cibles mobiles (ballon suspendu), lancer par-dessus une haie, lancer en courant.',
            adaptation: 'Rapprocher les cibles, agrandir les cibles, utiliser une plus grosse balle.',
            tags: ['précision', 'lancer', 'viser', 'cible']
          }
        ]
      },
      {
        key: 'batons_raquettes',
        emoji: '🏒',
        name: 'Bâtons et raquettes',
        desc: 'Hockey, badminton, tennis, ringuette',
        count: '14+ éducatifs',
        educatifs: [
          {
            titre: 'Dribble hockey débutant',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'L\'élève dribble avec une balle de mousse en utilisant les deux faces du bâton de hockey (revers et coup droit). Ligne droite d\'abord, puis en slalom autour de 4 cônes espacés de 2 m. Insister sur la prise de bâton basse, les deux mains, et le contrôle du regard.',
            materiel: ['1 bâton de hockey par élève', '1 balle de mousse par élève', '4 cônes'],
            competence: 'Manipulation',
            variantes: 'Dribble latéral, dribble en reculant, slalom dos au mur.',
            adaptation: 'Utiliser un bâton plus court, balle plus grande, espace plus large entre les cônes.',
            tags: ['hockey', 'dribble', 'slalom', 'bâton']
          },
          {
            titre: 'Passe bâton vs cible',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'Tirs de précision avec bâton hockey vers des cibles au mur (cercles de 30 cm à différentes hauteurs). Pratiquer le tir coup droit et le tir revers depuis 3 m, puis 5 m. Travailler la posture, le transfert du poids, le suivi du regard vers la cible.',
            materiel: ['1 bâton par élève', '2-3 balles', 'Cibles au mur'],
            competence: 'Manipulation',
            variantes: 'Tir en déplacement, tir après dribble, tir en duel.',
            adaptation: 'Agrandir les cibles, réduire la distance, tirer d\'une position arrêtée uniquement.',
            tags: ['hockey', 'tir', 'précision', 'cible']
          },
          {
            titre: 'Service badminton débutant',
            niveau: '2e cycle',
            difficulte: 'debutant',
            duree: 15,
            desc: 'L\'élève apprend le service court par en dessous: tenir le volant au niveau de la hanche, raquette derrière, frapper en avant-haut. Objectif: faire passer le volant par-dessus un filet bas (à 1,5 m) et tomber dans la zone adverse. Répétitions par paquets de 10.',
            materiel: ['1 raquette de badminton par élève', '3 volants par élève', 'Filet bas ou corde à 1,5 m'],
            competence: 'Manipulation',
            variantes: 'Service long, service croisé, service dans zone délimitée.',
            adaptation: 'Baisser le filet ou utiliser une corde. Guider le geste avec l\'enseignant. Ballon gonflable à la place du volant.',
            tags: ['badminton', 'service', 'raquette', 'technique']
          },
          {
            titre: 'Échange badminton',
            niveau: '3e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'En duo, enchaîner le plus grand nombre d\'échanges consécutifs sans que le volant touche le sol. Alterner les types de coups: clear, smash léger, dégagé. Objectif collectif: battre le record de la classe. Travailler les déplacements et le retour au centre.',
            materiel: ['1 raquette par joueur', '1 volant par duo', 'Filet de badminton'],
            competence: 'Manipulation',
            variantes: 'Échange en imposant zones (fond, filet), jeu en trios, comptage de record.',
            adaptation: 'Utiliser un ballon gonflable. Baisser le filet. Autoriser un rebond au sol.',
            tags: ['badminton', 'échange', 'déplacement', 'coordination']
          },
          {
            titre: 'Slalom raquette-balle',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 12,
            desc: 'L\'élève transporte une balle de tennis sur une raquette de badminton en slalom autour de 6 cônes, sans que la balle tombe. Varier l\'allure: marche, trot, course. Introduire des obstacles (passer sous une haie, franchir une ligne).',
            materiel: ['1 raquette de badminton par élève', '1 balle de tennis par élève', '6 cônes'],
            competence: 'Manipulation',
            variantes: 'Ajouter 2 balles, tenir la raquette derrière le dos, yeux partiellement fermés.',
            adaptation: 'Utiliser une raquette à surface plus grande (raquette de squash), balle plus grosse.',
            tags: ['raquette', 'équilibre', 'slalom', 'contrôle']
          },
          {
            titre: 'Circuit raquette-balle varié',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 20,
            desc: 'Parcours en 6 stations de 2 minutes: 1) Lancer-attraper mur avec raquette, 2) Slalom balle sur raquette, 3) Service contre mur, 4) Échange avec partenaire, 5) Tir précision cible, 6) Volant sur raquette en équilibre. Rotation toutes les 2 min.',
            materiel: ['Raquettes variées', 'Balles de tennis', 'Volants', 'Cônes', 'Cibles'],
            competence: 'Manipulation',
            variantes: 'Chronométrer chaque station, défi en équipe, modifier l\'ordre des stations.',
            adaptation: 'Réduire la durée de chaque station, simplifier les consignes, raquettes plus légères.',
            tags: ['circuit', 'raquette', 'polyvalence', 'stations']
          },
          {
            titre: 'Tir précision hockey',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 15,
            desc: 'Tirs en mouvement vers des zones numérotées dans un filet (6 zones). L\'élève reçoit une passe de l\'enseignant, canalise et tire vers la zone annoncée. Travailler la précision, la puissance contrôlée, les angles de tir, et la décision rapide.',
            materiel: ['Bâtons de hockey', 'Balles', 'Filet ou but', 'Cibles numérotées dans le but'],
            competence: 'Manipulation',
            variantes: 'Tir en se déplaçant de côté, tir en contre-attaque, tir avec défenseur.',
            adaptation: 'Tirer d\'une position arrêtée, agrandir les zones cibles, balle plus lente.',
            tags: ['hockey', 'tir', 'précision', 'zone']
          }
        ]
      },
      {
        key: 'cordes_cerceaux',
        emoji: '🪢',
        name: 'Cordes et cerceaux',
        desc: 'Sauter, tourner, tisser',
        count: '10+ éducatifs',
        educatifs: [
          {
            titre: 'Saut à la corde individuel',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'L\'élève saute à la corde individuelle en rythme. Démarrer avec la corde devant, passer par-dessus. Objectif: 10 sauts consécutifs, puis 20, puis 50. Travailler le rythme, la hauteur de saut minimale, et la posture (dos droit, genoux légèrement fléchis).',
            materiel: ['1 corde à sauter par élève'],
            competence: 'Locomotion',
            variantes: 'Saut alterné, saut rapide (poivrier), saut à reculons, double saut.',
            adaptation: 'Corde tenue à faible hauteur par deux camarades. Sauter sur place sans corde d\'abord.',
            tags: ['corde', 'saut', 'rythme', 'coordination']
          },
          {
            titre: 'Parcours cerceaux au sol',
            niveau: 'maternelle',
            difficulte: 'debutant',
            duree: 10,
            desc: 'Cerceaux disposés au sol en ligne ou en patterns. L\'élève saute d\'un pied, deux pieds, galope, esquive. Varier les patterns: ligne droite, zigzag, largeur variable. Excellent pour développer la coordination bilatérale et la proprioception.',
            materiel: ['10 cerceaux par parcours'],
            competence: 'Locomotion',
            variantes: 'Sauter avec objet dans les mains, sauter dos à dos avec un partenaire, patterns en duo.',
            adaptation: 'Élargir les cerceaux, réduire le nombre d\'étapes, guider l\'élève à la main.',
            tags: ['cerceaux', 'saut', 'parcours', 'coordination']
          },
          {
            titre: 'Hula-hoop record',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'L\'élève fait tourner un cerceau autour de la taille le plus longtemps possible. Travailler le mouvement de hanches, l\'accélération initiale, le maintien du rythme. Défis progressifs: autour des bras, des jambes, du cou. Compétition de record de classe.',
            materiel: ['1 grand cerceau (hula-hoop) par élève'],
            competence: 'Coordination',
            variantes: 'Hula-hoop en marchant, en avançant, passer le cerceau d\'une partie du corps à l\'autre.',
            adaptation: 'Cerceau plus lourd (tourne plus lentement), plus grand, ou tenir légèrement la hanche.',
            tags: ['cerceau', 'rythme', 'coordination', 'hanches']
          }
        ]
      },
      {
        key: 'frisbee_disques',
        emoji: '🥏',
        name: 'Frisbee et disques',
        desc: 'Lancer, attraper, Ultimate',
        count: '8+ éducatifs',
        educatifs: [
          {
            titre: 'Lancer frisbee de base',
            niveau: '2e cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'Apprendre la prise et le lancer du frisbee: prise backhand (pouce dessus, 4 doigts en dessous sur le bord). Lancer en ligne droite vers un partenaire à 5 m, puis 8 m, puis 12 m. Insister sur l\'angle de relâchement, le snap du poignet, et l\'horizontalité du disque.',
            materiel: ['1 frisbee par duo'],
            competence: 'Manipulation',
            variantes: 'Lancer forehand, lancer en l\'air (hammer), attraper derrière le dos.',
            adaptation: 'Utiliser un frisbee en mousse, réduire la distance, cible au sol pour viser.',
            tags: ['frisbee', 'lancer', 'technique', 'précision']
          },
          {
            titre: 'Ultimate initiation',
            niveau: '3e cycle',
            difficulte: 'intermediaire',
            duree: 20,
            desc: 'Introduction au Ultimate frisbee: règles de base (pas de contact, pivot, stall count). Jeu 4v4 sur terrain réduit. Insister sur le démarquage, la décision rapide, et l\'esprit sportif (spirit of the game). Rotation des équipes toutes les 5 minutes.',
            materiel: ['2-3 frisbees', 'Cônes pour délimiter le terrain', 'Dossards'],
            competence: 'Sport collectif',
            variantes: 'Imposer type de passe, jeu en surnombre (3v2), conditions météo (vent).',
            adaptation: 'Terrain plus petit, frisbee plus lent, règles simplifiées, arbitre enseignant.',
            tags: ['ultimate', 'collectif', 'démarquage', 'tactique']
          }
        ]
      },
      {
        key: 'cirque',
        emoji: '🎪',
        name: 'Articles de cirque',
        desc: 'Jonglerie, diabolo, assiettes chinoises',
        count: '8+ éducatifs',
        educatifs: [
          {
            titre: 'Jonglerie 3 balles cascade',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 20,
            desc: 'Maîtriser la cascade à 3 balles: lancer balle A (main D), lancer balle B (main G) au passage de A, attraper A, lancer C (main D) au passage de B, attraper B... Travailler lentement, par étapes. Le secret: ne jamais regarder ses mains, regarder le haut des trajectoires.',
            materiel: ['3 balles de jonglerie par élève (même poids)'],
            competence: 'Coordination',
            variantes: 'Cascade sous la jambe, cascade avec balle supplémentaire, cascade en duo synchronisé.',
            adaptation: 'Revenir à 2 balles, utiliser des foulards, réduire la hauteur des lancers.',
            tags: ['jonglerie', '3 balles', 'coordination', 'concentration']
          },
          {
            titre: 'Assiette chinoise débutant',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'Apprendre à faire tourner une assiette sur un bâton: déposer l\'assiette sur le bâton, donner de l\'élan avec des petits cercles. Maintenir la rotation pendant 15 secondes, puis 30, puis 1 minute. Transférer d\'une main à l\'autre.',
            materiel: ['1 assiette chinoise par élève', '1 bâton'],
            competence: 'Coordination',
            variantes: 'Tenir 2 assiettes, faire des figures (tenir bas, s\'accroupir), défi en duo.',
            adaptation: 'Bâton plus court, assiette plus lourde (tourne plus longtemps), tenir en position assise.',
            tags: ['assiette', 'cirque', 'équilibre', 'rotation']
          }
        ]
      }
    ]
  },
  {
    section: '🏃 Locomotion',
    categories: [
      {
        key: 'courir',
        emoji: '🏃',
        name: 'Courir',
        desc: 'Sprint, endurance, haies, relais',
        count: '14+ éducatifs',
        educatifs: [
          {
            titre: 'Sprint ligne droite',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 10,
            desc: 'Course en ligne droite sur 20 m. Travailler la position de départ (légère flexion, poids vers l\'avant), la foulée dynamique, les bras en opposition. Récupération active entre les sprints (marche retour). 5 à 8 répétitions. Pointer les sensations de poussée au sol.',
            materiel: ['Cônes de départ et arrivée'],
            competence: 'Locomotion',
            variantes: 'Départ couché, départ dos à la ligne, sprint en duo côte à côte, sprint avec départ au signal sonore.',
            adaptation: 'Réduire la distance à 10 m, courir en ligne moins rapidement, se concentrer sur la forme.',
            tags: ['sprint', 'vitesse', 'départ', 'technique']
          },
          {
            titre: 'Course haies basses',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'Franchise de haies basses (30 cm) espacées de 2 m. Passer la haie avec la jambe d\'attaque tendue, ramener la jambe de traîne en flexion. 5 haies par ligne, 3 à 4 passages. Chronométrer pour progresser. Insister sur le rythme régulier entre les haies.',
            materiel: ['5-8 haies basses (30 cm)', 'Cônes'],
            competence: 'Locomotion',
            variantes: 'Varier l\'espacement, alterner le pied d\'attaque, course avec 1 foulée entre haies.',
            adaptation: 'Haies encore plus basses (15 cm) ou cônes à franchir. Ralentir l\'allure.',
            tags: ['haies', 'rythme', 'foulée', 'technique']
          },
          {
            titre: 'Relais simple 4x25 m',
            niveau: '2e cycle',
            difficulte: 'debutant',
            duree: 15,
            desc: 'Relais en équipe de 4. Chaque coureur parcourt 25 m avant de passer le témoin. Travailler la zone de passage du témoin (5 m), le coureur partant en mouvement, la main tendue en arrière. 3 à 4 passages pour chaque équipe. Travail sur la communication.',
            materiel: ['Témoin de relais', 'Cônes de zone de passage'],
            competence: 'Locomotion',
            variantes: 'Relais navette, relais avec obstacles, relais thématique (objets à transporter).',
            adaptation: 'Témoin plus gros (bâton de hockey coupé), zone de passage plus longue, distance réduite.',
            tags: ['relais', 'témoin', 'équipe', 'vitesse']
          },
          {
            titre: 'Course fractionnée 30-30',
            niveau: '3e cycle',
            difficulte: 'intermediaire',
            duree: 20,
            desc: '30 secondes d\'effort intense suivi de 30 secondes de récupération active (marche rapide). Répéter 8 à 10 fois. L\'élève doit couvrir la même distance à chaque effort. Enseigner la gestion de l\'effort, la respiration rythmée, et la conscience de son rythme cardiaque.',
            materiel: ['Chronomètre ou minuterie sonore', 'Terrain dégagé de 40 m'],
            competence: 'Endurance',
            variantes: 'Fractionnés 20-40 (récup plus longue), fractionnés pyramidaux (10-10, 20-20, 30-30, 40-40...).',
            adaptation: 'Réduire l\'intensité, augmenter la récupération, utiliser un périmètre plus petit.',
            tags: ['fractionné', 'endurance', 'intensité', 'gestion']
          },
          {
            titre: 'Départ réaction signal',
            niveau: '2e cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'Élèves en position de départ (debout, accroupi, couché sur le ventre). Au signal visuel ou sonore, sprint de 10 m. Varier les positions de départ et les types de signaux (clap, sifflet, couleur levée, mot-clé). Développer la réactivité et le temps de réaction.',
            materiel: ['Sifflet', 'Cartons de couleurs', 'Cônes'],
            competence: 'Locomotion',
            variantes: 'Départ dos à la ligne, départ dos dos en duo, réaction à une couleur spécifique seulement.',
            adaptation: 'Signaux plus clairs et espacés, départ toujours de la même position.',
            tags: ['réaction', 'départ', 'vitesse', 'signal']
          },
          {
            titre: 'Course obstacles variés',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 20,
            desc: 'Parcours de 8 obstacles variés sur 40 m: haie (sauter), cerceaux (pied dans chaque), cône (contourner), tapis (rouler), tunnel (passer dessous), haie latérale (passer à côté en latéral), planche d\'équilibre (traverser lentement), sprint final. Chronométrer.',
            materiel: ['Haies', 'Cerceaux', 'Cônes', 'Tapis', 'Tunnel', 'Planche d\'équilibre'],
            competence: 'Locomotion',
            variantes: 'Parcours à l\'envers, parcours en duo synchronisé, parcours avec porter un objet.',
            adaptation: 'Réduire le nombre d\'obstacles, faciliter chaque station, éliminer le chrono.',
            tags: ['obstacles', 'parcours', 'polyvalence', 'agilité']
          },
          {
            titre: 'Poursuite en couloir',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'En duo dans un couloir de 2 m de large et 20 m de long, l\'élève A est à 3 m derrière B et tente de le toucher en 15 secondes. Si touché, échange des rôles. Travailler l\'accélération, les changements d\'allure, et l\'anticipation. Cadre sécuritaire grâce au couloir.',
            materiel: ['Cônes pour délimiter les couloirs'],
            competence: 'Locomotion',
            variantes: 'Poursuite dans un labyrinthe, poursuite avec ballon, poursuite avec défi à la fin.',
            adaptation: 'Couloir plus large, distance initiale plus grande, rôle de poursuivant plus court.',
            tags: ['poursuite', 'vitesse', 'réaction', 'duo']
          }
        ]
      },
      {
        key: 'sauter',
        emoji: '🦘',
        name: 'Sauter',
        desc: 'Longueur, hauteur, triple, cloche-pied',
        count: '14+ éducatifs',
        educatifs: [
          {
            titre: 'Saut cloche-pied enchaîné',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 10,
            desc: 'L\'élève avance à cloche-pied le plus loin possible sur un pied, puis change. Objectif: 10 sauts par pied sans perdre l\'équilibre. Travailler la phase d\'impulsion (poussée du sol), la phase aérienne (jambe libre en avant), et l\'amortissement.',
            materiel: ['Espace dégagé de 10 m'],
            competence: 'Locomotion',
            variantes: 'Cloche-pied en reculant, en zigzag, avec obstacles, cloche-pied dans cerceaux.',
            adaptation: 'Tenir un mur ou une barre d\'appui. Réduire la distance. Travailler d\'abord en statique.',
            tags: ['cloche-pied', 'équilibre', 'saut', 'jambe']
          },
          {
            titre: 'Saut longueur debout',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'Depuis une ligne, saut bipodale maximum en longueur. Travailler l\'élan des bras (bras en arrière puis projetés vers l\'avant), la flexion des genoux avant l\'impulsion, l\'extension complète du corps en vol, et l\'amortissement pieds-genoux-bassin.',
            materiel: ['Ligne de départ', 'Ruban à mesurer', 'Tapis d\'atterrissage'],
            competence: 'Locomotion',
            variantes: 'Saut depuis step, saut avec retournement en l\'air, compétition progressive.',
            adaptation: 'Saut depuis une légère élévation pour faciliter. Mesurer les progrès personnels, pas entre élèves.',
            tags: ['longueur', 'saut', 'impulsion', 'mesure']
          },
          {
            titre: 'Saut dans les cerceaux',
            niveau: 'maternelle',
            difficulte: 'debutant',
            duree: 10,
            desc: 'Cerceaux disposés en ligne à distance variable. L\'élève saute d\'un cerceau à l\'autre avec 2 pieds, puis 1 pied. Varier les distances (50 cm, 80 cm, 1 m). Excellente introduction au saut dirigé et à la proprioception des distances.',
            materiel: ['8-10 cerceaux'],
            competence: 'Locomotion',
            variantes: 'Sauter dans l\'ordre des couleurs, sauter en reculant, sauter avec ballon tenu.',
            adaptation: 'Cerceaux collés (distance minimale), aider l\'élève par la main.',
            tags: ['cerceaux', 'saut', 'maternelle', 'distance']
          },
          {
            titre: 'Sauts rythmiques corde',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'Suite de sauts à la corde avec variations rythmiques: saut lent (2 temps: saut-saut), saut rapide, saut alterné (pied droit-gauche), double saut (corde passe 2 fois en 1 saut). Travailler la régularité, la musicalité du mouvement, et l\'endurance.',
            materiel: ['1 corde à sauter par élève'],
            competence: 'Locomotion',
            variantes: 'Saut en musique, saut à la corde géante en groupe, créer une chorégraphie.',
            adaptation: 'Sauter sur place sans corde au rythme voulu. Corde tenue bas.',
            tags: ['corde', 'rythme', 'saut', 'endurance']
          },
          {
            titre: 'Triple saut simplifié',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 15,
            desc: 'Enchaîner: saut-saut-saut (cloche-pied droit, cloche-pied gauche, bipodale). Depuis une ligne, mesurer la distance totale. Travailler les 3 phases distinctes, l\'angle d\'impulsion (45°), et le gainage en vol. Comparer les progrès sur 3 semaines.',
            materiel: ['Ligne de départ', 'Ruban à mesurer', 'Zone d\'atterrissage sécuritaire'],
            competence: 'Locomotion',
            variantes: 'Triple saut depuis élan, triple saut latéral, compétition personnelle sur série.',
            adaptation: 'Diviser en segments: d\'abord saut-saut seulement. Tapis pour l\'atterrissage.',
            tags: ['triple saut', 'impulsion', 'coordination', 'mesure']
          },
          {
            titre: 'Saut haie basse avec élan',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: '3 haies basses (30-40 cm) à franchir avec élan de 5 m. Travailler la jambe d\'attaque tendue vers la haie, l\'attaque du sol après, le rythme 3 foulées entre haies. Répétitions en alternant le pied d\'attaque. Commencer en marchant, puis trot, puis course.',
            materiel: ['3-5 haies basses', 'Cônes de départ'],
            competence: 'Locomotion',
            variantes: 'Haies de hauteurs variables, haies avec espacement inégal, haies en duo synchronisé.',
            adaptation: 'Haies très basses (15 cm ou cônes), franchir en marchant lentement.',
            tags: ['haie', 'saut', 'rythme', 'élan']
          },
          {
            titre: 'Course-saut-réception',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 18,
            desc: 'Élan de 8 m, saut en longueur avec phase de vol maximale, réception sur 2 pieds en équilibre (3 secondes sans bouger). Travailler l\'impulsion à 1 pied depuis la planche, le groupé jambes en avant en vol, la réception en demi-squat absorbant l\'impact. Mesure et progression.',
            materiel: ['Planche d\'impulsion', 'Tapis d\'atterrissage', 'Mesure'],
            competence: 'Locomotion',
            variantes: 'Saut avec rotation, saut avec attrape d\'objet en vol, saut depuis différentes hauteurs.',
            adaptation: 'Élan réduit, hauteur de saut moindre, tapis plus épais pour amortir.',
            tags: ['saut', 'élan', 'réception', 'équilibre']
          }
        ]
      },
      {
        key: 'ramper_rouler',
        emoji: '🐛',
        name: 'Ramper et rouler',
        desc: 'Au sol, obstacles, galipettes',
        count: '8+ éducatifs',
        educatifs: [
          {
            titre: 'Galipette avant sur tapis',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'Roulade avant élémentaire: position accroupie, mains au sol, nuque rentrée, pousser des pieds, rouler sur le dos arrondi. Arriver en position accroupie. Ne jamais appuyer sur la tête. Travailler sur tapis épais. Bien insister sur la nuque rentrée (menton sur la poitrine).',
            materiel: ['Tapis de gym épais (5 cm minimum)'],
            competence: 'Locomotion',
            variantes: 'Galipette depuis debout, galipette enchaînée (3), galipette avec réception debout.',
            adaptation: 'Aider l\'élève en guidant les hanches. Commencer sur plan incliné légèrement.',
            tags: ['galipette', 'roulade', 'tapis', 'acrobatie']
          },
          {
            titre: 'Roulade arrière initiation',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'Depuis position accroupie, s\'asseoir, porter les genoux au menton, rouler sur le dos, poser les mains au niveau des oreilles, pousser pour passer par-dessus. Travailler la protection des cervicales (pousser fort avec les mains). Plan incliné conseillé au début.',
            materiel: ['Tapis épais', 'Plan incliné (tapis en pente légère)'],
            competence: 'Locomotion',
            variantes: 'Roulade arrière vers debout, roulade arrière en diagonale, enchaîner avant-arrière.',
            adaptation: 'Utiliser un plan incliné. Aide de l\'enseignant pour guider les hanches. Débuter avec roulade sur le côté.',
            tags: ['roulade arrière', 'protection', 'tapis', 'acrobatie']
          },
          {
            titre: 'Parcours ramper-rouler',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 18,
            desc: 'Circuit au sol en 5 étapes: 1) Ramper sous une table/banc (50 cm de hauteur), 2) Roulade avant sur tapis, 3) Ramper sur les coudes 5 m, 4) Galipette latérale, 5) Se relever et sprint 5 m. Répéter 3-4 fois. Travailler l\'efficacité du déplacement au sol.',
            materiel: ['Tables/bancs bas', 'Tapis', 'Cônes'],
            competence: 'Locomotion',
            variantes: 'Ajouter obstacles à franchir, faire le circuit à l\'envers, en duo synchronisé.',
            adaptation: 'Augmenter la hauteur des passages, roulade optionnelle, rythme plus lent.',
            tags: ['parcours', 'sol', 'circuit', 'roulade']
          }
        ]
      },
      {
        key: 'grimper',
        emoji: '🧗',
        name: 'Grimper',
        desc: 'Escalade, structures, cordes',
        count: '8+ éducatifs',
        educatifs: [
          {
            titre: 'Escalade mur initiation',
            niveau: '2e cycle',
            difficulte: 'debutant',
            duree: 15,
            desc: 'Sur mur d\'escalade bas (2-3 m), apprendre les bases: 3 points de contact (2 pieds + 1 main, ou 2 mains + 1 pied), utiliser les jambes pour monter (pas les bras), regarder les prises. Traversée latérale d\'abord (sans monter haut), puis montée avec assurance.',
            materiel: ['Mur d\'escalade', 'Chaussons d\'escalade', 'Tapis de réception'],
            competence: 'Locomotion',
            variantes: 'Traversée avec couleurs imposées, montée sur temps, escalade en duo (un guide l\'autre).',
            adaptation: 'Traversée uniquement sans gagner de hauteur. Prises plus grandes et nombreuses.',
            tags: ['escalade', 'prises', 'grimper', '3 points']
          },
          {
            titre: 'Grimper à la corde lisse',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 15,
            desc: 'Grimper à la corde lisse en utilisant les pieds (bloquer avec un pied sur la corde, pousser l\'autre). Ne JAMAIS grimper uniquement avec les bras. Technique: hanches hautes, genoux montés, pousser des pieds, monter les mains. Descendre contrôlé en tenant des 2 mains.',
            materiel: ['Corde lisse suspendue', 'Tapis de réception'],
            competence: 'Force',
            variantes: 'Grimper avec nœuds, grimper à 2 cordes simultanées, descente en rappel contrôlé.',
            adaptation: 'Corde avec nœuds pour débutants. Ne monter qu\'à 1 m. Grimper incliné (corde à 45°).',
            tags: ['corde', 'grimper', 'force', 'technique']
          }
        ]
      },
      {
        key: 'esquiver',
        emoji: '💨',
        name: 'Esquiver',
        desc: 'Agilité, réaction, slalom',
        count: '8+ éducatifs',
        educatifs: [
          {
            titre: 'Cage d\'écureuil',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'En cercle, 1 élève au centre tente de toucher les autres. Ceux-ci doivent esquiver sans quitter le cercle délimité par les cônes. Rayon du cercle: 3 m. Travailler les appuis latéraux, les esquives de corps, le regard sur l\'adversaire. Changer le chasseur toutes les 30 secondes.',
            materiel: ['Cônes pour délimiter le cercle'],
            competence: 'Locomotion',
            variantes: 'Cercle plus petit, 2 chasseurs, porter un ballon tout en esquivant.',
            adaptation: 'Cercle plus grand, ralentissement du chasseur, zone d\'immunité.',
            tags: ['esquive', 'agilité', 'réaction', 'jeu']
          },
          {
            titre: 'Slalom agilité chronométré',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 18,
            desc: 'Slalom de 8 cônes espacés de 1 m. Chronométrer l\'aller-retour. Travailler les appuis extérieurs (pas croisés), les changements de direction rapides, le centre de gravité bas. Comparer avec soi-même sur 3 semaines. Ajouter des variantes: latéral, reculons, avec ballon.',
            materiel: ['8 cônes', 'Chronomètre'],
            competence: 'Locomotion',
            variantes: 'Slalom latéral (déplacements chassés), slalom avec balle, course à obstacles intercalés.',
            adaptation: 'Espacement plus large entre cônes, moins de cônes, pas de chronomètre.',
            tags: ['slalom', 'agilité', 'chronométrage', 'changement direction']
          }
        ]
      }
    ]
  },
  {
    section: '⚖️ Stabilisation et mobilité',
    categories: [
      {
        key: 'equilibre',
        emoji: '⚖️',
        name: 'Équilibre',
        desc: 'Statique, dynamique, sur matériel',
        count: '14+ éducatifs',
        educatifs: [
          {
            titre: 'Équilibre 1 pied – progression',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 10,
            desc: 'Tenir en équilibre sur 1 pied: 5 secondes yeux ouverts, puis 10 secondes, puis les yeux fermés. Alterner les deux pieds. Travailler la fixation du regard, la légère flexion du genou porteur, le gainage. Progresser jusqu\'à tenir 30 secondes les yeux fermés.',
            materiel: ['Espace dégagé'],
            competence: 'Stabilisation',
            variantes: 'Sur surface instable (demi-sphère), bras en différentes positions, attraper balle pendant équilibre.',
            adaptation: 'Tenir près d\'un mur pour appui sécuritaire. Réduire la durée. Oeil ouvert seulement.',
            tags: ['équilibre', 'unipodal', 'proprioception', 'yeux fermés']
          },
          {
            titre: 'Marche sur poutre basse',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'Traverser une poutre basse (20-30 cm de hauteur, 10 cm de largeur) en avant, puis en arrière, puis de côté. Bras tendus à l\'horizontal pour l\'équilibre. Regard fixé à l\'horizon (pas sur les pieds). Placer les pieds l\'un devant l\'autre en ligne droite.',
            materiel: ['Poutre basse de gym (20-30 cm)', 'Tapis de chaque côté'],
            competence: 'Stabilisation',
            variantes: 'Traversée avec objet tenu, traversée avec partenaire en face, traversée avec obstacles sur la poutre.',
            adaptation: 'Poutre encore plus basse (10 cm), ligne au sol à la place, tenir la main de l\'enseignant.',
            tags: ['poutre', 'équilibre', 'marche', 'précision']
          },
          {
            titre: 'Équilibre avec balle – stations',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: '4 stations d\'équilibre: 1) Tenir 20 sec sur 1 pied en lançant une balle en l\'air et rattrapant, 2) Marcher sur ligne en faisant rebondir une balle, 3) Balle sur la tête en marchant, 4) Lancer-attraper en duo sur 1 pied. Rotation toutes les 3 minutes.',
            materiel: ['Balles de tennis', 'Lignes au sol ou ruban adhésif'],
            competence: 'Stabilisation',
            variantes: 'Combiner 2 défis simultanément, yeux fermés, surface inclinée.',
            adaptation: 'Réduire la difficulté de chaque station. Autoriser 2 pieds pour certains défis.',
            tags: ['équilibre', 'ballon', 'stations', 'double tâche']
          },
          {
            titre: 'Parcours d\'équilibre',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 18,
            desc: 'Parcours en 6 étapes: poutre, demi-sphères, traversée de cerceaux, saut poutre, slalom en latéral, pose debout sur banc 5 sec. Chronométrer et progresser. Objectif: réaliser tout le parcours sans poser de main ou de pied hors de la surface prévue.',
            materiel: ['Poutre', 'Demi-sphères', 'Cerceaux', 'Bancs'],
            competence: 'Stabilisation',
            variantes: 'Yeux bandés sur la poutre avec guide verbal, parcours inversé, parcours en duo.',
            adaptation: 'Parcours avec plus d\'appuis disponibles, élargir les surfaces d\'équilibre.',
            tags: ['parcours', 'équilibre', 'circuit', 'progression']
          },
          {
            titre: 'Position de l\'oiseau',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 12,
            desc: 'L\'élève se tient sur 1 pied, buste incliné en avant à l\'horizontal, jambe libre tendue vers l\'arrière à l\'horizontal, bras tendus sur les côtés (comme des ailes d\'oiseau). Tenir 10 secondes, 20 secondes, 30 secondes. Alterner les pieds. Travailler le gainage de la hanche.',
            materiel: ['Espace dégagé'],
            competence: 'Stabilisation',
            variantes: 'Yeux fermés, sur surface instable, en mouvement lent, avec poids léger dans les mains.',
            adaptation: 'Se tenir près d\'un mur. Incliner moins le buste. Position simplifiée: 1 bras seulement.',
            tags: ['yoga', 'équilibre', 'oiseau', 'gainage']
          },
          {
            titre: 'Équilibre duo miroir',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 15,
            desc: 'En duo, l\'élève A crée une figure d\'équilibre et la tient 10 secondes, l\'élève B doit reproduire exactement en miroir simultanément. Puis inverser. Introduire des séquences de 3 figures. Travailler la communication non-verbale, l\'observation, et la précision corporelle.',
            materiel: ['Espace dégagé'],
            competence: 'Stabilisation',
            variantes: 'Miroir avec contact (main dans main), miroir en mouvement continu, miroir à 3.',
            adaptation: 'Figures plus simples, temps de tenue réduit, autoriser la communication verbale.',
            tags: ['duo', 'miroir', 'équilibre', 'communication']
          },
          {
            titre: 'Vélo d\'équilibre – transition',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 20,
            desc: 'Enchaîner des figures d\'équilibre avec transitions fluides: oiseau → araignée (4 appuis) → chandelle (jambes en l\'air) → pont → retour debout. Chaque position tenue 10 secondes. Travailler la fluidité de la transition, le gainage constant, la conscience spatiale.',
            materiel: ['Tapis de gym'],
            competence: 'Stabilisation',
            variantes: 'Transition en musique (lente), créer sa propre séquence de 5 figures, présenter au groupe.',
            adaptation: 'Choisir parmi 3 figures seulement. Aide à la transition. Positions plus simples.',
            tags: ['acrobatie', 'transitions', 'séquence', 'gainage']
          }
        ]
      },
      {
        key: 'souplesse',
        emoji: '🤸',
        name: 'Souplesse',
        desc: 'Étirements, yoga, stretch',
        count: '10+ éducatifs',
        educatifs: [
          {
            titre: 'Circuit yoga 5 postures',
            niveau: '2e cycle',
            difficulte: 'debutant',
            duree: 15,
            desc: 'Enchaîner 5 postures de yoga: Chien tête en bas (30 s), Guerrier I (20 s chaque côté), Enfant (30 s), Triangle (20 s chaque côté), Lotus ou Assis jambes croisées (30 s). Enseigner la respiration profonde et le relâchement progressif à chaque posture.',
            materiel: ['1 tapis de yoga par élève'],
            competence: 'Mobilité',
            variantes: 'Enchaîner en musique lente, salutation au soleil, créer sa propre séquence de 5.',
            adaptation: 'Postures modifiées avec supports (blocs, mur). Durée réduite. Poser un genou au sol.',
            tags: ['yoga', 'souplesse', 'respiration', 'relaxation']
          },
          {
            titre: 'Grand écart progressif',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 15,
            desc: 'Progression vers le grand écart frontal: fente basse (30 s chaque côté), fente avec appui arrière au sol (30 s), descente progressive vers le tapis (maintien 30-60 s). Ne jamais forcer: la douleur doit être absente. Progresser sur 6-8 semaines.',
            materiel: ['Tapis de gym'],
            competence: 'Mobilité',
            variantes: 'Grand écart latéral (plus difficile), progression avec proprioception, écart assisté.',
            adaptation: 'S\'arrêter bien avant la position finale. Utiliser des coussins. Travailler sur la durée.',
            tags: ['grand écart', 'souplesse', 'fente', 'progression']
          }
        ]
      },
      {
        key: 'gainage',
        emoji: '💪',
        name: 'Gainage et force',
        desc: 'Core, planche, pompes',
        count: '10+ éducatifs',
        educatifs: [
          {
            titre: 'Planche chronométrée',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 12,
            desc: 'Position planche (appui sur les avant-bras et les orteils), corps droit comme une planche, hanches ni trop hautes ni trop basses. Tenir 20 secondes, 30 secondes, puis progresser vers 60 secondes. Travailler l\'alignement tête-talons et la respiration continue.',
            materiel: ['Tapis de gym', 'Chronomètre'],
            competence: 'Force',
            variantes: 'Planche latérale, planche sur mains, planche avec lever d\'un membre, planche dynamique.',
            adaptation: 'Planche sur les genoux (réduire le levier). Durée de 10 secondes. Appui mural à 45°.',
            tags: ['planche', 'gainage', 'core', 'endurance musculaire']
          },
          {
            titre: 'Circuit core 4 stations',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 20,
            desc: '4 stations de 40 secondes, 20 secondes de repos: 1) Planche standard, 2) Croque-mitaines (crunches) avec rotation, 3) Pont fessier (sur le dos, hanches soulevées), 4) Superman (ventre, bras et jambes levés). 3 séries complètes. Enseigner la biomécanique correcte.',
            materiel: ['Tapis de gym', 'Chronomètre'],
            competence: 'Force',
            variantes: 'Ajouter résistance (élastique), varier les durées, ajouter planche latérale.',
            adaptation: 'Réduire à 20 secondes d\'effort, pauses plus longues, 2 séries seulement.',
            tags: ['core', 'circuit', 'gainage', 'force abdominale']
          }
        ]
      },
      {
        key: 'coordination',
        emoji: '🎯',
        name: 'Coordination',
        desc: 'Yeux-mains, rythmique, bilatérale',
        count: '10+ éducatifs',
        educatifs: [
          {
            titre: 'Tape-mains rythmique',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 10,
            desc: 'En duo face à face, séquence de tapes rythmiques: propres mains, mains croisées avec partenaire, tapes hautes, tapes basses. Commencer lentement, accélérer progressivement. Créer des séquences de 8 temps. Excellent pour la coordination bilatérale et le sens du rythme.',
            materiel: ['Aucun'],
            competence: 'Coordination',
            variantes: 'Séquences à 4 temps, 8 temps, créer sa propre séquence, jouer en musique.',
            adaptation: 'Séquences plus courtes, rythme plus lent, simplifier le patron.',
            tags: ['rythme', 'coordination', 'duo', 'tapes']
          },
          {
            titre: 'Sac de sable multipoints',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'L\'élève lance un sac de sable d\'une main à l\'autre: main à main, sous la jambe levée, dans le dos, derrière la tête. Débuter en statique, puis en marchant, puis en courant. Compter les réussites consécutives. Excellent pour la coordination segmentaire.',
            materiel: ['1 sac de sable (ou balle mousse) par élève'],
            competence: 'Coordination',
            variantes: '2 sacs de sable simultanés, sac sur différentes parties du corps, défis en duo.',
            adaptation: 'Sac plus gros, mouvements plus simples, rythme réduit.',
            tags: ['sac de sable', 'coordination', 'bilatéral', 'segmentaire']
          }
        ]
      }
    ]
  },
  {
    section: '⚽ Sports collectifs',
    categories: [
      {
        key: 'soccer',
        emoji: '⚽',
        name: 'Soccer',
        desc: 'Technique, tactique, mini-jeux',
        count: '10+ éducatifs',
        educatifs: [
          {
            titre: 'Passe à deux murs',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'L\'élève fait des passes contre le mur avec l\'intérieur du pied gauche, puis droit, en restant à 2-3 m. Chaque rebond = une passe. Compter les touches consécutives. Travailler la surface de frappe (intérieur du pied), le contrôle du ballon en retour.',
            materiel: ['1 ballon de soccer par élève', 'Mur'],
            competence: 'Manipulation',
            variantes: 'Augmenter la distance, passer alternant pied gauche-droit, passe avec cible sur le mur.',
            adaptation: 'Ballon plus gros et plus lent, distance réduite, cadre d\'exercice délimité.',
            tags: ['soccer', 'passe', 'technique', 'pied intérieur']
          },
          {
            titre: 'Mini-jeu 3v3 soccer',
            niveau: '3e cycle',
            difficulte: 'intermediaire',
            duree: 20,
            desc: 'Jeu 3v3 sur terrain de 15x20 m avec petits buts (cônes). Insister sur: 3 touches maximum par joueur, pressing collectif en perte de balle, communication vocale. Analyse tactique en pause-jeu: "comment sortir de la pression?" Rotation d\'équipes toutes les 5 min.',
            materiel: ['Ballon de soccer', 'Cônes pour buts et terrain', 'Dossards'],
            competence: 'Sport collectif',
            variantes: 'Buts bonus pour passes en 1 touche, zone interdite devant but, 3 passes obligatoires avant tir.',
            adaptation: 'Terrain plus grand, plus de touches autorisées, buts plus larges.',
            tags: ['soccer', 'collectif', 'tactique', 'mini-jeu']
          }
        ]
      },
      {
        key: 'basketball',
        emoji: '🏀',
        name: 'Basketball',
        desc: 'Dribble, tir, défense',
        count: '14+ éducatifs',
        educatifs: [
          {
            titre: 'Dribble sur place varié',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 10,
            desc: 'Dribble stationnaire avec le ballon de basketball: haut (poitrine), bas (30 cm du sol), alternance gauche-droite, dribble croisé devant. Série de 20 dribbles par hauteur. Enseigner les doigts écartés (pas la paume), le poignet souple, et regarder devant (pas le ballon).',
            materiel: ['1 ballon de basketball par élève'],
            competence: 'Manipulation',
            variantes: 'Dribble en marchant, dribble les yeux fermés, dribble sous la jambe.',
            adaptation: 'Ballon de taille 5 (plus petit), ballons dégonflés légèrement (rebond plus prévisible).',
            tags: ['basketball', 'dribble', 'technique', 'mains']
          },
          {
            titre: 'Dribble avancement en couloir',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'Dribble en avançant sur 20 m dans un couloir de 2 m de large. Aller main droite, retour main gauche. Travailler la hauteur de dribble (30-40 cm), le poignet vers l\'avant (pas vers le bas), les yeux devant. Ajouter des vitesses: marche, trot, course.',
            materiel: ['1 ballon par élève', 'Cônes délimitant couloir'],
            competence: 'Manipulation',
            variantes: 'Dribble avec changement de direction libre, dribble avec défenseur passif.',
            adaptation: 'Couloir plus large, autoriser balle tenue entre dribbles, distance réduite.',
            tags: ['basketball', 'dribble', 'avancement', 'mains']
          },
          {
            titre: 'Tir à l\'arrêt – technique',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'Tir en suspension depuis différentes zones (droite, gauche, face). Enseigner le BEEF: Balance (pieds écartés largeur épaules), Elbow (coude sous le ballon), Eyes (yeux sur la cible), Follow-through (main en avant, doigts pointés vers le bas). 50 tirs par session.',
            materiel: ['Paniers de basketball', '2-3 ballons par panier'],
            competence: 'Manipulation',
            variantes: 'Défi de pourcentage, compétition d\'équipe 21, tir en mouvement.',
            adaptation: 'Panier abaissé, distance réduite, ballon plus petit.',
            tags: ['basketball', 'tir', 'technique', 'BEEF']
          },
          {
            titre: 'Passe-et-va basketball',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'En trio, A passe à B et se déplace vers la droite, B passe à C et se déplace vers la gauche, C passe à A en avancement. Aller jusqu\'au panier et tirer. Retour en sens inverse. Travailler la passe de poitrine, la passe de rebond, la prise de décision.',
            materiel: ['1 ballon par trio', 'Panneau de basketball'],
            competence: 'Manipulation',
            variantes: 'Passe au-dessus de défenseur passif, limiter à un type de passe, accélérer le rythme.',
            adaptation: 'Duo seulement (A-B), moins de déplacement, signaux visuels pour la passe.',
            tags: ['basketball', 'passe', 'déplacement', 'trio']
          },
          {
            titre: 'Layup simplifié',
            niveau: '3e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'Approche du panier à 45°, 2 derniers pas rythmés (pied gauche-droit pour main droite), impulsion sur pied gauche, main droite lève le ballon vers le panneau. Utiliser le panneau (carré orangé) pour viser. Répéter 20 fois de chaque côté.',
            materiel: ['Paniers de basketball', '2 ballons par panier'],
            competence: 'Manipulation',
            variantes: 'Layup après dribble, layup avec passe de partenaire, layup défendu.',
            adaptation: 'Panier abaissé, marcher les 2 derniers pas lentement, enlever le dribble.',
            tags: ['basketball', 'layup', 'technique', 'rythme']
          },
          {
            titre: 'Défense glissée 1v1',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 15,
            desc: 'L\'élève défenseur doit maintenir une position de défense basse (genoux fléchis, pieds écartés) et se déplacer en glissé (shuffles) pour bloquer l\'avancée de l\'attaquant. Zone de jeu délimitée. L\'attaquant ne dribble que lentement. Travailler la position, les appuis, et l\'anticipation.',
            materiel: ['Ballon', 'Cônes délimitant zone'],
            competence: 'Sport collectif',
            variantes: 'Défense avec pick-and-roll, défense zone 2-3, défense sur tir.',
            adaptation: 'Attaquant très lent, zone plus grande, défense passive sans contester.',
            tags: ['basketball', 'défense', 'glissé', 'positionnement']
          },
          {
            titre: 'Mini-jeu 3v3 basketball',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 20,
            desc: 'Jeu 3v3 plein terrain réduit. Règles: 3 secondes en zone, violation de marcher, faute. Arrêt jeu pour enseigner: positionnement offensif (triangle), aide défensive, communication. Analyser une séquence: "comment créer un espace pour tirer?" Tournoiement régulier.',
            materiel: ['Terrain de basketball', 'Ballon', 'Dossards'],
            competence: 'Sport collectif',
            variantes: 'Décompte de passes avant tir, zone interdite, possession comptée.',
            adaptation: 'Terrain plus petit, règles simplifiées, aide de l\'enseignant en jeu.',
            tags: ['basketball', 'mini-jeu', '3v3', 'tactique']
          }
        ]
      },
      {
        key: 'volleyball',
        emoji: '🏐',
        name: 'Volleyball',
        desc: 'Manchette, service, passe',
        count: '14+ éducatifs',
        educatifs: [
          {
            titre: 'Manchette contre le mur',
            niveau: '2e cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'Frapper le ballon avec les avant-bras joints contre le mur. Tenir les bras jointifs (pouce sur pouce), coudes tendus, frapper sous le ballon. Objectif: 10 touches consécutives. Travailler la surface de frappe plate (plat de l\'avant-bras), la légère flexion des genoux.',
            materiel: ['1 ballon de volleyball par élève', 'Mur'],
            competence: 'Manipulation',
            variantes: 'Manchette seul en l\'air, manchette en duo, manchette sur zone cible.',
            adaptation: 'Ballon de plage (plus mou et plus lent), frapper plus haut sur le mur, commencer par retenir la position des bras.',
            tags: ['volleyball', 'manchette', 'avant-bras', 'technique']
          },
          {
            titre: 'Service par en dessous',
            niveau: '2e cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'Service par en dessous: tenir le ballon de la main non dominante (à hauteur hanche), frapper avec la paume de la main dominante en un coup de pendule. Objectif: passer par-dessus le filet. Distance progressive: 5 m, 7 m, 9 m. Enseigner le contact sous le centre du ballon.',
            materiel: ['Ballons de volleyball', 'Filet ou corde à 2,24 m'],
            competence: 'Manipulation',
            variantes: 'Service avec élan, viser des zones, service depuis la ligne de fond.',
            adaptation: 'Servir plus proche du filet, filet plus bas, ballon de plage.',
            tags: ['volleyball', 'service', 'technique', 'débutant']
          },
          {
            titre: 'Passe haute en duo',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'En duo, passe haute (manchon/passe) face à face à 3-4 m. Les mains en triangle (pouces et index forment un triangle), pousser le ballon vers le haut et l\'avant en étendant les bras et les jambes. Objectif: 20 échanges consécutifs. Travailler la trajectoire haute.',
            materiel: ['1 ballon par duo'],
            competence: 'Manipulation',
            variantes: 'Passe sur soi puis au partenaire, passe en déplacement, passe en triangle à 3.',
            adaptation: 'Ballon de plage, distance réduite, ballon lancé par-dessus avant passe.',
            tags: ['volleyball', 'passe', 'technique', 'duo']
          },
          {
            titre: 'Échange manchette duo',
            niveau: '3e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'En duo, maintenir un échange de manchettes le plus longtemps possible. L\'un lance proprement, l\'autre manchette, l\'un manchette en retour. Travailler le positionnement par rapport au ballon (se placer SOUS le ballon), la hauteur de manchette (minimum 3 m), la direction.',
            materiel: ['1 ballon par duo'],
            competence: 'Manipulation',
            variantes: 'Échange manchette-passe alternés, échange à 3, échange avec déplacement imposé.',
            adaptation: 'Ballon de plage, autoriser rebond entre les manchettes, distance réduite.',
            tags: ['volleyball', 'manchette', 'échange', 'duo']
          },
          {
            titre: 'Service par-dessus filet',
            niveau: '3e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'Service par en haut (tennis): lancer le ballon à 50 cm au-dessus de la tête, frapper en extension complète avec la paume ouverte. Progression: de 5 m, puis 7 m, puis ligne de fond (9 m). Enseigner le lancer régulier et l\'armé du bras. Viser des zones adverses.',
            materiel: ['Ballons de volleyball', 'Filet ou corde'],
            competence: 'Manipulation',
            variantes: 'Service flottant (poignet fixe), service lifté, viser coins du terrain.',
            adaptation: 'Service de dessous d\'abord. Filet plus bas. Ballon plus lent (plage).',
            tags: ['volleyball', 'service', 'par-dessus', 'puissance']
          },
          {
            titre: 'Défense et relance',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 18,
            desc: 'L\'enseignant lance le ballon au-dessus du filet vers différentes zones. L\'élève doit: lire la trajectoire, se positionner, manchetter vers la zone du passeur (zone 2-3). Travail sur la communication (appel du ballon), le déplacement réactif, et la précision de manchette.',
            materiel: ['5-6 ballons de volleyball', 'Filet'],
            competence: 'Sport collectif',
            variantes: 'Défense en trio (réception-passe-attaque), défense avec bloqueur, défense en jeu libre.',
            adaptation: 'Lancer plus prévisible et droit, zone cible plus grande, manchette sans exigence de direction.',
            tags: ['volleyball', 'défense', 'réception', 'collectif']
          },
          {
            titre: 'Mini-jeu 3v3 volleyball',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 20,
            desc: 'Jeu 3v3 sur terrain réduit (6x6 m), 3 touches obligatoires (réception-passe-attaque). Rotation après chaque point. Analyser: positionnement en W en défense, appel du ballon, communication. Arrêt jeu pour analyser les erreurs tactiques avec l\'équipe.',
            materiel: ['Terrain de volleyball', 'Filet', 'Ballons', 'Dossards'],
            competence: 'Sport collectif',
            variantes: 'Terrain plus grand, 6v6, règle: service alternés, attaque en zone seulement.',
            adaptation: 'Terrain plus petit, moins de règles, filet plus bas, ballon de plage.',
            tags: ['volleyball', 'mini-jeu', '3v3', 'tactique']
          }
        ]
      },
      {
        key: 'handball',
        emoji: '🤾',
        name: 'Handball',
        desc: 'Lancer, démarquage, tir',
        count: '10+ éducatifs',
        educatifs: [
          {
            titre: 'Tir précision handball',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'Tirs depuis 5 m vers des zones numérotées dans un but (4 coins + centre = 5 zones). 3 essais par zone, l\'enseignant annonce la zone avant le tir. Travailler l\'armé du bras (bras en arrière, coude haut), la rotation des épaules, le suivi du bras vers la cible.',
            materiel: ['Ballons de handball', 'But de handball (ou cônes)', 'Dossards de couleur pour zones'],
            competence: 'Manipulation',
            variantes: 'Tir en saut, tir en courant, tir sur passe de partenaire.',
            adaptation: 'Distance réduite à 3 m, zones plus grandes, tirer sans gardien.',
            tags: ['handball', 'tir', 'précision', 'zone']
          },
          {
            titre: 'Démarquage 2v1',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 18,
            desc: '2 attaquants contre 1 défenseur sur demi-terrain. Les attaquants doivent créer une situation de tir. Enseigner: l\'écran (poser le corps entre défenseur et partenaire), la passe feintée, la taille de balle. Le défenseur tente de récupérer ou de bloquer le tir.',
            materiel: ['Ballon de handball', 'Demi-terrain délimité', 'But'],
            competence: 'Sport collectif',
            variantes: '3v2, 2v2, démarquage avec contrainte de zone.',
            adaptation: 'Défenseur passif au début, espace plus grand, plus de temps accordé.',
            tags: ['handball', 'démarquage', 'surnombre', 'tactique']
          }
        ]
      }
    ]
  },
  {
    section: '💃 Arts corporels',
    categories: [
      {
        key: 'danse',
        emoji: '💃',
        name: 'Danse et rythme',
        desc: 'Jazz, hip-hop, contemporain',
        count: '14+ éducatifs',
        educatifs: [
          {
            titre: 'Rythme corporel percussions',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'Créer des rythmes en frappant différentes parties du corps: genoux, cuisses, mains, poitrine. Commencer par 4 temps simples (frappe-frappe-clap-stomp), puis variations. Travailler l\'écoute rythmique, la synchronisation du groupe, et la créativité sonore.',
            materiel: ['Aucun (ou musique de fond)'],
            competence: 'Expression',
            variantes: 'Rythmes en écho (enseignant crée, élèves répètent), rythmes en canon, improvisation.',
            adaptation: 'Rythmes plus lents, moins de parties du corps, guider chaque geste verbalement.',
            tags: ['rythme', 'percussions', 'corps', 'écoute']
          },
          {
            titre: 'Séquence 8 temps hip-hop',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'Apprendre une séquence de 8 temps hip-hop: pas en avant, pas en arrière, bras en isolation (chest pop), step touché, clap. Enseigner par imitation face miroir. Répéter jusqu\'à mémorisation. Ajouter l\'expressivité (regard, attitude). Introduire le concept de downbeat.',
            materiel: ['Musique hip-hop avec tempo clair (80-90 BPM)'],
            competence: 'Expression',
            variantes: 'Créer la suite (8 temps supplémentaires), enseigner à un partenaire, danser en ligne.',
            adaptation: 'Rythme plus lent, moins de pas à la fois, version simplifiée sans isolation de bras.',
            tags: ['hip-hop', 'séquence', '8 temps', 'imitation']
          },
          {
            titre: 'Danse miroir en duo',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'En duo face à face, un élève improvise des mouvements en musique et l\'autre les reproduit en miroir simultanément. Échange de rôles toutes les 30 secondes. Travailler la fluidité de l\'improvisation, la lecture du partenaire, la lenteur délibérée pour faciliter la copie.',
            materiel: ['Musique instrumentale lente à modérée'],
            competence: 'Expression',
            variantes: 'Miroir en groupe (1 meneur → tous suivent), miroir en contact (main dans main), miroir en déplacement.',
            adaptation: 'Mouvements uniquement du haut du corps. Tempo plus lent. Échange plus fréquent.',
            tags: ['miroir', 'improvisation', 'duo', 'danse']
          },
          {
            titre: 'Hip-hop basics: groove',
            niveau: '3e cycle',
            difficulte: 'intermediaire',
            duree: 18,
            desc: 'Maîtriser le groove de base: genou fléchi sur le downbeat (temps 1 et 3), hanches légèrement mobiles, buste stable, bras naturels. Ajouter des variations de bras: roll out, bounce, chest pop. Travailler devant un miroir. Le groove est la fondation de toute danse hip-hop.',
            materiel: ['Miroir de gym', 'Musique hip-hop 90-100 BPM'],
            competence: 'Expression',
            variantes: 'Groove avec déplacement (avant, arrière, côté), groove avec partenaire, groove avec micro-chorégraphie.',
            adaptation: 'Se concentrer sur le balancement des genoux seulement. Tempo réduit. Debout contre le mur pour soutien.',
            tags: ['hip-hop', 'groove', 'technique', 'rythme']
          },
          {
            titre: 'Expression libre thématique',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'L\'enseignant annonce un thème (eau, feu, vent, robot, animal). L\'élève explore le mouvement librement pendant 2 min. Pas de "bonne réponse". Encourager l\'exagération, la variété d\'espaces (haut/bas/milieu), les niveaux. Partage en duo ou devant le groupe.',
            materiel: ['Musique variée selon les thèmes'],
            competence: 'Expression',
            variantes: 'Thèmes émotionnels (joie, colère, tristesse), thèmes sportifs (natation dans l\'air, course au ralenti).',
            adaptation: 'Proposer 3-4 mouvements de départ pour chaque thème. Travailler en duo.',
            tags: ['expression', 'improvisation', 'thème', 'créativité']
          },
          {
            titre: 'Chorégraphie duo 16 temps',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 20,
            desc: 'En duo, créer une chorégraphie de 16 temps avec: au moins 3 niveaux (bas, moyen, haut), un moment synchronisé, un moment en canon (décalé), une interaction entre les deux partenaires. Présenter au groupe. Évaluation par pairs sur critères: clarté, originalité, expression.',
            materiel: ['Musique de leur choix ou propositions variées'],
            competence: 'Expression',
            variantes: 'Chorégraphie à 4 (2 duos), intégrer un accessoire (foulard, chapeau), chorégraphier sur un son connu.',
            adaptation: 'Réduire à 8 temps, fournir une structure imposée, niveaux moins contraignants.',
            tags: ['chorégraphie', 'duo', 'création', 'performance']
          },
          {
            titre: 'Création en groupe – flash mob',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 30,
            desc: 'Groupe de 6-8 élèves crée une chorégraphie de 32 temps sur une chanson populaire. Processus: 1) choisir 4 séquences de 8 temps, 2) les enchaîner, 3) ajouter formation (lignes, cercle, V), 4) répéter et polir. Présentation à la classe avec rituel de départ. Développe le leadership et la collaboration.',
            materiel: ['Musique choisie par le groupe', 'Espace de répétition'],
            competence: 'Expression',
            variantes: 'Flash mob surprise dans la cafétéria, vidéo-partage, concours de groupes.',
            adaptation: 'Groupe plus petit, chorégraphie plus courte, rôle de répétiteur pour l\'enseignant.',
            tags: ['groupe', 'chorégraphie', 'création', 'flash mob']
          }
        ]
      },
      {
        key: 'acrosport',
        emoji: '🤸',
        name: 'Acrosport',
        desc: 'Pyramides, portés, équilibre duo',
        count: '14+ éducatifs',
        educatifs: [
          {
            titre: 'Position de base acrosport',
            niveau: '2e cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'Apprendre les 2 rôles fondamentaux: porteur (stable, musculature active, centre de gravité bas) et voltigeur (corps gainé, jambes tendues, léger et compact). Exercer les positions de base: carré (4 appuis), planche (sur dos du partenaire). Sécurité = priorité: communication constante.',
            materiel: ['Tapis de gym épais'],
            competence: 'Acrosport',
            variantes: 'Varier les formes du porteur, varier les positions du voltigeur.',
            adaptation: 'Commencer par porter uniquement les jambes, commencer contre le mur.',
            tags: ['acrosport', 'porteur', 'voltigeur', 'sécurité']
          },
          {
            titre: 'Planche duo sur les genoux',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'Le porteur est à 4 pattes (dos plat comme une table). Le voltigeur monte sur son dos et maintient la position planche (corps gainé, bras tendus sur les épaules du porteur, pieds sur les hanches du porteur). Tenir 10-15 secondes. Descente contrôlée par l\'arrière.',
            materiel: ['Tapis de gym épais (5 cm min)'],
            competence: 'Acrosport',
            variantes: 'Lever un bras ou une jambe, tenir un objet en équilibre, tenue plus longue.',
            adaptation: 'Porteur appuyé sur les coudes (position plus basse), temps de tenue réduit.',
            tags: ['acrosport', 'planche', 'duo', 'gainage']
          },
          {
            titre: 'Pyramide à 3 – base',
            niveau: '3e cycle',
            difficulte: 'intermediaire',
            duree: 18,
            desc: 'Trio: 2 porteurs à 4 pattes côte à côte, 1 voltigeur monte sur les deux (mains sur épaules du porteur 1, pieds sur fesses du porteur 2). Figure finale: position debout équilibrée sur les deux porteurs. Enseigner la montée en 3 étapes, les signaux verbaux ("prêt?", "monte", "tiens"), et la descente.',
            materiel: ['Tapis épais', 'Espace dégagé'],
            competence: 'Acrosport',
            variantes: 'Différentes figures du voltigeur (squat, pointe), pyramide à 4, ajout d\'estrade.',
            adaptation: 'Pyramide plus basse, aide de l\'enseignant pour la montée, signal d\'urgence établi.',
            tags: ['acrosport', 'pyramide', 'trio', 'coordination']
          },
          {
            titre: 'Portée basique jambes',
            niveau: '3e cycle',
            difficulte: 'intermediaire',
            duree: 18,
            desc: 'Le porteur est allongé sur le dos, jambes à la vertical (90°). Le voltigeur s\'appuie sur les pieds du porteur (au niveau du ventre), maintient l\'équilibre vertical avec bras tendus. Travailler la symétrie, l\'alignement du voltigeur, et la stabilité du porteur.',
            materiel: ['Tapis épais de gym'],
            competence: 'Acrosport',
            variantes: 'Voltigeur en position de planche (horizontal), en écart, tenir un seul bras.',
            adaptation: 'Porteur appuie au niveau des hanches (plus stable), aide de 2 observateurs latéraux.',
            tags: ['acrosport', 'portée', 'jambes', 'équilibre']
          },
          {
            titre: 'Figure inversée assistée',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 20,
            desc: 'Le voltigeur fait une chandelle (appui sur les mains, jambes vers le haut) avec aide de 2 pareurs. Le porteur tient les pieds. Enseigner d\'abord la chandelle contre le mur (sans aide). Progresser vers la chandelle libre puis aidée. Chaque position tenue 10 secondes.',
            materiel: ['Tapis épais', '2 pareurs par groupe'],
            competence: 'Acrosport',
            variantes: 'Chandelle en mouvement, avec dislocation, en duo synchronisé.',
            adaptation: 'Chandelle contre le mur uniquement, appui sur avant-bras (plus stable).',
            tags: ['acrosport', 'chandelle', 'inversé', 'pareurs']
          },
          {
            titre: 'Transition fluide figure A → B',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 20,
            desc: 'En duo ou trio, passer d\'une figure à une autre en continu sans toucher le sol (ou avec maximum 1 étape de transition). Exemple: planche sur dos → portée jambes → pyramide debout. Travailler la communication, la fluidité, et la créativité dans les transitions.',
            materiel: ['Tapis épais'],
            competence: 'Acrosport',
            variantes: 'Séquence de 4 figures en musique, transition avec 3/4 tour, transition avec accessoire.',
            adaptation: 'Transition avec une étape de repos entre les figures, figures plus simples.',
            tags: ['acrosport', 'transition', 'séquence', 'fluidité']
          },
          {
            titre: 'Performance acrosport – présentation',
            niveau: '3e cycle',
            difficulte: 'avance',
            duree: 30,
            desc: 'Groupe de 4-6 élèves prépare une performance acrosport de 60-90 secondes: 3 figures imposées + 1 libre + transitions + entrée et sortie en danse. Musique choisie. Présentation à la classe avec critères évaluation: forme des figures, fluidité, synchronisation, expressivité.',
            materiel: ['Tapis de gym', 'Musique choisie'],
            competence: 'Acrosport',
            variantes: 'Intégrer éléments danse, costumes, thème, jeu de lumière.',
            adaptation: 'Groupe plus petit, moins de figures, critères simplifiés, enseignant comme pareur.',
            tags: ['acrosport', 'performance', 'groupe', 'évaluation']
          }
        ]
      },
      {
        key: 'expression',
        emoji: '🎭',
        name: 'Expression corporelle',
        desc: 'Mime, théâtre corporel',
        count: '8+ éducatifs',
        educatifs: [
          {
            titre: 'Mime sport quotidien',
            niveau: '1er cycle',
            difficulte: 'debutant',
            duree: 12,
            desc: 'L\'élève mime un geste sportif ou de la vie quotidienne (brosser les dents, lancer une balle, nager) sans parler. Les autres devinent. Travailler l\'exagération des gestes, la clarté de l\'action, et l\'expression du visage. Commencer par des actions très connues.',
            materiel: ['Cartes-images des actions à mimer (optionnel)'],
            competence: 'Expression',
            variantes: 'Mime en équipes (charades), mimer une émotion, mimer un environnement.',
            adaptation: 'Fournir la liste des actions. Travailler en duo pour le mime.',
            tags: ['mime', 'expression', 'communication', 'geste']
          },
          {
            titre: 'Sculpture humaine',
            niveau: '2e cycle',
            difficulte: 'intermediaire',
            duree: 15,
            desc: 'En duo, un élève est le "sculpteur" et l\'autre est la "glaise" (passive). Le sculpteur guide doucement les membres pour créer une sculpture exprimant un mot (joie, force, tristesse, liberté). Tenir la pose 30 secondes. Inverser les rôles. Commenter les choix créatifs.',
            materiel: ['Aucun'],
            competence: 'Expression',
            variantes: 'Sculpter avec un thème imposé, sculpter en trio (2 sculpteurs), galerie de sculptures.',
            adaptation: 'Mots concrets (sport, animal) plutôt qu\'abstraits. Sculpteur utilise la parole au lieu du toucher.',
            tags: ['sculpture', 'expression', 'duo', 'créativité']
          }
        ]
      }
    ]
  }
];

// ─────────────────────────────────────────────────────
// ÉTAT DE L'APPLICATION
// ─────────────────────────────────────────────────────
let currentCategory = null;
let currentEducatifs = [];
let filtered = [];

// ─────────────────────────────────────────────────────
// INITIALISATION
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  renderTaxonomy();
  updateTotalCount();
  setTimeout(hideLoading, 900);
});

function hideLoading() {
  const screen = document.getElementById('loading-screen');
  if (screen) screen.classList.add('hidden');
}

function updateTotalCount() {
  let total = 0;
  TAXONOMY.forEach(section => {
    section.categories.forEach(cat => {
      total += cat.educatifs.length;
    });
  });
  const el = document.getElementById('stat-total');
  if (el) el.textContent = total + '+';
}

// ─────────────────────────────────────────────────────
// TAXONOMIE — RENDU
// ─────────────────────────────────────────────────────
function renderTaxonomy() {
  const container = document.getElementById('taxonomy-container');
  if (!container) return;

  container.innerHTML = '';

  TAXONOMY.forEach(section => {
    // Titre de section
    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'taxonomy-section-title';
    sectionTitle.textContent = section.section;
    container.appendChild(sectionTitle);

    // Grille de tuiles
    const grid = document.createElement('div');
    grid.className = 'taxonomy-grid';

    section.categories.forEach(cat => {
      const tile = createTaxonomyTile(cat);
      grid.appendChild(tile);
    });

    container.appendChild(grid);
  });
}

function createTaxonomyTile(cat) {
  const tile = document.createElement('div');
  tile.className = 'taxonomy-tile';
  tile.setAttribute('data-key', cat.key);
  tile.innerHTML = `
    <div class="tile-emoji">${cat.emoji}</div>
    <div class="tile-name">${cat.name}</div>
    <div class="tile-desc">${cat.desc}</div>
    <div class="tile-count">${cat.educatifs.length} éducatifs</div>
  `;
  tile.addEventListener('click', () => selectCategory(cat.key));
  return tile;
}

// ─────────────────────────────────────────────────────
// SÉLECTION DE CATÉGORIE
// ─────────────────────────────────────────────────────
function selectCategory(key) {
  // Trouver la catégorie dans TAXONOMY
  let foundCat = null;
  for (const section of TAXONOMY) {
    for (const cat of section.categories) {
      if (cat.key === key) {
        foundCat = cat;
        break;
      }
    }
    if (foundCat) break;
  }
  if (!foundCat) return;

  currentCategory = foundCat;
  currentEducatifs = foundCat.educatifs;
  filtered = [...currentEducatifs];

  // Masquer la taxonomie
  document.getElementById('taxonomy-container').classList.add('hidden');

  // Afficher la barre de contrôles
  document.getElementById('controls-bar').classList.remove('hidden');

  // Afficher la section éducatifs
  document.getElementById('edu-section').classList.remove('hidden');

  // Rendre l'en-tête de catégorie
  renderCategoryHeader(foundCat);

  // Réinitialiser les filtres
  document.getElementById('filter-niveau').value = '';
  document.getElementById('filter-diff').value = '';

  // Rendre les éducatifs
  renderEducatifs(filtered);

  // Mettre à jour le compteur
  updateFilterCount();

  // Scroll vers la section
  setTimeout(() => {
    document.getElementById('taxonomy-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

function renderCategoryHeader(cat) {
  const header = document.getElementById('category-header');
  header.innerHTML = `
    <div class="cat-header-emoji">${cat.emoji}</div>
    <div class="cat-header-info">
      <h2>${cat.name}</h2>
      <p>${cat.desc} · ${cat.educatifs.length} éducatifs disponibles</p>
    </div>
  `;
}

// ─────────────────────────────────────────────────────
// RETOUR À LA TAXONOMIE
// ─────────────────────────────────────────────────────
function goBack() {
  currentCategory = null;
  currentEducatifs = [];
  filtered = [];

  // Masquer éducatifs
  document.getElementById('edu-section').classList.add('hidden');
  document.getElementById('controls-bar').classList.add('hidden');

  // Afficher la taxonomie
  document.getElementById('taxonomy-container').classList.remove('hidden');

  // Vider la grille
  document.getElementById('edu-grid').innerHTML = '';
  document.getElementById('category-header').innerHTML = '';

  // Scroll vers le haut
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─────────────────────────────────────────────────────
// FILTRES
// ─────────────────────────────────────────────────────
function applyFilters() {
  const niveau = document.getElementById('filter-niveau').value.toLowerCase();
  const diff = document.getElementById('filter-diff').value.toLowerCase();

  filtered = currentEducatifs.filter(edu => {
    const matchNiveau = !niveau || edu.niveau.toLowerCase().includes(niveau);
    const matchDiff = !diff || edu.difficulte === diff;
    return matchNiveau && matchDiff;
  });

  renderEducatifs(filtered);
  updateFilterCount();
}

function updateFilterCount() {
  const el = document.getElementById('filter-count');
  if (el) {
    el.innerHTML = `<strong>${filtered.length}</strong> éducatif${filtered.length > 1 ? 's' : ''}`;
  }
}

// ─────────────────────────────────────────────────────
// RENDU DES ÉDUCATIFS
// ─────────────────────────────────────────────────────
function renderEducatifs(list) {
  const grid = document.getElementById('edu-grid');
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <p>Aucun éducatif ne correspond aux filtres sélectionnés.</p>
      </div>
    `;
    return;
  }

  list.forEach((edu, index) => {
    const card = createEducatifCard(edu, index);
    grid.appendChild(card);
  });
}

function createEducatifCard(edu, index) {
  const card = document.createElement('div');
  card.className = 'edu-card';
  card.style.animationDelay = `${index * 0.04}s`;

  const diffLabel = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé' };
  const diffEmoji = { debutant: '🟢', intermediaire: '🟠', avance: '🔴' };

  card.innerHTML = `
    <div class="edu-card-header">
      <div class="edu-card-title">${edu.titre}</div>
    </div>
    <p class="edu-card-desc">${edu.desc}</p>
    <div class="edu-card-meta">
      <span class="badge badge-${edu.difficulte}">${diffEmoji[edu.difficulte]} ${diffLabel[edu.difficulte]}</span>
      <span class="badge badge-niveau">${edu.niveau}</span>
    </div>
    <div class="edu-card-footer">
      <span class="footer-duration">⏱ ${edu.duree} min</span>
      <span class="footer-competence">${edu.competence}</span>
      <span class="footer-arrow">→</span>
    </div>
  `;

  card.addEventListener('click', () => openModal(edu));
  return card;
}

// ─────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────
function openModal(edu) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  const diffLabel = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé' };
  const diffEmoji = { debutant: '🟢', intermediaire: '🟠', avance: '🔴' };

  const materielHtml = edu.materiel
    ? edu.materiel.map(m => `<span class="material-tag">${m}</span>`).join('')
    : '';

  const tagsHtml = edu.tags
    ? edu.tags.map(t => `<span class="tag">#${t}</span>`).join('')
    : '';

  content.innerHTML = `
    <div class="modal-header">
      <span class="modal-emoji">${currentCategory ? currentCategory.emoji : '🏋️'}</span>
      <h2 class="modal-title">${edu.titre}</h2>
      <div class="modal-badges">
        <span class="badge badge-${edu.difficulte}">${diffEmoji[edu.difficulte]} ${diffLabel[edu.difficulte]}</span>
        <span class="badge badge-niveau">${edu.niveau}</span>
      </div>
    </div>

    <div class="modal-meta-grid">
      <div class="meta-item">
        <div class="meta-item-label">Durée</div>
        <div class="meta-item-value">⏱ ${edu.duree} minutes</div>
      </div>
      <div class="meta-item">
        <div class="meta-item-label">Compétence</div>
        <div class="meta-item-value">${edu.competence}</div>
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-label">Description pédagogique</div>
      <p class="modal-desc">${edu.desc}</p>
    </div>

    ${edu.materiel && edu.materiel.length > 0 ? `
    <div class="modal-section">
      <div class="modal-section-label">Matériel requis</div>
      <div class="modal-material">${materielHtml}</div>
    </div>
    ` : ''}

    ${edu.variantes ? `
    <div class="modal-section">
      <div class="modal-section-label">Variantes et progressions</div>
      <p class="modal-desc">${edu.variantes}</p>
    </div>
    ` : ''}

    ${edu.adaptation ? `
    <div class="modal-section">
      <div class="modal-section-label">Adaptations et différenciation</div>
      <p class="modal-desc">${edu.adaptation}</p>
    </div>
    ` : ''}

    ${tagsHtml ? `
    <div class="modal-divider"></div>
    <div class="modal-section">
      <div class="modal-tags">${tagsHtml}</div>
    </div>
    ` : ''}
  `;

  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(event) {
  if (event && event.target !== document.getElementById('modal-overlay') && event.type === 'click') {
    // Clic à l'intérieur du modal card — ne pas fermer
    if (event.target.closest('#modal-card')) return;
  }
  document.getElementById('modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

// Fermer avec Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ─────────────────────────────────────────────────────
// CANVAS — PARTICULES DE FEU
// ─────────────────────────────────────────────────────
function initCanvas() {
  const canvas = document.getElementById('fire-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 40;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
      this.hue = Math.random() * 30 + 10; // orange → jaune
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if (this.life >= this.maxLife) this.reset();
    }

    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.4;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 100%, 65%, ${alpha})`;
      ctx.fill();
    }
  }

  // Créer 60 particules
  for (let i = 0; i < 60; i++) {
    const p = new Particle();
    p.life = Math.random() * p.maxLife; // Démarrer à des positions variées
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animId = requestAnimationFrame(animate);
  }

  animate();
}
