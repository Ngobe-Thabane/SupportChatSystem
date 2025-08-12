import  {useState} from 'react';
import { useMovieList } from '../stores/useMovieStore';

export default function PaginationControls() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMovieList((state)=>state.total_pages);
  const pages:Array<string> = [];

  const handlePageClick = (page:number) => {
    console.log(typeof page, typeof currentPage)
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const getPagination = () => {

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(`${i}`);
      }
    } 
    else {
      pages.push('1');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) {
        pages.push(`${i}`);
      }
      if (end < totalPages - 2) pages.push('...');
      
      pages.push(`${totalPages}`);
    }

    return pages;
  }

  const paginationItems = getPagination();

  return (
    <>
    {
      totalPages > 1 &&
      <div style={{ display: 'flex',gap:'24px', alignItems: 'center', alignSelf:'center' , margin:'20px'}} className='pagination-container'>
        <button
          className='border btn '
          onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            border: 'none',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
            prev         
        </button>

        {paginationItems.map((item, index) => (
          <button
            className={`btn rounded-full ${item === currentPage.toString() ? 'active bg-blue-500' : 'not-active'}`}
            key={index}
            onClick={() => typeof item === 'number' && handlePageClick(item)}
            disabled={item === '...'}
            style={{
              cursor: item === '...' ? 'border-none' : 'pointer',
            }}
          >
            {item}
          </button>
        ))}

        <button
          className='border btn'
          onClick={() =>
            currentPage < totalPages && handlePageClick(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          style={{
            border: 'none',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          next
        </button>
      </div>
    }
    </>
  );
}