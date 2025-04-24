import dynamic from "next/dynamic";
import DraggableClothingItems from "../components/DraggableClothingItem";
import Cart from "../components/Cart";

const Canvas = dynamic(() => import("../components/Canvas"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* This contains sidebar and canvas */}
      <Canvas />

      <Cart />
    </div>
  );
}