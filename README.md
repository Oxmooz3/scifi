# Site Web Sci-Fi Interactif

Un site web interactif futuriste construit avec Next.js 14, Three.js, React Three Fiber et TypeScript.

## 🚀 Technologies

- **Framework**: Next.js 14 avec TypeScript
- **3D**: Three.js avec React Three Fiber (@react-three/fiber, @react-three/drei)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Déploiement**: Vercel

## ✨ Fonctionnalités

- 🌍 Scène 3D avec planète bleue sci-fi au centre
- 🎨 Matériaux avec shaders customisés (effet holographique, particules)
- ✨ Atmosphère avec glow effect
- 🔄 Rotation automatique de la planète
- 💫 Système de navigation au scroll avec menus en orbite
- 🎯 5 sections interactives (Home, About, Services, Portfolio, Contact)
- 🎭 Effets visuels sci-fi (particules, glow, hologrammes)
- 📱 Design responsive

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Démarrer le serveur de production
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🎨 Structure du Projet

```
src/
├── app/                 # Pages Next.js (App Router)
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Page d'accueil
│   └── globals.css     # Styles globaux
├── components/
│   ├── Scene3D/        # Composants 3D
│   │   ├── Scene3D.tsx
│   │   ├── Planet.tsx
│   │   ├── OrbitalMenus.tsx
│   │   ├── MenuPanel.tsx
│   │   └── Particles.tsx
│   ├── Navigation/     # Navigation
│   │   └── Navigation.tsx
│   ├── Sections/       # Sections de contenu
│   │   ├── HomeSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   └── ContactSection.tsx
│   └── UI/            # Composants UI
│       └── LoadingScreen.tsx
├── hooks/              # Hooks React
│   └── useScroll.ts
├── utils/              # Utilitaires
│   └── constants.ts
└── types/              # Types TypeScript
    └── index.ts
```

## 🌐 Déploiement sur Vercel

1. Pousser le code sur GitHub
2. Connecter le repository à Vercel
3. Vercel détectera automatiquement Next.js et configurera le déploiement
4. Le site sera déployé automatiquement à chaque push

### Configuration Vercel

Le fichier `vercel.json` est déjà configuré pour le déploiement automatique.

## 🎯 Utilisation

- **Scroll vertical**: Naviguez entre les sections
- **Menus 3D**: Cliquez sur les panneaux en orbite pour naviguer
- **Navigation latérale**: Utilisez les boutons à droite pour accéder rapidement aux sections
- **Interactions**: Survolez les éléments pour voir les effets de glow

## 🛠️ Personnalisation

### Couleurs

Les couleurs peuvent être modifiées dans `tailwind.config.ts`:
- `sci-fi-cyan`: #00FFFF
- `sci-fi-blue`: #0066FF
- `sci-fi-purple`: #9933FF

### Sections de menu

Modifiez `src/utils/constants.ts` pour ajouter ou modifier les sections.

### Planète

Ajustez les paramètres dans `src/components/Scene3D/Planet.tsx`:
- `PLANET_RADIUS`: Taille de la planète
- Rotation speed: Vitesse de rotation

## 📝 License

MIT

## 👨‍💻 Développement

Pour contribuer au projet:
1. Fork le repository
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request
