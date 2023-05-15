import { useState } from "react";
import "./RoundedSquare.css";

const RoundedSquare = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ width: 200, height: 200 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const minSize = { width: 100, height: 100 };

    const handleMouseDown = (event) => {
        const { clientX, clientY } = event;
        const { top, left, width, height } = event.target.getBoundingClientRect();
        const offsetX = clientX - left;
        const offsetY = clientY - top;

        if (offsetY <= 20) {
            // Dragging area
            setIsDragging(true);
            document.addEventListener("mousemove", handleDrag);
            document.addEventListener("mouseup", handleMouseUp);
        } else if (offsetX >= width - 20 && offsetY >= height - 20) {
            // Resizing area
            setIsResizing(true);
            document.addEventListener("mousemove", handleResize);
            document.addEventListener("mouseup", handleMouseUp);
        }
    };

    const handleDrag = (event) => {
        const { clientX, clientY } = event;
        setPosition({
            x: clientX - size.width / 2,
            y: clientY - size.height / 2,
        });
    };

    const handleResize = (event) => {
        const { clientX, clientY } = event;
        const newWidth = clientX - position.x;
        const newHeight = clientY - position.y;
        if (newWidth >= minSize.width && newHeight >= minSize.height) {
            setSize({ width: newWidth, height: newHeight });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("mousemove", handleResize);
    };

    return (
        <div
            className="rounded-square"
            style={{
                top: position.y,
                left: position.x,
                width: size.width,
                height: size.height,
            }}
            onMouseDown={handleMouseDown}
        ></div>
    );
};

export default RoundedSquare;
