"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const mongoose_2 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_helper_1 = require("./user.helper");
let UserRepository = class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto, emailData) {
        if (!emailData) {
            const createdUser = new this.userModel(createUserDto);
            return createdUser.save();
        }
        else {
            const createdUser = new this.userModel({ ...createUserDto, emailConfirmation: emailData });
            return createdUser.save();
        }
    }
    async findUsers(params) {
        const parametres = user_helper_1.userHelper.usersParamsMapper(params);
        const skipCount = (+parametres.pageNumber - 1) * Number(parametres.pageSize);
        const users = await this.userModel
            .find({
            $or: [
                { email: { $regex: parametres.searchEmailTerm, $options: 'i' } },
                { login: { $regex: parametres.searchLoginTerm, $options: 'i' } },
            ],
        })
            .sort({ [parametres.sortBy]: parametres.sortDirection, "_id": parametres.sortDirection })
            .skip(skipCount)
            .limit(+parametres.pageSize)
            .lean();
        const totalCount = await this.userModel.countDocuments({
            $or: [
                { email: { $regex: parametres.searchEmailTerm, $options: 'i' } },
                { login: { $regex: parametres.searchLoginTerm, $options: 'i' } },
            ],
        });
        return {
            pagesCount: Math.ceil(totalCount / +parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount,
            items: users.map((u) => user_helper_1.userHelper.userViewMapper(u)),
        };
    }
    async validateUser(loginOrEmail, pass) {
        const user = await this.userModel.findOne({ $or: [{ email: loginOrEmail }, { login: loginOrEmail }] });
        if (!user) {
            return null;
        }
        const isMatchedPasswords = await bcrypt_1.default.compare(pass, user.hashPassword);
        if (!isMatchedPasswords)
            return null;
        return user;
    }
    async checkExistUser(email, login) {
        const user = await this.userModel.findOne({
            $or: [
                { email: email },
                { login: login }
            ]
        });
        return user;
    }
    async findById(id) {
        const user = await this.userModel.findById(id);
        return user;
    }
    async checkCodeConfirmation(code) {
        const user = await this.userModel.findOne({ "emailConfirmation.code": code });
        if (user) {
            if (user.emailConfirmation.expirationDate < new Date())
                return false;
            if (user.emailConfirmation.isConfirmed)
                return false;
            user.emailConfirmation.isConfirmed = true;
            await user.save();
            return true;
        }
        return false;
    }
    async changeConfirmationData(email, data) {
        const newUserCode = await this.userModel.updateOne({ email: email }, { $set: { "emailConfirmation.code": data.code } });
        return data.code;
    }
    async validateResendingUser(email) {
        const user = await this.userModel.findOne({ email: email });
        if (user && !user.emailConfirmation.isConfirmed)
            return true;
        return false;
    }
    async delete(id) {
        const deleteUser = await this.userModel.findByIdAndDelete(id);
        if (!deleteUser)
            return false;
        return true;
    }
    async deleteAll() {
        return this.userModel.deleteMany({});
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
//# sourceMappingURL=user.repository.js.map