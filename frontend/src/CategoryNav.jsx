import React, { useRef, useState } from "react";
import {
  Grid2x2,
  TrendingUp,
  BedDouble,
  Building2,
  Mountain,
  Castle,
  Waves,
  Tent,
  Tractor,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Building,
  Palmtree,
  Home,
  Sailboat,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "All", icon: Grid2x2 },
  { name: "Trending", icon: TrendingUp },
  { name: "Hotel", icon: Building},
  { name: "Rooms", icon: BedDouble },
  { name: "Iconic Cities", icon: Building2 },
  { name: "Mountains", icon: Mountain },
  { name: "Castles", icon: Castle },
  { name: "Amazing Pools", icon: Waves },
  { name: "Camping", icon: Tent },
  { name: "Farms", icon: Tractor },
  { name: "Beach", icon: Palmtree},
  { name: "Villas", icon: Home},
  { name: "Boats", icon: Sailboat}
];

export default function CategoryBar({selectedCategory, setSelectedCategory}) {
  const scrollRef = useRef(null);

  const navigate = useNavigate();

  const handleCategory = (category) => {
    setSelectedCategory(category);
    navigate(`/listings/listings/category/${category}`);
  }

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -250 : 250,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-28 z-40 bg-white border-b border-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto lg:px-8 py-3">
        <div className="flex items-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={() => handleScroll("left")}
            className="flex lg:hidden items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Categories */}
          <div
            ref={scrollRef}
            className="flex-1 flex gap-12 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {categories.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  onClick={() => handleCategory(item.name)}
                  className={`
                    flex flex-col items-center
                    min-w-fit
                    pb-2
                    transition-all
                    duration-200
                    group
                    ${
                      selectedCategory === item.name
                        ? "text-black border-b-2 border-black"
                        : "text-gray-400 border-b-2 border-transparent"
                    }
                  `}
                >
                  <Icon
                    size={22}
                    className="text-gray-600 group-hover:scale-110 hover:text-blue-700 transition-transform"
                  />

                  <span className="mt-1 text-xs text-gray-600 font-medium whitespace-nowrap">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll("right")}
            className="flex lg:hidden items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition"
          >
            <ChevronRight size={18} />
          </button>

          {/* Filter Button */}
          <button
            className="
              flex items-center gap-2
              px-4 py-2
              font-medium
              rounded-2xl
              text-gray-100
              bg-blue-700
              hover:bg-gray-700
              shadow-md
              hover:shadow-lg
              hover:scale-105 duration-300
              transition-all
              whitespace-nowrap
            "
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:block text-sm font-medium">
              Filters
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}