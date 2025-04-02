

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


fn:getSchema
args: [isOnlyMain:Boolean]
return: []{name:String, id:String}
fn:getSchemaById
args: [id:String]
return: {name:String, id:String, descriptions:String[], data:{[fieldName]:{type:String, ref:String, isArray:Boolean, descriptions:String[]}}}
fn:createSchema
args:[name:String]
fn:editIsMainSchema
args:[{id:String, isMain:Boolean}]
fn:editNameSchema
args:[{id:String, name:String}]
fn:editDescriptionsSchema
args:[{id:String, descriptions:String[]}]
fn:addFieldSchema
args:[{id:String, fieldName:String, fieldType:String, isArray:Boolean, ref:String}] (ref is null or id if fieldType is Object or Enum)
fn:editFieldNameSchema
args:[{id:String, oldFieldName:String, newFieldName:String}]
fn:deleteFieldSchema
args:[{id:String, fieldName:String}]
fn:editFieldTypeSchema
args:[{id:String, fieldName:String, type:String, isArray:Boolean, ref:String}] (ref is null or id if type is Object or Enum)
fn:editFieldDescriptionsSchema
args:[{id:String, fieldName:String, descriptions:String[]}]
fn:getSchemasOrEnumsUsedInSchema
args:[id:String]
return: [{id:String, name:String}]
fn:getEnum
return: []{name:String, id:String}
fn:getEnumById
args:[id:String]
return: {name:String, id:String, descriptions:String[], data:{[fieldName]:[descriptions[]]}}
fn:createEnum
args:[name:String]
fn:editNameEnum
args:[{id:String, name:String}]
fn:editDescriptionsEnum
args:[{id:String, descriptions:String[]}]
fn:addFieldEnum
args:[{id:String, fieldName:String}]
fn:editFieldNameEnum
args:[{id:String, oldFieldName:String, newFieldName:String}]
fn:deleteFieldEnum
args:[{id:String, fieldName:String}]
fn:editFieldDescriptionsEnum
args:[{id:String, fieldName:String, descriptions:String[]}]
fn:getGraphql
args:[id:String]
return: String
fn:deleteSchema
args:[id:String]
fn:deleteEnum
args:[id:String]

ฉันต้องการ web ที่มี text ให้คลิกเลือก 2 อัน คือ schema และ enum
เมื่อคลิกที่ schema จะมี list รายชื่อ ของ schema ที่มี isMain = true และมีปุ่ม สร้างอยุ่เหนือรายการ
เมื่อคลิกที่ enum จะมี list รายชื่อ ของ enum และมีปุ่ม สร้างอยุ่เหนือรายการ
ในแต่ละรายการจะมีปุ่ม + อยู่ข้างหน้า ถ้าคลิกจะเป็นการขยายรายการนั้นออกมา และมีปุ่มรูปดินสออยู่ข้างหลัง ถ้าคลิกจะเป็นการแก้ไขชื่อของ schema หรือ enum นั้น
โดยจะขยายออกมาบันทัดแรกจะเป็น ปุ่ม ถูกใช้ที่ไหนบ้าง และปุ่ม graphql
เมื่อคลิกจะมี list รายชื่อ ของ schema ที่ใช้ schema หรือ enum นั้นอยู่
บรรทัดที่ 2 จะมี discriptions ของ schema หรือ enum นั้น และมีปุ่มแก้ไขอยู่ข้างหลัง
บรรทัดที่ 3 จะมี list ของ field ของ schema หรือ enum นั้น
    enum จะแสดง field name และ descriptions ของ field นั้น และมีปุ่มแก้ไขอยู่ข้างหลัง ของ field และ discriptions และมีปุ่มลบอยู่ข้างหลังสุด
    schema จะแสดง field name และ type ของ field นั้น และมีปุ่มแก้ไขอยู่ข้างหลัง ของ field name, type, discriptions และมีปุ่มลบอยู่ข้างหลังสุด
         ถ้า field type เป็น Object หรือ Enum จะมีปุ่ม + อยู่ข้างหลังสุด ถ้าคลิกจะเป็นการขยายรายการนั้นออกมา และมีปุ่มรูปดินสออยู่ข้างหลังสุด ถ้าคลิกจะเป็นการแก้ไขชื่อของ schema หรือ enum นั้น
    และจะมีปุ่ม add field อยู่ข้างล่างสุด
    ถ้าคลิกจะเป็นการเพิ่ม field ใหม่ โดยจะมี input ให้กรอก field name, type, isArray, ref (ถ้า type เป็น Object หรือ Enum) (Object getSchema isOnlyMain = false, Enum getEnum) และมีปุ่มถูกอยู่ข้างหลังสุด












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