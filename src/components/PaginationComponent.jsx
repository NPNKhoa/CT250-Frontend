import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const PaginationComponent = ({ path, totalPages }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  return (
    <Pagination
      page={page}
      count={totalPages}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${path}${item.page === 1 ? '' : `&page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
};

PaginationComponent.propTypes = {
  path: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PaginationComponent;
