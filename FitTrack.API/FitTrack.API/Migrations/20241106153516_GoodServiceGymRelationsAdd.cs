using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitTrack.API.Migrations
{
    /// <inheritdoc />
    public partial class GoodServiceGymRelationsAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GymId",
                table: "Services",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GymId",
                table: "Goods",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Services_GymId",
                table: "Services",
                column: "GymId");

            migrationBuilder.CreateIndex(
                name: "IX_Goods_GymId",
                table: "Goods",
                column: "GymId");

            migrationBuilder.AddForeignKey(
                name: "FK_Goods_Gyms_GymId",
                table: "Goods",
                column: "GymId",
                principalTable: "Gyms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Gyms_GymId",
                table: "Services",
                column: "GymId",
                principalTable: "Gyms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goods_Gyms_GymId",
                table: "Goods");

            migrationBuilder.DropForeignKey(
                name: "FK_Services_Gyms_GymId",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Services_GymId",
                table: "Services");

            migrationBuilder.DropIndex(
                name: "IX_Goods_GymId",
                table: "Goods");

            migrationBuilder.DropColumn(
                name: "GymId",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "GymId",
                table: "Goods");
        }
    }
}
