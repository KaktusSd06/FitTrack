using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitTrack.API.Migrations
{
    /// <inheritdoc />
    public partial class ExerciseChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_IndividualTrainings_IndividualTrainingId",
                table: "Exercises");

            migrationBuilder.AlterColumn<int>(
                name: "IndividualTrainingId",
                table: "Exercises",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_IndividualTrainings_IndividualTrainingId",
                table: "Exercises",
                column: "IndividualTrainingId",
                principalTable: "IndividualTrainings",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_IndividualTrainings_IndividualTrainingId",
                table: "Exercises");

            migrationBuilder.AlterColumn<int>(
                name: "IndividualTrainingId",
                table: "Exercises",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_IndividualTrainings_IndividualTrainingId",
                table: "Exercises",
                column: "IndividualTrainingId",
                principalTable: "IndividualTrainings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
