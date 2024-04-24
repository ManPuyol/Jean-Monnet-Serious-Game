import { Progress } from '@/components/ui/progress';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export default function Component() {
  return (
    <div className=" p-8">
      <div className="max-w-3xl mx-auto">
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
          <h2 className="text-lg font-semibold text-center">
            What is the capital of France? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Saepe iusto ducimus velit fuga esse,
            assumenda omnis voluptatem soluta neque impedit optio molestiae
            dolores deleniti illum praesentium aspernatur molestias sit. Laborum
            dolor commodi omnis et, ab minus possimus ea nesciunt quibusdam
            earum qui quisquam sit dolorum accusamus! Inventore nesciunt amet
            ex!
          </h2>
        </div>
        <div className="grid gap-4">
          <Button variant="success" className="w-full py-4">
            Paris - Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Button>
          <Button variant="destructive" className="w-full py-4">
            London - Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Button>
          <Button variant="secondary" className="w-full py-4">
            Berlin - Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Button>
          <Button variant="secondary" className="w-full py-4">
            Madrid - Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Button>
        </div>
        <div className='flex flex-row-reverse'>
          <Button variant="default" className="mt-6 w-1/3 py-4 ">Next</Button>
        </div>
      </div>
    </div>
  );
}
