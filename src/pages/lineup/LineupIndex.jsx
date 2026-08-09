import PageShell from '../../components/PageShell.jsx'
import BigButton from '../../components/BigButton.jsx'
import EnCeMoment from '../../components/EnCeMoment.jsx'
import { lineup } from '../../data/lineup.js'

const dayColors = ['coral', 'turquoise', 'sun', 'tropical']

export default function LineupIndex() {
  return (
    <PageShell title="Line-Up" emoji="🎧">
      <div className="mb-1">
        <EnCeMoment />
      </div>

      <BigButton to="/lineup/favoris" icon="trophy" color="purple" subtitle="Qui · Quand · Où">
        Artistes Favoris
      </BigButton>

      {lineup.map((day, i) => (
        <BigButton key={day.id} to={`/lineup/${day.id}`} icon="music" color={dayColors[i % dayColors.length]} subtitle={day.date}>
          {day.jour}
        </BigButton>
      ))}
    </PageShell>
  )
}
