```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    note right of browser: Renders updated list of notes via JS

    activate server
    note right of server: Saves new note
    server-->>browser: Satus 201 "{message: "note created"}
    deactivate server
```
