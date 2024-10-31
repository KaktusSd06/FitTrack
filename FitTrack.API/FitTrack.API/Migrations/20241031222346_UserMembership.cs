using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FitTrack.API.Migrations
{
    /// <inheritdoc />
    public partial class UserMembership : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Memberships_AspNetUsers_UserId",
                table: "Memberships");

            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Goods_GoodId",
                table: "Purchases");

            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Services_ServiceId",
                table: "Purchases");

            migrationBuilder.DropTable(
                name: "GroupTrainingUsers");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_GoodId",
                table: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_ServiceId",
                table: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_Memberships_UserId",
                table: "Memberships");

            migrationBuilder.DropColumn(
                name: "GoodId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "ServiceId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "ExpirationDate",
                table: "Memberships");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Memberships");

            migrationBuilder.DropColumn(
                name: "Gym_Id",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "SessionsRemind",
                table: "Memberships",
                newName: "DurationInMonths");

            migrationBuilder.AddColumn<int>(
                name: "Sessions",
                table: "Memberships",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "AspNetUsers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfilePicture",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "GroupTrainingUser",
                columns: table => new
                {
                    GroupTrainingId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupTrainingUser", x => new { x.GroupTrainingId, x.UserId });
                    table.ForeignKey(
                        name: "FK_GroupTrainingUser_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupTrainingUser_GroupTrainings_GroupTrainingsId",
                        column: x => x.GroupTrainingId,
                        principalTable: "GroupTrainings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserMemberships",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SessionsReminded = table.Column<int>(type: "integer", nullable: true),
                    ExpirationDate = table.Column<DateOnly>(type: "date", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    MembershipId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMemberships", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserMemberships_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserMemberships_Memberships_MembershipId",
                        column: x => x.MembershipId,
                        principalTable: "Memberships",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_ItemId",
                table: "Purchases",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupTrainingUser_UserId",
                table: "GroupTrainingUser",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMemberships_MembershipId",
                table: "UserMemberships",
                column: "MembershipId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMemberships_UserId",
                table: "UserMemberships",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Goods_ItemId",
                table: "Purchases",
                column: "ItemId",
                principalTable: "Goods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Services_ItemId",
                table: "Purchases",
                column: "ItemId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Goods_ItemId",
                table: "Purchases");

            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Services_ItemId",
                table: "Purchases");

            migrationBuilder.DropTable(
                name: "GroupTrainingUser");

            migrationBuilder.DropTable(
                name: "UserMemberships");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_ItemId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "Sessions",
                table: "Memberships");

            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "DurationInMonths",
                table: "Memberships",
                newName: "SessionsRemind");

            migrationBuilder.AddColumn<int>(
                name: "GoodId",
                table: "Purchases",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ServiceId",
                table: "Purchases",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpirationDate",
                table: "Memberships",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Memberships",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "AspNetUsers",
                type: "character varying(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Gym_Id",
                table: "AspNetUsers",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "GroupTrainingUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GroupTrainingId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    TrainingId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupTrainingUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroupTrainingUsers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupTrainingUsers_GroupTrainings_GroupTrainingId",
                        column: x => x.GroupTrainingId,
                        principalTable: "GroupTrainings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_GoodId",
                table: "Purchases",
                column: "GoodId");

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_ServiceId",
                table: "Purchases",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Memberships_UserId",
                table: "Memberships",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_GroupTrainingUsers_GroupTrainingId",
                table: "GroupTrainingUsers",
                column: "GroupTrainingId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupTrainingUsers_UserId",
                table: "GroupTrainingUsers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Memberships_AspNetUsers_UserId",
                table: "Memberships",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Goods_GoodId",
                table: "Purchases",
                column: "GoodId",
                principalTable: "Goods",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Services_ServiceId",
                table: "Purchases",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id");
        }
    }
}
