"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = require("crypto");
var util_1 = require("util");
var mail_1 = require("./mail");
var utils_1 = require("./utils");
var stripe_1 = __importDefault(require("stripe"));
var stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-03-02",
    typescript: true
});
var resolvers = {
    Query: {
        items: function (_, _a, _b) {
            var _c = _a.offset, offset = _c === void 0 ? 0 : _c, _d = _a.limit, limit = _d === void 0 ? 4 : _d;
            var prisma = _b.prisma;
            return __awaiter(this, void 0, void 0, function () {
                var allItems, total, items, hasMore;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, prisma.item.findMany()];
                        case 1:
                            allItems = _e.sent();
                            allItems.reverse();
                            total = allItems.length;
                            items = allItems.slice(offset, offset + limit);
                            hasMore = allItems.length > offset + limit;
                            return [2 /*return*/, {
                                    total: total,
                                    hasMore: hasMore,
                                    items: items,
                                }];
                    }
                });
            });
        },
        item: function (_, _a, _b) {
            var id = _a.id;
            var prisma = _b.prisma;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    return [2 /*return*/, prisma.item.findOne({ where: { id: id } })];
                });
            });
        },
        user: function (_, __, _a) {
            var req = _a.req, prisma = _a.prisma, user = _a.user;
            if (user) {
                return user;
            }
            return null;
        },
        users: function (_, __, _a) {
            var prisma = _a.prisma;
            return prisma.user.findMany();
        },
        order: function (_, _a, _b) {
            var id = _a.id;
            var prisma = _b.prisma;
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, prisma.order.findOne({
                                where: { id: id },
                                include: { user: true, items: true },
                            })];
                        case 1:
                            order = _c.sent();
                            return [2 /*return*/, order];
                    }
                });
            });
        },
        orders: function (_, __, _a) {
            var user = _a.user, prisma = _a.prisma;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    return [2 /*return*/, prisma.order.findMany({
                            where: { userId: user.id },
                            include: { items: true },
                        })];
                });
            });
        },
    },
    Mutation: {
        createItem: function (_, args, _a) {
            var prisma = _a.prisma, user = _a.user;
            return __awaiter(this, void 0, void 0, function () {
                var item;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!user) {
                                throw new Error('You must be logged in to do that!');
                            }
                            return [4 /*yield*/, prisma.item.create({
                                    data: __assign(__assign({}, args), { user: {
                                            connect: { id: user.id },
                                        } }),
                                })];
                        case 1:
                            item = _b.sent();
                            return [2 /*return*/, item];
                    }
                });
            });
        },
        updateItem: function (_, args, _a) {
            var prisma = _a.prisma;
            return __awaiter(this, void 0, void 0, function () {
                var updates;
                return __generator(this, function (_b) {
                    updates = __assign({}, args);
                    // remove the ID from the updates
                    delete updates.id;
                    // run the update method
                    return [2 /*return*/, prisma.item.update({
                            data: updates,
                            where: { id: args.id },
                        })];
                });
            });
        },
        deleteItem: function (_, _a, _b) {
            var id = _a.id;
            var prisma = _b.prisma, user = _b.user;
            return __awaiter(this, void 0, void 0, function () {
                var where, item, ownsItem, hasPermissions;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            where = { id: id };
                            return [4 /*yield*/, prisma.item.findOne({ where: where })];
                        case 1:
                            item = _c.sent();
                            if (!item) {
                                throw new Error('Item does not exist');
                            }
                            ownsItem = item.userId === user.id;
                            hasPermissions = user.permissions.some(function (permission) {
                                return ['ADMIN', 'ITEMDELETE'].includes(permission);
                            });
                            if (!ownsItem && !hasPermissions) {
                                throw new Error("You don't have permission to do that!");
                            }
                            // 3. Delete it!
                            return [2 /*return*/, prisma.item.delete({ where: where })];
                    }
                });
            });
        },
        signup: function (_, _a, _b) {
            var email = _a.email, password = _a.password, name = _a.name;
            var res = _b.res, prisma = _b.prisma;
            return __awaiter(this, void 0, void 0, function () {
                var user, _c, _d, _e, _f, token;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            _d = (_c = prisma.user).create;
                            _e = {};
                            _f = {
                                email: email.toLocaleLowerCase(),
                                name: name
                            };
                            return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
                        case 1: return [4 /*yield*/, _d.apply(_c, [(_e.data = (_f.password = _g.sent(),
                                    _f.permissions = { set: ['USER', 'ITEMCREATE', 'ITEMDELETE', 'ITEMUPDATE'] },
                                    _f),
                                    _e)])];
                        case 2:
                            user = _g.sent();
                            token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.APP_SECRET);
                            res.cookie('token', token, {
                                httpOnly: true,
                                maxAge: 1000 * 60 * 60 * 24 * 365,
                            });
                            return [2 /*return*/, user];
                    }
                });
            });
        },
        signin: function (_, _a, _b) {
            var email = _a.email, password = _a.password;
            var res = _b.res, prisma = _b.prisma;
            return __awaiter(this, void 0, void 0, function () {
                var user, valid, token;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, prisma.user.findOne({ where: { email: email } })];
                        case 1:
                            user = _c.sent();
                            if (!user) {
                                throw new Error("No such user found for email " + email);
                            }
                            return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                        case 2:
                            valid = _c.sent();
                            if (!valid) {
                                throw new Error('Invalid Password!');
                            }
                            token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.APP_SECRET);
                            // 4. Set the cookie with the token
                            res.cookie('token', token, {
                                httpOnly: true,
                                maxAge: 1000 * 60 * 60 * 24 * 365,
                            });
                            // 5. Return the user
                            return [2 /*return*/, user];
                    }
                });
            });
        },
        signout: function (_, __, _a) {
            var res = _a.res;
            res.clearCookie('token');
            return null;
        },
        requestReset: function (_, _a, _b) {
            var email = _a.email;
            var prisma = _b.prisma;
            return __awaiter(this, void 0, void 0, function () {
                var user, randomBytesPromiseified, resetToken, resetTokenExpiry, res, mailRes;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, prisma.user.findOne({ where: { email: email } })];
                        case 1:
                            user = _c.sent();
                            if (!user) {
                                throw new Error("No user found for email: " + email + "'");
                            }
                            randomBytesPromiseified = util_1.promisify(crypto_1.randomBytes);
                            return [4 /*yield*/, randomBytesPromiseified(20)];
                        case 2:
                            resetToken = (_c.sent()).toString('hex');
                            resetTokenExpiry = Date.now() + 3600000 // 1 hour from now
                            ;
                            return [4 /*yield*/, prisma.user.update({
                                    where: { email: email },
                                    data: { resetToken: resetToken, resetTokenExpiry: resetTokenExpiry },
                                })];
                        case 3:
                            res = _c.sent();
                            return [4 /*yield*/, mail_1.transport.sendMail({
                                    from: 'dave@bos.com',
                                    to: user.email,
                                    subject: 'Your Password Reset Token',
                                    html: mail_1.makeANiceEmail("Your Password Reset Token is here!\n      \n\n\n      <a href=\"" + process.env.FRONTEND_URL + "/reset?resetToken=" + resetToken + "\">Click Here to Reset</a>"),
                                })];
                        case 4:
                            mailRes = _c.sent();
                            return [2 /*return*/, { message: 'Thanks!' }];
                    }
                });
            });
        },
        resetPassword: function (_, _a, _b) {
            var password = _a.password, confirmPassword = _a.confirmPassword, resetToken = _a.resetToken;
            var res = _b.res, prisma = _b.prisma;
            return __awaiter(this, void 0, void 0, function () {
                var user, hash, updatedUser, token;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            // 1. check if the passwords match
                            if (password !== confirmPassword) {
                                throw new Error("Yo Passwords don't match!");
                            }
                            return [4 /*yield*/, prisma.user.findMany({
                                    where: { resetToken: resetToken },
                                })];
                        case 1:
                            user = (_c.sent())[0];
                            if (!user) {
                                throw new Error('This token is either invalid or expired!');
                            }
                            return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)
                                // 5. Save the new password to the user and remove old resetToken fields
                            ];
                        case 2:
                            hash = _c.sent();
                            return [4 /*yield*/, prisma.user.update({
                                    where: { email: user.email },
                                    data: {
                                        password: hash,
                                        resetToken: null,
                                        resetTokenExpiry: null,
                                    },
                                })
                                // 6. Generate JWT
                            ];
                        case 3:
                            updatedUser = _c.sent();
                            token = jsonwebtoken_1.default.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
                            // 7. Set the JWT cookie
                            res.cookie('token', token, {
                                httpOnly: true,
                                maxAge: 1000 * 60 * 60 * 24 * 365,
                            });
                            // 8. return the new user
                            return [2 /*return*/, updatedUser];
                    }
                });
            });
        },
        updatePermissions: function (_, _a, _b) {
            var permissions = _a.permissions;
            var user = _b.user, prisma = _b.prisma;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    // 1. Check if they are logged in
                    if (!user) {
                        throw new Error('You must be logged in!');
                    }
                    // 3. Check if they have permissions to do this
                    utils_1.hasPermission(user, ['ADMIN', 'PERMISSIONUPDATE']);
                    // 4. Update the permissions
                    return [2 /*return*/, prisma.user.update({
                            data: {
                                permissions: { set: permissions },
                            },
                            where: {
                                id: user.id,
                            },
                        })];
                });
            });
        },
        addToCart: function (_, _a, _b) {
            var id = _a.id;
            var user = _b.user, prisma = _b.prisma;
            return __awaiter(this, void 0, void 0, function () {
                var existingCartItem;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!user) {
                                throw new Error('You must be signed in');
                            }
                            return [4 /*yield*/, prisma.cartItem.findMany({
                                    where: {
                                        userId: user.id,
                                        itemId: id
                                    }
                                })];
                        case 1:
                            existingCartItem = (_c.sent())[0];
                            if (existingCartItem) {
                                return [2 /*return*/, prisma.cartItem.update({
                                        where: { id: existingCartItem.id },
                                        data: { quantity: existingCartItem.quantity + 1 }
                                    })];
                            }
                            return [4 /*yield*/, prisma.cartItem.create({
                                    data: {
                                        user: {
                                            connect: { id: user.id }
                                        },
                                        item: {
                                            connect: { id: id }
                                        }
                                    }
                                })];
                        case 2: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        },
        deleteCartItem: function (_, _a, _b) {
            var id = _a.id;
            var user = _b.user, prisma = _b.prisma;
            return __awaiter(this, void 0, void 0, function () {
                var cartItem, deleted;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, prisma.cartItem.findOne({ where: { id: id } })];
                        case 1:
                            cartItem = _c.sent();
                            if (!cartItem)
                                throw new Error('No CartItem found!');
                            if (cartItem.userId !== user.id)
                                throw new Error('The item must be in your own cart');
                            return [4 /*yield*/, prisma.cartItem.delete({ where: { id: id } })];
                        case 2:
                            deleted = _c.sent();
                            return [2 /*return*/, deleted];
                    }
                });
            });
        },
        checkout: function (_, _a, _b) {
            var token = _a.token;
            var user = _b.user, prisma = _b.prisma;
            return __awaiter(this, void 0, void 0, function () {
                var amount, paymentIntent, orderItems, order;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!user)
                                throw new Error('You must be signed in to complete this order.');
                            amount = user.cart.reduce(function (tally, cartItem) { return tally + cartItem.item.price * cartItem.quantity; }, 0);
                            return [4 /*yield*/, stripe.paymentIntents.create({
                                    amount: amount,
                                    currency: 'USD',
                                    confirm: true,
                                    payment_method: token,
                                })];
                        case 1:
                            paymentIntent = _c.sent();
                            orderItems = user.cart.map(function (cartItem) {
                                var _a = cartItem.item, title = _a.title, description = _a.description, price = _a.price, image = _a.image, largeImage = _a.largeImage;
                                var orderItem = {
                                    title: title,
                                    description: description,
                                    price: price,
                                    image: image,
                                    largeImage: largeImage,
                                    quantity: cartItem.quantity,
                                    user: { connect: { id: user.id } },
                                };
                                return orderItem;
                            });
                            return [4 /*yield*/, prisma.order.create({
                                    data: {
                                        total: paymentIntent.amount,
                                        charge: paymentIntent.id,
                                        items: { create: orderItems },
                                        user: { connect: { id: user.id } },
                                    },
                                    include: { items: true },
                                })
                                /** TODO: Delete Many */
                                // const cartItemIds = user.cart.map((cartItem: CartItem) => cartItem.id);
                                // await prisma.cartItem.deleteMany({
                                //   where: {
                                //     id: cartItemIds,
                                //   },
                                // });
                            ];
                        case 2:
                            order = _c.sent();
                            /** TODO: Delete Many */
                            // const cartItemIds = user.cart.map((cartItem: CartItem) => cartItem.id);
                            // await prisma.cartItem.deleteMany({
                            //   where: {
                            //     id: cartItemIds,
                            //   },
                            // });
                            user.cart.forEach(function (_a) {
                                var id = _a.id;
                                return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_b) {
                                    return [2 /*return*/, prisma.cartItem.delete({ where: { id: id } })];
                                }); });
                            });
                            return [2 /*return*/, order];
                    }
                });
            });
        }
    },
};
exports.default = resolvers;
