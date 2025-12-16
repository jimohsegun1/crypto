'use client';

import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import Image from 'next/image';

interface TransactionStatusProps {
    onGoHome: () => void;
}

export function TransactionStatus({ onGoHome }: TransactionStatusProps) {
    const transactionId = 'NC123456789';

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        //toast here to confirm copy
    };

    return (
        <div className="w-full max-w-md flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-12">
                <Image src="/novacrust-icon.png" alt="Novacrust" width={28} height={28} />
                <span className="text-2xl font-bold">NOVACRUST</span>
            </div>

            <Image src="/check-circle.png" alt="Success" width={80} height={80} className="mb-6" />

            <h1 className="text-2xl font-bold mb-2">Your transaction is processing.</h1>
            <p className="text-muted-foreground mb-8">The recipient will receive it shortly.</p>

            <div className="w-full flex items-center justify-between rounded-lg bg-gray-100 p-3 mb-8">
                <span className="text-sm text-muted-foreground">Transaction ID</span>
                <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{transactionId}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(transactionId)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Button variant="link" onClick={onGoHome} className="text-primary font-semibold">
                Go back to home
            </Button>
        </div>
    );
}
