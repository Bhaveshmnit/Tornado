import React, { useState, useEffect } from 'react';

const SmallMenu= ({data}) => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const toggleMenu = () => {
                setIsMenuOpen(!isMenuOpen);
        };

        const handleClickOutside = (event) => {
                const menuElement = document.getElementById('menu');
                if (!menuElement?.contains(event.target)) {
                        setIsMenuOpen(false);
                }
        };

        useEffect(() => {
                document.addEventListener('mousedown', handleClickOutside);
                return () => {
                        document.removeEventListener('mousedown', handleClickOutside);
                };
        }, []);

        return (
                <div className="justify-center flex">
                        <div className='fixed bottom-4 justify-center flex' >
                                <div>
                                        {/* Button to toggle the menu */}
                                        {!isMenuOpen &&
                                                <button onClick={toggleMenu} className="bg-[#3d4c7d] text-white px-4 py-2 rounded">
                                                        Open Menu
                                                </button>
                                        }
                                </div>
                                {/* Menu content */}
                                {isMenuOpen && (
                                        <div id="menu" className="fixed bottom-16 w-4/12 bg-black opacity-100 p-1 rounded shadow-md">
                                                {/* Actual menu box */}
                                                <div className=" bg-[#d2bcb0]  p-4  rounded h-60 overflow-y-auto">
                                                        {/* Fixed height for the menu, overflow-y for scrolling */}
                                                        <h2 className='font-bold text-xl text-[#4f443e] flex justify-center'>Menu</h2>
                                                        <ul className='p-2 text-gray-500' >
                                                                {
                                                                        data.map((r)=>(
                                                                                <li className='flex justify-between text-black font-serif'><div>{r.title}</div> <div>{r.itemCards.length}</div></li>
                                                                        ))
                                                                }
                                                        </ul>
                                                </div>
                                        </div>
                                )}
                        </div>
                </div>
        );
};

export default SmallMenu;
