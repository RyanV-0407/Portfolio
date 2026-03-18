import { useEffect } from "react";
import { CustomCursor } from "@/components/CustomCursor";

export const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Not Found";
  }, []);

  return (
    <div className="min-h-screen bg-ink text-background flex flex-col items-center justify-center font-mono p-6">
      <CustomCursor isDark={true} />
      <div className="border border-primary/30 p-8 md:p-12 max-w-lg w-full bg-[#160f07] shadow-2xl relative overflow-hidden animate-fade-in animation-delay-200">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>

        <div className="text-primary mb-2 text-sm opacity-80">vishal@server:~$ cd /requested-route</div>
        <div className="text-red-400 mb-8 text-sm">bash: cd: /requested-route: No such file or directory</div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-2 text-background">404</h1>
        <p className="text-muted-foreground mb-10 text-sm md:text-base">Error: Segment fault (core dumped). The page you are looking for does not exist on this server.</p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-ink transition-colors text-sm uppercase tracking-wider"
          >
            <span className="font-bold opacity-70">&gt;</span> ./go_home.sh
          </a>
        </div>
      </div>
      
      <div className="mt-8 text-muted-foreground/40 text-xs animate-fade-in animation-delay-600">
        System code: 0x00000404
      </div>
    </div>
  );
};
