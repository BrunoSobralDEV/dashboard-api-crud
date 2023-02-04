export function Menu() {
  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-light fixed-top" style={{height: "100vh", width: '280px'}}>
        <div className="d-flex flex-column">
          <a href="/" className="d-flex link-dark text-decoration-none">
            <img className="me-2" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width={40} height={32} />
            <span className="fs-4">Dashboard</span>
          </a>
          <small className="text-muted">Consumo de APIs e CRUD com MySql</small>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              <svg className="bi pe-none me-2" width={16} height={16}><use xlinkHref="#home" /></svg>
              Random Users Generator
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
              <svg className="bi pe-none me-2" width={16} height={16}><use xlinkHref="#speedometer2" /></svg>
              Http Cats
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
              <svg className="bi pe-none me-2" width={16} height={16}><use xlinkHref="#table" /></svg>
              Random Dog
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
              <svg className="bi pe-none me-2" width={16} height={16}><use xlinkHref="#grid" /></svg>
              Cadastro de Clientes
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width={32} height={32} className="rounded-circle me-2" />
            <strong>BrunoSobral</strong>
          </a>
          <ul className="dropdown-menu text-small shadow">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}