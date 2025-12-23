import type {ReactNode} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { env } from '@config/env';
import {FloatingChatButton} from "@features/floating-chat/FloatingChatButton.tsx";

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isRoadmapPage = location.pathname === '/roadmap';

    // 홈페이지와 로드맵 페이지에서는 자체 상단바 사용
    const hideHeader = isHomePage || isRoadmapPage;

    const navLinks = [
        { path: '/', label: '홈' },
        { path: '/roadmap', label: '로드맵' },
        { path: '/major-intro', label: '전공 소개' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 홈페이지와 로드맵 페이지가 아닐 때만 헤더 표시 */}
            {!hideHeader && (
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <Link to="/" className="text-xl font-bold text-blue-600">
                                    {env.appTitle}
                                </Link>
                            </div>
                            <nav className="flex space-x-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            location.pathname === link.path
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </header>
            )}

            {/* 홈페이지와 로드맵 페이지일 때는 padding 제거 */}
            <main className={!hideHeader ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" : ""}>
                {children}
            </main>
            <FloatingChatButton />

            {/* 홈페이지와 로드맵 페이지가 아닐 때만 푸터 표시 */}
            {!hideHeader && (
                <footer className="bg-white border-t mt-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <p className="text-center text-sm text-gray-500">{env.appDescription}</p>
                    </div>
                </footer>
            )}
        </div>
    );
}