# Guide de Démarrage Rapide

## 🚀 Installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Ouvrir dans le navigateur**
   - Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn

## 🎯 Commandes Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée une build de production
- `npm run start` - Lance le serveur de production
- `npm run lint` - Vérifie le code avec ESLint

## 🌐 Déploiement sur Vercel

1. **Créer un compte Vercel** (si vous n'en avez pas)
   - Allez sur [vercel.com](https://vercel.com)

2. **Connecter votre repository GitHub**
   - Poussez votre code sur GitHub
   - Importez le projet dans Vercel
   - Vercel détectera automatiquement Next.js

3. **Déploiement automatique**
   - Chaque push sur la branche principale déclenchera un déploiement
   - Les prévisualisations sont créées pour chaque Pull Request

## 🎨 Personnalisation

### Modifier les couleurs
Éditez `tailwind.config.ts` pour changer la palette de couleurs sci-fi.

### Ajouter des sections
Modifiez `src/utils/constants.ts` pour ajouter ou modifier les sections de menu.

### Ajuster la planète
Modifiez `src/components/Scene3D/Planet.tsx` pour changer l'apparence de la planète.

## 🐛 Dépannage

### Erreur de build
- Vérifiez que toutes les dépendances sont installées
- Supprimez `node_modules` et `.next`, puis réinstallez avec `npm install`

### Problèmes de performance 3D
- Réduisez le nombre de particules dans `Particles.tsx`
- Diminuez la qualité des étoiles dans `Scene3D.tsx`

### Problèmes de scroll
- Vérifiez que les sections ont bien un `id` correspondant aux sections dans `constants.ts`

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
