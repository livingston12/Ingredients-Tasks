import { useState, useEffect, useRef } from 'react';
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

export const ChatCompletation = async (engine, messages, onChangeCompletion, onError) => {
    try {
        if (!engine || !messages || typeof onChangeCompletion !== 'function' || typeof onError !== 'function') {
            throw new Error('Invalid arguments passed to ChatCompletation');
        }

        const chunks = await engine.chat.completions.create({
            messages,
            stream: true,
        });

        for await (const chunk of chunks) {
            const content = chunk?.choices[0]?.delta?.content ?? '';
            onChangeCompletion(content);
        }
    } catch (err) {
        onError(err);
        console.error('Error during chat completion:', err);
    }
};