# Demo 2

Application composee d'un frontend React et d'un backend Express connecte a MySQL.

## Prerequis

- Node.js et npm
- MySQL en local
- Une base de donnees nommee `infinite_db`
- Une table `utilisateur` compatible avec le modele du backend

La configuration actuelle utilise MySQL sur `localhost`, avec l'utilisateur `root` sans mot de passe.

## Installation

Installer les dependances de chaque partie :

```powershell
cd backend
npm install

cd ..\frontend
npm install
```

## Lancement

Ouvrir deux terminaux depuis la racine du projet.

Terminal 1, backend :

```powershell
cd backend
npm start
```

Le backend demarre sur http://localhost:5000.

Terminal 2, frontend :

```powershell
cd frontend
npm start
```

Le frontend est accessible sur http://localhost:3000.

## API

La liste des utilisateurs est disponible avec :

```text
GET http://localhost:5000/users
```

Parametres optionnels : `search_query`, `last_id` et `limit`.
