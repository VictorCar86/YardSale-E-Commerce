import { Link } from 'react-router-dom'

const AccountMenu = ({ customRef }) => {
  return (
    <section className='absolute right-0 w-[140px] px-5 pt-5 bg-white border-[1px] border-very-light-pink rounded-md text-black' ref={customRef}>
        <ul className=''>
            <li className='font-bold text-base pb-5 text-end'>
                <Link to={''}>
                    My orders
                </Link>
            </li>
            <li className='font-bold text-base pb-5 text-end border-b-[1px] border-very-light-pink'>
                <Link to={'/my-account'}>
                    My account
                </Link>
            </li>
            <li className='text-hospital-green h-[60px] pt-5 text-sm text-end'>
                <Link to={''}>
                    Sign out
                </Link>
            </li>
        </ul>
    </section>
  )
}

export default AccountMenu