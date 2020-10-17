CREATE TYPE "public"."Permission" AS ENUM ('USER', 'ADMIN', 'ITEMCREATE', 'ITEMUPDATE', 'ITEMDELETE', 'PERMISSIONUPDATE')
CREATE TABLE "public"."User" (
"id" text   NOT NULL ,
"email" text   NOT NULL ,
"name" text   NOT NULL ,
"password" text   NOT NULL ,
"permissions" "Permission"[]  ,
"resetToken" text   ,
"resetTokenExpiry" Decimal(65,30)   ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)
CREATE TABLE "public"."Item" (
"id" text   NOT NULL ,
"title" text   NOT NULL ,
"description" text   NOT NULL ,
"image" text   ,
"largeImage" text   ,
"price" integer   NOT NULL ,
"userId" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)
CREATE TABLE "public"."CartItem" (
"id" text   NOT NULL ,
"quantity" integer   NOT NULL DEFAULT 1,
"itemId" text   NOT NULL ,
"userId" text   NOT NULL ,
PRIMARY KEY ("id")
)
CREATE TABLE "public"."OrderItem" (
"id" text   NOT NULL ,
"title" text   NOT NULL ,
"description" text   NOT NULL ,
"image" text   NOT NULL ,
"largeImage" text   NOT NULL ,
"price" integer   NOT NULL ,
"quantity" integer   NOT NULL DEFAULT 1,
"userId" text   NOT NULL ,
"orderId" text   NOT NULL ,
PRIMARY KEY ("id")
)
CREATE TABLE "public"."Order" (
"id" text   NOT NULL ,
"total" integer   NOT NULL ,
"userId" text   NOT NULL ,
"charge" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
PRIMARY KEY ("id")
)
CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")
ALTER TABLE "public"."Item" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
ALTER TABLE "public"."CartItem" ADD FOREIGN KEY ("itemId")REFERENCES "public"."Item"("id") ON DELETE CASCADE ON UPDATE CASCADE
ALTER TABLE "public"."CartItem" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
ALTER TABLE "public"."OrderItem" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
ALTER TABLE "public"."OrderItem" ADD FOREIGN KEY ("orderId")REFERENCES "public"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE
ALTER TABLE "public"."Order" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE