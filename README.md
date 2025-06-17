# 🧠 ai-commenter

> Ajoute automatiquement des commentaires utiles et concis à tes fichiers JavaScript / TypeScript grâce à l'IA.

---

## 🚀 Description

`ai-commenter` est un outil en ligne de commande qui parcourt récursivement un dossier, lit tous les fichiers `.ts` et `.js`, puis utilise un modèle LLM local (comme LLaMA via [Ollama](https://ollama.com)) pour ajouter des commentaires intelligents en **français** dans ton code.

Le code original reste intact : les fichiers commentés sont générés dans un dossier `output`.

---

## 📦 Fonctionnalités

- 🔍 Parcours récursif d’un dossier.
- 🧠 Envoie chaque fichier à un modèle IA local via HTTP.
- 💬 Ajoute des commentaires explicatifs en français (fonctions, classes, méthodes).
- 💾 Génére un nouveau fichier `.commented.ts|.js` dans un dossier `./output`.
- 📊 Barre de progression en CLI.

---

## 🔧 Prérequis

- [Node.js](https://nodejs.org) (v18+ recommandé)
- [Ollama](https://ollama.com/) installé et en cours d’exécution localement
- Un modèle disponible dans Ollama (ex: `llama3`)

```bash
ollama run llama3
```

## 📥 Installation

### Clone ce dépôt et installe des dépendances :

```bash
git clone https://github.com/ton-utilisateur/ai-commenter.git
cd ai-commenter
npm install
```

## 🧪 Utilisation

Lance le script en ligne de commande en spécifiant un dossier contenant tes fichiers .ts ou .js :

```bash
node comment.js ./chemin/vers/ton/code
```

Les fichiers commentés seront générés dans ./output.

## 📁 Structure

```pgsql
ai-commenter/
├── comment.js
└── output/
    ├── helpers.commented.ts
    └── index.commented.ts

```

## ⚙️ Configuration

Actuellement, la configuration est en dur :
- URL de l'API : http://localhost:11434/api/generate
- Modèle utilisé : "llama3"
- Langue des commentaires : français

Tu peux modifier ces valeurs dans le script selon tes besoins.

## 🙏 Remerciements

- [Ollama](https://ollama.com) pour les modèles LLM self-hosted
- Les devs qui ont trop la flemme de commenter eux-mêmes 💬😉

## 📜 Licence

MIT – Utilise-le comme bon te semble, mais pense à commenter proprement 🧼.