import { initializeApp } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC2YYJFAGYent7Dbqi21m4Xv7A2IqCu9mY',
  authDomain: 'medushlag.firebaseapp.com',
  projectId: 'medushlag',
  storageBucket: 'medushlag.firebasestorage.app',
  messagingSenderId: '411601812383',
  appId: '1:411601812383:web:7dae828e353c72f4ed5baa'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Active le cache local + la synchro automatique en arrière-plan dès que le
// réseau revient — essentiel en festival où le réseau va et vient. Les
// écritures faites hors-ligne restent en attente et partent toutes seules.
enableIndexedDbPersistence(db).catch(() => {
  // Échoue silencieusement si plusieurs onglets sont ouverts ou si le
  // navigateur ne supporte pas la persistance — l'app continue de
  // fonctionner normalement, juste sans cache local dans ce cas précis.
})
