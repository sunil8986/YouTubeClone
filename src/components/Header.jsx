import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import menuicon from '../assets/menu_icon.png';
import moreicon from '../assets/more.png';
import notificationicon from '../assets/notification.png';
import uploadicon from '../assets/upload.png';
import jackicon from '../assets/jack.png';

const Header = () => {

    return (
        <div>
            <nav className="h-17.5 fixed w-full px-4 md:px-16 lg:px-12 xl:px-6 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">

                <div className="flex items-center gap-4">
                    <img src={menuicon} alt="Menu icon" className="h-6" />
                    <Link to="/" className="text-2xl font-bold"><img src={Logo} alt="Logo" className="h-8" /></Link>
                </div>

                <input type="text" placeholder="Search" className="hidden md:inline w-1/2 h-11 rounded-full border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

                <ul className="flex space-y-4 gap-2 md:gap-4 lg:gap-4 xl:gap-4 text-lg">
                        <li><Link to="/"><img src={moreicon} alt="Logo" className="h-6" /></Link></li>
                        <li><Link to="/services" ><img src={notificationicon} alt="Logo" className="h-6" /></Link></li>
                        <li><Link to="/portfolio"><img src={uploadicon} alt="Logo" className="h-6" /></Link></li>
                        <li><Link to="/pricing" ><img src={jackicon} alt="Logo" className="h-6 rounded-full" /></Link></li>
                    </ul>


                <div className="mobile-menu absolute top-17.5 left-0 w-full bg-white p-6 hidden md:hidden">
                    <ul className="flex flex-col space-y-4 text-lg">
                        <li><Link to="/" className="text-sm"><img src={moreicon} alt="Logo" className="h-8" /></Link></li>
                        <li><Link to="/services" className="text-sm"><img src={notificationicon} alt="Logo" className="h-8" /></Link></li>
                        <li><Link to="/portfolio" className="text-sm"><img src={uploadicon} alt="Logo" className="h-8" /></Link></li>
                        <li><Link to="/pricing" className="text-sm"><img src={jackicon} alt="Logo" className="h-8" /></Link></li>
                    </ul>

                    <button type="button" className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full">
                        Get started
                    </button>
                </div>
            </nav>

        </div>
    )
}

export default Header