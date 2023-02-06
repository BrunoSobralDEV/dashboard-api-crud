import { Cat, Dog, PawPrint, Shuffle, UserCirclePlus } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Menu() {
  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-light fixed-top text-start" style={{height: "100vh", width: '280px'}}>
        <div className="d-flex flex-column">
          <a href="/" className="d-flex link-dark text-decoration-none">
            <img className="me-2" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width={40} height={32} />
            <span className="fs-4">Dashboard</span>
          </a>
          <small className="text-muted">Consumo de APIs e CRUD com MySql</small>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <NavLink to="/dashboard/" className="nav-link d-flex align-items-center gap-2">
              <Shuffle size={20} />
                Random Users Generator
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/httpapi" className="nav-link d-flex align-items-center gap-2">
            <Cat size={20} />
              Http Cats
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/randomdogs" className="nav-link d-flex align-items-center gap-2">
            <Dog size={20} />
              <span>Random Dog</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/customers" className="nav-link d-flex align-items-center gap-2">
              <UserCirclePlus size={20} />
              {/* <svg className="bi pe-none me-2" width={16} height={16}><use xlinkHref="#grid" /></svg> */}
              <span>Cadastro de Clientes</span>
            </NavLink>
          </li>
        </ul>
        <hr />
        <p>
          <strong>Techs: </strong><br/>
          <span><strong>Front-end: </strong>ReactJS, HTML5, CSS3</span><br/>
          <span><strong>Back-end: </strong><s>Node, Firebase, MySQL</s></span><br/>
          <span><strong>UI: </strong>Bootstrap, PhosphorIcons</span>
        </p>
        <hr />
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/BrunoSobralDEV.png" alt="" width={32} height={32} className="rounded-circle me-2" />
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