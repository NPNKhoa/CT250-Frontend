import { Breadcrumbs, Link, Typography } from '@mui/material';

// eslint-disable-next-line react/prop-types
const BreadcrumbsComponent = ({ breadcrumbs }) => {
  return (
    <div className='bg-gray-200'>
      <div role='presentation' className=' container mx-auto py-4 px-10'>
        <Breadcrumbs aria-label='breadcrumb'>
          {breadcrumbs.map((breadcrumb, index) => {
            if (index === breadcrumbs.length - 1) {
              return (
                <Typography key={index} className='text-primary'>
                  {breadcrumb.label}
                </Typography>
              );
            } else {
              return (
                <Link
                  key={index}
                  underline='hover'
                  color='inherit'
                  href={breadcrumb.href}
                >
                  {breadcrumb.label}
                </Link>
              );
            }
          })}
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default BreadcrumbsComponent;
