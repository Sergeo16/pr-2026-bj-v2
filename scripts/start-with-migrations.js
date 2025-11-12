#!/usr/bin/env node

/**
 * Script de démarrage pour Railway avec migrations automatiques
 * Exécute les migrations une seule fois au démarrage, puis démarre le serveur
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const MIGRATION_FLAG_FILE = path.join(__dirname, '../.migrations-done');

async function main() {
  try {
    // Vérifier si les migrations ont déjà été exécutées
    const migrationsDone = fs.existsSync(MIGRATION_FLAG_FILE);
    
    if (!migrationsDone) {
      console.log('🔄 Exécution des migrations...');
      try {
        execSync('npm run migrate', { 
          stdio: 'inherit',
          env: process.env 
        });
        console.log('✅ Migrations terminées');
        
        console.log('🌱 Exécution du seed...');
        execSync('npm run seed', { 
          stdio: 'inherit',
          env: process.env 
        });
        console.log('✅ Seed terminé');
        
        // Créer le fichier flag pour indiquer que les migrations sont faites
        fs.writeFileSync(MIGRATION_FLAG_FILE, new Date().toISOString());
        console.log('📝 Flag de migrations créé');
      } catch (error) {
        console.error('❌ Erreur lors des migrations/seed:', error.message);
        // Ne pas bloquer le démarrage si les migrations échouent
        // (peut-être que les tables existent déjà)
        console.log('⚠️  Continuation du démarrage malgré l\'erreur');
      }
    } else {
      console.log('✅ Migrations déjà exécutées (flag trouvé)');
    }
    
    console.log('🚀 Démarrage du serveur Next.js...');
    
    // Importer et démarrer le serveur Next.js standalone
    require('./start-server.js');
    
  } catch (error) {
    console.error('❌ Erreur lors du démarrage:', error);
    process.exit(1);
  }
}

main();

