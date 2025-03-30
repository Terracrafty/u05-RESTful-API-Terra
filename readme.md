# Monster Hunter API (MHAPI)
API for Monster Hunter Wilds equipment.

Deployed API is available at `https://u05-restful-api-terra.onrender.com/api`

## Running locally
1. Install [MongoSH](https://www.mongodb.com/docs/mongodb-shell/)
2. Copy .env.example to .env
3. Run `npm install && npm run build`
4. Run `npm run start` to start the app on the default port of 3000
5. Api will be accessible at `localhost:3000/api`. Enjoy!

# API Docs
## Users
### Display all users
Displays ID and username for all existing users.

#### Request: 
`GET .../api/users`

#### Response: 
JSON object containing array containing objects representing all users. 

    {
        "users": [
            {
                "_id": "67dc1f80d512d2be5f5fecdd",
                "name": "Pelle"
            },
            {
                "_id": "67e284ccec2a9942b2151987",
                "name": "jim"
            }
        ]
    }

### Display user
Not implemented.

#### Request: 
`GET .../api/users/[ID]`

### Create new user
Adds new user to database.

#### Request: 
`POST .../api/users`

#### Body (JSON):

    {
	    "name": "string",
	    "email": "string",
	    "password": "string"
    }

#### Response: 
JSON object representing new user.

### Login
Creates bearer token. Token is valid for 8 hours.

#### Request: 
`POST .../api/users/login`

#### Body (JSON):

    {
	    "email": "string",
	    "password": "string"
    }

#### Response: 
    {
        "token" : "string"
    }

### Update user
Updates user information.

#### Request: 
`PATCH .../api/users/[ID]`

#### Authorization

Requires bearer token to authorize.

#### Body (JSON):

    {
        "name" : "string, optional",
	    "email": "string, optional",
	    "password": "string, optional"
    }

#### Response: 
JSON object representing updated user.

### Delete user
Deletes user.

#### Request: 
`DELETE .../api/users/[ID]`

#### Authorization

Requires bearer token to authorize.

#### Response: 

    {
	    "message": "User successfully deleted"
    }

## Weapons

### Display weapon
Displays object representing specific weapon.

#### Request: 
`GET .../api/weapons/[ID]`

#### Response: 
    {
        "_id": "67e976e550f4abacbb053ece",
        "name": "Giant Jawblade",
        "type": "Great Sword",
        "raw": 1152,
        "element": 0,
        "affinity": 0,
        "defense": 0,
        "slots_1": 1,
        "slots_2": 1,
        "slots_3": 1,
        "skills": [
            {
                "_id": "67e98416e4dacc6d63b42258",
                "skill": {
                    "_id": "67e977656a8732c8bed7c489",
                    "name": "Protective Polish",
                    "max_level": 3
                },
                "level": 2
            },
            {
                "_id": "67e98416e4dacc6d63b42259",
                "skill": {
                    "_id": "67e977816a8732c8bed7c48a",
                    "name": "Focus",
                    "max_level": 3
                },
                "level": 2
            }
        ],
        "max_sharpness": "blue"
    }

### Display all weapons
Display array containing object representations of all weapons.

#### Request: 
`GET .../api/weapons`

#### Response: 
Array containing object representations of all weapons.

## Armors

### Display armor
Displays object representing specific armor.

#### Request: 
`GET .../api/armors/[ID]`

#### Response: 
    {
		"_id": "67e9797f50f4abacbb053ed0",
		"name": "G Ebony Helm β",
		"type": "head",
		"defense": 48,
		"fire_resist": -2,
		"water_resist": -3,
		"lightning_resist": -2,
		"ice_resist": -2,
		"dragon_resist": 4,
		"slots_1": 0,
		"slots_2": 1,
		"slots_3": 0,
		"skills": [
			{
				"_id": "67e984afe4dacc6d63b4225c",
				"skill": {
					"_id": "67e97b206a8732c8bed7c48c",
					"name": "Burst",
					"max_level": 5
				},
				"level": 2
			}
		]
	}

### Display all armors
Display array containing object representations of all armors.

#### Request: 
`GET .../api/armors`

#### Response: 
Array containing object representations of all armors.

## Skills

### Display skill
Displays object representing specific skill.

#### Request: 
`GET .../api/skills/[ID]`

#### Response: 
    {
		"_id": "67e7e1e8db29344beb2acfa6",
		"name": "Rapid Morph",
		"max_level": 3
	}

### Display all skills
Display array containing object representations of all skills.

#### Request: 
`GET .../api/skills`

#### Response: 
Array containing object representations of all skills.

## Decorations

### Display decoration
Displays object representing specific decoration.

#### Request: 
`GET .../api/decorations/[ID]`

#### Response: 
    {
		"_id": "67e97f13add44a1613046ec5",
		"name": "Attack Jewel 1",
		"size": 1,
		"skills": [
			{
				"_id": "67e9852ce4dacc6d63b42266",
				"skill": {
					"_id": "67e97ea76a8732c8bed7c48f",
					"name": "Attack Boost",
					"max_level": 5
				},
				"level": 1
			}
		]
	}

### Display all decorations
Display array containing object representations of all decorations.

#### Request: 
`GET .../api/decorations`

#### Response: 
Array containing object representations of all decorations.

## Builds
Builds are not implemented, sorry