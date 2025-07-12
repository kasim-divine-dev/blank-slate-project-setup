
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-4">
      <button 
        className="flex items-center gap-2 text-[#F5E7D3]/60 hover:text-[#F5E7D3] transition-colors disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowUpRight className="w-4 h-4 rotate-180" />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            className={`w-8 h-8 rounded-full text-sm transition-colors ${
              page === currentPage
                ? 'bg-white text-black'
                : 'text-[#F5E7D3]/60 hover:text-[#F5E7D3]'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button 
        className="flex items-center gap-2 text-[#F5E7D3]/60 hover:text-[#F5E7D3] transition-colors disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
