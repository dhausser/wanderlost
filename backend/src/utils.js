"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hasPermission = function (user, permissionsNeeded) {
    var matchedPermissions = user.permissions.filter(function (permissionTheyHave) { return permissionsNeeded.includes(permissionTheyHave); });
    if (!matchedPermissions.length) {
        throw new Error("You do not have sufficient permissions\n      : " + permissionsNeeded + "\n      You Have:\n      " + user.permissions + "\n      ");
    }
};
exports.hasPermission = hasPermission;
