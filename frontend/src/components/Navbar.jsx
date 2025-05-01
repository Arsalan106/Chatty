import React from 'react'
import { userAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';
const Navbar = () => {
    const { logout, authUser } = userAuthStore();
    return (
        <div className='container mx-auto px-4 h-16'>
            <div className='flex items=center justify-between h-full'>
                {/* left side */}
                <div className='flex items-center gap-8'>
                    <Link to='/' className='flex gap-4 items-center hover:opacity-80 transition-all'>
                        <div className='mt-1'>
                            <MessageSquare className='w-5 h-5 text-primary'></MessageSquare>
                        </div>
                        <div>
                            Chatty
                        </div>
                    </Link>
                </div>
                {/* right side */}
                <div className='flex justify-between items-center gap-4'>
                    <Link
                        to={"/settings"}
                        className={`btn btn-sm rounded-lg gap-2 transition-colors`}
                    >
                        <Settings className='w-4 h-4' />
                        <p>Settings</p>
                    </Link>

                    {
                        authUser && authUser._id &&  (
                            <>
                                <Link
                                    to={"/profile"}
                                    className={`mr-4`}
                                >
                                    <User className='w-5 h-5' />
                                </Link>
                                <button onClick={logout} className='flex gap-4 justify-center items-center'>
                                    <span className='hidden sm:inline'>Logout</span>
                                    <LogOut className='w-5 h-5'/>
                                </button>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
