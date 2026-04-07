import { Download, RotateCw, Sticker, Type, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { useStore } from "../context/StoreContext";

const stickerChoices = ["STAR", "V", "ROSE", "WAVE"];

export function CustomizeStudio({ product, onUseDesign }) {
  const { saveDesign } = useStore();
  const [productType, setProductType] = useState(product.id.includes("hoodie") ? "hoodie" : "tee");
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [textDraft, setTextDraft] = useState("VEL");
  const [draggingId, setDraggingId] = useState(null);

  const selected = elements.find((item) => item.id === selectedId);
  const previewClass = useMemo(() => productType, [productType]);

  const addSticker = (content) =>
    setElements((prev) => [
      ...prev,
      { id: `el-${Date.now()}`, type: "sticker", content, x: 36, y: 28, size: 68, rotation: 0 },
    ]);

  const addText = () =>
    setElements((prev) => [
      ...prev,
      { id: `el-${Date.now()}`, type: "text", content: textDraft || "Veloura", x: 32, y: 46, size: 34, rotation: 0 },
    ]);

  const addUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setElements((prev) => [
        ...prev,
        { id: `el-${Date.now()}`, type: "image", content: reader.result, x: 40, y: 36, size: 84, rotation: 0 },
      ]);
    };
    reader.readAsDataURL(file);
  };

  const updateElement = (id, patch) =>
    setElements((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const startDrag = (event, id) => {
    event.preventDefault();
    setSelectedId(id);
    setDraggingId(id);
  };

  const dragElement = (event) => {
    if (!draggingId) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    updateElement(draggingId, {
      x: Math.min(75, Math.max(5, Number(x.toFixed(1)))),
      y: Math.min(75, Math.max(8, Number(y.toFixed(1)))),
    });
  };

  const endDrag = () => setDraggingId(null);

  const saveCurrentDesign = () => {
    const design = saveDesign({
      productId: product.id,
      productTitle: product.title,
      productType,
      previewImage: product.images[0],
      elements,
      savedAt: new Date().toISOString(),
    });
    onUseDesign(design);
  };

  return (
    <section className="studio">
      <div className="studio__controls">
        <div className="section-card">
          <div className="section-card__title">
            <Sticker size={18} />
            <h3>Add Stickers</h3>
          </div>
          <div className="chip-row">
            {stickerChoices.map((choice) => (
              <button key={choice} className="chip" onClick={() => addSticker(choice)}>
                {choice}
              </button>
            ))}
          </div>
        </div>
        <div className="section-card">
          <div className="section-card__title">
            <Type size={18} />
            <h3>Custom Text</h3>
          </div>
          <input value={textDraft} onChange={(event) => setTextDraft(event.target.value)} className="text-input" />
          <button className="btn btn--primary" onClick={addText}>
            Add Text
          </button>
        </div>
        <div className="section-card">
          <div className="section-card__title">
            <Upload size={18} />
            <h3>Upload Logo</h3>
          </div>
          <label className="upload-box">
            <input type="file" accept="image/*" onChange={addUpload} />
            Upload image or logo
          </label>
        </div>
        <div className="section-card">
          <div className="section-card__title">
            <RotateCw size={18} />
            <h3>Selected Layer</h3>
          </div>
          {selected ? (
            <div className="control-stack">
              <label>
                Size
                <input
                  type="range"
                  min="30"
                  max="160"
                  value={selected.size}
                  onChange={(event) => updateElement(selected.id, { size: Number(event.target.value) })}
                />
              </label>
              <label>
                Rotation
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={selected.rotation}
                  onChange={(event) => updateElement(selected.id, { rotation: Number(event.target.value) })}
                />
              </label>
              <label>
                Horizontal
                <input
                  type="range"
                  min="5"
                  max="75"
                  value={selected.x}
                  onChange={(event) => updateElement(selected.id, { x: Number(event.target.value) })}
                />
              </label>
              <label>
                Vertical
                <input
                  type="range"
                  min="8"
                  max="75"
                  value={selected.y}
                  onChange={(event) => updateElement(selected.id, { y: Number(event.target.value) })}
                />
              </label>
            </div>
          ) : (
            <p className="muted">Select a design element on the preview to edit it.</p>
          )}
        </div>
      </div>
      <div className="studio__preview">
        <div className="studio__preview-header">
          <div>
            <p className="eyebrow">Live Preview</p>
            <h3>Customize your {productType === "tee" ? "T-shirt" : "hoodie"}</h3>
          </div>
          <select value={productType} onChange={(event) => setProductType(event.target.value)} className="select-input">
            <option value="tee">T-shirt</option>
            <option value="hoodie">Hoodie</option>
          </select>
        </div>
        <div
          className={`garment-preview garment-preview--${previewClass}`}
          onPointerMove={dragElement}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          <div className="garment-shape" />
          {elements.map((element) => (
            <button
              type="button"
              key={element.id}
              className={`design-element ${selectedId === element.id ? "design-element--selected" : ""}`}
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                width: `${element.size}px`,
                transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
              }}
              onClick={() => setSelectedId(element.id)}
              onPointerDown={(event) => startDrag(event, element.id)}
            >
              {element.type === "image" ? <img src={element.content} alt="Uploaded design" /> : <span>{element.content}</span>}
            </button>
          ))}
        </div>
        <div className="studio__actions">
          <button className="btn btn--primary" onClick={saveCurrentDesign}>
            <Download size={16} />
            Save Design
          </button>
          <p className="muted">Saved designs can be reused from your dashboard and added directly to cart.</p>
        </div>
      </div>
    </section>
  );
}
