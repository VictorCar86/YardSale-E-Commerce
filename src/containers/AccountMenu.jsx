import React from 'react'
import { Link } from 'react-router-dom'

const AccountMenu = () => {
  return (
    <section className='absolute w-[140px] px-5 pt-5 bg-white border-[1px] border-very-light-pink rounded-md text-black'>
        <ul className=''>
            <li className='font-bold text-base pb-5 text-end'>
                <Link to={""}>
                    My orders
                </Link>
            </li>
            <li className='font-bold text-base pb-5 text-end border-b-[1px] border-very-light-pink'>
                <Link to={""}>
                    My account
                </Link>
            </li>
            <li className='text-hospital-green h-[60px] pt-5 text-sm text-end'>
                <Link to={""}>
                    Sign out
                </Link>
            </li>
        </ul>
    </section>
  )
}

export default AccountMenu