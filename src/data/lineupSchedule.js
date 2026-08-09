// Programme complet transcrit des affiches officielles (heure par heure,
// scène par scène). `color` référence une des couleurs de la palette Tailwind.

export const lineupSchedule = {
  jeudi: {
    stages: [
      {
        name: 'Beach Club — Sun Down',
        color: 'tropical',
        slots: [
          { time: '16:00 – 18:00', artist: 'Carlos Agraz' },
          { time: '18:00 – 19:00', artist: 'Michenlo' },
          { time: '19:00 – 20:30', artist: 'Nicky Romero' },
          { time: '20:30 – 21:30', artist: 'Relajadita' },
          { time: '21:30 – 23:30', artist: 'Andrés Campo' },
          { time: '23:30 – 01:00', artist: 'Yanamaste' },
          { time: '01:00 – 02:00', artist: 'Elmefti' }
        ]
      }
    ]
  },
  vendredi: {
    stages: [
      {
        name: 'Apsaras',
        color: 'coral',
        slots: [
          { time: '19:00 – 20:00', artist: 'Hektor Mass' },
          { time: '20:00 – 21:00', artist: 'Rello' },
          { time: '21:00 – 23:00', artist: 'Wade' },
          { time: '23:10 – 00:30', artist: 'Miss Monique' },
          { time: '00:30 – 01:30', artist: 'Halō' },
          { time: '01:30 – 03:00', artist: 'Dimitri Vegas' },
          { time: '03:00 – 04:00', artist: 'DJs From Mars' },
          { time: '04:00 – 05:00', artist: 'Mandy' },
          { time: '05:00 – 06:00', artist: 'Energy Time' }
        ]
      },
      {
        name: 'Resonance',
        color: 'sun',
        slots: [
          { time: '18:00 – 20:00', artist: 'Luxi Villar' },
          { time: '20:00 – 22:00', artist: 'Fatima Hajji' },
          { time: '22:00 – 00:00', artist: 'Pawlowski' },
          { time: '00:00 – 02:00', artist: 'Nico Moreno' },
          { time: '02:00 – 04:00', artist: 'Vendex' },
          { time: '04:00 – 06:00', artist: 'Fantasm' }
        ]
      },
      {
        name: 'Arcade Land',
        color: 'purple',
        slots: [
          { time: '18:00 – 19:00', artist: 'Papero' },
          { time: '19:00 – 20:00', artist: 'Yeyo' },
          { time: '20:00 – 21:00', artist: 'Hnos. Kapiya' },
          { time: '21:00 – 22:00', artist: 'Wakan B2B Dr. Evil' },
          { time: '22:00 – 23:00', artist: 'Bassdrum Project & Ogalla' },
          { time: '23:00 – 00:00', artist: 'Rebelion' },
          { time: '00:00 – 01:00', artist: 'Soundrush' },
          { time: '01:00 – 02:00', artist: 'Phuture Noize' },
          { time: '02:00 – 03:00', artist: 'D-Sturb' },
          { time: '03:00 – 04:00', artist: 'Wildstylez' },
          { time: '04:00 – 04:45', artist: 'Gunz For Hire' },
          { time: '04:45 – 06:00', artist: 'Partyraiser' }
        ]
      },
      {
        name: 'Beyond',
        color: 'pool',
        slots: [
          { time: '17:00 – 18:30', artist: 'Miguel Moore' },
          { time: '18:30 – 19:30', artist: 'Ismael Lora' },
          { time: '19:30 – 20:30', artist: 'Coqui Selection' },
          { time: '20:30 – 21:45', artist: 'Chumi DJ' },
          { time: '21:45 – 23:00', artist: 'Javi Boss' },
          { time: '23:00 – 00:00', artist: 'DJ Marta' },
          { time: '00:00 – 01:00', artist: 'Rafa XL' },
          { time: '01:05 – 03:30', artist: 'Raul Ortiz (intro)' },
          { time: '03:30 – 04:45', artist: 'Miguel Serna' },
          { time: '04:45 – 06:00', artist: 'Nuria Jump' }
        ]
      },
      {
        name: 'Dharma — BRESH',
        color: 'orange',
        slots: [{ time: '17:00 – 05:00', artist: 'BRESH (scène exclusive)' }]
      },
      {
        name: 'Beach Club — Techno Flamenco',
        color: 'tropical',
        slots: [{ time: '19:00 – 05:00', artist: 'Techno Flamenco (scène exclusive)' }]
      },
      {
        name: 'The Club by Vertigo',
        color: 'pool',
        slots: [
          { time: '17:00 – 19:30', artist: 'Mireia CJ' },
          { time: '19:30 – 21:15', artist: 'Paula Fields' },
          { time: '21:15 – 23:00', artist: 'Karlos Molina' },
          { time: '23:00 – 01:00', artist: 'Jaime Soeiro' },
          { time: '01:00 – 03:00', artist: 'Fran Hernández' },
          { time: '03:00 – 05:00', artist: 'Easttown' }
        ]
      },
      {
        name: 'Church Club',
        color: 'purple',
        slots: [{ time: '22:00 – 04:00', artist: 'DJs Comunidad Medusa' }]
      },
      {
        name: 'Poliakov Stage',
        color: 'turquoise',
        slots: [
          { time: '19:00 – 22:00', artist: 'Asesor B2B Anderson R' },
          { time: '22:00 – 00:00', artist: 'Joel Moreno B2B Lluis SB' },
          { time: '00:00 – 02:00', artist: 'Dario Huerta' },
          { time: '02:00 – 04:00', artist: 'Álex Mapi' }
        ]
      }
    ]
  },
  samedi: {
    stages: [
      {
        name: 'Apsaras',
        color: 'coral',
        slots: [
          { time: '18:00 – 20:00', artist: 'JP Candela' },
          { time: '20:00 – 21:30', artist: 'Claudia León' },
          { time: '21:30 – 23:00', artist: 'Aaron Sevilla' },
          { time: '23:10 – 00:30', artist: 'James Hype' },
          { time: '00:30 – 02:00', artist: 'Alok' },
          { time: '02:00 – 03:30', artist: 'Steve Aoki' },
          { time: '03:30 – 05:00', artist: 'DJ Nano' },
          { time: '05:00 – 06:00', artist: '4444 Of A Kind' }
        ]
      },
      {
        name: 'Resonance',
        color: 'sun',
        slots: [
          { time: '18:00 – 19:30', artist: 'Jaime Soeiro' },
          { time: '19:30 – 21:00', artist: 'Fran Hernández' },
          { time: '21:00 – 22:30', artist: 'Karretero' },
          { time: '22:30 – 00:00', artist: 'Chelina Manuhutu' },
          { time: '00:00 – 01:30', artist: 'Nic Fanciulli B2B Mita Gami' },
          { time: '01:30 – 03:00', artist: 'Mau P' },
          { time: '03:00 – 05:00', artist: 'Carl Cox' },
          { time: '05:00 – 06:30', artist: 'Ben Sims' }
        ]
      },
      {
        name: 'Arcade Land — Rockola',
        color: 'purple',
        slots: [
          { time: '20:00 – 22:00', artist: 'Inés Isla' },
          { time: '22:00 – 00:00', artist: 'Aerea Live' },
          { time: '00:00 – 02:00', artist: 'Serafina' },
          { time: '02:00 – 04:00', artist: 'Adrián Mills' },
          { time: '04:00 – 06:00', artist: 'Novah' }
        ]
      },
      {
        name: 'Beyond',
        color: 'pool',
        slots: [
          { time: '18:00 – 19:30', artist: 'Adrian Vesper' },
          { time: '19:30 – 20:30', artist: 'Toño' },
          { time: '20:30 – 21:30', artist: 'Alex Cervera' },
          { time: '21:30 – 22:30', artist: 'Vicente Belenguer' },
          { time: '22:30 – 23:50', artist: 'Coqui Selection' },
          { time: '00:10 – 01:10', artist: 'Yasmine K Live / Miguel Serna' },
          { time: '01:10 – 02:00', artist: 'Energy Time' },
          { time: '02:00 – 03:00', artist: 'Javi Boss' },
          { time: '03:00 – 04:00', artist: 'Ismael Lora' },
          { time: '04:00 – 05:00', artist: 'Jose Conca' },
          { time: '05:00 – 06:00', artist: 'Alfredo Pareja & David Cabeza' }
        ]
      },
      {
        name: 'Dharma — BRESH',
        color: 'orange',
        slots: [{ time: '17:00 – 05:00', artist: 'BRESH (scène exclusive)' }]
      },
      {
        name: 'Beach Club',
        color: 'tropical',
        slots: [
          { time: '18:00 – 19:00', artist: 'Javi Molina' },
          { time: '19:00 – 20:00', artist: 'DJ Palas' },
          { time: '20:00 – 21:00', artist: 'Batiste' },
          { time: '21:00 – 22:00', artist: 'Art of Fighters' },
          { time: '22:00 – 23:00', artist: 'Javi Boss' },
          { time: '23:00 – 00:00', artist: 'Skudero' },
          { time: '00:00 – 01:00', artist: 'The Viper' },
          { time: '01:00 – 02:00', artist: 'Giangy From Stunned Guys' },
          { time: '02:00 – 03:00', artist: 'Neophyte' },
          { time: '03:00 – 04:00', artist: 'Promo' },
          { time: '04:00 – 05:00', artist: 'Endymion' },
          { time: '05:00 – 06:00', artist: 'DJ Juanma' }
        ]
      },
      {
        name: 'The Club by Vertigo',
        color: 'pool',
        slots: [
          { time: '17:00 – 18:30', artist: 'K-ØS' },
          { time: '18:30 – 20:00', artist: "Alex O'Clock" },
          { time: '20:00 – 21:30', artist: 'Mareels' },
          { time: '21:30 – 23:00', artist: 'Omar Svenson' },
          { time: '23:00 – 01:00', artist: 'Lorena Llanes' },
          { time: '01:00 – 03:00', artist: 'Paskman' },
          { time: '03:00 – 05:00', artist: 'Carlos Agraz' }
        ]
      },
      {
        name: 'Church Club',
        color: 'purple',
        slots: [{ time: '22:00 – 04:00', artist: 'DJs Comunidad Medusa' }]
      },
      {
        name: 'Poliakov Stage',
        color: 'turquoise',
        slots: [
          { time: '19:00 – 22:00', artist: 'Victor Chambo' },
          { time: '22:00 – 00:00', artist: 'Arkaitz' },
          { time: '00:00 – 02:00', artist: "Alex O'Clock" },
          { time: '02:00 – 04:00', artist: 'Jorge Quel' }
        ]
      }
    ]
  },
  dimanche: {
    stages: [
      {
        name: 'Apsaras',
        color: 'coral',
        slots: [
          { time: '18:00 – 19:00', artist: 'Lynne' },
          { time: '19:00 – 20:00', artist: 'Hektor Mass' },
          { time: '20:00 – 21:20', artist: 'Alvama Ice' },
          { time: '21:30 – 23:00', artist: 'Tiësto' },
          { time: '23:10 – 00:00', artist: 'T.B.A' },
          { time: '00:00 – 01:30', artist: 'Oliver Heldens' },
          { time: '01:30 – 02:45', artist: 'Timmy Trumpet' },
          { time: '02:45 – 04:15', artist: 'Holy Priest' },
          { time: '04:15 – 05:45', artist: 'Nervo' }
        ]
      },
      {
        name: 'Resonance',
        color: 'sun',
        slots: [
          { time: '18:00 – 21:00', artist: 'Xune' },
          { time: '21:00 – 23:00', artist: 'Lola Bozzano' },
          { time: '23:00 – 00:30', artist: 'Hugel' },
          { time: '00:30 – 02:00', artist: 'Franky Rizardo' },
          { time: '02:00 – 03:30', artist: 'Marco Carola' },
          { time: '03:30 – 05:00', artist: 'Adam Beyer' },
          { time: '05:00 – 06:30', artist: 'Sara Landry' }
        ]
      },
      {
        name: 'Arcade Land — Masters of Hardcore',
        color: 'purple',
        slots: [
          { time: '18:00 – 20:00', artist: 'Javi Boss' },
          { time: '20:00 – 21:00', artist: 'Furyan' },
          { time: '21:00 – 22:00', artist: 'Ophidian' },
          { time: '22:00 – 23:30', artist: 'Sakyra B2B Namara' },
          { time: '23:30 – 00:30', artist: 'Tha Playah' },
          { time: '00:30 – 01:30', artist: 'Angerfist' },
          { time: '01:30 – 02:30', artist: 'Mad Dog' },
          { time: '02:30 – 03:30', artist: 'Anime' },
          { time: '03:30 – 04:00', artist: 'N-Vitral presents Bombsquad' },
          { time: '04:00 – 05:00', artist: 'Lil Texas' },
          { time: '05:00 – 06:00', artist: 'DRS' }
        ]
      },
      {
        name: 'Beyond',
        color: 'pool',
        slots: [
          { time: '17:00 – 18:00', artist: 'Gil' },
          { time: '18:00 – 19:00', artist: 'Joel Toro' },
          { time: '19:00 – 20:00', artist: 'Danny Mad' },
          { time: '20:00 – 21:00', artist: 'Maggie' },
          { time: '21:00 – 22:00', artist: 'R.Flow' },
          { time: '22:00 – 23:00', artist: 'Arny Montana' },
          { time: '23:00 – 00:00', artist: 'DJ Bacardit' },
          { time: '00:00 – 01:00', artist: 'J.Beren' },
          { time: '01:00 – 02:00', artist: 'Tofote' },
          { time: '02:00 – 03:00', artist: 'Mon DJ' },
          { time: '03:00 – 04:00', artist: 'Carlittos' },
          { time: '04:00 – 05:00', artist: 'Space Elephants' },
          { time: '05:00 – 06:00', artist: 'Michenlo' }
        ]
      },
      {
        name: 'Dharma — Universo Makina',
        color: 'orange',
        slots: [
          { time: '19:00 – 21:00', artist: 'Taia' },
          { time: '21:00 – 23:00', artist: 'Carnada' },
          { time: '23:00 – 04:00', artist: 'Pastis & Buenri & DJ Sisu' },
          { time: '04:00 – 06:00', artist: 'Rage Amoretty' }
        ]
      },
      {
        name: 'Beach Club — H43R',
        color: 'tropical',
        slots: [
          { time: '18:00 – 19:30', artist: 'Sephax' },
          { time: '19:30 – 21:00', artist: 'Lucia Gea' },
          { time: '21:00 – 23:00', artist: 'Winson' },
          { time: '23:00 – 01:00', artist: 'Onlynumbers' },
          { time: '01:00 – 03:00', artist: 'Dyen' },
          { time: '03:00 – 04:30', artist: 'Brenda Serna' },
          { time: '04:30 – 06:00', artist: 'Nico Bondi B2B Krow B2B Tør' }
        ]
      },
      {
        name: 'The Club by Vertigo',
        color: 'pool',
        slots: [
          { time: '17:00 – 19:30', artist: 'Mario Vice' },
          { time: '19:30 – 21:00', artist: 'Javi Palmero' },
          { time: '21:00 – 00:00', artist: 'Wololo Soundsystem (Cortezz + Rizzu)' },
          { time: '00:00 – 02:00', artist: 'Rendher' },
          { time: '02:00 – 05:00', artist: 'Pive' }
        ]
      },
      {
        name: 'Church Club',
        color: 'purple',
        slots: [{ time: '22:00 – 04:00', artist: 'DJs Comunidad Medusa' }]
      },
      {
        name: 'Poliakov Stage',
        color: 'turquoise',
        slots: [
          { time: '19:00 – 22:00', artist: 'Ink 83' },
          { time: '22:00 – 00:00', artist: 'Jorge Quel' },
          { time: '00:00 – 02:00', artist: 'Fercho Energy' },
          { time: '02:00 – 04:00', artist: 'Saldivar' }
        ]
      }
    ]
  }
}
