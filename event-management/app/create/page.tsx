"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateEventPage() {
  const [name, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxCapacity, setMaxCapacity] = useState<number>(0);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);


  const isFormValid = useMemo(() => {
    return (
      name.trim() !== "" &&
      startDate !== "" &&
      endDate !== "" &&
      maxCapacity !== 0 &&
      location.trim() !== "" &&
      new Date(startDate) < new Date(endDate) && 
      new Date(startDate) >= new Date()
    );
  }, [name, startDate, endDate, maxCapacity, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const startUTC = new Date(startDate).toISOString();
      const endUTC = new Date(endDate).toISOString();

      const payload = {
        name,
        start_time: startUTC,
        end_time: endUTC,
        max_capacity: maxCapacity,
        location,
        created_by: 1,
      };

      const res = await fetch("http://localhost:8000/api/events", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

//     fetch("http://localhost:8000/api/test", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ test: 123 }),
// });

      if (!res.ok) throw new Error("Failed to create event");
      const data = await res.json();
      console.log("Event created:", data);
      alert("Event created successfully!");
      
      // Reset form
      setTitle("");
      setStartDate("");
      setEndDate("");
      setMaxCapacity(0);
      setLocation("");
    } catch (err) {
      console.error(err);
      alert("Error creating event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Create New Event</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Event Name"
          value={name}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="space-y-2">
          <label className="block">Start Date & Time</label>
          <Input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block">End Date & Time</label>
          <Input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
            <label className="block">Maximum capacity</label>
            <Input
            type="number"
            placeholder="Max Capacity"
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(parseInt(e.target.value))}
            min={1}
            required
            />
        </div>

        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading || !isFormValid}>
          {loading ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
}
