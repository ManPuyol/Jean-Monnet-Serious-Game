'use client';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import JSConfetti from 'js-confetti';

export function QuizResults({ getScore }: { getScore: Function; }) {
  const router = useRouter();
  const score = getScore();

  const jsConfetti = new JSConfetti();
  let emojis: string[] = [];
  if (score < 50) {
    emojis = ['😢', '😭', '😞'];
  } else if (score < 70) {
    emojis = ['⭐', '🙀', '🎈'];
  } else if (score > 98) {
    emojis = ['💥', '😎', '✨', '🎉', '🎊'];
  } else if (score >= 70) {
    emojis = ['✨', '🎉', '🎊'];
  }

  confetti(emojis);

  return (
    <div className="flex flex-col h-full flex-1 justify-center items-center gap-6 p-6">
      <Button
        variant={'default'}
        className="h-[70px] w-[70px] border-b-8 rounded-full "
        onClick={() => confetti(emojis)}
      >
        <Star className={cn('h-10 w-10', 'fill-white text-white')} />
      </Button>
      <Progress className="w-1/2" value={score} />
      <h2 className="text-4xl font-bold animate-in ">
        You scored {score.toFixed(0)}%
      </h2>
      {Number(score.toFixed(0)) >= 70 && (
        <div className="animate-in">
          <p className="animate-wiggle font-semibold text-foreground text-2xl">
            Quiz passed!
          </p>
        </div>
      )}
      <div className="flex  gap-4 ">
        <Button
          onClick={() => window.location.reload()}
          variant="secondary"
          className={cn(
            'py-2 px-4',
            Number(score.toFixed(0)) >= 70 ? 'hidden' : 'animate-wiggle'
          )}
        >
          Try again
        </Button>
        <Button
          onClick={() => router.back()}
          variant="secondary"
          className="py-2 px-4"
        >
          Finish
        </Button>
      </div>
    </div>
  );

  function confetti(emojis: string[] = ['🎉', '🎊']) {
    void jsConfetti.addConfetti({
      emojis: emojis,
    });
  }
}
