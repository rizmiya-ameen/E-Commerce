import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from '@/actions/getCurrentUser'
import SearchBar from "./SearchBar";
import Categories from "./Categories";
import { Suspense } from "react";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"]})

export const NavBar = async () => {

  const currentUser = await getCurrentUser()

  return <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
    <div className="py-4 border-b-[1px]">
      <Container>
        <div className="flex items-center justify-between gap-3 md:gap-0">
          <Link href="/" className={`${redressed.className} font-bold text-2xl`}>
            ElectroSwift
          </Link>

          <div className="hidden md:flex flex-1 justify-center">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>

          <div className="flex items-center gap-8 md:gap-12">
            <CartCount />
            <UserMenu currentUser={currentUser}/>
          </div>

        </div>
      </Container>
    </div>

    <Suspense>
      <Categories />
    </Suspense>
  </div>;
};
