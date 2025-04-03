
const { BSON } = require('mongodb');
const { connectDB } = require('../../utils/connect_db');
module.exports = async (input) => {
    let id = input[0];
    if (id == undefined) throw 'not found id';
    if (typeof id !== 'string') throw 'id must be string';
    if (id.length !== 24) throw 'id must be 24 character';

    const mdb = await connectDB();
    const db = mdb.db("schema");
    const schemaCol = db.collection("schema");

    const schema = await schemaCol.findOne({
        _id: new BSON.ObjectId(id)
    });

    if (!schema) {
        const enumObj = await db.collection("enum").findOne({
            _id: new BSON.ObjectId(id)
        });
        if (!enumObj) throw 'not found schema or enum';
        const enumText = manageEnum(enumObj);
        return enumText;
    } else {
        const outputs = [];
        const schemas = [];

        schemas.push(schema);

        while (schemas.length > 0) {
            const schema = schemas.pop();
            const { text, listAnotherSchema, listAnotherEnum } = await manageSchema(schema);
            outputs.push(text);
            schemas.push(...listAnotherSchema);
            for (const enumObj of listAnotherEnum) {
                const enumText = manageEnum(enumObj);
                outputs.push(enumText);
            }
        }

        return outputs.join('\n');
    }
}

function manageEnum(enumObj) {
    let text = `enum ${enumObj.name} {\n`;
    for (const [fieldName, field] of Object.entries(enumObj.data)) {
        text += `  ${fieldName}\n`;
    }
    text += `}\n\n`;
    return text;
}


async function manageSchema(schema) {
    const listAnotherSchema = [];
    const listAnotherEnum = [];
    const mdb = await connectDB();
    const db = mdb.db("schema");
    const schemaCol = db.collection("schema");
    const enumCol = db.collection("enum");

    let text = `input ${schema.name} {\n`;
    for (const [fieldName, field] of Object.entries(schema.data)) {
        switch (field.type) {
            case 'String':
            case 'Float':
            case 'Boolean':
            case 'JSON':
            case 'ObjectId':
                text += `  ${fieldName}: `;
                if (field.isArray) text += `[`;
                text += `${field.type}`;
                if (field.isArray) text += `]`;
                text += '\n';
                break;
            case 'Object':
                text += `  ${fieldName}: `;
                if (field.isArray) text += `[`;
                console.log("ref ", field.ref);
                const refSchema = await schemaCol.findOne({
                    _id: new BSON.ObjectId(field.ref)
                });
                if (!refSchema) throw 'not found schema';
                listAnotherSchema.push(refSchema);
                text += `${refSchema.name}`;
                if (field.isArray) text += `]`;
                text += '\n';
                break;
            case 'Enum':
                text += `  ${fieldName}: `;
                if (field.isArray) text += `[`;
                console.log("ref ", field.ref);
                const enumObj = await enumCol.findOne({
                    _id: new BSON.ObjectId(field.ref)
                });
                if (!enumObj) throw 'not found enum';
                listAnotherEnum.push(enumObj);
                text += `${enumObj.name}`;
                if (field.isArray) text += `]`;
                text += '\n';
                break;
            default:
                throw 'not found type';
        }
    }

    text += `}\n\n`;
    return {
        text,
        listAnotherSchema,
        listAnotherEnum
    }
}


/* 
{
    _id:ObjectId
    isMain:Boolean
    name:String
    descriptions:String[]
    data:{
        [fieldName]:{
            type: String,
            ref: String, // ref to enum or Object
            isArray: Boolean,
            descriptions: String[],
        }
    }
}

// type
String
Float
Boolean
ObjectId
Object
Enum

// type Enum
{
    _id:ObjectId
    name:String
    descriptions:String[]
    data:{
        [fieldName]:[descriptions[]]
    }
}

ex graphql
input RouteStop {
  shopId: String
  shopName: String
  shopAddr: String
  status: RouteStopStatus
  orderIds: [String]
  updateAt: Float
  shopPhoneNo: [String]
  visitLocation: Location
  cancelNote: String
  visitAt: Float
  note: String
  shopLocation: Location
  shopThumbnail: String
}

enum RouteStopStatus {
  pending
  visit
  cancel
}

 */