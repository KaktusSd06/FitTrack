using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitTrack.API.Migrations
{
    /// <inheritdoc />
    public partial class ExerciseChanges2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_IndividualTrainings_IndividualTrainingId",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_IndividualTrainingId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "IndividualTrainingId",
                table: "Exercises");

            migrationBuilder.CreateTable(
                name: "ExerciseIndividualTraining",
                columns: table => new
                {
                    ExercisesId = table.Column<int>(type: "integer", nullable: false),
                    IndividualTrainingsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseIndividualTraining", x => new { x.ExercisesId, x.IndividualTrainingsId });
                    table.ForeignKey(
                        name: "FK_ExerciseIndividualTraining_Exercises_ExercisesId",
                        column: x => x.ExercisesId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseIndividualTraining_IndividualTrainings_IndividualTr~",
                        column: x => x.IndividualTrainingsId,
                        principalTable: "IndividualTrainings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseIndividualTraining_IndividualTrainingsId",
                table: "ExerciseIndividualTraining",
                column: "IndividualTrainingsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExerciseIndividualTraining");

            migrationBuilder.AddColumn<int>(
                name: "IndividualTrainingId",
                table: "Exercises",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_IndividualTrainingId",
                table: "Exercises",
                column: "IndividualTrainingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_IndividualTrainings_IndividualTrainingId",
                table: "Exercises",
                column: "IndividualTrainingId",
                principalTable: "IndividualTrainings",
                principalColumn: "Id");
        }
    }
}
