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
    const abortController = new AbortController();
    const { signal } = abortController;

    const cancelStream = () => {
        abortController.abort(); // Cancelar el stream
        console.log('Streaming operation cancelled');
    };

    try {
        if (!engine || !messages || typeof onChangeCompletion !== 'function' || typeof onError !== 'function') {
            throw new Error('Invalid arguments passed to ChatCompletation');
        }

        const chunks = await engine.chat.completions.create({
            messages,
            stream: true,
            signal
        });

        for await (const chunk of chunks) {
            if (signal.aborted) {
                console.log('Stream cancelled');
                break;
            }
            const content = chunk?.choices[0]?.delta?.content ?? '';
            onChangeCompletion(content);
        }
    } catch (err) {
        onError(err);
        console.error('Error during chat completion:', err);
    }

    return cancelStream;
};