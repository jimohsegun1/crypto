'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Image from 'next/image';
import { ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { RecipientDetails } from './recipient-details';
import { ContactDetails } from './contact-details';
import { SendCryptoDetails } from './send-crypto-details';
import { TransactionStatus } from './transaction-status';


const currencies = [
  { name: 'USDT - CELO', icon: '/usdt-celo.png' },
  { name: 'USDT - TON', icon: '/usdt-ton.png' },
  { name: 'USDT - BNB', icon: '/usdt-bnb.png' },
  { name: 'ETH', icon: '/eth.png' },
];

const wallets = [
  { name: 'Metamask', icon: '/metamask.png' },
  { name: 'Rainbow', icon: '/rainbow.png' },
  { name: 'WalletConnect', icon: '/wallet-connect.png' },
  { name: 'Other Crypto Wallets (Binance, Conibase, Bybit etc)', icon: '/other-crypto-wallets.png' },
];

const banks = [
  { name: 'GT Bank', icon: '/gtbank.png' },
  { name: 'Access Bank', icon: '/access.png' },
]

type Step = 'checkout' | 'recipientDetails' | 'contactDetails' | 'sendCryptoDetails' | 'transactionStatus';

export function CryptoCheckout() {
  const [activeTab, setActiveTab] = useState('crypto-to-cash');
  const [payCurrency, setPayCurrency] = useState(currencies[3]);
  const [receiveCurrency, setReceiveCurrency] = useState({ name: 'NGN', icon: '/ngn.png' });
  const [payFrom, setPayFrom] = useState<{name: string, icon: string} | null>(null);
  const [payToBank, setPayToBank] = useState<{name: string, icon: string} | null>(null);

  const [payPopoverOpen, setPayPopoverOpen] = useState(false);
  const [receivePopoverOpen, setReceivePopoverOpen] = useState(false);
  const [payFromPopoverOpen, setPayFromPopoverOpen] = useState(false);
  const [payToPopoverOpen, setPayToPopoverOpen] = useState(false);

  const [step, setStep] = useState<Step>('checkout');

  const isFormComplete = payCurrency && receiveCurrency && payFrom && payToBank;

  const goToStep = (nextStep: Step) => {
    setStep(nextStep);
  };
  
  const resetFlow = () => {
    setStep('checkout');
    // can be used to reset other states as well
    setPayFrom(null);
    setPayToBank(null);
  };

  if (step === 'recipientDetails') {
    return <RecipientDetails onBack={() => goToStep('checkout')} selectedBank={payToBank} onNext={() => goToStep('contactDetails')} />;
  }

  if (step === 'contactDetails') {
    return <ContactDetails onBack={() => goToStep('recipientDetails')} onNext={() => goToStep('sendCryptoDetails')} />;
  }
  
  if (step === 'sendCryptoDetails') {
    return <SendCryptoDetails 
              onBack={() => goToStep('contactDetails')} 
              payCurrency={payCurrency}
              payFrom={payFrom}
              onNext={() => goToStep('transactionStatus')}
           />;
  }
  
  if (step === 'transactionStatus') {
    return <TransactionStatus onGoHome={resetFlow} />;
  }

  return (
    <div className="w-full max-w-md relative">

      <div className="mb-6 flex justify-center space-x-0 rounded-full bg-gray-100 p-1">
        <Button
          onClick={() => setActiveTab('crypto-to-cash')}
          variant='ghost'
          className={`flex-1 rounded-full text-xs md:text-sm font-normal ${activeTab === 'crypto-to-cash' ? 'bg-primary text-primary-foreground shadow' : 'bg-transparent text-gray-500'}`}
        >
          Crypto to cash
        </Button>
        <Button
           onClick={() => setActiveTab('cash-to-crypto')}
           variant='ghost'
           className={`flex-1 rounded-full text-xs md:text-sm font-normal ${activeTab === 'cash-to-crypto' ? 'bg-primary text-primary-foreground shadow' : 'bg-transparent text-gray-500'}`}
           disabled
        >
          Cash to crypto
        </Button>
        <Button
           onClick={() => setActiveTab('crypto-to-fiat')}
           variant='ghost'
           className={`flex-1 rounded-full text-xs md:text-sm font-normal ${activeTab === 'crypto-to-fiat' ? 'bg-primary text-primary-foreground shadow' : 'bg-transparent text-gray-500'}`}
           disabled
        >
          Crypto to fiat loan
        </Button>
      </div>

      <div className="space-y-4">
        <Card className="rounded-2xl shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">You pay</p>
                <p className="text-2xl font-bold">1.00</p>
              </div>
              <Popover open={payPopoverOpen} onOpenChange={setPayPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full px-4 py-2 font-semibold border"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={payCurrency.icon}
                        alt={payCurrency.name}
                        width={24}
                        height={24}
                      />
                      {payCurrency.name}
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[calc(100%-48px)] max-w-md p-4 rounded-2xl shadow-lg" align="end">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search" className="pl-9 rounded-full" />
                    </div>
                    <ul className="max-h-60 overflow-y-auto space-y-1">
                        {currencies.map((currency) => (
                        <li key={currency.name}>
                            <Button
                            variant={payCurrency.name === currency.name ? 'secondary' : 'ghost'}
                            className="w-full justify-start gap-2 h-12 rounded-lg"
                            onClick={() => {
                                setPayCurrency(currency);
                                setPayPopoverOpen(false);
                            }}
                            >
                            <Image
                                src={currency.icon}
                                alt={currency.name}
                                width={24}
                                height={24}
                            />
                            {currency.name}
                            </Button>
                        </li>
                        ))}
                    </ul>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">You receive</p>
                <p className="text-2xl font-bold">1.00</p>
              </div>
              <Popover open={receivePopoverOpen} onOpenChange={setReceivePopoverOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        className="rounded-full px-4 py-2 font-semibold border"
                    >
                        <div className="flex items-center gap-2">
                        <Image
                            src={receiveCurrency.icon}
                            alt={receiveCurrency.name}
                            width={24}
                            height={24}
                        />
                        {receiveCurrency.name}
                        <ChevronDown className="h-4 w-4" />
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[calc(100%-48px)] max-w-md p-4 rounded-2xl shadow-lg" align="end">
                     <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search" className="pl-9 rounded-full" />
                    </div>
                    <ul className="max-h-60 overflow-y-auto">
                        <li>
                            <Button
                            variant="secondary"
                            className="w-full justify-start gap-2 rounded-lg h-12"
                            onClick={() => {
                                setReceivePopoverOpen(false);
                            }}
                            >
                            <Image
                                src="/ngn.png"
                                alt="NGN"
                                width={24}
                                height={24}
                            />
                            NGN
                            </Button>
                        </li>
                    </ul>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Pay from
          </label>
           <Popover open={payFromPopoverOpen} onOpenChange={setPayFromPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="mt-1 w-full justify-between rounded-full h-12 text-base bg-white">
                        {payFrom ? (
                            <div className="flex items-center gap-2">
                                <Image src={payFrom.icon} alt={payFrom.name} width={24} height={24} />
                                {payFrom.name}
                            </div>
                        ) : (
                            <span className="text-muted-foreground">Select an option</span>
                        )}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[calc(100%-48px)] max-w-md p-4 rounded-2xl shadow-lg" align="start">
                    <ul className="max-h-60 overflow-y-auto space-y-1">
                        {wallets.map((wallet) => (
                        <li key={wallet.name}>
                            <Button
                            variant={payFrom?.name === wallet.name ? 'secondary' : 'ghost'}
                            className="w-full justify-start gap-2 rounded-lg h-12"
                            onClick={() => {
                                setPayFrom(wallet);
                                setPayFromPopoverOpen(false);
                            }}
                            >
                            <Image
                                src={wallet.icon}
                                alt={wallet.name}
                                width={24}
                                height={24}
                            />
                            {wallet.name}
                            </Button>
                        </li>
                        ))}
                    </ul>
                </PopoverContent>
              </Popover>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Pay to
          </label>
           <Popover open={payToPopoverOpen} onOpenChange={setPayToPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="mt-1 w-full justify-between rounded-full h-12 text-base bg-white">
                        {payToBank ? (
                            <div className="flex items-center gap-2">
                                <Image src={payToBank.icon} alt={payToBank.name} width={24} height={24} />
                                {payToBank.name}
                            </div>
                        ) : (
                            <span className="text-muted-foreground">Bank Account</span>
                        )}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[calc(100%-48px)] max-w-md p-4 rounded-2xl shadow-lg" align="start">
                    <ul className="max-h-60 overflow-y-auto space-y-1">
                        {banks.map((bank) => (
                        <li key={bank.name}>
                            <Button
                            variant={payToBank?.name === bank.name ? 'secondary' : 'ghost'}
                            className="w-full justify-start gap-2 rounded-lg h-12"
                            onClick={() => {
                                setPayToBank(bank);
                                setPayToPopoverOpen(false);
                            }}
                            >
                            <Image
                                src={bank.icon}
                                alt={bank.name}
                                width={24}
                                height={24}
                            />
                            {bank.name}
                            </Button>
                        </li>
                        ))}
                    </ul>
                </PopoverContent>
              </Popover>
        </div>
      </div>

      <Button
        className="mt-6 h-12 w-full rounded-full bg-primary text-lg font-semibold text-primary-foreground"
        disabled={!isFormComplete}
        onClick={() => goToStep('recipientDetails')}
      >
        Convert now
      </Button>
    </div>
  );
}
