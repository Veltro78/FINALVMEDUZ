import PageShell from '../../components/PageShell.jsx'
import Card from '../../components/Card.jsx'
import { citations } from '../../data/citations.js'

export default function Citations() {
  return (
    <PageShell title="Citations cultes" emoji="💬">
      {citations.map((c, i) => (
        <Card key={i} className="italic">
          <p className="text-sm text-white/95">&laquo;&nbsp;{c.texte}&nbsp;&raquo;</p>
          {c.auteur && (
            <p className="text-xs text-white/70 text-right mt-2">
              — {c.auteur}{c.detail ? ` (${c.detail})` : ''}
            </p>
          )}
        </Card>
      ))}
    </PageShell>
  )
}
