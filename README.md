# littlelives-appointment-system
LittleLives assessment to create appointment system

## Requirements
Business Logic:
- Each appointment slot is 30 minutes long.
- Appointments are available from 9 AM to 6 PM on weekdays.
- Prevent double bookings for the same slot.

Expected output:
- API to  Retrieve the available slots based on the selected date.
The response should list the available slots and the time. Given that each appointment slot is 30 minutes and only 1 available slots
- Book the appointment based on the available slot. 
Validate if the slot is available. Available slot should be deducted upon appointment made successfully

## Demo Video
Check in `videos/demo.mov` 

<video src="https://github.com/wimpijonathan/littlelives-appointment-system/blob/main/videos/demo.mp4"></video>

## ERD
Check in `images/ERD.jpg`
![Alt text](https://github.com/wimpijonathan/littlelives-appointment-system/blob/main/images/ERD.jpg "Title")

## How to run the apps
```
- Make sure docker already started on your device
- Open 2 terminal console
- Run `npm run docker:start` in one of the console
- Run `npm run start` in another console
- Try to hit the API from postman
```

## Sample Request n Response
- Create Holiday --> this will be used to insert holiday data
```
curl --location 'http://localhost:3000/api/v1/holiday' \
--header 'Content-Type: application/json' \
--data '{
    "from_date": "2024-12-13",
    "to_date": "2024-12-13",
    "description": "School holiday"
}'

{
    "message": "Success!",
    "data": [
        {
            "id": "hol-434d5ead-1801-49e2-8fa8-f4b38c909328",
            "date": "2024-12-13",
            "description": "School holiday",
            "created": "2024-06-17T23:20:18.457Z",
            "updated": "2024-06-17T23:20:18.457Z"
        }
    ]
}
```

- Create Schedule --> this will be used to insert available schedule, it will skip holiday/weekend/unavailable hours that was set before
```
curl --location 'http://localhost:3000/api/v1/schedule' \
--header 'Content-Type: application/json' \
--data '{
    "from_date": "2024-12-13",
    "to_date": "2024-12-16",
    "operation_start_hour": 10,
    "operation_end_hour": 13,
    "duration_in_minutes": 30,
    "available_slots": 5
}'

{
    "message": "Success!",
    "data": [
        {
            "id": "sched-1b379c58-b08d-4104-93d2-c4748a2e6a22",
            "date": "2024-12-16",
            "time": "10:00",
            "available_slot": 5,
            "created": "2024-06-17T23:28:51.657Z",
            "updated": "2024-06-17T23:28:51.657Z"
        },
        {
            "id": "sched-72c21b39-8d1a-4edb-89e3-f8dcf7279e62",
            "date": "2024-12-16",
            "time": "10:30",
            "available_slot": 5,
            "created": "2024-06-17T23:28:51.669Z",
            "updated": "2024-06-17T23:28:51.669Z"
        },
        {
            "id": "sched-3839fd45-603d-4212-97b1-f25cd7d1c258",
            "date": "2024-12-16",
            "time": "13:00",
            "available_slot": 5,
            "created": "2024-06-17T23:28:51.689Z",
            "updated": "2024-06-17T23:28:51.689Z"
        },
        {
            "id": "sched-e5a7b3e5-72a0-4145-9b92-d025696bc24f",
            "date": "2024-12-16",
            "time": "13:30",
            "available_slot": 5,
            "created": "2024-06-17T23:28:51.692Z",
            "updated": "2024-06-17T23:28:51.692Z"
        }
    ]
}
```

- Get Schedule --> this will be used to get all schedule data per date
```
curl --location --request GET 'http://localhost:3000/api/v1/schedule' \
--header 'Content-Type: application/json' \
--data '{
    "date": "2024-06-24"
}'

{
    "message": "Success!",
    "data": [
        {
            "id": "sched-f44d874e-9776-4d40-9a26-3031df10c67c",
            "date": "2024-06-24",
            "time": "10:00",
            "available_slot": 5,
            "created": "2024-06-17T23:24:55.762Z",
            "updated": "2024-06-17T23:33:40.143Z"
        },
        {
            "id": "sched-55fb462a-7337-43f2-a93f-47e1a614238c",
            "date": "2024-06-24",
            "time": "10:30",
            "available_slot": 5,
            "created": "2024-06-17T23:24:55.799Z",
            "updated": "2024-06-17T23:24:55.799Z"
        },
        {
            "id": "sched-2b557786-0335-4798-bd85-6814328f7970",
            "date": "2024-06-24",
            "time": "13:00",
            "available_slot": 5,
            "created": "2024-06-17T23:24:55.810Z",
            "updated": "2024-06-17T23:24:55.810Z"
        },
        {
            "id": "sched-f648542d-69bb-453b-a7c4-636859a8cbe3",
            "date": "2024-06-24",
            "time": "13:30",
            "available_slot": 5,
            "created": "2024-06-17T23:24:55.818Z",
            "updated": "2024-06-17T23:24:55.818Z"
        },
        {
            "id": "sched-662e4609-0165-4a38-8f01-42dd96b8cca5",
            "date": "2024-06-24",
            "time": "14:00",
            "available_slot": 5,
            "created": "2024-06-17T23:24:55.825Z",
            "updated": "2024-06-17T23:24:55.825Z"
        },
        {
            "id": "sched-5b02ca44-401f-4deb-a7cc-bfd571b947ad",
            "date": "2024-06-24",
            "time": "14:30",
            "available_slot": 5,
            "created": "2024-06-17T23:24:55.830Z",
            "updated": "2024-06-17T23:24:55.830Z"
        },
        {
            "id": "sched-17dea95d-ca4d-4a2b-a001-c59ae971559d",
            "date": "2024-06-24",
            "time": "15:00",
            "available_slot": 5,
            "created": "2024-06-17T23:24:55.834Z",
            "updated": "2024-06-17T23:24:55.834Z"
        },
        {
            "id": "sched-884d5c43-bd76-4289-a597-0cf5f8e163f7",
            "date": "2024-06-24",
            "time": "15:30",
            "available_slot": 5,
            "created": "2024-06-17T23:24:55.845Z",
            "updated": "2024-06-17T23:24:55.845Z"
        }
    ]
}
```

- Create Appointment --> this will be used to create appointment, and available slot will be decreased by 1
```
curl --location 'http://localhost:3000/api/v1/appointment' \
--header 'Content-Type: application/json' \
--data '{
    "schedule_id": "sched-f44d874e-9776-4d40-9a26-3031df10c67c",
    "user_id": "user-test-1"
}'

{
    "message": "Success!",
    "data": {
        "id": "app-eb09849e-ab91-44df-a0b1-a7acceb4931d",
        "schedule_id": "sched-f44d874e-9776-4d40-9a26-3031df10c67c",
        "user_id": "user-test-1",
        "created": "2024-06-17T23:33:15.065Z",
        "updated": "2024-06-17T23:33:15.065Z"
    }
}
```

- Cancal Appointment --> this will be used to cancel appointment, and available slot will be increased again
```
curl --location 'http://localhost:3000/api/v1/appointment/cancel' \
--header 'Content-Type: application/json' \
--data '{
    "appointment_id": "app-eb09849e-ab91-44df-a0b1-a7acceb4931d"
}'

{
    "message": "Success!"
}
```