import { GIcon } from '../../shared/ui';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="w-full border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                <nav className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center">
                        <img src="/images/gomgom_logo.svg" alt="GomGom" className="h-8 w-auto" />
                    </Link>
                    
                    <div className="flex gap-8">
                        <NavLink 
                            to="/idea" 
                            className={({ isActive }) => 
                                `text-lg font-medium ${isActive ? 'text-black' : 'text-gray-500'}`
                            }
                        >
                            아이디어
                        </NavLink>
                        <NavLink 
                            to="/explore" 
                            className={({ isActive }) => 
                                `text-lg font-medium ${isActive ? 'text-black' : 'text-gray-500'}`
                            }
                        >
                            탐색
                        </NavLink>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center gap-2">
                            <img src="/icons/tape_icon.svg" alt="tape" className="w-5 h-5" />
                            <span className="text-sm font-medium">128</span>
                        </div>
                        
                        <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <i className="pi pi-user text-gray-600"></i>
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header; 