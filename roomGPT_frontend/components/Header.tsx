"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "../utils/auth";

interface HeaderProps {
  variant?: "full" | "minimal";
}

export default function Header({ variant = "full" }: HeaderProps) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("用户");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sync = () => {
      const user = getCurrentUser();
      setIsLoggedIn(Boolean(user));
      setCurrentUserName(user?.name || "用户");
    };
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", closeOnOutsideClick);
    return () => window.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setIsLoggedIn(false);
    setCurrentUserName("用户");
    router.push("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[rgba(93,74,50,0.22)] bg-[rgba(248,242,232,0.88)] backdrop-blur-xl shadow-soft-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 xs:flex-row sm:px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="relative h-12 w-12 overflow-hidden rounded-2xl border border-[rgba(93,74,50,0.24)] bg-[linear-gradient(145deg,rgba(255,252,245,0.95),rgba(238,225,206,0.8))] p-2"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(175,135,80,0.34),transparent_55%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
            <Image
              alt="Lumière logo"
              src="/bed.svg"
              className="relative h-full w-full"
              width={24}
              height={24}
            />
          </motion.div>
          <motion.h1
            className="font-display text-3xl font-semibold tracking-tight text-accent transition-colors duration-300 group-hover:text-[#7f623e] sm:text-4xl"
            whileHover={{ scale: 1.02 }}
          >
            Lumière
          </motion.h1>
        </Link>

        {/* 导航链接 - 仅在 full 模式显示 */}
        {variant === "full" && (
          <nav className="hidden items-center gap-8 rounded-full border border-[rgba(93,74,50,0.18)] bg-[rgba(255,251,244,0.68)] px-7 py-2.5 backdrop-blur md:flex">
            <Link
              href="/"
              className="link-animated font-body text-sm font-medium text-text-secondary hover:text-accent"
            >
              首页
            </Link>
            <Link
              href={isLoggedIn ? "/dream" : "/auth?redirect=/dream"}
              className="link-animated font-body text-sm font-medium text-text-secondary hover:text-accent"
            >
              设计空间
            </Link>
            <Link
              href="/#about"
              className="link-animated font-body text-sm font-medium text-text-secondary hover:text-accent"
            >
              关于我们
            </Link>
          </nav>
        )}

        {isLoggedIn ? (
          <div ref={menuRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex items-center gap-3 rounded-full border border-[rgba(93,74,50,0.2)] bg-[rgba(255,251,244,0.72)] px-5 py-2.5 text-sm font-medium text-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgba(255,251,244,0.95)] hover:shadow-soft font-body"
            >
              <span className="max-w-[140px] truncate">{currentUserName}</span>
              <svg
                className={`h-4 w-4 transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 z-50 mt-3 w-48 overflow-hidden rounded-2xl border border-[rgba(93,74,50,0.2)] bg-[rgba(255,251,244,0.96)] shadow-soft-lg backdrop-blur"
              >
                <Link
                  href="/dream"
                  onClick={() => setMenuOpen(false)}
                  className="block px-5 py-3 text-sm font-body text-accent transition-colors hover:bg-[rgba(93,74,50,0.08)]"
                >
                  进入设计空间
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full px-5 py-3 text-left text-sm font-body text-accent transition-colors hover:bg-[rgba(93,74,50,0.08)]"
                >
                  退出账号
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <Link
            href="/auth?redirect=/dream"
            className="hidden sm:inline-flex items-center rounded-full border border-[rgba(93,74,50,0.2)] bg-[rgba(255,251,244,0.74)] px-6 py-2.5 text-sm font-medium text-accent transition-all duration-300 hover:-translate-y-0.5 hover:bg-[rgba(255,251,244,0.95)] hover:shadow-soft font-body"
          >
            登录
          </Link>
        )}
      </div>
    </header>
  );
}
