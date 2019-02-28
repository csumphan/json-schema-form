# Tippers API Frontend
This is a user interface allowing users to interact/set up their TIPPERS instance. The user interface is customized by editing a JSON schema file.

![tippers-api-frontend-1](https://user-images.githubusercontent.com/19628690/53596154-fc233180-3b53-11e9-8197-43ab24b1e53c.gif)

## How to Setup/Installation
**Step 1:** git clone this repo:

```bash
git clone https://github.com/csumphan/react-loader-test.git
```

**Step 2:** cd to the cloned repo:

```bash
cd react-loader-test
```

**Step 3:** Install the Application with `yarn`


**Step 4:** Run the Application in development mode using `yarn start`

## How to Create Production Build

**Step 1:** Complete repo setup/installation


**Step 2:** Run the webpack build using `yarn build`

You can find the build in build/ in the project's root directory

## Usage
The UI is completely rendered based of the information in `formSchema.json`. Each outer key of the schema represents a path to view/edit/create that specified object type.

The following is an example of a single 
```json
{
"spaceType": {
    "label": "Space Types",
    "path": "/spacetype",
    "definitionsUsed": ["property"],
    "form": {
      "title": "Spacetype Form",
      "description": "Add or edit spacetype",
      "type": "object",
      "required": [
        "id",
        "label"
      ],
      "properties": {
        "id": {
          "type": "string",
          "title": "ID"
        },
        "label": {
          "type": "string",
          "title": "Label"
        },
        "description": {
          "type": "string",
          "title": "Description"
        },
        "subTypeOf": {
          "type": "spaceType",
          "title": "Subtype of"
        },
        "properties": {
          "title": "Properties",
          "type": "array",
          "items": {
            "type": "object",
            "$ref": "#/definitions/property"
          }
        }
      }
    },
    "ui": {
      "id": {
        "ui:placeholder": "BO_Conference_Room"
      },
      "subTypeOf": {
        "ui:widget": "typeahead",
        "ui:placeholder": "BO_Conference_Room (optional)"
      },
      "properties": {
        "ui:options": {
          "orderable": false
        },
        "items": {
          "id": {
            "ui:placeholder": "BO_Conference_Room_Occupancy"
          },
          "label": {
            "ui:placeholder": "Occupancy"
          },
          "description": {
            "ui:placeholder": "Description about Room Occupancy"
          },
          "observedBy": {
            "ui:widget": "typeahead",
            "ui:placeholder": "3022-clwa-209"
          },
          "observation_type": {
            "ui:widget": "typeahead",
            "ui:placeholder": "BO_Accelerometer_Reading"
          }
        }
      }
    }
  }
}
```
