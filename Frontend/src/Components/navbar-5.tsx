"use client";
import { Link as ScrollLink } from "react-scroll";
import { MenuIcon } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "@/axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import { Button } from "@/Components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";

const Navbar5 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to check authentication status with the backend
    const checkAuthStatus = async () => {
      try {
        const res = await api.get("/me");

        if (res?.data?.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          setIsLoggedIn(false);
        } else {
          console.error("Auth check failed:", error);
          setIsLoggedIn(false);
        }
      }
    };

    // Initial check when the component mounts
    checkAuthStatus();

    // Set up a custom event listener for when a login is successful
    // This allows other components (like your login page) to notify Navbar5
    const handleLoginSuccess = () => {
      checkAuthStatus(); // Re-run the auth check when login event is received
    };

    window.addEventListener("loginSuccess", handleLoginSuccess);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("loginSuccess", handleLoginSuccess);
    };
  }, []); // Empty dependency array means this effect runs once on mount and on unmount cleanup

  const features = [
    {
      title: "Dashboard",
      description: "Overview of your activity",
      href: "/dashboard",
    },
    {
      title: "AI",
      description: "Chat with our AI",
      href: "/analytics",
    },
  ];

  const handleLogout = async () => {
    try {
      const res = await api.get("/logout");

      if (res.status === 200) {
        console.log("✅ Logged out successfully from the server.");
        setIsLoggedIn(false); // Update auth state
        navigate("/login"); // Redirect to login
      } else {
        console.error("⚠️ Logout failed:", res.statusText);
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (err) {
      console.error("🚫 Error during logout API call:", err);
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  return (
    <section className="px-4 py-1.5 fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="m-auto container w-screen">
        <nav className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img
              height={100}
              width={40}
              src="https://www.luxstay.live/wp-content/uploads/2022/12/Logo-3-e1672265139301.png"
              className="max-h-8"
              alt="Shadcn UI Navbar"
            />
            <span className="text-lg font-semibold tracking-tighter">
              LuxStay
            </span>
          </a>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-3">
                    {features.map((feature, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink asChild>
                          <RouterLink
                            to={feature.href}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70 block"
                          >
                            <div className="font-semibold">{feature.title}</div>
                            <p className="text-sm text-muted-foreground">
                              {feature.description}
                            </p>
                          </RouterLink>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  href="/rooms"
                  className={navigationMenuTriggerStyle()}
                >
                  <ScrollLink
                    activeClass="active"
                    to="Page2"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Rooms
                  </ScrollLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  <ScrollLink
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    duration={500}
                    to="host"
                  >
                    Host
                  </ScrollLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  href="/contact-us"
                  className={navigationMenuTriggerStyle()}
                >
                  <ScrollLink
                    activeClass="active"
                    to="Page3"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Contact-Us
                  </ScrollLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {isLoggedIn ? (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <RouterLink to="/login">
                  <Button variant="outline">Sign in</Button>
                </RouterLink>
                <RouterLink to="/signup">
                  <Button>Start for free</Button>
                </RouterLink>
              </>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <a href="/" className="flex items-center gap-2">
                    <img
                      src="https://www.luxstay.live/wp-content/uploads/2022/12/Logo-3-e1672265139301.png"
                      className="max-h-8"
                      alt="Shadcnblocks"
                    />
                    <span className="text-lg font-semibold tracking-tighter">
                      LuxStay
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  <AccordionItem value="solutions" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">
                      Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2">
                        {features.map((feature, index) => (
                          <a
                            href={feature.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                          >
                            <div key={feature.title}>
                              <p className="mb-1 font-semibold text-foreground">
                                {feature.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-6 pointer cursor-pointer">
                  <ScrollLink
                    activeClass="active"
                    to="Home"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Home
                  </ScrollLink>
                  <ScrollLink
                    activeClass="active"
                    to="Page2"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Rooms
                  </ScrollLink>
                  <ScrollLink
                    activeClass="active"
                    to="Page3"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Contact-Us
                  </ScrollLink>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {!isLoggedIn ? (
                    <>
                      <RouterLink to="/login">
                        <Button variant="outline">Sign in</Button>
                      </RouterLink>
                      <RouterLink to="/signup">
                        <Button>Start for free</Button>
                      </RouterLink>
                    </>
                  ) : (
                    <Button variant="outline" onClick={handleLogout}>
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar5;
