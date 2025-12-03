import { Blob2 } from "@/app/_components/svgs/blob-2";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";

export const AboutBlobs = () => (
  <>
    <PositionedBlob align="right" className="top-[40vh] h-100 w-100 opacity-50">
      <Blob4 />
    </PositionedBlob>
    <PositionedBlob align="left" className="top-[90vh] h-100 w-100 opacity-50">
      <Blob2 />
    </PositionedBlob>
  </>
);
