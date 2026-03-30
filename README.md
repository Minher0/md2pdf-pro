# MD2PDF Pro

🚀 **Convertisseur Markdown vers PDF moderne et performant**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Fonctionnalités

- **Éditeur Split-Screen** - Éditeur Markdown à gauche, prévisualisation en temps réel à droite
- **Drag & Drop** - Importez vos fichiers `.md` par simple glisser-déposer
- **Coloration Syntaxique** - Code beautifiquement formaté avec highlight.js
- **Thèmes Multiples** - GitHub, Medium, et LaTeX
- **Export PDF** - Génération de PDF haute qualité avec options personnalisables
- **Responsive Design** - Optimisé pour desktop, utilisable sur mobile
- **Mode Sombre** - Interface élégante en mode sombre par défaut

## 🛠️ Technologies

- **Framework**: Next.js 16 avec App Router
- **Langage**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Markdown**: react-markdown + remark-gfm
- **Coloration**: highlight.js (rehype-highlight)
- **PDF**: html2pdf.js

## 🎯 Options d'Export PDF

| Option | Valeurs |
|--------|---------|
| Format de page | A4, Letter |
| Marges | Étroit, Standard, Large |
| Taille de police | 10px - 20px |
| Thème | GitHub, Medium, LaTeX |

## 🚀 Démarrage Rapide

```bash
# Installer les dépendances
bun install

# Lancer le serveur de développement
bun run dev

# Ouvrir http://localhost:3000
```

## 📁 Structure du Projet

```
md2pdf-pro/
├── src/
│   ├── app/
│   │   ├── globals.css    # Styles globaux + Markdown
│   │   ├── layout.tsx     # Layout principal
│   │   └── page.tsx       # Page principale
│   ├── components/ui/     # Composants shadcn/ui
│   └── hooks/             # Hooks React personnalisés
├── public/                # Assets statiques
└── package.json           # Dépendances
```

## 📝 Utilisation

1. **Écrire du Markdown** - Utilisez l'éditeur à gauche
2. **Prévisualiser** - Le rendu s'affiche en temps réel à droite
3. **Personnaliser** - Ajustez le format, les marges et la police
4. **Exporter** - Cliquez sur "Télécharger PDF"

## 🔗 Liens

- **Démo**: [md2pdf-pro-one.vercel.app](https://md2pdf-pro-one.vercel.app)
- **GitHub**: [github.com/Minher0/md2pdf-pro](https://github.com/Minher0/md2pdf-pro)

## 📄 Licence

MIT License - Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Fait avec ❤️ par l'équipe MD2PDF Pro
