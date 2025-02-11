const formSchema = require('../model/formSchema');

class fromRepository{

    CreateForm = async(data) => {
        return await formSchema.create(data);
    }
    findByUid= async (Uid) => {
        
          return await formSchema.findOne({ Uid });
       
      }
    getForm = async() => {
        return await formSchema.find();
    }
    getFormById = async(id) => {
        return await formSchema.findById(id);
    }
    updateForm = async(id,data) => {
        return await formSchema
        .findByIdAndUpdate(id,data,{new:true});
    }
    // repositories/formRepository.js

   findByUidWithPagination= async(uid, page = 1, limit = 20) =>{
    try {
      const skip = (page - 1) * limit;
      const pipeline = [
        { $match: { Uid: uid } },
        {
          $project: {
            Name: 1,
            Designation: 1,
            Uid: 1,
            Work: 1,
            Area: 1,
            ValidityStart: 1,
            ValidityEnd: 1,
            photo: 1,
            Email: 1,
            createdAt: 1,
          }
        },
        { $skip: skip },
        { $limit: limit }
      ];
      const data = await formSchema.aggregate(pipeline);
      const total = await formSchema.countDocuments({ Uid: uid });
      return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error('Error finding candidate by Uid with pagination: ' + error.message);
    }
  }

  deleteForm = async(id) => {
    return await formSchema.findByIdAndDelete(id);
  }
}



module.exports = new fromRepository();