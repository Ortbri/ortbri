import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4">
      <nav className="flex justify-end">
        <ThemeSwitcher />
      </nav>
      <main className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold text-foreground">Welcome</h1>
        <p className="mt-4 text-muted-foreground">
          Your content goes here. The theme will automatically switch between light and dark modes.
        </p>
      </main>
    </div>
  );
}
