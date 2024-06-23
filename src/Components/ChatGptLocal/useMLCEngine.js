import { useState, useEffect, useRef} from 'react';
import { CreateMLCEngine } from "@mlc-ai/web-llm";


export const useMLCEngine = (modelName, initProgressCallback) => {
    const [engine, setEngine] = useState(null);
    const [error, setError] = useState(null);

    const stableInitProgressCallback = useRef(initProgressCallback);

    useEffect(() => {
        stableInitProgressCallback.current = initProgressCallback;
    }, [initProgressCallback]);

    useEffect(() => {
        const initialize = async () => {
            try {
                const initializedEngine = await CreateMLCEngine(
                    modelName,
                    { initProgressCallback: stableInitProgressCallback.current }
                );
                setEngine(initializedEngine);
            } catch (err) {
                setError(err);
            }
        };

        initialize();
    }, [modelName]); // `modelName` es la única dependencia real


    return { engine, error };
}