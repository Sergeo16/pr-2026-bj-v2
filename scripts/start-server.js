#!/usr/bin/env node

/**
 * Script de démarrage pour Railway
 * Garantit que le serveur écoute sur 0.0.0.0 et utilise le port fourni par Railway
 */

// S'assurer que PORT est défini (Railway le fournit automatiquement)
const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

// Définir les variables d'environnement pour Next.js standalone
process.env.PORT = port.toString();
process.env.HOSTNAME = hostname;

console.log(`🚀 Démarrage du serveur Next.js...`);
console.log(`   Port: ${port}`);
console.log(`   Hostname: ${hostname}`);

// Importer et démarrer le serveur Next.js standalone
// server.js est à la racine du répertoire de travail (/app/server.js)
require('../server.js');

