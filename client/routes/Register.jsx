const React = require('react');
import { Navigate } from "react-router-dom";

class Register extends React.Component {

  register = (e) => {
    e.preventDefault();
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        passwordconfirm: document.getElementById('passwordconfirm').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
      })
    }).then(response => response.json())
      .then(data => {
        return this.props.changeState(data)
      });
  }

  render() {
    let { loggedIn, error } = this.props;
    return (
      <div className="usercred-box">
        {loggedIn && <Navigate to="/" replace={true} />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="usercred-title">Terravita</div>
        <form className="usercred-form">
          <input type="text" placeholder="Nombre de usuario" name="username" id="username" required />
          <input type="password" placeholder="Contraseña" name="password" id="password" required />
          <input type="password" placeholder="Confirmar contraseña" name="passwordconfirm" id="passwordconfirm" required />
          <input type="email" placeholder="Correo" name="email" id="email" required />
          <input type="phone" placeholder="Número de teléfono" name="phone" id="phone" required />
          <input type="text" placeholder="Código postal" name="address" id="address" required />
          <input type="submit" value="Register" onClick={this.register} />
        </form>
      </div>
    )
  }
}

export default Register;








