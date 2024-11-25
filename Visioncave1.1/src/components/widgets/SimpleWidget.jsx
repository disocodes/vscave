export default function SimpleWidget({ title, children, className = '' }) {
  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {children}
    </div>
  )
}
