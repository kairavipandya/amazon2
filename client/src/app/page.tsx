"use client";
import Navbar from "@/components/NavBar";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "clothing", img: "/womenclothing.svg" },
  { name: "books", img: "/images.jpeg" },
  { name: "electronics", img: "/electronics.svg" },
  { name: "homeAndKitchen", img: "/decor.svg" },
];

export default function HomePage() {
  return (
    <div className="bg-primary min-h-screen font-sans text-[#111]">
      <Navbar />

      <main className="px-6 py-12 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative bg-secondary/90 rounded-2xl overflow-hidden shadow-lg min-h-[250px] flex items-end p-8">
            <Image
              src="/eastereggs.svg"
              alt="Easter Eggs"
              fill
              className="object-cover opacity-20"
            />
            <div className="relative z-10 text-white space-y-2">
              <h2 className="text-3xl font-bold">Shop for EASTER</h2>
              <p className="text-md">Decorations, Eggs, Baskets, Chocolate</p>
            </div>
          </div>

          <div className="relative bg-[#A5C9CA] rounded-2xl overflow-hidden shadow-lg min-h-[250px] flex items-end p-8">
            <Image
              src="/easterbasket.svg"
              alt="Easter Basket"
              fill
              className="object-cover opacity-20"
            />
            <div className="relative z-10 text-white space-y-1">
              <p className="text-xl font-semibold">Personalized Baskets</p>
              <p className="text-sm">Shop now for Easter gifts!</p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section>
          <h3 className="text-2xl font-semibold mb-6 text-center">Shop the Most Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((item, i) => (
              <Link
                key={i}
                href={`/category/${item.name}`}
                className="group flex flex-col items-center p-4 bg-white rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-md font-semibold capitalize group-hover:text-secondary transition">{item.name.replace(/([A-Z])/g, ' $1')}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
