import { useContractWrite, usePrepareContractWrite } from "wagmi";

import useContract from "hooks/useContract";
import { useCallback, useMemo, useState } from "react";

export default function useWrite({
  disabled,
  method,
  args,
  enabled,
  contract,
  onComplete,
}) {
  const [loading, setLoading] = useState(false);
  const contractConfig = useContract(contract);

  const { config } = usePrepareContractWrite({
    ...contractConfig,
    functionName: method,
    args,
    enabled,
  });

  const { writeAsync } = useContractWrite(config);

  const handleTx = useCallback(async () => {
    setLoading(true);

    try {
      const tx = await writeAsync();
      const resp = await tx.wait();
      console.log(tx, resp);

      onComplete && onComplete();

      // We can probably do these two things together
      // TODO: pop toasts
      // TODO: add to activity
    } catch (error) {
      console.log("TxButton error:", error);
      console.log("TxButton error message:", error.message);
      console.log("TxButton error code:", error.code);

      if (error.code == "ACTION_REJECTED") {
        // User rejected the request
        // TODO:
      }
    } finally {
      setLoading(false);
    }
  }, [writeAsync]);

  return useMemo(
    () => ({
      disabled: disabled || !writeAsync,
      loading,
      onClick: handleTx,
    }),
    [handleTx, loading, disabled, writeAsync]
  );
}
