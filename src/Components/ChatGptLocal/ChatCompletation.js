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
