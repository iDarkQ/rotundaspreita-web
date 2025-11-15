import { Button } from "@/app/_components/button";
import { Dialog as HeadlessUIDialog, DialogPanel } from "@headlessui/react";
import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

interface Props {
  onClose: () => void;
  children: ReactNode;
}

export const Dialog = ({ children, onClose }: Props) => (
  <HeadlessUIDialog
    open={true}
    onClose={() => onClose()}
    className="relative z-50"
  >
    <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/30">
      <DialogPanel className="relative max-w-[691px] c-border border-transparent! bg-white p-10 flex flex-col gap-5!">
        <Button
          variant="text"
          className="absolute! right-0! top-0! aspect-square m-5!"
          onClick={onClose}
        >
          <IoMdClose size="20px" />
        </Button>
        {children}
      </DialogPanel>
    </div>
  </HeadlessUIDialog>
);
