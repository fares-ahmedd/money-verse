import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCheckoutSubscription } from "../api/useCheckoutSubscription";
import { useSubscriptionModal } from "../hooks/useSubscriptionModal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

function SubscriptionModal() {
  const { mutate: checkout, isPending: isChecking } = useCheckoutSubscription();
  const { isOpen, onClose } = useSubscriptionModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center space-y-4">
          <DialogTitle className="text-center">
            Upgrade to a paid plan
          </DialogTitle>
          <DialogDescription className="text-center">
            Upgrade to a paid plan to unlock all the features.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">
              Bank account syncing
            </p>
          </li>{" "}
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">Upload CVS files</p>
          </li>{" "}
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
            <p className="text-sm text-muted-foreground">
              Different chart types
            </p>
          </li>
        </ul>

        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button
            className="w-full"
            onClick={() => checkout()}
            disabled={isChecking}
          >
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SubscriptionModal;
