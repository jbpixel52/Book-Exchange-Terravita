import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import regeneratorRuntime from 'regenerator-runtime';

// ExchangeRow
// MyBookRow
// Nav
// SearchBookRow
// Exchange
// Login
// MyPage
// NotFound
// Register
// Root
// Search


import App from '../client/App.jsx';
import Nav from '../client/components/Nav.jsx';
import Login from '../client/routes/Login.jsx';
import Register from '../client/routes/Register.jsx';

describe('Testing React Components', () => {
  describe('Homepage', () => {

    // beforeAll(() => {
    //     component = render(<Nav />);
    // })

    xtest('Displays page title', () => {
      render(<App />)
      expect(screen.getByText(/The Book Exchange/i)).toBeInTheDocument()
    })
  })
  
  describe('Navbar', () => {
    let loggedIn = false;
    xtest('Displays login when loggedIn is false', () => {
        render(
        <Router>
          <Nav loggedIn={loggedIn}/>
          </Router>
          )
        expect(screen.getByText(/Login/i)).toBeInTheDocument()
    })
    xtest('Displays register when loggedIn is false', () => {
        render(
          <Router>
          <Nav loggedIn={loggedIn}/>
          </Router>
          )
        expect(screen.getByText(/Register/i)).toBeInTheDocument()
    })

    loggedIn = true;
    xtest('Displays Home, My Books, My Requests, Find Books, and Log Out when loggedIn is true', () => {
        render(
        <Router>
          <Nav loggedIn={loggedIn}/>
          </Router>
          )
        expect(screen.getByText(/Home/i)).toBeInTheDocument()
        expect(screen.getByText(/My Books/i)).toBeInTheDocument()
        expect(screen.getByText(/My Requests/i)).toBeInTheDocument()
        expect(screen.getByText(/find books/i)).toBeInTheDocument()
        expect(screen.getByText(/Log out/i)).toBeInTheDocument()
    })
  })
  describe('Logging Out', () => {
      let loggedIn = true;
      const logOut = () => {
        return loggedIn = false;
      }
      test('Displays correct Nav when user clicks Logout', async () => {
        render( 
        <Router>
            <Nav logOut={logOut} loggedIn={loggedIn}/>
        </Router>
        )
        const user = userEvent.setup()
        await user.click(screen.getByText(/Log out/i))
        // after user logs out, expect to see login and regiester 
        expect(screen.getByText(/Login/i)).toBeInTheDocument()
        expect(screen.getByText(/Register/i)).toBeInTheDocument()
      })
  })

//end of parent block DONT DELETE
})
