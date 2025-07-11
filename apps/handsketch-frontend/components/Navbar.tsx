
import  Link  from 'next/Link'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    
  return (
    <div className='bg-zinc-900 ' >
        


        <nav className='w-full py-6 flex mx-auto items-center gap-x-3 justify-between text-white'>
        <Link  className="ml-32" href={'/'}>Logo</Link>
    

        <ul className='flex items-center px-4 gap-x-3 mr-32 '>
            <li>
                <Link href={'/'}>Home</Link>
                
            </li>
            <li>
                <Link href={'/signup'}>Signup</Link>
            </li>
            <li>
                <Link href={'/signin '}>Login</Link>
            </li>

        </ul>
        </nav>
    </div>
  )
}

export default Navbar