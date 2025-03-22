"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@suiet/wallet-kit";
import { Transaction } from "@mysten/sui/transactions";
import { SuinsClient, SuinsTransaction } from "@mysten/suins";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

interface SuiNSSetupProps {
  onComplete: (name: string) => void;
  walletAddress: string;
}

export default function SuiNSSetup({ onComplete }: SuiNSSetupProps) {
  const { connected, account, signAndExecuteTransactionBlock } = useWallet();
  const [name, setName] = useState("");
  const [parentDomain, setParentDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLeafSubname = async (name: string, parentNftId: string, targetAddress: string) => {
    try {
      const transaction = new Transaction();
      const client = new SuiClient({ url: getFullnodeUrl("testnet") });
      const suinsClient = new SuinsClient({ client, network: "testnet" });
      const suinsTransaction = new SuinsTransaction(suinsClient, transaction);

      suinsTransaction.createLeafSubName({
        parentNft: parentNftId,
        name,
        targetAddress,
      });

      transaction.setGasBudget(100000000);

      await signAndExecuteTransactionBlock({
        transactionBlock: transaction,
        options: { showEffects: true },
      });

      console.log("Leaf subname registered successfully.");
      onComplete(name);
    } catch (e: any) {
      console.error("Error:", e);
      setError(e.message || "Failed to create leaf subname.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!connected || !account) {
      setError("Please connect your wallet first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const client = new SuiClient({ url: getFullnodeUrl("testnet") });
      const suinsClient = new SuinsClient({ client, network: "testnet" });
      const parentDetails = await suinsClient.getNameRecord(parentDomain);

      if (!parentDetails || !parentDetails.nftId) {
        throw new Error("Parent details not found!");
      }

      await createLeafSubname(name, parentDetails.nftId, account.address);
    } catch (e: any) {
      console.error("Error:", e);
      setError(e.message || "Failed to create leaf subname.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <h3 className="text-xl font-medium mb-4">Register Leaf Subname</h3>

      <Input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Subname"
        className="mb-4"
      />

      <Input
        type="text"
        value={parentDomain}
        onChange={(e) => setParentDomain(e.target.value)}
        placeholder="Enter Parent Domain"
        className="mb-4"
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <Button onClick={handleSubmit} disabled={loading || !name || !parentDomain} className="w-full">
        {loading ? "Registering..." : "Create Leaf Subname"}
      </Button>
    </div>
  );
}