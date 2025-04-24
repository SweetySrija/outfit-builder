import React from "react";
import { useDrag } from "react-dnd";

export default function ClothingItem({ item }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "clothing",
    item: { ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="cursor-move"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img src={item.image} alt={item.name} style={{width: "50px",height: "50px"}} />
    </div>
  );
}