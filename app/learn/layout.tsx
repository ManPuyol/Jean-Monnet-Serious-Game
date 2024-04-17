import Link from "next/link";
import {
  Bell,
  Plus,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            {/* <Link href="#" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Jean Monnet</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1">
            <div className=" flex px-4 justify-between">
              <span className="font-semibold ">
              Subjects
              </span>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            </div>
             <nav className="grid items-start px-2 text-sm font-medium lg:px-4 ">
              <Link
                href="#"
                className="flex-none items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary truncate"
              >
                Política de Telecomunicaciones en la UE y Sociedad de la Información
              </Link>
              <Link
                href="#"
                className="flex-none items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary truncate"
              >
                Orders Lorem ipsum dolor sit amet consectetur adipisicing elit. At reiciendis expedita esse ratione cupiditate modi optio aliquam quaerat magni omnis? Aperiam voluptatibus molestias totam minima exercitationem vero sunt non dolor tenetur. Culpa reprehenderit quam aperiam, voluptatibus ea tenetur maxime omnis corrupti quia fugit, eaque sunt. Rem magnam soluta laboriosam quidem.
  
              </Link>
              <Link
                href="#"
                className="flex-none items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary truncate"
              >
                Products Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, neque? Sit, nam? Cupiditate doloremque eius saepe sit rerum assumenda aperiam ratione, maiores at odit tenetur earum officia reprehenderit, delectus odio maxime a perferendis magni nemo adipisci necessitatibus. Iure, eligendi laboriosam!
              </Link>
              <Link
                href="#"
                className="flex-none items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary truncate"
              >
                Customers Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus veniam quis qui asperiores expedita odit?
              </Link>
              <Link
                href="#"
                className="flex-none items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary truncate"
              >
                Analytics Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda veritatis, nemo ea illum asperiores corporis qui sunt debitis saepe molestiae natus autem iusto accusantium commodi voluptates exercitationem explicabo! Ipsum, eveniet!
              </Link>
            </nav> 
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex end justify-between md:justify-end h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  Subjects
                </Link>
                
              </nav>
            </SheetContent>
          </Sheet>
          {/* <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </div>
    </div>
  );
}
