"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link'


export default function EventsPage() {
    const [data, setData] = useState<GetEventListResponseDto | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/events')
        .then(res => res.json())
        .then(setData)
    }, []);
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.events.map(event => (
          <Card key={event.uuid}>
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">📅 {new Date(event.start_time + "Z").toLocaleString()}</p>
                <div className="flex justify-between mt-2">
                    <Button variant="outline">
                        <Link href={`/events/${event.uuid}`}>View Attendees</Link>
                    </Button>
                    <Button variant="outline">
                        <Link href={{
                            pathname: `/events/${event.uuid}/register`,
                            query: {
                            eventName: event.name,
                            maxCapacityOfEvent: event.max_capacity.toString(),
                            },
                        }}>Register</Link>
                    </Button>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


type Event = {
  uuid: string;
  name: string;
  location: string;
  start_time: string;
  end_time: string;
  max_capacity: number;
};

type GetEventListResponseDto = {
  code: string;
  events: Event[];
};