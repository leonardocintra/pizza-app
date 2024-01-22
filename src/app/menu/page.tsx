"use client";

import { useEffect, useState } from "react";
import { CategoryDocument } from "../models/Category";
import { MenuItemDocument } from "../models/MenuItem";
import SectionHeaders from "../components/layout/SectionHeaders";
import MenuItem from "../components/menu/MenuItem";

export default function MenuPage() {
  const [categories, setCategories] = useState<CategoryDocument[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemDocument[]>([]);

  useEffect(() => {
    fetch("/api/categories").then((response) => {
      response.json().then((data: CategoryDocument[]) => {
        setCategories(data);
      });
    });

    fetch("/api/menu-items").then((response) => {
      response.json().then((data: MenuItemDocument[]) => {
        setMenuItems(data);
      });
    });
  }, []);

  return (
    <section className="mt-8">
      {categories.length > 0 &&
        categories.map((category) => (
          <div key={category._id} className="">
            <SectionHeaders mainHeader={""} subHeader={category.name} />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {menuItems
                ?.filter((item) => item.category === category._id)
                .map((item) => (
                  <MenuItem item={item} key={item._id} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
