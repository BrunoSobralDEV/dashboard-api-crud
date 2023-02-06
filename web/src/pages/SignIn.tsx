import { NavLink } from "react-router-dom";

export function SignIn() {
  return(
    <main className="d-flex justify-content-center align-items-center vh-100">
      <form style={{width: "300px"}}>
        <img className="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width={72} height={57} />
        <h1 className="h3 mb-3 fw-normal">Por favor, Logue-se</h1>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">E-mail</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Senha</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" defaultValue="remember-me" /> Lembre de mim
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Entrar</button>
      </form>
      <NavLink to="/dashboard/"><span>go to dashboard</span></NavLink>
    </main>
  )
}