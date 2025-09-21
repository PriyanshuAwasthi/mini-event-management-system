<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Event;
use App\Dtos\PostEventDto;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Dtos\PostEventResponseDto;
use App\Dtos\GetEventListResponseDto;
use App\Http\Requests\PostEventRequest;
use App\Dtos\GetAttendeesListResponseDto;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createEvent(PostEventRequest $request)
    {
        // dump($request);
        $dto = new PostEventDto($request->validated());

        $event = Event::create([
            'uuid' => Str::uuid()->toString(),
            'name' => $dto->name,
            'location' => $dto->location,
            'start_time' => $dto->start_time,
            'end_time' => $dto->end_time,
            'max_capacity' => $dto->max_capacity,
            'created_by' => $dto->id
        ]);


        $responseDto = new PostEventResponseDto(201, $event);

        return response()->json($responseDto);
    }


    public function getAllEvents()
    {
        $currentDate = now('UTC');
        $events = Event::where('start_time', '>', $currentDate)->get();

        $responseDto = new GetEventListResponseDto(200, $events);

        return response()->json($responseDto);
    }


    public function getAttendeesForEvent(string $event_id) {
        $event = Event::where('uuid', $event_id)->first();
        $attendees = $event->attendees;

        $responseDto = new GetAttendeesListResponseDto(200, $attendees);
        return response()->json($responseDto);
    }


    public function registerAttendeeForEvent(string $event_id, Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email'
        ]);

        try {
            $event = Event::where('uuid', $event_id)->firstOrFail();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Event not found.'
            ], 404);
        }

        $totalAttendees = $event->attendees();

        if($totalAttendees->count() == $event->max_capacity) {
            {
                return response()->json([
                    'error' => 'Max capacity of event reached'
                ], 404);
            }
        }


        
        $user = User::find($request->id);

        if ($user == null) {
            return response()->json([
            'error' => 'User not found.'
        ], 404);
        }

        
        
        $isAttendiingAlready = $user->attendingEvents()->where('event_id', $event->id)->exists();

        if ($isAttendiingAlready) {
            // Add error message
            return response()->json(['error' => 'User is already attending the event'], 404);
        }

        $user->attendingEvents()->attach($event->id);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
