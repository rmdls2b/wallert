-- Delayed actions for duress protection
ALTER TABLE "WatchedAddress" ADD COLUMN "pendingAction" TEXT,
ADD COLUMN "pendingActionAt" TIMESTAMP(3);

ALTER TABLE "AlertChannel" ADD COLUMN "pendingAction" TEXT,
ADD COLUMN "pendingActionAt" TIMESTAMP(3);
