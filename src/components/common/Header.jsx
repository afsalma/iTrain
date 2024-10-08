import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import HamburgerIcon from "./HamburgerIcon";
import { usePathname } from "next/navigation";

const NavLinks = ({ children, className, href, onClick, isActive }) => {
  return (
    <Link
      onClick={onClick}
      className={`${className} hover:text-textHoverColor ${
        isActive ? "text-textHoverColor" : ""
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "About",
      link: "/about",
    },
    {
      text: "Courses",
      link: "/courses",
    },
    {
      text: "Contact",
      link: "/contact-us",
    },
  ];


  return (
    <header className="bg-primary px-5 md:px-20 lg:px-40 xl:px-[194px] flex items-center justify-between text-textColor">
      {/* logo  */}
      <Link href={'/'}>
        <Image
          src="/images/Logo/i train LOGO (WHITE)-01.png"
          alt="i train logo"
          width={200}
          height={200}
          loading="lazy"
          className="w-[150px] lg:w-[200px]"
        />
      </Link>

      {/* HamburgerIcon  */}
      <HamburgerIcon
        isOpen={isOpen}
        toggleOpen={setIsOpen}
        color={"white"}
        className={"z-[100] lg:hidden"}
      />

      {/* nav backdrop  */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed top-0 left-0 bg-[#000000a0] w-screen h-screen z-[49] backdrop-blur-md transition-all duration-500 ${
          !isOpen && "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* nav */}
      <div
        className={`fixed top-0 right-0 z-50 bg-secondary w-[90%] h-screen p-10 pt-20 transition-all duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:static lg:w-auto lg:h-auto lg:bg-transparent lg:right-auto lg:top-auto lg:translate-x-0  lg:p-0`}
      >
        <nav className="grid gap-[40px] lg:grid-flow-col lg:place-items-center">
          {navLinks.slice(0, 3).map((item, index) => (
            <NavLinks
              isActive={pathname === item.link}
              onClick={() => setIsOpen(false)}
              key={`nav_item_${index}`}
              href={item.link}
            >
              {item.text}
            </NavLinks>
          ))}
          <NavLinks onClick={() => setIsOpen(false)} href={navLinks[3].link}>
            <Button
              bg={
                pathname === navLinks[3].link
                  ? "bg-buttonHover"
                  : "bg-secondary"
              }
              bgInvert={pathname !== navLinks[3].link}
            >
              {navLinks[3].text}
            </Button>
          </NavLinks>
        </nav>
      </div>
    </header>
  );
};

export default Header;
