# exercise1
Exercise 1 - restful services course

### This is a PrivateMessages for VOD library ###


### API

Functions:

***Get all messages***
**Type**: GET
**/allMessages**
**Response** : JSON

***Get all messages by id***
**Type**: Post
**Parameters**
user_id int
**/userMessages_id/**
**Response** : JSON
**Error: wrong id**

***Get all messages by username***
**Type**: Post
**Parameters:**
user_name String

**/userMessages_name/**
**Response** : JSON
**Error: wrong username**

***Get all messages by dates***
**Type**: Post
**Parameters**
user_id int *Optional, priority to username*
user_name String *Optional*
from_date String *required* format: mm/dd/yy
to_date String *Optional* - if you want to limit your results
**/userMessages_date/**
**Response** : JSON
**Error: wrong dates format**

**Respone Example: **
[{
	{
		"user":{"name":"friend","id":123},
		"recieved":{"date":"5/11/2017", "time":"14:45"},
		"content":"Hey, it was very good seeing you!"
	}
}]

All return JSONs are organized by date & time, get all messages is returned organized by user id as well

### Authors and Contributors
* **category:** node WS library.
* **author:** Eldad C.  