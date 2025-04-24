import React from "react";
import ClothingItem from "./ClothingItem";

const clothes = [
  {
    id: 1,
    name: "Shirt",
    image: "/clothing/shirt.png",
  },
  {
    id: 2,
    name: "Pants",
    image: "/clothing/pant.png",
  },
  {
    id: 3,
    name: "Shoes",
    image: "/clothing/shoes.png",
  },
  {
    id: 4,
    name: "Hat",
    image: "/clothing/hat.png",
  },
];

export default function DraggableClothingItems() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#f3f4f6",
      }}
    >
      {clothes.map((item) => (
        <ClothingItem key={item.id} item={item} />
      ))}
    </div>
  );
}