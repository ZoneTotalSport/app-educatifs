#!/usr/bin/env python3
"""
Ajoute un champ 'progression' à chaque éducatif avec 3 niveaux structurés.
Chaque niveau contient: titre, description, consignes, criteres_reussite
"""
import json, os, random, glob

random.seed(42)

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data', 'educatifs')

# Templates de progression par compétence
PROGRESSION_TEMPLATES = {
    "Coordination": {
        "niveau1": {
            "consignes": [
                "Exécuter les mouvements lentement, un à la fois",
                "Se concentrer sur un seul geste à la fois",
                "Utiliser des repères visuels au sol",
                "Faire des pauses entre chaque répétition",
                "Pratiquer sur place avant de se déplacer",
            ],
            "criteres": [
                "L'élève exécute le mouvement de base avec aide",
                "Le geste est réalisé lentement mais correctement",
                "L'élève maintient son équilibre pendant l'exercice",
            ],
        },
        "niveau2": {
            "consignes": [
                "Enchaîner deux mouvements de façon fluide",
                "Augmenter progressivement la vitesse d'exécution",
                "Ajouter un déplacement pendant l'exercice",
                "Introduire un partenaire pour la coordination",
                "Varier les hauteurs et les directions",
            ],
            "criteres": [
                "L'élève enchaîne les mouvements sans interruption",
                "La vitesse d'exécution est régulière",
                "L'élève s'adapte aux changements de rythme",
            ],
        },
        "niveau3": {
            "consignes": [
                "Combiner trois mouvements ou plus en séquence rapide",
                "Exécuter en situation de jeu ou avec opposition",
                "Créer ses propres enchaînements complexes",
                "Réagir à des signaux variés tout en maintenant la coordination",
                "Performer devant le groupe avec fluidité",
            ],
            "criteres": [
                "L'élève crée et exécute des séquences complexes",
                "Les mouvements sont fluides et automatisés",
                "L'élève s'adapte en temps réel aux contraintes",
            ],
        },
    },
    "Locomotion": {
        "niveau1": {
            "consignes": [
                "Se déplacer à vitesse lente dans un espace délimité",
                "Suivre des lignes au sol ou des repères visuels",
                "Pratiquer un seul type de déplacement à la fois",
                "Garder le contrôle de son corps en mouvement",
                "Respecter les limites de son espace",
            ],
            "criteres": [
                "L'élève se déplace de façon contrôlée",
                "Le patron moteur de base est reconnaissable",
                "L'élève freine et s'arrête sur commande",
            ],
        },
        "niveau2": {
            "consignes": [
                "Alterner entre deux types de déplacement",
                "Augmenter la vitesse tout en gardant le contrôle",
                "Se déplacer en changeant de direction sur signal",
                "Combiner déplacement et manipulation d'objet",
                "S'adapter au rythme d'un partenaire",
            ],
            "criteres": [
                "L'élève change de direction sans perte d'équilibre",
                "La transition entre les déplacements est fluide",
                "L'élève maintient sa vitesse dans les changements",
            ],
        },
        "niveau3": {
            "consignes": [
                "Combiner plusieurs types de déplacement en enchaînement",
                "Se déplacer en situation de jeu avec adversaire",
                "Réagir rapidement aux changements d'environnement",
                "Optimiser ses trajectoires pour l'efficacité",
                "Créer des feintes et des changements de rythme",
            ],
            "criteres": [
                "L'élève se déplace avec agilité et efficacité",
                "Les enchaînements sont fluides et rapides",
                "L'élève adapte ses déplacements à la situation de jeu",
            ],
        },
    },
}

# Template générique pour les compétences non listées
GENERIC_TEMPLATE = {
    "niveau1": {
        "consignes": [
            "Exécuter les mouvements de base lentement et avec contrôle",
            "Se concentrer sur la technique plutôt que la performance",
            "Utiliser du matériel adapté (plus léger, plus gros, plus lent)",
            "Pratiquer en situation simplifiée sans pression",
            "Observer une démonstration avant chaque essai",
        ],
        "criteres": [
            "L'élève comprend et respecte les consignes de base",
            "Le geste technique de base est reconnaissable",
            "L'élève participe activement et fait des efforts",
        ],
    },
    "niveau2": {
        "consignes": [
            "Augmenter progressivement la complexité de l'exercice",
            "Introduire des variantes avec partenaire ou en mouvement",
            "Réduire le temps de réflexion entre les actions",
            "Combiner deux habiletés dans un même exercice",
            "Ajouter des contraintes de temps ou d'espace",
        ],
        "criteres": [
            "L'élève exécute le geste avec régularité",
            "La technique est maîtrisée dans des situations variées",
            "L'élève s'ajuste aux consignes supplémentaires",
        ],
    },
    "niveau3": {
        "consignes": [
            "Exécuter en situation de jeu réelle ou compétitive",
            "Combiner plusieurs habiletés en séquence complexe",
            "Créer et proposer ses propres variantes avancées",
            "Aider un pair moins expérimenté comme tuteur",
            "S'auto-évaluer et identifier ses points d'amélioration",
        ],
        "criteres": [
            "L'élève maîtrise le geste dans des situations complexes",
            "L'exécution est fluide, précise et constante",
            "L'élève transfère ses apprentissages à de nouvelles situations",
        ],
    },
}

# Introductions contextuelles par niveau
INTRO_N1 = [
    "L'élève découvre l'activité et se familiarise avec les mouvements fondamentaux.",
    "À ce stade, l'objectif est d'apprivoiser l'exercice sans pression de performance.",
    "Le débutant explore les bases de l'activité avec un accompagnement soutenu.",
    "L'accent est mis sur la compréhension des consignes et la sécurité.",
]
INTRO_N2 = [
    "L'élève maîtrise les bases et cherche à améliorer sa constance et sa fluidité.",
    "À ce niveau, on ajoute de la complexité tout en consolidant les acquis.",
    "L'intermédiaire travaille la régularité et commence à combiner les habiletés.",
    "L'élève est capable d'exécuter l'activité de façon autonome avec quelques ajustements.",
]
INTRO_N3 = [
    "L'élève perfectionne sa technique et s'adapte à des situations complexes.",
    "À ce stade avancé, l'élève crée, innove et aide ses pairs.",
    "L'expert peut exécuter l'activité dans des contextes variés et exigeants.",
    "L'élève démontre une maîtrise complète et peut enseigner aux autres.",
]


def get_template(competence):
    """Retourne le template de progression le plus approprié."""
    comp_lower = competence.lower()
    for key in PROGRESSION_TEMPLATES:
        if key.lower() in comp_lower:
            return PROGRESSION_TEMPLATES[key]
    return GENERIC_TEMPLATE


def generate_progression(edu):
    """Génère un objet progression à 3 niveaux pour un éducatif."""
    template = get_template(edu.get("competence", ""))
    titre = edu.get("titre", "l'activité")

    # Sélectionner 3 consignes et 2 critères par niveau (pour varier)
    progression = {}
    for i, (niv_key, label, intros) in enumerate([
        ("niveau1", "Débutant", INTRO_N1),
        ("niveau2", "Intermédiaire", INTRO_N2),
        ("niveau3", "Avancé", INTRO_N3),
    ]):
        t = template[niv_key]
        consignes = random.sample(t["consignes"], min(3, len(t["consignes"])))
        criteres = random.sample(t["criteres"], min(2, len(t["criteres"])))
        intro = random.choice(intros)

        progression[niv_key] = {
            "titre": label,
            "description": f"{intro} Pour « {titre} », voici les attentes à ce niveau.",
            "consignes": consignes,
            "criteres_reussite": criteres,
        }

    return progression


def process_file(filepath):
    """Ajoute les progressions à tous les éducatifs d'un fichier JSON."""
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)

    count = 0
    for edu in data:
        if "progression" not in edu:
            edu["progression"] = generate_progression(edu)
            count += 1

    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    return count, len(data)


def main():
    json_files = sorted(glob.glob(os.path.join(DATA_DIR, '*.json')))
    json_files = [f for f in json_files if '_taxonomy' not in f]

    total_modified = 0
    total_edus = 0

    for filepath in json_files:
        fname = os.path.basename(filepath)
        modified, total = process_file(filepath)
        total_modified += modified
        total_edus += total
        print(f"  {fname}: {modified}/{total} modifiés")

    print(f"\n✅ TOTAL: {total_modified}/{total_edus} éducatifs enrichis avec progressions")

    # Vérification: afficher un exemple
    sample_file = json_files[0]
    with open(sample_file, 'r', encoding='utf-8') as f:
        sample = json.load(f)

    if sample and "progression" in sample[0]:
        print(f"\n📋 Exemple ({sample[0]['titre']}):")
        prog = sample[0]["progression"]
        for niv in ["niveau1", "niveau2", "niveau3"]:
            p = prog[niv]
            print(f"  {p['titre']}: {p['description'][:80]}...")
            print(f"    Consignes: {len(p['consignes'])}, Critères: {len(p['criteres_reussite'])}")


if __name__ == '__main__':
    main()
