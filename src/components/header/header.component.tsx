import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='container'>
      <header>
        <ul className='menu'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/trendings'>Trendings</Link>
          </li>
        </ul>
      </header>
    </div>
  )
}

export default Header
