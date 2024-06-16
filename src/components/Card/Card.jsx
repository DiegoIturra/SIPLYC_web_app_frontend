import './Card.css'

export const Card = ({ text, type }) => {
  return (
    <div className={`custom-card card text-white ${type} mb-3`}>
      <div className="card-body">
        <h5 className="card-title">{text}</h5>
      </div>
    </div>
  )
}