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
        if (document.scrollingElement) {
            const ro: ResizeObserver = new ResizeObserver(() => {
                if (document.scrollingElement) {
                    document.scrollingElement.scrollTop =
                    document.scrollingElement.scrollHeight;
                }
            });

            // Observe the scrollingElement for when the window gets resized
            ro.observe(document.scrollingElement);

            return () => {
                ro.disconnect();
            };
        }
    }, []);

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