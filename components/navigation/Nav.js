import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <div className="navigation">
       <Link href="/">
        <a className="btn">Home</a>
      </Link>
      <Link className="btn" href="/customers">
        <a className="btn">Customers</a>
      </Link>
      <Link href="/products">
        <a className="btn">Produkty</a>
      </Link>
      <Link href="/purchases">
        <a className="btn">Nákupy</a>
      </Link>
    </div>
  )
}

export default Nav