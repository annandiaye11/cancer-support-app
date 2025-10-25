/**
 * Script pour consolider tous les rendez-vous sous un seul userId
 * Utile pour le développement quand plusieurs userId temporaires ont été créés
 */

import { config } from 'dotenv'
import connectDB from '@/lib/mongodb'
import Appointment from '@/models/Appointment'

// Charger les variables d'environnement
config({ path: '.env.local' })

async function fixUserIds() {
  try {
    console.log('🔄 Connexion à MongoDB...')
    await connectDB()
    console.log('✅ Connexion établie')

    // Récupérer tous les rendez-vous
    const appointments = await Appointment.find({})
    console.log(`📊 ${appointments.length} rendez-vous trouvés`)

    if (appointments.length === 0) {
      console.log('ℹ️  Aucun rendez-vous à migrer')
      process.exit(0)
    }

    // Afficher les différents userId actuels
    const userIds = [...new Set(appointments.map(apt => apt.userId))]
    console.log(`\n👥 UserIds actuels trouvés:`)
    userIds.forEach(id => {
      const count = appointments.filter(apt => apt.userId === id).length
      console.log(`   - ${id}: ${count} rendez-vous`)
    })

    // Demander quel userId utiliser
    console.log('\n🎯 Options:')
    console.log('1. Utiliser le premier userId trouvé')
    console.log('2. Créer un nouveau userId fixe (recommended)')
    console.log('3. Garder le userId avec le plus de rendez-vous')

    // Pour l'automatisation, on utilise l'option 2: un userId fixe
    const fixedUserId = 'user-default-dev'
    
    console.log(`\n🔧 Migration de tous les rendez-vous vers: ${fixedUserId}`)
    
    // Mettre à jour tous les rendez-vous
    const result = await Appointment.updateMany(
      {},
      { $set: { userId: fixedUserId } }
    )

    console.log(`\n✅ Migration terminée:`)
    console.log(`   - ${result.modifiedCount} rendez-vous mis à jour`)
    console.log(`   - Tous les rendez-vous utilisent maintenant: ${fixedUserId}`)
    
    console.log(`\n📝 Pour utiliser ce userId dans votre application:`)
    console.log(`   1. Ouvrez la console du navigateur`)
    console.log(`   2. Exécutez: localStorage.setItem('userId', '${fixedUserId}')`)
    console.log(`   3. Rechargez la page`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

// Exécuter le script
fixUserIds()
