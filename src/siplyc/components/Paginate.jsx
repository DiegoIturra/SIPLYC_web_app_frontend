import { useLocation, useNavigate } from "react-router-dom"

export const Paginate = ({ currentPage, totalPages, hasNext, hasPrev }) => {

  const navigate = useNavigate()
  const location = useLocation()

  const handlePageChange = (newPage) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', newPage)
    navigate(location.pathname + '?' + searchParams.toString())
  }

  const handleClick = (e, newPage) => {
    e.preventDefault()
    handlePageChange(newPage)
  }

  const generatePageNumbers = () => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return(
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${!hasPrev ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={(e) => handleClick(e, currentPage - 1)}>Previous</a>
        </li>
        {
          generatePageNumbers().map(number => (
            <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
              <a className="page-link" href="#" onClick={(e) => handleClick(e, number)}>{number}</a>
            </li>
          ))
        }
        <li className={`page-item ${!hasNext ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={(e) => handleClick(e, currentPage + 1)}>Next</a>
        </li>
      </ul>
    </nav>
  )
}