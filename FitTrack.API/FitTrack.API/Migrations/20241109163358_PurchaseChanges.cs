using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitTrack.API.Migrations
{
    /// <inheritdoc />
    public partial class PurchaseChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Goods_ItemId",
                table: "Purchases");

            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Services_ItemId",
                table: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_ItemId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Purchases");

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

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_GoodId",
                table: "Purchases",
                column: "GoodId");

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_ServiceId",
                table: "Purchases",
                column: "ServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Goods_GoodId",
                table: "Purchases",
                column: "GoodId",
                principalTable: "Goods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Services_ServiceId",
                table: "Purchases",
                column: "ServiceId",
                principalTable: "Services",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Goods_GoodId",
                table: "Purchases");

            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Services_ServiceId",
                table: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_GoodId",
                table: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_ServiceId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "GoodId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "ServiceId",
                table: "Purchases");

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "Purchases",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_ItemId",
                table: "Purchases",
                column: "ItemId");

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
    }
}
