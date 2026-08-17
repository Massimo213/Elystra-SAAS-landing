import { Navigate, useParams } from 'react-router-dom';
import { DOC_SLUG_REDIRECTS } from '@/data/platform-docs';

const DocSectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const anchor = slug ? DOC_SLUG_REDIRECTS[slug] : undefined;

  if (!anchor) {
    return <Navigate to="/docs" replace />;
  }

  return <Navigate to={`/docs#${anchor}`} replace />;
};

export default DocSectionPage;
