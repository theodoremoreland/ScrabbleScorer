import { ReactElement, useState } from "react";

// Components
import Entry from "./Entry";

// Custom
import { ScoringAlgorithm } from "../types/types";

// Styles
import "./Entries.css";

interface Props {
    scoringAlgorithms: ScoringAlgorithm[];
}

const Entries = ({ scoringAlgorithms }: Props): ReactElement => {
    const [entryIds, setEntryIds] = useState<number[]>([1]);

    const addEntry = (): void => {
        const newEntryId = Math.max(...entryIds) + 1;
        setEntryIds([...entryIds, newEntryId]);
    }

    return (
        <div className="Entries">
            {
                entryIds.map((entry) => (
                    <Entry
                        key={entry}
                        scoringAlgorithms={scoringAlgorithms}
                        addEntry={addEntry}
                        entryKey={entry.toString()}
                    />
                ))
            }
        </div>
    );
};

export default Entries;