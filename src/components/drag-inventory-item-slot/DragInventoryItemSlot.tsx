import { useDrop } from "react-dnd";
import "./DragInventoryItemSlot.scss";
import { Overlay } from "../overlay/Overlay";

type DragInventoryItemSlotProps = React.PropsWithChildren & {
    index: number;
    accept?: string | string[];
    onDrop: (item: { id: string }, index: number) => void;
};

export function DragInventoryItemSlot(props: DragInventoryItemSlotProps) {
    const { index, accept = "ITEM", onDrop, children } = props;
    const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
        accept,
        drop: (item) => onDrop(item as { id: string }, index),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    return (
        <div ref={dropRef} className="drag-inventory-item-slot">
            {children}
            {isOver && !canDrop && (
                <Overlay customStyle={{ backgroundColor: "red" }} />
            )}
            {!isOver && canDrop && (
                <Overlay customStyle={{ backgroundColor: "yellow" }} />
            )}
            {isOver && canDrop && (
                <Overlay customStyle={{ backgroundColor: "green" }} />
            )}
        </div>
    );
}
