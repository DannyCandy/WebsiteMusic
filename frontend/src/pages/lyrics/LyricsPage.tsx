import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { Link} from "react-router-dom";

const LyricsPage = () => {

  const placeholderLyrics = [
    "This is a placeholder lyric line 1",
    "This is a placeholder lyric line 2",
    "This is a placeholder lyric line 3",
    "This is a placeholder lyric line 4",
    "This is a placeholder lyric line 5",
    "This is a placeholder lyric line 6",
    "This is a placeholder lyric line 7",
    "This is a placeholder lyric line 8",
    "This is a placeholder lyric line 9",
    "This is a placeholder lyric line 10",
  ];
//min-h-screen bg-opacity-0 text-white flex flex-col items-center justify-center p-4"

  return (
    <div className="min-h-screen bg-maroon-900 text-white p-4">
      <Card className="bg-maroon-800 border-none">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold text-white">Placeholder Song - Placeholder Artist</h2>
          <Link to="/">
            <Button variant="outline" className="mt-2 text-white border-white hover:bg-maroon-700">
              Back to Main
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <TooltipProvider>
              {placeholderLyrics.map((lyric, index) => (
                <div key={index} className="py-2 text-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        className="cursor-pointer hover:underline text-lg text-white"
                        
                      >
                        {lyric}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
            
                      <p>0:0{index}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </TooltipProvider>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default LyricsPage;