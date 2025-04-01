

const { connectDB } = require('../../utils/connect_db');
module.exports = async (input) => {
    let isOnlyMain = input[0];
    if (isOnlyMain == undefined) isOnlyMain = true;
    const mdb = await connectDB();
    const db = mdb.db("schema");

    const schemaCol = db.collection("schema");

    const schemas = await schemaCol.find(isOnlyMain ? {
        isMain: true
    } : {}).toArray();

    const res = schemas.map(schema => {
        const id = schema._id.toString();
        const name = schema.name;
        return {
            id,
            name
        }
    });

    res.sort((a, b) => a.name.localeCompare(b.name));
    return res;
}

/* 
// type input
//list function
    get schemas (main and all) /
    get schema by id /
    get enums /
    get enum by id /
    edit schema
        create new schema /
        edit isMain schema /
        edit name schema /
        edit descriptions schema /
        add new field (and type ref isArray) /
        edit field name /
        delete field /
        edit type field (type ref isArray) /
        edit descriptions field /
    create enum
        create new enum /
        edit name enum /
        edit descriptions enum /
        add new field /
        edit field name /
        delete field /
        edit descriptions field /
    get schemas that used in another schema by id /
    get enum that used in another schema by id /
    get graphql schemas
    // end list function

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

{
    "name": "ad",
    "isMain": true,
    "descriptions": [
        "products to be advertised prod, buyAB, buyN, "
    ],
    data:{
        "_id":{
            "type": "ObjectId",
            "ref": null,
            "isArray": false,
            "descriptions": []
        },
        "amounts":{
            "type": "Object",
            "ref": "67ea462d8934619fe07e19e5",
            "isArray": true,
            "descriptions": []
        },
        "configs":{
            "type": "Object",
            "ref": "67ea4ba48934619fe07e19e8",
            "isArray": true,
            "descriptions": []
        },
        "conmProdId":{
            "type": "String",
            "ref": null,
            "isArray": false,
            "descriptions": ["ref to conmProd"]
        },
        "createAt":{
            "type": "Float",
            "ref": null,
            "isArray": false,
            "descriptions": []
        },
        "deepCateId":{
            "type": "String",
            "ref": null,
            "isArray": false,
            "descriptions": ["ref to consumerDeepCategory"]
        },
        "endAt":{
            "type": "Float",
            "ref": null,
            "isArray": false,
            "descriptions": ["max 3 months"]
        },
        "isAllConmCondition":{
            "type": "Boolean",
            "ref": null,
            "isArray": false,
            "descriptions": ["if true target need to match all conmCondition if false target need to match at least one conmCondition"]
        },
        "latlng":{
            "type": "Object",
            "ref": "67ea4db88934619fe07e19e9",
            "isArray": false,
            "descriptions": []
        },
        "mainCateId":{
            "type": "String",
            "ref": null,
            "isArray": false,
            "descriptions": ["ref to consumerMainCategory"]
        },
        "nClickedToCart":{
            "type": "Float",
            "ref": null,
            "isArray": false,
            "descriptions": []
        },
        "nClickedToCartUnique":{
            "type": "Float",
            "ref": null,
            "isArray": false,
            "descriptions": []
        },
        "nClickedToDetail":{
            "type": "Float",
            "ref": null,
            "isArray": false,
            "descriptions": []
        },
        "nClickedToDetailUnique":{
            "type": "Float",
            "ref": null,
            "isArray": false,
            "descriptions": []
        },
        "nView":{
            "type": "Float",
            "ref": null,
            "isArray": false,
            "descriptions": []
        },
        "nViewUnique":{
            "type": "Float",
            "ref": null,
            "isArray": false,
            "descriptions": []
        },
        "name":{
            "type": "String",
            "ref": null,
            "isArray": false,
            "descriptions": []
        },
        "paymentMethod":{
            "type": "Object",
            "ref": "67ea50d68934619fe07e19eb",
            "isArray": false,
            "descriptions": []
        },
        "paymentedItemIds":{
            "type": "String",
            "ref": null,
            "isArray": true,
            "descriptions": []
        },
        "radius":{
            "type": "Float",
            "ref": null,
            "isArray": false,
            "descriptions": [max 100km]
        },
        "startAt":{
            "type": "Float",
            "ref": null,
            "isArray": false,
            "descriptions": []
        },
        "status":{
            "type": "Enum",
            "ref": "67ea52108934619fe07e19ec",
            "isArray": false,
            "descriptions": []
        },
        "subCateId":{
            "type": "String",
            "ref": null,
            "isArray": false,
            "descriptions": ["ref to consumerSubCategory"]
        },
        "type":{
            "type": "Enum",
            "ref": "67ea52a18934619fe07e19ed",
            "isArray": false,
            "descriptions": []
        },
        "updateAt":{
            "type": "Float",
            "ref": null,
            "isArray": false,
            "descriptions": []
        },
        "vendBuyABId":{
            "type": "String",
            "ref": null,
            "isArray": false,
            "descriptions": ["ref to vendBuyAB"]
        },
        "vendBuyNId":{
            "type": "String",
            "ref": null,
            "isArray": false,
            "descriptions": ["ref to vendBuyN"]
        },
        "vendId":{
            "type": "String",
            "ref": null,
            "isArray": false,
            "descriptions": ["ref to vend"]
        },
        "vendProdId":{
            "type": "String",
            "ref": null,
            "isArray": false,
            "descriptions": ["ref to vendProd"]
        }
    }
}

{
    "name":"adConfig",
    "isMain":false,
    "descriptions":[],
    "data":{
        "conmProdId":{
            "type":"String",
            "ref":null,
            "isArray":false,
            "descriptions":[]
        },
        "conmProdImageUrl":{
            "type":"String",
            "ref":null,
            "isArray":false,
            "descriptions":[]
        },
        "conmProdTitle":{
            "type":"Object",
            "ref":"67ea4ad48934619fe07e19e7",
            "isArray":true,
            "descriptions":[]
        },
        "deepCategoryIds":{
            "type":"String",
            "ref":null,
            "isArray":true,
            "descriptions":[
                "only for free sample products"
            ]
        },
        "isYes":{
            "type":"Boolean",
            "ref":null,
            "isArray":false,
            "descriptions":[]
        },
        "nDays":{
            "type":"Float",
            "ref":null,
            "isArray":false,
            "descriptions":[]
        },
        "type":{
            "type":"Enum",
            "ref":"67ea4ad48934619fe07e19e8",
            "isArray":false,
            "descriptions":[]
        },
    }
}

{
    "name":"paymentMethod",
    "isMain":false,
    "descriptions":[],
    "data":{
        "createAt":{
            "type":"Float",
            "ref":null,
            "isArray":true,
            "descriptions":[]
        },
        "type":{
            "type":"Enum",
            "ref":"67ea50388934619fe07e19ea",
            "isArray":false,
            "descriptions":[]
        },
        "uid":{
            "type":"String",
            "ref":null,
            "isArray":false,
            "descriptions":[]
        },
    }
}

{
    "name":"adType",
    "description":[],
    "data":{
        "shelf":[]
    }
}


 */