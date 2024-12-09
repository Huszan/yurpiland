import "./modal.scss";
import CloseSvg from "../../resources/icons/close.svg";

type ModalComponentProps = {
    content: JSX.Element;
    onClose: () => void;
};

export default function Modal(props: ModalComponentProps) {
    const { content, onClose } = props;

    return (
        <div className="modal-background">
            <div className="modal-content center-abs">
                <header className="modal-header">
                    <button className="close-button" onClick={onClose}>
                        <img src={CloseSvg} className="icon" alt="" />
                    </button>
                </header>
                {content}
            </div>
        </div>
    );
}
