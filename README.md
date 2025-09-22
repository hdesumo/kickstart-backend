# Kickstart Backend

Backend du projet **Kickstart Campus** développé en **TypeScript + Express + Prisma**.

## 🚀 Fonctionnalités principales

- API REST basée sur Express
- Prisma ORM pour PostgreSQL
- Hot reload en développement avec ts-node-dev
- Scripts de migration et de seed
- Build propre grâce au script `clean`

---

## 🛠️ Prérequis

- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- PostgreSQL (local ou hébergé via Railway, Supabase…)

---

## ⚙️ Variables d'environnement

Créer un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://postgres:qFzwIZtnVfRjZPrxGgrOdHcTENMloivq@yamanote.proxy.rlwy.net:16483/railway"
PORT=8080
NODE_ENV=development
