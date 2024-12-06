import { useProgression } from "../../hooks/UseProgression";
import AdventurerBlock from "../adventurer-block/AdventurerBlock";
import "./AdventurersTab.scss";

export default function AdventurersTab() {
    const progress = useProgression();
    const adventurers = progress.adventurers;

    const adventurerComponents = adventurers.data.map((adventurer) => {
        return <AdventurerBlock key={adventurer.key} adventurer={adventurer} />;
    });

    return <div id="adventurers-tab">{adventurerComponents}</div>;
}
