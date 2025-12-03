import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";

export const PanelBlobs = () => (
  <>
    <PositionedBlob align="left" className="top-[90%] h-100 w-100 opacity-50">
      <Blob1 />
    </PositionedBlob>
    <PositionedBlob align="right" className="top-[10%] h-100 w-100 opacity-50">
      <Blob4 />
    </PositionedBlob>
  </>
);
