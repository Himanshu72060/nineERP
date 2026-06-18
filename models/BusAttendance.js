const mongoose =
    require("mongoose");


const busAttendanceSchema =
    new mongoose.Schema({


        studentId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        studentName: {

            type: String,

            required: true,

            trim: true

        },


        busId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "Bus",

            required: true

        },


        routeId: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "Route",

            required: true

        },


        status: {


            type: String,


            enum: [

                "Boarded",

                "Dropped",

                "Absent"

            ],


            default: "Boarded"


        },


        boardingTime: {

            type: Date

        },


        dropTime: {

            type: Date

        },


        boardingLocation: {


            latitude: {

                type: Number

            },


            longitude: {

                type: Number

            }


        },


        dropLocation: {


            latitude: {

                type: Number

            },


            longitude: {

                type: Number

            }


        },


        markedBy: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        date: {


            type: String,


            default: () => {


                const today =
                    new Date();


                return today
                    .toISOString()
                    .split("T")[0];


            }


        }


    },

        {

            timestamps: true

        });



busAttendanceSchema.index(

    {
        studentId: 1,
        date: 1
    },

    {
        unique: true
    }

);



module.exports =
    mongoose.model(

        "BusAttendance",

        busAttendanceSchema

    );