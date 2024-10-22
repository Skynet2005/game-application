// src/lib/stripe/subscription.ts
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    console.error("User ID not found.");
    return false;
  }

  try {
    const userSubscription = await prisma.userSubscription.findUnique({
      where: { userId: userId },
      select: {
        stripeSubscriptionId: true,
        stripeCurrentPeriodEnd: true,
        stripeCustomerId: true,
        stripePriceId: true,
      },
    });

    if (!userSubscription) {
      console.warn("No subscription found for user:", userId);
      return false;
    }

    const isValid =
      userSubscription.stripePriceId &&
      userSubscription.stripeCurrentPeriodEnd &&
      userSubscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

    return !!isValid;
  } catch (error: any) {
    console.error("Error fetching user subscription:", error.message);
    return false;
  }
};
