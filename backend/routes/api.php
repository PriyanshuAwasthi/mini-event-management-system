<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('events', [EventController::class, 'getAllEvents']);

Route::get('events/{event_id}/attendees', [EventController::class, 'getAttendeesForEvent']);

Route::post('events/{event_id}/register', [EventController::class, 'registerAttendeeForEvent']);

Route::post('events', [EventController::class, 'createEvent']);

Route::post('/test', function (\Illuminate\Http\Request $request) {
    return response()->json(['ok' => true, 'data' => $request->all()]);
});
