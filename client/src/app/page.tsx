import Navbar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Image from "next/image";

const categories = [
  { name: "Women’s Clothing", img: "/womenclothing.svg" },
  { name: "Men’s Clothing", img: "/menclothing.svg" },
  { name: "Electronics", img: "/electronics.svg" },
  { name: "Home Decor", img: "/decor.svg" },
];

export default function HomePage() {
  return (
    <div className="bg-[#F2EAE0] min-h-screen font-sans text-[#111]">
      <Navbar />

      <main className="px-6 py-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative bg-[#E9A8B3] rounded-2xl overflow-hidden shadow-md min-h-[200px] flex items-end p-6">
            <Image
              src="/eastereggs.svg"
              alt="Easter Eggs"
              fill
              className="object-cover opacity-30"
            />
            <div className="relative z-10 text-white">
              <h2 className="text-2xl font-bold">Shop for EASTER</h2>
              <p className="text-sm">Decorations, Eggs, Baskets, Chocolate</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-md h-[200px]">
            <Image
              src="/easterbasket.svg"
              alt="Easter Basket"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white drop-shadow font-medium text-sm">
              <p className="text-base">Personalized Baskets</p>
              <p className="text-xs">Shop now</p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Shop the most popular categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative w-full h-[120px] rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-semibold mt-2 text-center">{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
