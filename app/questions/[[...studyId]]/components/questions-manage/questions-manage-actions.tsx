"use client";

import { QuestionsManageButton } from "@/app/questions/[[...studyId]]/components/questions-manage/questions-manage-button";
import { QuestionsManageImportButton } from "@/app/questions/[[...studyId]]/components/questions-manage/questions-manage-import-button";

export const QuestionsManageActions = () => (
  <div className="flex gap-2 max-lg:flex-col">
    <QuestionsManageButton />
    <QuestionsManageImportButton />
  </div>
);
