# Turni Manager Backend System Design

## Database

### Tables

1. User
  Table for storing user credentials and profile.
  
    Columns:
     - ID (PK) {Int}
     - Username {String}
     - Password {String}
     - Email {String}
     - ProfileImageURL {String}
     - AccessToken {String?}
     - RefreshToken {String?}
  
2. Tournament
  Table for storing details of information about tournament events.
  
    Columns:
     - ID (PK) {Int}
     - Name {String}
     - StartDate {Date}
     - EndDate {Date}
     - Game {String}
     - Status {String}
     - Admins (FK) {Int[]}
     - Participants (FK) {Int[]}
3. Participant
  Table for storing participant details for each tournament.
  
    Columns:
     - TournamentID (FK) {Int}
     - UserID (FK) {String}   
     - Alias {String}
     - Prefix {String}
4. BracketScore
  Table for storing participant's scores for each tournament.
  
    Columns:
     - TournamentID (FK) {Int}
     - MatchID {Int}
     - UsersID (FK) {Int[]}
     - Score {Int[]}
     - WinnerID (FK) {Int}

## Endpoint

1. /user
  
    Endpoint for querying and managing users credentials and profile.
     - GET /user -> For fetching all users in Admin dashboard.
     - GET /user/:username -> For fetching user's profile.
     - POST /user -> For creating new user from Admin dashboard.
     - PATCH /user/:username -> For updating user's profile.
     - DELETE /user/:username -> For deleting user's account.

2. /tournament
  
    Endpoint for querying and managing tournaments infomation details.
     - GET /tournaments -> For browsing tournaments.
     - GET /tournaments/:id -> For fetching tournament details.
     - POST /tournaments -> For creating new tournament.
     - PATCH /tournaments/:id -> For updating tournament details.
     - DELETE /tournaments/:id -> For deleting tournament.

3. /participant
  
    Endpoint for querying and managing participants details for each tournament.
     - GET /participants/:tourid -> For fetching participants of a tournament.
     - GET /participants/:userid -> For fetching tournaments that a user is participating in.
     - POST /participants -> For adding new participant.
     - PATCH /participants/:tourid?username={username} -> For updating participant's details in a tournament.
     - DELETE /participants/:tourid?username={username} -> For removing participant from tournament.

4. /bracket-score
  
    Endpoint for querying and managing scores details for each round of a tournament.
     - GET /bracket-scores/:tourid -> For fetching scores of a tournament.
     - POST /bracket-scores -> For creating a record after a score is reported.
     - PATCH /bracket-scores/:tourid?matchid={matchid} -> For updating a reported score of a tournament.

5. /auth
  
    Endpoint for authenticating users.
     - POST /auth/register -> For registering new user.
     - POST /auth/login -> For logging in user.
     - POST /auth/logout -> For logging out user.
  
