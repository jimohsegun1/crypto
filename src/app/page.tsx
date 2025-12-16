import { CryptoCheckout } from '@/components/crypto-checkout';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-lg">
        <CryptoCheckout />
      </div>
    </main>
  );
}
