using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitTrack.API.Migrations
{
    /// <inheritdoc />
    public partial class GroupTrainingChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContactPhone",
                table: "GroupTrainings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "DurationInMinutes",
                table: "GroupTrainings",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactPhone",
                table: "GroupTrainings");

            migrationBuilder.DropColumn(
                name: "DurationInMinutes",
                table: "GroupTrainings");
        }
    }
}
