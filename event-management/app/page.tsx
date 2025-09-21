import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-semibold">Welcome to Event Manager 🎉</h2>
      <p className="text-gray-600">
        Create and manage events, track attendees, and collaborate easily.
      </p>
      <Button asChild>
        <a href="/events">View Events</a>
      </Button>
    </div>
  );
}
