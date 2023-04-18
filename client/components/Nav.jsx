const React = require('react');
import { Link } from "react-router-dom";

class Nav extends React.Component {

  render() {
    const navComponents = [];
    if (this.props.loggedIn) {
      console.log(this.props)
      navComponents.push(
        <ul key={0} className="nav-items">
          <li key={0}><Link to="/">Home</Link></li>
          <li key={1}><Link to="/mypage">Mis libros</Link></li>
          <li key={2}><Link to="/exchange">Mis peticiones</Link></li>
          <li key={3}><Link to="/search">Buscar libros</Link></li>
          <li key={4}><Link to="/" onClick={this.props.logOut}>Salir</Link></li>
        </ul>
      )
    } else {
      navComponents.push(
        <ul key={1}>
          <li key={1}><Link to="/login">Ingresar</Link></li>
          <li key={2}><Link to="/register">Registrarse</Link></li>
        </ul>
      )
    }

    return (
      <div className="nav-bar">
        {navComponents}
      </div>
    )
  }
}

export default Nav;
