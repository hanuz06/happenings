import Link from "next/link";

export default function Pagination({ paginationMeta }) {
  const { page, pageSize, pageCount, total } = paginationMeta;

  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className='btn-secondary'>Prev</a>
        </Link>
      )}
      {page < pageCount && (
        <Link href={`/events?page=${page + 1}`}>
          <a className='btn-secondary'>Next</a>
        </Link>
      )}
    </>
  );
}
