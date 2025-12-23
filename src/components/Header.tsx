import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, Globe, ChevronDown, User, LogOut, Shield } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SearchModal from "./SearchModal";
import { useSettings } from "@/hooks/useSettings";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { setOpen, getTotalItems } = useCartStore();
  const { user, isAdmin, signOut } = useAuth();
  const { data: settings } = useSettings();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "#drops" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const currencies = ["INR", "USD", "EUR"];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed left-0 right-0 z-50 glass-strong top-0"
      >
        <div className="container-wide px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Desktop Nav */}
            {/* Left Section: Mobile Menu (left) and Desktop Nav */}
            <div className="flex items-center gap-4 md:gap-8 flex-1">
              {/* Mobile Menu Button - Moved to Left */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 text-foreground hover:text-muted-foreground transition-colors"
              >
                <Menu size={24} />
              </button>

              <nav className="hidden md:flex items-center gap-8">
                {navLinks.slice(0, 3).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-caption hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
                {user ? (
                  <>
                    {isAdmin && (
                      <button
                        onClick={() => navigate('/admin')}
                        className="text-caption hover:text-red-accent transition-colors duration-300"
                      >
                        Admin
                      </button>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="text-caption hover:text-foreground transition-colors duration-300"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="text-caption hover:text-foreground transition-colors duration-300"
                  >
                    Login
                  </Link>
                )}
              </nav>
            </div>

            {/* Logo - Centered */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 z-10">
              <img
                src="/logo-placeholder.png"
                alt="YEOUBI"
                className="h-10 md:h-12 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <h1 className="hidden text-2xl md:text-3xl font-brand font-extrabold tracking-[0.02em] uppercase">
                YEOUBI
              </h1>
            </Link>

            {/* Right Actions: Search and Cart */}
            <div className="flex items-center justify-end gap-2 md:gap-6 flex-1">
              {/* Language/Currency Selector */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 text-caption hover:text-foreground transition-colors"
                >
                  <Globe size={16} />
                  <span>EN / INR</span>
                  <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 glass-strong rounded-lg p-3 min-w-[140px]"
                    >
                      {currencies.map((curr) => (
                        <button
                          key={curr}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
                        >
                          EN / {curr}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-muted-foreground transition-colors"
              >
                <Search size={20} />
              </button>

              <button
                onClick={() => setOpen(true)}
                className="relative p-2 hover:text-muted-foreground transition-colors"
              >
                <ShoppingBag size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="border-t border-border/30 bg-background/50">
          <div className="overflow-hidden py-2">
            <div className="marquee-track whitespace-nowrap flex">
              {[...Array(10)].map((_, i) => (
                <span key={i} className="text-caption mx-8">
                  {settings?.announcement_text || "FREE SHIPPING ON ORDERS OVER ₹999 • USE CODE YEO10 FOR 10% OFF"}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-80 glass-strong z-50 p-6"
            >
              <div className="flex justify-between items-center mb-10">
                <img
                  src="/logo-placeholder.png"
                  alt="YEOUBI"
                  className="h-8 w-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <h2 className="hidden text-2xl font-brand font-extrabold tracking-[0.02em] uppercase">YEOUBI</h2>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-xl font-display font-medium hover:text-muted-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}

                <div className="pt-6 border-t border-border mt-6">
                  {user ? (
                    <div className="space-y-4">
                      <div className="text-sm text-muted-foreground px-1">{user.email}</div>
                      {isAdmin && (
                        <button
                          onClick={() => {
                            navigate('/admin');
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center gap-2 text-xl font-display font-medium text-red-accent hover:text-red-600 transition-colors w-full text-left"
                        >
                          <Shield size={20} />
                          Admin Panel
                        </button>
                      )}
                      <button
                        onClick={async () => {
                          await signOut();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 text-xl font-display font-medium hover:text-muted-foreground transition-colors w-full text-left"
                      >
                        <LogOut size={20} />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 text-xl font-display font-medium hover:text-muted-foreground transition-colors"
                    >
                      <User size={20} />
                      Login
                    </Link>
                  )}
                </div>
              </nav>
              <div className="mt-10 pt-6 border-t border-border">
                <p className="text-caption mb-4">Currency</p>
                <div className="flex gap-3">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      className="glass px-4 py-2 rounded-full text-sm hover:bg-muted transition-colors"
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
