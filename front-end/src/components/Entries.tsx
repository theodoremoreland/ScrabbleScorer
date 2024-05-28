import { ReactElement, useState, useRef, useEffect } from "react";

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
    const containerRef = useRef<HTMLDivElement>(null);
    const [entryIds, setEntryIds] = useState<number[]>([1]);

    const addEntry = (): void => {
        const newEntryId = Math.max(...entryIds) + 1;
        setEntryIds([...entryIds, newEntryId]);
    }

    useEffect(() => {
        if (containerRef.current) {
            window.scrollTo(0, containerRef.current.scrollHeight + 100);
        }

    }, [entryIds.length]);

    return (
        <div className="Entries" ref={containerRef}>
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