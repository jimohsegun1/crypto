'use client';

import { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Image from 'next/image';

interface RecipientDetailsProps {
    onBack: () => void;
    onNext: () => void;
    selectedBank: { name: string; icon: string } | null;
}

export function RecipientDetails({ onBack, onNext, selectedBank }: RecipientDetailsProps) {
    const [accountNumber, setAccountNumber] = useState('');

    return (
        <div className="w-full max-w-md">
            <header className="relative mb-8 flex items-center justify-center">
                <Button variant="ghost" size="icon" className="absolute left-0" onClick={onBack}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-lg font-semibold">Recipient details</h1>
            </header>

            <div className="space-y-6">
                <div>
                    <label className="text-sm font-medium text-muted-foreground">Bank</label>
                    <Button variant="outline" className="mt-1 w-full justify-between rounded-full h-12 text-base bg-white" disabled>
                         {selectedBank ? (
                            <div className="flex items-center gap-2">
                                <Image src={selectedBank.icon} alt={selectedBank.name} width={24} height={24} />
                                {selectedBank.name}
                            </div>
                        ) : (
                            <span className="text-muted-foreground">Select an option</span>
                        )}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </div>
                <div>
                    <label className="text-sm font-medium text-muted-foreground">Account number</label>
                    <Input
                        type="text"
                        placeholder="Enter your account number"
                        className="mt-1 h-12 rounded-full bg-white px-4"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-muted-foreground">Account name</label>
                    <div className="mt-1 flex h-12 items-center rounded-full bg-gray-100 px-4">
                        <span className="text-muted-foreground">ODUTUGA GBEKE</span>
                    </div>
                </div>
            </div>

            <Button
              className="mt-8 h-12 w-full rounded-full bg-primary text-lg font-semibold text-primary-foreground"
              disabled={!accountNumber}
              onClick={onNext}
            >
                Next
            </Button>
        </div>
    );
}
