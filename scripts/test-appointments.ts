/**
 * Script de test pour vérifier la séparation des données utilisateurs
 * À exécuter après avoir créé au moins 2 utilisateurs via l'interface
 */

import connectDB from '../lib/mongodb'
import Appointment from '../models/Appointment'
import User from '../models/User'

async function testAppointments() {
  try {
    console.log('🔌 Connexion à MongoDB...')
    await connectDB()
    
    // Récupérer tous les utilisateurs
    const users = await User.find().select('_id name email')
    console.log(`\n👥 Utilisateurs trouvés: ${users.length}`)
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - ID: ${user._id}`)
    })
    
    if (users.length < 2) {
      console.log('\n⚠️  Créez au moins 2 utilisateurs via l\'interface pour tester la séparation des données')
      process.exit(0)
    }
    
    // Créer des rendez-vous pour le premier utilisateur
    const user1 = users[0]
    console.log(`\n📅 Création de rendez-vous pour ${user1.name}...`)
    
    const appointments1 = [
      {
        userId: user1._id.toString(),
        title: 'Consultation oncologie',
        description: 'Contrôle trimestriel',
        type: 'medical' as const,
        status: 'scheduled' as const,
        date: new Date('2025-11-15'),
        time: '14:30',
        duration: 30,
        location: {
          name: 'Hôpital Saint-Louis',
          address: '1 Avenue Claude Vellefaux, Paris',
          phone: '01 42 49 49 49',
          type: 'hospital' as const
        },
        doctor: {
          name: 'Dr. Marie Dupont',
          specialty: 'Oncologie',
          phone: '01 42 49 50 00'
        },
        reminders: {
          enabled: true,
          intervals: [60, 1440] // 1h et 24h avant
        }
      },
      {
        userId: user1._id.toString(),
        title: 'Séance de chimiothérapie',
        description: 'Cycle 3/6',
        type: 'treatment' as const,
        status: 'confirmed' as const,
        date: new Date('2025-11-20'),
        time: '09:00',
        duration: 180,
        location: {
          name: 'Centre de traitement',
          address: '10 Rue de la Santé, Paris',
          phone: '01 45 65 75 85',
          type: 'clinic' as const
        },
        reminders: {
          enabled: true,
          intervals: [120, 1440]
        }
      }
    ]
    
    await Appointment.insertMany(appointments1)
    console.log(`✅ ${appointments1.length} rendez-vous créés pour ${user1.name}`)
    
    // Créer des rendez-vous pour le deuxième utilisateur
    const user2 = users[1]
    console.log(`\n📅 Création de rendez-vous pour ${user2.name}...`)
    
    const appointments2 = [
      {
        userId: user2._id.toString(),
        title: 'Mammographie de dépistage',
        description: 'Dépistage annuel',
        type: 'screening' as const,
        status: 'scheduled' as const,
        date: new Date('2025-11-10'),
        time: '10:00',
        duration: 45,
        location: {
          name: 'Centre de radiologie',
          address: '5 Boulevard Raspail, Paris',
          phone: '01 43 26 80 80',
          type: 'clinic' as const
        },
        doctor: {
          name: 'Dr. Astou Faye',
          specialty: 'Radiologie'
        },
        reminders: {
          enabled: true,
          intervals: [1440, 2880] // 24h et 48h avant
        }
      }
    ]
    
    await Appointment.insertMany(appointments2)
    console.log(`✅ ${appointments2.length} rendez-vous créé pour ${user2.name}`)
    
    // Vérification de la séparation des données
    console.log('\n🔍 Vérification de la séparation des données...')
    
    const user1Appointments = await Appointment.find({ userId: user1._id.toString() })
    const user2Appointments = await Appointment.find({ userId: user2._id.toString() })
    
    console.log(`\n${user1.name} a ${user1Appointments.length} rendez-vous:`)
    user1Appointments.forEach(apt => {
      console.log(`  - ${apt.title} le ${apt.date.toLocaleDateString('fr-FR')}`)
    })
    
    console.log(`\n${user2.name} a ${user2Appointments.length} rendez-vous:`)
    user2Appointments.forEach(apt => {
      console.log(`  - ${apt.title} le ${apt.date.toLocaleDateString('fr-FR')}`)
    })
    
    console.log('\n✅ Test terminé avec succès !')
    console.log('👉 Connectez-vous avec chaque utilisateur pour vérifier que vous voyez uniquement VOS rendez-vous')
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    process.exit(0)
  }
}

testAppointments()
