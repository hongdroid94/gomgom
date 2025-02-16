import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../../app';
import { useSessionUser } from '../../shared/lib/reactquery/useSessionUser';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { data: sessionData } = useSessionUser();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            navigate('/register');
            setIsDropdownOpen(false);
        }
    };

    const handleLogin = () => {
        navigate('/register');
        setIsDropdownOpen(false);
    };

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
                                `text-lg font-medium ${isActive ? 'text-black' : 'text-gray-500'} flex items-center gap-2`
                            }
                        >
                            <img src="/icons/sample_icon.svg" alt="idea" className="w-5 h-5" />
                            아이디어
                        </NavLink>
                        <NavLink
                            to="/explore"
                            className={({ isActive }) =>
                                `text-lg font-medium ${isActive ? 'text-black' : 'text-gray-500'} flex items-center gap-2`
                            }
                        >
                            <img src="/icons/sample_icon.svg" alt="explore" className="w-5 h-5" />
                            탐색
                        </NavLink>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button 
                                className="w-5 h-5 flex items-center justify-center"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <img src="/icons/prime_user.svg" alt="user" className="w-full h-full" />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                    {sessionData?.data.user ? (
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            로그아웃
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleLogin}
                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            로그인
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <img src="/icons/tape_icon.svg" alt="tape" className="w-5 h-5" />
                            <span className="text-sm font-medium">128개</span>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
