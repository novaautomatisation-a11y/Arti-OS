# Guide de placement des images de construction

## 📸 Images requises

Le site nécessite 3 images de construction que vous avez fournies. Voici comment les intégrer :

## 📁 Structure des dossiers

Les images doivent être placées dans le dossier suivant :
```
public/images/
```

Le dossier `public/images/` a déjà été créé pour vous.

## 🖼️ Images à placer

### 1. Image principale - Grue de construction (coucher de soleil)
**Fichier :** L'image avec la grue de construction au coucher de soleil
**Nom à donner :** `construction-crane.jpg`
**Emplacement :** `public/images/construction-crane.jpg`
**Utilisation :** Hero section (grande image d'arrière-plan en haut de la page d'accueil)

### 2. Image secondaire - Ouvriers avec casques
**Fichier :** L'image avec les ouvriers portant des casques et regardant des plans
**Nom à donner :** `construction-workers.jpg`
**Emplacement :** `public/images/construction-workers.jpg`
**Utilisation :** Section "Expertise" - Première carte (Équipes coordonnées)

### 3. Image tertiaire - Chantier de construction
**Fichier :** L'image montrant le chantier de construction avec structure en acier
**Nom à donner :** `construction-site.jpg`
**Emplacement :** `public/images/construction-site.jpg`
**Utilisation :** Section "Expertise" - Deuxième carte (Suivi de chantier)

## 📝 Instructions de placement

### Étape 1 : Préparation des images

1. Renommer vos 3 images comme indiqué ci-dessus :
   - Image 1 (grue) → `construction-crane.jpg`
   - Image 2 (ouvriers) → `construction-workers.jpg`
   - Image 3 (chantier) → `construction-site.jpg`

### Étape 2 : Copier les images

2. Placer les 3 images dans le dossier `public/images/` :

```bash
# Si vous êtes dans le terminal à la racine du projet :
cp /chemin/vers/vos/images/construction-crane.jpg public/images/
cp /chemin/vers/vos/images/construction-workers.jpg public/images/
cp /chemin/vers/vos/images/construction-site.jpg public/images/
```

### Étape 3 : Vérification

3. Vérifier que les images sont bien placées :

```bash
ls -la public/images/
```

Vous devriez voir :
```
construction-crane.jpg
construction-workers.jpg
construction-site.jpg
```

## 🎨 Optimisation des images (recommandé)

Pour de meilleures performances, il est recommandé d'optimiser les images :

### Format recommandé
- **Format :** JPG ou WebP
- **Résolution :** 1920x1080px minimum
- **Poids :** < 500KB par image (après optimisation)

### Outils d'optimisation

Vous pouvez utiliser des outils en ligne pour compresser vos images :
- [TinyJPG](https://tinyjpg.com/) - Compression JPG/PNG
- [Squoosh](https://squoosh.app/) - Outil de Google pour optimisation avancée
- [ImageOptim](https://imageoptim.com/) - Application Mac pour optimisation

## 🚀 Après avoir placé les images

Une fois les images placées :

1. **Redémarrer le serveur de développement** si il tourne :
   ```bash
   npm run dev
   ```

2. **Ouvrir la page d'accueil** dans votre navigateur :
   ```
   http://localhost:3000
   ```

3. **Vérifier que les images s'affichent correctement** :
   - Hero section : grande image de grue avec overlay bleu
   - Section Expertise : 2 cartes avec images d'ouvriers et chantier

## ❓ Problèmes courants

### Les images ne s'affichent pas
- ✅ Vérifier que les images sont bien dans `public/images/`
- ✅ Vérifier que les noms de fichiers sont EXACTEMENT comme indiqué
- ✅ Redémarrer le serveur de développement
- ✅ Vider le cache du navigateur (Ctrl+Shift+R ou Cmd+Shift+R)

### Les images sont floues
- ✅ Utiliser des images haute résolution (minimum 1920x1080px)
- ✅ Exporter les images en qualité maximale

### Les images mettent du temps à charger
- ✅ Optimiser les images avec TinyJPG ou Squoosh
- ✅ S'assurer que le poids est < 500KB par image

## 🎨 Thème visuel appliqué

Les modifications incluent :
- **Fond bleu foncé moderne** (slate-900 et blue-950) sur le Hero
- **Overlays bleus** sur toutes les images pour cohérence
- **Cartes KPI** avec gradients bleus plus prononcés
- **Effets hover** avec transitions douces
- **Glassmorphism** moderne pour les cartes

## 📱 Responsive

Les images sont optimisées pour tous les écrans :
- Desktop : affichage complet
- Tablet : adaptation automatique
- Mobile : recadrage intelligent

---

Une fois les images en place, le site aura un aspect professionnel et moderne avec le thème bleu foncé que vous avez demandé !
