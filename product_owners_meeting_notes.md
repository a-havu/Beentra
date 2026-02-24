2.2.2026

Login Page

- Username [field]
- Password [field]
- Login [btn]
- Forgot password [btn]
- Remember me (come up with better name) [checkbox]

Header

- Main Menu [menu]
  - Projects [link]
  - Events [link]
  - Bookme [link]

- Profile [menu]
  - Profile [link]
  - Settings [link]
  - My events [link]
  - My projects [link]
  - Sign out [btn]

Frontpage

- Weekly events [list]
  - Name [element]
  - Date [element]
  - Time [element]
  - Location [element]
  - Type (Student, Hive, External) [color]
  - Image (optional) [img]
  - Subscribe / Unsubscribe [btn]

- Calender [calender]
  - Shows current month [calendar]
  - Switch months [btn]
  - Preview cards [element]
    - Time [element]
    - Name [element]

    # THIS WILL POP UP WHEN CLICKED ON A EVENT
    - Event Card
      - Name [element]
      - Date [element]
      - Time [element]
      - Location [element]
      - Organizer [element]
      - Type (Student, Hive, External) [color]
      - Image (optional) [img]
      - Subscribe / Unsubscribe [btn]
      - Description [element]
        if logged in & admin || creator
      - Edit Event[btn]
      - Delete Event[btn]

- Filter
  - Student event [checkbox]
  - Hive event [checkbox]
  - External event [checkbox]

- Create event [btn]
  - Event Card
    - Name [field]
    - Date [field]
    - Time [field]
    - Location [field]
    - Organizer [field]
    - Type (Student, External) [color]
    - Image (optional) [upload]
    - Description [field]
    - Publish [btn]

- Something with projects [mostrecent] [mostupvoted]
- Bookme [link]

Footer

- FAQ's [link]
- Terms & Conditions [link]
- GDB[link]
- Contact thingy [link] [form]

Projects Page

- Introduction to the Projects Page
- Filter / Format (How the grid layout is shown; big cards, small cards, list etc.) (Filter by languages, type (we need to create these), creator)
- Search field
- Add project [btn]
  - Uses same layout project page, but fields are empty, need to be filled
  - Submit button [btn]
  - Cancel button [btn]
- Grid layout of cards - Card [element] - Background imgae / color [img] - Title [string] - Description [txt] - Likes [btn] - Creator [string]
- Pagenation

Single project page

- Title
- Link field (Github etc)
- Title imgage
- Creator
- Summary
- Description
- Image gallery
- if Admin / Creator
  - Edit button
  - Delete button
