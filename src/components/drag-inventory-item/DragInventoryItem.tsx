import { useDrag } from "react-dnd";
import "./DragInventoryItem.scss";
import ImageLoader from "../image-loader/ImageLoader";
import { formatBigNumber } from "../../utils/Math.utils";
import { items } from "../../constants/Items.constants";

export type DragInventoryItemProps = {
    id: string;
};

export function DragInventoryItem(props: DragInventoryItemProps) {
    const { id } = props;
    const { icon, count } = items[id];
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "ITEM",
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            className="drag-inventory-item"
            ref={dragRef}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            {id}
            {icon && <ImageLoader src={icon} />}
            {count && <span className="count">{formatBigNumber(count)}</span>}
        </div>
    );
}
