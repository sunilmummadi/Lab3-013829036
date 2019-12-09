const graphql = require('graphql');
const _ = require('lodash');
const { User } = require("../models/userModel");
const { Restaurant } = require("../models/restaurantModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLString },
        is_owner: { type: GraphQLString },
        name: { type: GraphQLString },
        email_id: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        restaurant: {
            type: RestaurantType,
            async resolve(parent, args) {
                let user = await User.findOne({ "restaurant.owner_user_id": parent._id });
                return user.restaurant;
            }
        }
    })
});

const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({
        _id: { type: GraphQLString },
        res_name: { type: GraphQLString },
        res_cuisine: { type: GraphQLString },
        res_zip_code: { type: GraphQLString },
        owner_user_id: { type: GraphQLString },
        menu_sections: {
            type: SectionType,
            async resolve(parent, args) {
                let user = await User.findOne({ "restaurant.owner_user_id": parent._id });
                return user.restaurant;
            }
        }
    })
});

const SectionType = new GraphQLObjectType({
    name: 'Section',
    fields: () => ({
        _id: { type: GraphQLString },
        menu_section_name: { type: GraphQLString },
        restaurant_id: { type: GraphQLString },
        menu_items: {
            type: ItemType,
            async resolve(parent, args) {
                let user = await User.findOne({ "restaurant.owner_user_id": parent._id });
                return user.restaurant;
            }
        }
    })
});

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        _id: { type: GraphQLString },
        menu_section_name: { type: GraphQLString },
        menu_section_id: { type: GraphQLString },
        item_name: { type: GraphQLString },
        item_description: { type: GraphQLString },
        item_price: { type: GraphQLString }
    })
});

const ResponseType = new GraphQLObjectType({
    name: 'Response',
    fields: () => ({
        status: { type: GraphQLString },
        message: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { user_id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(users, { user_id: args.user_id });
            }
        },
        getCustomer: {
            type: UserType,
            args: { user_id: { type: GraphQLString } },
            async resolve(parent, args) {
                let user = await User.findOne({ _id: args.user_id });
                console.log(user);
                return _.pick(user, [
                    "_id",
                    "name",
                    "email_id",
                    "address",
                    "phone_number",
                ])
            }
        },

        getRestaurant: {
            type: UserType,
            args: { user_id: { type: GraphQLString } },
            async resolve(parent, args) {
                let owner = await User.findOne({ _id: args.user_id });
                console.log(owner);

                return _.pick(owner, [
                    "_id",
                    "name",
                    "email_id",
                    "address",
                    "phone_number",
                    "restaurant"
                ])
            }
        },
    }
});

// var count =10;
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        //Customer Sign Up
        addCustomer: {
            type: ResponseType,
            args: {
                name: { type: GraphQLString },
                email_id: { type: GraphQLString },
                password: { type: GraphQLString },
                address: { type: GraphQLString },
                phone_number: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log(args);
                let user = await User.findOne({ email_id: args.email_id });

                if (user) return { status: "400", message: "User already exists" }
                user = new User(
                    _.pick(args, [
                        "name",
                        "email_id",
                        "password",
                        "address",
                        "phone_number"
                    ])
                );
                user.is_owner = false;
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
                await user.save();

                return { status: "200", message: "User Signed Up successfully" }
            }
        },


        //Customer Profile Update
        updateCustomer: {
            type: ResponseType,
            args: {
                user_id: { type: GraphQLString },
                name: { type: GraphQLString },
                email_id: { type: GraphQLString },
                password: { type: GraphQLString },
                address: { type: GraphQLString },
                phone_number: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let user = await User.findOne({ _id: args.user_id });
                if (!user) return { status: "400", message: "User does not exist" };
                if (args.password === "") {
                    user.set({
                        name: args.name,
                        email_id: args.email_id,
                        address: args.address,
                        phone_number: args.phone_number
                    });
                } else {
                    const salt = await bcrypt.genSalt(10);
                    var hashedPassword = await bcrypt.hash(args.password, salt);
                    user.set({
                        name: args.name,
                        email_id: args.email_id,
                        address: args.address,
                        phone_number: args.phone_number,
                        password: hashedPassword
                    });
                }
                let update = await user.save();
                if (update) {
                    return { status: "200", message: "Profile Updated Successfully" };
                } else {
                    return { status: "400", message: "Some thing went wrong" };
                }
            }
        },

        //Restaurant Sign Up
        addRestaurant: {
            type: ResponseType,
            args: {
                name: { type: GraphQLString },
                email_id: { type: GraphQLString },
                password: { type: GraphQLString },
                address: { type: GraphQLString },
                phone_number: { type: GraphQLString },
                res_name: { type: GraphQLString },
                res_cuisine: { type: GraphQLString },
                res_zip_code: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log(args);
                let owner = await User.findOne({ email_id: args.email_id });

                if (owner) return { status: "400", message: "Restaurant already exists" }
                owner = new User(
                    _.pick(args, [
                        "name",
                        "email_id",
                        "password",
                        "address",
                        "phone_number"
                    ])
                );
                owner.is_owner = true;
                const salt = await bcrypt.genSalt(10);
                owner.password = await bcrypt.hash(owner.password, salt);
                await owner.save();

                temp_owner = await User.findOne({
                    email_id: args.email_id
                });
                restaurant = new Restaurant(
                    _.pick(args, ["res_name", "res_cuisine", "res_zip_code"])
                );
                temp_owner.restaurant = restaurant;

                owner_user_id = temp_owner._id;

                temp_owner.restaurant.owner_user_id = owner_user_id;

                let ownersave = await temp_owner.save();

                return { status: "200", message: "Restaurant Signed Up successfully" }
            }

        },

        //Restaurant Profile update
        updateRestaurant: {
            type: ResponseType,
            args: {
                user_id: { type: GraphQLString },
                name: { type: GraphQLString },
                email_id: { type: GraphQLString },
                password: { type: GraphQLString },
                address: { type: GraphQLString },
                phone_number: { type: GraphQLString },
                res_name: { type: GraphQLString },
                res_cuisine: { type: GraphQLString },
                res_zip_code: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log(args);
                let owner = await User.findOne({
                    _id: args.user_id
                });
                if (!owner) return { status: "400", message: "Restaurant Owner does not exist" };

                if (args.password === "") {
                    owner.set({
                        name: args.name,
                        email_id: args.email_id,
                        address: args.address,
                        phone_number: args.phone_number,
                        "restaurant.res_name": args.res_name,
                        "restaurant.res_cuisine": args.res_cuisine,
                        "restaurant.res_zip_code": args.res_zip_code
                    });
                } else {
                    const salt = await bcrypt.genSalt(10);
                    var hashedPassword = await bcrypt.hash(args.password, salt);
                    owner.set({
                        name: args.name,
                        email_id: args.email_id,
                        address: args.address,
                        phone_number: args.phone_number,
                        password: hashedPassword,
                        "restaurant.res_name": args.res_name,
                        "restaurant.res_cuisine": args.res_cuisine,
                        "restaurant.res_zip_code": args.res_zip_code
                    });
                }

                let update = await owner.save();
                if (update) {
                    return { status: "200", message: "Restaurant Profile Updated" };
                } else {
                    return { status: "200", message: "Some thing went wrong" };
                }
            }

        },

        //Login
        login: {
            type: ResponseType,
            args: {
                email_id: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log(args);
                let user = await User.findOne({ email_id: args.email_id });

                if (!user) return { status: "400", message: "Invalid Email or Password" }

                const validPassword = await bcrypt.compare(args.password, user.password);
                if (validPassword) {
                    let payload = _.pick(user, ["_id", "name", "email_id", "is_owner"]);
                    if (user.is_owner) {
                        payload = _.pick(user, [
                            "_id",
                            "name",
                            "email_id",
                            "is_owner",
                            "restaurant._id"
                        ]);
                    }
                    var token = jwt.sign(payload, config.secret, {
                        expiresIn: 900000 // in seconds
                    });
                    return { status: "200", message: token };
                } else {
                    return { status: "400", message: "Invalid Email or Password" }
                }
            }
        },

        //Add Menu section
        addSection: {
            type: ResponseType,
            args: {
                user_id: { type: GraphQLString },
                menu_section_name: { type: GraphQLString },
                restaurant_id: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let user = await User.findOne({ _id: args.user_id });
                if (!user) return { status: "400", message: "User does not exist" }

                menu_section = new Section(
                    _.pick(args, ["menu_section_name", "restaurant_id"])
                );
                let menu_sections = await User.findOne({
                    _id: args.user_id,
                    "restaurant.menu_sections": {
                        $elemMatch: {
                            menu_section_name: args.menu_section_name
                        }
                    }
                });
                if (menu_sections) return { status: "400", message: "Menu Section already exists" };

                user.restaurant.menu_sections.push(menu_section);

                let insert = await user.save();
                console.log(user.restaurant.menu_sections);
                if (insert) {
                    return { status: "200", message: "Menu Section Added" };
                } else {
                    return { status: "400", message: "Some thing went wrong" };
                }
            }
        },

        //Add Menu Item
        addItem: {
            type: ResponseType,
            args: {
                user_id: { type: GraphQLString },
                menu_section_name: { type: GraphQLString },
                menu_section_id: { type: GraphQLString },
                item_name: { type: GraphQLString },
                item_description: { type: GraphQLString },
                item_price: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let user = await User.findOne({ _id: args.user_id });
                if (!user) return { status: "400", message: "User does not exist" };
                menu_item = new Item(
                    _.pick(args, [
                        "menu_section_name",
                        "menu_section_id",
                        "item_name",
                        "item_description",
                        "item_price"
                    ]));
                if (args.item_image !== "") {menu_item.item_image = args.item_image;}
                const menu_section = user.restaurant.menu_sections.id(args.menu_section_id);
                if (!menu_section) return { status: "400", message: "Section does not exist" };
                if (menu_section) {
                    let item = menu_section.menu_items.filter(menu_item => menu_item.item_name === args.item_name);
                    if (item.length > 0) return { status: "400", message: "Item already exists" };
                    menu_section.menu_items.push(menu_item);
                    let insertItem = await user.save();
                    if (insertItem) {
                        return { status: "200", message: "Menu Item Added" };
                    } else {
                        return { status: "400", message: "Some thing went wrong" };
                    }
                }
            }
        },



    },

});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});