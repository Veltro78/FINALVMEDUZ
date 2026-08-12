import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AppBackground from './components/AppBackground.jsx'

import Splash from './pages/Splash.jsx'
import Home from './pages/Home.jsx'

import CommandementIndex from './pages/commandement/CommandementIndex.jsx'
import PlanFestival from './pages/commandement/PlanFestival.jsx'
import Meteo from './pages/commandement/Meteo.jsx'
import OuEsTu from './pages/OuEsTu.jsx'
import Faq from './pages/commandement/Faq.jsx'
import ReductionRisques from './pages/commandement/ReductionRisques.jsx'
import TraducteurEspagnol from './pages/commandement/TraducteurEspagnol.jsx'

import LineupIndex from './pages/lineup/LineupIndex.jsx'
import LineupDay from './pages/lineup/LineupDay.jsx'
import ArtistesFavoris from './pages/lineup/ArtistesFavoris.jsx'

import ShlagosIndex from './pages/shlagos/ShlagosIndex.jsx'
import ShlagoProfile from './pages/shlagos/ShlagoProfile.jsx'
import Classement from './pages/shlagos/Classement.jsx'

import SouvenirsIndex from './pages/souvenirs/SouvenirsIndex.jsx'
import Photos from './pages/souvenirs/Photos.jsx'
import Vlogs from './pages/souvenirs/Vlogs.jsx'
import Defis from './pages/souvenirs/Defis.jsx'
import JeuDuSchlag from './pages/souvenirs/JeuDuSchlag.jsx'
import Citations from './pages/souvenirs/Citations.jsx'
import Dictionnaire from './pages/souvenirs/Dictionnaire.jsx'
import Polaroid from './pages/souvenirs/Polaroid.jsx'
import CapsuleTemporelle from './pages/souvenirs/CapsuleTemporelle.jsx'
import QuiADitCa from './pages/souvenirs/QuiADitCa.jsx'
import ShlagoAdventure from './pages/souvenirs/ShlagoAdventure.jsx'
import BoiteAProut from './pages/souvenirs/BoiteAProut.jsx'
import MurDesTrophees from './pages/souvenirs/MurDesTrophees.jsx'

import NotFound from './pages/NotFound.jsx'

export default function App() {
  const location = useLocation()

  return (
    <>
      <AppBackground />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Splash />} />
          <Route path="/accueil" element={<Home />} />

          <Route path="/commandement" element={<CommandementIndex />} />
          <Route path="/commandement/plan" element={<PlanFestival />} />
          <Route path="/commandement/meteo" element={<Meteo />} />
          <Route path="/ou-es-tu" element={<OuEsTu />} />
          <Route path="/commandement/faq" element={<Faq />} />
          <Route path="/commandement/risques" element={<ReductionRisques />} />
          <Route path="/commandement/espagnol" element={<TraducteurEspagnol />} />

          <Route path="/lineup" element={<LineupIndex />} />
          <Route path="/lineup/favoris" element={<ArtistesFavoris />} />
          <Route path="/lineup/:jourId" element={<LineupDay />} />

          <Route path="/shlagos" element={<ShlagosIndex />} />
          <Route path="/shlagos/classement" element={<Classement />} />
          <Route path="/shlagos/:id" element={<ShlagoProfile />} />

          <Route path="/souvenirs" element={<SouvenirsIndex />} />
          <Route path="/souvenirs/polaroid" element={<Polaroid />} />
          <Route path="/souvenirs/capsule" element={<CapsuleTemporelle />} />
          <Route path="/souvenirs/qui-a-dit-ca" element={<QuiADitCa />} />
          <Route path="/souvenirs/aventure" element={<ShlagoAdventure />} />
          <Route path="/souvenirs/prout" element={<BoiteAProut />} />
          <Route path="/souvenirs/trophees" element={<MurDesTrophees />} />
          <Route path="/souvenirs/photos" element={<Photos />} />
          <Route path="/souvenirs/vlogs" element={<Vlogs />} />
          <Route path="/souvenirs/defis" element={<Defis />} />
          <Route path="/souvenirs/jeu" element={<JeuDuSchlag />} />
          <Route path="/souvenirs/citations" element={<Citations />} />
          <Route path="/souvenirs/dictionnaire" element={<Dictionnaire />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
