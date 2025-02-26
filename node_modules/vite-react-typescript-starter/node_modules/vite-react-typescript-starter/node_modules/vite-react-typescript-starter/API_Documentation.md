
# API List & Purpose for Your Application

Here is a structured list of the APIs developed for your application, categorized by their purpose:

## User Authentication APIs (Manage user accounts)

| Method | Endpoint       | Purpose                              |
|--------|----------------|--------------------------------------|
| POST   | /users/register | Register a new user account          |
| POST   | /users/login    | Authenticate user and return a token |
| GET    | /users/me       | Fetch logged-in user's profile details|

## Patient Management APIs (Store patient details)

| Method | Endpoint         | Purpose                    |
|--------|------------------|----------------------------|
| POST   | /patient/create  | Create a new patient record|

## Audio Management APIs (Handle audio recording & transcription)

| Method | Endpoint                   | Purpose                                      |
|--------|----------------------------|----------------------------------------------|
| POST   | /audio/upload              | Upload an audio recording (MP3/WAV) for a patient |
| GET    | /audio/files/{patient_id}  | Retrieve all audio files recorded for a patient |
| GET    | /audio/transcribe/{audio_id} | Convert an uploaded audio file to text using Deepgram ASR |

## EHR (Electronic Health Record) Generation APIs

| Method | Endpoint         | Purpose                                      |
|--------|------------------|----------------------------------------------|
| POST   | /llm/generate    | Generate a structured EHR (Electronic Health Record) from the transcribed text |

## Translation APIs

| Method | Endpoint                | Purpose                                      |
|--------|-------------------------|----------------------------------------------|
| POST   | /translate/translate    | Translate an EHR document into another language |

## PDF Generation & Download APIs

| Method | Endpoint                      | Purpose                                      |
|--------|-------------------------------|----------------------------------------------|
| GET    | /pdf/generate_pdf/{patient_id} | Generate a PDF document for a patient's EHR  |
| GET    | /pdf/download_pdf/{filename}   | Download a previously generated EHR PDF      |

## Workflow of the APIs

1. User logs in (/users/login).
2. User creates a patient record (/patient/create).
3. User records & uploads audio (/audio/upload).
4. Backend transcribes audio (/audio/transcribe/{audio_id}).
5. LLM generates structured EHR (/llm/generate).
6. Optional: Translate EHR (/translate/translate).
7. Convert EHR to a downloadable PDF (/pdf/generate_pdf/{patient_id}).
8. User downloads the PDF (/pdf/download_pdf/{filename}).

This setup ensures seamless interaction between React (frontend) and FastAPI (backend). Let me know if you need any modifications! 😃
