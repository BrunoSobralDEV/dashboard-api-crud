import Spinner from 'react-bootstrap/Spinner';

export function Loading({...rest}) {
  return (
    <Spinner animation="border" role="status" {...rest}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
