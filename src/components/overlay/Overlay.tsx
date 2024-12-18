import "./Overlay.scss";

type OverlayProps = {
    customStyle: React.CSSProperties;
};

export function Overlay(props: OverlayProps) {
    const { customStyle } = props;

    return <div className="ovl" style={customStyle} />;
}
