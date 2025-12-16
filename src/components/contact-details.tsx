'use client';

import { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Image from 'next/image';

interface ContactDetailsProps {
    onBack: () => void;
    onNext: () => void;
}

export function ContactDetails({ onBack, onNext }: ContactDetailsProps) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+234');

    const isFormComplete = email && phone;

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
                    <label className="text-sm font-medium text-muted-foreground">Recipient email</label>
                    <Input
                        type="email"
                        placeholder="Enter recipient email"
                        className="mt-1 h-12 rounded-full bg-white px-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-muted-foreground">Recipient phone number</label>
                    <div className="mt-1 flex items-center space-x-2">
                        <div className="relative">
                             <Button variant="outline" className="h-12 rounded-full bg-white px-4">
                                <div className="flex items-center gap-2">
                                     <span>{countryCode}</span>
                                     <Image src="/ngn.png" alt="nigeria flag" width={16} height={16} />
                                     <ChevronDown className="h-4 w-4" />
                                </div>
                             </Button>
                        </div>
                        <Input
                            type="tel"
                            placeholder="000 - 000 - 00000"
                            className="h-12 flex-1 rounded-full bg-white px-4"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <Button 
                className="mt-8 h-12 w-full rounded-full bg-primary text-lg font-semibold text-primary-foreground"
                disabled={!isFormComplete}
                onClick={onNext}
            >
                Next
            </Button>
        </div>
    );
}
