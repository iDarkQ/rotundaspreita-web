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
    <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/30">
      <DialogPanel className="relative max-w-[691px] w-full rounded-sm bg-white flex flex-col gap-5! py-5">
        <DialogPart>
          <Text as="h3">
            <Button
              variant="text"
              className="aspect-square float-right"
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
