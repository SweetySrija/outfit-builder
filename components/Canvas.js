import { useState } from "react";
import { useDrop } from "react-dnd";
import { useStore } from "../store/useStore";
import styles from './Canvas.module.css';

export default function Canvas() {
  const [droppedItems, setDroppedItems] = useState({});
  const [saved, setSaved] = useState(false);
  const addToCart = useStore((state) => state.addToCart);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "clothingItem",
    drop: (item) => toggleItem(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const toggleItem = (item) => {
    setDroppedItems((prev) => {
      const updated = { ...prev };
      if (updated[item.name]) {
        delete updated[item.name];
      } else {
        updated[item.name] = item;
      }
      return updated;
    });
  };

  const resetCanvas = () => setDroppedItems({});

  const saveOutfit = () => {
    console.log("Outfit saved:", droppedItems);
    setSaved(true);
    setTimeout(() => setSaved(false), 5000);
  };

  const clothingTypes = ["hat", "shirt", "pant", "shoes"];

  return (
    <div>
      <h1 className={styles.heading}>Outfit Builder</h1>

      <div className={styles.layoutContainer}>
        <div className={styles.sidebar}>
          <h2 className={styles.subHeading}>Select Your Clothing</h2>
          <div className={styles.verticalItems}>
            {clothingTypes.map((type) => (
              <img
                key={type}
                src={`/clothing/${type}.png`}
                alt={type}
                className={styles.clothingImg}
                onClick={() =>
                  toggleItem({ name: type, image: `/clothing/${type}.png` })
                }
              />
            ))}
          </div>
        </div>

        
        <div
          ref={drop}
          className={styles.canvas}
          style={{ backgroundColor: isOver ? "#f0f0f0" : "#fff" }}
        >
          <h2 className={styles.subHeading}>Your Outfit</h2>
          <div style={{ position: "relative", height: "400px" }}>
            {clothingTypes.map((type, index) => {
              const item = droppedItems[type];
              return (
                item && (
                  <img
                    key={type}
                    src={item.image}
                    alt={item.name}
                    style={{
                      position: "absolute",
                      top: `${index * 90}px`,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "80px",
                      height: "80px",
                    }}
                  />
                )
              );
            })}
          </div>
        </div>
      </div>


      <div className={styles.buttonContainer}>
        {saved && <div className={styles.savedText}>Saved!</div>}

        <button className={styles.actionButton} onClick={resetCanvas}>
          Reset
        </button>

        <button className={styles.actionButton} onClick={saveOutfit}>
          Save Outfit
        </button>

        <button
          className={styles.actionButton}
          onClick={() => {
            Object.values(droppedItems).forEach((item) => {
              addToCart(item);
            });
            console.log("Added to cart");
          }}
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}