"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";

type User = {
  name: string;
  email: string;
  isAdmin: boolean;
};

type GetAttendeesListResponseDto = {
  code: string;
  attendees: User[];
};

export default function EventPage() {
  const { id } = useParams();

  const [attendees, setAttendees] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/events/${id}/attendees`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch attendees");

        const data: GetAttendeesListResponseDto = await res.json();
        console.log(data);
        setAttendees(data.attendees || []); // fallback to empty array
      } catch (err) {
        console.error("Error fetching attendees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, [id]);

  if (loading) {
    return <p>Loading attendees...</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Event Details</h2>

      <Card>
        <CardHeader>
          <CardTitle>Event ID: {id}</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-medium mb-2">Attendees ({attendees.length})</h3>
          {attendees.length === 0 ? (
            <p className="text-gray-500">No attendees yet.</p>
          ) : (
            <ul className="list-disc pl-6 space-y-1">
              {attendees.map((att) => (
                <li key={att.email}>
                  <span className="font-medium">{att.name}</span> – {att.email}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
