"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/old/ui/sheet"
import { navLinks } from "@/constants/old"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import { ModeToggle } from "../ui/mode-toggle"

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={50}
          height={50}
        />
        <h1 className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-900 to-blue-950 drop-shadow-lg">Skynetic</h1>
      </Link>

      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="logo"
                  width={152}
                  height={23}
                />

                <ul className="header-nav_elements">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname

                    return (
                      <li
                        className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-blue-700`}
                        key={link.route}
                      >
                        <Link className="sidebar-link cursor-pointer" href={link.route}>
                          <Image
                            src={link.icon}
                            alt="logo"
                            width={24}
                            height={24}
                          />
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button asChild className="button bg-blue-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
          <ModeToggle />
        </SignedOut>
      </nav>
    </header>
  )
}

export default MobileNav
