import React from 'react';
import { useMLCEngine } from '../Components/ChatGptLocal/useMLCEngine';
import HomeDetail from './HomeDetail';

export default function Home() {
    const modelName = "TinyLlama-1.1B-Chat-v0.4-q4f16_1-MLC-1k";


    const { engine, error } = useMLCEngine(modelName, () => {});

    return (
        <div className='mt-20'>
            <div className="container">
                {error && <p>Error: {error.message}</p>}
                {engine ? (
                    <HomeDetail engine={engine}></HomeDetail>
                ) : (
                    <p>Loading engine...</p>
                )}
            </div>
        </div>
    );
}