'use client';

import { ArrowLeft, Copy, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface SendCryptoDetailsProps {
    onBack: () => void;
    onNext: () => void;
    payCurrency: { name: string; icon: string };
    payFrom: { name: string; icon: string } | null;
}

export function SendCryptoDetails({ onBack, onNext, payCurrency, payFrom }: SendCryptoDetailsProps) {
    const address = '4LiV4YjbxsL6739MKghUd';
    const amount = `1.00 ${payCurrency.name}`;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // toast notification TODO
    };

    const network = payCurrency.name.includes('-') ? payCurrency.name.split(' - ')[1] : payCurrency.name;
    const currencyName = payCurrency.name.includes('-') ? payCurrency.name.split(' - ')[0] : payCurrency.name;
    const walletName = payFrom?.name.startsWith('Other') ? 'Other' : payFrom?.name;

    return (
        <div className="w-full max-w-md">
            <header className="relative mb-6 flex items-center justify-center">
                <Button variant="ghost" size="icon" className="absolute left-0" onClick={onBack}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-semibold text-center">Send {payCurrency.name} to the address below</h1>
            </header>

            <div className="flex justify-center mb-6">
                 <Button variant="secondary" className="rounded-full h-10 px-4" onClick={() => copyToClipboard(address)}>
                    <span>{address}</span>
                    <Copy className="ml-2 h-4 w-4" />
                </Button>
            </div>
            
            <Card className="rounded-2xl shadow-sm bg-white">
                <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Amount to send</span>
                        <div className="flex items-center font-medium">
                            <span>{amount}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1" onClick={() => copyToClipboard('1.00')}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Network</span>
                        <span className="font-medium">{network}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Wallet</span>
                        <span className="font-medium">{walletName}</span>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <p>Only send {currencyName} to this address. Ensure the sender is on the {network} network otherwise you might lose your deposit</p>
            </div>

            <Button onClick={onNext} className="mt-8 h-12 w-full rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                I have sent it
            </Button>
        </div>
    );
}
