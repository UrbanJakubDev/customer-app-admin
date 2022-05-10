import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <div className="navigation">
      <Link href="/">
        <a className="nav-link">Home</a>
      </Link>
      |
      <Link href="/customers">
        <a className="nav-link">Zákazníci</a>
      </Link>
      |
      <Link href="/products">
        <a className="nav-link">Produkty</a>
      </Link>
      |
      <Link href="/purchases">
        <a className="nav-link">Nákupy</a>
      </Link>
    </div>
  )
}

export default Nav
