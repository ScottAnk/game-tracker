# game-tracker  

This website allows users to quickly set up a profile and create a digital copy of their boardgame collection. This can be helpful when planning boardgame nights, or as a fun way to show off your collection to friends.

# User Stories  

## MVP  

- As a user I need to be able to sign in  
- As a user I need to be able to sign out  
- As a user I need to be able to see my game collection  
- As a user I need to be able to add games to my collection  
- As a user I need to be able to remove games from my collection  
- As a user I need to be able to modify the details of games in my collection  
- As a user I want a pleasing aesthetic to the collection  

## Version 2  

- As a user I need a cancel button on create and update screens because I want to be able to back out  
- As a user I need a confirmation prompt before deleting games because it's too easy to accidentally click one button  
- As a user I need to be able to create multiple collections for organization  
- As a user I need to be able to share a read-only link to my collections so I can show my collection to friends  
- As a user I need to be able to access read-only links without signing in so that my friends don't need an account to see my collection  

## Version 3  

- As a user I need to be able to customize the colors of each game  
- As a user I need to be able to add session notes to each game  
- As a user I need to be able to filter my game collection    
- As a user I need to be able to search a list of pre-defined games because I don't want to define all my games myself  

# Entity Relationships  

In order to satisfy the requirements of the MVP user stories, the app will require three database models User, Collection, and Game. Each User has an array of references to Collection documents, and collections have an array of references to Game documents. Strictly speaking, MVP doesn't require a Collection model, but this is futureproofing with the expectation that multiple collections per user will be implemented.
![MVP-entity-relationship-diagram](/readme-images/MVP-entity-relationship-diagram.png)  


# Layout  

The MVP will not support any un-authenticated access. When users first visit the site, they will be invited to create an account or sign in to an existing account.  
![MVP landing page](/readme-images/MVP-landing-page.png)  

Once signed in, users can see and edit their collection. The majority of the screen is filled with the collection, with some action buttons in the sidebar.  
![MVP collection View](/readme-images/MVP-collection-view.png)  

The user can click on a game's preview to see details, edit properties, or delete it. In the MVP, the only way out of this screen is to update the game without changing any details. Adding a cancel button to this view is the first change planned for version 2.  
![MVP update/delete view](/readme-images/MVP-update-delete-view.png)  

The user can click the "new game" button to create a new game for their collection. After adding details, the create button in this view will create the database entry and return the user to the (updated) collection view.  
![MVP create view](/readme-images/MVP-create-view.png)