[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/uL0-klqZ)
## Database Diagram
```mermaid
classDiagram
    class Category{
		    ObjectId _id
        string UserID
        string Name
		string Color
    }
    
    class Transaction{
		    ObjectId _id
		    string UserID
		    string Name
		    string Description
		    string CategoryID
		    date Date
		    double Price
		    string Type
    }
    
    class User{
		    ObjectId _id
		    string Username
    }
    
    class Budget{
		    ObjectId _id
		    string UserID
		    double Total
		    array[object] Allocations
		    date StartDate
		    date EndDate
    }

    note for Budget "Allocations is not its own collection"
    
    Category --> User
    Transaction --> User
    Transaction --> Category
    Budget --> User
    Budget --> Category
```
