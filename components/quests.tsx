import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getAchievementsProgress } from '@/controllers/achievements';
import { getEmoji } from '@/lib/utils';

export const Quests = async () => {
  const userStats = await getAchievementsProgress();

  const getQuestType = (type: number) => {
    switch (type) {
      case 1:
        return 'Quizzes done';
      case 2:
        return 'Quizzes approved';
      case 3:
        return 'Perfect scores';
      default:
        return '';
    }
  };

  return (
    <Card className="space-y-2 w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Quests</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="w-full space-y-4">
          {userStats.map((quest, index) => (
            <div key={index} className="flex items-center w-full pb-4 gap-x-3">
              <p className="text-4xl">{getEmoji(quest.type || 0)}</p>

              <div className="flex flex-col gap-y-2 w-full">
                <div className="flex flex-row justify-between">
                  <p className="text-sm font-bold ">
                    {getQuestType(quest.type || 0)}
                  </p>
                  <p className="text-muted-foreground text-sm font-bold ">
                    {quest.current > (quest.threshold || 0)
                      ? quest.current
                      : `${quest.current || 0} / ${quest.threshold || 5}`}
                  </p>
                </div>
                <Progress
                  value={Math.min(
                    Math.floor(
                      (quest.current * 100) / (quest.threshold || 100),
                    ),
                    100,
                  )}
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
