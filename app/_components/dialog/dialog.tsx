import { Button } from "@/app/_components/button";
import { DialogPart } from "@/app/_components/dialog/dialog-part";
import { Text } from "@/app/_components/text";
import { Dialog as HeadlessUIDialog, DialogPanel } from "@headlessui/react";
import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface Props {
  onClose: () => void;
  open?: boolean;
  children: ReactNode;
  title?: string;
}

export const Dialog = ({ children, open, title, onClose }: Props) => (
  <HeadlessUIDialog
    open={open !== undefined ? open : true}
    onClose={() => onClose()}
    className="relative z-50"
  >
    <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4">
      <DialogPanel className="relative flex w-full max-w-[691px] flex-col gap-5! rounded-sm bg-white py-5">
        <DialogPart>
          <Text as="h3">
            <Button
              variant="text"
              className="float-right aspect-square"
              onClick={onClose}
            >
              <IoMdClose size="20px" />
            </Button>
            {title}{" "}
          </Text>
        </DialogPart>
        {children}
      </DialogPanel>
    </div>
  </HeadlessUIDialog>
);
