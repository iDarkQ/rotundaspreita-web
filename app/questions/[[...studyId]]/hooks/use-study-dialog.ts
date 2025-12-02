import { Study } from "@/app/generated/prisma/browser";
import { useManageSelectedStudy } from "@/app/questions/[[...studyId]]/providers/manage-selected-study";
import {
    updateStudy,
    deleteStudy,
    createStudy,
} from "@/app/_services/study-service";
import { RouteNames } from "@/app/_utils/route-names";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface Props {
    onClose: () => void;
    study?: Study;
}

export const useStudyDialog = ({ onClose, study }: Props) => {
    const router = useRouter();

    const titleRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = async () => {
        if (!titleRef.current) return;

        const title = titleRef.current.value;

        if (study) {
            await updateStudy(study.id, title);
            router.refresh();
        } else {
            const study = await createStudy(title);
            if (study) {
                router.push(RouteNames.QUESTIONS + "/" + study.id);
            }
        }

        onClose();
    };

    const handleDeleteStudy = async () => {
        if (!study) return;
        await deleteStudy(study.id);
        router.push(RouteNames.QUESTIONS);
        onClose();
    };

    return { titleRef, study, handleDeleteStudy, handleButtonClick };
}