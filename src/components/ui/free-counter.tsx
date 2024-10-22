import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { MAX_FREE_COUNTS } from "@/constants/navbar/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProModal } from "@/hooks/use-pro-modal";
import { getApiLimitCount } from "@/lib/stripe/api-limit";

export const FreeCounter = ({
  isPro = false,
}: {
  isPro: boolean;
}) => {
  const [mounted, setMounted] = useState(false);
  const [apiLimitCount, setApiLimitCount] = useState(0);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
    const fetchApiLimitCount = async () => {
      const count = await getApiLimitCount();
      setApiLimitCount(count);
    };
    fetchApiLimitCount();
  }, []);

  if (!mounted) {
    return null;
  }

  // Don't show the free count if the user is a Pro subscriber
  if (isPro) {
    return null;
  }

  const progress = (apiLimitCount / MAX_FREE_COUNTS) * 100;

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0 rounded-xl">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-2 space-y-2 rounded-xl">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress className="h-3" value={progress} />
          </div>
          {apiLimitCount >= MAX_FREE_COUNTS ? (
            <Button
              onClick={proModal.onOpen}
              variant="premium"
              className="w-full p-2 rounded-xl"
            >
              <Zap className="w-20 h-20 m-2 text-yellow-400 fill-yellow-400" />
              Skynetic Pro
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};
