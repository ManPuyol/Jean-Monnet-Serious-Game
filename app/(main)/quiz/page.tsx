import { Progress } from '@/components/ui/progress';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Quiz() {
  return (
    <div className="p-8 h-full max-h-full">
      <div className="max-w-3xl mx-auto max-h-full">
        <div className="flex justify-between items-center mb-6 gap-4">
          <Progress className="w-full" value={90} />
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 font text-red-500" />
            <span className="font-semibold">5</span>
          </div>
          {/* <Avatar>
            <AvatarImage alt="User avatar" src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar> */}
        </div>
        <div className="mb-6 p-6 border rounded-md shadow ">
          <h2 className="zsm:text-sm font-semibold text-center">
            What is the capital of France? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Labore non placeat, quod aliquid
            ratione quae fugit distinctio tempora suscipit, voluptates
            voluptatem, dolorum voluptatum. Quisquam, quod. Lorem ipsum dolor sit
          </h2>
        </div>
        <ScrollArea>
          <div className="grid grid-cols-1 gap-4  h-full auto-rows-[1fr] ">
            <Button
              variant="success"
              className="py-4 !h-auto whitespace-normal"
            >
              Paris - Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Button>
            <Button
              variant="destructive"
              className="py-4 !h-auto whitespace-normal"
            >
              London - Lorem ipsum dolor sit amet consectetur adipisicing
              elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Button>
            <Button
              variant="secondary"
              className="py-4 !h-auto whitespace-normal"
            >
              Berlin - Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Button>
            <Button
              variant="secondary"
              className="py-4 !h-auto whitespace-normal"
            >
              Madrid -
            </Button>
          </div>
        </ScrollArea>
        <div className="flex flex-row-reverse">
          <Button variant="default" className="mt-6 w-1/3 py-4 ">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
