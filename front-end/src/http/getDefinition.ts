import axios from "axios";

interface Definition {
    "word": string,
    "meanings": [
        {
            "partOfSpeech": string,
            "definitions": [
                {
                    "definition": string,
                    "example": string,
                    "synonyms": string[],
                    "antonyms": string[]
                }
            ]
        },
    ]
}

interface Props {
    word: string;
}

export default async ({ word }: Props): Promise<Definition> => {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const { data }: { data: Definition[] } = response;

    return data[0];
}