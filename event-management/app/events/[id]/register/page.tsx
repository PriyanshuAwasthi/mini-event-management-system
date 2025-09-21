"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams, useParams } from "next/navigation";

export default function RegisterForEvent() {
  const searchParams = useSearchParams();
  const params = useParams();

  const eventId = params.id;

  const eventName = searchParams?.get("eventName") ?? "Unknown Event";
  const maxCapacityOfEvent = searchParams?.get("maxCapacityOfEvent") ?? "0";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      name.trim() !== "" &&
      email.trim() !== ""
    );
  }, [name, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name,
        email,
        id: 5
      };

      const res = await fetch(`http://localhost:8000/api/events/${eventId}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to register");
      const data = await res.json();
      console.log("Registered for event", data);
      alert("Registered for event!");
      
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Error registering.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Register for {eventName}</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading || !isFormValid}>
          {loading ? "Registering..." : "Register for Event"}
        </Button>
      </form>
    </div>
  );
}
