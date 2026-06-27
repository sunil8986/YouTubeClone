import React from 'react'
import { categories, subscriptions } from '../assets/assets'

const Navbar = ({categ, setCateg}) => {
  return (
    <div className="w-60 bg-white p-4 pt-24 border-r fixed border-gray-300 h-screen overflow-y-auto">
        {
            categories.map((category) => (
                <div key={category.id} className={`flex items-center space-x-2 p-2 
                    cursor-pointer ${categ === category.id ? 'bg-gray-100 text-white' : ''}`} onClick={() => setCateg(category.id)}>
                    <img src={category.icon} alt={category.name} className="w-6 h-6" />
                    <span className={`text-sm ${categ === category.id ? ' text-black font-bold' : 'text-black'}`}>{category.name}</span>
                </div>
            ))
        }
        <div>
            <h1 className="text-sm font-semibold mt-4 mb-2">Subscriptions</h1>
        </div>
        {
            subscriptions.map((subscription) => (
                <div key={subscription.id} className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
                    <img src={subscription.avatar} alt={subscription.name} className="w-6 h-6 rounded-full" />
                    <span className="text-sm text-black">{subscription.name}</span>
                </div>
            ))
        }
    </div>
  )
}

export default Navbar