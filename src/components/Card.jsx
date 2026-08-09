export default function Card({ children, className = '', title, emoji }) {
  return (
    <div className={`glass-card rounded-3xl p-4 sm:p-5 text-white shadow-card ${className}`}>
      {title && (
        <h3 className="font-display font-bold text-base sm:text-lg mb-2 flex items-center gap-2">
          {emoji && <span aria-hidden="true">{emoji}</span>} {title}
        </h3>
      )}
      {children}
    </div>
  )
}
