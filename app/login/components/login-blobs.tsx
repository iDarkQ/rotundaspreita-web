import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";

export const LoginBlobs = () => (
  <>
    <PositionedBlob
      align="left"
      className="top-[15vh] -left-[5vh]! h-100 w-100 opacity-50"
    >
      <Blob1 />
    </PositionedBlob>
    <PositionedBlob
      align="right"
      className="top-[60vh] -right-[5vh]! h-100 w-100 opacity-50"
    >
      <Blob4 />
    </PositionedBlob>
  </>
);
