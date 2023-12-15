import mongoose,{Schema} from "mongoose";

const storeSchema = new Schema(
    {
        name:String,
        address:String,
        location: {
            type: {
                type: String, 
                default: 'Point',
                required: true
            },
            coordinates: {
                type: [],
                required: true,
            }
        }
    },
    {
      timestamps: true,
    }
)

storeSchema.index({location:"2dsphere"});  
const StoreModel = mongoose.models.Store || mongoose.model('Store', storeSchema);

export default StoreModel;