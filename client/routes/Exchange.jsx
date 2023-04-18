const React = require('react');
import ExchangeRow from '../components/ExchangeRow';

class Exchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         incomingRequests: [],
         outgoingRequests: []
        };

        this.shipped = this.shipped.bind(this);
    }

    componentDidMount() {
      this.getIncomingInfo();
      this.getOutgoingInfo();
    }
      // INCOMING BOOK REQUEST
    // TO GET REQUESTED BOOK FROM OTHER USERS AND THEIR INFO
    // From database get all books belonging to the logged in user (user_id) ex -> where users_books.user_id = 1
    // Render only the books that belong to user if there is a requester id present under user_books ex -> Where users_books.requester !== null
    // Using the requester id, render the user that requested the specifc book ex -> select users where requester = 2 also, select book where isbn = "that book"
    // Are we rendering different state depending on the user logged in. 

    getIncomingInfo () {
        // What do we expect back from server?
        // We expect an array of objects representing requests.
        // The request objects should look like this:
        /* 
        {
            bookTitle: xxx,
            requesterUsername: xxx,
            requesterEmail: xxx,
        } 
        */
        fetch(`/api/getIncomingInfo/${this.props.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({incomingRequests: data})
        })
        .catch(err => {
            console.log(`Error getIncomingInfo Method ${err}`)
        })
    }

    getOutgoingInfo () {
        // What do we expect back from server?
        // We expect an array of objects representing requests.
        // The request objects should look like this:
        /* 
        {
            bookTitle: xxx,
            bookOwnerUsername: xxx,
            bookOwnerEmail: xxx,
        } 
        */
        fetch(`/api/getOutgoingInfo/${this.props.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({outgoingRequests: data})
        })
        .catch(err => {
            console.log(`Error getOutgoingInfo Method ${err}`)
        })
    }


    shipped (event) {
        const row = event.target.id; // ??? pretty sure this is right yeah probably
        const body = {
          title: this.state.incomingRequests[row].title,
          username: this.state.incomingRequests[row].userId,
        };
        // Send post request to remove row from users_books table.
        // Body of request will have book isbn and requester username.
        // Server will query database for row in users_books where isbn and requester username match request body.
        // Get Users Books table
        fetch('/api/shipped'), {
            method: 'POST',
            body: JSON.stringify(body),
        }
        // .then(response => response.json())
        .then(this.getIncomingInfo())
        .catch(err => {
            console.log(`Error in shipped function ${err}`)
        })
    }

    // OUTGOING BOOK REQUEST
    // TO GET ALL BOOKS LOGGED IN USER REQUESTED
    // Based on logged in user ID, search users_books table if logged in user ID is present under requester section


    // Map out both requested user and books data to render as request cards 
    // For Loop iteration through the data. 
      // For every iteration assign the row
      // Each property at the Ith index. 

    render () {
        return (
            <div className='exchange'>
                  {/* Incoming Request Table  */}
                  <h3 className='incoming'>Solicitudes Entrantes</h3>
                  {/* {this.state.incomingRequests.length > 0 && ( */}
                      <table class="table table-bordered">
                      <thead>
                          <tr>
                          <th scope="col">Libro pedido</th>
                          <th scope="col">Usuario</th>
                          <th scope="col">Correo</th>
                          <th scope="col">Marcado como entregado</th>
                          </tr>
                      </thead>
                      <tbody>
                          {this.state.incomingRequests.map((req, i) => {
                          return (<tr key={i}>
                              <th scope="row">{req.title}</th>
                              <td>{req.username}</td>
                              <td>{req.email}</td>
                              <td><button id={i} onClick={this.shipped}>Marcado como entregado</button></td>
                          </tr>)
                          })}
                      </tbody>
                      </table>
                  {/* )} */}
                  {/* Outgoing Request Table  */}
                  <h3 className='incoming'>Solicitudes Salientes</h3>
                  {this.state.outgoingRequests.length > 0 && (
                      <table class="table table-bordered">
                      <thead>
                          <tr>
                          <th scope="col">Libro Solicitado</th>
                          <th scope="col">Usuario</th>
                          <th scope="col">Correo</th>
                          <th scope="col">Estado de entrega</th>
                          </tr>
                      </thead>
                      <tbody>
                          {this.state.outgoingRequests.map((req, i) => {
                          return (<tr key={i}>
                              <th scope="row">{req.title}</th>
                              <td>{req.username}</td>
                              <td>{req.email}</td>
                              <td>Pending...</td>
                          </tr>)
                          })}
                      </tbody>
                      </table>
                      )}
              </div>
       )
    }
}


export default Exchange;


            // {props.data.users.map((user, index) => { 
            //    return <Dropdown.Item href={`#action/action-${index}`} eventKey={JSON.stringify(user)}>{user.name}</Dropdown.Item>
           