'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWallet } from '@suiet/wallet-kit';
import { useSuiNs } from '@/contexts/suins-contexts';

interface SuiNSSetupProps {
  onComplete: (name: string) => void;
  walletAddress: string;
}

export default function SuiNSSetup({ onComplete, walletAddress }: SuiNSSetupProps) {
  const { connected, account } = useWallet();
  const { registerName } = useSuiNs();
  const [name, setName] = useState('');
  const [years, setYears] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!connected || !account) {
      setError('Please connect your wallet first.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await registerName(name, years);
      onComplete(name);
    } catch (err: any) {
      setError(err.message || 'Failed to register SuiNS name.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <h3 className="text-xl font-medium mb-4">Register Your SuiNS Name</h3>
      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter SuiNS name"
        className="mb-4"
      />
      <select
        value={years}
        onChange={(e) => setYears(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}
        className="border rounded p-2 w-full mb-4"
      >
        {[1, 2, 3, 4, 5].map((yr) => (
          <option key={yr} value={yr}>{yr} Year{yr > 1 ? 's' : ''}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <Button onClick={handleRegister} disabled={loading || !name} className="w-full">
        {loading ? 'Registering...' : 'Register Name'}
      </Button>
    </div>
  );
}
